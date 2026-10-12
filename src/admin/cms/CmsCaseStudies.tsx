import React, { useState } from 'react';
import { CmsStore } from '../cmsStore';
import type { CmsCaseStudyItem } from '../types';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Edit3,
  X,
  TrendingUp,
  MessageSquare,
  Building,
} from 'lucide-react';

export const CmsCaseStudies: React.FC = () => {
  const [caseStudiesList, setCaseStudiesList] = useState<CmsCaseStudyItem[]>(CmsStore.getCaseStudies());
  const [editingItem, setEditingItem] = useState<CmsCaseStudyItem | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleEditClick = (item: CmsCaseStudyItem) => {
    setEditingItem({ ...item });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    CmsStore.updateCaseStudy(editingItem.id, editingItem);
    setCaseStudiesList(CmsStore.getCaseStudies());
    setEditingItem(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#07143D] flex items-center gap-2">
            <Briefcase size={24} className="text-[#E56A2E]" />
            <span>Case Studies & Transformation Track Record</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage mid-market turnaround evidence, verified metrics, interventions, and WhatsApp attribution tags.
          </p>
        </div>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in font-medium">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>Case study updated successfully!</span>
        </div>
      )}

      {/* Persistence Note */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-slate-800">Pre-Backend CMS Note:</span> Records below directly represent the 3 approved case study records sourced from <code className="text-slate-800 font-mono">src/data/siteData.ts</code> used across the live site and WhatsApp deep links.
        </div>
        <span className="text-[11px] text-slate-400 shrink-0">Source: src/data/siteData.ts</span>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {caseStudiesList.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#D4AF37] px-2.5 py-0.5 rounded-full bg-slate-100">
                  {item.number}
                </span>
                {item.status === 'Published' ? (
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
                <h3 className="text-base font-bold font-serif text-[#07143D] leading-snug">
                  {item.title}
                </h3>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <Building size={12} className="text-slate-400" />
                  <span>{item.sector} &bull; {item.revenueBracket}</span>
                </div>
              </div>

              {/* Highlight Metric */}
              <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-100 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#E56A2E] tracking-wider flex items-center gap-1">
                  <TrendingUp size={12} /> Key Outcome
                </span>
                <p className="text-xs font-bold text-[#07143D]">{item.resultHighlight}</p>
              </div>

              {/* Challenge Snippet */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Challenge</span>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{item.challenge}</p>
              </div>

              {/* WhatsApp Keyword */}
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <MessageSquare size={12} className="text-emerald-600" />
                <span className="font-mono text-slate-600">Keyword: {item.whatsappKeyword}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => handleEditClick(item)}
                className="px-3 py-1.5 text-xs font-semibold text-[#07143D] hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 border border-slate-200"
              >
                <Edit3 size={12} />
                <span>Edit Case Study</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Drawer Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div>
                <span className="text-xs font-mono font-bold text-[#D4AF37]">{editingItem.number}</span>
                <h2 className="text-lg font-bold font-serif text-[#07143D]">Edit Case Study Details</h2>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Case Study Title</label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Industry Sector</label>
                  <input
                    type="text"
                    value={editingItem.sector}
                    onChange={(e) => setEditingItem({ ...editingItem, sector: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Revenue Bracket</label>
                  <input
                    type="text"
                    value={editingItem.revenueBracket}
                    onChange={(e) => setEditingItem({ ...editingItem, revenueBracket: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">WhatsApp Deep-Link Keyword</label>
                  <input
                    type="text"
                    value={editingItem.whatsappKeyword}
                    onChange={(e) => setEditingItem({ ...editingItem, whatsappKeyword: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Primary Result Highlight Metric</label>
                <input
                  type="text"
                  value={editingItem.resultHighlight}
                  onChange={(e) => setEditingItem({ ...editingItem, resultHighlight: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D] font-bold text-[#E56A2E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Initial Operational Challenge</label>
                <textarea
                  rows={3}
                  value={editingItem.challenge}
                  onChange={(e) => setEditingItem({ ...editingItem, challenge: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Intervention Summary</label>
                <textarea
                  rows={2}
                  value={editingItem.interventionSummary}
                  onChange={(e) => setEditingItem({ ...editingItem, interventionSummary: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Detailed Results Narrative</label>
                <textarea
                  rows={3}
                  value={editingItem.resultParagraph}
                  onChange={(e) => setEditingItem({ ...editingItem, resultParagraph: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                />
              </div>

              <div className="p-4 border-t border-slate-200 flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#07143D] hover:bg-[#07143D]/90 rounded-lg shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
