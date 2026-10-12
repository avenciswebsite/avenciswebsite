import React from 'react';
import { Section7CaseStudies } from '../components/Section7CaseStudies';
import { Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CaseStudiesPage: React.FC = () => {
  return (
    <div className="page-wrapper" id="case-studies-page-root">
      {/* Page Hero Header */}
      <div className="page-hero-banner">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow-badge orange" style={{ marginBottom: '14px' }}>
              <Award size={14} />
              <span>Client Case Studies & Transformations</span>
            </div>
            <h1 className="text-editorial-xl" style={{ marginBottom: '16px' }}>
              We Don't Believe in "One Size Fits All."
            </h1>
            <p style={{ fontSize: '1.1875rem', color: 'var(--av-slate-600)', lineHeight: '1.6' }}>
              Here's what happened when we worked inside different businesses across manufacturing,
              affiliate marketing, industrial capital goods, and premium interiors.
            </p>
          </div>
        </div>
      </div>

      {/* Section 7 — What This Looks Like in Real Businesses (Approved 4 Case Studies) */}
      <Section7CaseStudies />

      {/* Preserved Feature: Industry Specializations & Sector Playbooks */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid rgba(7, 20, 61, 0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
            <div className="eyebrow-badge">
              <ShieldCheck size={14} />
              <span>Industry Playbooks</span>
            </div>
            <h2 className="text-editorial-lg" style={{ marginTop: '14px', marginBottom: '14px' }}>
              Sectors We Transform
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--av-slate-600)' }}>
              Deep domain operating expertise across capital-intensive and high-velocity mid-market sectors.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div className="card-cream" style={{ padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--av-deep-blue)', marginBottom: '6px' }}>
                Manufacturing & Auto Components
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--av-slate-500)' }}>
                OEE, Scrap Reduction, Buffer Management, OTIF
              </p>
            </div>
            <div className="card-cream" style={{ padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--av-deep-blue)', marginBottom: '6px' }}>
                B2B Industrial Distribution
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--av-slate-500)' }}>
                DSO Compression, Stock Velocity, Gross Margin Defense
              </p>
            </div>
            <div className="card-cream" style={{ padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--av-deep-blue)', marginBottom: '6px' }}>
                Specialty Chemicals & Pharma
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--av-slate-500)' }}>
                EMT Alignment, Batch Yield, Quality Governance
              </p>
            </div>
            <div className="card-cream" style={{ padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--av-deep-blue)', marginBottom: '6px' }}>
                D2C & Consumer Brands
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--av-slate-500)' }}>
                Omnichannel Fulfilment, Unit Economics, Margin Discipline
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/diagnostics" className="btn btn-primary btn-lg">
              <span>Run Diagnostic On Your Business</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
