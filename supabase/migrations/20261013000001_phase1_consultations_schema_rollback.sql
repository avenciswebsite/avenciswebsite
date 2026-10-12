-- ====================================================================
-- AVENCIS PLATFORM — PHASE 1: ROLLBACK SCRIPT
-- Migration Version: 20261013000001
-- Engine: Supabase PostgreSQL (Postgres 15+)
-- Description: Completely rolls back Phase 1 functions, tables, and policies.
-- ====================================================================

BEGIN;

-- 1. Drop Stored Procedures and Functions
DROP FUNCTION IF EXISTS public.submit_consultation(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.check_rate_limit(TEXT, INT, INT);
DROP FUNCTION IF EXISTS public.is_admin();

-- 2. Drop Tables in Reverse Dependency Order
DROP TABLE IF EXISTS public.rate_limits CASCADE;
DROP TABLE IF EXISTS public.operator_notes CASCADE;
DROP TABLE IF EXISTS public.consultation_requests CASCADE;
DROP TABLE IF EXISTS public.leads CASCADE;
DROP TABLE IF EXISTS public.enterprises CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;

COMMIT;
