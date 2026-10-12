import React from 'react';
import { APPROVED_METHODOLOGY_STEPS } from '../data/siteData';
import { CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Section6Methodology: React.FC = () => {
  return (
    <section className="section-padding" id="how-we-work" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '840px', margin: '0 auto 48px auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Zap size={14} />
            <span>HOW WE WORK</span>
          </div>

          <h2 className="text-editorial-xl" style={{ marginBottom: '8px' }}>
            First We Find the Leak.
          </h2>

          <h2 className="text-editorial-xl" style={{ color: 'var(--av-accent-orange)', marginBottom: '20px' }}>
            Then We Fix the System.
          </h2>

          <p style={{ fontSize: '1.25rem', color: 'var(--av-slate-600)', fontStyle: 'italic' }}>
            Our approach is deliberately practical.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div
          style={{
            maxWidth: '1080px',
            margin: '0 auto 48px auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {APPROVED_METHODOLOGY_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="card-white"
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '4px solid var(--av-primary-blue)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--av-accent-orange)', letterSpacing: '0.06em' }}>
                    {item.step}
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, backgroundColor: 'var(--av-soft-blue)', color: 'var(--av-primary-blue)', padding: '2px 8px', borderRadius: '4px' }}>
                    Phase 0{idx + 1}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.375rem', color: 'var(--av-deep-blue)', marginBottom: '12px' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '1rem', color: 'var(--av-slate-700)', lineHeight: '1.6', marginBottom: '16px', fontWeight: 500 }}>
                  {item.intro}
                </p>

                {/* Bullet items if any */}
                {item.bullets && item.bullets.length > 0 && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9375rem', color: 'var(--av-slate-700)' }}>
                        <CheckCircle2 size={16} color="var(--av-accent-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Plain item tags if any */}
                {item.items && item.items.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {item.items.map((it, itIdx) => (
                      <span
                        key={itIdx}
                        style={{
                          backgroundColor: 'var(--av-cream-light)',
                          border: '1px solid rgba(7, 20, 61, 0.08)',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '0.875rem',
                          color: 'var(--av-deep-blue)',
                          fontWeight: 600
                        }}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Conclusion if any */}
              {item.conclusion && (
                <div
                  style={{
                    borderTop: '1px solid rgba(7, 20, 61, 0.08)',
                    paddingTop: '14px',
                    fontSize: '0.9375rem',
                    color: 'var(--av-primary-blue)',
                    fontWeight: 700
                  }}
                >
                  {item.conclusion}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Prompt */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/diagnostics" className="btn btn-primary btn-lg" id="methodology-assessment-btn">
            <span>Find What's Leaking in Your Business</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
