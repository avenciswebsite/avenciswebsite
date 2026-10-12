import React from 'react';
import { Link } from 'react-router-dom';
import { SECTION_1_CONTENT } from '../data/siteData';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { CheckCircle2, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

export const Section1Hero: React.FC = () => {
  return (
    <section className="section-padding" id="core-positioning" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(7, 20, 61, 0.08)' }}>
      <div className="container">
        {/* Core Positioning Eyebrow & Brand */}
        <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Sparkles size={14} />
            <span>{SECTION_1_CONTENT.brandTagline}</span>
          </div>

          <div
            style={{
              backgroundColor: 'var(--av-cream-light)',
              border: '1px solid rgba(0, 26, 114, 0.1)',
              borderRadius: '12px',
              padding: '16px 24px',
              marginBottom: '32px',
              display: 'inline-block',
              maxWidth: '820px'
            }}
          >
            <div style={{ fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--av-primary-blue)', marginBottom: '4px' }}>
              Positioning statement:
            </div>
            <p style={{ fontSize: '1.0625rem', color: 'var(--av-deep-blue)', fontStyle: 'italic', lineHeight: '1.6' }}>
              {SECTION_1_CONTENT.positioningStatement}
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="text-editorial-xl" style={{ marginBottom: '28px' }}>
            {SECTION_1_CONTENT.headline}
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'var(--av-slate-700)', fontWeight: 600, marginBottom: '24px' }}>
            {SECTION_1_CONTENT.introLines}
          </p>
        </div>

        {/* The 7 Frustrations Checklist Grid */}
        <div style={{ maxWidth: '820px', margin: '0 auto 40px auto' }}>
          <div
            className="founder-problems-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '14px 24px',
              backgroundColor: 'var(--av-cream-light)',
              padding: '28px',
              borderRadius: '16px',
              border: '1px solid rgba(7, 20, 61, 0.08)'
            }}
          >
            {SECTION_1_CONTENT.checklist.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{ color: 'var(--av-accent-orange)', marginTop: '2px', flexShrink: 0 }}>
                  <CheckCircle2 size={18} />
                </div>
                <span style={{ fontSize: '1rem', color: 'var(--av-deep-blue)', fontWeight: 500, lineHeight: '1.5' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Progression & Realization */}
        <div style={{ maxWidth: '820px', margin: '0 auto 48px auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--av-slate-600)', marginBottom: '20px', fontWeight: 600 }}>
            {SECTION_1_CONTENT.transition}
          </p>

          {/* Business Complexity Progression */}
          <div style={{ maxWidth: '580px', margin: '0 auto 36px auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
              {SECTION_1_CONTENT.complexityLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  <div
                    style={{
                      width: '100%',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(0, 26, 114, 0.08)',
                      borderRadius: '10px',
                      padding: '12px 20px',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: 'var(--av-deep-blue)'
                    }}
                  >
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(229, 106, 46, 0.12)',
                        color: 'var(--av-accent-orange)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span>{line}</span>
                  </div>

                  {idx < SECTION_1_CONTENT.complexityLines.length - 1 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '18px',
                        color: 'var(--av-accent-orange)'
                      }}
                      aria-hidden="true"
                    >
                      <div style={{ width: '1.5px', height: '10px', backgroundColor: 'var(--av-accent-orange)' }} />
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: '4px solid transparent',
                          borderRight: '4px solid transparent',
                          borderTop: '5px solid var(--av-accent-orange)'
                        }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--av-deep-blue)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '32px 28px',
              marginBottom: '32px',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ fontSize: '0.875rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              {SECTION_1_CONTENT.realizationLead}
            </div>
            <h3 style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.875rem)', color: '#FFFFFF', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>
              {SECTION_1_CONTENT.realizationHighlight}
            </h3>
            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', lineHeight: '1.7', maxWidth: '720px', margin: '0 auto' }}>
              {SECTION_1_CONTENT.solutionText}
            </p>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/diagnostics" className="btn btn-primary btn-lg" id="section-1-assessment-btn">
              <span>{SECTION_1_CONTENT.ctaAssessmentText}</span>
              <ArrowRight size={18} />
            </Link>

            <a
              href={getWhatsAppUrl(SECTION_1_CONTENT.ctaWhatsAppKeyword)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
              id="section-1-whatsapp-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <MessageSquare size={18} color="#25D366" />
              <span>{SECTION_1_CONTENT.ctaWhatsAppDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
