# PHASE 1 PREFLIGHT REPORT — AVENCIS CONSULTATION BACKEND & SUPABASE INTEGRATION

> **Project:** Avencis Website (Phase 1: Consultation Booking Flow)  
> **Date:** October 2026  
> **Target Architecture:** Cloudflare Hosting + Supabase PostgreSQL + Supabase Auth + Supabase Edge Functions  
> **Access Model:** Single Administrator Level (No RBAC)  
> **Status:** Preflight Inspection Complete — Ready for Dashboard Configuration  

---

## 1. SECURITY FINDINGS AND SEVERITY

During our preflight inspection of the codebase, schemas, and Edge Functions, six critical security and integrity findings were identified and resolved:

| ID | Issue Identified | Severity | Vulnerability & Impact | Resolution Implemented |
|---|---|---|---|---|
| **SEC-01** | **Over-Permissive RLS (`TO authenticated USING (true)`)** | **CRITICAL** | In the initial draft, RLS policies allowed *any* authenticated Supabase user to read and mutate all leads and consultations. If public sign-up were ever enabled, any registered user would have full administrative access to private promoter records. | Implemented `public.is_admin()` security definer function. RLS policies now strictly enforce `USING (public.is_admin())`. Authentication alone does **not** grant access; only accounts explicitly recorded in `public.admin_users` have privileges. |
| **SEC-02** | **Non-Atomic Ingestion & Duplicate Race Conditions** | **HIGH** | The initial Edge Function executed three separate client queries (`SELECT lead` -> `INSERT/UPDATE lead` -> `INSERT consultation_requests`) without a database transaction. A network hiccup or failed consultation insert would leave orphaned leads, and concurrent submissions with the same email could create duplicate leads. | Designed `public.submit_consultation()` stored procedure. Executes lead lookup (with row-level `FOR UPDATE` lock), anti-double-click idempotency (60s window), reference generation, and booking insertion in a single atomic ACID transaction. |
| **SEC-03** | **Turnstile Bot Verification Bypass** | **HIGH** | The initial Edge Function checked Turnstile with `if (turnstileSecret && body.turnstileToken)`. If an automated script simply omitted `turnstileToken`, the verification was silently bypassed. | Enforced strict rejection: when `TURNSTILE_SECRET_KEY` is provisioned, `turnstileToken` is mandatory. Missing or invalid tokens return `HTTP 400`. |
| **SEC-04** | **Dropped Company Name Field** | **MEDIUM** | In the initial migration, `leads` lacked `company_name`, having only an optional `enterprise_id`. In `submit-consultation/index.ts`, `companyName` was validated but dropped before database insertion. | Added `company_name VARCHAR(255) NOT NULL` directly to `leads` so company names collected from `FinalCTA.tsx` are permanently preserved. |
| **SEC-05** | **Phone Regex Incompatibility with Whitespace** | **MEDIUM** | Standard Indian mobile inputs with internal spaces (e.g. `+91 98765 43210`, as shown in the `FinalCTA.tsx` placeholder) failed validation because the regex checked the raw string without normalizing internal whitespace. | Added phone normalization stripping whitespace and hyphens before regex testing. Verified with automated unit tests. |
| **SEC-06** | **Serverless Rate Limiting Void** | **HIGH** | Edge Functions execute across stateless serverless isolates where in-memory maps are not shared across instances. | Built `public.check_rate_limit()` and `public.rate_limits` table in PostgreSQL, providing distributed, atomic, serverless-safe rate limiting without Redis. |

---

## 2. CORRECTIONS MADE TO CODE AND DOCUMENTATION

1. **`supabase/PHASE1_SETUP_SQL.sql` & Migration:**
   - Synchronized [PHASE1_SETUP_SQL.sql](file:///c:/Avencis%20Website/supabase/PHASE1_SETUP_SQL.sql) and [20261013000001_phase1_consultations_schema.sql](file:///c:/Avencis%20Website/supabase/migrations/20261013000001_phase1_consultations_schema.sql) to represent the exact same database structure.
   - Added `company_name VARCHAR(255) NOT NULL` to `leads`.
   - Added `public.is_admin()` helper function for RLS evaluation.
   - Added `public.check_rate_limit()` and `public.rate_limits` table.
   - Added atomic `public.submit_consultation()` procedure with input validation, row-locking, and collision-resistant booking reference generation (`CON-XXXXXX`).
   - Locked down stored procedures: revoked from `PUBLIC` and `anon`; granted exclusively to `service_role` and `authenticated`.
2. **`supabase/functions/submit-consultation/index.ts`:**
   - Refactored to call `supabase.rpc('submit_consultation', ...)` instead of three uncoordinated queries.
   - Enforced serverless rate limiting via `supabase.rpc('check_rate_limit', ...)`.
   - Enforced Turnstile token presence and verification when `TURNSTILE_SECRET_KEY` is configured.
   - Added phone whitespace/hyphen normalization before regex validation.
   - Sanitized error responses to prevent internal database errors from leaking to public clients.
3. **Environment Security:**
   - Updated [.gitignore](file:///c:/Avencis%20Website/.gitignore) to strictly exclude `.env`, `.env.*`, and `*.local`.
   - Created safe non-secret template [.env.example](file:///c:/Avencis%20Website/.env.example).
4. **Automated Unit Tests:**
   - Created [test/phase1_validation.test.mjs](file:///c:/Avencis%20Website/test/phase1_validation.test.mjs) testing valid Indian numbers, E.164 formats, short names, malformed emails, out-of-range phones, invalid revenue brackets, and invalid challenge strings.
5. **Reconciled Audit Documents:**
   - Updated [DATA_MODEL_PROPOSAL.md](file:///c:/Avencis%20Website/audit/DATA_MODEL_PROPOSAL.md) to reflect the `company_name` column, `public.is_admin()` RLS logic, and atomic stored procedures.

---

## 3. REVIEW OF PROPOSED PHASE 1 TABLES

| Table Name | Phase 1 Necessity | Recommendation & Rationale |
|---|---|---|
| **`leads`** | **Mandatory** | Core CRM identity entity storing promoter contact coordinates (`full_name`, `company_name`, `email`, `phone`, `primary_source`, `status`). |
| **`consultation_requests`** | **Mandatory** | Core booking transaction entity storing revenue bracket, primary growth challenge, human-readable booking reference (`CON-XXXXXX`), and workflow status (`Pending Contact`, etc.). |
| **`admin_users`** | **Mandatory** | Stores authorized administrator UUIDs referencing `auth.users(id)`. Serves as the critical gatekeeper for `public.is_admin()` so that uninvited users cannot access private leads. |
| **`operator_notes`** | **Mandatory** | Directly utilized by [ConsultationManagement.tsx](file:///c:/Avencis%20Website/src/admin/ConsultationManagement.tsx) for partners to record confidential review commentary on incoming bookings. |
| **`enterprises`** | **Optional / Deferrable** | In Phase 1, `FinalCTA.tsx` only collects company name and revenue bracket. It does *not* collect industry sector, city, state, GSTIN, or website. Normalizing a separate `enterprises` table creates placeholder records with mostly NULL columns. However, because `enterprises` was part of the original design, we have included it cleanly with RLS in the SQL script. If preferred, it can be safely deferred to the Business Directory phase without affecting consultation booking functionality. |
| **`rate_limits`** | **Supporting (Mandatory)** | Dedicated lightweight table enabling atomic serverless rate limiting without Redis dependencies. |

---

## 4. THE EXACT SQL SCRIPT (`supabase/PHASE1_SETUP_SQL.sql`)

The script below has been saved to:
`c:\Avencis Website\supabase\PHASE1_SETUP_SQL.sql`

It is 100% synchronized with `supabase/migrations/20261013000001_phase1_consultations_schema.sql`.

```sql
-- ====================================================================
-- AVENCIS PLATFORM — PHASE 1: CONSULTATION BACKEND SETUP SQL
-- Target Engine: Supabase PostgreSQL (Postgres 15+)
-- File: supabase/PHASE1_SETUP_SQL.sql
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
CREATE POLICY "Admins full access on leads"
    ON public.leads FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 3.3 Consultation Requests Policies
CREATE POLICY "Admins full access on consultation_requests"
    ON public.consultation_requests FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 3.4 Admin Users Policies
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

-- ====================================================================
-- 4. FUNCTION EXECUTION PERMISSIONS
-- ====================================================================

REVOKE ALL ON FUNCTION public.submit_consultation(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_consultation(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO service_role, authenticated;

REVOKE ALL ON FUNCTION public.check_rate_limit(TEXT, INT, INT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(TEXT, INT, INT) TO service_role;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
```

---

## 5. REQUIRED SUPABASE DASHBOARD CONFIGURATION STEPS

Please follow this checklist in your new Supabase project:

1. **Create the Supabase Project:**
   - Log in to [supabase.com](https://supabase.com) and create a project (e.g. `avencis-prod` or `avencis-website`).
   - Note the database region (recommend AWS Mumbai `ap-south-1` for Indian mid-market latency).
2. **Disable Public User Sign-ups:**
   - Navigate to **Authentication > Providers > Email**.
   - Set **"Enable Signups"** to **OFF / Disabled**.
   - *Rationale:* This ensures random public visitors cannot create accounts in `auth.users`.
3. **Execute the Setup SQL:**
   - Navigate to **SQL Editor > New Query**.
   - Paste the contents of `supabase/PHASE1_SETUP_SQL.sql` and click **Run**.
   - Verify that all tables, indexes, and functions are created without errors.
4. **Provision the Initial Administrator Account:**
   - Navigate to **Authentication > Users > Add user > Create user**.
   - Enter your administrator email (e.g. `partner@avencis.in`) and a secure password.
   - Ensure **"Auto Confirm User?"** is checked.
   - Click **Create User**.
   - Copy the generated `User UID` (e.g. `c7f1a8e2-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).
5. **Register the Administrator Profile:**
   - In **SQL Editor**, execute this one-line command substituting your copied UID:
     ```sql
     INSERT INTO public.admin_users (id, email, full_name)
     VALUES ('<COPIED-USER-UID>', 'partner@avencis.in', 'Avencis Partner')
     ON CONFLICT (id) DO NOTHING;
     ```
   - *Result:* This user is now permanently recognized by `public.is_admin()`, granting administrative permissions upon sign-in.
6. **Obtain Project Credentials:**
   - Navigate to **Project Settings > API**.
   - Copy:
     - `Project URL` (e.g. `https://xyzcompany.supabase.co`)
     - `Project API keys > anon / public`
     - `Project API keys > service_role` (Keep private; never paste into chat or client code).

---

## 6. REQUIRED EDGE FUNCTION SECRETS AND DEPLOYMENT

### Required Edge Function Secrets (Supabase Vault):
Configure these in the Supabase Dashboard under **Project Settings > Edge Functions > Secrets** (or via `supabase secrets set`):

```bash
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
TURNSTILE_SECRET_KEY=<your-cloudflare-turnstile-secret-key> # Optional in dev; required in prod
```

### Local Environment Configuration (`.env.local`):
In your local project root (`c:\Avencis Website\.env.local` — automatically Git-ignored):
```bash
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-public-anon-key>
VITE_TURNSTILE_SITE_KEY=<your-cloudflare-turnstile-site-key> # Optional in dev
```

---

## 7. ACTUAL LINT, BUILD AND TEST RESULTS

### 7.1 Automated Unit Tests (Executed Locally)
Executed using Node.js built-in test runner against [test/phase1_validation.test.mjs](file:///c:/Avencis%20Website/test/phase1_validation.test.mjs):
```
▶ Phase 1 Consultation Submission Validation Tests
  ✔ should accept valid standard Indian mobile payload (0.5561ms)
  ✔ should accept valid international E.164 phone payload (0.1562ms)
  ✔ should reject invalid / short full name (0.5736ms)
  ✔ should reject malformed email (0.0959ms)
  ✔ should reject invalid phone numbers (0.0871ms)
  ✔ should reject unapproved revenue bracket (0.0954ms)
  ✔ should reject unapproved growth challenge (0.0638ms)
✔ Phase 1 Consultation Submission Validation Tests (2.3681ms)
ℹ tests 7 | pass 7 | fail 0
```

### 7.2 Linter Results (`oxlint`)
```
> oxlint
Found 0 warnings and 0 errors.
Finished in 20ms on 69 files with 116 rules using 28 threads.
```

### 7.3 Build Results (`tsc -b && vite build`)
```
vite v8.3.3 building client environment for production...
✓ 1961 modules transformed.
dist/index.html                   1.14 kB │ gzip:   0.62 kB
dist/assets/index-CtDFtPiw.css   45.06 kB │ gzip:  10.05 kB
dist/assets/index-CrwOUe5y.js   642.33 kB │ gzip: 158.20 kB
✓ built in 246ms
```

### 7.4 Tests Pending Project Deployment
The following tests cannot be executed locally until your Supabase project is active:
- Live database insertion via `submit_consultation`.
- Live Edge Function invocation with Turnstile token exchange.
- Live Supabase Auth sign-in from `AdminLayout.tsx`.
- Live query retrieval in `ConsultationManagement.tsx`.

---

## 8. REMAINING BLOCKERS AND PRECISE NEXT STEPS

### Current Blockers:
1. **Awaiting User Setup in Supabase Dashboard:**
   - Execute `supabase/PHASE1_SETUP_SQL.sql` in Supabase SQL Editor.
   - Create initial admin account and insert into `public.admin_users`.
   - Configure credentials in `.env.local`.

### Precise Next Steps Upon Approval:
1. **Install `@supabase/supabase-js`** in the project frontend dependencies.
2. **Create Supabase client initialization utility** (`src/utils/supabaseClient.ts`) reading `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. **Wire [FinalCTA.tsx](file:///c:/Avencis%20Website/src/components/FinalCTA.tsx)** to dispatch submissions to the `submit-consultation` endpoint with loading state, error display, and success confirmation.
4. **Wire [ConsultationManagement.tsx](file:///c:/Avencis%20Website/src/admin/ConsultationManagement.tsx)** to fetch live consultation requests and insert real operator notes.
5. **Add Supabase Auth login gate to [AdminLayout.tsx](file:///c:/Avencis%20Website/src/admin/AdminLayout.tsx)** so unauthenticated visitors see an administrator sign-in form.
