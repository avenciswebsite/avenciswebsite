import React, { useState } from 'react';
import { Calendar, CheckCircle2, Send, ShieldCheck } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    revenueBracket: '₹15 Cr – ₹50 Cr',
    primaryChallenge: 'Founder Operational Bottleneck & Firefighting',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section-padding" id="book-consultation" style={{ backgroundColor: 'var(--av-cream-light)' }}>
      <div className="container">
        <div
          style={{
            backgroundColor: 'var(--av-deep-blue)',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px 36px',
            boxShadow: 'var(--shadow-2xl)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
          }}
        >
          {/* Left Column: Value Prop */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
                <Calendar size={14} />
                <span>Confidential Founder Discovery</span>
              </div>

              <h2 className="text-editorial-lg" style={{ color: '#FFFFFF', marginBottom: '20px' }}>
                Schedule a 1-on-1 Diagnostic Session with an Avencis Senior Partner
              </h2>

              <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', lineHeight: '1.7', marginBottom: '32px' }}>
                In this 45-minute confidential working session, we review your business engines, evaluate your
                Extended Management Team maturity, and outline immediate EBITDA leakage fixes.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={20} color="var(--av-accent-orange)" />
                  <span style={{ fontSize: '0.9375rem', color: '#E2E8F0' }}>
                    Strictly confidential & zero obligation
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={20} color="var(--av-accent-orange)" />
                  <span style={{ fontSize: '0.9375rem', color: '#E2E8F0' }}>
                    Direct dialogue with a Senior Partner, not a sales representative
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={20} color="var(--av-accent-orange)" />
                  <span style={{ fontSize: '0.9375rem', color: '#E2E8F0' }}>
                    Includes customized 90-day Founder Bandwidth Liberation Blueprint
                  </span>
                </div>
              </div>
            </div>

            <div style={{ padding: '16px 20px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={24} color="#6EE7B7" />
              <div style={{ fontSize: '0.8125rem', color: '#E2E8F0' }}>
                <strong>Avencis Guarantee:</strong> Direct, candid insights tailored specifically to promoter-led enterprises.
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              color: 'var(--av-deep-blue)',
              borderRadius: '16px',
              padding: '36px 32px',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--av-success-bg)',
                    color: 'var(--av-success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--av-deep-blue)', marginBottom: '8px' }}>
                  Diagnostic Request Received
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--av-slate-600)', marginBottom: '24px' }}>
                  Thank you, <strong>{formData.fullName}</strong>. An Avencis Senior Partner will review your company profile and reach out within 24 business hours to schedule your session.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.375rem', color: 'var(--av-deep-blue)', marginBottom: '20px' }}>
                  Request Your Diagnostic Session
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px', color: 'var(--av-slate-700)' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Mehta"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--av-slate-300)',
                        fontSize: '0.9375rem',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px', color: 'var(--av-slate-700)' }}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Precision Pvt Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--av-slate-300)',
                        fontSize: '0.9375rem',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px', color: 'var(--av-slate-700)' }}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="founder@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--av-slate-300)',
                        fontSize: '0.9375rem',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px', color: 'var(--av-slate-700)' }}>
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--av-slate-300)',
                        fontSize: '0.9375rem',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px', color: 'var(--av-slate-700)' }}>
                    Annual Revenue Bracket *
                  </label>
                  <select
                    value={formData.revenueBracket}
                    onChange={(e) => setFormData({ ...formData, revenueBracket: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--av-slate-300)',
                      fontSize: '0.9375rem',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="₹5 Cr – ₹15 Cr">₹5 Cr – ₹15 Cr</option>
                    <option value="₹15 Cr – ₹50 Cr">₹15 Cr – ₹50 Cr</option>
                    <option value="₹50 Cr – ₹150 Cr">₹50 Cr – ₹150 Cr</option>
                    <option value="₹150 Cr+">₹150 Cr+</option>
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px', color: 'var(--av-slate-700)' }}>
                    Primary Growth Challenge *
                  </label>
                  <select
                    value={formData.primaryChallenge}
                    onChange={(e) => setFormData({ ...formData, primaryChallenge: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--av-slate-300)',
                      fontSize: '0.9375rem',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="Founder Operational Bottleneck & Firefighting">Founder Operational Bottleneck & Firefighting</option>
                    <option value="Building the Extended Management Team (EMT)">Building the Extended Management Team (EMT)</option>
                    <option value="Working Capital / DSO & Cash Flow Compression">Working Capital / DSO & Cash Flow Compression</option>
                    <option value="Sales Pipeline Predictability & Pricing Defense">Sales Pipeline Predictability & Pricing Defense</option>
                    <option value="Governance, Valuation & Institutional Scale">Governance, Valuation & Institutional Scale</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-orange btn-lg"
                  style={{ width: '100%' }}
                  id="submit-diagnostic-form"
                >
                  <Send size={18} />
                  <span>Request Confidential Diagnostic Session</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
