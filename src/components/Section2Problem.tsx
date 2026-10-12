import React from 'react';
import { SECTION_2_CONTENT } from '../data/siteData';
import { AlertCircle } from 'lucide-react';

export const Section2Problem: React.FC = () => {
  return (
    <section className="section-padding" id="the-problem" style={{ backgroundColor: 'var(--av-cream-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <AlertCircle size={14} />
            <span>{SECTION_2_CONTENT.badge}</span>
          </div>

          <h2 className="text-editorial-lg" style={{ marginBottom: '8px' }}>
            {SECTION_2_CONTENT.headingLine1}
          </h2>
          <h2 className="text-editorial-lg" style={{ color: 'var(--av-accent-orange)', marginBottom: '24px' }}>
            {SECTION_2_CONTENT.headingLine2}
          </h2>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(7, 20, 61, 0.08)',
              borderRadius: '14px',
              padding: '24px 28px',
              marginBottom: '40px',
              textAlign: 'left',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ fontSize: '1.0625rem', color: 'var(--av-slate-700)', lineHeight: '1.7' }}>
              <p style={{ fontWeight: 700, color: 'var(--av-deep-blue)', marginBottom: '6px' }}>
                {SECTION_2_CONTENT.subtext[0]}
              </p>
              <p style={{ marginBottom: '6px' }}>
                {SECTION_2_CONTENT.subtext[1]}
              </p>
              <p style={{ fontWeight: 600, color: 'var(--av-primary-blue)' }}>
                {SECTION_2_CONTENT.subtext[2]}
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: '1.375rem', color: 'var(--av-deep-blue)', marginBottom: '24px', textAlign: 'center', fontFamily: 'var(--font-serif)' }}>
            {SECTION_2_CONTENT.leadQuestion}
          </h3>
        </div>

        {/* Diagnostic Questions Cards - Centred list */}
        <div style={{ maxWidth: '800px', margin: '0 auto 40px auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SECTION_2_CONTENT.questions.map((question, idx) => (
              <div
                key={idx}
                className="card-white"
                style={{
                  padding: '16px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  borderLeft: '4px solid var(--av-primary-blue)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--av-soft-blue)',
                    color: 'var(--av-primary-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    flexShrink: 0
                  }}
                >
                  {idx + 1}
                </div>
                <span style={{ fontSize: '1.0625rem', color: 'var(--av-deep-blue)', fontWeight: 600 }}>
                  {question}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* The Verdict Callout */}
        <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: 'var(--av-deep-blue)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '36px 32px',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ fontSize: '1rem', color: '#CBD5E1', marginBottom: '12px', fontWeight: 500 }}>
              {SECTION_2_CONTENT.verdictLead}
            </div>
            <h3 style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.875rem)', color: '#FFFFFF', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
              {SECTION_2_CONTENT.verdictLine1}
            </h3>
            <h3 style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.875rem)', color: 'var(--av-accent-orange)', fontFamily: 'var(--font-serif)' }}>
              {SECTION_2_CONTENT.verdictLine2}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};
