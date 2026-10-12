import type {
  LeadRecord,
  DirectoryRecord,
  AssessmentSubmissionRecord,
  ConsultationRecord,
  LeadMagnetSubmissionRecord,
  AdminUser,
} from './types';

// Demonstration data store with clearly demarcated sample records
// Note: This in-memory store acts as the data-access abstraction layer
// until persistent backend endpoints and database schemas are provisioned.

const INITIAL_LEADS: LeadRecord[] = [
  {
    id: 'LEAD-101',
    fullName: 'Rajesh Singhania',
    companyName: 'Singhania Precision Castings Pvt Ltd',
    email: 'rajesh@singhaniacastings.com',
    phone: '+91 98201 44521',
    source: 'Consultation Form',
    revenueBracket: '₹50 Cr – ₹150 Cr',
    primaryChallenge: 'Founder Operational Bottleneck & Firefighting',
    status: 'New',
    createdAt: '2026-10-12 14:32',
    notes: ['Inquired via Book Consultation form. Promoter wants to delegate Tier-1 approvals.'],
  },
  {
    id: 'LEAD-102',
    fullName: 'Vikram Mehta',
    companyName: 'AeroTech Fasteners LLP',
    email: 'v.mehta@aerotechfasteners.in',
    phone: '+91 98110 32918',
    source: 'Diagnostic Assessment',
    revenueBracket: '₹15 Cr – ₹50 Cr',
    primaryChallenge: 'EBITDA Margin Leakage & Working Capital Stress',
    status: 'Contacted',
    createdAt: '2026-10-11 11:15',
    notes: ['Completed assessment with score 42/100. High bottleneck identified in cash collection.'],
    linkedAssessmentId: 'ASM-801',
  },
  {
    id: 'LEAD-103',
    fullName: 'Ananya Deshmukh',
    companyName: 'Sahyadri Pharma Solutions',
    email: 'ananya@sahyadripharma.com',
    phone: '+91 97654 81290',
    source: 'WhatsApp Inquiry',
    revenueBracket: '₹15 Cr – ₹50 Cr',
    primaryChallenge: 'EMT / 2nd-Tier Leadership Lacks Ownership',
    status: 'Qualified',
    createdAt: '2026-10-10 16:45',
    notes: ['WhatsApp deep link triggered with Stage 3 Dynamics context. Discovery call set for Thursday.'],
  },
  {
    id: 'LEAD-104',
    fullName: 'Sunil Kothari',
    companyName: 'Kothari Packaging Systems',
    email: 'sunil@kotharipack.com',
    phone: '+91 98450 19283',
    source: 'Lead Magnet',
    revenueBracket: '₹5 Cr – ₹15 Cr',
    primaryChallenge: 'Sales Growth Stagnation & Dependent on Founder',
    status: 'New',
    createdAt: '2026-10-09 09:20',
    notes: ['Downloaded 13-Week Cash Flow Predictor Blueprint. Email follow-up scheduled.'],
  },
  {
    id: 'LEAD-105',
    fullName: 'Dinesh Agarwal',
    companyName: 'Agarwal Heavy Fabricators',
    email: 'dinesh@agarwalfabrications.com',
    phone: '+91 93220 55102',
    source: 'Business Directory',
    revenueBracket: '₹50 Cr – ₹150 Cr',
    primaryChallenge: 'Founder Operational Bottleneck & Firefighting',
    status: 'Converted',
    createdAt: '2026-10-08 17:00',
    notes: ['Submitted directory profile and requested 45-min Senior Partner session. Engagement started.'],
    linkedDirectoryId: 'DIR-501',
  },
];

const INITIAL_DIRECTORY: DirectoryRecord[] = [
  {
    id: 'DIR-501',
    businessName: 'Agarwal Heavy Fabricators Pvt Ltd',
    promoterName: 'Dinesh Agarwal',
    category: 'Industrial & Capital Goods',
    city: 'Pune',
    state: 'Maharashtra',
    annualTurnover: '₹82 Crores',
    employeeCount: '160 employees',
    email: 'dinesh@agarwalfabrications.com',
    phone: '+91 93220 55102',
    website: 'https://agarwalfabrications.example.com',
    description: 'Tier-1 heavy structural fabrication supplying power plants, metro rail, and infrastructure contractors.',
    status: 'Approved',
    isPublished: true,
    createdAt: '2026-10-08 16:30',
    reviewedAt: '2026-10-09 10:00',
    reviewedBy: 'Super Admin',
  },
  {
    id: 'DIR-502',
    businessName: 'Zenith Fine Chemicals LLP',
    promoterName: 'Kunal Parikh',
    category: 'Specialty Chemicals & Pharma',
    city: 'Vadodara',
    state: 'Gujarat',
    annualTurnover: '₹45 Crores',
    employeeCount: '75 employees',
    email: 'kunal@zenithchem.example.com',
    phone: '+91 98250 81192',
    website: 'https://zenithchem.example.com',
    description: 'Manufacturer of customized active ingredients for domestic agrochemical and pigment industries.',
    status: 'Pending',
    isPublished: false,
    createdAt: '2026-10-11 15:20',
  },
  {
    id: 'DIR-503',
    businessName: 'Nova Component Mouldings',
    promoterName: 'Harish Varma',
    category: 'Precision Manufacturing',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    annualTurnover: '₹28 Crores',
    employeeCount: '90 employees',
    email: 'harish@novamouldings.example.com',
    phone: '+91 94430 77123',
    description: 'High-precision plastic injection moulding for automotive tier-1 sub-assemblies and appliances.',
    status: 'Pending',
    isPublished: false,
    createdAt: '2026-10-12 10:15',
  },
  {
    id: 'DIR-504',
    businessName: 'Apex Logistics Networks',
    promoterName: 'Manish Chawla',
    category: 'Supply Chain & Logistics',
    city: 'Gurugram',
    state: 'Haryana',
    annualTurnover: '₹110 Crores',
    employeeCount: '240 employees',
    email: 'manish@apexlogistics.example.com',
    phone: '+91 98100 23456',
    website: 'https://apexlogistics.example.com',
    description: 'Pan-India cold chain transportation and express distribution for high-value FMCG distributors.',
    status: 'Approved',
    isPublished: true,
    createdAt: '2026-10-05 11:00',
    reviewedAt: '2026-10-06 09:30',
    reviewedBy: 'Super Admin',
  },
  {
    id: 'DIR-505',
    businessName: 'QuickPrint Flyers',
    promoterName: 'Ramesh Sharma',
    category: 'General Retail',
    city: 'Delhi',
    state: 'Delhi',
    annualTurnover: '₹1.2 Crores',
    employeeCount: '8 employees',
    email: 'ramesh@quickprint.example.com',
    phone: '+91 98111 99999',
    description: 'Local retail printing shop for banners and personal visiting cards.',
    status: 'Rejected',
    isPublished: false,
    createdAt: '2026-10-07 14:00',
    reviewedAt: '2026-10-07 16:30',
    reviewedBy: 'Super Admin',
    rejectionReason: 'Outside Avencis target mid-market enterprise threshold (minimum ₹15 Cr annual turnover required).',
  },
];

const INITIAL_ASSESSMENTS: AssessmentSubmissionRecord[] = [
  {
    id: 'ASM-801',
    leadName: 'Vikram Mehta',
    companyName: 'AeroTech Fasteners LLP',
    email: 'v.mehta@aerotechfasteners.in',
    phone: '+91 98110 32918',
    overallScore: 42,
    dependencyLevel: 'High',
    primaryBottleneck: 'Severe Founder Sales & Cash Flow Bottleneck',
    recommendedFocus: 'Deploy 13-Week Cash Flow Predictor and build standard Sales Playbook.',
    answers: [
      {
        questionId: 1,
        category: 'Founder Bandwidth',
        questionText: 'If you were completely unavailable for 3 consecutive weeks without phone or email access, what would happen?',
        selectedOptionText: 'Billing, deliveries, and decisions would freeze; significant client escalations.',
        score: 1,
      },
      {
        questionId: 2,
        category: 'Sales & Revenue',
        questionText: 'How are new high-value client deals and renewals primarily originated and closed?',
        selectedOptionText: 'Sales team generates leads, but founder must step in to close and negotiate pricing.',
        score: 2,
      },
      {
        questionId: 3,
        category: 'Operations & Fulfilment',
        questionText: 'How are operational delays, quality defects, and customer delivery friction managed?',
        selectedOptionText: 'Managers handle small issues, but frequent escalations reach the founder.',
        score: 2,
      },
      {
        questionId: 4,
        category: 'Cash Flow & Financials',
        questionText: 'How predictable is your monthly cash flow, working capital cycle, and EBITDA margin?',
        selectedOptionText: 'High cash stress at month-end; high DSO (75+ days); frequent scramble for vendor payouts.',
        score: 1,
      },
      {
        questionId: 5,
        category: 'Leadership & EMT',
        questionText: 'How would you describe your 2nd-tier management team (HODs / Department Leads)?',
        selectedOptionText: 'Competent individually, but work in silos with frequent friction and finger-pointing.',
        score: 2,
      },
    ],
    submittedAt: '2026-10-11 11:15',
    whatsappShared: true,
    status: 'Reviewed',
  },
  {
    id: 'ASM-802',
    leadName: 'Suresh Nambiar',
    companyName: 'Nambiar Engineering Works',
    email: 'suresh@nambiarengineers.com',
    phone: '+91 98490 22441',
    overallScore: 68,
    dependencyLevel: 'Moderate',
    primaryBottleneck: 'Middle Management Escalation & Lack of Cross-Functional Cadence',
    recommendedFocus: 'Establish Weekly EMT SLA Operating Rhythms & Visual Performance Dashboards.',
    answers: [
      {
        questionId: 1,
        category: 'Founder Bandwidth',
        questionText: 'If you were completely unavailable for 3 consecutive weeks without phone or email access, what would happen?',
        selectedOptionText: 'Team handles 80% of operations; only major strategic decisions are delayed.',
        score: 3,
      },
      {
        questionId: 2,
        category: 'Sales & Revenue',
        questionText: 'How are new high-value client deals and renewals primarily originated and closed?',
        selectedOptionText: 'Sales leaders close 70%+ of deals using structured pricing playbooks.',
        score: 3,
      },
      {
        questionId: 3,
        category: 'Operations & Fulfilment',
        questionText: 'How are operational delays, quality defects, and customer delivery friction managed?',
        selectedOptionText: 'Clear SOPs and cross-functional SLAs resolve 90% of issues at the team level.',
        score: 3,
      },
      {
        questionId: 4,
        category: 'Cash Flow & Financials',
        questionText: 'How predictable is your monthly cash flow, working capital cycle, and EBITDA margin?',
        selectedOptionText: 'Profitable on paper, but cash is constantly blocked in receivables and slow inventory.',
        score: 2,
      },
      {
        questionId: 5,
        category: 'Leadership & EMT',
        questionText: 'How would you describe your 2nd-tier management team (HODs / Department Leads)?',
        selectedOptionText: 'Competent individually, but work in silos with frequent friction and finger-pointing.',
        score: 2,
      },
    ],
    submittedAt: '2026-10-12 09:40',
    whatsappShared: false,
    status: 'New',
  },
];

const INITIAL_CONSULTATIONS: ConsultationRecord[] = [
  {
    id: 'CON-301',
    fullName: 'Rajesh Singhania',
    companyName: 'Singhania Precision Castings Pvt Ltd',
    email: 'rajesh@singhaniacastings.com',
    phone: '+91 98201 44521',
    revenueBracket: '₹50 Cr – ₹150 Cr',
    primaryChallenge: 'Founder Operational Bottleneck & Firefighting',
    status: 'Discovery Scheduled',
    submittedAt: '2026-10-12 14:32',
    notes: ['Confirmed session for Oct 15th at 3:00 PM with Senior Partner.'],
  },
  {
    id: 'CON-302',
    fullName: 'Pooja Agarwal',
    companyName: 'Agarwal Consumer Products',
    email: 'pooja@agarwalcp.com',
    phone: '+91 98330 90123',
    revenueBracket: '₹15 Cr – ₹50 Cr',
    primaryChallenge: 'EBITDA Margin Leakage & Working Capital Stress',
    status: 'Pending Contact',
    submittedAt: '2026-10-12 16:10',
    notes: ['Pending initial WhatsApp / phone confirmation.'],
  },
];

const INITIAL_LEAD_MAGNETS: LeadMagnetSubmissionRecord[] = [
  {
    id: 'LM-201',
    leadMagnetName: '13-Week Cash Flow Predictor Blueprint',
    landingPage: '/insights#founder-briefing',
    email: 'sunil@kotharipack.com',
    fullName: 'Sunil Kothari',
    companyName: 'Kothari Packaging Systems',
    deliveryStatus: 'Delivered',
    submittedAt: '2026-10-09 09:20',
    followUpStatus: 'Uncontacted',
  },
  {
    id: 'LM-202',
    leadMagnetName: 'Monthly Founder Briefing Subscription',
    landingPage: '/insights',
    email: 'contact@varunmetals.com',
    deliveryStatus: 'Delivered',
    submittedAt: '2026-10-10 12:44',
    followUpStatus: 'Email Sent',
  },
  {
    id: 'LM-203',
    leadMagnetName: 'Founder Bandwidth Liberation Blueprint',
    landingPage: '/book-assessment',
    email: 'alok@shreejisteels.in',
    fullName: 'Alok Gupta',
    companyName: 'Shreeji Steels',
    deliveryStatus: 'Link Clicked',
    submittedAt: '2026-10-11 18:05',
    followUpStatus: 'Followed Up',
  },
];

const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'USR-01',
    name: 'Executive Partner',
    email: 'partner@avencis.in',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '2026-10-12 21:10',
  },
  {
    id: 'USR-02',
    name: 'Editorial Lead',
    email: 'content@avencis.in',
    role: 'Content Manager',
    status: 'Active',
    lastLogin: '2026-10-11 17:45',
  },
  {
    id: 'USR-03',
    name: 'Client Intake Lead',
    email: 'intake@avencis.in',
    role: 'Lead / Assessment Manager',
    status: 'Active',
    lastLogin: '2026-10-12 16:30',
  },
];

// In-Memory store state holding administrative records during user session
let leads = [...INITIAL_LEADS];
let directory = [...INITIAL_DIRECTORY];
let assessments = [...INITIAL_ASSESSMENTS];
let consultations = [...INITIAL_CONSULTATIONS];
let leadMagnets = [...INITIAL_LEAD_MAGNETS];
let users = [...INITIAL_ADMIN_USERS];

export const AdminStore = {
  // Leads API
  getLeads: (): LeadRecord[] => [...leads],
  getLeadById: (id: string): LeadRecord | undefined => leads.find((l) => l.id === id),
  updateLeadStatus: (id: string, status: LeadRecord['status']): boolean => {
    const item = leads.find((l) => l.id === id);
    if (item) {
      item.status = status;
      return true;
    }
    return false;
  },
  addLeadNote: (id: string, note: string): boolean => {
    const item = leads.find((l) => l.id === id);
    if (item) {
      item.notes.unshift(note);
      return true;
    }
    return false;
  },

  // Directory API
  getDirectory: (): DirectoryRecord[] => [...directory],
  getDirectoryById: (id: string): DirectoryRecord | undefined => directory.find((d) => d.id === id),
  updateDirectoryStatus: (id: string, status: DirectoryRecord['status'], reason?: string): boolean => {
    const item = directory.find((d) => d.id === id);
    if (item) {
      item.status = status;
      item.reviewedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);
      item.reviewedBy = 'Super Admin';
      if (status === 'Approved') {
        item.isPublished = true;
        item.rejectionReason = undefined;
      } else if (status === 'Rejected') {
        item.isPublished = false;
        item.rejectionReason = reason;
      }
      return true;
    }
    return false;
  },
  toggleDirectoryPublication: (id: string): boolean => {
    const item = directory.find((d) => d.id === id);
    if (item) {
      item.isPublished = !item.isPublished;
      return true;
    }
    return false;
  },

  // Assessment API
  getAssessments: (): AssessmentSubmissionRecord[] => [...assessments],
  getAssessmentById: (id: string): AssessmentSubmissionRecord | undefined => assessments.find((a) => a.id === id),
  updateAssessmentStatus: (id: string, status: AssessmentSubmissionRecord['status']): boolean => {
    const item = assessments.find((a) => a.id === id);
    if (item) {
      item.status = status;
      return true;
    }
    return false;
  },

  // Consultation API
  getConsultations: (): ConsultationRecord[] => [...consultations],
  updateConsultationStatus: (id: string, status: ConsultationRecord['status']): boolean => {
    const item = consultations.find((c) => c.id === id);
    if (item) {
      item.status = status;
      return true;
    }
    return false;
  },
  addConsultationNote: (id: string, note: string): boolean => {
    const item = consultations.find((c) => c.id === id);
    if (item) {
      item.notes.unshift(note);
      return true;
    }
    return false;
  },

  // Lead Magnets API
  getLeadMagnets: (): LeadMagnetSubmissionRecord[] => [...leadMagnets],
  updateLeadMagnetFollowUp: (id: string, followUp: LeadMagnetSubmissionRecord['followUpStatus']): boolean => {
    const item = leadMagnets.find((lm) => lm.id === id);
    if (item) {
      item.followUpStatus = followUp;
      return true;
    }
    return false;
  },

  // Users & RBAC API
  getUsers: (): AdminUser[] => [...users],

  // Metrics summary
  getMetricsSummary: () => {
    return {
      totalLeads: leads.length,
      newLeads: leads.filter((l) => l.status === 'New').length,
      totalAssessments: assessments.length,
      avgAssessmentScore: Math.round(
        assessments.reduce((acc, curr) => acc + curr.overallScore, 0) / (assessments.length || 1)
      ),
      totalDirectorySubmissions: directory.length,
      pendingDirectoryReviews: directory.filter((d) => d.status === 'Pending').length,
      totalConsultations: consultations.length,
      pendingConsultations: consultations.filter((c) => c.status === 'Pending Contact').length,
      totalLeadMagnets: leadMagnets.length,
    };
  },
};
