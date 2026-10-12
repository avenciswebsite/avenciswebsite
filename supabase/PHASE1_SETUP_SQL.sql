-- ====================================================================
-- AVENCIS PLATFORM — PHASE 1: CONSULTATION BACKEND SETUP SQL
-- Target Engine: Supabase PostgreSQL (Postgres 15+)
-- File: supabase/PHASE1_SETUP_SQL.sql
-- Description: Complete, idempotent setup script for Phase 1.
--              Creates minimal schema (enterprises, leads, consultations,
--              admin_users, operator_notes, rate_limits), security functions,
--              atomic stored procedures, and least-privilege RLS policies.
-- ====================================================================

-- 0. Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ====================================================================
-- 1. BASE TABLES DEFINITION
-- ====================================================================

-- 1.1 Master Enterprises Table (Company Profiles)
CREATE TABLE IF NOT EXISTS public.enterprises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    industry_sector VARCHAR(100),
    annual_turnover_bracket VARCHAR(50),
    city VARCHAR(100),
    state VARCHAR(100),
    website VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enterprises_name ON public.enterprises(name);

-- 1.2 Master Leads Table (Promoter Contacts)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enterprise_id UUID REFERENCES public.enterprises(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    primary_source VARCHAR(50) NOT NULL DEFAULT 'Consultation Form',
    status VARCHAR(50) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Converted', 'Archived')),
    anonymous_session_id VARCHAR(100),
    whatsapp_contacted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_session ON public.leads(anonymous_session_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);

-- 1.3 Consultation Requests Table (Inbound Discovery Bookings)
CREATE TABLE IF NOT EXISTS public.consultation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    booking_reference VARCHAR(50) NOT NULL UNIQUE,
    revenue_bracket VARCHAR(50) NOT NULL CHECK (revenue_bracket IN ('₹5 Cr – ₹15 Cr', '₹15 Cr – ₹50 Cr', '₹50 Cr – ₹150 Cr', '₹150 Cr+')),
    primary_challenge VARCHAR(255) NOT NULL CHECK (primary_challenge IN (
        'Founder Operational Bottleneck & Firefighting',
        'Building the Extended Management Team (EMT)',
        'Working Capital / DSO & Cash Flow Compression',
        'Sales Pipeline Predictability & Pricing Defense',
        'Governance, Valuation & Institutional Scale'
    )),
    status VARCHAR(50) NOT NULL DEFAULT 'Pending Contact' CHECK (status IN ('Pending Contact', 'Discovery Scheduled', 'Completed', 'Cancelled')),
    scheduled_for TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_consultations_lead ON public.consultation_requests(lead_id);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON public.consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultations_reference ON public.consultation_requests(booking_reference);

-- 1.4 Administrator Directory (Linked to Supabase auth.users)
-- Single administrator permission level: Presence here with is_active = true grants admin access
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 1.5 Internal Operator Notes Table (CRM Review Commentary)
CREATE TABLE IF NOT EXISTS public.operator_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_user_id UUID NOT NULL REFERENCES public.admin_users(id),
    target_entity_type VARCHAR(50) NOT NULL CHECK (target_entity_type IN ('lead', 'consultation', 'directory', 'assessment')),
    target_entity_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notes_target ON public.operator_notes(target_entity_type, target_entity_id);

-- 1.6 Serverless Rate Limiting Table
CREATE TABLE IF NOT EXISTS public.rate_limits (
    key TEXT PRIMARY KEY,
    count INT NOT NULL DEFAULT 1,
    reset_at TIMESTAMPTZ NOT NULL
);

-- ====================================================================
-- 2. SECURITY & HELPER FUNCTIONS
-- ====================================================================

-- 2.1 Function: Verify if the currently authenticated user is an active administrator
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = auth.uid() AND is_active = true
    );
$$;

-- 2.2 Function: Atomic Serverless Rate Limiter (No Redis Dependency)
CREATE OR REPLACE FUNCTION public.check_rate_limit(
    p_key TEXT,
    p_max_requests INT DEFAULT 5,
    p_window_seconds INT DEFAULT 60
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_count INT;
    v_reset_at TIMESTAMPTZ;
BEGIN
    SELECT count, reset_at INTO v_count, v_reset_at
    FROM public.rate_limits
    WHERE key = p_key
    FOR UPDATE;

    IF v_reset_at IS NULL OR v_reset_at < NOW() THEN
        INSERT INTO public.rate_limits (key, count, reset_at)
        VALUES (p_key, 1, NOW() + (p_window_seconds || ' seconds')::INTERVAL)
        ON CONFLICT (key) DO UPDATE
        SET count = 1, reset_at = NOW() + (p_window_seconds || ' seconds')::INTERVAL;
        RETURN true;
    ELSIF v_count >= p_max_requests THEN
        RETURN false;
    ELSE
        UPDATE public.rate_limits
        SET count = count + 1
        WHERE key = p_key;
        RETURN true;
    END IF;
END;
$$;

-- 2.3 Function: Atomic Consultation Submission (Transaction-Safe)
CREATE OR REPLACE FUNCTION public.submit_consultation(
    p_full_name TEXT,
    p_company_name TEXT,
    p_email TEXT,
    p_phone TEXT,
    p_revenue_bracket TEXT,
    p_primary_challenge TEXT,
    p_attribution_token TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_lead_id UUID;
    v_consultation_id UUID;
    v_booking_ref VARCHAR(50);
    v_clean_email TEXT;
    v_clean_phone TEXT;
    v_existing_booking_ref VARCHAR(50);
BEGIN
    -- 1. Sanitize Inputs
    v_clean_email := lower(trim(p_email));
    v_clean_phone := trim(p_phone);

    -- 2. Validate Inputs
    IF length(trim(p_full_name)) < 2 THEN
        RAISE EXCEPTION 'Full name must be at least 2 characters' USING ERRCODE = '22000';
    END IF;

    IF length(trim(p_company_name)) < 2 THEN
        RAISE EXCEPTION 'Company name must be at least 2 characters' USING ERRCODE = '22000';
    END IF;

    IF v_clean_email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email address format' USING ERRCODE = '22000';
    END IF;

    IF p_revenue_bracket NOT IN ('₹5 Cr – ₹15 Cr', '₹15 Cr – ₹50 Cr', '₹50 Cr – ₹150 Cr', '₹150 Cr+') THEN
        RAISE EXCEPTION 'Invalid revenue bracket' USING ERRCODE = '22000';
    END IF;

    IF p_primary_challenge NOT IN (
        'Founder Operational Bottleneck & Firefighting',
        'Building the Extended Management Team (EMT)',
        'Working Capital / DSO & Cash Flow Compression',
        'Sales Pipeline Predictability & Pricing Defense',
        'Governance, Valuation & Institutional Scale'
    ) THEN
        RAISE EXCEPTION 'Invalid primary growth challenge' USING ERRCODE = '22000';
    END IF;

    -- 3. Match Existing Lead or Create New Lead (Atomic with Row-Level Lock)
    SELECT id INTO v_lead_id
    FROM public.leads
    WHERE email = v_clean_email OR (v_clean_phone IS NOT NULL AND v_clean_phone <> '' AND phone = v_clean_phone)
    ORDER BY created_at ASC
    LIMIT 1
    FOR UPDATE;

    IF v_lead_id IS NOT NULL THEN
        -- Check for duplicate submission within 60 seconds (anti-double-click idempotency)
        SELECT booking_reference INTO v_existing_booking_ref
        FROM public.consultation_requests
        WHERE lead_id = v_lead_id
          AND primary_challenge = p_primary_challenge
          AND created_at > (NOW() - INTERVAL '60 seconds')
        LIMIT 1;

        IF v_existing_booking_ref IS NOT NULL THEN
            RETURN jsonb_build_object(
                'success', true,
                'bookingId', v_existing_booking_ref,
                'leadId', v_lead_id,
                'message', 'Consultation request already recorded. An Avencis Senior Partner will reach out within 24 business hours.',
                'isDuplicate', true
            );
        END IF;

        UPDATE public.leads
        SET full_name = trim(p_full_name),
            company_name = trim(p_company_name),
            phone = COALESCE(NULLIF(v_clean_phone, ''), phone),
            updated_at = NOW()
        WHERE id = v_lead_id;
    ELSE
        INSERT INTO public.leads (
            full_name,
            company_name,
            email,
            phone,
            primary_source,
            status
        ) VALUES (
            trim(p_full_name),
            trim(p_company_name),
            v_clean_email,
            NULLIF(v_clean_phone, ''),
            'Consultation Form',
            'New'
        )
        RETURNING id INTO v_lead_id;
    END IF;

    -- 4. Generate Unique Human-Readable Booking Reference (e.g. CON-7392)
    v_booking_ref := 'CON-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));

    -- 5. Insert Consultation Request
    INSERT INTO public.consultation_requests (
        lead_id,
        booking_reference,
        revenue_bracket,
        primary_challenge,
        status
    ) VALUES (
        v_lead_id,
        v_booking_ref,
        p_revenue_bracket,
        p_primary_challenge,
        'Pending Contact'
    )
    RETURNING id INTO v_consultation_id;

    -- 6. Return Structured Result
    RETURN jsonb_build_object(
        'success', true,
        'bookingId', v_booking_ref,
        'consultationId', v_consultation_id,
        'leadId', v_lead_id,
        'message', 'Consultation request recorded. An Avencis Senior Partner will reach out within 24 business hours.',
        'isDuplicate', false
    );
END;
$$;

-- ====================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES — STRICT LEAST-PRIVILEGE
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.enterprises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operator_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- 3.1 Enterprises Policies
CREATE POLICY "Admins full access on enterprises"
    ON public.enterprises FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 3.2 Leads Policies
-- Unauthenticated users cannot read, insert, update or delete leads
CREATE POLICY "Admins full access on leads"
    ON public.leads FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 3.3 Consultation Requests Policies
-- Unauthenticated users cannot read, insert, update or delete consultations
CREATE POLICY "Admins full access on consultation_requests"
    ON public.consultation_requests FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 3.4 Admin Users Policies
-- Only active administrators can view the administrator directory
CREATE POLICY "Admins view admin_users"
    ON public.admin_users FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- 3.5 Operator Notes Policies
CREATE POLICY "Admins full access on operator_notes"
    ON public.operator_notes FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 3.6 Rate Limits Policies (System only; no direct client access)
-- No client policies created; accessible only via SECURITY DEFINER functions

-- ====================================================================
-- 4. FUNCTION EXECUTION PERMISSIONS
-- ====================================================================

-- Lock down submit_consultation so public clients cannot bypass Edge Function
REVOKE ALL ON FUNCTION public.submit_consultation(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_consultation(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO service_role, authenticated;

-- Lock down rate limiting function to service_role
REVOKE ALL ON FUNCTION public.check_rate_limit(TEXT, INT, INT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(TEXT, INT, INT) TO service_role;

-- Grant is_admin to authenticated users for RLS evaluation
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
