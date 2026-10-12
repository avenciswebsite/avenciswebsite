export type TimeOfDay = '9:30am' | '12:30pm' | '3:00pm' | '5:00pm' | '7:00pm';

export interface TimelineStory {
  time: string;
  timeLabel: string;
  theme: string;
  withoutAvencis: {
    title: string;
    subtitle: string;
    quote: string;
    description: string;
    image: string;
    founderMood: string;
    checklist: string[];
    notifications: Array<{
      type: 'whatsapp' | 'email' | 'phone';
      sender: string;
      appIcon?: string;
      time: string;
      title: string;
      body: string;
      badge?: string;
    }>;
    bottleneck: string;
    timeSpentInFirefighting: string;
    dependencyRisk: string;
  };
  withAvencis: {
    title: string;
    subtitle: string;
    quote: string;
    description: string;
    image: string;
    founderMood: string;
    outcomes: string[];
    systemHighlights: Array<{
      label: string;
      value: string;
      status: 'active' | 'optimal' | 'scaled';
      metric: string;
    }>;
    strategicFocus: string;
    timeOnStrategy: string;
    enterpriseReadiness: string;
  };
}

export interface FreezeComparisonRow {
  without: string;
  with: string;
}

export interface BusinessEngine {
  id: string;
  number: string;
  title: string;
  tagline: string;
  symptom: string;
  transformation: string;
  deliverables: string[];
  metricImpact: string;
}

export interface CaseStudy {
  id: string;
  clientSector: string;
  revenueBracket: string;
  challenge: string;
  intervention: string;
  results: {
    ebitda: string;
    revenue: string;
    bandwidth: string;
    workingCapital?: string;
  };
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
}

export interface DependencyStage {
  level: number;
  name: string;
  subtitle: string;
  revenueRange: string;
  keySymptom: string;
  founderInvolvement: string;
  riskScore: number;
  avencisIntervention: string;
}

export interface BusinessGrowthStage {
  stage: string;
  threshold: string;
  theTrap: string;
  whatBreaks: string;
  avencisFix: string;
  targetOutcome: string;
}

export interface AssessmentQuestion {
  id: number;
  category: string;
  engineId: string;
  question: string;
  options: {
    text: string;
    score: number; // 1 to 4
    diagnosis: string;
  }[];
}

export interface DiagnosticResult {
  overallScore: number;
  dependencyLevel: string;
  engineScores: Record<string, number>;
  primaryBottleneck: string;
  recommendedFocus: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  date: string;
}

// Approved Content Types from Avencis Website content (2).md
export interface ApprovedBusinessEngine {
  number: string;
  title: string;
  subheading: string;
  bullets: string[];
  goal: string;
}

export interface ServicePillar {
  pillar: string;
  whatYouDo: string;
}

export interface MethodologyStep {
  step: string;
  title: string;
  intro: string;
  items?: string[];
  bullets?: string[];
  conclusion?: string;
}

export interface ApprovedCaseStudy {
  id: string;
  number: string;
  title: string;
  context: string[];
  interventionTitle: string;
  interventionItems: string[];
  resultHighlight: string;
  resultParagraph: string;
  whatsappKeyword: string;
}

export interface AssessmentCategoryScore {
  area: string;
  score: number;
}

export interface AssessmentOpportunity {
  number: string;
  title: string;
  description: string;
}

export interface ApprovedGrowthStage {
  stage: number;
  stageLabel: string;
  title: string;
  points: string[];
}

export interface TargetAudienceSector {
  title: string;
  description: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  date: string;
}
