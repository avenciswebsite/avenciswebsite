import React from 'react';
import { APPROVED_BUSINESS_ENGINES, SERVICE_PILLARS } from '../data/siteData';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { CheckCircle2, TrendingUp, DollarSign, Settings, BarChart3, Users2, ShieldCheck, MessageSquare } from 'lucide-react';

export const Section5EnginesAndPillars: React.FC = () => {
  const getEngineIcon = (number: string) => {
    switch (number) {
      case '01':
        return <TrendingUp size={24} />;
      case '02':
        return <DollarSign size={24} />;
      case '03':
        return <Settings size={24} />;
      case '04':
        return <BarChart3 size={24} />;
      case '05':
        return <Users2 size={24} />;
      default:
        return <Settings size={24} />;
    }
  };

  return (
    <section className="section-padding" id="business-engines-pillars" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '880px', margin: '0 auto 48px auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Settings size={14} />
            <span>OUR 5 BUSINESS ENGINES</span>
          </div>

          <h2 className="text-editorial-xl" style={{ marginBottom: '16px' }}>
            A Business Doesn't Scale Through One Department.
          </h2>

          <p style={{ fontSize: '1.25rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
            It scales when the important parts work together.
          </p>
        </div>

        {/* 5 Business Engines Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '64px'
          }}
        >
          {APPROVED_BUSINESS_ENGINES.map((engine) => (
            <div
              key={engine.number}
              className="card-white"
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '4px solid var(--av-primary-blue)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--av-accent-orange)' }}>
                    {engine.number}
                  </span>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--av-soft-blue)',
                      color: 'var(--av-primary-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getEngineIcon(engine.number)}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.375rem', color: 'var(--av-deep-blue)', marginBottom: '6px' }}>
                  {engine.title}
                </h3>

                <p style={{ fontSize: '1.0625rem', color: 'var(--av-slate-700)', fontWeight: 600, marginBottom: '20px' }}>
                  {engine.subheading}
                </p>

                {/* Bullets List */}
                <div style={{ marginBottom: '24px' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {engine.bullets.map((bullet, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9375rem', color: 'var(--av-slate-700)' }}>
                        <CheckCircle2 size={15} color="var(--av-primary-blue)" style={{ flexShrink: 0 }} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Goal Box */}
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'var(--av-cream-light)',
                  borderRadius: '8px',
                  border: '1px solid rgba(7, 20, 61, 0.08)',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: 'var(--av-deep-blue)'
                }}
              >
                {engine.goal}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Service Pillars Sub-section */}
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="eyebrow-badge" style={{ marginBottom: '12px' }}>
              <ShieldCheck size={14} />
              <span>Core Service Framework</span>
            </div>
            <h3 className="text-editorial-lg" style={{ marginBottom: '12px' }}>
              4 Service Pillars
            </h3>
            <p style={{ fontSize: '1.0625rem', color: 'var(--av-slate-600)' }}>
              The operational architecture we deploy inside founder-led businesses.
            </p>
          </div>

          {/* Pillars Table / Responsive Cards */}
          <div
            style={{
              backgroundColor: 'var(--av-cream-light)',
              borderRadius: '16px',
              border: '1px solid rgba(7, 20, 61, 0.1)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '36px'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                backgroundColor: 'var(--av-deep-blue)',
                color: '#FFFFFF',
                padding: '16px 24px',
                fontWeight: 700,
                fontSize: '0.9375rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              <div>Pillar</div>
              <div>What You Do</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {SERVICE_PILLARS.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    padding: '20px 24px',
                    borderTop: idx > 0 ? '1px solid rgba(7, 20, 61, 0.08)' : 'none',
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : 'var(--av-cream-light)',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--av-deep-blue)' }}>
                    {item.pillar}
                  </div>
                  <div style={{ fontSize: '0.9375rem', color: 'var(--av-slate-700)', fontWeight: 500 }}>
                    {item.whatYouDo}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Attribution Action for Management Systems */}
          <div style={{ textAlign: 'center' }}>
            <a
              href={getWhatsAppUrl('SYSTEM')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              id="service-pillars-whatsapp-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <MessageSquare size={16} color="#25D366" />
              <span>WhatsApp Avencis → "SYSTEM"</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
