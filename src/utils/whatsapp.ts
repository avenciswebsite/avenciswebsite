// Utility helper for WhatsApp Lead Tracking and attribution CTAs
// In the approved document:
// WhatsApp: [NUMBER]
// Keywords: ASSESSMENT, GROW, MANUFACTURING, SCALE, SALES, MARKETING, SYSTEM, FOUNDER, GROWTH, AVENCIS, SCORE

export const WHATSAPP_KEYWORDS = {
  HOME: 'GROW',
  ASSESSMENT: 'ASSESSMENT',
  MANUFACTURING: 'MANUFACTURING',
  AFFILIATE: 'SCALE',
  INDUSTRIAL_SALES: 'SALES',
  INTERIOR_MARKETING: 'MARKETING',
  MANAGEMENT_SYSTEMS: 'SYSTEM',
  FOUNDER_DEPENDENCY: 'FOUNDER',
  GROWTH_PLANNING: 'GROWTH',
  GENERAL_ENQUIRY: 'AVENCIS',
  ASSESSMENT_SCORE: 'SCORE'
} as const;

export type WhatsAppKeyword = typeof WHATSAPP_KEYWORDS[keyof typeof WHATSAPP_KEYWORDS] | string;

export const WHATSAPP_PHONE_DISPLAY = '[NUMBER]';
export const AVENCIS_EMAIL_DISPLAY = '[EMAIL]';

/**
 * Creates the official WhatsApp click-to-chat URL carrying the attribution keyword or prefilled message
 */
export const getWhatsAppUrl = (messageOrKeyword: WhatsAppKeyword): string => {
  const encodedText = encodeURIComponent(messageOrKeyword);
  return `https://wa.me/?text=${encodedText}`;
};

/**
 * Constructs prefilled WhatsApp message for Founder Dependency (Option A, B, or C)
 */
export const getFounderDependencyWhatsAppUrl = (
  option?: { label: string; title: string; explanation: string } | null
): string => {
  if (option) {
    const text = `Hi Avencis, I was evaluating Founder Dependency on your website. When asked what happens if I am unavailable for 1 week, my response is: Option ${option.label} "${option.title}" (${option.explanation}). I would like to discuss our business operating systems.`;
    return getWhatsAppUrl(text);
  }
  return getWhatsAppUrl(`Hi Avencis, I would like to enquire about reducing Founder Dependency and scaling our business operations. (Keyword: ${WHATSAPP_KEYWORDS.FOUNDER_DEPENDENCY})`);
};

/**
 * Constructs prefilled WhatsApp message for Growth Stage selection (Stage 1 to 5)
 */
export const getGrowthStageWhatsAppUrl = (
  stage?: { stage: number; title: string; stageLabel?: string } | null
): string => {
  if (stage) {
    const text = `Hi Avencis, I was reviewing the Growth Stages on your website. My business is currently at Stage ${stage.stage}: "${stage.title}". I would like to discuss building systems to transition to the next scale level. (Keyword: ${WHATSAPP_KEYWORDS.GROWTH_PLANNING})`;
    return getWhatsAppUrl(text);
  }
  return getWhatsAppUrl(`Hi Avencis, I would like to discuss business growth stages and building scalable operating systems. (Keyword: ${WHATSAPP_KEYWORDS.GROWTH_PLANNING})`);
};

/**
 * Constructs prefilled WhatsApp message for Assessment Score results
 */
export const getAssessmentScoreWhatsAppUrl = (
  score?: number | string | null,
  bottleneck?: string | null
): string => {
  if (score !== undefined && score !== null) {
    const bottleneckNote = bottleneck ? ` (Identified Bottleneck: ${bottleneck})` : '';
    const text = `Hi Avencis, I completed the Business Scale Assessment on your website. My score is ${score}/100${bottleneckNote}. I would like to discuss our diagnostic findings and growth roadmap. (Keyword: ${WHATSAPP_KEYWORDS.ASSESSMENT_SCORE})`;
    return getWhatsAppUrl(text);
  }
  return getWhatsAppUrl(`Hi Avencis, I would like to discuss the Business Scale Assessment and our growth roadmap. (Keyword: ${WHATSAPP_KEYWORDS.ASSESSMENT_SCORE})`);
};

/**
 * Constructs prefilled WhatsApp message for Case Study enquiries
 */
export const getCaseStudyWhatsAppUrl = (
  caseStudyTitle: string,
  keyword: string
): string => {
  const text = `Hi Avencis, I was reviewing the Case Study on "${caseStudyTitle}" on your website and would like to understand how similar systems apply to our business. (Keyword: ${keyword})`;
  return getWhatsAppUrl(text);
};

