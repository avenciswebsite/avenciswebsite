import React from 'react';
import { SECTION_3_CONTENT } from '../data/siteData';
import { ArrowDown, AlertTriangle, Layers, CheckCircle2 } from 'lucide-react';

interface Section3AvencisIdeaProps {
  expanded?: boolean;
}

export const Section3AvencisIdea: React.FC<Section3AvencisIdeaProps> = ({ expanded = false }) => {
  return (
    <section className="section-padding" id="the-avencis-idea" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '860px', margin: '0 auto 48px auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Layers size={14} />
            <span>{SECTION_3_CONTENT.badge}</span>
          </div>

          <h2 className="text-editorial-xl" style={{ marginBottom: '12px' }}>
            {SECTION_3_CONTENT.headline}
          </h2>

          <h3 style={{ fontSize: '1.5rem', color: 'var(--av-accent-orange)', fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>
            {SECTION_3_CONTENT.subheadline}
          </h3>

          {/* Revenue Ladder Card */}
          <div
            style={{
              backgroundColor: 'var(--av-cream-light)',
              border: '1px solid rgba(7, 20, 61, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              marginBottom: '32px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.9375rem', color: 'var(--av-slate-600)', marginBottom: '12px', fontWeight: 600 }}>
              A business can go from:
            </div>
            <div
              style={{
                fontSize: 'clamp(1.15rem, 2.2vw, 1.625rem)',
                fontWeight: 800,
                color: 'var(--av-primary-blue)',
                fontFamily: 'var(--font-serif)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                flexWrap: 'wrap'
              }}
            >
              <span>₹50 Lakhs</span>
              <span style={{ color: 'var(--av-accent-orange)' }}>→</span>
              <span>₹1 Crore</span>
              <span style={{ color: 'var(--av-accent-orange)' }}>→</span>
              <span>₹3 Crore</span>
              <span style={{ color: 'var(--av-accent-orange)' }}>→</span>
              <span>₹5 Crore</span>
            </div>
            <div style={{ fontSize: '1rem', color: 'var(--av-slate-700)', fontWeight: 600 }}>
              and still have:
            </div>
          </div>

          {/* 7 Symptoms List - 3 columns for first 6, centered 7th item in row 3 */}
          <div className="revenue-symptoms-grid">
            {SECTION_3_CONTENT.symptoms.map((symptom, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--av-danger-bg)',
                  border: '1px solid var(--av-danger-border)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textAlign: 'left'
                }}
              >
                <AlertTriangle size={16} color="#DC2626" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#991B1B' }}>
                  {symptom}
                </span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '1.1875rem', color: 'var(--av-slate-600)', marginBottom: '12px' }}>
            {SECTION_3_CONTENT.conclusionLead}
          </p>

          <h3 style={{ fontSize: '1.875rem', color: 'var(--av-deep-blue)', fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>
            {SECTION_3_CONTENT.underneathHeading}
          </h3>
        </div>

        {/* The Vertical Underlying Architecture Hierarchy */}
        <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            {SECTION_3_CONTENT.hierarchySteps.map((step, idx) => {
              const isLast = idx === SECTION_3_CONTENT.hierarchySteps.length - 1;
              const isFirst = idx === 0;
              return (
                <React.Fragment key={idx}>
                  <div
                    style={{
                      width: '100%',
                      padding: isLast ? '18px 24px' : '14px 20px',
                      borderRadius: '12px',
                      backgroundColor: isLast
                        ? 'var(--av-accent-orange)'
                        : isFirst
                        ? 'var(--av-deep-blue)'
                        : '#FFFFFF',
                      color: isLast || isFirst ? '#FFFFFF' : 'var(--av-deep-blue)',
                      border: isLast || isFirst ? 'none' : '1px solid rgba(7, 20, 61, 0.12)',
                      boxShadow: isLast ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                      fontWeight: isLast || isFirst ? 800 : 700,
                      fontSize: isLast ? '1.25rem' : '1.0625rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {isLast && <CheckCircle2 size={20} />}
                    <span>{step}</span>
                  </div>

                  {!isLast && (
                    <div style={{ color: 'var(--av-primary-blue)', padding: '2px 0' }}>
                      <ArrowDown size={18} strokeWidth={2.5} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Expanded Thought-Leadership Content for Insights Page */}
        {expanded && (
          <div style={{ maxWidth: '860px', margin: '56px auto 0 auto', borderTop: '1px solid var(--av-slate-200)', paddingTop: '40px' }}>
            <h4 style={{ fontSize: '1.5rem', color: 'var(--av-deep-blue)', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>
              Why Scaling Is Fundamentally an Operating System Challenge
            </h4>
            <div style={{ fontSize: '1.0625rem', color: 'var(--av-slate-700)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>
                In promoter-led enterprises, revenue growth frequently acts as a mask for systemic inefficiencies. While top-line revenue compounds from ₹50 Lakhs to ₹5 Crores, underlying complexity expands exponentially faster than the business’s ability to coordinate execution.
              </p>
              <p>
                When cash flow strains, profitability leaks, or team members hesitate without founder confirmation, standard management instinct is often to push harder on sales. But adding more revenue to a leaky system only increases the rate of leakage.
              </p>
              <p>
                A truly scalable business is not achieved by pushing revenue at the top, but by architecting the foundation beneath it: aligning profitability, locking predictable cash flow, structuring people into autonomous teams, standardizing processes, instituting weekly reviews, and enforcing disciplined execution governance.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
