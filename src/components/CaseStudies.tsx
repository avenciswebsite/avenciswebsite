import React from 'react';
import { CASE_STUDIES } from '../data/siteData';
import { Award, TrendingUp, Clock, DollarSign, ArrowRight } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  return (
    <section className="section-padding" id="case-studies" style={{ backgroundColor: 'var(--av-cream-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div className="eyebrow-badge orange">
            <Award size={14} />
            <span>Proven Client Impact</span>
          </div>
          <h2 className="text-editorial-lg" style={{ marginTop: '16px', marginBottom: '16px' }}>
            Real Transformations. Measurable EBITDA Expansion.
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--av-slate-600)' }}>
            We measure our success by tangible balance-sheet improvements, compressed cash cycles, and
            reclaimed founder hours.
          </p>
        </div>

        {/* Aggregate Impact Banner */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            backgroundColor: 'var(--av-deep-blue)',
            color: '#FFFFFF',
            borderRadius: '16px',
            padding: '32px 36px',
            marginBottom: '48px',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--av-accent-orange)' }}>
              ₹500Cr+
            </div>
            <div style={{ fontSize: '0.875rem', color: '#CBD5E1', marginTop: '4px' }}>
              Client Value & Revenue Scaled
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#6EE7B7' }}>
              +540 bps
            </div>
            <div style={{ fontSize: '0.875rem', color: '#CBD5E1', marginTop: '4px' }}>
              Average EBITDA Expansion
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--av-soft-blue)' }}>
              65%
            </div>
            <div style={{ fontSize: '0.875rem', color: '#CBD5E1', marginTop: '4px' }}>
              Founder Bandwidth Reclaimed
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#FDE68A' }}>
              48 Days
            </div>
            <div style={{ fontSize: '0.875rem', color: '#CBD5E1', marginTop: '4px' }}>
              Average DSO Working Capital Cut
            </div>
          </div>
        </div>

        {/* Case Studies Cards Grid */}
        <div className="case-studies-grid">
          {CASE_STUDIES.map((study) => (
            <div key={study.id} className="case-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--av-accent-orange)' }}>
                    {study.clientSector}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.375rem', color: 'var(--av-deep-blue)', marginBottom: '12px' }}>
                  {study.revenueBracket}
                </h3>

                <div style={{ fontSize: '0.875rem', color: 'var(--av-slate-600)', marginBottom: '16px', lineHeight: '1.5' }}>
                  <strong>Challenge:</strong> {study.challenge}
                </div>

                <div style={{ fontSize: '0.875rem', color: 'var(--av-slate-700)', marginBottom: '16px', lineHeight: '1.5' }}>
                  <strong>Intervention:</strong> {study.intervention}
                </div>

                {/* Metric Box */}
                <div className="case-metric-banner">
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--av-slate-500)', marginBottom: '6px' }}>
                    Key Results:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--av-deep-blue)' }}>
                      <TrendingUp size={16} color="var(--av-primary-blue)" />
                      <strong>EBITDA:</strong> {study.results.ebitda}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--av-deep-blue)' }}>
                      <Clock size={16} color="var(--av-primary-blue)" />
                      <strong>Bandwidth:</strong> {study.results.bandwidth}
                    </div>
                    {study.results.workingCapital && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--av-deep-blue)' }}>
                        <DollarSign size={16} color="var(--av-primary-blue)" />
                        <strong>Working Capital:</strong> {study.results.workingCapital}
                      </div>
                    )}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div style={{ fontStyle: 'italic', fontSize: '0.875rem', color: 'var(--av-slate-700)', position: 'relative', paddingLeft: '24px', borderLeft: '3px solid var(--av-accent-orange)', marginBottom: '16px' }}>
                  "{study.quote}"
                </div>
              </div>

              {/* Author */}
              <div style={{ borderTop: '1px solid var(--av-slate-200)', paddingTop: '12px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--av-deep-blue)' }}>
                  {study.quoteAuthor}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--av-slate-500)' }}>
                  {study.quoteRole}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="#book-consultation" className="btn btn-primary btn-lg">
            <span>Discuss Your Industry Transformation</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
