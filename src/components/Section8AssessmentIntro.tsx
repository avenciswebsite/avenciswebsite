import React from 'react';
import { ASSESSMENT_10_CATEGORIES } from '../data/siteData';
import { CheckCircle2, Gauge, ArrowRight, Sparkles } from 'lucide-react';

interface Section8AssessmentIntroProps {
  onStartAssessment?: () => void;
}

export const Section8AssessmentIntro: React.FC<Section8AssessmentIntroProps> = ({ onStartAssessment }) => {
  return (
    <section className="section-padding" id="assessment-intro" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section 8: The Business Assessment Header */}
        <div style={{ maxWidth: '860px', margin: '0 auto 48px auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Gauge size={14} />
            <span>THE BUSINESS ASSESSMENT</span>
          </div>

          <h2 className="text-editorial-xl" style={{ marginBottom: '8px' }}>
            Before You Hire Us,
          </h2>

          <h3 style={{ fontSize: '1.75rem', color: 'var(--av-accent-orange)', fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>
            Find Out What Your Business Actually Needs.
          </h3>

          {/* Diagnostic Contrasts Grid - Distinct individual rectangular borders */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '16px',
              marginBottom: '36px',
              textAlign: 'left'
            }}
          >
            <div className="diagnostic-contrast-card">
              <div style={{ fontSize: '0.875rem', color: 'var(--av-slate-500)', fontWeight: 600 }}>You may think you have a:</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--av-deep-blue)', marginBottom: '6px' }}>Sales problem.</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--av-accent-orange)', fontWeight: 700 }}>It may actually be a: Conversion problem.</div>
            </div>

            <div className="diagnostic-contrast-card">
              <div style={{ fontSize: '0.875rem', color: 'var(--av-slate-500)', fontWeight: 600 }}>You may think you have a:</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--av-deep-blue)', marginBottom: '6px' }}>People problem.</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--av-accent-orange)', fontWeight: 700 }}>It may actually be a: Management system problem.</div>
            </div>

            <div className="diagnostic-contrast-card">
              <div style={{ fontSize: '0.875rem', color: 'var(--av-slate-500)', fontWeight: 600 }}>You may think you need:</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--av-deep-blue)', marginBottom: '6px' }}>More leads.</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--av-accent-orange)', fontWeight: 700 }}>You may actually need: Better qualification.</div>
            </div>

            <div className="diagnostic-contrast-card">
              <div style={{ fontSize: '0.875rem', color: 'var(--av-slate-500)', fontWeight: 600 }}>You may think you need:</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--av-deep-blue)', marginBottom: '6px' }}>More revenue.</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--av-accent-orange)', fontWeight: 700 }}>You may actually need: Better profitability.</div>
            </div>
          </div>

          <div style={{ fontSize: '1.375rem', color: 'var(--av-deep-blue)', fontWeight: 700, marginBottom: '8px' }}>
            So don't guess.
          </div>

          <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)', color: 'var(--av-primary-blue)', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>
            Take the Free Avencis Business Growth & Scale Assessment.
          </h3>

          <div style={{ fontSize: '1.125rem', color: 'var(--av-accent-orange)', fontWeight: 800, marginBottom: '28px' }}>
            15–20 minutes.
          </div>

          <p style={{ fontSize: '1rem', color: 'var(--av-slate-700)', fontWeight: 600, marginBottom: '16px' }}>
            You'll assess your business across:
          </p>

          {/* 10 Functions Chips - Centred 10th tablet in row 4 */}
          <div className="assessment-categories-grid">
            {ASSESSMENT_10_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--av-soft-blue)',
                  border: '1px solid rgba(0, 26, 114, 0.12)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: 'var(--av-deep-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <CheckCircle2 size={16} color="var(--av-primary-blue)" style={{ flexShrink: 0 }} />
                <span>{cat}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '1rem', color: 'var(--av-slate-600)', marginBottom: '6px' }}>
            At the end, you'll receive your:
          </div>

          <h3 style={{ fontSize: '2rem', color: 'var(--av-deep-blue)', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
            Avencis Business Scale Score
          </h3>

          <p style={{ fontSize: '1.0625rem', color: 'var(--av-slate-700)', marginBottom: '32px' }}>
            And an indication of where your biggest business gaps may be.
          </p>
        </div>

        {/* SECTION 9: Make the Assessment Feel Like a Product */}
        <div
          style={{
            backgroundColor: 'var(--av-deep-blue)',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px 36px',
            maxWidth: '920px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-2xl)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
              <Sparkles size={14} />
              <span>PROPRIETARY DIAGNOSTIC ENGINE</span>
            </div>

            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#FFFFFF', fontFamily: 'var(--font-serif)', marginBottom: '10px' }}>
              The Avencis Business Scale Assessment™
            </h3>

            <p style={{ fontSize: '1.25rem', color: 'var(--av-accent-orange)', fontWeight: 600 }}>
              Find out what's actually stopping your business from scaling.
            </p>
          </div>

          {/* 4 Pillars Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginBottom: '36px',
              textAlign: 'center'
            }}
          >
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--av-accent-orange)' }}>10</div>
              <div style={{ fontSize: '0.875rem', color: '#CBD5E1' }}>Business Functions</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--av-accent-orange)' }}>50+</div>
              <div style={{ fontSize: '0.875rem', color: '#CBD5E1' }}>Diagnostic Questions</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--av-accent-orange)' }}>1</div>
              <div style={{ fontSize: '0.875rem', color: '#CBD5E1' }}>Business Scale Score</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--av-accent-orange)' }}>Action-Oriented</div>
              <div style={{ fontSize: '0.875rem', color: '#CBD5E1' }}>Recommendations</div>
            </div>
          </div>

          {/* Proprietary Product Philosophy */}
          <div style={{ maxWidth: '720px', margin: '0 auto 36px auto' }}>
            <h4 style={{ fontSize: '1.1875rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '14px', textAlign: 'center' }}>
              Your score doesn't tell you whether your business is "good" or "bad."
            </h4>
            <div style={{ fontSize: '1rem', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="var(--av-accent-orange)" />
                <span>It tells you: Where you have control.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="var(--av-accent-orange)" />
                <span>Where you have leakage.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="var(--av-accent-orange)" />
                <span>Where you're dependent on people.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="var(--av-accent-orange)" />
                <span>Where you're dependent on yourself.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="var(--av-accent-orange)" />
                <span>Where growth could create problems.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="var(--av-accent-orange)" />
                <span>And where to focus first.</span>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.375rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)', marginBottom: '6px' }}>
              Take the Assessment.
            </div>
            <div style={{ fontSize: '1.125rem', color: 'var(--av-accent-orange)', fontWeight: 800, marginBottom: '24px' }}>
              It's free. The insight isn't.
            </div>

            <button
              type="button"
              onClick={onStartAssessment}
              className="btn btn-orange btn-lg"
              id="assessment-launch-interactive-btn"
            >
              <span>[TAKE THE FREE ASSESSMENT]</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
