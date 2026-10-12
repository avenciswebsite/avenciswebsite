import React, { useState, useMemo } from 'react';
import { CmsStore } from '../cmsStore';
import type { CmsArticle } from '../types';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Edit3,
  Plus,
  X,
  User,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const CmsInsights: React.FC = () => {
  const [articlesList, setArticlesList] = useState<CmsArticle[]>(CmsStore.getArticles());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingArticle, setEditingArticle] = useState<CmsArticle | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(articlesList.map((a) => a.category));
    return ['All', ...Array.from(set)];
  }, [articlesList]);

  const filteredArticles = useMemo(() => {
    return articlesList.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'All' || a.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [articlesList, searchTerm, categoryFilter]);

  const handleEditClick = (article: CmsArticle) => {
    setIsCreatingNew(false);
    setEditingArticle({ ...article });
  };

  const handleCreateNewClick = () => {
    setIsCreatingNew(true);
    setEditingArticle({
      id: '',
      title: '',
      slug: 'new-article-slug',
      category: 'Leadership & Delegation',
      readTime: '6 min read',
      summary: '',
      content: '',
      publishDate: 'October 2026',
      author: 'Avencis Advisory Team',
      status: 'Draft',
      seoKeywords: 'promoter governance, mid market scaling',
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    if (isCreatingNew) {
      CmsStore.addArticle(editingArticle);
    } else {
      CmsStore.updateArticle(editingArticle.id, editingArticle);
    }

    setArticlesList(CmsStore.getArticles());
    setEditingArticle(null);
    setIsCreatingNew(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#07143D] flex items-center gap-2">
            <FileText size={24} className="text-[#E56A2E]" />
            <span>Strategic Insights & Thought Leadership</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Author and publish operational briefings, executive essays, and transformation frameworks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateNewClick}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#07143D] hover:bg-[#07143D]/90 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Plus size={14} />
            <span>Draft New Article</span>
          </button>
        </div>
      </div>

      {/* Save Success */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in font-medium">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>Article updated and synced with demonstration CMS store!</span>
        </div>
      )}

      {/* Persistence Note */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-slate-800">Pre-Backend CMS Note:</span> Articles displayed below correspond to the 4 approved editorial thought pieces in <code className="text-slate-800 font-mono">src/data/siteData.ts</code>, published on the public route <code className="text-slate-800 font-mono">/insights</code>.
        </div>
        <span className="text-[11px] text-slate-400 shrink-0">Route: /insights</span>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by article headline, topic, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Topic:</span>
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
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-100 text-slate-700">
                  {article.category}
                </span>
                {article.status === 'Published' ? (
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
                <h3 className="text-lg font-bold font-serif text-[#07143D] leading-snug">
                  {article.title}
                </h3>
                <div className="text-xs text-slate-400 flex items-center gap-3 mt-1.5 font-sans">
                  <span className="flex items-center gap-1">
                    <User size={12} /> {article.author}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {article.publishDate}
                  </span>
                  <span>&bull;</span>
                  <span>{article.readTime}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {article.summary}
              </p>

              {article.seoKeywords && (
                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                  <Sparkles size={11} className="text-[#D4AF37]" />
                  <span>Keywords: {article.seoKeywords}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">/{article.slug}</span>
              <button
                onClick={() => handleEditClick(article)}
                className="px-3 py-1.5 text-xs font-semibold text-[#07143D] hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 border border-slate-200"
              >
                <Edit3 size={12} />
                <span>Edit Article</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <h2 className="text-lg font-bold font-serif text-[#07143D]">
                {isCreatingNew ? 'Draft New Insight Article' : 'Edit Insight Article'}
              </h2>
              <button
                onClick={() => setEditingArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-sm">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Article Title</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 font-bold focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Category</label>
                  <input
                    type="text"
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Read Time</label>
                  <input
                    type="text"
                    value={editingArticle.readTime}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Status</label>
                  <select
                    value={editingArticle.status}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, status: e.target.value as CmsArticle['status'] })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Executive Summary</label>
                <textarea
                  rows={3}
                  value={editingArticle.summary}
                  onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Article Body Content</label>
                <textarea
                  rows={6}
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  placeholder="Enter article markdown or narrative content..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D] font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Author</label>
                  <input
                    type="text"
                    value={editingArticle.author}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">SEO Keywords</label>
                  <input
                    type="text"
                    value={editingArticle.seoKeywords}
                    onChange={(e) => setEditingArticle({ ...editingArticle, seoKeywords: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#07143D] hover:bg-[#07143D]/90 rounded-lg shadow-sm"
                >
                  {isCreatingNew ? 'Create Article' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
