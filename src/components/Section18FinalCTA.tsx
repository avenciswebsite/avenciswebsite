import React from 'react';
import { Link } from 'react-router-dom';
import { SECTION_18_CONTENT } from '../data/siteData';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { CheckCircle2, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

export const Section18FinalCTA: React.FC = () => {
  return (
    <section className="section-padding" id="final-cta" style={{ backgroundColor: 'var(--av-deep-blue)', color: '#FFFFFF' }}>
      <div className="container">
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          {/* Eyebrow */}
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Sparkles size={14} />
            <span>{SECTION_18_CONTENT.badge}</span>
          </div>

          <h2 className="text-editorial-xl" style={{ color: '#FFFFFF', marginBottom: '8px' }}>
            {SECTION_18_CONTENT.headline}
          </h2>

          <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--av-accent-orange)', fontFamily: 'var(--font-serif)', marginBottom: '24px' }}>
            {SECTION_18_CONTENT.subheadline}
          </h3>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              padding: '36px 32px',
              marginBottom: '36px',
              textAlign: 'left'
            }}
          >
            <h4 style={{ fontSize: '1.5rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)', marginBottom: '12px', textAlign: 'center' }}>
              {SECTION_18_CONTENT.assessmentTitle}
            </h4>

            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', marginBottom: '16px', fontWeight: 600 }}>
              {SECTION_18_CONTENT.helpsIdentifyIntro}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              {SECTION_18_CONTENT.identifyPoints.map((pt, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--av-accent-orange)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '1rem', color: '#E2E8F0' }}>{pt}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.9375rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                {SECTION_18_CONTENT.attentionLead}
              </div>
              <h4 style={{ fontSize: '1.5rem', color: 'var(--av-accent-orange)', fontFamily: 'var(--font-serif)' }}>
                {SECTION_18_CONTENT.attentionHeadline}
              </h4>
            </div>
          </div>

          {/* Value Proposition */}
          <div style={{ marginBottom: '36px' }}>
            <h3 style={{ fontSize: '1.875rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
              {SECTION_18_CONTENT.freeAssessmentHeadline}
            </h3>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
              {SECTION_18_CONTENT.noObligationPoints.map((pt, idx) => (
                <span key={idx} style={{ fontSize: '1.0625rem', color: '#CBD5E1', fontWeight: 600 }}>
                  ✓ {pt}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link
              to="/diagnostics"
              className="btn btn-orange btn-lg"
              id="final-cta-take-assessment-btn"
            >
              <span>[{SECTION_18_CONTENT.ctaAssessmentText}]</span>
              <ArrowRight size={18} />
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#94A3B8', fontSize: '0.9375rem' }}>{SECTION_18_CONTENT.whatsappLead}</span>
              <a
                href={getWhatsAppUrl(SECTION_18_CONTENT.whatsappKeyword)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white btn-lg"
                id="final-cta-whatsapp-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <MessageSquare size={18} color="#25D366" />
                <span>{SECTION_18_CONTENT.whatsappKeyword}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
