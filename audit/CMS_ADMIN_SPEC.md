# CMS & ADMIN MANAGEMENT SYSTEM SPECIFICATION — AVENCIS CONSOLE

> **Implementation Status:** Fully Implemented Frontend in `src/admin`  
> **Route Base:** `/admin` (Operations Console) and `/admin/cms` (Content Studio)  
> **Access Model:** Single Administrator Permission Level via Supabase Auth (No RBAC)  
> **State Abstraction:** In-Memory Stores (`AdminStore` & `CmsStore`) to be connected to Supabase  
> **Aesthetic Standard:** Avencis Enterprise Design System (`index.css` & `admin.css`)  
> **Authority Level:** Authoritative Specification Reconciled with Finalized Architecture  

---

## CHANGES FROM PREVIOUS VERSION

1. **Standardized on Single Administrator Permission Level:**
   - Removed the 3-role RBAC permission matrix (`Super Admin`, `Content Manager`, `Lead Manager`).
   - Every authorized administrator possesses full operational and CMS editing privileges.
   - Clarified that future Avencis enterprise software permission systems are strictly out of scope and will be designed separately.
2. **Reconciled Data Layer to Supabase:**
   - Transitioning `AdminStore` and `CmsStore` to `@supabase/supabase-js` client SDK calls governed by Supabase Auth sessions and Row Level Security (RLS).
3. **Confirmed Public Frontend Invariance:**
   - Public pages, layout, styling, and typography remain strictly untouched during administrative backend integration.

---

## 1. ARCHITECTURAL OVERVIEW

The administrative system is architected as an internal enterprise console embedded within the existing Avencis React 19 application. It preserves all 10 public routes, styling conventions, typography, and assets while providing internal operators with two focused environments:

1. **Admin Operations Console (`/admin`):**
   Manages the commercial and operational pipeline: Inbound Leads, Business Directory submissions, Diagnostic Assessment audits, Consultation bookings, Lead Magnet requests, and Administrator account overviews.
2. **Content Management Studio (`/admin/cms`):**
   Provides structured editing for the public website: Hero headlines, strategic positioning, narrative intro copy, SEO metadata, Turnaround Case Studies, Insight articles, and the Media Asset catalog.

---

## 2. THE CMS PUBLICATION LIFECYCLE & LIVE SITE DISCONNECT

### 2.1 The 5-Step Lifecycle Trace
Tracing an edit through the current codebase:

1. **Step 1 (Open):** An administrator opens `/admin/cms/pages/page-home`. `CmsPageEditor.tsx` loads the initial record from `CmsStore.getPageById('page-home')`.
2. **Step 2 (Edit):** The administrator edits the headline field from *"Build an Enterprise That Scales Without You"* to a new draft.
3. **Step 3 (Save):** The administrator clicks **Save Content**. `handleSave()` calls `CmsStore.updatePage('page-home', updatedFields)`.
4. **Step 4 (Status):** Publication status is set to `Published` in `cmsStore.ts`.
5. **Step 5 (Public Render):** A visitor opens `http://localhost:5173/` (the Homepage).
   - **THE DISCONNECT:** `HomePage.tsx` renders `<Section1Hero />`.
   - `Section1Hero.tsx` executes:
     ```typescript
     import { SECTION_1_CONTENT } from '../data/siteData';
     ```
   - It renders `{SECTION_1_CONTENT.headline}`, which reads the compiled TypeScript constant from `siteData.ts`.
   - It **does not import** `CmsStore`. It **does not query** an API.
   - **Result:** The public page still displays the original static text. **CMS publication does NOT update public website content in the current build.**

### 2.2 Live Preview vs Public Site Update
- **Live Component Preview Modal:** Within `CmsPageEditor.tsx`, clicking the "Preview" button opens a modal that takes the in-memory React state `page.headline` and renders it inside a preview card. This provides a visual confirmation for the operator.
- **Public Site Route:** Navigating to the public route `/` renders the static component. Furthermore, refreshing the browser clears in-memory state in `cmsStore.ts` and resets it back to `INITIAL_PAGES`.

### 2.3 Scope of Structured CMS Editability

| Content Type | Current CMS Editability Scope | Elements Remaining Hardcoded in React |
|---|---|---|
| **Public Pages (10 routes)** | Partially Editable. Hero headline, subheadline, eyebrow kicker badge, body intro, and SEO meta tags are editable in `CmsPageEditor.tsx`. | Intermediate section copy, problem pointers, process cards, methodology pillars, and FAQ text are hardcoded in component JSX and `siteData.ts`. |
| **Case Studies (3 studies)** | Genuinely Editable. Title, sector, turnover, challenge, intervention, result highlight, narrative, and WhatsApp tag are modeled in `CmsCaseStudies.tsx`. | Public display on `/case-studies` still imports from `APPROVED_CASE_STUDIES` in `siteData.ts`. |
| **Articles / Insights (4 pieces)**| Genuinely Editable. Title, slug, read time, summary, full markdown body, author, and date are modeled in `CmsInsights.tsx`. | Public display on `/insights` still imports from `INSIGHT_ARTICLES` in `siteData.ts`. |
| **Media Library (19 assets)** | Metadata Editable. SEO alt-text is editable in `CmsMediaLibrary.tsx`. | Physical image files are static assets in `/public/assets`. |
| **Assessment Questions** | **Not Editable in CMS.** Hardcoded in `src/data/siteData.ts` (`ASSESSMENT_QUESTIONS`). | Questions, options, scores, and bottleneck formulas must be edited in source code. |

---

## 3. ADMIN MANAGEMENT SYSTEM PAGES & FEATURES

### 3.1 Admin Overview Dashboard (`src/admin/AdminDashboard.tsx`)
- **Route:** `/admin`
- **Features:** 4 Executive Metric Cards (Total Leads, Diagnostic Assessments, Business Directory Submissions, Consultation Bookings), demonstration demarcation alert, and recent inbound leads feed.

### 3.2 Lead & Enquiry Management (`src/admin/LeadManagement.tsx`)
- **Route:** `/admin/leads`
- **Features:** Real-time search, multi-status filtering (`New`, `Contacted`, `Qualified`, `Converted`, `Archived`), slide-in inspection drawer, and interactive operator notes feed.

### 3.3 Business Directory Management (`src/admin/DirectoryManagement.tsx`)
- **Route:** `/admin/directory`
- **Features:** Enterprise catalog listing, review status filters (`Pending`, `Approved`, `Rejected`), approval/rejection modal with mandatory rejection reasons, and public visibility toggle.

### 3.4 Business Diagnostic Assessment Audits (`src/admin/AssessmentManagement.tsx`)
- **Route:** `/admin/assessments`
- **Features:** Diagnostic submission audit table with score (0–100%), dependency risk badge, breakdown modal with question-by-question response audit, and status updates.

### 3.5 Consultation & Discovery Requests (`src/admin/ConsultationManagement.tsx`) (PHASE 1 ACTIVE MILESTONE)
- **Route:** `/admin/consultations`
- **Features:** Discovers bookings from `FinalCTA.tsx`, status filter (`Pending Contact`, `Discovery Scheduled`, `Completed`, `Cancelled`), revenue scale, reported operational challenge, and operator notes feed.

### 3.6 Lead Magnet Submissions & Content Delivery (`src/admin/LeadMagnetManagement.tsx`)
- **Route:** `/admin/lead-magnets`
- **Features:** Whitepaper digital asset catalog, download submission logs, delivery status, and follow-up stages (`Uncontacted`, `Email Sent`, `Followed Up`).

### 3.7 Administrator Governance (`src/admin/UserManagement.tsx`)
- **Route:** `/admin/users`
- **Confirmed Access Model:**
  - **Single Administrator Permission Level:** Every authenticated administrator has full operational and editorial permissions.
  - **No RBAC:** Multi-tier role matrix is removed.
  - **Controlled Provisioning:** Administrator accounts are provisioned exclusively via the Supabase Auth console or invitation CLI. No public user registration.

---

## 4. CONTENT MANAGEMENT STUDIO (CMS) PAGES & FEATURES

### 4.1 CMS Overview Dashboard (`src/admin/cms/CmsDashboard.tsx`)
- **Route:** `/admin/cms`
- **Features:** KPI metrics (10 Manageable Pages, Published vs Draft counts, 3 Case Studies, 4 Articles, 19 Media Assets) and quick action navigation.

### 4.2 Manageable Pages Directory (`src/admin/cms/CmsPageList.tsx`)
- **Route:** `/admin/cms/pages`
- **Features:** Lists all 10 live public routes with title, route slug, category, and publication badges.

### 4.3 Structured Page Editor (`src/admin/cms/CmsPageEditor.tsx`)
- **Route:** `/admin/cms/pages/:id`
- **Features:** Structured inputs for Eyebrow Badge, Hero Headline, Subheadline, Body Intro, and Publication Status (`Published`, `Draft`, `Archived`). SEO studio with live character counters. Component preview modal.

### 4.4 Case Studies Manager (`src/admin/cms/CmsCaseStudies.tsx`)
- **Route:** `/admin/cms/case-studies`
- **Features:** Manages the 3 approved turnaround records: Auto-Components (₹65 Cr to ₹110 Cr), Specialty Chemicals (₹45 Cr to ₹78 Cr), Capital Goods (₹80 Cr to ₹135 Cr).

### 4.5 Insights & Thought Leadership (`src/admin/cms/CmsInsights.tsx`)
- **Route:** `/admin/cms/insights`
- **Features:** Manages editorial thought leadership pieces for `/insights`.

### 4.6 Media Asset Library (`src/admin/cms/CmsMediaLibrary.tsx`)
- **Route:** `/admin/cms/media`
- **Features:** Discovers 19 assets in `/public/assets`. Displays dimensions, file size, MIME type. Allows editing SEO alt-text metadata.

---

## 5. TECHNICAL TRANSITION TO PRODUCTION SUPABASE

1. **Phase 1 Ingestion Integration:**
   - Swap `AdminStore.getConsultations` and `updateConsultationStatus` in [ConsultationManagement.tsx](file:///c:/Avencis%20Website/src/admin/ConsultationManagement.tsx) to query Supabase directly under Supabase Auth:
     ```typescript
     const { data, error } = await supabase
       .from('consultation_requests')
       .select('*, leads(*)');
     ```
2. **CMS Publishing Transition (Phase 4):**
   - Connect `cmsStore.ts` methods to query `cms_pages` table in Supabase.
   - Public components query published records where `status = 'Published'`, falling back gracefully to `src/data/siteData.ts` if offline.
