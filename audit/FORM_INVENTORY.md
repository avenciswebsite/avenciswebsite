# FORM & SUBMISSION JOURNEYS INVENTORY — AVENCIS WEBSITE

> **Audit Date:** October 2026 (Final Reconciled Edition)  
> **Audited Repository:** `Avencis Website` (Root: `c:\Avencis Website`)  
> **Frontend Stack:** React 19.2.8, TypeScript 5.8.2 / 6.0.2, Vite 8.3.0, React Router 7.18.4  
> **Target Ingestion:** Supabase Edge Functions & Supabase PostgreSQL with RLS  
> **Authority Level:** Authoritative Reconciled Inventory  

---

## CHANGES FROM PREVIOUS VERSION

1. **Target Ingestion Reconciled to Supabase:**
   - Replaced generic custom REST server routes with Supabase Edge Functions (`/functions/v1/submit-consultation`, etc.) and Supabase PostgreSQL tables.
2. **Simplified Administrative Access:**
   - Single administrator access level authenticated through Supabase Auth. RBAC references have been removed.
3. **Phase 1 Priority Alignment:**
   - FORM-01 (`FinalCTA.tsx`) is confirmed as the sole active milestone for Phase 1.
4. **Preserved Confirmed Logic:**
   - FORM-02 (Diagnostic) preserved as 100% anonymous with exact scoring formulas.
   - FORM-06 and FORM-07 remain documented as missing from frontend and requiring separate approval before building.

---

## 1. INVENTORY OVERVIEW

| Journey # | Form / Journey Name | Route | Source File | Status in Frontend | Phase 1 Target |
|---|---|---|---|---|---|
| **FORM-01** | Primary Consultation & Strategic Discovery | `/book-consultation` & section on `/` | `src/components/FinalCTA.tsx` | Functional UI; Zero Persistence (Local State) | **Active Milestone 1** (Supabase Edge Function + PostgreSQL) |
| **FORM-02** | Business Scale Diagnostic Assessment | `/diagnostics`, `/book-assessment` | `src/components/Assessment.tsx` | Functional UI; 100% Anonymous; Zero Persistence | Phase 2 |
| **FORM-03** | Executive Briefing Newsletter Subscription | `/insights` | `src/pages/InsightsPage.tsx` | Static UI Only; No Click/Submit Handler | Phase 3 |
| **FLOW-04** | Case Study Inbound Attribution Flow | `/case-studies` | `src/components/Section7CaseStudies.tsx` | WhatsApp Deep-Link with Topic Parameter | Phase 2/3 Telemetry |
| **FLOW-05** | Founder Dependency Diagnostic Teaser | `/founder-dependency`, `/` | `src/components/Section12FounderDependency.tsx` | WhatsApp Deep-Link with Stage Parameter | Phase 2/3 Telemetry |
| **FORM-06** | Business Directory Profile Submission *(Proposed)* | `/directory/register` *(Planned)* | `src/admin/DirectoryManagement.tsx` *(Admin)* | Schema Defined; Admin UI Built; Public Form Missing | Out of Scope (Requires Approval) |
| **FORM-07** | Executive Lead Magnet Download *(Proposed)* | `/resources/*` *(Planned)* | `src/admin/LeadMagnetManagement.tsx` *(Admin)* | Schema Defined; Admin UI Built; Public Form Missing | Out of Scope (Requires Approval) |

---

## 2. DETAILED FIELD-LEVEL AUDIT BY FORM

### FORM-01: Primary Consultation & Strategic Discovery Form (PHASE 1 MILESTONE)

- **1. Form Name:** Strategic Discovery & Consultation Booking Form
- **2. Public Page & Route:** `/book-consultation` (and embedded as the final conversion section on `/`)
- **3. Source Component & File Path:** `src/components/FinalCTA.tsx` (Lines 1–274)
- **4. Purpose:** Primary bottom-of-funnel conversion form allowing enterprise promoters (₹15 Cr–₹150 Cr+) to request a confidential 45-minute 1-on-1 strategic discovery session with an Avencis Senior Partner.
- **5. All Fields Collected:**
  - `fullName`: Full name of the promoter/executive
  - `companyName`: Registered enterprise or brand name
  - `email`: Corporate/business email address
  - `phone`: Mobile/WhatsApp contact number
  - `revenueBracket`: Current annual company revenue range
  - `primaryChallenge`: Primary operational growth challenge
- **6. Field Types & JSX Controls:**
  - `fullName`: `string` (`<input type="text" required placeholder="e.g. Rahul Mehta" />`)
  - `companyName`: `string` (`<input type="text" required placeholder="e.g. Apex Precision Pvt Ltd" />`)
  - `email`: `string` (`<input type="email" required placeholder="founder@company.com" />`)
  - `phone`: `string` (`<input type="tel" required placeholder="+91 98765 43210" />`)
  - `revenueBracket`: `string` (`<select required>`) with 4 options:
    - `"₹5 Cr – ₹15 Cr"`
    - `"₹15 Cr – ₹50 Cr"` (default)
    - `"₹50 Cr – ₹150 Cr"`
    - `"₹150 Cr+"`
  - `primaryChallenge`: `string` (`<select required>`) with 5 options:
    - `"Founder Operational Bottleneck & Firefighting"` (default)
    - `"Building the Extended Management Team (EMT)"`
    - `"Working Capital / DSO & Cash Flow Compression"`
    - `"Sales Pipeline Predictability & Pricing Defense"`
    - `"Governance, Valuation & Institutional Scale"`
- **7. Required / Optional Status:** All 6 fields have the HTML `required` attribute.
- **8. Validation Rules:** Standard HTML5 browser validation for email and required fields.
- **9. Existing Submission Handler:**
  ```typescript
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  ```
- **10. Current Persistence Behaviour:** **Zero persistence.** All entered values vanish when the browser is refreshed.
- **11. Target Phase 1 Submission Architecture:**
  - `FinalCTA.tsx` submits payload to Supabase Edge Function: `POST /functions/v1/submit-consultation`.
  - Edge Function validates input parameters, optionally checks Cloudflare Turnstile token, and inserts records into Supabase PostgreSQL tables `leads` and `consultation_requests` using the server-side `service_role` key.
  - Returns `{ success: true, bookingId: "CON-..." }`.
  - Authenticated admin portal ([ConsultationManagement.tsx](file:///c:/Avencis%20Website/src/admin/ConsultationManagement.tsx)) retrieves submissions via `@supabase/supabase-js` under Row Level Security.

---

### FORM-02: Business Scale Diagnostic Assessment

- **1. Form Name:** Interactive Business Scale Assessment (Founder Autonomy Diagnostic)
- **2. Public Page & Route:** `/diagnostics`, `/diagnostic`, and `/book-assessment`
- **3. Source Component & File Path:** `src/components/Assessment.tsx` (Lines 1–172) & `src/components/AssessmentResult.tsx` (Lines 1–192)
- **4. Data Authority:** `ASSESSMENT_QUESTIONS` in `src/data/siteData.ts` (Lines 698–759)
- **5. All Questions & Options Collected:**
  - **Q1 (Founder Bandwidth, `emt-engine`):** *"If you were completely unavailable for 3 consecutive weeks without phone or email access, what would happen to the business?"* (Scores 1 to 4)
  - **Q2 (Sales & Revenue, `revenue-engine`):** *"How are new high-value client deals and renewals primarily originated and closed?"* (Scores 1 to 4)
  - **Q3 (Operations & Fulfilment, `operations-engine`):** *"How are operational delays, quality defects, and customer delivery friction managed?"* (Scores 1 to 4)
  - **Q4 (Cash Flow & Financials, `finance-engine`):** *"How predictable is your monthly cash flow, working capital cycle, and EBITDA margin?"* (Scores 1 to 4)
  - **Q5 (Leadership & EMT, `emt-engine`):** *"How would you describe your 2nd-tier management team (HODs / Department Leads)?"* (Scores 1 to 4)
- **6. Contact Details Collected:** **NONE.** The component collects no name, email, phone, or company name. It is 100% anonymous.
- **7. Scoring Formula & Direction:**
  - `totalPossible = 5 * 4 = 20` points.
  - `totalEarned = Sum of 5 selected scores (range 5 to 20)`.
  - `percentageScore = Math.round((totalEarned / 20) * 100)` (range 25% to 100%).
  - **Direction:** Higher score = Higher Autonomy / Lower Bottleneck.
- **8. Target Phase 2 Architecture:**
  - Ingested anonymously via Supabase Edge Function `submit-assessment` into Supabase PostgreSQL `assessments` and `assessment_answers` tables.
  - Generates unique `attribution_token` (e.g. `ASM-9A3F12`) for WhatsApp deep link and retroactive consultation linking.

---

### FORM-03: Executive Briefing Newsletter Subscription

- **1. Form Name:** Monthly Founder Briefing Email Newsletter Strip
- **2. Public Page & Route:** `/insights` (Bottom banner)
- **3. Source Component & File Path:** `src/pages/InsightsPage.tsx` (Lines 81–99)
- **4. Fields Rendered:** `<input type="email" placeholder="Enter your work email" />`
- **5. Submission Handler:** **Missing.** No `value`, `onChange`, `onSubmit`, or `onClick` handler is attached.
- **6. Target Phase 3 Architecture:** Bind input to state, submit to Supabase Edge Function `submit-newsletter`, insert into `newsletter_subscribers` table.

---

### FLOW-04 & FLOW-05: Conversational WhatsApp Deep-Link Attribution Flows

- **1. Source Components & File Paths:**
  - `src/components/Section7CaseStudies.tsx`
  - `src/components/Section12FounderDependency.tsx`
  - `src/components/Section13GrowthStages.tsx`
  - `src/components/AssessmentResult.tsx`
  - `src/utils/whatsapp.ts`
- **2. Mechanism:** Generates `https://wa.me/?text=${encodedText}` URLs with keywords (`GROW`, `ASSESSMENT`, `FOUNDER`, `GROWTH`, `SCORE`, `CASE_STUDY`).

---

### FORM-06: Business Directory Profile Submission *(Proposed — Requires Approval)*

- **1. Status:** Missing from frontend. Proposed route: `/directory/register`.
- **2. Administrative Component:** `src/admin/DirectoryManagement.tsx`.
- **3. Decision:** Out of scope for Phase 1. Requires explicit business approval.

---

### FORM-07: Executive Lead Magnet Download Form *(Proposed — Requires Approval)*

- **1. Status:** Missing from frontend. Proposed route: modal on `/insights`.
- **2. Administrative Component:** `src/admin/LeadMagnetManagement.tsx`.
- **3. Decision:** Out of scope for Phase 1. Requires explicit business approval.
