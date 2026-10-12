import React from 'react';
import { SECTION_4_CONTENT } from '../data/siteData';
import { Settings } from 'lucide-react';

export const Section4WhatWeDo: React.FC = () => {
  return (
    <section className="section-padding" id="what-we-actually-do" style={{ backgroundColor: 'var(--av-cream-light)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '840px', margin: '0 auto 48px auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Settings size={14} />
            <span>{SECTION_4_CONTENT.badge}</span>
          </div>

          <h2 className="text-editorial-xl" style={{ marginBottom: '8px' }}>
            {SECTION_4_CONTENT.headline}
          </h2>

          <h3 style={{ fontSize: '1.625rem', color: 'var(--av-accent-orange)', fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>
            {SECTION_4_CONTENT.subheadline}
          </h3>

          {/* Industry Comparison Cards */}
          <div className="comparison-cards-grid">
            {SECTION_4_CONTENT.comparisonPoints.map((point, idx) => (
              <div
                key={idx}
                className="card-white"
                style={{
                  padding: '20px 24px',
                  borderTop: idx === 3 ? '4px solid var(--av-accent-orange)' : '4px solid var(--av-primary-blue)',
                  boxShadow: idx === 3 ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <div style={{ fontSize: '1rem', color: idx === 3 ? 'var(--av-deep-blue)' : 'var(--av-slate-700)', fontWeight: idx === 3 ? 800 : 500, lineHeight: '1.5' }}>
                  {point}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <div
              style={{
                backgroundColor: 'var(--av-deep-blue)',
                color: '#FFFFFF',
                borderRadius: '14px',
                padding: '20px 32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-md)',
                maxWidth: '100%'
              }}
            >
              <h3 style={{ fontSize: '1.375rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)', margin: 0 }}>
                {SECTION_4_CONTENT.differenceHighlight}
              </h3>
            </div>
          </div>

          <h4 style={{ fontSize: '1.25rem', color: 'var(--av-deep-blue)', fontWeight: 700, marginBottom: '24px' }}>
            {SECTION_4_CONTENT.alongsideIntro}
          </h4>
        </div>

        {/* The 7 Active Pillars Grid */}
        <div style={{ maxWidth: '960px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {SECTION_4_CONTENT.actionSteps.map((step, idx) => (
              <div
                key={idx}
                className="card-white"
                style={{
                  padding: '24px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderLeft: '4px solid var(--av-primary-blue)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--av-deep-blue)' }}>
                      {step.title}
                    </span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--av-accent-orange)', backgroundColor: 'rgba(229, 106, 46, 0.1)', padding: '2px 8px', borderRadius: '6px' }}>
                      0{idx + 1}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Synthesis Banner */}
        <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--av-primary-blue)',
              borderRadius: '16px',
              padding: '28px 32px',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', color: 'var(--av-deep-blue)', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
              {SECTION_4_CONTENT.summaryStatement}
            </h3>
            <p style={{ fontSize: '1.125rem', color: 'var(--av-accent-orange)', fontWeight: 700 }}>
              {SECTION_4_CONTENT.summarySubtext}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
