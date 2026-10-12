import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CmsStore } from '../cmsStore';
import type { CmsPageContent } from '../types';
import {
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit3,
  Layers,
} from 'lucide-react';

export const CmsPageList: React.FC = () => {
  const [pagesList] = useState<CmsPageContent[]>(CmsStore.getPages());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(pagesList.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [pagesList]);

  const filteredPages = useMemo(() => {
    return pagesList.filter((page) => {
      const matchesSearch =
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.headline.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'All' || page.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || page.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [pagesList, searchTerm, categoryFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#07143D] flex items-center gap-2">
            <Layers size={24} className="text-[#E56A2E]" />
            <span>Manageable Website Pages</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Structured content management for all 10 live public routes of the Avencis website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-mono font-medium">
            10 Pages Discovered
          </div>
        </div>
      </div>

      {/* Persistence Note */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-slate-800">Pre-Backend CMS Architecture:</span> Each page below maps to an exact route and content section from <code className="text-slate-800 font-mono">src/data/siteData.ts</code>. Administrators can edit headlines, copy, badges, and SEO metadata via structured inputs without touching source code.
        </div>
        <span className="text-[11px] text-slate-400 shrink-0">Demo Store</span>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by page title, route, or headline content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#07143D]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#07143D]"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPages.map((page) => (
          <div
            key={page.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600">
                  {page.category}
                </span>
                {page.status === 'Published' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 size={11} /> Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <Clock size={11} /> Draft
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold font-serif text-[#07143D] group-hover:text-[#E56A2E] transition-colors">
                  {page.title}
                </h3>
                <span className="text-xs font-mono text-slate-400 block mt-0.5">{page.slug}</span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                <strong className="text-slate-800">Headline:</strong> {page.headline}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Updated: {page.lastUpdated}</span>
              <div className="flex items-center gap-2">
                <a
                  href={page.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#07143D] hover:bg-slate-50 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  <span>View Live</span>
                </a>
                <Link
                  to={`/admin/cms/pages/${page.id}`}
                  className="px-3 py-1.5 rounded-lg bg-[#07143D] text-white hover:bg-[#07143D]/90 transition-colors flex items-center gap-1 font-semibold"
                >
                  <Edit3 size={12} />
                  <span>Edit Content</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
