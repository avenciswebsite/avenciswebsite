# API REQUIREMENTS SPECIFICATION — AVENCIS BACKEND

> **Architecture Standard:** Supabase Edge Functions + Supabase JS Client with Row Level Security (RLS)  
> **Auth Scheme:** Supabase Auth JWT Sessions (Single Administrator Permission Level)  
> **Anti-Abuse Standard:** Cloudflare Turnstile Token Verification in Edge Functions  
> **Authority Level:** Authoritative API Specification Reconciled with Finalized Architecture  

---

## CHANGES FROM PREVIOUS VERSION

1. **Replaced Custom API Server with Supabase Architecture:**
   - Obsolete proposals for custom Express/Fastify/Hono API servers have been completely removed.
   - **Public Ingestion:** Handled by Supabase Edge Functions (`POST /functions/v1/submit-consultation`), executing server-side validation, Cloudflare Turnstile bot verification, and service-role database insertion.
   - **Admin Operations:** Handled by direct `@supabase/supabase-js` SDK calls from the React admin portal, secured by Supabase Auth sessions and database Row Level Security (RLS).
2. **Simplified Administrative Access (No RBAC):**
   - Single administrator permission level. All authenticated admin accounts have equal access to operational data and CMS records.
3. **Phase 1 Milestone Focus:**
   - Detail the exact Edge Function contract for `submit-consultation` and the corresponding Supabase client query contracts for admin views.

---

## 1. ACCESS BOUNDARIES & SECURITY SCHEME

| Functional Boundary | Access Channel | Authentication Required | Authorization / Security Control |
|---|---|---|---|
| **Public Consultation Submission** | `POST /functions/v1/submit-consultation` (Edge Function) | No (Public) | Cloudflare Turnstile verification + Rate Limiting |
| **Public Assessment Submission** | `POST /functions/v1/submit-assessment` (Edge Function) | No (Public) | Input schema validation |
| **Public Newsletter Subscription** | `POST /functions/v1/submit-newsletter` (Edge Function) | No (Public) | Turnstile verification |
| **Public Content Retrieval** | `@supabase/supabase-js` | No (Public Anon Key) | RLS Policy: `status = 'Published'` |
| **Admin Authentication** | `supabase.auth.signInWithPassword` | Yes (Admin Credentials) | Supabase Auth (Controlled provisioning, no public sign-up) |
| **Admin Operations & CMS Data** | `@supabase/supabase-js` | Yes (Supabase Auth JWT) | RLS Policy: `auth.role() = 'authenticated'` (Single Admin Level) |

---

## 2. PUBLIC INGESTION CONTRACTS (SUPABASE EDGE FUNCTIONS)

### 2.1 `POST /functions/v1/submit-consultation` (PHASE 1 MILESTONE)
- **Purpose:** Ingests discovery booking submissions from `src/components/FinalCTA.tsx`.
- **Runtime:** Supabase Edge Function (Deno / TypeScript).
- **Security:** Validates Cloudflare Turnstile token using `TURNSTILE_SECRET_KEY`. Uses `SUPABASE_SERVICE_ROLE_KEY` internally to write to `leads` and `consultation_requests`.
- **Request Headers:**
  - `Content-Type: application/json`
  - `apikey: <SUPABASE_ANON_KEY>`
- **Request Body:**
```json
{
  "fullName": "Rajesh Singhania",
  "companyName": "Singhania Precision Castings Pvt Ltd",
  "email": "rajesh@singhaniacastings.com",
  "phone": "+91 98201 44521",
  "revenueBracket": "₹50 Cr – ₹150 Cr",
  "primaryChallenge": "Founder Operational Bottleneck & Firefighting",
  "attributionToken": "ASM-801A9C",
  "turnstileToken": "0.X.xxxxxxxxxxxxxxxxxxxx"
}
```
- **Validation Rules:**
  - `fullName`: string, 2–100 chars, trimmed.
  - `companyName`: string, 2–150 chars, trimmed.
  - `email`: valid RFC 5322 email string.
  - `phone`: valid Indian mobile `^(\+91[\-\s]?)?[6789]\d{9}$` or E.164 `^\+?[1-9]\d{1,14}$`.
  - `revenueBracket`: enum (`"₹5 Cr – ₹15 Cr"`, `"₹15 Cr – ₹50 Cr"`, `"₹50 Cr – ₹150 Cr"`, `"₹150 Cr+"`).
  - `primaryChallenge`: enum (
    `"Founder Operational Bottleneck & Firefighting"`,
    `"Building the Extended Management Team (EMT)"`,
    `"Working Capital / DSO & Cash Flow Compression"`,
    `"Sales Pipeline Predictability & Pricing Defense"`,
    `"Governance, Valuation & Institutional Scale"`
  ).
  - `attributionToken`: optional string, format `^ASM-[A-Z0-9]{6}$`.
  - `turnstileToken`: string, verified server-side via Cloudflare Turnstile API.
- **Server Execution Logic:**
  1. Verify `turnstileToken` with Cloudflare Siteverify API. Return HTTP 400 if invalid.
  2. Validate input fields using Zod/TypeScript schema.
  3. Query `leads` by email/phone. If existing lead found, link `lead_id`; otherwise create new `leads` record.
  4. Generate human-readable booking reference (e.g. `CON-9842`).
  5. Insert into `consultation_requests`.
  6. If `attributionToken` provided, link matching row in `assessments` to this `lead_id`.
  7. Return 201 Created.
- **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "bookingId": "CON-9842",
    "leadId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "Pending Contact",
    "message": "Consultation request recorded. An Avencis Senior Partner will reach out within 24 business hours."
  }
}
```
- **Error Responses:**
  - `400 Bad Request`: Validation failure or invalid Turnstile token.
  - `429 Too Many Requests`: IP rate limit exceeded.
  - `500 Internal Server Error`: Database insertion failure.

---

### 2.2 `POST /functions/v1/submit-assessment` (PHASE 2)
- **Purpose:** Ingests 5-question responses anonymously from `src/components/Assessment.tsx`, calculates score server-side, and stores result.
- **Request Body (100% Anonymous):**
```json
{
  "answers": [
    { "questionId": 1, "selectedScore": 2 },
    { "questionId": 2, "selectedScore": 3 },
    { "questionId": 3, "selectedScore": 1 },
    { "questionId": 4, "selectedScore": 2 },
    { "questionId": 5, "selectedScore": 4 }
  ],
  "anonymousSessionId": "550e8400-e29b-41d4-a716-446655440000"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "attributionToken": "ASM-801A9C",
    "overallScore": 60,
    "dependencyLevel": "Moderate",
    "readinessGrade": "Grade B (Emerging EMT)",
    "primaryBottleneck": "Middle Management Escalation & Lack of Cross-Functional Cadence",
    "recommendedFocus": "Establish Weekly EMT SLA Operating Rhythms & Visual Performance Dashboards.",
    "whatsAppDeepLink": "https://wa.me/?text=Hi%20Avencis%2C%20I%20completed%20the%20Business%20Scale%20Assessment%20on%20your%20website.%20My%20score%20is%2060%2F100...%20(Ref%3A%20ASM-801A9C)"
  }
}
```

---

### 2.3 `POST /functions/v1/submit-newsletter` (PHASE 3)
- **Purpose:** Captures work email subscriptions from `src/pages/InsightsPage.tsx`.
- **Request Body:** `{ "email": "promoter@enterprise.in", "sourcePage": "/insights" }`
- **Response (200 OK):** `{ "success": true, "message": "Subscribed to monthly founder briefings." }`

---

## 3. ADMINISTRATIVE DATA ACCESS (SUPABASE JS SDK + RLS)

All administrative operations in the `/admin` portal are performed directly via `@supabase/supabase-js` using the authenticated administrator's JWT session. There is **one administrator permission level**; every authenticated admin has full read/write access under RLS.

### 3.1 Authentication Operations
- **Admin Sign-In:**
  ```typescript
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  ```
- **Admin Sign-Out:**
  ```typescript
  await supabase.auth.signOut();
  ```
- **Session Check:**
  ```typescript
  const { data: { session } } = await supabase.auth.getSession();
  ```

### 3.2 Operations Console Queries
- **Fetch Consultations:**
  ```typescript
  const { data, error } = await supabase
    .from('consultation_requests')
    .select(`
      id,
      booking_reference,
      revenue_bracket,
      primary_challenge,
      status,
      created_at,
      leads ( id, full_name, company_name, email, phone )
    `)
    .order('created_at', { ascending: false });
  ```
- **Update Consultation Status:**
  ```typescript
  const { error } = await supabase
    .from('consultation_requests')
    .update({ status: 'Discovery Scheduled' })
    .eq('id', consultationId);
  ```
- **Add Operator Note:**
  ```typescript
  const { error } = await supabase
    .from('operator_notes')
    .insert({
      author_user_id: session.user.id,
      target_entity_type: 'consultation',
      target_entity_id: consultationId,
      content: 'Promoter confirmed availability for Tuesday 11 AM.',
    });
  ```
- **Fetch Leads Pipeline:**
  ```typescript
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  ```
- **Update Lead Status:**
  ```typescript
  const { error } = await supabase
    .from('leads')
    .update({ status: 'Qualified' })
    .eq('id', leadId);
  ```

### 3.3 CMS Studio Queries
- **Fetch Manageable Pages:**
  ```typescript
  const { data, error } = await supabase
    .from('cms_pages')
    .select('*');
  ```
- **Update Page Content:**
  ```typescript
  const { error } = await supabase
    .from('cms_pages')
    .update({
      headline: updatedHeadline,
      subheadline: updatedSubheadline,
      seo_title: updatedSeoTitle,
      status: 'Published',
      updated_at: new Date().toISOString()
    })
    .eq('id', pageId);
  ```

---

## 4. PUBLIC CONTENT RETRIEVAL (CACHED CDN READS)

Public website components read published CMS data directly using the Supabase client:
```typescript
const { data, error } = await supabase
  .from('cms_pages')
  .select('*')
  .eq('slug', '/')
  .eq('status', 'Published')
  .single();
```
- **RLS Security:** Anonymous users can ONLY read records where `status = 'Published'`.
- **Edge Caching:** Cloudflare caches these responses at the edge with `Cache-Control: public, s-maxage=300`.
- **Fallback Guarantee:** If the network request fails or returns empty, public components seamlessly render their hardcoded fallback constants from `src/data/siteData.ts`.
