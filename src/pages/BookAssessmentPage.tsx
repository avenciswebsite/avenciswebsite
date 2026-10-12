import React from 'react';
import { Section8AssessmentIntro } from '../components/Section8AssessmentIntro';
import { Section18FinalCTA } from '../components/Section18FinalCTA';
import { FinalCTA } from '../components/FinalCTA';
import { Calendar, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BookAssessmentPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper" id="book-assessment-page-root">
      {/* Page Hero Header */}
      <div className="page-hero-banner">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow-badge orange" style={{ marginBottom: '14px' }}>
              <Calendar size={14} />
              <span>Assessment Booking & Diagnostic Intake</span>
            </div>
            <h1 className="text-editorial-xl" style={{ marginBottom: '16px' }}>
              You Don't Need to Fix Everything. You Need to Know What to Fix First.
            </h1>
            <p style={{ fontSize: '1.1875rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
              Take the free Avencis Business Scale Assessment™ or request a confidential 45-minute working session
              with an Avencis Senior Partner to evaluate your business engines and 90-day bandwidth liberation path.
            </p>
          </div>
        </div>
      </div>

      {/* Section 8 — The Business Assessment (Conversion-Focused Version) */}
      <Section8AssessmentIntro onStartAssessment={() => navigate('/diagnostics')} />

      {/* Section 18 — Final CTA (Assessment Booking and Next Steps) */}
      <Section18FinalCTA />

      {/* Preserved Feature: 1-on-1 Confidential Working Session Form with Senior Partner */}
      <section className="section-padding" style={{ backgroundColor: 'var(--av-cream-light)', borderTop: '1px solid rgba(7, 20, 61, 0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px auto' }}>
            <div className="eyebrow-badge">
              <ShieldCheck size={14} />
              <span>Direct Partner Access</span>
            </div>
            <h2 className="text-editorial-lg" style={{ marginBottom: '12px' }}>
              Prefer a Direct 1-on-1 Founder Dialogue?
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--av-slate-600)' }}>
              Schedule a confidential 45-minute working session with an Avencis Senior Partner.
            </p>
          </div>

          <FinalCTA />
        </div>
      </section>
    </div>
  );
};
