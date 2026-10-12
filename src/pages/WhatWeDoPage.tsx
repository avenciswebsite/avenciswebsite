import React from 'react';
import { Section4WhatWeDo } from '../components/Section4WhatWeDo';
import { Section5EnginesAndPillars } from '../components/Section5EnginesAndPillars';
import { Settings, Sparkles } from 'lucide-react';

export const WhatWeDoPage: React.FC = () => {

  return (
    <div className="page-wrapper" id="what-we-do-page-root">
      {/* Page Hero Header */}
      <div className="page-hero-banner">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow-badge orange" style={{ marginBottom: '14px' }}>
              <Settings size={14} />
              <span>What We Do & Business Architecture</span>
            </div>
            <h1 className="text-editorial-xl" style={{ marginBottom: '16px' }}>
              We Don't Just Give You a Strategy. We Help You Make It Work.
            </h1>
            <p style={{ fontSize: '1.1875rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
              At Avencis, we work as your Extended Management Team across 5 core business engines and 4 service pillars
              to build systems that scale without everything depending on the founder.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4 — What We Actually Do */}
      <Section4WhatWeDo />

      {/* Section 5 — Our 5 Business Engines & 4 Service Pillars */}
      <Section5EnginesAndPillars />

      {/* Preserved Feature: 12-Month Engagement Architecture Blueprint */}
      <section className="section-padding" style={{ backgroundColor: 'var(--av-cream-light)', borderTop: '1px solid rgba(7, 20, 61, 0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px auto' }}>
            <div className="eyebrow-badge" style={{ marginBottom: '12px' }}>
              <Sparkles size={14} />
              <span>Preserved Architecture Detail</span>
            </div>
            <h2 className="text-editorial-lg" style={{ marginBottom: '12px' }}>
              How an Avencis Transformation Is Structured Over 12 Months
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--av-slate-600)' }}>
              From initial forensic diagnostic to autonomous executive governance handoff.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="card-white" style={{ padding: '32px 26px', borderTop: '4px solid var(--av-primary-blue)' }}>
              <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--av-deep-blue)', marginBottom: '8px' }}>
                Phase 1: Diagnosis
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'var(--av-slate-600)', lineHeight: '1.6', marginBottom: '16px' }}>
                Forensic scan across all engines, founder time audit, customer concentration audit, and 90-day quick-win roadmap.
              </p>
              <div style={{ fontSize: '0.8125rem', color: 'var(--av-accent-orange)', fontWeight: 800 }}>
                Duration: Weeks 1 – 4
              </div>
            </div>

            <div className="card-white" style={{ padding: '32px 26px', borderTop: '4px solid var(--av-accent-orange)' }}>
              <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--av-deep-blue)', marginBottom: '8px' }}>
                Phase 2: Execution
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'var(--av-slate-600)', lineHeight: '1.6', marginBottom: '16px' }}>
                Avencis senior partners embed inside your offices, restructuring SLAs, cash collection mechanisms, and coaching the EMT.
              </p>
              <div style={{ fontSize: '0.8125rem', color: 'var(--av-accent-orange)', fontWeight: 800 }}>
                Duration: Months 2 – 6
              </div>
            </div>

            <div className="card-white" style={{ padding: '32px 26px', borderTop: '4px solid var(--av-primary-blue)' }}>
              <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--av-deep-blue)', marginBottom: '8px' }}>
                Phase 3: Scale
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'var(--av-slate-600)', lineHeight: '1.6', marginBottom: '16px' }}>
                Autonomous cadence locked in place, founder time liberated by 60%+, and institutional enterprise valuation ready.
              </p>
              <div style={{ fontSize: '0.8125rem', color: 'var(--av-accent-orange)', fontWeight: 800 }}>
                Duration: Months 7 – 12
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
