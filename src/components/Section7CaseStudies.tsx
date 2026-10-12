import React, { useState } from 'react';
import { APPROVED_CASE_STUDIES } from '../data/siteData';
import { getCaseStudyWhatsAppUrl } from '../utils/whatsapp';
import { Award, MessageSquare, CheckCircle2, ChevronRight, X } from 'lucide-react';
import type { ApprovedCaseStudy } from '../types';

export const Section7CaseStudies: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<ApprovedCaseStudy | null>(null);

  return (
    <section className="section-padding" id="client-case-studies" style={{ backgroundColor: 'var(--av-cream-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '840px', margin: '0 auto 48px auto', textAlign: 'center' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '16px' }}>
            <Award size={14} />
            <span>WHAT THIS LOOKS LIKE IN REAL BUSINESSES</span>
          </div>

          <h2 className="text-editorial-xl" style={{ marginBottom: '16px' }}>
            We Don't Believe in "One Size Fits All."
          </h2>

          <p style={{ fontSize: '1.25rem', color: 'var(--av-slate-600)' }}>
            Here's what happened when we worked inside different businesses.
          </p>
        </div>

        {/* 4 Case Studies Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '48px'
          }}
        >
          {APPROVED_CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="card-white"
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '4px solid var(--av-primary-blue)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--av-accent-orange)', letterSpacing: '0.06em' }}>
                    {study.number}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'var(--av-soft-blue)', color: 'var(--av-primary-blue)', padding: '2px 8px', borderRadius: '4px' }}>
                    WhatsApp: {study.whatsappKeyword}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3125rem', color: 'var(--av-deep-blue)', marginBottom: '16px', lineHeight: '1.4' }}>
                  {study.title}
                </h3>

                {/* Context Points */}
                <div style={{ backgroundColor: 'var(--av-cream-light)', padding: '16px', borderRadius: '10px', marginBottom: '18px', border: '1px solid rgba(7, 20, 61, 0.06)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--av-slate-500)', marginBottom: '6px' }}>
                    The Baseline Reality:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {study.context.map((line, cIdx) => (
                      <div key={cIdx} style={{ fontSize: '0.875rem', color: 'var(--av-slate-700)' }}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Intervention Summary */}
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--av-primary-blue)', marginBottom: '8px' }}>
                    {study.interventionTitle}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {study.interventionItems.slice(0, 4).map((item, iIdx) => (
                      <li key={iIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: 'var(--av-slate-600)' }}>
                        <CheckCircle2 size={14} color="var(--av-primary-blue)" style={{ flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                    {study.interventionItems.length > 4 && (
                      <li style={{ fontSize: '0.8125rem', color: 'var(--av-slate-500)', fontStyle: 'italic', paddingLeft: '20px' }}>
                        + {study.interventionItems.length - 4} more system interventions
                      </li>
                    )}
                  </ul>
                </div>

                {/* Result Highlight */}
                <div style={{ backgroundColor: 'var(--av-success-bg)', border: '1px solid var(--av-success-border)', padding: '14px 16px', borderRadius: '8px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#065F46', marginBottom: '4px' }}>
                    {study.resultHighlight}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#064E3B' }}>
                    {study.resultParagraph}
                  </div>
                </div>
              </div>

              {/* Actions: Read Details + WhatsApp CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedStudy(study)}
                  style={{
                    color: 'var(--av-primary-blue)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--av-slate-200)'
                  }}
                >
                  <span>[Read the Case Study →]</span>
                  <ChevronRight size={16} />
                </button>

                <a
                  href={getCaseStudyWhatsAppUrl(study.title, study.whatsappKeyword)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}
                >
                  <MessageSquare size={15} color="#25D366" />
                  <span>WhatsApp: {study.whatsappKeyword}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal for [Read the Case Study →] */}
        {selectedStudy && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(7, 20, 61, 0.75)',
              backdropFilter: 'blur(6px)',
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setSelectedStudy(null)}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                maxWidth: '680px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '36px 32px',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedStudy(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--av-slate-500)', padding: '6px' }}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--av-accent-orange)', marginBottom: '8px' }}>
                {selectedStudy.number}
              </div>
              <h3 style={{ fontSize: '1.625rem', color: 'var(--av-deep-blue)', marginBottom: '20px' }}>
                {selectedStudy.title}
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--av-slate-900)', marginBottom: '8px' }}>
                  The Problem & Baseline:
                </h4>
                {selectedStudy.context.map((c, idx) => (
                  <p key={idx} style={{ fontSize: '0.9375rem', color: 'var(--av-slate-600)', marginBottom: '4px' }}>
                    {c}
                  </p>
                ))}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--av-slate-900)', marginBottom: '8px' }}>
                  {selectedStudy.interventionTitle}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedStudy.interventionItems.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9375rem', color: 'var(--av-slate-700)' }}>
                      <CheckCircle2 size={16} color="var(--av-primary-blue)" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ backgroundColor: 'var(--av-success-bg)', padding: '20px', borderRadius: '10px', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#065F46', marginBottom: '8px' }}>
                  {selectedStudy.resultHighlight}
                </h4>
                <p style={{ fontSize: '0.9375rem', color: '#064E3B' }}>
                  {selectedStudy.resultParagraph}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <a
                  href={getCaseStudyWhatsAppUrl(selectedStudy.title, selectedStudy.whatsappKeyword)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <MessageSquare size={16} color="#25D366" />
                  <span>WhatsApp: {selectedStudy.whatsappKeyword}</span>
                </a>
                <button onClick={() => setSelectedStudy(null)} className="btn btn-primary">
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
