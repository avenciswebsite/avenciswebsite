import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import './admin.css';
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  CalendarCheck,
  DownloadCloud,
  ShieldAlert,
  FileCode2,
  Layers,
  BookOpen,
  Image,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  Info,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCms = location.pathname.startsWith('/admin/cms');

  // Breadcrumbs calculation
  const getBreadcrumbs = () => {
    const parts = location.pathname.split('/').filter(Boolean);
    const crumbs = [{ label: 'Admin', path: '/admin' }];
    if (parts.length > 1) {
      if (parts[1] === 'cms') {
        crumbs.push({ label: 'CMS', path: '/admin/cms' });
        if (parts[2]) {
          const subMap: Record<string, string> = {
            pages: 'Page Content',
            'case-studies': 'Case Studies',
            insights: 'Insights & Articles',
            media: 'Media Library',
          };
          crumbs.push({ label: subMap[parts[2]] || parts[2], path: location.pathname });
        }
      } else {
        const subMap: Record<string, string> = {
          leads: 'Lead Management',
          directory: 'Business Directory',
          assessments: 'Diagnostic Assessments',
          consultations: 'Consultations',
          'lead-magnets': 'Lead Magnets',
          users: 'Users & Permissions',
        };
        crumbs.push({ label: subMap[parts[1]] || parts[1], path: location.pathname });
      }
    }
    return crumbs;
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
      isActive
        ? 'bg-[#E56A2E] text-white shadow-sm'
        : 'text-[#94A3B8] hover:text-white hover:bg-white/10'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#07143D] text-white">
      {/* Brand & System Title */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-3">
          <img
            src="/assets/avencis-logo-dark-bg-favicon.png"
            alt="Avencis"
            className="h-8 w-8 object-contain"
          />
          <div>
            <div className="text-sm font-extrabold tracking-wider uppercase text-white font-serif">
              Avencis
            </div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#E56A2E]">
              Admin & CMS Studio
            </div>
          </div>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden text-slate-400 hover:text-white p-1"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {/* Section: Business Operations */}
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 px-3 mb-2 flex items-center justify-between">
            <span>Operations & Leads</span>
            {!isCms && <span className="h-2 w-2 rounded-full bg-[#E56A2E]" />}
          </div>
          <nav className="space-y-1">
            <NavLink to="/admin" end className={navItemClass}>
              <LayoutDashboard size={18} />
              <span>Admin Dashboard</span>
            </NavLink>
            <NavLink to="/admin/leads" className={navItemClass}>
              <Users size={18} />
              <span>Lead Management</span>
            </NavLink>
            <NavLink to="/admin/directory" className={navItemClass}>
              <Building2 size={18} />
              <span>Business Directory</span>
            </NavLink>
            <NavLink to="/admin/assessments" className={navItemClass}>
              <FileText size={18} />
              <span>Scale Assessments</span>
            </NavLink>
            <NavLink to="/admin/consultations" className={navItemClass}>
              <CalendarCheck size={18} />
              <span>Consultations & Forms</span>
            </NavLink>
            <NavLink to="/admin/lead-magnets" className={navItemClass}>
              <DownloadCloud size={18} />
              <span>Lead Magnet Activity</span>
            </NavLink>
            <NavLink to="/admin/users" className={navItemClass}>
              <ShieldAlert size={18} />
              <span>Roles & Security</span>
            </NavLink>
          </nav>
        </div>

        {/* Section: Content Management System (CMS) */}
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 px-3 mb-2 flex items-center justify-between">
            <span>Content Studio (CMS)</span>
            {isCms && <span className="h-2 w-2 rounded-full bg-[#E56A2E]" />}
          </div>
          <nav className="space-y-1">
            <NavLink to="/admin/cms" end className={navItemClass}>
              <Sparkles size={18} />
              <span>CMS Overview</span>
            </NavLink>
            <NavLink to="/admin/cms/pages" className={navItemClass}>
              <FileCode2 size={18} />
              <span>Manageable Pages</span>
            </NavLink>
            <NavLink to="/admin/cms/case-studies" className={navItemClass}>
              <Layers size={18} />
              <span>Case Studies Library</span>
            </NavLink>
            <NavLink to="/admin/cms/insights" className={navItemClass}>
              <BookOpen size={18} />
              <span>Insights & Articles</span>
            </NavLink>
            <NavLink to="/admin/cms/media" className={navItemClass}>
              <Image size={18} />
              <span>Media Assets (19)</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* User Badge & Live Site Link */}
      <div className="p-4 border-t border-white/10 bg-[#001A72]/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E56A2E] flex items-center justify-center font-bold text-xs text-white">
              SA
            </div>
            <div>
              <div className="text-xs font-bold text-white">Super Admin</div>
              <div className="text-[10px] text-emerald-400 font-semibold">Active Session</div>
            </div>
          </div>
        </div>
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-slate-200 transition-colors"
        >
          <span>View Public Website</span>
          <ExternalLink size={13} />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="admin-portal min-h-screen bg-[#F4F6FA] flex flex-col font-sans">
      {/* Top Banner Notice: Architecture & Persistence Notice */}
      <div className="bg-[#001A72] text-white px-4 py-2 text-xs flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Info size={14} className="text-[#E56A2E] flex-shrink-0" />
          <span>
            <strong>Avencis Internal Administration & CMS:</strong> Frontend management implementation with abstracted data access. Changes persist in-memory for testing.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-[11px] bg-[#E56A2E]/20 text-[#E56A2E] px-2 py-0.5 rounded font-mono font-bold">
            PRE-BACKEND PHASE
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-[33px] z-30">
          {sidebarContent}
        </aside>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="w-72 max-w-[80%] h-full bg-[#07143D]"
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 md:pl-64 flex flex-col overflow-y-auto">
          {/* Internal Top Navigation Bar */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-slate-600 hover:text-slate-900 p-1.5 rounded-lg border border-slate-200"
                aria-label="Open sidebar"
              >
                <Menu size={18} />
              </button>

              {/* Breadcrumb Navigator */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                {getBreadcrumbs().map((crumb, idx, arr) => (
                  <React.Fragment key={crumb.path}>
                    {idx > 0 && <span className="text-slate-300">/</span>}
                    {idx === arr.length - 1 ? (
                      <span className="text-[#07143D] font-bold">{crumb.label}</span>
                    ) : (
                      <Link to={crumb.path} className="hover:text-[#E56A2E]">
                        {crumb.label}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </div>

            {/* Quick Mode Switcher (Admin Operations vs CMS Studio) */}
            <div className="flex items-center gap-2">
              <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200 text-xs font-bold">
                <Link
                  to="/admin"
                  className={`px-3 py-1 rounded-md transition-all ${
                    !isCms
                      ? 'bg-white text-[#07143D] shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-[#07143D]'
                  }`}
                >
                  Admin Ops
                </Link>
                <Link
                  to="/admin/cms"
                  className={`px-3 py-1 rounded-md transition-all ${
                    isCms
                      ? 'bg-[#E56A2E] text-white shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-[#07143D]'
                  }`}
                >
                  CMS Studio
                </Link>
              </div>
            </div>
          </header>

          {/* Page Body View */}
          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
