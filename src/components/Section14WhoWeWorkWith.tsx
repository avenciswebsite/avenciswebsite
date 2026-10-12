import React from 'react';
import { SECTION_14_CONTENT } from '../data/siteData';
import { Users, CheckCircle2, Sparkles } from 'lucide-react';

export const Section14WhoWeWorkWith: React.FC = () => {
  return (
    <section className="section-padding" id="who-we-work-with" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '860px', margin: '0 auto 48px auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Users size={14} />
            <span>{SECTION_14_CONTENT.badge}</span>
          </div>

          <h2 className="text-editorial-xl" style={{ marginBottom: '20px' }}>
            {SECTION_14_CONTENT.headline}
          </h2>

          <p style={{ fontSize: '1.1875rem', color: 'var(--av-slate-600)', marginBottom: '28px', maxWidth: '720px', margin: '0 auto 28px auto' }}>
            We are not primarily for someone looking for a business idea. We work with businesses that already have:
          </p>

          {/* 6 Core Qualifiers Chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              marginBottom: '48px'
            }}
          >
            {SECTION_14_CONTENT.qualifiers.map((qual, idx) => (
              <span
                key={idx}
                style={{
                  backgroundColor: 'var(--av-cream-light)',
                  border: '1px solid rgba(7, 20, 61, 0.1)',
                  borderRadius: '9999px',
                  padding: '10px 20px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--av-deep-blue)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <CheckCircle2 size={16} color="var(--av-accent-orange)" />
                <span>{qual}</span>
              </span>
            ))}
          </div>

          <h3 style={{ fontSize: '1.625rem', color: 'var(--av-deep-blue)', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
            {SECTION_14_CONTENT.especiallyTitle}
          </h3>
        </div>

        {/* 7 Target Sectors Grid - 3 cols for first 6, centered 7th item in row 3 */}
        <div className="target-sectors-grid">
          {SECTION_14_CONTENT.sectors.map((sec, idx) => (
            <div
              key={idx}
              className="card-white"
              style={{
                padding: '28px 24px',
                borderLeft: '4px solid var(--av-primary-blue)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--av-deep-blue)', marginBottom: '10px' }}>
                  {sec.title}
                </h4>
                <p style={{ fontSize: '0.9375rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
                  {sec.description}
                </p>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid var(--av-slate-100)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--av-accent-orange)', fontWeight: 700 }}>
                <Sparkles size={12} />
                <span>Operational Blueprint Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
