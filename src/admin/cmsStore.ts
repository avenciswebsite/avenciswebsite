import type { CmsPageContent, CmsArticle, CmsCaseStudyItem, MediaAsset } from './types';
import { APPROVED_CASE_STUDIES, INSIGHT_ARTICLES, SECTION_1_CONTENT, SECTION_4_CONTENT, SECTION_15_CONTENT } from '../data/siteData';

// Initial manageable pages discovering the actual public content architecture
const INITIAL_PAGES: CmsPageContent[] = [
  {
    id: 'page-home',
    slug: '/',
    title: "Founder's Day (Homepage)",
    category: 'Core Conversion',
    lastUpdated: '2026-10-12 18:30',
    status: 'Published',
    seoTitle: 'Avencis Growth Consulting | Build a Business That Runs Without You',
    seoDescription: 'Avencis partners with promoter-led mid-market enterprises (₹15 Cr to ₹150 Cr+) to transition from founder bottlenecking to self-governing business engines.',
    headline: SECTION_1_CONTENT.headline,
    subheadline: SECTION_1_CONTENT.positioningStatement,
    eyebrowBadge: SECTION_1_CONTENT.brandTagline,
    bodyIntro: SECTION_1_CONTENT.introLines,
    sectionsCount: 18,
  },
  {
    id: 'page-what-we-do',
    slug: '/what-we-do',
    title: 'What We Actually Do',
    category: 'Services & Operations',
    lastUpdated: '2026-10-12 19:45',
    status: 'Published',
    seoTitle: 'What We Do | Avencis Growth Consulting',
    seoDescription: "We don't just give you a strategy deck. We work alongside management to diagnose leaks, install KPIs, and build high-ownership Extended Management Teams.",
    headline: SECTION_4_CONTENT.headline,
    subheadline: SECTION_4_CONTENT.subheadline,
    eyebrowBadge: SECTION_4_CONTENT.badge,
    bodyIntro: SECTION_4_CONTENT.alongsideIntro,
    sectionsCount: 6,
  },
  {
    id: 'page-methodology',
    slug: '/methodology',
    title: 'The 4-Step Methodology',
    category: 'Framework & Process',
    lastUpdated: '2026-10-11 14:20',
    status: 'Published',
    seoTitle: 'Methodology & 90-Day Execution Cycles | Avencis',
    seoDescription: 'Our 4-step governance model: Deep Diagnostic, Strategic Realignment, Execution Cadence, and Sustainable Handover.',
    headline: 'Strategy Is Cheap. Disciplined Execution Is Rare.',
    subheadline: 'How we transition companies in 90-day sprints without disrupting daily operations.',
    eyebrowBadge: 'THE AVENCIS METHODOLOGY',
    bodyIntro: 'We embed with your leadership team using rigorous weekly operating rhythms and measurable margin milestones.',
    sectionsCount: 5,
  },
  {
    id: 'page-case-studies',
    slug: '/case-studies',
    title: 'Client Case Studies',
    category: 'Social Proof & Proof of Work',
    lastUpdated: '2026-10-11 16:50',
    status: 'Published',
    seoTitle: 'Mid-Market Transformation Case Studies | Avencis',
    seoDescription: 'Real transformations across auto-components, specialty chemicals, and capital goods. See our proven operational turnarounds.',
    headline: 'Proven Operational Transformations Across India',
    subheadline: 'Real turnarounds in promoter-led mid-market enterprises from ₹20 Cr to ₹120 Cr.',
    eyebrowBadge: 'TRACK RECORD & EVIDENCE',
    bodyIntro: 'Explore how structured management systems and EMT governance unlocked sustainable EBITDA growth and founder freedom.',
    sectionsCount: 4,
  },
  {
    id: 'page-diagnostics',
    slug: '/diagnostics',
    title: 'The Business Scale Assessment',
    category: 'Conversion & Diagnostics',
    lastUpdated: '2026-10-12 20:10',
    status: 'Published',
    seoTitle: 'Avencis Business Scale Assessment™ | Calculate Your Autonomy Score',
    seoDescription: 'Find out what is actually stopping your business from scaling across 10 operational functions and receive an immediate diagnostic score.',
    headline: 'Before You Hire Us, Find Out What Your Business Actually Needs.',
    subheadline: 'Take the Free Avencis Business Growth & Scale Assessment (15–20 minutes).',
    eyebrowBadge: 'DIAGNOSTICS & EVALUATION',
    bodyIntro: 'A holistic analysis covering the 10 operational dimensions of founder-led mid-market enterprises.',
    sectionsCount: 5,
  },
  {
    id: 'page-dependency-index',
    slug: '/dependency-index',
    title: 'Founder Dependency Index',
    category: 'Diagnostics & Assessment',
    lastUpdated: '2026-10-12 21:05',
    status: 'Published',
    seoTitle: 'Founder Dependency Index & Growth Stages | Avencis',
    seoDescription: 'If you disappear for 7 days, does your business keep moving? Diagnose your bottleneck risk and growth stage.',
    headline: "If You Disappear for 7 Days, Does Your Business Keep Moving?",
    subheadline: "The question isn't how big your business is. It's how dependent your business is on you.",
    eyebrowBadge: 'THE FOUNDER DEPENDENCY INDEX',
    bodyIntro: 'Every founder-led enterprise progresses through 5 identifiable growth phases. Pinpoint yours.',
    sectionsCount: 5,
  },
  {
    id: 'page-why-avencis',
    slug: '/why-avencis',
    title: 'Why Avencis',
    category: 'Brand Differentiation',
    lastUpdated: '2026-10-12 17:15',
    status: 'Published',
    seoTitle: 'Why Avencis | Operators, Not Theorists',
    seoDescription: "We are not here to give you a 60-page strategy deck. We install execution cadences, clear KPIs, and build in-house capability.",
    headline: SECTION_15_CONTENT.headline,
    subheadline: SECTION_15_CONTENT.independenceHeadline,
    eyebrowBadge: SECTION_15_CONTENT.badge,
    bodyIntro: SECTION_15_CONTENT.preferenceIntro,
    sectionsCount: 4,
  },
  {
    id: 'page-insights',
    slug: '/insights',
    title: 'Strategic Insights & Briefings',
    category: 'Thought Leadership',
    lastUpdated: '2026-10-10 11:30',
    status: 'Published',
    seoTitle: 'Strategic Insights for Promoters | Avencis Briefings',
    seoDescription: 'No-fluff executive briefings read by 1,200+ mid-market promoters on EBITDA defense, working capital, and delegation.',
    headline: 'Strategic Briefings for Ambitious Promoters',
    subheadline: 'Practical playbooks and candid reflections on scaling mid-market enterprises in India.',
    eyebrowBadge: 'AVENCIS PERSPECTIVES',
    bodyIntro: 'Field notes and operational frameworks from over 40+ promoter engagements.',
    sectionsCount: 3,
  },
  {
    id: 'page-book-assessment',
    slug: '/book-assessment',
    title: 'Book Assessment & Consultation',
    category: 'Lead Capture',
    lastUpdated: '2026-10-09 15:00',
    status: 'Published',
    seoTitle: 'Schedule a Diagnostic Session with a Senior Partner | Avencis',
    seoDescription: 'Request a confidential 45-minute working session with an Avencis Senior Partner to evaluate EBITDA leaks and founder bandwidth.',
    headline: "You Don't Need to Fix Everything. You Need to Know What to Fix First.",
    subheadline: 'Schedule a 1-on-1 Diagnostic Session with an Avencis Senior Partner.',
    eyebrowBadge: 'CONFIDENTIAL FOUNDER DISCOVERY',
    bodyIntro: 'Strictly confidential working session with zero obligation.',
    sectionsCount: 3,
  },
];

// Map approved case studies from siteData
const INITIAL_CASE_STUDIES: CmsCaseStudyItem[] = APPROVED_CASE_STUDIES.map((cs) => ({
  id: cs.id,
  number: cs.number,
  title: cs.title,
  sector: cs.title.includes('Tier-1') ? 'Automotive & Precision Eng' : cs.title.includes('Chemical') ? 'Specialty Chemicals' : 'Industrial Goods',
  revenueBracket: '₹25 Cr – ₹85 Cr',
  challenge: cs.context.join(' '),
  interventionTitle: cs.interventionTitle,
  interventionSummary: cs.interventionItems.join(' '),
  resultHighlight: cs.resultHighlight,
  resultParagraph: cs.resultParagraph,
  status: 'Published',
  whatsappKeyword: cs.whatsappKeyword,
}));

// Map approved insight articles from siteData
const INITIAL_ARTICLES: CmsArticle[] = INSIGHT_ARTICLES.map((art) => ({
  id: art.id,
  title: art.title,
  slug: art.id,
  category: art.category,
  readTime: art.readTime,
  summary: art.summary,
  content: `Full executive brief on ${art.title}.\n\nKey takeaways for promoter-led enterprises navigating ₹20 Cr to ₹100 Cr scale thresholds.\n\n1. Establish weekly operational rhythms.\n2. Standardize Tier-1 delegated approval rights.\n3. Align margin-linked incentives across departments.`,
  publishDate: art.date,
  author: 'Avencis Partner Group',
  status: 'Published',
  seoKeywords: `${art.category}, promoter scale, EBITDA, governance`,
}));

// Verified assets in /public/assets
const INITIAL_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'media-01',
    name: 'Avencis Primary Name Logo',
    filename: 'avencis-name-logo.png',
    path: '/assets/avencis-name-logo.png',
    dimensions: '420 x 120 px',
    sizeKb: 13.1,
    mimeType: 'image/png',
    altText: 'Avencis Growth Consulting Official Logo',
    usedIn: ['Global Header', 'Footer', 'Mobile Drawer'],
  },
  {
    id: 'media-02',
    name: 'Avencis Brand Mark',
    filename: 'avencis-logo.png',
    path: '/assets/avencis-logo.png',
    dimensions: '250 x 250 px',
    sizeKb: 80.5,
    mimeType: 'image/png',
    altText: 'Avencis Hexagonal Geometric Brand Icon',
    usedIn: ['Navigation fallback', 'Favicon'],
  },
  {
    id: 'media-03',
    name: 'Founder Morning Stress',
    filename: 'founder-stressed.jpg',
    path: '/assets/founder-stressed.jpg',
    dimensions: '1200 x 800 px',
    sizeKb: 730.7,
    mimeType: 'image/jpeg',
    altText: 'Overwhelmed promoter at 9:30 AM reviewing mounting escalations without systems',
    usedIn: ["Founder's Day (09:30 AM Without Avencis)"],
  },
  {
    id: 'media-04',
    name: 'Founder Morning Clarity',
    filename: 'founder-calm.jpg',
    path: '/assets/founder-calm.jpg',
    dimensions: '1200 x 800 px',
    sizeKb: 631.5,
    mimeType: 'image/jpeg',
    altText: 'Promoter reviewing plant flash report with calm confidence at 9:30 AM',
    usedIn: ["Founder's Day (09:30 AM With Avencis)"],
  },
  {
    id: 'media-05',
    name: '12:30 PM Dispute Without Avencis',
    filename: '1230 PM — WITHOUT AVENCIS.png',
    path: '/assets/1230 PM — WITHOUT AVENCIS.png',
    dimensions: '1280 x 720 px',
    sizeKb: 2055.6,
    mimeType: 'image/png',
    altText: 'Founder mediating dispute between sales and factory floor leads',
    usedIn: ["Founder's Day (12:30 PM Without Avencis)"],
  },
  {
    id: 'media-06',
    name: '12:30 PM Autonomous EMT',
    filename: '1230 PM — WITH AVENCIS.png',
    path: '/assets/1230 PM — WITH AVENCIS.png',
    dimensions: '1280 x 720 px',
    sizeKb: 1996.6,
    mimeType: 'image/png',
    altText: 'Extended management team running weekly operational cadence meeting autonomously',
    usedIn: ["Founder's Day (12:30 PM With Avencis)"],
  },
  {
    id: 'media-07',
    name: '3:00 PM Receivables Chase',
    filename: '1500 PM — WITHOUT AVENCIS.png',
    path: '/assets/1500 PM — WITHOUT AVENCIS.png',
    dimensions: '1280 x 720 px',
    sizeKb: 2084.5,
    mimeType: 'image/png',
    altText: 'Founder checking overdue receivables spreadsheets with stress',
    usedIn: ["Founder's Day (03:00 PM Without Avencis)"],
  },
  {
    id: 'media-08',
    name: '3:00 PM Predictable Financials',
    filename: '1500 PM — WITH AVENCIS.png',
    path: '/assets/1500 PM — WITH AVENCIS.png',
    dimensions: '1280 x 720 px',
    sizeKb: 2064.2,
    mimeType: 'image/png',
    altText: 'Real-time financial dashboard showing 13-week cash buffer and optimal DSO',
    usedIn: ["Founder's Day (03:00 PM With Avencis)"],
  },
  {
    id: 'media-09',
    name: '5:30 PM Urgent Firefighting',
    filename: '1730 PM — WITHOUT AVENCIS.png',
    path: '/assets/1730 PM — WITHOUT AVENCIS.png',
    dimensions: '1280 x 720 px',
    sizeKb: 1889.8,
    mimeType: 'image/png',
    altText: 'Promoter staying back in dark factory floor troubleshooting delivery delays',
    usedIn: ["Founder's Day (05:30 PM Without Avencis)"],
  },
  {
    id: 'media-10',
    name: '5:30 PM Strategic Growth Review',
    filename: '1730 PM — WITH AVENCIS.png',
    path: '/assets/1730 PM — WITH AVENCIS.png',
    dimensions: '1280 x 720 px',
    sizeKb: 1918.3,
    mimeType: 'image/png',
    altText: 'Founder in strategic expansion board session leaving office with ease',
    usedIn: ["Founder's Day (05:30 PM With Avencis)"],
  },
  {
    id: 'media-11',
    name: '7:00 PM Exhaustion at Home',
    filename: '1900 PM — WITHOUT AVENCIS.png',
    path: '/assets/1900 PM — WITHOUT AVENCIS.png',
    dimensions: '1280 x 720 px',
    sizeKb: 1864.9,
    mimeType: 'image/png',
    altText: 'Exhausted promoter glued to smartphone answering late-night factory escalations',
    usedIn: ["Founder's Day (07:00 PM Without Avencis)"],
  },
  {
    id: 'media-12',
    name: '7:00 PM Peaceful Evening',
    filename: '1900 PM — WITH AVENCIS.png',
    path: '/assets/1900 PM — WITH AVENCIS.png',
    dimensions: '1280 x 720 px',
    sizeKb: 1941.4,
    mimeType: 'image/png',
    altText: 'Founder enjoying peaceful family evening with phone put away',
    usedIn: ["Founder's Day (07:00 PM With Avencis)"],
  },
  {
    id: 'media-13',
    name: 'Autonomous Leadership Team',
    filename: 'founder-team.jpg',
    path: '/assets/founder-team.jpg',
    dimensions: '1200 x 800 px',
    sizeKb: 753.4,
    mimeType: 'image/jpeg',
    altText: 'Aligned Extended Management Team collaborating around dashboard',
    usedIn: ['Methodology Page', 'Extended Management Team Section'],
  },
  {
    id: 'media-14',
    name: 'Final Consultation CTA Visual',
    filename: 'Final CTA Image.png',
    path: '/assets/Final CTA Image.png',
    dimensions: '1200 x 800 px',
    sizeKb: 1891.1,
    mimeType: 'image/png',
    altText: 'Senior partner consulting mid-market promoters in executive conference room',
    usedIn: ['Book Assessment Page', 'Final CTA Section'],
  },
];

let pages = [...INITIAL_PAGES];
let caseStudies = [...INITIAL_CASE_STUDIES];
let articles = [...INITIAL_ARTICLES];
let mediaAssets = [...INITIAL_MEDIA_ASSETS];

export const CmsStore = {
  // Page Management
  getPages: (): CmsPageContent[] => [...pages],
  getPageById: (id: string): CmsPageContent | undefined => pages.find((p) => p.id === id),
  updatePage: (id: string, updates: Partial<CmsPageContent>): boolean => {
    const idx = pages.findIndex((p) => p.id === id);
    if (idx !== -1) {
      pages[idx] = {
        ...pages[idx],
        ...updates,
        lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16),
      };
      return true;
    }
    return false;
  },

  // Case Studies
  getCaseStudies: (): CmsCaseStudyItem[] => [...caseStudies],
  getCaseStudyById: (id: string): CmsCaseStudyItem | undefined => caseStudies.find((c) => c.id === id),
  updateCaseStudy: (id: string, updates: Partial<CmsCaseStudyItem>): boolean => {
    const idx = caseStudies.findIndex((c) => c.id === id);
    if (idx !== -1) {
      caseStudies[idx] = { ...caseStudies[idx], ...updates };
      return true;
    }
    return false;
  },
  addCaseStudy: (item: Omit<CmsCaseStudyItem, 'id'>): CmsCaseStudyItem => {
    const newItem: CmsCaseStudyItem = {
      ...item,
      id: `cs-custom-${Date.now()}`,
    };
    caseStudies.unshift(newItem);
    return newItem;
  },

  // Articles & Insights
  getArticles: (): CmsArticle[] => [...articles],
  getArticleById: (id: string): CmsArticle | undefined => articles.find((a) => a.id === id),
  updateArticle: (id: string, updates: Partial<CmsArticle>): boolean => {
    const idx = articles.findIndex((a) => a.id === id);
    if (idx !== -1) {
      articles[idx] = { ...articles[idx], ...updates };
      return true;
    }
    return false;
  },
  addArticle: (item: Omit<CmsArticle, 'id'>): CmsArticle => {
    const newItem: CmsArticle = {
      ...item,
      id: `art-custom-${Date.now()}`,
    };
    articles.unshift(newItem);
    return newItem;
  },

  // Media Assets
  getMediaAssets: (): MediaAsset[] => [...mediaAssets],
  updateMediaAlt: (id: string, altText: string): boolean => {
    const item = mediaAssets.find((m) => m.id === id);
    if (item) {
      item.altText = altText;
      return true;
    }
    return false;
  },

  // Summary Metrics
  getCmsSummary: () => {
    return {
      totalPages: pages.length,
      publishedPages: pages.filter((p) => p.status === 'Published').length,
      draftPages: pages.filter((p) => p.status === 'Draft').length,
      totalCaseStudies: caseStudies.length,
      totalArticles: articles.length,
      totalMediaAssets: mediaAssets.length,
    };
  },
};
