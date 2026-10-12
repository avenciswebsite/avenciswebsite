# BACKEND IMPLEMENTATION PLAN & PHASE 1 EXECUTION SPECIFICATION — AVENCIS PLATFORM

> **Finalized Architecture:** Cloudflare Hosting + Supabase PostgreSQL + Supabase Auth + Supabase Edge Functions  
> **Active Milestone:** Phase 1 — Consultation Booking Form to Authenticated Admin Portal  
> **Access Model:** Single Administrator Permission Level (No RBAC)  
> **Authority Level:** Authoritative Roadmap & Phase 1 Execution Plan  

---

## CHANGES FROM PREVIOUS VERSION

1. **Replaced Custom Frameworks with Supabase Architecture:**
   - Obsolete proposals for Express, Fastify, or Hono custom servers have been completely removed.
   - Selected Cloudflare for static hosting, Supabase PostgreSQL for relational database with RLS, Supabase Auth for single-tier administrator authentication, and Supabase Edge Functions for secure server-side operations.
2. **Simplified Administrative Access:**
   - Single administrator permission level. Multi-tier RBAC (`Super Admin`, `Content Manager`, `Lead Manager`) is eliminated. Future management software is explicitly out of scope.
3. **Phase 1 Execution Plan Fully Specified:**
   - Established the concrete execution blueprint for Milestone 1: **Existing Consultation Form (`FinalCTA.tsx`) → Secure Supabase Edge Function → Supabase PostgreSQL → Authenticated Admin Console**.

---

## 1. FINALIZED ARCHITECTURE DECISIONS

| Component | Confirmed Technology | Implementation Approach |
|---|---|---|
| **Frontend Framework** | **React 19 + TypeScript + Vite** | Preserved without modifications to design, copy, assessment questions, or user journeys. |
| **Website Hosting** | **Cloudflare** | Cloudflare Pages delivers compiled static assets globally with edge caching and SSL. |
| **Database Engine** | **Supabase PostgreSQL** | Managed Postgres 15+ instance with Row Level Security (RLS) enabled on all tables. |
| **Authentication** | **Supabase Auth** | Single administrator permission tier. Controlled account creation; no public administrator registration. |
| **Server-Side Logic** | **Supabase Edge Functions** | Deno/TypeScript runtime on the edge. Used selectively where secure server-side operations, secret keys, anti-abuse checks, and service-role database operations are required. |
| **Custom Frameworks** | **None** | No Express, Fastify, or Hono custom API servers. |
| **Access Control** | **Single Admin Level** | All provisioned administrators have full operational and editorial access. RBAC is not implemented in this website project. |

---

## 2. PHASE 1 EXECUTION PLAN: CONSULTATION FORM TO AUTHENTICATED ADMIN PORTAL

### 2.1 Milestone Scope
Connect the existing 6-field consultation form in [FinalCTA.tsx](file:///c:/Avencis%20Website/src/components/FinalCTA.tsx) to Supabase PostgreSQL via a secure Supabase Edge Function, and display submitted records in the authenticated admin console ([ConsultationManagement.tsx](file:///c:/Avencis%20Website/src/admin/ConsultationManagement.tsx)) secured by Supabase Auth.

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Public Visitor completes FinalCTA.tsx                               │
│    (fullName, companyName, email, phone, revenueBracket, challenge)    │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ HTTPS POST with turnstileToken
┌──────────────────────────────────▼─────────────────────────────────────┐
│ 2. Supabase Edge Function: `submit-consultation`                        │
│    - Validates input format (Zod schema)                               │
│    - Verifies Cloudflare Turnstile token via secret key                │
│    - Enforces IP rate limiting                                         │
│    - Inserts into `leads` and `consultation_requests` via service_role │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ PostgreSQL Transaction
┌──────────────────────────────────▼─────────────────────────────────────┐
│ 3. Supabase PostgreSQL Database                                        │
│    - `leads` and `consultation_requests` persist with indexes and RLS   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ RLS: auth.role() = 'authenticated'
┌──────────────────────────────────▼─────────────────────────────────────┐
│ 4. Authenticated Admin Portal (/admin/consultations)                   │
│    - Operator logs in via Supabase Auth                                │
│    - ConsultationManagement.tsx fetches live live bookings             │
│    - Operator updates status and records notes                         │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 2.2 Phase 1 Minimal Database Schema
The minimal schema for Phase 1 comprises:
1. `enterprises`: Company profiles.
2. `leads`: Promoter contacts (name, email, phone, status).
3. `consultation_requests`: Booking details (booking reference, revenue bracket, primary challenge, status).
4. `admin_users`: Administrator metadata linked to `auth.users(id)`.
5. `operator_notes`: Commentary attached to consultation records.

#### Row Level Security (RLS) Policies
- All tables have `ROW LEVEL SECURITY` enabled.
- **`leads` & `consultation_requests`:**
  - `INSERT`: Restricted to `service_role` (used exclusively inside the Edge Function). Public clients cannot insert directly.
  - `SELECT`, `UPDATE`: Restricted to `auth.role() = 'authenticated'`. Public anonymous clients cannot read or query leads.
- **`operator_notes`:**
  - `SELECT`, `INSERT`: Restricted to `auth.role() = 'authenticated'`.

---

### 2.3 Server-Side Ingestion Architecture: Why a Supabase Edge Function Is Required
We have evaluated whether to allow direct client inserts from the browser using the public `anon` key versus an Edge Function.

**Decision: Consultation submission MUST use a Supabase Edge Function (`submit-consultation`).**
- **Bot & Spam Protection:** Cloudflare Turnstile token validation requires the `TURNSTILE_SECRET_KEY`. This key must **never** be exposed in the frontend client. An Edge Function validates the token server-side before touching the database.
- **Least-Privilege Database Permissions:** By keeping `INSERT` on `consultation_requests` locked against the public `anon` role, automated scrapers and malicious scripts cannot flood the database directly via the Supabase REST endpoint.
- **Atomicity:** The Edge Function creates or updates the `leads` record and generates the linked `consultation_requests` row in a single atomic flow.

---

### 2.4 Administrative Authentication & Account Creation
- **Auth Provider:** Supabase Auth (`supabase.auth`).
- **Controlled Account Provisioning:**
  - Public registration is strictly disabled.
  - Administrator accounts are provisioned exclusively by the platform owner through the Supabase Dashboard (`Authentication > Users > Add user`) or via Supabase CLI invitation scripts.
- **Admin Login Flow:**
  - Operator visits `/admin`.
  - If unauthenticated, `AdminLayout.tsx` renders a clean login interface (`email` + `password`).
  - Upon successful `supabase.auth.signInWithPassword`, the session token is stored securely in memory / local storage and injected into subsequent queries.
  - Sign-out clears the session via `supabase.auth.signOut()`.

---

### 2.5 Environment Variable Configuration & Secret Isolation
Secrets must **never** be committed to source control or exposed in frontend client bundles.

#### Frontend Environment Variables (`.env.production` / `.env.local`):
```bash
# Safe public variables exposed to the Vite client bundle:
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_TURNSTILE_SITE_KEY=0x4AAAAAA...
```

#### Supabase Edge Function Secrets (Set in Supabase Vault / Cloudflare):
```bash
# Privileged secrets NEVER exposed to the frontend:
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
TURNSTILE_SECRET_KEY=0x4AAAAAA...
```

#### Version Control Protection:
Ensure `.env`, `.env.local`, and `.env.production` are included in `.gitignore`.

---

### 2.6 Version-Controlled Migration Layout & Rollback Strategy

#### Migration Structure:
```
supabase/
└── migrations/
    ├── 20261013000001_phase1_consultations_schema.sql
    └── 20261013000001_phase1_consultations_schema_rollback.sql
```

#### Rollback Strategy:
1. **Automated Backups:** Supabase automated daily backups and WAL point-in-time recovery enable rollback to any prior point in time.
2. **Reversible DDL:** Each migration file is paired with an exact rollback script that drops policies, indexes, and tables in reverse dependency order:
   ```sql
   DROP TABLE IF EXISTS operator_notes CASCADE;
   DROP TABLE IF EXISTS consultation_requests CASCADE;
   DROP TABLE IF EXISTS leads CASCADE;
   DROP TABLE IF EXISTS enterprises CASCADE;
   DROP TABLE IF EXISTS admin_users CASCADE;
   ```
3. **Transaction Wrapping:** Migrations execute inside `BEGIN; ... COMMIT;` blocks to ensure atomicity.

---

## 3. PHASED ROADMAP OVERVIEW

```
Phase 1: Consultation Booking Flow (ACTIVE MILESTONE)
├── Migration: Minimal schema (enterprises, leads, consultation_requests, admin_users, operator_notes)
├── Edge Function: submit-consultation with Turnstile validation
├── Frontend: Wire FinalCTA.tsx to submit-consultation
└── Admin Console: Wire ConsultationManagement.tsx and AdminLayout to Supabase Auth & live queries

Phase 2: Anonymous Diagnostic Assessment Ingestion
├── Migration: assessments and assessment_answers tables
├── Edge Function: submit-assessment (anonymous 5-question scoring)
└── Admin Console: Wire AssessmentManagement.tsx

Phase 3: Executive Newsletter Briefings
├── Migration: newsletter_subscribers table
├── Edge Function: submit-newsletter
└── Frontend: Bind InsightsPage.tsx newsletter input and button

Phase 4: Headless CMS Persistence & Public Content Hooks
├── Migration: cms_pages, cms_case_studies, cms_articles, cms_media_assets
├── Admin Console: Connect CmsStore to Supabase with RLS
└── Frontend: Wire public pages to fetch published content with fallback to siteData.ts

Phase 5: Business Directory & Lead Magnets (REQUIRES APPROVAL)
├── Migration: directory_submissions and lead_magnet_submissions
└── Frontend: Build public directory and gated lead magnet journeys upon business sign-off
```

---

## 4. PREREQUISITES & APPROVAL GATES BEFORE PROVISIONING

Before applying database migrations or deploying services, the following prerequisites must be confirmed:

1. **Supabase Project Creation:**
   - A Supabase project must be provisioned.
   - Project URL and public `anon` key are required for the frontend.
   - `service_role` key is required for Edge Functions.
2. **Cloudflare Turnstile Key Generation:**
   - Turnstile Site Key (public) and Secret Key (private) must be generated in the Cloudflare dashboard.
3. **Initial Administrator Account Provisioning:**
   - At least one administrator account must be created via Supabase Auth.
4. **Approval Gate:**
   - **No external services will be provisioned or migrations applied until explicit stakeholder authorization is granted.**
