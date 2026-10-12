import React from 'react';
import { SECTION_10_ILLUSTRATIVE_RESULT } from '../data/siteData';
import { getAssessmentScoreWhatsAppUrl } from '../utils/whatsapp';
import { Award, MessageSquare } from 'lucide-react';

interface Section10AssessmentResultsProps {
  customScore?: number;
  onRetake?: () => void;
}

export const Section10AssessmentResults: React.FC<Section10AssessmentResultsProps> = ({
  customScore,
  onRetake
}) => {
  const displayScore = customScore !== undefined ? `${customScore} / 100` : SECTION_10_ILLUSTRATIVE_RESULT.score;

  return (
    <section className="section-padding" id="assessment-results" style={{ backgroundColor: 'var(--av-cream-light)' }}>
      <div className="container">
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="eyebrow-badge orange" style={{ marginBottom: '14px' }}>
              <Award size={14} />
              <span>ASSESSMENT RESULTS</span>
            </div>

            <h2 className="text-editorial-lg" style={{ marginBottom: '10px' }}>
              Your Avencis Business Scale Score
            </h2>

            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                color: 'var(--av-accent-orange)',
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: '16px'
              }}
            >
              {displayScore}
            </div>

            <p style={{ fontSize: '1.1875rem', color: 'var(--av-slate-700)', maxWidth: '680px', margin: '0 auto', fontWeight: 600 }}>
              {SECTION_10_ILLUSTRATIVE_RESULT.summary}
            </p>
          </div>

          {/* Category Breakdown Table */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid rgba(7, 20, 61, 0.1)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '40px'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                backgroundColor: 'var(--av-deep-blue)',
                color: '#FFFFFF',
                padding: '16px 24px',
                fontWeight: 700,
                fontSize: '0.9375rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              <div>Area</div>
              <div style={{ textAlign: 'right' }}>Score</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {SECTION_10_ILLUSTRATIVE_RESULT.categories.map((cat, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    padding: '14px 24px',
                    borderTop: idx > 0 ? '1px solid rgba(7, 20, 61, 0.08)' : 'none',
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : 'var(--av-cream-light)',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--av-deep-blue)' }}>
                    {cat.area}
                  </span>
                  <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                    <div
                      style={{
                        width: '80px',
                        height: '6px',
                        backgroundColor: 'var(--av-slate-200)',
                        borderRadius: '9999px',
                        overflow: 'hidden',
                        display: 'none'
                      }}
                      className="score-bar-mobile-show"
                    >
                      <div
                        style={{
                          width: `${cat.score}%`,
                          height: '100%',
                          backgroundColor: cat.score >= 70 ? 'var(--av-success)' : cat.score >= 50 ? 'var(--av-accent-orange)' : 'var(--av-danger)'
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: '1rem',
                        color: cat.score >= 70 ? '#059669' : cat.score >= 50 ? 'var(--av-accent-orange)' : '#DC2626'
                      }}
                    >
                      {cat.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your 3 Biggest Opportunities */}
          <div style={{ marginBottom: '40px' }}>
            <h3 className="text-editorial-lg" style={{ marginBottom: '20px', textAlign: 'center' }}>
              Your 3 Biggest Opportunities
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {SECTION_10_ILLUSTRATIVE_RESULT.topOpportunities.map((opp) => (
                <div
                  key={opp.number}
                  className="card-white"
                  style={{
                    padding: '24px 26px',
                    borderLeft: '4px solid var(--av-accent-orange)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--av-accent-orange)' }}>
                      {opp.number} —
                    </span>
                    <span style={{ fontSize: '1.1875rem', fontWeight: 800, color: 'var(--av-deep-blue)' }}>
                      {opp.title}
                    </span>
                  </div>
                  <p style={{ fontSize: '1rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
                    {opp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* High-Converting WhatsApp Lead Attribution Action */}
          <div
            style={{
              backgroundColor: 'var(--av-deep-blue)',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '36px 32px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <h4 style={{ fontSize: '1.5rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
              {SECTION_10_ILLUSTRATIVE_RESULT.whatsappPrompt}
            </h4>

            <div style={{ marginBottom: '24px' }}>
              <a
                href={getAssessmentScoreWhatsAppUrl(customScore !== undefined ? customScore : null)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-orange btn-lg"
                id="assessment-results-whatsapp-score-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
              >
                <MessageSquare size={20} color="#FFFFFF" />
                <span>
                  {customScore !== undefined ? `WhatsApp My Score (${customScore}/100)` : SECTION_10_ILLUSTRATIVE_RESULT.whatsappCta}
                </span>
              </a>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#CBD5E1', maxWidth: '540px', margin: '0 auto' }}>
              This allows our team to immediately review your diagnostic score and begin a direct, high-value conversation.
            </p>

            {onRetake && (
              <div style={{ marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={onRetake}
                  style={{ color: '#94A3B8', fontSize: '0.875rem', textDecoration: 'underline' }}
                >
                  Retake Diagnostic Assessment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
