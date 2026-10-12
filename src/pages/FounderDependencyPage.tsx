import React, { useState } from 'react';
import { Section12FounderDependency } from '../components/Section12FounderDependency';
import { Section13GrowthStages } from '../components/Section13GrowthStages';
import { FounderDependency } from '../components/FounderDependency';
import { BusinessStages } from '../components/BusinessStages';
import { Gauge, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FounderDependencyPage: React.FC = () => {
  const [showDetailedMatrix, setShowDetailedMatrix] = useState(true);

  return (
    <div className="page-wrapper" id="dependency-index-page-root">
      {/* Page Hero Header */}
      <div className="page-hero-banner">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow-badge orange" style={{ marginBottom: '14px' }}>
              <Gauge size={14} />
              <span>Dependency Index & Growth Stages</span>
            </div>
            <h1 className="text-editorial-xl" style={{ marginBottom: '16px' }}>
              If You Disappear for 7 Days, Does Your Business Keep Moving?
            </h1>
            <p style={{ fontSize: '1.1875rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
              The question isn't how big your business is. It's how dependent your business is on you.
              Diagnose your dependency gaps and identify which growth stage your enterprise is currently navigating.
            </p>
          </div>
        </div>
      </div>

      {/* Section 12 — Founder Dependency (Approved Core Section) */}
      <Section12FounderDependency isTeaser={false} />

      {/* Section 13 — Which Stage Is Your Business In? (Approved Core Section) */}
      <Section13GrowthStages isTeaser={false} />

      {/* Toggle to View Detailed Dependency Risk Matrix & Threshold Traps */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid rgba(7, 20, 61, 0.08)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto 32px auto' }}>
            <div className="eyebrow-badge" style={{ marginBottom: '12px' }}>
              <ShieldCheck size={14} />
              <span>In-Depth Analytical Framework</span>
            </div>
            <h3 className="text-editorial-lg" style={{ marginBottom: '12px' }}>
              Detailed Dependency Tiers & Revenue Milestone Traps
            </h3>
            <p style={{ fontSize: '1.0625rem', color: 'var(--av-slate-600)' }}>
              Explore the granular metrics, symptoms, and specific operational unlocks across ₹2 Cr to ₹150 Cr+ thresholds.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowDetailedMatrix(!showDetailedMatrix)}
            className="btn btn-secondary btn-md"
            style={{ marginBottom: '32px' }}
          >
            <span>{showDetailedMatrix ? 'Hide Detailed Tiers Matrix' : 'Explore Detailed Tiers & Milestone Traps'}</span>
          </button>

          {showDetailedMatrix && (
            <div style={{ textAlign: 'left', marginTop: '24px' }}>
              {/* Preserved 4 Levels of Dependency Component */}
              <FounderDependency />

              {/* Preserved Revenue Threshold Traps Component */}
              <BusinessStages />
            </div>
          )}
        </div>
      </section>

      {/* Bottom Action Banner */}
      <section className="section-padding" style={{ backgroundColor: 'var(--av-deep-blue)', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="text-editorial-lg" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              Ready to Build a Business That Doesn't Need You for Everything?
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '32px' }}>
              Take the free 15–20 minute Business Scale Assessment and calculate your exact dependency score.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/diagnostics" className="btn btn-orange btn-lg">
                <span>Take Business Scale Assessment</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
