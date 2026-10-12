import React, { useState } from 'react';
import { Section15Difference } from '../components/Section15Difference';
import { Section16ExtendedTeam } from '../components/Section16ExtendedTeam';
import { Section17Promise } from '../components/Section17Promise';
import { WhyAvencis } from '../components/WhyAvencis';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WhyAvencisPage: React.FC = () => {
  const [showSupplementalPillars, setShowSupplementalPillars] = useState(false);

  return (
    <div className="page-wrapper" id="why-avencis-page-root">
      {/* Page Hero Header */}
      <div className="page-hero-banner">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow-badge orange" style={{ marginBottom: '14px' }}>
              <ShieldCheck size={14} />
              <span>Why Avencis & Extended Management</span>
            </div>
            <h1 className="text-editorial-xl" style={{ marginBottom: '16px' }}>
              Why Choose Avencis as Your Extended Management Team?
            </h1>
            <p style={{ fontSize: '1.1875rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
              Because sometimes you don't need another vendor or theoretical report.
              You need seasoned operators sitting on your side of the table who stay until the system works.
            </p>
          </div>
        </div>
      </div>

      {/* Section 15 — What Makes Avencis Different */}
      <Section15Difference />

      {/* Section 16 — Why "Extended Management Team"? */}
      <Section16ExtendedTeam />

      {/* Section 17 — The Avencis Promise */}
      <Section17Promise />

      {/* Preserved Feature: Supplemental Practitioner Network & Foundational Commitments */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid rgba(7, 20, 61, 0.08)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto 32px auto' }}>
            <div className="eyebrow-badge" style={{ marginBottom: '12px' }}>
              <ShieldCheck size={14} />
              <span>Practitioner Network Details</span>
            </div>
            <h3 className="text-editorial-lg" style={{ marginBottom: '12px' }}>
              Operating Commitments & Senior Partner Network
            </h3>
            <p style={{ fontSize: '1.0625rem', color: 'var(--av-slate-600)' }}>
              Explore the operator background and foundational principles behind our mid-market transformation practice.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowSupplementalPillars(!showSupplementalPillars)}
            className="btn btn-secondary btn-md"
            style={{ marginBottom: '32px' }}
          >
            <span>{showSupplementalPillars ? 'Hide Senior Partner Network' : 'View Senior Partner Network & Commitments'}</span>
          </button>

          {showSupplementalPillars && (
            <div style={{ textAlign: 'left', marginTop: '24px' }}>
              <WhyAvencis />
            </div>
          )}
        </div>
      </section>

      {/* Action Footer */}
      <section className="section-padding" style={{ backgroundColor: 'var(--av-deep-blue)', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="text-editorial-lg" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              Build Capability Inside Your Business Today
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '32px' }}>
              Start with our free Business Scale Assessment to identify what deserves your attention first.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/diagnostics" className="btn btn-orange btn-lg">
                <span>Take Free Assessment</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
