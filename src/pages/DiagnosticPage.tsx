import React, { useRef } from 'react';
import { Section8AssessmentIntro } from '../components/Section8AssessmentIntro';
import { Section10AssessmentResults } from '../components/Section10AssessmentResults';
import { Assessment } from '../components/Assessment';
import { Gauge, ShieldCheck } from 'lucide-react';

export const DiagnosticPage: React.FC = () => {
  const assessmentToolRef = useRef<HTMLDivElement>(null);

  const scrollToAssessmentTool = () => {
    if (assessmentToolRef.current) {
      assessmentToolRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-wrapper" id="diagnostics-page-root">
      {/* Page Hero Header */}
      <div className="page-hero-banner">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow-badge orange" style={{ marginBottom: '14px' }}>
              <Gauge size={14} />
              <span>Diagnostics & Business Assessment</span>
            </div>
            <h1 className="text-editorial-xl" style={{ marginBottom: '16px' }}>
              The Avencis Business Scale Assessment™
            </h1>
            <p style={{ fontSize: '1.1875rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
              Find out what's actually stopping your business from scaling across 10 business functions,
              50+ diagnostic questions, and receive your immediate Avencis Business Scale Score.
            </p>
          </div>
        </div>
      </div>

      {/* Section 8 & Section 9: The Business Assessment and Productization */}
      <Section8AssessmentIntro onStartAssessment={scrollToAssessmentTool} />

      {/* Interactive Assessment Tool */}
      <div ref={assessmentToolRef} id="interactive-assessment-tool">
        <Assessment onBookConsultation={scrollToAssessmentTool} />
      </div>

      {/* Section 10: Assessment Results (Immediate Score + Category Table + 3 Opportunities + WhatsApp SCORE) */}
      <Section10AssessmentResults />

      {/* Preserved Feature: Diagnostic Evaluation Dimensions with Softened Top Border Transition */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid rgba(7, 20, 61, 0.08)' }}>
        <div className="container">
          <div className="diagnostic-evaluates-container">
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
              <div className="eyebrow-badge">
                <ShieldCheck size={14} />
                <span>Evaluation Framework</span>
              </div>
              <h2 className="text-editorial-lg" style={{ marginTop: '14px', marginBottom: '14px' }}>
                What This Diagnostic Evaluates
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--av-slate-600)' }}>
                A holistic analysis covering the 10 operational dimensions of founder-led mid-market enterprises.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div className="card-cream" style={{ padding: '24px' }}>
                <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--av-primary-blue)', marginBottom: '8px' }}>
                  1. Revenue & Growth
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--av-slate-600)' }}>
                  Evaluates pipeline predictability, revenue quality, and customer acquisition systems.
                </p>
              </div>
              <div className="card-cream" style={{ padding: '24px' }}>
                <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--av-primary-blue)', marginBottom: '8px' }}>
                  2. Sales & Conversion
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--av-slate-600)' }}>
                  Measures conversion velocity, quotation discipline, and sales team closing independence.
                </p>
              </div>
              <div className="card-cream" style={{ padding: '24px' }}>
                <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--av-primary-blue)', marginBottom: '8px' }}>
                  3. Profitability & Cash Flow
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--av-slate-600)' }}>
                  Audits gross margin defense, product/customer profitability, and 13-week working capital predictability.
                </p>
              </div>
              <div className="card-cream" style={{ padding: '24px' }}>
                <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--av-primary-blue)', marginBottom: '8px' }}>
                  4. Operations & Execution
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--av-slate-600)' }}>
                  Audits standard operating procedures, scrap/wastage controls, and on-time-in-full (OTIF) delivery.
                </p>
              </div>
              <div className="card-cream" style={{ padding: '24px' }}>
                <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--av-primary-blue)', marginBottom: '8px' }}>
                  5. Management Reviews & Founder Dependency
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--av-slate-600)' }}>
                  Measures MIS cadences, weekly review rigor, and whether the business moves when founder steps away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
