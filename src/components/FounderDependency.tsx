import React from 'react';
import { DEPENDENCY_STAGES } from '../data/siteData';
import { Gauge, ArrowRight, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FounderDependency: React.FC = () => {
  const getRiskBadgeStyles = (score: number) => {
    if (score >= 80) {
      return {
        bg: 'var(--av-danger-bg)',
        border: '1px solid var(--av-danger-border)',
        text: '#991B1B'
      };
    }
    if (score >= 30) {
      return {
        bg: 'rgba(229, 106, 46, 0.1)',
        border: '1px solid rgba(229, 106, 46, 0.3)',
        text: 'var(--av-accent-orange)'
      };
    }
    return {
      bg: 'var(--av-success-bg)',
      border: '1px solid var(--av-success-border)',
      text: 'var(--av-success)'
    };
  };

  return (
    <section className="section-padding" id="dependency-stages-framework" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '14px' }}>
            <Gauge size={14} />
            <span>The Founder Dependency Index</span>
          </div>
          <h2 className="text-editorial-lg" style={{ marginTop: '14px', marginBottom: '16px' }}>
            The 4 Levels of Founder Dependency
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
            High founder dependency lowers business valuation, burns out leadership, and caps enterprise growth.
            Identify your current stage and the exact structural unlock required.
          </p>
        </div>

        {/* 4 Detailed Stage Breakdown Cards */}
        <div className="dependency-stages-list">
          {DEPENDENCY_STAGES.map((stg) => {
            const risk = getRiskBadgeStyles(stg.riskScore);

            return (
              <div key={stg.level} className="dep-stage-card-structured">
                <div>
                  {/* Hierarchy 1: Stage Number and Dependency-Risk Percentage */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '10px',
                      marginBottom: '16px',
                      paddingBottom: '14px',
                      borderBottom: '1px solid rgba(7, 20, 61, 0.08)'
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: 'var(--av-deep-blue)',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '0.8125rem',
                        letterSpacing: '0.05em',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        textTransform: 'uppercase'
                      }}
                    >
                      Stage 0{stg.level}
                    </span>

                    <span
                      style={{
                        backgroundColor: risk.bg,
                        border: risk.border,
                        color: risk.text,
                        fontWeight: 800,
                        fontSize: '0.8125rem',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <AlertTriangle size={13} />
                      {stg.riskScore}% Dependency Risk
                    </span>
                  </div>

                  {/* Hierarchy 2: Stage Title */}
                  <h3
                    style={{
                      fontSize: '1.375rem',
                      color: 'var(--av-deep-blue)',
                      fontFamily: 'var(--font-serif)',
                      marginBottom: '6px',
                      lineHeight: '1.3'
                    }}
                  >
                    {stg.name}
                  </h3>

                  {stg.subtitle && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--av-slate-500)', fontStyle: 'italic', marginBottom: '14px' }}>
                      {stg.subtitle}
                    </p>
                  )}

                  {/* Hierarchy 3: Revenue Range */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'var(--av-cream-light)',
                      border: '1px solid rgba(0, 26, 114, 0.1)',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      marginBottom: '20px',
                      fontSize: '0.875rem'
                    }}
                  >
                    <span style={{ color: 'var(--av-slate-500)', fontWeight: 600 }}>Revenue Range:</span>
                    <strong style={{ color: 'var(--av-accent-orange)', fontWeight: 800 }}>{stg.revenueRange}</strong>
                  </div>

                  {/* Hierarchy 4: Key Indicator / Symptom */}
                  <div
                    style={{
                      backgroundColor: 'var(--av-cream-light)',
                      border: '1px solid rgba(7, 20, 61, 0.08)',
                      borderRadius: '12px',
                      padding: '16px 18px',
                      marginBottom: '18px'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--av-primary-blue)',
                        marginBottom: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <ShieldCheck size={14} />
                      <span>Key Indicator / Symptom</span>
                    </div>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--av-slate-700)', lineHeight: '1.6', margin: 0 }}>
                      {stg.keySymptom}
                    </p>
                  </div>

                  {/* Hierarchy 5: Founder Involvement */}
                  <div
                    style={{
                      marginBottom: '20px',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(7, 20, 61, 0.06)'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--av-slate-500)', marginBottom: '4px' }}>
                      Founder Involvement
                    </div>
                    <div style={{ fontSize: '0.9375rem', color: 'var(--av-deep-blue)', fontWeight: 600, lineHeight: '1.5' }}>
                      {stg.founderInvolvement}
                    </div>
                  </div>
                </div>

                {/* Hierarchy 6: Avencis Unlock */}
                <div
                  style={{
                    backgroundColor: 'rgba(0, 26, 114, 0.04)',
                    border: '1.5px solid rgba(0, 26, 114, 0.14)',
                    borderLeft: '4px solid var(--av-accent-orange)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginTop: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--av-accent-orange)', marginBottom: '4px' }}>
                    <Sparkles size={14} />
                    <span>Avencis Unlock</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--av-deep-blue)', fontWeight: 600, lineHeight: '1.5', margin: 0 }}>
                    {stg.avencisIntervention}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Link to Diagnostics */}
        <div style={{ textAlign: 'center', marginTop: '44px' }}>
          <Link to="/diagnostics" className="btn btn-secondary btn-lg" id="dependency-calculate-cta">
            <span>Calculate Your Exact Dependency Score Now</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
