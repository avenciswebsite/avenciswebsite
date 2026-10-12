import React from 'react';
import { SECTION_17_CONTENT } from '../data/siteData';
import { Sparkles, Eye, Layers, BarChart3, DollarSign, TrendingUp, Unlock } from 'lucide-react';

export const Section17Promise: React.FC = () => {
  const getPromiseIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Eye size={22} />;
      case 1:
        return <Layers size={22} />;
      case 2:
        return <BarChart3 size={22} />;
      case 3:
        return <DollarSign size={22} />;
      case 4:
        return <TrendingUp size={22} />;
      case 5:
        return <Unlock size={22} />;
      default:
        return <Sparkles size={22} />;
    }
  };

  return (
    <section className="section-padding" id="the-avencis-promise" style={{ backgroundColor: 'var(--av-cream-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '840px', margin: '0 auto 48px auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Sparkles size={14} />
            <span>{SECTION_17_CONTENT.badge}</span>
          </div>

          <h2 className="text-editorial-xl" style={{ marginBottom: '16px' }}>
            {SECTION_17_CONTENT.headline}
          </h2>

          <p style={{ fontSize: '1.25rem', color: 'var(--av-deep-blue)', fontWeight: 700 }}>
            {SECTION_17_CONTENT.intro}
          </p>
        </div>

        {/* 6 Promises Grid */}
        <div
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {SECTION_17_CONTENT.promises.map((p, idx) => (
            <div
              key={idx}
              className="card-white"
              style={{
                padding: '32px 28px',
                borderTop: '4px solid var(--av-primary-blue)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--av-soft-blue)',
                    color: 'var(--av-primary-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}
                >
                  {getPromiseIcon(idx)}
                </div>

                <h3 style={{ fontSize: '1.5rem', color: 'var(--av-deep-blue)', marginBottom: '10px' }}>
                  {p.title}
                </h3>

                <p style={{ fontSize: '1.0625rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
                  {p.description}
                </p>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--av-slate-100)', fontSize: '0.8125rem', color: 'var(--av-accent-orange)', fontWeight: 800 }}>
                Avencis Core Commitment
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
