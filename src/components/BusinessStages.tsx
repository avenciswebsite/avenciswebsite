import React from 'react';
import { BUSINESS_STAGES } from '../data/siteData';
import { Layers, CheckCircle2 } from 'lucide-react';

export const BusinessStages: React.FC = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div className="eyebrow-badge">
            <Layers size={14} />
            <span>Revenue Threshold Traps</span>
          </div>
          <h2 className="text-editorial-lg" style={{ marginTop: '16px', marginBottom: '16px' }}>
            Why What Got You Here Won't Get You There
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--av-slate-600)' }}>
            Every revenue milestone breaks existing processes and creates specific failure traps.
            Here is how Avencis fixes each threshold.
          </p>
        </div>

        {/* 4 Stages Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {BUSINESS_STAGES.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--av-cream-light)',
                borderRadius: '16px',
                border: '1px solid rgba(7, 20, 61, 0.08)',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--av-primary-blue)' }}>
                    {item.stage}
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, backgroundColor: 'var(--av-soft-blue)', padding: '4px 10px', borderRadius: '6px', color: 'var(--av-primary-blue)' }}>
                    {item.threshold}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3125rem', color: 'var(--av-deep-blue)', marginBottom: '14px' }}>
                  {item.theTrap}
                </h3>

                <div style={{ backgroundColor: 'var(--av-danger-bg)', padding: '12px', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--av-danger-border)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991B1B', textTransform: 'uppercase', marginBottom: '4px' }}>
                    What Breaks
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#7F1D1D' }}>
                    {item.whatBreaks}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--av-primary-blue)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    The Avencis Fix
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--av-slate-700)' }}>
                    {item.avencisFix}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--av-slate-200)', paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: '#065F46', fontWeight: 700 }}>
                <CheckCircle2 size={16} />
                <span>Target: {item.targetOutcome}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
