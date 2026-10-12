import React, { useState } from 'react';
import { APPROVED_GROWTH_STAGES, SECTION_13_CONCLUSION } from '../data/siteData';
import { getGrowthStageWhatsAppUrl } from '../utils/whatsapp';
import { Layers, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Section13GrowthStagesProps {
  isTeaser?: boolean;
}

export const Section13GrowthStages: React.FC<Section13GrowthStagesProps> = ({ isTeaser = false }) => {
  const [activeStage, setActiveStage] = useState<number>(3);

  const selectedStageObj = APPROVED_GROWTH_STAGES.find((s) => s.stage === activeStage) || null;
  const stageWhatsAppUrl = getGrowthStageWhatsAppUrl(selectedStageObj);

  return (
    <section className="section-padding" id="business-growth-stages" style={{ backgroundColor: 'var(--av-cream-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '840px', margin: '0 auto 48px auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Layers size={14} />
            <span>YOU MAY BE AT THIS STAGE</span>
          </div>

          <h2 className="text-editorial-xl" style={{ marginBottom: '16px' }}>
            Which Stage Is Your Business In?
          </h2>

          <p style={{ fontSize: '1.1875rem', color: 'var(--av-slate-600)' }}>
            Every founder-led enterprise progresses through 5 identifiable growth phases.
          </p>
        </div>

        {/* 5 Stages Grid / Track */}
        <div
          style={{
            maxWidth: '1080px',
            margin: '0 auto 48px auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}
        >
          {APPROVED_GROWTH_STAGES.map((stg) => {
            const isSelected = activeStage === stg.stage;

            return (
              <div
                key={stg.stage}
                onClick={() => setActiveStage(stg.stage)}
                className="card-white"
                style={{
                  padding: '24px 20px',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--av-accent-orange)' : '1px solid rgba(7, 20, 61, 0.08)',
                  borderTop: isSelected ? '5px solid var(--av-accent-orange)' : '4px solid var(--av-primary-blue)',
                  backgroundColor: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                  transform: isSelected ? 'translateY(-4px)' : 'none',
                  boxShadow: isSelected ? '0 10px 25px rgba(229, 106, 46, 0.16)' : 'var(--shadow-sm)',
                  transition: 'all 200ms ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--av-accent-orange)' }}>
                      {stg.stageLabel}
                    </span>
                    {isSelected && (
                      <span style={{ fontSize: '0.6875rem', fontWeight: 800, backgroundColor: 'rgba(229, 106, 46, 0.12)', color: 'var(--av-accent-orange)', padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={12} />
                        SELECTED
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.1875rem', color: 'var(--av-deep-blue)', marginBottom: '14px', lineHeight: '1.3' }}>
                    {stg.title}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {stg.points.map((pt, pIdx) => (
                      <p key={pIdx} style={{ fontSize: '0.875rem', color: 'var(--av-slate-600)', lineHeight: '1.5' }}>
                        {pt}
                      </p>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid var(--av-slate-100)', fontSize: '0.75rem', color: 'var(--av-primary-blue)', fontWeight: 700 }}>
                  Stage {stg.stage} Dynamics
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Core Insight Banner */}
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
            <p style={{ fontSize: '1.1875rem', color: '#CBD5E1', marginBottom: '12px' }}>
              {SECTION_13_CONCLUSION.notQuestion}
            </p>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.125rem)', color: 'var(--av-accent-orange)', fontFamily: 'var(--font-serif)' }}>
              {SECTION_13_CONCLUSION.realQuestion}
            </h3>
          </div>
        </div>

        {/* WhatsApp & Navigation Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {isTeaser ? (
            <Link to="/dependency-index" className="btn btn-primary btn-lg">
              <span>Explore All Growth Stages</span>
              <ArrowRight size={18} />
            </Link>
          ) : (
            <Link to="/diagnostics" className="btn btn-primary btn-lg">
              <span>Assess Your Business Stage</span>
              <ArrowRight size={18} />
            </Link>
          )}

          <a
            href={stageWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-lg"
            id="growth-stages-whatsapp-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <MessageSquare size={18} color="#25D366" />
            <span>
              WhatsApp: Stage {activeStage} ({selectedStageObj?.title})
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
