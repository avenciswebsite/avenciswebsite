import React from 'react';
import type { DiagnosticResult } from '../types';
import { AlertTriangle, X, Sparkles, PhoneCall, MessageSquare } from 'lucide-react';
import { getAssessmentScoreWhatsAppUrl } from '../utils/whatsapp';

interface AssessmentResultProps {
  result: DiagnosticResult;
  onClose: () => void;
  onBookConsultation: () => void;
}

export const AssessmentResult: React.FC<AssessmentResultProps> = ({
  result,
  onClose,
  onBookConsultation,
}) => {
  const getRiskColor = (score: number) => {
    if (score < 50) return '#EF4444';
    if (score < 75) return '#F59E0B';
    return '#10B981';
  };

  const getReadinessGrade = (score: number) => {
    if (score < 40) return { grade: 'Grade D (Critical Dependency)', text: 'The enterprise is at extreme operational risk if founder is unavailable. Immediate structural intervention required.' };
    if (score < 60) return { grade: 'Grade C (High Bottleneck)', text: 'Significant founder bottleneck in sales approvals and operational firefighting. Scalability is severely restricted.' };
    if (score < 80) return { grade: 'Grade B (Emerging EMT)', text: 'Partial systemization in place, but middle management requires accountability cadence and cash flow engineering.' };
    return { grade: 'Grade A (High Institutional Scalability)', text: 'Strong autonomy across business engines. Focus on M&A readiness and valuation compounding.' };
  };

  const gradeInfo = getReadinessGrade(result.overallScore);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 20, 61, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: '680px',
          width: '100%',
          padding: '40px 36px',
          boxShadow: 'var(--shadow-2xl)',
          position: 'relative',
          color: 'var(--av-deep-blue)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--av-slate-500)',
            padding: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--av-slate-100)',
          }}
          aria-label="Close Diagnostic Report"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="eyebrow-badge orange" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} />
            <span>Diagnostic Report Generated</span>
          </div>
          <h2 style={{ fontSize: '1.875rem', color: 'var(--av-deep-blue)' }}>
            Your Founder Autonomy & Engine Score
          </h2>
        </div>

        {/* Score Circle / Meter */}
        <div
          style={{
            backgroundColor: 'var(--av-cream-light)',
            border: '1px solid rgba(7, 20, 61, 0.1)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--av-slate-500)' }}>
              Overall Readiness Index
            </div>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--av-deep-blue)', marginTop: '2px' }}>
              {gradeInfo.grade}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--av-slate-600)', marginTop: '4px' }}>
              {gradeInfo.text}
            </p>
          </div>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: `4px solid ${getRiskColor(result.overallScore)}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}>
              {result.overallScore}
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--av-slate-500)' }}>/ 100</span>
          </div>
        </div>

        {/* Key Identified Bottleneck */}
        <div
          style={{
            backgroundColor: 'var(--av-danger-bg)',
            border: '1px solid var(--av-danger-border)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991B1B', fontWeight: 700, fontSize: '0.875rem', marginBottom: '4px' }}>
            <AlertTriangle size={16} />
            <span>Primary Identified Bottleneck</span>
          </div>
          <div style={{ fontSize: '0.9375rem', color: '#7F1D1D', fontWeight: 600 }}>
            {result.primaryBottleneck}
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#991B1B', marginTop: '6px' }}>
            <strong>Recommended Intervention:</strong> {result.recommendedFocus}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a
            href={getAssessmentScoreWhatsAppUrl(result.overallScore, result.primaryBottleneck)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-orange btn-lg"
            style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <MessageSquare size={18} color="#FFFFFF" />
            <span>WhatsApp Score to Avencis Team ({result.overallScore}/100)</span>
          </a>
          <button
            onClick={() => {
              onClose();
              onBookConsultation();
            }}
            className="btn btn-secondary btn-lg"
            style={{ width: '100%' }}
          >
            <PhoneCall size={18} />
            <span>Schedule 1-on-1 Review with Avencis Partner</span>
          </button>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ width: '100%', opacity: 0.8 }}
          >
            <span>Close & Return to Website</span>
          </button>
        </div>
      </div>
    </div>
  );
};
