import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SECTION_12_CONTENT } from '../data/siteData';
import { getFounderDependencyWhatsAppUrl } from '../utils/whatsapp';
import { Gauge, ArrowRight, MessageSquare, CheckCircle2, ArrowRightCircle } from 'lucide-react';

interface Section12FounderDependencyProps {
  isTeaser?: boolean;
}

export const Section12FounderDependency: React.FC<Section12FounderDependencyProps> = ({ isTeaser = false }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <section className="section-padding" id="founder-dependency" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '840px', margin: '0 auto 44px auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Gauge size={14} />
            <span>{SECTION_12_CONTENT.badge}</span>
          </div>

          <h2 className="text-editorial-xl" style={{ marginBottom: '8px' }}>
            {SECTION_12_CONTENT.headline}
          </h2>

          <h3 style={{ fontSize: '1.75rem', color: 'var(--av-accent-orange)', fontFamily: 'var(--font-serif)', marginBottom: '24px' }}>
            {SECTION_12_CONTENT.subheadline}
          </h3>

          <div style={{ fontSize: '1.0625rem', color: 'var(--av-slate-600)', fontStyle: 'italic', marginBottom: '8px' }}>
            Try this:
          </div>

          <h4 style={{ fontSize: '1.375rem', color: 'var(--av-deep-blue)', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>
            {SECTION_12_CONTENT.scenarioHeading}
          </h4>

          {/* 5 Absence Conditions */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              marginBottom: '32px'
            }}
          >
            {SECTION_12_CONTENT.scenarioItems.map((item, idx) => (
              <span
                key={idx}
                style={{
                  backgroundColor: 'var(--av-danger-bg)',
                  border: '1px solid var(--av-danger-border)',
                  color: '#991B1B',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  padding: '6px 14px',
                  borderRadius: '9999px'
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--av-deep-blue)', marginBottom: '28px' }}>
            {SECTION_12_CONTENT.scenarioQuestion}
          </div>
        </div>

        {/* 3 Outcome Scenarios (A, B, C) */}
        <div style={{ maxWidth: '840px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {SECTION_12_CONTENT.options.map((opt) => {
              const isSelected = selectedOption === opt.label;
              const isDanger = opt.label === 'C.';
              const isWarning = opt.label === 'B.';

              return (
                <div
                  key={opt.label}
                  onClick={() => setSelectedOption(opt.label)}
                  className="card-white"
                  style={{
                    padding: '28px 24px',
                    cursor: 'pointer',
                    border: isSelected ? '2px solid var(--av-accent-orange)' : '1px solid rgba(7, 20, 61, 0.1)',
                    backgroundColor: isSelected ? 'rgba(229, 106, 46, 0.05)' : '#FFFFFF',
                    boxShadow: isSelected ? '0 10px 25px rgba(229, 106, 46, 0.18)' : 'var(--shadow-sm)',
                    transform: isSelected ? 'translateY(-2px)' : 'none',
                    transition: 'all 200ms ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span
                        style={{
                          fontSize: '1.5rem',
                          fontFamily: 'var(--font-serif)',
                          fontWeight: 800,
                          color: isDanger ? '#DC2626' : isWarning ? 'var(--av-accent-orange)' : 'var(--av-primary-blue)'
                        }}
                      >
                        {opt.label}
                      </span>
                      {isSelected && (
                        <CheckCircle2 size={18} color="var(--av-accent-orange)" />
                      )}
                    </div>

                    <h4 style={{ fontSize: '1.1875rem', color: 'var(--av-deep-blue)', marginBottom: '12px', lineHeight: '1.4' }}>
                      {opt.title}
                    </h4>

                    <p style={{ fontSize: '0.9375rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
                      {opt.explanation}
                    </p>
                  </div>

                  {opt.label === 'C.' && (
                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--av-danger-border)', fontSize: '0.8125rem', fontWeight: 800, color: '#991B1B' }}>
                      It's a business design problem.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Transformation From/To Statement */}
        <div style={{ maxWidth: '840px', margin: '0 auto 40px auto', textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: 'var(--av-deep-blue)',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '36px 32px',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', marginBottom: '20px' }}>
              {SECTION_12_CONTENT.avencisObjectiveIntro}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#FCA5A5',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '1rem'
                }}
              >
                {SECTION_12_CONTENT.fromState}
              </div>

              <div style={{ color: 'var(--av-accent-orange)' }}>
                <ArrowRightCircle size={28} />
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#6EE7B7',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '1rem'
                }}
              >
                {SECTION_12_CONTENT.toState}
              </div>
            </div>

            <p style={{ fontSize: '1rem', color: '#CBD5E1', fontStyle: 'italic' }}>
              {SECTION_12_CONTENT.underneathNote}
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        {(() => {
          const selectedOptionObj = selectedOption
            ? SECTION_12_CONTENT.options.find((opt) => opt.label === selectedOption)
            : null;
          const whatsappUrl = getFounderDependencyWhatsAppUrl(selectedOptionObj);

          return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                to={isTeaser ? '/dependency-index' : '/diagnostics'}
                className="btn btn-primary btn-lg"
                id="founder-dependency-cta-btn"
              >
                <span>{SECTION_12_CONTENT.ctaText}</span>
                <ArrowRight size={18} />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
                id="founder-dependency-whatsapp-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <MessageSquare size={18} color="#25D366" />
                <span>
                  WhatsApp: {selectedOption ? `Option ${selectedOption.replace('.', '')}` : SECTION_12_CONTENT.whatsappKeyword}
                </span>
              </a>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
