import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CmsStore } from '../cmsStore';
import {
  Layers,
  FileText,
  Briefcase,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Edit3,
  ShieldAlert,
} from 'lucide-react';

export const CmsDashboard: React.FC = () => {
  const [summary] = useState(CmsStore.getCmsSummary());
  const [pages] = useState(CmsStore.getPages());

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#07143D] flex items-center gap-2">
            <Layers size={24} className="text-[#E56A2E]" />
            <span>Content Management Studio (CMS)</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage headlines, strategic positioning, SEO metadata, case studies, insights, and media assets across all 10 public pages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5 font-medium">
            <ShieldAlert size={14} className="text-amber-600" />
            <span>Demonstration State</span>
          </div>
        </div>
      </div>

      {/* Persistence Note */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-slate-800">Pre-Backend CMS Note:</span> Content edits made within this interface interact with the abstracted in-memory <code className="text-slate-800 font-mono">CmsStore</code>. This provides a live preview and validation experience that will seamlessly integrate with the headless CMS API once provisioned.
        </div>
        <span className="text-[11px] text-slate-400 shrink-0">Source: src/admin/cmsStore.ts</span>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Manageable Pages</span>
            <div className="p-2 rounded-xl bg-slate-100 text-[#07143D]">
              <FileText size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#07143D]">{summary.totalPages}</span>
            <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
              <CheckCircle2 size={12} /> {summary.publishedPages} Published
            </span>
          </div>
          <div className="text-[11px] text-slate-400">All primary website routes indexed</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Case Studies</span>
            <div className="p-2 rounded-xl bg-slate-100 text-[#E56A2E]">
              <Briefcase size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#07143D]">{summary.totalCaseStudies}</span>
            <span className="text-xs font-medium text-slate-500">Auto, Chem, Capital Goods</span>
          </div>
          <div className="text-[11px] text-slate-400">Published transformation stories</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Insights & Articles</span>
            <div className="p-2 rounded-xl bg-slate-100 text-[#07143D]">
              <FileText size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#07143D]">{summary.totalArticles}</span>
            <span className="text-xs font-medium text-emerald-600">Thought Leadership</span>
          </div>
          <div className="text-[11px] text-slate-400">Mid-market promoter advisory</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Media Assets</span>
            <div className="p-2 rounded-xl bg-slate-100 text-[#E56A2E]">
              <ImageIcon size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#07143D]">{summary.totalMediaAssets}</span>
            <span className="text-xs font-medium text-slate-500">In /public/assets</span>
          </div>
          <div className="text-[11px] text-slate-400">Brand logos, portraits, diagrams</div>
        </div>
      </div>

      {/* Quick Access Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/cms/pages"
          className="p-5 rounded-2xl bg-gradient-to-br from-[#07143D] to-[#0A1E5C] text-white shadow-md hover:shadow-lg transition-all group flex flex-col justify-between"
        >
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">Structured Editing</span>
            <h3 className="text-lg font-bold font-serif group-hover:text-[#D4AF37] transition-colors">
              Manage Website Pages
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Edit headlines, positioning copy, intro texts, and SEO metadata across all 10 public pages.
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between text-xs text-slate-300 font-medium">
            <span>Explore 10 Pages</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
          </div>
        </Link>

        <Link
          to="/admin/cms/case-studies"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all group flex flex-col justify-between"
        >
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E56A2E]">Social Proof</span>
            <h3 className="text-lg font-bold font-serif text-[#07143D] group-hover:text-[#E56A2E] transition-colors">
              Manage Case Studies
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Update turnaround metrics, EBITDA growth figures, and client challenges for approved case studies.
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>3 Case Studies</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#E56A2E]" />
          </div>
        </Link>

        <Link
          to="/admin/cms/media"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all group flex flex-col justify-between"
        >
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Assets Catalog</span>
            <h3 className="text-lg font-bold font-serif text-[#07143D] group-hover:text-[#07143D] transition-colors">
              Media Library
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              View all 19 image assets deployed in /public/assets with dimensions, size, and alt-text tags.
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>19 Media Files</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#07143D]" />
          </div>
        </Link>
      </div>

      {/* Recent Page Updates Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#07143D] flex items-center gap-2">
            <Clock size={18} className="text-[#E56A2E]" />
            <span>Discovered Manageable Public Pages</span>
          </h2>
          <Link to="/admin/cms/pages" className="text-xs text-[#07143D] font-semibold hover:underline">
            View All ({pages.length})
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Page Title & Route</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Sections</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pages.slice(0, 6).map((page) => (
                <tr key={page.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#07143D]">{page.title}</div>
                    <div className="text-xs font-mono text-slate-400">{page.slug}</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">{page.category}</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-500">
                    {page.sectionsCount} Sections
                  </td>
                  <td className="py-3.5 px-4">
                    {page.status === 'Published' ? (
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 size={12} /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock size={12} /> Draft
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-400 font-mono">{page.lastUpdated}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/admin/cms/pages/${page.id}`}
                        className="p-1.5 text-slate-400 hover:text-[#07143D] hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Page"
                      >
                        <Edit3 size={15} />
                      </Link>
                      <a
                        href={page.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-[#07143D] hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Live Page"
                      >
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
