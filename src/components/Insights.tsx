import React from 'react';
import { INSIGHT_ARTICLES } from '../data/siteData';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const Insights: React.FC = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div className="eyebrow-badge">
            <BookOpen size={14} />
            <span>Founder Insights & Frameworks</span>
          </div>
          <h2 className="text-editorial-lg" style={{ marginTop: '16px', marginBottom: '16px' }}>
            Executive Briefings for Growing Enterprises
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--av-slate-600)' }}>
            Practical, no-fluff perspectives on promoter bandwidth, middle management enablement, and
            working capital governance.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {INSIGHT_ARTICLES.map((art) => (
            <div
              key={art.id}
              style={{
                backgroundColor: 'var(--av-cream-light)',
                borderRadius: '16px',
                border: '1px solid rgba(7, 20, 61, 0.08)',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 200ms ease, box-shadow 200ms ease',
              }}
              className="card-cream"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--av-accent-orange)', letterSpacing: '0.06em' }}>
                    {art.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--av-slate-500)' }}>
                    <Clock size={12} />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--av-deep-blue)', marginBottom: '12px', lineHeight: '1.3' }}>
                  {art.title}
                </h3>

                <p style={{ fontSize: '0.9375rem', color: 'var(--av-slate-600)', lineHeight: '1.6', marginBottom: '24px' }}>
                  {art.summary}
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(7, 20, 61, 0.08)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--av-slate-500)' }}>{art.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: 700, color: 'var(--av-primary-blue)' }}>
                  <span>Read Briefing</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
