# BACKEND READINESS REVIEW & AUDIT RECONCILIATION REPORT — AVENCIS

> **Review Date:** October 2026 (Final Architecture Edition)  
> **Audited Repository:** `Avencis Website` (Root: `c:\Avencis Website`)  
> **Finalized Architecture:** Cloudflare Hosting + Supabase PostgreSQL + Supabase Auth + Supabase Edge Functions  
> **Access Model:** Single Administrator Permission Level (No RBAC)  
> **Authority Level:** Authoritative Backend Readiness & Phase 1 Preparation Report  

---

## EXECUTIVE SUMMARY

A thorough, code-level backend readiness review was conducted across the Avencis web application repository. All seven audit documents have been reconciled with the finalized architecture:

1. **Architecture Finalized:**
   - **Hosting:** Cloudflare (Pages / Edge).
   - **Database:** Supabase PostgreSQL with Row Level Security (RLS).
   - **Authentication:** Supabase Auth for single-tier administrator access.
   - **Server-Side Operations:** Supabase Edge Functions selectively for secure ingestion, validation, and bot protection.
   - **Custom Frameworks Excluded:** No Hono, Express, or Fastify API servers.
2. **Simplified Administrative Access:**
   - A single administrator permission level. A small number of administrator accounts will be created.
   - No Role-Based Access Control (RBAC) in this website project.
   - Future Avencis enterprise management software is out of scope and its permission model will be designed separately.
3. **Phase 1 Milestone Defined:**
   - **Existing consultation form (`FinalCTA.tsx`) → secure Supabase Edge Function (`submit-consultation`) → Supabase PostgreSQL (`consultation_requests` & `leads`) → authenticated admin portal via Supabase Auth.**
4. **Preserved Frontend Assets:**
   - All existing public content, design, routes, typography, assessment questions, scoring formulas, and animations remain strictly untouched.

---

## 1. CONFIRMED EXISTING FUNCTIONALITY

| Component / Feature | Source File Reference | Confirmed Capabilities |
|---|---|---|
| **Public Route Tree (10 Routes)** | `src/App.tsx` (Lines 74–107) | 10 live public routes: `/`, `/what-we-do`, `/methodology`, `/case-studies`, `/diagnostics` (and `/diagnostic`), `/founder-dependency` (and `/dependency-index`), `/why-avencis`, `/insights`, `/book-assessment`, `/book-consultation`. Wrapped in `PublicLayout` with shared `Header` and `Footer`. |
| **Interactive Diagnostic Tool** | `src/components/Assessment.tsx` (Lines 1–172) & `src/data/siteData.ts` (Lines 698–759) | 5 sequential multiple-choice questions assessing Founder Bandwidth, Sales, Operations, Cash Flow, and EMT. Real-time progress bar, score calculation, reset action. **100% anonymous; zero contact capture.** |
| **Diagnostic Result Modal** | `src/components/AssessmentResult.tsx` (Lines 1–192) | Visual score meter (`overallScore`/100), Readiness Grade (A through D), identified bottleneck badge, recommended 90-day focus, and pre-formatted WhatsApp deep-link generation. |
| **Strategic Discovery Booking Form** | `src/components/FinalCTA.tsx` (Lines 1–274) | 6 controlled fields: `fullName`, `companyName`, `email`, `phone`, `revenueBracket` (4 options), and `primaryChallenge` (5 options). Form toggle to success confirmation card. |
| **WhatsApp Attribution Framework** | `src/utils/whatsapp.ts` (Lines 1–85) | Contextual deep-link generator using official keywords (`GROW`, `ASSESSMENT`, `FOUNDER`, `GROWTH`, `SCORE`, `CASE_STUDY`) for promoter-initiated chat inquiries. |
| **Admin Operations Portal** | `src/admin/AdminLayout.tsx`, `AdminDashboard.tsx`, `LeadManagement.tsx`, `DirectoryManagement.tsx`, `AssessmentManagement.tsx`, `ConsultationManagement.tsx`, `LeadMagnetManagement.tsx`, `UserManagement.tsx` | Comprehensive administrative console under `/admin` with sidebar navigation, metric cards, status progression controls, search/filtering, and operator notes thread. Styled via `src/admin/admin.css`. |
| **CMS Studio** | `src/admin/cms/CmsDashboard.tsx`, `CmsPageList.tsx`, `CmsPageEditor.tsx`, `CmsCaseStudies.tsx`, `CmsInsights.tsx`, `CmsMediaLibrary.tsx` | Content management console under `/admin/cms` supporting structured editing of 10 pages, SEO tags, live preview modal, 3 case studies, 4 articles, and 19 media asset alt-text records. |

---

## 2. MISSING FRONTEND FUNCTIONALITY

1. **Public Business Directory Registration Form:**
   - **Status:** Missing. No route exists at `/directory/register`.
   - **Missing Components:** Public registration form and public directory catalogue at `/directory`. (Out of scope for Phase 1; requires separate approval).
2. **Gated Lead Magnet Download Modals:**
   - **Status:** Missing. No gated forms exist on `/insights` or `/methodology`. (Out of scope for Phase 1; requires separate approval).
3. **Newsletter Subscription Handler:**
   - **Status:** Inoperable in `src/pages/InsightsPage.tsx` (Lines 81–99). `<input type="email">` has no state binding; `<button>Subscribe</button>` has no `onClick` handler. (Targeted for Phase 3).
4. **Public CMS Data Hooks:**
   - **Status:** Missing. Public page components (`Section1Hero.tsx`, etc.) import hardcoded constants from `src/data/siteData.ts` and have no data-fetching hooks connecting them to Supabase. (Targeted for Phase 4).

---

## 3. DATA PERSISTENCE GAPS

| Inbound Journey | Current Client Behavior | Data Lost Upon Browser Refresh | Severity |
|---|---|---|---|
| **Consultation Booking (`FinalCTA.tsx`)** | Sets React state `submitted = true`. Zero network calls initiated. | Full Name, Company, Email, Phone, Revenue Bracket, Primary Challenge. | **CRITICAL** (Addressed in Phase 1) |
| **Diagnostic Tool (`Assessment.tsx`)** | Answers stored in `Record<number, number>`. Score computed in component memory. WhatsApp link generated client-side. | All 5 question selections, calculated score, bottleneck classification, assessment timestamp. | **CRITICAL** (Targeted for Phase 2) |
| **Newsletter Strip (`InsightsPage.tsx`)** | Static JSX. Zero event handling. | User-entered email address is never captured. | **HIGH** (Targeted for Phase 3) |
| **CMS Edits (`CmsPageEditor.tsx`)** | Updates in-memory array in `cmsStore.ts`. | Editorial updates and SEO alt-text reset to defaults on page reload. | **HIGH** (Targeted for Phase 4) |
| **Admin Operations (`AdminStore`)** | Modifies in-memory arrays in `adminStore.ts`. | Status changes (e.g. Lead Qualified, Directory Approved) and operator notes vanish on page refresh. | **HIGH** (Addressed in Phase 1) |

---

## 4. CORRECTED FORM INVENTORY

```
FORM-01: Primary Consultation & Discovery Form (PHASE 1 ACTIVE MILESTONE)
├── Route: /book-consultation & embedded on /
├── Source: src/components/FinalCTA.tsx (Lines 1–274)
├── Inputs:
│   ├── fullName (text, required)
│   ├── companyName (text, required)
│   ├── email (email, required)
│   ├── phone (tel, required)
│   ├── revenueBracket (select, 4 options: ₹5-15 Cr, ₹15-50 Cr, ₹50-150 Cr, ₹150 Cr+)
│   └── primaryChallenge (select, 5 options: Bottleneck, EMT, Cash Flow, Sales, Governance)
└── Target Ingestion: Supabase Edge Function `submit-consultation` -> Supabase PostgreSQL

FORM-02: Business Scale Diagnostic Assessment (PHASE 2)
├── Route: /diagnostics, /diagnostic, /book-assessment
├── Source: src/components/Assessment.tsx (Lines 1–172)
├── Inputs: 5 multiple-choice questions (Scores 1 to 4 each)
├── Contact Capture: ZERO (100% Anonymous on frontend)
├── Scoring Formula: percentageScore = Math.round((Sum of 5 scores / 20) * 100)
├── Score Range: 25% to 100% (Higher = Higher Autonomy)
└── Target Ingestion: Supabase Edge Function `submit-assessment` -> Supabase PostgreSQL

FORM-03: Monthly Founder Briefing Newsletter (PHASE 3)
├── Route: /insights
├── Source: src/pages/InsightsPage.tsx (Lines 81–99)
└── Target Ingestion: Supabase Edge Function `submit-newsletter` -> Supabase PostgreSQL
```

---

## 5. CORRECTED DATABASE PROPOSAL & ROW LEVEL SECURITY (RLS)

### Phase 1 Minimal Database Schema
1. **`enterprises`**: Master company profiles (`id`, `name`, `industry_sector`, `annual_turnover_bracket`, `city`, `state`, `website`, timestamps).
2. **`leads`**: Master CRM promoter contacts (`id`, `enterprise_id`, `full_name`, `email`, `phone`, `primary_source`, `status`, `anonymous_session_id`, `whatsapp_contacted`, timestamps).
3. **`consultation_requests`**: Discovery bookings (`id`, `lead_id`, `booking_reference`, `revenue_bracket`, `primary_challenge`, `status`, `scheduled_for`, `created_at`).
4. **`admin_users`**: Administrator profiles linked to `auth.users(id)` (`id`, `email`, `full_name`, `is_active`, `created_at`).
5. **`operator_notes`**: Internal notes recorded by partners (`id`, `author_user_id`, `target_entity_type`, `target_entity_id`, `content`, `created_at`).

### Row Level Security (RLS) Policies
- `ROW LEVEL SECURITY` enabled on every table.
- **Least-Privilege Public Access:** Public anonymous users cannot execute direct `SELECT`, `UPDATE`, or `DELETE` queries on `leads` or `consultation_requests`.
- **Public Insertion Control:** Ingestion is executed via the `service_role` key inside the Supabase Edge Function after validating input fields and checking Cloudflare Turnstile tokens.
- **Authenticated Administrator Access:** Authenticated administrators (`auth.role() = 'authenticated'`) have full `SELECT`, `UPDATE`, and `INSERT` capabilities across leads, consultations, and operator notes.

---

## 6. CORRECTED API INVENTORY

```
PUBLIC INGESTION (SUPABASE EDGE FUNCTIONS)
├── POST /functions/v1/submit-consultation  (Phase 1: Validated 6 fields + Turnstile -> service_role insert)
├── POST /functions/v1/submit-assessment    (Phase 2: Anonymous 5 answers -> score calculation -> insert)
└── POST /functions/v1/submit-newsletter    (Phase 3: Work email capture)

ADMIN DATA ACCESS (@supabase/supabase-js + RLS)
├── Auth:
│   ├── supabase.auth.signInWithPassword({ email, password })
│   └── supabase.auth.signOut()
├── Consultations:
│   ├── supabase.from('consultation_requests').select('*, leads(*)')
│   └── supabase.from('consultation_requests').update({ status })
├── Leads:
│   ├── supabase.from('leads').select('*')
│   └── supabase.from('leads').update({ status })
├── Notes:
│   └── supabase.from('operator_notes').insert({ content, ... })
└── CMS Studio (Phase 4):
    ├── supabase.from('cms_pages').select('*')
    └── supabase.from('cms_pages').update({ headline, ... })
```

---

## 7. FINALIZED ARCHITECTURE & RATIONALE

| Architecture Component | Confirmed Technology | Evaluation & Rationale |
|---|---|---|
| **Hosting Platform** | **Cloudflare** | Cloudflare Pages delivers static Vite assets with global CDN caching, instant SSL, and DDoS mitigation. |
| **Database Engine** | **Supabase PostgreSQL** | Managed Postgres 15+ providing full relational integrity, JSONB support, and granular Row Level Security (RLS). |
| **Authentication Service** | **Supabase Auth** | Single administrator permission tier. Controlled account creation; no public administrator registration. |
| **Server-Side Operations** | **Supabase Edge Functions** | Deno/TypeScript edge functions protect secret keys (`TURNSTILE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) from browser exposure while validating submissions. |
| **Custom Frameworks** | **None** | Express, Fastify, and Hono are eliminated, minimizing operational complexity, maintenance burden, and infrastructure cost. |
| **Access Model** | **Single Admin Level** | Simple, robust security model suitable for a small administrator team. RBAC is avoided in this website project. |

---

## 8. SECURITY BLOCKERS & CONTROLS

1. **Controlled Administrator Provisioning:**
   - Public administrator registration is strictly prohibited.
   - Administrator accounts are created directly in the Supabase Dashboard (`Authentication > Users`) or via Supabase CLI.
2. **Secret Key Isolation:**
   - The `SUPABASE_SERVICE_ROLE_KEY` and `TURNSTILE_SECRET_KEY` are stored in Supabase Edge Function environment secrets and **never** exposed in `VITE_*` frontend environment variables or source control.
   - Frontend bundles only receive the safe public `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_TURNSTILE_SITE_KEY`.
3. **Bot & Spam Protection:**
   - Public consultation submissions are validated against Cloudflare Turnstile before database writes occur.
4. **Database Row Level Security:**
   - Direct database access via the public `anon` key is strictly locked down using RLS policies.

---

## 9. OPEN BUSINESS DECISIONS REQUIRING APPROVAL

1. **Diagnostic Assessment Contact Gate Policy (`REQUIRES APPROVAL`):**
   - Whether to keep the 5-question tool 100% anonymous (current behavior) or require Work Email and Mobile on Step 5 to unlock the full 4-page diagnostic report. (Targeted for Phase 2).
2. **Business Directory Qualification Criteria (`REQUIRES APPROVAL`):**
   - Minimum turnover criteria and verification requirements for public directory listings. (Out of scope for Phase 1).
3. **Lead Magnet Asset Publishing (`REQUIRES APPROVAL`):**
   - Approval of gated download journeys and digital asset storage. (Out of scope for Phase 1).
4. **Transactional Email Service Provider Selection (`REQUIRES APPROVAL`):**
   - Selection of transactional email provider (Resend, SendGrid, Amazon SES) for automated partner alerts.

---

## 10. PHASE 1 IMPLEMENTATION READINESS & PREREQUISITES

### Status: Documentation Reconciled. Ready for Phase 1 Preparation.
The project documentation has been fully reconciled. The architecture, schemas, RLS policies, and API contracts are in complete alignment.

### Prerequisites Required Before External Provisioning:
1. **Supabase Project Credentials:**
   - Provision a Supabase project and provide `Project URL`, public `anon` key, and `service_role` key.
2. **Cloudflare Turnstile Keys:**
   - Create a Turnstile widget and provide `Site Key` and `Secret Key`.
3. **Initial Admin User:**
   - Create one initial administrator email and password in Supabase Auth.
4. **Approval Gate:**
   - Await explicit stakeholder approval before provisioning services, running database migrations, or deploying Edge Functions.
