import React from 'react';
import { Link } from 'react-router-dom';
import { AdminStore } from './adminStore';
import {
  Users,
  Building2,
  FileText,
  CalendarCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const metrics = AdminStore.getMetricsSummary();
  const leads = AdminStore.getLeads().slice(0, 5);
  const pendingDirectory = AdminStore.getDirectory().filter((d) => d.status === 'Pending');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#07143D]">
            Avencis Management Operations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time pipeline overview across client intake, diagnostic evaluations, and enterprise directory listings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/leads"
            className="btn btn-orange btn-sm text-xs"
          >
            <span>Review Leads</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/admin/cms"
            className="btn btn-secondary btn-sm text-xs"
          >
            <span>Open CMS Studio</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Leads */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-[#E56A2E] transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Leads</span>
            <div className="p-2 rounded-lg bg-blue-50 text-[#001A72]">
              <Users size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#07143D]">{metrics.totalLeads}</span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              {metrics.newLeads} New
            </span>
          </div>
          <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
            <Clock size={12} />
            <span>Updated in real time</span>
          </div>
        </div>

        {/* KPI 2: Assessments */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-[#E56A2E] transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Scale Assessments</span>
            <div className="p-2 rounded-lg bg-orange-50 text-[#E56A2E]">
              <FileText size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#07143D]">{metrics.totalAssessments}</span>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              Avg Score: {metrics.avgAssessmentScore}/100
            </span>
          </div>
          <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
            <TrendingUp size={12} className="text-emerald-500" />
            <span>High conversion rate from WhatsApp</span>
          </div>
        </div>

        {/* KPI 3: Directory Submissions */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-[#E56A2E] transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Business Directory</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Building2 size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#07143D]">{metrics.totalDirectorySubmissions}</span>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
              {metrics.pendingDirectoryReviews} Pending Review
            </span>
          </div>
          <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
            <AlertCircle size={12} className="text-amber-500" />
            <span>Verification required before public listing</span>
          </div>
        </div>

        {/* KPI 4: Consultation Requests */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-[#E56A2E] transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Consultations</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <CalendarCheck size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#07143D]">{metrics.totalConsultations}</span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              {metrics.pendingConsultations} Pending Contact
            </span>
          </div>
          <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
            <CheckCircle2 size={12} className="text-blue-500" />
            <span>Direct partner bookings</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Submissions & Pending Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Recent Inbound Leads */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#07143D] flex items-center gap-2">
              <Users size={18} className="text-[#E56A2E]" />
              <span>Recent Inbound Submissions</span>
            </h2>
            <Link to="/admin/leads" className="text-xs font-bold text-[#001A72] hover:underline">
              View All Leads →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Contact & Enterprise</th>
                  <th className="py-3 px-4">Origin Journey</th>
                  <th className="py-3 px-4">Revenue Bracket</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#07143D] text-sm">{lead.fullName}</div>
                      <div className="text-slate-500">{lead.companyName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-mono">{lead.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px]">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600">
                      {lead.revenueBracket || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          lead.status === 'New'
                            ? 'bg-amber-100 text-amber-800'
                            : lead.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : lead.status === 'Qualified'
                            ? 'bg-purple-100 text-purple-800'
                            : lead.status === 'Converted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/leads?id=${lead.id}`}
                        className="text-xs font-bold text-[#001A72] hover:text-[#E56A2E]"
                      >
                        Inspect Record →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (1 Col): Pending Actions & Operations Queue */}
        <div className="space-y-6">
          {/* Action Queue */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-[#07143D] mb-3 flex items-center gap-2">
              <AlertCircle size={18} className="text-rose-500" />
              <span>Pending Action Queue</span>
            </h2>
            <div className="space-y-3">
              {pendingDirectory.length > 0 ? (
                pendingDirectory.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3 rounded-lg border border-amber-200 bg-amber-50/60 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#07143D]">{entry.businessName}</span>
                      <span className="text-[10px] font-bold uppercase bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded">
                        Directory Review
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Promoter: {entry.promoterName} ({entry.city}, {entry.annualTurnover})
                    </div>
                    <Link
                      to={`/admin/directory?id=${entry.id}`}
                      className="text-xs font-bold text-[#E56A2E] hover:underline mt-1"
                    >
                      Review Profile & Decision Rights →
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 py-3 text-center">
                  Zero pending directory verification items.
                </div>
              )}

              <div className="p-3 rounded-lg border border-blue-200 bg-blue-50/50 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#07143D]">1-on-1 Discovery Callback</span>
                  <span className="text-[10px] font-bold uppercase bg-blue-200 text-blue-900 px-1.5 py-0.5 rounded">
                    Consultation
                  </span>
                </div>
                <div className="text-[11px] text-slate-600">
                  Pooja Agarwal — Agarwal Consumer Products (₹15 Cr – ₹50 Cr)
                </div>
                <Link
                  to="/admin/consultations"
                  className="text-xs font-bold text-[#001A72] hover:underline mt-1"
                >
                  Confirm Discovery Schedule →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Access to CMS */}
          <div className="bg-[#07143D] text-white p-5 rounded-xl shadow-md">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#E56A2E] mb-2 font-serif">
              Content Studio (CMS)
            </h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Manage live headline copies, SEO meta descriptions, approved case studies, and 19 media assets.
            </p>
            <div className="space-y-2">
              <Link
                to="/admin/cms/pages"
                className="block w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-center text-white transition-colors"
              >
                Edit 10 Manageable Pages
              </Link>
              <Link
                to="/admin/cms/media"
                className="block w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-center text-white transition-colors"
              >
                Inspect Media Asset Library
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
