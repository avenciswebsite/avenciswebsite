import React from 'react';
import { WHY_AVENCIS_PILLARS } from '../data/siteData';
import { ShieldCheck, Users, CheckCircle2 } from 'lucide-react';

export const WhyAvencis: React.FC = () => {
  return (
    <section className="section-padding" id="why-avencis" style={{ backgroundColor: 'var(--av-cream-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div className="eyebrow-badge">
            <ShieldCheck size={14} />
            <span>The Avencis Standard</span>
          </div>
          <h2 className="text-editorial-lg" style={{ marginTop: '16px', marginBottom: '16px' }}>
            Why High-Growth Founders Partner With Avencis
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--av-slate-600)' }}>
            We are not generalist advisory consultants. We are seasoned operators dedicated exclusively to
            scaling promoter-led mid-market enterprises.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {WHY_AVENCIS_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(7, 20, 61, 0.08)',
                padding: '32px 28px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--av-primary-blue)', opacity: 0.8 }}>
                    {pillar.number}
                  </span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--av-accent-orange)' }} />
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--av-deep-blue)', marginBottom: '10px' }}>
                  {pillar.title}
                </h3>

                <p style={{ fontSize: '0.9375rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
                  {pillar.description}
                </p>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--av-slate-100)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--av-primary-blue)', fontWeight: 700 }}>
                <CheckCircle2 size={16} />
                <span>Foundational Commitment</span>
              </div>
            </div>
          ))}
        </div>

        {/* Senior Operators Network Highlight */}
        <div
          style={{
            marginTop: '48px',
            backgroundColor: 'var(--av-deep-blue)',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '40px 36px',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div style={{ maxWidth: '800px' }}>
            <div className="eyebrow-badge white" style={{ marginBottom: '12px' }}>
              <Users size={14} />
              <span>Senior Execution Network</span>
            </div>
            <h3 style={{ fontSize: '1.625rem', color: '#FFFFFF', marginBottom: '12px' }}>
              Led by Practitioners Who Have Run 9-Figure P&Ls
            </h3>
            <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: '1.6' }}>
              When you work with Avencis, you gain direct access to veteran CXOs, supply chain directors,
              commercial negotiators, and financial architects who know the exact reality of scaling businesses
              in complex industrial and consumer environments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
