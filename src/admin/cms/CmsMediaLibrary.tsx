import React, { useState, useMemo } from 'react';
import { CmsStore } from '../cmsStore';
import type { MediaAsset } from '../types';
import {
  Image as ImageIcon,
  Search,
  Copy,
  Check,
  Edit3,
  X,
  Maximize2,
} from 'lucide-react';

export const CmsMediaLibrary: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaAsset[]>(CmsStore.getMediaAssets());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [editingAlt, setEditingAlt] = useState<string>('');
  const [isEditingAlt, setIsEditingAlt] = useState(false);

  const filteredMedia = useMemo(() => {
    return mediaList.filter((m) => {
      const name = m.name.toLowerCase();
      const fn = m.filename.toLowerCase();
      const alt = m.altText.toLowerCase();
      const query = searchTerm.toLowerCase();

      return name.includes(query) || fn.includes(query) || alt.includes(query);
    });
  }, [mediaList, searchTerm]);

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2500);
  };

  const handleSaveAlt = (id: string) => {
    CmsStore.updateMediaAlt(id, editingAlt);
    setMediaList(CmsStore.getMediaAssets());
    if (selectedAsset) {
      setSelectedAsset({ ...selectedAsset, altText: editingAlt });
    }
    setIsEditingAlt(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#07143D] flex items-center gap-2">
            <ImageIcon size={24} className="text-[#E56A2E]" />
            <span>Media Asset Catalog & Library</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse, inspect, and manage SEO alt-text metadata for imagery deployed across the Avencis website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-mono font-medium">
            {mediaList.length} Assets Registered
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-slate-800">Pre-Backend Storage Architecture:</span> Media assets currently reside within the static public directory <code className="text-slate-800 font-mono">/public/assets</code>. The CMS media library provides asset discovery, path copying, and accessibility metadata management without moving or breaking files.
        </div>
        <span className="text-[11px] text-slate-400 shrink-0">Path: /public/assets</span>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets by filename, label, or accessibility alt-text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map((asset) => (
          <div
            key={asset.id}
            onClick={() => {
              setSelectedAsset(asset);
              setEditingAlt(asset.altText);
              setIsEditingAlt(false);
            }}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
          >
            {/* Asset Preview Frame */}
            <div className="w-full h-36 rounded-xl bg-slate-100 border border-slate-200/60 overflow-hidden flex items-center justify-center relative group-hover:bg-slate-200/50 transition-colors">
              <img
                src={asset.path}
                alt={asset.altText}
                className="max-h-full max-w-full object-contain p-2"
                onError={(e) => {
                  // Fallback placeholder if asset preview has rendering restriction
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#07143D]/20 backdrop-blur-[1px] transition-opacity">
                <span className="p-2 rounded-full bg-white text-[#07143D] shadow-md">
                  <Maximize2 size={16} />
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-1">
              <div className="font-semibold text-xs text-[#07143D] truncate" title={asset.name}>
                {asset.name}
              </div>
              <div className="text-[11px] font-mono text-slate-400 truncate" title={asset.filename}>
                {asset.filename}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                <span>{asset.dimensions}</span>
                <span>{asset.sizeKb} KB</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyPath(asset.path);
                }}
                className="text-[11px] text-slate-500 hover:text-[#07143D] flex items-center gap-1 p-1 rounded hover:bg-slate-100 transition-colors"
                title="Copy relative web path"
              >
                {copiedPath === asset.path ? (
                  <>
                    <Check size={12} className="text-emerald-600" />
                    <span className="text-emerald-600 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy Path</span>
                  </>
                )}
              </button>

              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                {asset.mimeType.split('/')[1] || 'img'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Inspection Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div>
                <span className="text-xs font-mono font-semibold text-slate-400">{selectedAsset.id}</span>
                <h2 className="text-lg font-bold font-serif text-[#07143D]">{selectedAsset.name}</h2>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              {/* Asset Preview Box */}
              <div className="w-full h-52 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedAsset.path}
                  alt={selectedAsset.altText}
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>

              {/* Technical Coordinates */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">Filename</span>
                  <span className="font-mono font-semibold text-slate-800 mt-0.5 block truncate">
                    {selectedAsset.filename}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">Dimensions</span>
                  <span className="font-mono font-semibold text-slate-800 mt-0.5 block">
                    {selectedAsset.dimensions}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">File Size</span>
                  <span className="font-mono font-semibold text-slate-800 mt-0.5 block">
                    {selectedAsset.sizeKb} KB
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-medium block">MIME Type</span>
                  <span className="font-mono font-semibold text-slate-800 mt-0.5 block">
                    {selectedAsset.mimeType}
                  </span>
                </div>
              </div>

              {/* Alt-Text / Accessibility */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
                    SEO Alt-Text / Accessibility Description
                  </span>
                  {!isEditingAlt && (
                    <button
                      onClick={() => setIsEditingAlt(true)}
                      className="text-xs text-[#07143D] hover:underline flex items-center gap-1 font-medium"
                    >
                      <Edit3 size={12} /> Edit Alt Text
                    </button>
                  )}
                </div>

                {isEditingAlt ? (
                  <div className="space-y-2">
                    <textarea
                      rows={2}
                      value={editingAlt}
                      onChange={(e) => setEditingAlt(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsEditingAlt(false)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveAlt(selectedAsset.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#07143D] rounded-lg"
                      >
                        Save Alt Text
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                    {selectedAsset.altText || 'No descriptive alt text defined.'}
                  </p>
                )}
              </div>

              {/* Page References */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
                  Referenced In Pages
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAsset.usedIn.map((page, idx) => (
                    <span key={idx} className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {page}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => handleCopyPath(selectedAsset.path)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
              >
                <Copy size={13} />
                <span>Copy Asset Path</span>
              </button>

              <button
                onClick={() => setSelectedAsset(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200/60 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
