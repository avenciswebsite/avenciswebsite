# DATA MODEL PROPOSAL — AVENCIS RELATIONAL PERSISTENCE SCHEMA

> **Confirmed Engine:** Supabase PostgreSQL (Postgres 15+)  
> **Security Architecture:** Row Level Security (RLS) Enabled with Least-Privilege `public.is_admin()` Policies  
> **Authentication Linkage:** Integrated with Supabase Auth (`auth.users`)  
> **Authority Level:** Authoritative Schema Reconciled with Finalized Single-Admin Architecture  

---

## CHANGES FROM PREVIOUS VERSION

1. **Reconciled Administrator RLS Enforcement (`public.is_admin()`):**
   - Replaced naive `TO authenticated USING (true)` policies with strict `public.is_admin()` evaluation. Authentication alone does NOT grant administrative privileges; only explicitly registered accounts in `public.admin_users` can view private business data.
2. **Captured `company_name` in `leads`:**
   - Added `company_name VARCHAR(255) NOT NULL` directly to `leads` so company names collected from `FinalCTA.tsx` are never dropped or left dependent on optional enterprise links.
3. **Atomic Consultation Submission Procedure (`public.submit_consultation`):**
   - Added transaction-safe stored procedure handling lead matching/creation, duplicate click idempotency, reference generation, and consultation booking in a single ACID transaction.
4. **Serverless Database Rate Limiting:**
   - Added `public.rate_limits` table and `public.check_rate_limit()` function to enforce serverless IP rate limiting directly in PostgreSQL.

---

## 1. ENTITY RELATIONSHIP ARCHITECTURE

```
                      ┌──────────────────────┐
                      │     enterprises      │
                      └──────────┬───────────┘
                                 │ 1:N
                                 ▼
┌──────────────────────┐ 0..1:N ┌──────────────────────┐ 1:N  ┌────────────────────────┐
│     assessments      │◄───────┤        leads         ├─────►│ consultation_requests  │
└──────────┬───────────┘        └──────────┬───────────┘      └────────────────────────┘
           │ 1:N                           │ 1:N
           ▼                               ▼
┌──────────────────────┐        ┌──────────────────────┐ 1:1  ┌────────────────────────┐
│  assessment_answers  │        │ lead_magnet_submiss. ├─────►│    delivery_events     │
└──────────────────────┘        └──────────────────────┘      └────────────────────────┘
                                           │
                                           ▼
                                ┌──────────────────────┐
                                │  directory_submiss.  │
                                └──────────────────────┘
```

---

## 2. PHASE 1 MINIMAL DATABASE SCHEMA (ACTIVE MILESTONE)

### 2.1 `enterprises` (Company Profiles)
Stores business entities identified across consultations.

| Column Name | SQL Data Type | Constraints & Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique enterprise identifier |
| `name` | `VARCHAR(255)` | `NOT NULL` | Legal or operating business name |
| `industry_sector` | `VARCHAR(100)` | `NULL` | Industry category |
| `annual_turnover_bracket` | `VARCHAR(50)` | `NULL` | Revenue bracket (₹50 Cr–₹150 Cr, etc.) |
| `city` | `VARCHAR(100)` | `NULL` | Headquarters city |
| `state` | `VARCHAR(100)` | `NULL` | State / Region |
| `website` | `VARCHAR(255)` | `NULL` | Corporate website URL |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()` | Record creation timestamp |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()` | Last update timestamp |

**Row Level Security (RLS) Policy:**
```sql
ALTER TABLE enterprises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins full access on enterprises"
  ON enterprises FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
```

---

### 2.2 `leads` (Promoter Contacts)
The unified contact record for any person submitting inquiries.

| Column Name | SQL Data Type | Constraints & Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique lead contact ID |
| `enterprise_id` | `UUID` | `NULL REFERENCES enterprises(id) ON DELETE SET NULL` | Linked business entity |
| `full_name` | `VARCHAR(255)` | `NOT NULL` | Promoter / executive full name |
| `company_name` | `VARCHAR(255)` | `NOT NULL` | Registered company name from submission |
| `email` | `VARCHAR(255)` | `NOT NULL` | Primary email (Index, non-unique) |
| `phone` | `VARCHAR(50)` | `NULL` | Phone / Mobile coordinate |
| `primary_source` | `VARCHAR(50)` | `NOT NULL DEFAULT 'Consultation Form'` | Origin journey |
| `status` | `VARCHAR(50)` | `NOT NULL DEFAULT 'New'` | Workflow status (`New`, `Contacted`, `Qualified`, `Converted`, `Archived`) |
| `anonymous_session_id` | `VARCHAR(100)` | `NULL` | Client session UUID for retroactive attribution linking |
| `whatsapp_contacted` | `BOOLEAN` | `NOT NULL DEFAULT FALSE` | Whether promoter initiated WhatsApp chat |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()` | Timestamp of first inbound touchpoint |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()` | Timestamp of last status change |

**Indexes:**
```sql
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_session ON leads(anonymous_session_id);
CREATE INDEX idx_leads_status ON leads(status);
```

**Row Level Security (RLS) Policy:**
```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins full access on leads"
  ON leads FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
```

---

### 2.3 `consultation_requests` (Discovery Bookings)
Direct 1-to-1 bookings submitted through `FinalCTA.tsx`.

| Column Name | SQL Data Type | Constraints & Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique booking identifier |
| `lead_id` | `UUID` | `NOT NULL REFERENCES leads(id) ON DELETE CASCADE` | Associated contact lead |
| `booking_reference` | `VARCHAR(50)` | `NOT NULL UNIQUE` | Human-readable identifier (e.g. `CON-9842`) |
| `revenue_bracket` | `VARCHAR(50)` | `NOT NULL` | Dropdown value (`₹5 Cr – ₹15 Cr`, `₹15 Cr – ₹50 Cr`, `₹50 Cr – ₹150 Cr`, `₹150 Cr+`) |
| `primary_challenge` | `VARCHAR(255)` | `NOT NULL` | Dropdown value (5 configured options from `FinalCTA.tsx`) |
| `status` | `VARCHAR(50)` | `NOT NULL DEFAULT 'Pending Contact'` | `Pending Contact`, `Discovery Scheduled`, `Completed`, `Cancelled` |
| `scheduled_for` | `TIMESTAMPTZ` | `NULL` | Confirmed discovery meeting time |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()` | Submission timestamp |

**Indexes:**
```sql
CREATE INDEX idx_consultations_lead ON consultation_requests(lead_id);
CREATE INDEX idx_consultations_status ON consultation_requests(status);
CREATE INDEX idx_consultations_reference ON consultation_requests(booking_reference);
```

**Row Level Security (RLS) Policy:**
```sql
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins full access on consultation_requests"
  ON consultation_requests FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
```

---

### 2.4 `admin_users` (Administrator Profiles)
Tracks administrative user metadata linked to Supabase Auth (`auth.users`).

| Column Name | SQL Data Type | Constraints & Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE` | Linked Supabase Auth user ID |
| `email` | `VARCHAR(255)` | `NOT NULL UNIQUE` | Official login email |
| `full_name` | `VARCHAR(255)` | `NOT NULL` | Administrator name |
| `is_active` | `BOOLEAN` | `NOT NULL DEFAULT TRUE` | Active administrator toggle |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()` | Creation timestamp |

**Row Level Security (RLS) Policy:**
```sql
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view admin_users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (public.is_admin());
```

---

### 2.5 `operator_notes` (Internal Consultation & Lead Notes)
Internal notes recorded by Avencis partners in the admin portal.

| Column Name | SQL Data Type | Constraints & Defaults | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Note identifier |
| `author_user_id`| `UUID` | `NOT NULL REFERENCES admin_users(id)` | Authoring admin user |
| `target_entity_type` | `VARCHAR(50)` | `NOT NULL` | `lead`, `consultation`, `directory`, `assessment` |
| `target_entity_id` | `UUID` | `NOT NULL` | ID of the linked record |
| `content` | `TEXT` | `NOT NULL` | Internal commentary |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()` | Note creation timestamp |

**Row Level Security (RLS) Policy:**
```sql
ALTER TABLE operator_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins full access on operator_notes"
  ON operator_notes FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
```

---

### 2.6 Security Functions & Stored Procedures

```sql
-- Helper: Checks whether auth.uid() is an active administrator
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

-- Atomic Consultation Submission Procedure
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
...
$$;
```
