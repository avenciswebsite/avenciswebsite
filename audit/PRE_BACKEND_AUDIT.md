# PRE-BACKEND AUDIT — AVENCIS WEBSITE FRONTEND ARCHITECTURE & DATA CAPTURE AUDIT

> **Audit Date:** October 2026 (Final Reconciled Edition)  
> **Audited Repository:** `Avencis Website` (Root: `c:\Avencis Website`)  
> **Frontend Stack:** React 19.2.8, TypeScript 5.8.2 / 6.0.2, Vite 8.3.0, Vanilla CSS Tokens, React Router 7.18.4  
> **Finalized Architecture:** Cloudflare Hosting + Supabase PostgreSQL + Supabase Auth + Supabase Edge Functions  
> **Authority Level:** Authoritative Specification Reconciled Against Confirmed Architecture Decisions  

---

## CHANGES FROM PREVIOUS VERSION

This document has been updated to incorporate the confirmed architectural and access control decisions:

1. **Finalized Architecture Stack:**
   - **Hosting:** Cloudflare (Pages / Edge).
   - **Database:** Supabase PostgreSQL with Row Level Security (RLS).
   - **Authentication:** Supabase Auth for administrative console access.
   - **Server-Side Operations:** Supabase Edge Functions used selectively where secure server-side operations, anti-abuse validation, and service-role ingestion are required.
   - **Custom Frameworks Excluded:** Obsolete proposals suggesting Hono, Express, or Fastify API servers have been completely removed.
2. **Simplified Administrative Permission Model:**
   - Single administrator permission level. A small number of controlled administrator accounts will be created.
   - **No Role-Based Access Control (RBAC):** Multi-tier RBAC (`Super Admin`, `Content Manager`, `Lead Manager`) has been removed from this website project.
   - **Future Management Software:** Clarified that future Avencis enterprise management software is strictly out of scope and its permission model will be designed separately.
3. **Confirmed Public Frontend Invariance:**
   - All existing public content, design, routes, typography, assessment questions, scoring formulas, and animations remain strictly preserved.

---

## 1. EXECUTIVE SUMMARY

This audit provides a code-level investigation into the complete Avencis web application frontend prior to connecting production persistence, authentication, and database services.

The Avencis website is an enterprise-grade digital platform targeted at **promoter-led mid-market enterprises (₹15 Cr to ₹150 Cr+ revenue)** across Indian manufacturing, auto-components, specialty chemicals, and capital goods. Its digital architecture is designed around high-trust conversion journeys, operational diagnostics, and structured executive interventions.

### Key Audit Conclusions:
1. **Frontend Completeness:** The public-facing site comprises **10 fully implemented routes and 34 custom UI components** with sophisticated positioning, typography, responsive breakpoints, and interaction models.
2. **Current Persistence Reality:** **Zero client-side submissions currently persist to a database or external API.** Every form handler (`Assessment.tsx`, `FinalCTA.tsx`, `InsightsPage.tsx`) either sets local React state (`setSubmitted(true)`), stores in-memory state, or opens deep links to WhatsApp (`wa.me`). If a visitor navigates away or refreshes, all submitted data is irrevocably lost.
3. **Discovered Data Capture Touchpoints:**
   - **Diagnostic Scale Assessment (`src/components/Assessment.tsx`):** 5 multi-choice questions measuring founder autonomy and engine health, scoring 25–100%, generating a bottleneck classification, and triggering a WhatsApp deep link. **100% anonymous; zero contact capture.**
   - **Primary Consultation & Discovery Form (`src/components/FinalCTA.tsx`):** 6 fields (`fullName`, `companyName`, `email`, `phone`, `revenueBracket`, `primaryChallenge`) submitted via local state toggle.
   - **Newsletter / Executive Briefing Subscription (`src/pages/InsightsPage.tsx`):** Inbound work email input with zero active click/submit handler.
   - **WhatsApp Attribution Links (`src/utils/whatsapp.ts`, `Section12FounderDependency.tsx`, `Section13GrowthStages.tsx`, `Section7CaseStudies.tsx`):** Deep-links encoding user intent, revenue brackets, and case study reference IDs into pre-filled WhatsApp chat messages.
4. **Architectural Gaps Discovered:**
   - **Business Directory:** Although listed in high-level project documentation, no public submission form (`/directory/register`) or directory catalogue (`/directory`) exists in `src/`. We have established the administrative governance interface in `src/admin/DirectoryManagement.tsx` to handle future submissions once approved.
   - **Gated Lead Magnets:** Standalone gated whitepaper PDF download forms were not implemented in the frontend. We have established `src/admin/LeadMagnetManagement.tsx` to prepare for inbound asset delivery once approved.
5. **CMS & Admin Management System Implementation:** A unified administrative console (`/admin` and `/admin/cms`) has been built and integrated into `src/App.tsx`, backed by clean data-access abstractions (`AdminStore` and `CmsStore`) without modifying the public site.

---

## 2. PROJECT STRUCTURE & FINALIZED TECHNICAL ARCHITECTURE

### 2.1 File & Directory Inventory
```
c:\Avencis Website\
├── audit\                            # Mandatory Pre-Backend Audit Documents
│   ├── PRE_BACKEND_AUDIT.md          # Comprehensive architecture & data audit (this document)
│   ├── FORM_INVENTORY.md             # Field-by-field form & journey matrix
│   ├── DATA_MODEL_PROPOSAL.md        # Supabase PostgreSQL relational schema proposal with RLS
│   ├── API_REQUIREMENTS.md           # Supabase Edge Functions & Client SDK specifications
│   ├── CMS_ADMIN_SPEC.md             # CMS & Admin Management System technical spec
│   ├── BACKEND_IMPLEMENTATION_PLAN.md# Phased Supabase deployment roadmap & decision matrix
│   └── BACKEND_READINESS_REPORT.md   # Synthesized readiness evaluation & blockers
├── public\
│   └── assets\                       # 19 static image assets (logos, portraits, diagrams)
├── src\
│   ├── admin\                        # Admin Management System & CMS Studio
│   │   ├── cms\                      # CMS Studio Views
│   │   │   ├── CmsDashboard.tsx      # CMS overview & KPIs
│   │   │   ├── CmsPageList.tsx       # 10 manageable public pages
│   │   │   ├── CmsPageEditor.tsx     # Structured field editor (headline, intro, SEO)
│   │   │   ├── CmsCaseStudies.tsx    # Turnaround case studies editor
│   │   │   ├── CmsInsights.tsx       # Thought leadership & articles editor
│   │   │   └── CmsMediaLibrary.tsx   # Asset catalog & SEO alt-text browser
│   │   ├── admin.css                 # Dedicated CSS for admin & CMS portal
│   │   ├── AdminDashboard.tsx        # Operations overview & metrics
│   │   ├── AdminLayout.tsx           # Enterprise sidebar, topbar, breadcrumb layout
│   │   ├── adminStore.ts             # Abstracted admin data store (demonstration data)
│   │   ├── cmsStore.ts               # Abstracted CMS data store (synced with siteData)
│   │   ├── DirectoryManagement.tsx   # Business directory approval/rejection console
│   │   ├── AssessmentManagement.tsx  # Diagnostic scoring & response audit
│   │   ├── ConsultationManagement.tsx# Inbound discovery consultation requests
│   │   ├── LeadManagement.tsx        # Centralized lead pipeline & operator notes
│   │   ├── LeadMagnetManagement.tsx  # Whitepaper downloads & delivery tracker
│   │   ├── types.ts                  # Shared administrative TypeScript contracts
│   │   └── UserManagement.tsx        # Administrator account listing & access overview
│   ├── components\                   # 34 reusable public UI components
│   ├── data\                         # siteData.ts (authoritative copy, cases, articles)
│   ├── pages\                        # 10 public page route wrappers
│   ├── utils\                        # WhatsApp formatting & helper utilities
│   ├── App.tsx                       # Main route tree with public & admin layout gating
│   ├── index.css                     # Design tokens, typography, glassmorphism CSS
│   └── main.tsx                      # Vite React 19 entry point
├── Dockerfile                        # Multi-stage Docker build
├── Dockerfile.dev                    # Local dev Docker configuration
├── docker-compose.yml                # Multi-service container orchestration
├── nginx.conf                        # Nginx reverse-proxy / SPA configuration
├── package.json                      # Project dependencies & build scripts
└── vite.config.ts                    # Vite configuration with React SWC plugin
```

### 2.2 Finalized Technology Stack
- **Frontend Framework:** React `19.2.8` with TypeScript `5.8.2` / `6.0.2` and Vite `8.3.0`
- **Routing Engine:** `react-router-dom` `7.18.4`
- **Hosting Platform:** **Cloudflare** (Cloudflare Pages for static SPA delivery; global CDN edge caching)
- **Database Engine:** **Supabase PostgreSQL** (Managed Postgres 15+ with Row Level Security)
- **Authentication Service:** **Supabase Auth** (Single administrator access level, email/password or magic link, no public sign-up)
- **Server-Side Execution:** **Supabase Edge Functions** (Deno/TypeScript runtime on Cloudflare/Deno edge, invoked for secure lead ingestion, server-side validation, Turnstile verification, and email alerts)
- **Client Integration:** `@supabase/supabase-js` client library for authenticated administrative dashboard operations and public content retrieval
- **Custom Frameworks:** **None.** No Hono, Express, or Fastify server processes.
- **Styling Architecture:** Vanilla CSS tokens & utilities (`index.css` and `admin.css`)

---

## 3. PUBLIC-FACING ROUTES INVENTORY

The following 10 public-facing routes exist in `src/App.tsx` and serve production traffic:

| Route Path | Route Component | Source File | Purpose & Content Scope |
|---|---|---|---|
| `/` | `HomePage` | `src/pages/HomePage.tsx` | Founder's Day conversion journey (18 sections, problem pointers, methodology teaser, proof of work). |
| `/what-we-do` | `WhatWeDoPage` | `src/pages/WhatWeDoPage.tsx` | Detailed operational intervention scope: Diagnostics, EMT governance, KPI dashboards, margin expansion. |
| `/methodology` | `MethodologyPage` | `src/pages/MethodologyPage.tsx` | The 4-Step Avencis Execution Framework: Diagnostic, Realignment, Cadence, Sustainable Handover. |
| `/case-studies` | `CaseStudiesPage` | `src/pages/CaseStudiesPage.tsx` | 3 mid-market turnaround case studies (Auto-Components, Specialty Chemicals, Capital Goods). |
| `/diagnostics` (also `/diagnostic`) | `DiagnosticPage` | `src/pages/DiagnosticPage.tsx` | The 5-question interactive Business Scale Diagnostic tool. |
| `/founder-dependency` (also `/dependency-index`) | `FounderDependencyPage` | `src/pages/FounderDependencyPage.tsx` | Diagnostic deep dive into promoter operational bottlenecking, decision friction, and delegation risks. |
| `/why-avencis` | `WhyAvencisPage` | `src/pages/WhyAvencisPage.tsx` | Avencis positioning: Implementation partners vs academic deck-generators; comparison matrix. |
| `/insights` | `InsightsPage` | `src/pages/InsightsPage.tsx` | 4 thought-leadership articles and executive newsletter capture. |
| `/book-assessment` | `BookAssessmentPage` | `src/pages/BookAssessmentPage.tsx` | High-intent page dedicated to booking the diagnostic assessment. |
| `/book-consultation` | `BookConsultationPage` | `src/pages/BookConsultationPage.tsx` | High-intent page dedicated to the 6-field strategic discovery booking form (`FinalCTA.tsx`). |

---

## 4. AUDIT OF INBOUND DATA COLLECTION & SUBMISSION FLOWS

### 4.1 The Business Scale Diagnostic (`src/components/Assessment.tsx`)
- **Location:** `src/components/Assessment.tsx` (Lines 1–172) and `src/components/AssessmentResult.tsx` (Lines 1–192)
- **Data Source:** `ASSESSMENT_QUESTIONS` in `src/data/siteData.ts` (Lines 698–759)
- **User Experience:**
  - Interactive 5-step wizard.
  - Progress bar indicates completion (0% to 100%).
  - The 5 Questions & Evaluated Operational Domains:
    1. **Founder Bandwidth (`emt-engine`):** *"If you were completely unavailable for 3 consecutive weeks without phone or email access, what would happen to the business?"* (Scores 1 to 4)
    2. **Sales & Revenue (`revenue-engine`):** *"How are new high-value client deals and renewals primarily originated and closed?"* (Scores 1 to 4)
    3. **Operations & Fulfilment (`operations-engine`):** *"How are operational delays, quality defects, and customer delivery friction managed?"* (Scores 1 to 4)
    4. **Cash Flow & Financials (`finance-engine`):** *"How predictable is your monthly cash flow, working capital cycle, and EBITDA margin?"* (Scores 1 to 4)
    5. **Leadership & EMT (`emt-engine`):** *"How would you describe your 2nd-tier management team (HODs / Department Leads)?"* (Scores 1 to 4)
- **Exact Scoring Formula & Logic (`src/components/Assessment.tsx`):**
  - `totalPossible = ASSESSMENT_QUESTIONS.length * 4` (20 points maximum).
  - `totalEarned = Object.values(updatedAnswers).reduce((a, b) => a + b, 0)` (Range: 5 to 20).
  - `percentageScore = Math.round((totalEarned / totalPossible) * 100)` (Range: 25% to 100%).
  - **Scoring Direction:** Higher score = Higher Autonomy / Lower Founder Dependency / Greater Scalability.
- **Thresholds & Classifications:**
  - **Bottleneck Classification:**
    - `< 45%`: `Severe Founder Sales & Cash Flow Bottleneck` (Focus: Deploy 13-Week Cash Flow Predictor and build standard Sales Playbook)
    - `45% to < 70%`: `Middle Management Escalation & Lack of Cross-Functional Cadence` (Focus: Establish Weekly EMT SLA Operating Rhythms & Visual Performance Dashboards)
    - `>= 70%`: `Enterprise Scaling & Board-Level Strategic Alignment` (Focus: Structure Strategic Business Reviews and M&A Valuation Readiness)
  - **Dependency Level:**
    - `< 50%`: `'High'`
    - `50% to < 75%`: `'Moderate'`
    - `>= 75%`: `'Low'`
  - **Readiness Grade (`AssessmentResult.tsx`):**
    - `< 40%`: `Grade D (Critical Dependency)`
    - `40% to < 60%`: `Grade C (High Bottleneck)`
    - `60% to < 80%`: `Grade B (Emerging EMT)`
    - `>= 80%`: `Grade A (High Institutional Scalability)`
- **Contact Details Collection:** **NONE.** The component collects **zero name, email, company, or phone coordinates**.
- **Current Persistence Reality:** Answers exist solely in local React state. No network call is made.

### 4.2 Consultation & Discovery Booking Form (`src/components/FinalCTA.tsx`)
- **Location:** `src/components/FinalCTA.tsx` (Lines 1–274)
- **Fields Collected:**
  1. `fullName`: Text (HTML `required`)
  2. `companyName`: Text (HTML `required`)
  3. `email`: Email (HTML `required`)
  4. `phone`: Tel (HTML `required`)
  5. `revenueBracket`: Dropdown `<select>` (Options: `₹5 Cr – ₹15 Cr`, `₹15 Cr – ₹50 Cr`, `₹50 Cr – ₹150 Cr`, `₹150 Cr+`)
  6. `primaryChallenge`: Dropdown `<select>` (5 configured operational challenge options)
- **Current Persistence Reality:**
  - Submission handler: `setSubmitted(true)`. Zero network calls. Lead vanishes completely on page refresh.
  - **Phase 1 Target:** Connect `FinalCTA.tsx` to a secure Supabase Edge Function (`submit-consultation`) persisting to Supabase PostgreSQL.

### 4.3 Newsletter & Executive Briefing Subscription (`src/pages/InsightsPage.tsx`)
- **Location:** `src/pages/InsightsPage.tsx` (Lines 81–99)
- **Fields Collected:** `<input type="email" placeholder="Enter your work email" />`
- **Current Persistence Reality:** No event handler attached. Submissions trigger no network action.

### 4.4 WhatsApp Attribution Flows (`src/utils/whatsapp.ts`)
- **Location:** `src/utils/whatsapp.ts` and components (`Section12FounderDependency.tsx`, `Section13GrowthStages.tsx`, `Section7CaseStudies.tsx`, `AssessmentResult.tsx`)
- **Mechanism:** Builds deep links to `https://wa.me/?text=${encodedMessage}` using structured keywords (`GROW`, `ASSESSMENT`, `FOUNDER`, `GROWTH`, `SCORE`, `CASE_STUDY`).

---

## 5. AUDIT OF BUSINESS DIRECTORY & LEAD MAGNET GAPS

### 5.1 Business Directory Status
- **Definitive Status:** **Missing from Public Frontend.**
- Repository inspection confirms no public registration route (e.g. `/directory/register`) or directory catalogue (`/directory`) exists in `src/`.
- **Administrative Implementation:** `src/admin/DirectoryManagement.tsx` exists as an internal console.
- **Decision:** Implementation of public directory registration remains out of scope for Phase 1 and requires separate business approval.

### 5.2 Lead Magnet Status
- **Definitive Status:** **Missing from Public Frontend.**
- Whitepapers are referenced in editorial copy, but no gated download modal exists on public pages.
- **Administrative Implementation:** `src/admin/LeadMagnetManagement.tsx` is built as an internal console.
- **Decision:** Implementation of gated lead magnet downloads remains out of scope for Phase 1 and requires separate business approval.

---

## 6. CMS PUBLICATION LIFECYCLE DISCONNECT

Tracing an edit through the current codebase:
1. Administrator edits headline in `/admin/cms/pages/page-home`.
2. `CmsPageEditor.tsx` calls `CmsStore.updatePage('page-home', updatedFields)`.
3. Publication status is set to `Published` in `cmsStore.ts` in-memory.
4. Visitor visits `http://localhost:5173/`.
   - `HomePage.tsx` renders `Section1Hero.tsx`, which executes `import { SECTION_1_CONTENT } from '../data/siteData';`.
   - The public component reads the compiled constant from `siteData.ts`. It does not read from `CmsStore`.
   - **Result:** The public page renders static text. CMS publication does not update public content in the current build.

---

## 7. ADMINISTRATIVE ACCESS CONTROL & SECURITY BOUNDARIES

1. **Single Administrator Permission Level:**
   - All authenticated administrator accounts possess equal administrative permissions to view leads, review assessments, update consultation statuses, and edit CMS pages.
   - **RBAC is excluded:** No multi-tier roles (`Super Admin`, `Content Manager`, `Lead Manager`) are implemented in this website project.
2. **Controlled Account Creation:**
   - Public administrator registration is strictly prohibited.
   - Administrator accounts are provisioned exclusively via Supabase Auth admin console or Supabase CLI invitation.
3. **Database Security via Row Level Security (RLS):**
   - Tables (`leads`, `consultation_requests`, `assessments`, `cms_pages`, `operator_notes`) have RLS enabled.
   - Public visitors (`anon` role) cannot query leads or consultation requests.
   - Authenticated administrators (`auth.role() = 'authenticated'`) have read/write access.
   - Public submissions bypass direct table inserts by submitting to Supabase Edge Functions using the `service_role` key server-side.

---

## 8. PHASED BACKEND IMPLEMENTATION ROADMAP

- **Phase 1 (Milestone 1 — Active):** Consultation Form (`FinalCTA.tsx`) → Supabase Edge Function (`submit-consultation`) → Supabase PostgreSQL (`consultation_requests` & `leads`) → Authenticated Admin Console via Supabase Auth.
- **Phase 2:** Anonymous Diagnostic Assessment Ingestion (`Assessment.tsx`) → Supabase Edge Function (`submit-assessment`) → `assessments` & `assessment_answers` tables.
- **Phase 3:** Newsletter Subscription Form (`InsightsPage.tsx`) → Supabase Edge Function (`submit-newsletter`) → `newsletter_subscribers` table.
- **Phase 4:** Headless CMS Storage & Public Content Hooks via Supabase Client reading `status = 'Published'`.
- **Phase 5:** Business Directory & Lead Magnets Public Journeys *(Subject to explicit business approval)*.
