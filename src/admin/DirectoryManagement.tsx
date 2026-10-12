import React, { useState, useMemo } from 'react';
import { AdminStore } from './adminStore';
import type { DirectoryRecord } from './types';
import {
  FolderKanban,
  Search,
  CheckCircle,
  XCircle,
  Building2,
  MapPin,
  Mail,
  Phone,
  Globe,
  DollarSign,
  Users,
  Eye,
  AlertTriangle,
  X,
  ShieldAlert,
} from 'lucide-react';

export const DirectoryManagement: React.FC = () => {
  const [directoryList, setDirectoryList] = useState<DirectoryRecord[]>(AdminStore.getDirectory());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedRecord, setSelectedRecord] = useState<DirectoryRecord | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(directoryList.map((d) => d.category));
    return ['All', ...Array.from(set)];
  }, [directoryList]);

  const filteredRecords = useMemo(() => {
    return directoryList.filter((item) => {
      const matchesSearch =
        item.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.promoterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [directoryList, searchTerm, statusFilter, categoryFilter]);

  const handleApprove = (id: string) => {
    AdminStore.updateDirectoryStatus(id, 'Approved');
    setDirectoryList(AdminStore.getDirectory());
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord({
        ...selectedRecord,
        status: 'Approved',
        isPublished: true,
        reviewedAt: 'Just now',
        reviewedBy: 'Super Admin',
        rejectionReason: undefined,
      });
    }
  };

  const handleReject = (id: string) => {
    if (!rejectionReasonInput.trim()) return;
    AdminStore.updateDirectoryStatus(id, 'Rejected', rejectionReasonInput.trim());
    setDirectoryList(AdminStore.getDirectory());
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord({
        ...selectedRecord,
        status: 'Rejected',
        isPublished: false,
        reviewedAt: 'Just now',
        reviewedBy: 'Super Admin',
        rejectionReason: rejectionReasonInput.trim(),
      });
    }
    setIsRejecting(false);
    setRejectionReasonInput('');
  };

  const handleTogglePublish = (id: string) => {
    AdminStore.toggleDirectoryPublication(id);
    setDirectoryList(AdminStore.getDirectory());
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord({
        ...selectedRecord,
        isPublished: !selectedRecord.isPublished,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#07143D] flex items-center gap-2">
            <FolderKanban size={24} className="text-[#E56A2E]" />
            <span>Business Directory Management</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review mid-market enterprise profile submissions, verify manufacturing credentials, and manage public directory visibility.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5 font-medium">
            <ShieldAlert size={14} className="text-amber-600" />
            <span>Demo Persistence State</span>
          </div>
        </div>
      </div>

      {/* Persistence Notice */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-slate-800">Pre-Backend Audit Note:</span> The public-facing Business Directory submission form is pending backend migration. All entries displayed below reflect demonstration business profiles conforming to the proposed schema.
        </div>
        <span className="text-[11px] text-slate-400 shrink-0">Source: src/admin/adminStore.ts</span>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by business name, promoter, location, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#07143D]"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Sector:</span>
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
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Enterprise</th>
                <th className="py-3 px-4">Promoter</th>
                <th className="py-3 px-4">Sector</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Turnover</th>
                <th className="py-3 px-4">Review Status</th>
                <th className="py-3 px-4">Public Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-sm">
                    No directory records match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedRecord(item)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-[#07143D] shrink-0" />
                        <div>
                          <div className="font-semibold text-[#07143D]">{item.businessName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{item.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      <div>{item.promoterName}</div>
                      <div className="text-xs text-slate-400">{item.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1 text-xs">
                        <MapPin size={12} className="text-slate-400 shrink-0" />
                        <span>
                          {item.city}, {item.state}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-800">
                      {item.annualTurnover}
                    </td>
                    <td className="py-3.5 px-4">
                      {item.status === 'Approved' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle size={12} /> Approved
                        </span>
                      )}
                      {item.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <AlertTriangle size={12} /> Pending Review
                        </span>
                      )}
                      {item.status === 'Rejected' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle size={12} /> Rejected
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {item.isPublished ? (
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live on Directory
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Hidden / Unpublished
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(item);
                        }}
                        className="p-1.5 text-slate-400 hover:text-[#07143D] hover:bg-slate-100 rounded-lg transition-colors"
                        title="Inspect Record"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Inspection Modal / Drawer */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div>
                <span className="text-xs font-mono font-semibold text-slate-400">{selectedRecord.id}</span>
                <h2 className="text-xl font-bold font-serif text-[#07143D] mt-0.5">
                  {selectedRecord.businessName}
                </h2>
                <p className="text-xs text-slate-500">Submitted on {selectedRecord.createdAt}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedRecord(null);
                  setIsRejecting(false);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-400 font-medium block">Promoter / Founder</span>
                  <span className="text-sm font-semibold text-slate-900 mt-0.5 block">{selectedRecord.promoterName}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-400 font-medium block">Industry Sector</span>
                  <span className="text-sm font-semibold text-slate-900 mt-0.5 block">{selectedRecord.category}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-400 font-medium block">Annual Turnover</span>
                  <span className="text-sm font-semibold text-[#07143D] mt-0.5 flex items-center gap-1">
                    <DollarSign size={14} className="text-[#E56A2E]" />
                    {selectedRecord.annualTurnover}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-400 font-medium block">Employee Scale</span>
                  <span className="text-sm font-semibold text-slate-900 mt-0.5 flex items-center gap-1">
                    <Users size={14} className="text-slate-500" />
                    {selectedRecord.employeeCount} Team Members
                  </span>
                </div>
              </div>

              {/* Location & Contact */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact & Coordinates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <MapPin size={14} className="text-slate-400 shrink-0" />
                    <span>{selectedRecord.city}, {selectedRecord.state}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Phone size={14} className="text-slate-400 shrink-0" />
                    <span>{selectedRecord.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Mail size={14} className="text-slate-400 shrink-0" />
                    <span>{selectedRecord.email}</span>
                  </div>
                  {selectedRecord.website && (
                    <div className="flex items-center gap-2 text-xs text-slate-700">
                      <Globe size={14} className="text-slate-400 shrink-0" />
                      <a href={selectedRecord.website} target="_blank" rel="noopener noreferrer" className="text-[#07143D] underline">
                        {selectedRecord.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Company Description */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Business Description</h3>
                <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs leading-relaxed text-slate-700">
                  {selectedRecord.description}
                </p>
              </div>

              {/* Review History */}
              {selectedRecord.reviewedAt && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex justify-between items-center">
                  <span>Reviewed by <strong>{selectedRecord.reviewedBy}</strong> ({selectedRecord.reviewedAt})</span>
                  {selectedRecord.rejectionReason && (
                    <span className="text-rose-600 font-medium">Reason: {selectedRecord.rejectionReason}</span>
                  )}
                </div>
              )}

              {/* Rejection Form Input */}
              {isRejecting && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-semibold text-xs">
                    <AlertTriangle size={16} /> Specify Reason for Rejection
                  </div>
                  <textarea
                    rows={2}
                    value={rejectionReasonInput}
                    onChange={(e) => setRejectionReasonInput(e.target.value)}
                    placeholder="e.g. Turnover below qualifying threshold or unverified GST credentials..."
                    className="w-full p-2.5 text-xs rounded-lg border border-rose-300 bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsRejecting(false)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/50 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReject(selectedRecord.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublish(selectedRecord.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    selectedRecord.isPublished
                      ? 'border-slate-300 text-slate-700 hover:bg-slate-200'
                      : 'border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
                  }`}
                >
                  {selectedRecord.isPublished ? 'Unpublish from Directory' : 'Publish to Public Directory'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {selectedRecord.status !== 'Approved' && (
                  <button
                    onClick={() => handleApprove(selectedRecord.id)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#07143D] hover:bg-[#07143D]/90 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle size={14} className="text-emerald-400" />
                    Approve Entry
                  </button>
                )}
                {selectedRecord.status !== 'Rejected' && !isRejecting && (
                  <button
                    onClick={() => setIsRejecting(true)}
                    className="px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <XCircle size={14} />
                    Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
