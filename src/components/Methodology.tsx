import React from 'react';
import { METHODOLOGY_STAGES } from '../data/siteData';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const Methodology: React.FC = () => {
  return (
    <section className="section-padding" id="methodology" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div className="eyebrow-badge orange">
            <Zap size={14} />
            <span>The Transformation Roadmap</span>
          </div>
          <h2 className="text-editorial-lg" style={{ marginTop: '16px', marginBottom: '16px' }}>
            From Founder Bottleneck to Institutional Enterprise
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--av-slate-600)' }}>
            A rigorous, structured 12-month transformation journey designed specifically for mid-market
            promoters to build enduring enterprise value.
          </p>
        </div>

        {/* 3 Stages Grid */}
        <div className="methodology-timeline">
          {METHODOLOGY_STAGES.map((item, index) => {
            const isMiddle = index === 1;
            return (
              <div
                key={item.stage}
                className={`method-card ${isMiddle ? 'highlight' : ''}`}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="method-stage-num">{item.stage}</span>
                    <span className="method-phase-pill">{item.duration}</span>
                  </div>

                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--av-accent-orange)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    {item.phase}
                  </div>

                  <h3 style={{ fontSize: '1.375rem', color: 'var(--av-deep-blue)', marginBottom: '14px' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.9375rem', color: 'var(--av-slate-600)', lineHeight: '1.6', marginBottom: '24px' }}>
                    {item.description}
                  </p>

                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--av-slate-500)', marginBottom: '10px' }}>
                      Key Outputs & Deliverables:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {item.outputs.map((out, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'var(--av-slate-700)' }}>
                          <CheckCircle2 size={16} color="var(--av-primary-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid var(--av-slate-200)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--av-primary-blue)', fontWeight: 700 }}>
                  <ShieldCheck size={16} />
                  <span>Phase Milestone Review Gate</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action bar */}
        <div
          style={{
            marginTop: '48px',
            textAlign: 'center',
            padding: '24px',
            backgroundColor: 'var(--av-soft-blue)',
            borderRadius: '12px',
          }}
        >
          <span style={{ fontWeight: 600, color: 'var(--av-deep-blue)', marginRight: '16px' }}>
            Ready to explore what your 90-day transformation roadmap looks like?
          </span>
          <a href="#book-consultation" className="btn btn-primary btn-sm">
            <span>Schedule Diagnostic Discovery</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
