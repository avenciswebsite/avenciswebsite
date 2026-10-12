import React from 'react';
import { SECTION_15_CONTENT } from '../data/siteData';
import { ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';

export const Section15Difference: React.FC = () => {
  return (
    <section className="section-padding" id="what-makes-avencis-different" style={{ backgroundColor: 'var(--av-cream-light)' }}>
      <div className="container">
        {/* Top Subsection: Execution Over Strategy Decks */}
        <div style={{ maxWidth: '860px', margin: '0 auto 64px auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <ShieldCheck size={14} />
            <span>{SECTION_15_CONTENT.badge}</span>
          </div>

          <h2 className="text-editorial-xl" style={{ marginBottom: '24px' }}>
            {SECTION_15_CONTENT.headline}
          </h2>

          {/* "We prefer" Enclosed Orange Border Section */}
          <div className="we-prefer-container">
            <p style={{ fontSize: '1.25rem', color: 'var(--av-deep-blue)', fontWeight: 800, marginBottom: '24px' }}>
              {SECTION_15_CONTENT.preferenceIntro}
            </p>

            {/* 5 One-Clear Steps */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px'
              }}
            >
              {SECTION_15_CONTENT.preferenceSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="card-cream"
                  style={{
                    padding: '20px 16px',
                    borderRadius: '12px',
                    borderTop: '3px solid var(--av-primary-blue)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--av-deep-blue)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(7, 20, 61, 0.08)',
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'inline-block',
              maxWidth: '680px'
            }}
          >
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--av-accent-orange)', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <RotateCcw size={18} />
              <span>Then we repeat.</span>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--av-slate-600)', fontStyle: 'italic' }}>
              Because a strategy that doesn't get executed is just a document.
            </p>
          </div>
        </div>

        {/* Bottom Subsection: Building In-House Capability, Not Eternal Dependence */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            backgroundColor: 'var(--av-deep-blue)',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px 36px',
            boxShadow: 'var(--shadow-xl)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#FFFFFF', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
              {SECTION_15_CONTENT.independenceHeadline}
            </h3>
            <p style={{ fontSize: '1rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {SECTION_15_CONTENT.importanceNote}
            </p>
          </div>

          {/* Contrast Card */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '36px'
            }}
          >
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '24px', borderRadius: '14px' }}>
              <div style={{ fontSize: '0.8125rem', color: '#FCA5A5', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                Traditional Consultancy Model:
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>
                "Keep the consultant forever."
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '24px', borderRadius: '14px' }}>
              <div style={{ fontSize: '0.8125rem', color: '#6EE7B7', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                The Avencis Objective:
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--av-accent-orange)', fontFamily: 'var(--font-serif)' }}>
                Build capability inside your business.
              </div>
            </div>
          </div>

          {/* 6 Capability Points */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ fontSize: '1.0625rem', color: '#CBD5E1', marginBottom: '14px', fontWeight: 600 }}>
              {SECTION_15_CONTENT.teamUnderstandingLead}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
              {SECTION_15_CONTENT.teamUnderstandingItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '0.9375rem',
                    color: '#E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <CheckCircle2 size={15} color="var(--av-accent-orange)" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Synthesis Statement */}
          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '28px' }}>
            <p style={{ fontSize: '1.0625rem', color: '#94A3B8', marginBottom: '6px' }}>
              {SECTION_15_CONTENT.notBestOutcome}
            </p>
            <h4 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', color: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>
              {SECTION_15_CONTENT.bestOutcome}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};
