import React from 'react';
import { Section6Methodology } from '../components/Section6Methodology';
import { ExtendedManagementTeam } from '../components/ExtendedManagementTeam';
import { Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="page-wrapper" id="methodology-page-root">
      {/* Page Hero Header */}
      <div className="page-hero-banner">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow-badge orange" style={{ marginBottom: '14px' }}>
              <Layers size={14} />
              <span>Transformation Methodology</span>
            </div>
            <h1 className="text-editorial-xl" style={{ marginBottom: '16px' }}>
              First We Find the Leak. Then We Fix the System.
            </h1>
            <p style={{ fontSize: '1.1875rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
              Our approach is deliberately practical. We understand the business, prioritise the immediate bottlenecks,
              build the required systems, implement with your team, review progress, and refine as you scale.
            </p>
          </div>
        </div>
      </div>

      {/* Section 6 — How We Work (Approved 6-Step Methodology) */}
      <Section6Methodology />

      {/* Preserved Feature: Extended Management Team (EMT) Deep-Dive */}
      <ExtendedManagementTeam />

      {/* Preserved Feature: EMT Decision Rights Matrix Callout */}
      <section className="section-padding" style={{ backgroundColor: 'var(--av-cream-light)', borderTop: '1px solid rgba(7, 20, 61, 0.08)' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow-badge" style={{ marginBottom: '14px' }}>
              <ShieldCheck size={14} />
              <span>Governance & Authority Matrix</span>
            </div>
            <h2 className="text-editorial-lg" style={{ marginBottom: '16px' }}>
              The Extended Management Team (EMT) Decision Rights Matrix
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--av-slate-600)', lineHeight: '1.6', marginBottom: '32px' }}>
              We install explicit RACI definitions across sales discounts, vendor selection, operational overtime,
              and credit extensions. Your department heads gain the authority and data systems to act as true business owners.
            </p>
            <Link to="/diagnostics" className="btn btn-primary btn-lg">
              <span>Assess Your Management Systems</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
