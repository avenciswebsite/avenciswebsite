import React from 'react';
import { Users, CheckCircle, ArrowRight } from 'lucide-react';

export const ExtendedManagementTeam: React.FC = () => {
  const emtPillars = [
    {
      title: 'Defined Authority Matrix (RACI)',
      desc: 'Tier-1, Tier-2 and Tier-3 financial and operational approval boundaries so department heads make decisions without pinging the founder.'
    },
    {
      title: 'Weekly Operating Rhythm',
      desc: 'Structured 45-minute cross-functional cadences using standardized SLA dashboards, shifting focus from excuses to root-cause solutions.'
    },
    {
      title: 'Value-Linked Incentive Structures',
      desc: 'Aligning department lead bonuses directly with gross margin contribution, DSO compression, and OTIF delivery instead of vague activity.'
    },
    {
      title: 'Executive Shadowing & Coaching',
      desc: 'Avencis partners shadow your leaders during real meetings, providing live coaching on commercial negotiation, accountability, and problem-solving.'
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--av-deep-blue)', color: '#FFFFFF' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'center' }}>
          {/* Top/Left Section */}
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow-badge white" style={{ marginBottom: '16px' }}>
              <Users size={14} />
              <span>The Proprietary EMT Framework</span>
            </div>
            <h2 className="text-editorial-lg" style={{ color: '#FFFFFF', marginBottom: '20px' }}>
              Building the Extended Management Team (EMT)
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#CBD5E1', lineHeight: '1.7' }}>
              The #1 growth barrier for companies crossing ₹20 Crore is not strategy—it is the lack of an
              empowered second line of leadership. We build your Extended Management Team into a self-governing
              execution powerhouse.
            </p>
          </div>

          {/* 4 EMT Pillars Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {emtPillars.map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  padding: '28px 24px',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--av-accent-orange)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                      }}
                    >
                      0{idx + 1}
                    </div>
                    <h3 style={{ fontSize: '1.1875rem', color: '#FFFFFF' }}>{pillar.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: '#94A3B8', lineHeight: '1.6' }}>
                    {pillar.desc}
                  </p>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#6EE7B7' }}>
                  <CheckCircle size={14} />
                  <span>Institutionalized Protocol</span>
                </div>
              </div>
            ))}
          </div>

          {/* EMT Impact Banner */}
          <div
            style={{
              backgroundColor: 'rgba(229, 106, 46, 0.15)',
              border: '1px solid rgba(229, 106, 46, 0.4)',
              borderRadius: '16px',
              padding: '28px 32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                Outcome: Founder Reclaims 20 to 30 Hours Every Single Week
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#FCD34D' }}>
                Your department heads transform from passive task-waiters into proactive business owners.
              </div>
            </div>
            <a href="#diagnostic-tool" className="btn btn-orange">
              <span>Assess Your Leadership Tier</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
