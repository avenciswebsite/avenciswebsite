import React from 'react';
import { Section3AvencisIdea } from '../components/Section3AvencisIdea';
import { Section14WhoWeWorkWith } from '../components/Section14WhoWeWorkWith';
import { Insights } from '../components/Insights';
import { BookOpen, ArrowRight, Mail } from 'lucide-react';

export const InsightsPage: React.FC = () => {
  return (
    <div className="page-wrapper" id="insights-page-root">
      {/* Page Hero Header */}
      <div className="page-hero-banner">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow-badge orange" style={{ marginBottom: '14px' }}>
              <BookOpen size={14} />
              <span>Founder Insights & Operating Philosophy</span>
            </div>
            <h1 className="text-editorial-xl" style={{ marginBottom: '16px' }}>
              Revenue Doesn't Fix a Broken Business. It Often Exposes It.
            </h1>
            <p style={{ fontSize: '1.1875rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
              Strategic frameworks and audience-specific operating field notes for founder-led businesses
              navigating the transition from promoter micromanagement to autonomous scale.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 — The Avencis Idea (Expanded Thought-Leadership Version) */}
      <Section3AvencisIdea expanded={true} />

      {/* Section 14 — Who We Work With (Audience-Specific Insights) */}
      <Section14WhoWeWorkWith />

      {/* Preserved Feature: Executive Briefings & Published Articles */}
      <section className="section-padding" style={{ backgroundColor: 'var(--av-cream-light)', borderTop: '1px solid rgba(7, 20, 61, 0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px auto' }}>
            <div className="eyebrow-badge">
              <BookOpen size={14} />
              <span>Published Briefings Archive</span>
            </div>
            <h2 className="text-editorial-lg" style={{ marginBottom: '12px' }}>
              Executive Briefings & Field Reports
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--av-slate-600)' }}>
              In-depth analysis on working capital, middle management enablement, and enterprise multiples.
            </p>
          </div>

          <Insights />
        </div>
      </section>

      {/* Preserved Feature: Monthly Founder Briefing Email Newsletter Strip */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid rgba(7, 20, 61, 0.08)' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: 'var(--av-deep-blue)',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '40px 36px',
              maxWidth: '840px',
              margin: '0 auto',
              textAlign: 'center'
            }}
          >
            <div className="eyebrow-badge white" style={{ marginBottom: '12px' }}>
              <Mail size={14} />
              <span>Monthly Founder Briefing</span>
            </div>
            <h2 className="text-editorial-lg" style={{ color: '#FFFFFF', marginBottom: '14px' }}>
              Receive Our Strategic Insights Directly
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#CBD5E1', maxWidth: '600px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
              A monthly no-fluff executive email read by 1,200+ mid-market promoters on EBITDA protection,
              working capital acceleration, and leadership enablement.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '480px', margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Enter your work email"
                style={{
                  flex: 1,
                  minWidth: '240px',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '0.9375rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF'
                }}
              />
              <button className="btn btn-orange btn-sm">
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
