// ====================================================================
// AVENCIS PLATFORM — PHASE 1 VALIDATION & CONTRACT UNIT TESTS
// Executed using Node.js built-in test runner (node:test)
// ====================================================================

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Import or recreate validation rules matching submit-consultation and FinalCTA
const VALID_REVENUE_BRACKETS = [
  '₹5 Cr – ₹15 Cr',
  '₹15 Cr – ₹50 Cr',
  '₹50 Cr – ₹150 Cr',
  '₹150 Cr+',
];

const VALID_CHALLENGES = [
  'Founder Operational Bottleneck & Firefighting',
  'Building the Extended Management Team (EMT)',
  'Working Capital / DSO & Cash Flow Compression',
  'Sales Pipeline Predictability & Pricing Defense',
  'Governance, Valuation & Institutional Scale',
];

const INDIAN_PHONE_REGEX = /^(\+91)?[6789]\d{9}$/;
const E164_PHONE_REGEX = /^\+[1-9]\d{6,14}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateConsultationPayload(body) {
  if (!body.fullName || body.fullName.trim().length < 2) {
    return { valid: false, error: 'Full Name is required (minimum 2 characters)' };
  }
  if (!body.companyName || body.companyName.trim().length < 2) {
    return { valid: false, error: 'Company Name is required (minimum 2 characters)' };
  }
  if (!body.email || !EMAIL_REGEX.test(body.email.trim())) {
    return { valid: false, error: 'A valid corporate email address is required' };
  }
  const cleanPhone = body.phone?.trim() || '';
  const normalizedPhone = cleanPhone.replace(/[\s-]/g, '');
  if (!normalizedPhone || (!INDIAN_PHONE_REGEX.test(normalizedPhone) && !E164_PHONE_REGEX.test(normalizedPhone))) {
    return { valid: false, error: 'A valid mobile / phone number is required' };
  }
  if (!VALID_REVENUE_BRACKETS.includes(body.revenueBracket)) {
    return { valid: false, error: 'Invalid revenue bracket selected' };
  }
  if (!VALID_CHALLENGES.includes(body.primaryChallenge)) {
    return { valid: false, error: 'Invalid growth challenge selected' };
  }
  return { valid: true };
}

describe('Phase 1 Consultation Submission Validation Tests', () => {
  it('should accept valid standard Indian mobile payload', () => {
    const payload = {
      fullName: 'Rajesh Singhania',
      companyName: 'Singhania Precision Castings Pvt Ltd',
      email: 'rajesh@singhaniacastings.com',
      phone: '+91 98201 44521',
      revenueBracket: '₹50 Cr – ₹150 Cr',
      primaryChallenge: 'Founder Operational Bottleneck & Firefighting',
    };
    const res = validateConsultationPayload(payload);
    assert.equal(res.valid, true);
  });

  it('should accept valid international E.164 phone payload', () => {
    const payload = {
      fullName: 'Vikram Mehta',
      companyName: 'AeroTech Fasteners LLP',
      email: 'v.mehta@aerotech.in',
      phone: '+447911123456',
      revenueBracket: '₹15 Cr – ₹50 Cr',
      primaryChallenge: 'Building the Extended Management Team (EMT)',
    };
    const res = validateConsultationPayload(payload);
    assert.equal(res.valid, true);
  });

  it('should reject invalid / short full name', () => {
    const payload = {
      fullName: 'R',
      companyName: 'Valid Company',
      email: 'test@company.com',
      phone: '9820144521',
      revenueBracket: '₹15 Cr – ₹50 Cr',
      primaryChallenge: 'Working Capital / DSO & Cash Flow Compression',
    };
    const res = validateConsultationPayload(payload);
    assert.equal(res.valid, false);
    assert.match(res.error, /Full Name is required/);
  });

  it('should reject malformed email', () => {
    const payload = {
      fullName: 'Rajesh Singhania',
      companyName: 'Valid Company',
      email: 'not-an-email',
      phone: '9820144521',
      revenueBracket: '₹15 Cr – ₹50 Cr',
      primaryChallenge: 'Working Capital / DSO & Cash Flow Compression',
    };
    const res = validateConsultationPayload(payload);
    assert.equal(res.valid, false);
    assert.match(res.error, /valid corporate email/);
  });

  it('should reject invalid phone numbers', () => {
    const payload = {
      fullName: 'Rajesh Singhania',
      companyName: 'Valid Company',
      email: 'test@company.com',
      phone: '12345',
      revenueBracket: '₹15 Cr – ₹50 Cr',
      primaryChallenge: 'Working Capital / DSO & Cash Flow Compression',
    };
    const res = validateConsultationPayload(payload);
    assert.equal(res.valid, false);
    assert.match(res.error, /valid mobile \/ phone/);
  });

  it('should reject unapproved revenue bracket', () => {
    const payload = {
      fullName: 'Rajesh Singhania',
      companyName: 'Valid Company',
      email: 'test@company.com',
      phone: '9820144521',
      revenueBracket: '₹1 Cr – ₹5 Cr', // Out of bounds
      primaryChallenge: 'Working Capital / DSO & Cash Flow Compression',
    };
    const res = validateConsultationPayload(payload);
    assert.equal(res.valid, false);
    assert.match(res.error, /Invalid revenue bracket/);
  });

  it('should reject unapproved growth challenge', () => {
    const payload = {
      fullName: 'Rajesh Singhania',
      companyName: 'Valid Company',
      email: 'test@company.com',
      phone: '9820144521',
      revenueBracket: '₹15 Cr – ₹50 Cr',
      primaryChallenge: 'Random Unapproved Challenge Text',
    };
    const res = validateConsultationPayload(payload);
    assert.equal(res.valid, false);
    assert.match(res.error, /Invalid growth challenge/);
  });
});
