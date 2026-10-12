import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Approved Public Page Routes
import { HomePage } from './pages/HomePage';
import { WhatWeDoPage } from './pages/WhatWeDoPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { DiagnosticPage } from './pages/DiagnosticPage';
import { FounderDependencyPage } from './pages/FounderDependencyPage';
import { WhyAvencisPage } from './pages/WhyAvencisPage';
import { InsightsPage } from './pages/InsightsPage';
import { BookAssessmentPage } from './pages/BookAssessmentPage';
import { BookConsultationPage } from './pages/BookConsultationPage';

// Admin & CMS Studio Implementation
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { LeadManagement } from './admin/LeadManagement';
import { DirectoryManagement } from './admin/DirectoryManagement';
import { AssessmentManagement } from './admin/AssessmentManagement';
import { ConsultationManagement } from './admin/ConsultationManagement';
import { LeadMagnetManagement } from './admin/LeadMagnetManagement';
import { UserManagement } from './admin/UserManagement';

import { CmsDashboard } from './admin/cms/CmsDashboard';
import { CmsPageList } from './admin/cms/CmsPageList';
import { CmsPageEditor } from './admin/cms/CmsPageEditor';
import { CmsCaseStudies } from './admin/cms/CmsCaseStudies';
import { CmsInsights } from './admin/cms/CmsInsights';
import { CmsMediaLibrary } from './admin/cms/CmsMediaLibrary';

// Public layout wrapper maintaining the approved Avencis header and footer
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin Management System & CMS Studio Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<LeadManagement />} />
          <Route path="directory" element={<DirectoryManagement />} />
          <Route path="assessments" element={<AssessmentManagement />} />
          <Route path="consultations" element={<ConsultationManagement />} />
          <Route path="lead-magnets" element={<LeadMagnetManagement />} />
          <Route path="users" element={<UserManagement />} />

          {/* CMS Studio Subroutes */}
          <Route path="cms" element={<CmsDashboard />} />
          <Route path="cms/pages" element={<CmsPageList />} />
          <Route path="cms/pages/:id" element={<CmsPageEditor />} />
          <Route path="cms/case-studies" element={<CmsCaseStudies />} />
          <Route path="cms/insights" element={<CmsInsights />} />
          <Route path="cms/media" element={<CmsMediaLibrary />} />
        </Route>

        {/* Public Website Routes (Wrapped with Global Header & Footer) */}
        <Route element={<PublicLayout />}>
          {/* 1. Home Page — Founder's Day */}
          <Route path="/" element={<HomePage />} />

          {/* 2. What We Do */}
          <Route path="/what-we-do" element={<WhatWeDoPage />} />

          {/* 3. Methodology */}
          <Route path="/methodology" element={<MethodologyPage />} />

          {/* 4. Client Case Studies */}
          <Route path="/case-studies" element={<CaseStudiesPage />} />

          {/* 5. Diagnostics */}
          <Route path="/diagnostics" element={<DiagnosticPage />} />
          <Route path="/diagnostic" element={<DiagnosticPage />} />

          {/* 6. Dependency Index */}
          <Route path="/dependency-index" element={<FounderDependencyPage />} />
          <Route path="/founder-dependency" element={<FounderDependencyPage />} />

          {/* 7. Why Avencis */}
          <Route path="/why-avencis" element={<WhyAvencisPage />} />

          {/* 8. Insights */}
          <Route path="/insights" element={<InsightsPage />} />

          {/* 9. Book Assessment & Consultation */}
          <Route path="/book-assessment" element={<BookAssessmentPage />} />
          <Route path="/book-consultation" element={<BookConsultationPage />} />

          {/* Fallback to Home */}
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
