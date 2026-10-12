// ====================================================================
// AVENCIS PLATFORM — SUPABASE EDGE FUNCTION: SUBMIT CONSULTATION
// Function: submit-consultation
// Runtime: Deno / TypeScript (Supabase Edge Runtime)
// Description: Ingests consultation submissions from FinalCTA.tsx,
//              enforces serverless rate limiting, verifies Cloudflare
//              Turnstile token, and calls the atomic PostgreSQL function
//              public.submit_consultation via service_role key.
// ====================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ConsultationPayload {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  revenueBracket: string;
  primaryChallenge: string;
  attributionToken?: string;
  turnstileToken?: string;
}

const VALID_REVENUE_BRACKETS = [
  "₹5 Cr – ₹15 Cr",
  "₹15 Cr – ₹50 Cr",
  "₹50 Cr – ₹150 Cr",
  "₹150 Cr+",
];

const VALID_CHALLENGES = [
  "Founder Operational Bottleneck & Firefighting",
  "Building the Extended Management Team (EMT)",
  "Working Capital / DSO & Cash Flow Compression",
  "Sales Pipeline Predictability & Pricing Defense",
  "Governance, Valuation & Institutional Scale",
];

const INDIAN_PHONE_REGEX = /^(\+91)?[6789]\d{9}$/;
const E164_PHONE_REGEX = /^\+[1-9]\d{6,14}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: ConsultationPayload = await req.json();

    // 1. Strict Input Validation
    if (!body.fullName || body.fullName.trim().length < 2) {
      return new Response(JSON.stringify({ error: "Full Name is required (minimum 2 characters)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!body.companyName || body.companyName.trim().length < 2) {
      return new Response(JSON.stringify({ error: "Company Name is required (minimum 2 characters)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!body.email || !EMAIL_REGEX.test(body.email.trim())) {
      return new Response(JSON.stringify({ error: "A valid corporate email address is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cleanPhone = body.phone?.trim() || "";
    const normalizedPhone = cleanPhone.replace(/[\s-]/g, "");
    if (!normalizedPhone || (!INDIAN_PHONE_REGEX.test(normalizedPhone) && !E164_PHONE_REGEX.test(normalizedPhone))) {
      return new Response(JSON.stringify({ error: "A valid mobile / phone number is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!VALID_REVENUE_BRACKETS.includes(body.revenueBracket)) {
      return new Response(JSON.stringify({ error: "Invalid revenue bracket selected" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!VALID_CHALLENGES.includes(body.primaryChallenge)) {
      return new Response(JSON.stringify({ error: "Invalid growth challenge selected" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Initialize Privileged Supabase Client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: "Server configuration error: missing Supabase credentials" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 3. Serverless Rate Limiting via Database RPC
    const clientIp =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown_client";

    const rateLimitKey = `rate_limit:consultation:${clientIp}`;
    const { data: isAllowed, error: rateLimitError } = await supabase.rpc("check_rate_limit", {
      p_key: rateLimitKey,
      p_max_requests: 5,
      p_window_seconds: 60,
    });

    if (!rateLimitError && isAllowed === false) {
      return new Response(
        JSON.stringify({ error: "Too many consultation requests. Please wait a minute before submitting again." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 4. Cloudflare Turnstile Verification (Mandatory when secret key is provisioned)
    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
    if (turnstileSecret) {
      if (!body.turnstileToken) {
        return new Response(JSON.stringify({ error: "Bot verification token is required in production." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(body.turnstileToken)}&remoteip=${encodeURIComponent(clientIp)}`,
      });
      const turnstileData = await turnstileRes.json();
      if (!turnstileData.success) {
        return new Response(JSON.stringify({ error: "Bot verification check failed. Please refresh and try again." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // 5. Atomic Transaction Execution via Stored Procedure
    const { data: result, error: dbError } = await supabase.rpc("submit_consultation", {
      p_full_name: body.fullName.trim(),
      p_company_name: body.companyName.trim(),
      p_email: body.email.trim(),
      p_phone: normalizedPhone,
      p_revenue_bracket: body.revenueBracket,
      p_primary_challenge: body.primaryChallenge,
      p_attribution_token: body.attributionToken || null,
    });

    if (dbError) {
      // Safe sanitization: Do not expose raw database errors to the client
      console.error("Database error in submit_consultation:", dbError);
      return new Response(JSON.stringify({ error: "Failed to record consultation request. Please try again shortly." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: result,
      }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Unexpected handler error:", error);
    return new Response(JSON.stringify({ error: "An unexpected error occurred processing your request." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
