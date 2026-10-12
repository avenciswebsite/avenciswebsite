import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS } from '../data/siteData';
import type { DiagnosticResult } from '../types';
import { AssessmentResult } from './AssessmentResult';
import { ChevronRight, RotateCcw, Sparkles } from 'lucide-react';

interface AssessmentProps {
  onBookConsultation: () => void;
}

export const Assessment: React.FC<AssessmentProps> = ({ onBookConsultation }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [calculatedResult, setCalculatedResult] = useState<DiagnosticResult | null>(null);

  const question = ASSESSMENT_QUESTIONS[currentStep];

  const handleSelectOption = (optionScore: number) => {
    const updatedAnswers = { ...answers, [question.id]: optionScore };
    setAnswers(updatedAnswers);

    if (currentStep < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const totalPossible = ASSESSMENT_QUESTIONS.length * 4;
      const totalEarned = Object.values(updatedAnswers).reduce((a, b) => a + b, 0);
      const percentageScore = Math.round((totalEarned / totalPossible) * 100);

      let bottleneck = 'Operational Firefighting & Single-Point Approvals';
      let focus = 'Install Extended Management Team (EMT) and Tier-1 Approval RACI matrix.';

      if (percentageScore < 45) {
        bottleneck = 'Severe Founder Sales & Cash Flow Bottleneck';
        focus = 'Deploy 13-Week Cash Flow Predictor and build standard Sales Playbook.';
      } else if (percentageScore < 70) {
        bottleneck = 'Middle Management Escalation & Lack of Cross-Functional Cadence';
        focus = 'Establish Weekly EMT SLA Operating Rhythms & Visual Performance Dashboards.';
      } else {
        bottleneck = 'Enterprise Scaling & Board-Level Strategic Alignment';
        focus = 'Structure Strategic Business Reviews (SBR) and M&A Valuation Readiness.';
      }

      setCalculatedResult({
        overallScore: percentageScore,
        dependencyLevel: percentageScore < 50 ? 'High' : percentageScore < 75 ? 'Moderate' : 'Low',
        engineScores: {},
        primaryBottleneck: bottleneck,
        recommendedFocus: focus,
      });

      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setCalculatedResult(null);
  };

  return (
    <section className="section-padding" id="diagnostic-tool" style={{ backgroundColor: 'var(--av-deep-blue)', color: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px auto' }}>
          <div className="eyebrow-badge white">
            <Sparkles size={14} />
            <span>Interactive Diagnostic</span>
          </div>
          <h2 className="text-editorial-lg" style={{ color: '#FFFFFF', marginTop: '16px', marginBottom: '16px' }}>
            Calculate Your Founder Autonomy & Engine Health
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#CBD5E1' }}>
            Answer 5 quick strategic questions to pinpoint where your business is leaking value and determine
            your enterprise readiness score.
          </p>
        </div>

        {/* Diagnostic Card Container */}
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            padding: '40px 36px',
            backdropFilter: 'blur(12px)',
            boxShadow: 'var(--shadow-2xl)',
          }}
        >
          {/* Progress Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--av-accent-orange)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Question {currentStep + 1} of {ASSESSMENT_QUESTIONS.length} — {question.category}
            </span>
            <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>
              {Math.round(((currentStep + 1) / ASSESSMENT_QUESTIONS.length) * 100)}% Completed
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', marginBottom: '32px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${((currentStep + 1) / ASSESSMENT_QUESTIONS.length) * 100}%`,
                height: '100%',
                backgroundColor: 'var(--av-accent-orange)',
                transition: 'width 300ms ease',
              }}
            />
          </div>

          {/* Question Text */}
          <h3 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.625rem)', color: '#FFFFFF', marginBottom: '28px', lineHeight: '1.4', fontWeight: 600 }}>
            {question.question}
          </h3>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {question.options.map((option, idx) => {
              const isSelected = answers[question.id] === option.score;
              return (
                <button
                  key={idx}
                  type="button"
                  className={`assessment-option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(option.score)}
                >
                  <span>{option.text}</span>
                  <ChevronRight size={20} style={{ flexShrink: 0 }} />
                </button>
              );
            })}
          </div>

          {/* Navigation / Reset Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            {currentStep > 0 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                style={{ color: '#94A3B8', fontSize: '0.875rem', fontWeight: 600 }}
              >
                ← Previous Question
              </button>
            ) : <span />}

            <button
              onClick={handleReset}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.8125rem' }}
            >
              <RotateCcw size={14} />
              <span>Reset Diagnostic</span>
            </button>
          </div>
        </div>

        {/* Modal Results */}
        {showResult && calculatedResult && (
          <AssessmentResult
            result={calculatedResult}
            onClose={() => setShowResult(false)}
            onBookConsultation={onBookConsultation}
          />
        )}
      </div>
    </section>
  );
};
