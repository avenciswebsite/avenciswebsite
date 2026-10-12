import React from 'react';
import { SECTION_16_CONTENT } from '../data/siteData';
import { Users2, HelpCircle } from 'lucide-react';

export const Section16ExtendedTeam: React.FC = () => {
  return (
    <section className="section-padding" id="why-extended-management-team" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '860px', margin: '0 auto 48px auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Users2 size={14} />
            <span>{SECTION_16_CONTENT.badge}</span>
          </div>

          <h2 className="text-editorial-xl" style={{ marginBottom: '12px' }}>
            {SECTION_16_CONTENT.headline}
          </h2>

          <h3 style={{ fontSize: '1.625rem', color: 'var(--av-accent-orange)', fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>
            {SECTION_16_CONTENT.subheadline}
          </h3>

          <p style={{ fontSize: '1.25rem', color: 'var(--av-deep-blue)', fontWeight: 700, marginBottom: '24px' }}>
            {SECTION_16_CONTENT.tableQuestionsLead}
          </p>
        </div>

        {/* 8 Tough Questions Table */}
        <div style={{ maxWidth: '840px', margin: '0 auto 48px auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '14px'
            }}
          >
            {SECTION_16_CONTENT.tableQuestions.map((q, idx) => (
              <div
                key={idx}
                className="card-cream"
                style={{
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderLeft: '4px solid var(--av-primary-blue)'
                }}
              >
                <HelpCircle size={18} color="var(--av-accent-orange)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '1.0625rem', color: 'var(--av-deep-blue)', fontWeight: 600 }}>
                  {q}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion Hero Box */}
        <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: 'var(--av-deep-blue)',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '40px 32px',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ fontSize: '1rem', color: '#CBD5E1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {SECTION_16_CONTENT.roleHeading}
            </div>

            <h3 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#FFFFFF', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>
              {SECTION_16_CONTENT.roleTitle}
            </h3>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {SECTION_16_CONTENT.notJustList.map((item, idx) => (
                <span key={idx} style={{ fontSize: '1.0625rem', color: '#94A3B8', fontWeight: 600 }}>
                  • {item}
                </span>
              ))}
            </div>

            <div
              style={{
                backgroundColor: 'rgba(229, 106, 46, 0.2)',
                border: '1px solid rgba(229, 106, 46, 0.5)',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '14px 24px',
                display: 'inline-block',
                fontWeight: 800,
                fontSize: '1.1875rem'
              }}
            >
              {SECTION_16_CONTENT.conclusionPillars}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
