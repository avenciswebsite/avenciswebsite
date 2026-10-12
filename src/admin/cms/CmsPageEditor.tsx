import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CmsStore } from '../cmsStore';
import type { CmsPageContent, CmsPublishStatus } from '../types';
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Eye,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';

export const CmsPageEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [prevId, setPrevId] = useState(id);
  const [page, setPage] = useState<CmsPageContent | null>(() => {
    return id ? CmsStore.getPageById(id) || null : null;
  });
  const [initialPage, setInitialPage] = useState<CmsPageContent | null>(() => {
    return id ? CmsStore.getPageById(id) || null : null;
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (id !== prevId) {
    setPrevId(id);
    const found = id ? CmsStore.getPageById(id) || null : null;
    setPage(found);
    setInitialPage(found);
  }

  if (!page || !initialPage) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-500">Page with ID "{id}" was not found.</p>
        <Link to="/admin/cms/pages" className="text-sm font-semibold text-[#07143D] underline">
          Return to Page Directory
        </Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!page.headline.trim()) {
      setValidationError('Page headline is mandatory and cannot be empty.');
      return;
    }
    if (!page.title.trim()) {
      setValidationError('Page title is mandatory.');
      return;
    }

    CmsStore.updatePage(page.id, {
      title: page.title,
      headline: page.headline,
      subheadline: page.subheadline,
      eyebrowBadge: page.eyebrowBadge,
      bodyIntro: page.bodyIntro,
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      status: page.status,
    });

    setInitialPage({ ...page });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleDiscard = () => {
    if (initialPage) {
      setPage({ ...initialPage });
      setValidationError(null);
    }
  };

  const isDirty = JSON.stringify(page) !== JSON.stringify(initialPage);

  return (
    <div className="space-y-6">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/cms/pages')}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Back to Pages"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-serif text-[#07143D]">{page.title}</h1>
              <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                {page.slug}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Category: {page.category} &bull; Manageable section components: {page.sectionsCount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Eye size={14} />
            <span>Preview Changes</span>
          </button>

          <a
            href={page.slug}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1"
          >
            <ExternalLink size={14} />
            <span>Live URL</span>
          </a>
        </div>
      </div>

      {/* Save Success Banner */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Content modifications saved successfully to demonstration store!</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-mono">Store updated</span>
        </div>
      )}

      {/* Validation Alert */}
      {validationError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-fade-in font-medium">
          <AlertCircle size={16} className="text-rose-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Content Block */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-[#07143D] uppercase tracking-wider flex items-center gap-2">
              <Layers size={16} className="text-[#E56A2E]" />
              <span>Core Hero & Positioning Content</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Publish State:</span>
              <select
                value={page.status}
                onChange={(e) => setPage({ ...page, status: e.target.value as CmsPublishStatus })}
                className="text-xs font-semibold py-1 px-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">Internal Page Title</label>
              <input
                type="text"
                value={page.title}
                onChange={(e) => setPage({ ...page, title: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">Eyebrow Badge / Tagline</label>
              <input
                type="text"
                value={page.eyebrowBadge}
                onChange={(e) => setPage({ ...page, eyebrowBadge: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              Primary Section Headline <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={page.headline}
              onChange={(e) => setPage({ ...page, headline: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 font-serif font-bold text-[#07143D] focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">Subheadline / Strategic Positioning</label>
            <textarea
              rows={2}
              value={page.subheadline}
              onChange={(e) => setPage({ ...page, subheadline: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">Body Intro / Narrative Text</label>
            <textarea
              rows={4}
              value={page.bodyIntro}
              onChange={(e) => setPage({ ...page, bodyIntro: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
            />
          </div>
        </div>

        {/* SEO & Search Engine Metadata */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-[#07143D] uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={16} className="text-[#D4AF37]" />
              <span>Search Engine Optimization (SEO Metadata)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Control the exact title tag and meta description indexed by search crawlers for this route.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 block">SEO Title Tag</label>
              <span className={`text-[11px] font-mono ${page.seoTitle.length > 60 ? 'text-amber-600' : 'text-slate-400'}`}>
                {page.seoTitle.length} / 60 characters
              </span>
            </div>
            <input
              type="text"
              value={page.seoTitle}
              onChange={(e) => setPage({ ...page, seoTitle: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 block">Meta Description</label>
              <span className={`text-[11px] font-mono ${page.seoDescription.length > 160 ? 'text-amber-600' : 'text-slate-400'}`}>
                {page.seoDescription.length} / 160 characters
              </span>
            </div>
            <textarea
              rows={3}
              value={page.seoDescription}
              onChange={(e) => setPage({ ...page, seoDescription: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
            />
          </div>
        </div>

        {/* Fixed Save Bar */}
        <div className="sticky bottom-4 z-20 p-4 rounded-xl bg-[#07143D] text-white shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>
              {isDirty ? 'Unsaved edits in buffer' : 'No pending changes'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isDirty && (
              <button
                type="button"
                onClick={handleDiscard}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1"
              >
                <RotateCcw size={13} />
                <span>Discard Changes</span>
              </button>
            )}

            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-slate-900 bg-[#D4AF37] hover:bg-[#D4AF37]/90 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <Save size={14} />
              <span>Save Content Updates</span>
            </button>
          </div>
        </div>
      </form>

      {/* Live Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#07143D] text-white rounded-2xl shadow-2xl border border-slate-800 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-white/10 font-mono text-[#D4AF37]">
                  Previewing: {page.slug}
                </span>
                <span className="text-xs text-slate-400">Live Component Render Preview</span>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              {page.eyebrowBadge && (
                <div className="inline-block text-xs font-mono font-bold tracking-wider text-[#D4AF37] px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 uppercase">
                  {page.eyebrowBadge}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-extrabold font-serif leading-tight">
                {page.headline}
              </h1>

              {page.subheadline && (
                <p className="text-lg text-slate-300 font-medium leading-relaxed">
                  {page.subheadline}
                </p>
              )}

              {page.bodyIntro && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
                  {page.bodyIntro}
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Simulated Render</span>
                <span className="font-mono text-[11px]">SEO: {page.seoTitle}</span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
