import React from 'react';
import {
  TrendingUp,
  Settings,
  DollarSign,
  Users2,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { BUSINESS_ENGINES } from '../data/siteData';

export const BusinessEngines: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'revenue-engine':
        return <TrendingUp size={24} />;
      case 'operations-engine':
        return <Settings size={24} />;
      case 'finance-engine':
        return <DollarSign size={24} />;
      case 'emt-engine':
        return <Users2 size={24} />;
      case 'governance-engine':
        return <BarChart3 size={24} />;
      default:
        return <Settings size={24} />;
    }
  };

  return (
    <section className="section-padding" id="business-engines" style={{ backgroundColor: 'var(--av-cream-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div className="eyebrow-badge">
            <span>What We Do & How We Fix It</span>
          </div>
          <h2 className="text-editorial-lg" style={{ marginTop: '16px', marginBottom: '16px' }}>
            The 5 Core Business Engines of a Scalable Enterprise
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--av-slate-600)' }}>
            Most mid-market businesses stall not from a lack of market demand, but because their internal
            operating engines remain heavily tied to the founder’s daily intervention. We systematically
            re-architect each engine.
          </p>
        </div>

        {/* Consulting Model Highlight Box */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(0, 26, 114, 0.12)',
            borderRadius: '16px',
            padding: '32px 36px',
            marginBottom: '48px',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--av-accent-orange)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              The Avencis Difference
            </span>
            <h3 style={{ fontSize: '1.625rem', color: 'var(--av-deep-blue)' }}>
              We Don't Just Advise. We Embed and Execute.
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--av-danger-bg)', borderRadius: '10px', border: '1px solid var(--av-danger-border)' }}>
              <div style={{ fontWeight: 700, color: '#991B1B', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={16} />
                <span>Traditional Consulting Firms</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#7F1D1D' }}>
                Deliver 200-page theoretical slide decks, conduct lengthy interviews, and leave execution to your already overwhelmed staff.
              </p>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--av-success-bg)', borderRadius: '10px', border: '1px solid var(--av-success-border)' }}>
              <div style={{ fontWeight: 700, color: '#065F46', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} />
                <span>The Avencis Embedded Partnership</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#064E3B' }}>
                Senior operators work directly inside your business, running weekly operating cadences, installing dashboards, and coaching your team.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Engines Cards Grid */}
        <div className="engines-grid">
          {BUSINESS_ENGINES.map((engine) => (
            <div key={engine.id} className="engine-card">
              <div>
                <div className="engine-card-top">
                  <span className="engine-number">{engine.number}</span>
                  <div className="engine-icon-box">{getIcon(engine.id)}</div>
                </div>

                <h3 className="engine-title">{engine.title}</h3>
                <div className="engine-tagline">{engine.tagline}</div>

                {/* Symptom */}
                <div className="engine-symptom-box">
                  <div style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Current Value Leak
                  </div>
                  <div>{engine.symptom}</div>
                </div>

                {/* Key Deliverables */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--av-slate-500)', marginBottom: '8px' }}>
                    Engine Architecture Deliverables:
                  </div>
                  <ul className="engine-deliverables-list">
                    {engine.deliverables.map((item, idx) => (
                      <li key={idx} className="engine-deliverable-item">
                        <CheckCircle size={16} color="var(--av-primary-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Metric Impact */}
              <div className="engine-impact-box">
                <span style={{ color: 'var(--av-slate-500)', fontWeight: 600 }}>Target Impact: </span>
                <span>{engine.metricImpact}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="#diagnostic-tool" className="btn btn-primary btn-lg">
            <span>Audit Your 5 Business Engines</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
