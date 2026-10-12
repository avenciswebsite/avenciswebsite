export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Archived';
export type LeadSource = 'Consultation Form' | 'Diagnostic Assessment' | 'WhatsApp Inquiry' | 'Lead Magnet' | 'Newsletter' | 'Business Directory';

export interface LeadRecord {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  source: LeadSource;
  revenueBracket?: string;
  primaryChallenge?: string;
  status: LeadStatus;
  createdAt: string;
  notes: string[];
  linkedAssessmentId?: string;
  linkedDirectoryId?: string;
}

export type DirectoryStatus = 'Pending' | 'Approved' | 'Rejected';

export interface DirectoryRecord {
  id: string;
  businessName: string;
  promoterName: string;
  category: string;
  city: string;
  state: string;
  annualTurnover: string;
  employeeCount: string;
  email: string;
  phone: string;
  website?: string;
  description: string;
  status: DirectoryStatus;
  isPublished: boolean;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface AssessmentSubmissionRecord {
  id: string;
  leadName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  overallScore: number;
  dependencyLevel: 'High' | 'Moderate' | 'Low';
  primaryBottleneck: string;
  recommendedFocus: string;
  answers: Array<{
    questionId: number;
    category: string;
    questionText: string;
    selectedOptionText: string;
    score: number;
  }>;
  submittedAt: string;
  whatsappShared: boolean;
  status: 'New' | 'Reviewed' | 'Consultation Scheduled';
}

export interface ConsultationRecord {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  revenueBracket: string;
  primaryChallenge: string;
  status: 'Pending Contact' | 'Discovery Scheduled' | 'Completed' | 'Cancelled';
  submittedAt: string;
  notes: string[];
}

export interface LeadMagnetSubmissionRecord {
  id: string;
  leadMagnetName: string;
  landingPage: string;
  email: string;
  fullName?: string;
  companyName?: string;
  deliveryStatus: 'Delivered' | 'Pending Delivery' | 'Link Clicked';
  submittedAt: string;
  followUpStatus: 'Uncontacted' | 'Email Sent' | 'Followed Up';
}

export type AdminRole = 'Super Admin' | 'Content Manager' | 'Lead / Assessment Manager';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export type CmsPublishStatus = 'Published' | 'Draft' | 'Archived';

export interface CmsPageContent {
  id: string;
  slug: string;
  title: string;
  category: string;
  lastUpdated: string;
  status: CmsPublishStatus;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  subheadline: string;
  eyebrowBadge: string;
  bodyIntro: string;
  sectionsCount: number;
}

export interface CmsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
  publishDate: string;
  author: string;
  status: CmsPublishStatus;
  seoKeywords: string;
}

export interface CmsCaseStudyItem {
  id: string;
  number: string;
  title: string;
  sector: string;
  revenueBracket: string;
  challenge: string;
  interventionTitle: string;
  interventionSummary: string;
  resultHighlight: string;
  resultParagraph: string;
  status: CmsPublishStatus;
  whatsappKeyword: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  filename: string;
  path: string;
  dimensions: string;
  sizeKb: number;
  mimeType: string;
  altText: string;
  usedIn: string[];
}
