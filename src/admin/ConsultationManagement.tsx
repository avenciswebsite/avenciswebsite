import React, { useState, useMemo } from 'react';
import { AdminStore } from './adminStore';
import type { ConsultationRecord } from './types';
import {
  CalendarCheck,
  Search,
  Building,
  Phone,
  Mail,
  DollarSign,
  AlertCircle,
  Plus,
  Eye,
  X,
  ShieldAlert,
} from 'lucide-react';

export const ConsultationManagement: React.FC = () => {
  const [consultationsList, setConsultationsList] = useState<ConsultationRecord[]>(AdminStore.getConsultations());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [bracketFilter, setBracketFilter] = useState<string>('All');
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationRecord | null>(null);
  const [newNote, setNewNote] = useState('');

  const brackets = useMemo(() => {
    const set = new Set(consultationsList.map((c) => c.revenueBracket));
    return ['All', ...Array.from(set)];
  }, [consultationsList]);

  const filteredConsultations = useMemo(() => {
    return consultationsList.filter((item) => {
      const matchesSearch =
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm);

      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesBracket = bracketFilter === 'All' || item.revenueBracket === bracketFilter;

      return matchesSearch && matchesStatus && matchesBracket;
    });
  }, [consultationsList, searchTerm, statusFilter, bracketFilter]);

  const handleStatusChange = (id: string, status: ConsultationRecord['status']) => {
    AdminStore.updateConsultationStatus(id, status);
    setConsultationsList(AdminStore.getConsultations());
    if (selectedConsultation && selectedConsultation.id === id) {
      setSelectedConsultation({
        ...selectedConsultation,
        status,
      });
    }
  };

  const handleAddNote = (id: string) => {
    if (!newNote.trim()) return;
    AdminStore.addConsultationNote(id, newNote.trim());
    setConsultationsList(AdminStore.getConsultations());
    if (selectedConsultation && selectedConsultation.id === id) {
      setSelectedConsultation({
        ...selectedConsultation,
        notes: [newNote.trim(), ...selectedConsultation.notes],
      });
    }
    setNewNote('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#07143D] flex items-center gap-2">
            <CalendarCheck size={24} className="text-[#E56A2E]" />
            <span>Consultation & Discovery Requests</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage inbound promoter discovery sessions submitted through the primary conversion form.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5 font-medium">
            <ShieldAlert size={14} className="text-amber-600" />
            <span>Demo Persistence State</span>
          </div>
        </div>
      </div>

      {/* Persistence Note */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-slate-800">Pre-Backend Audit Note:</span> The primary booking form in <code className="text-slate-800 font-mono">src/components/FinalCTA.tsx</code> currently sets local state on submit (<code className="text-slate-800 font-mono">setSubmitted(true)</code>) without an API dispatch. All submissions below correspond to the 6 fields collected by that component.
        </div>
        <span className="text-[11px] text-slate-400 shrink-0">Source: src/components/FinalCTA.tsx</span>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by promoter, company, email, or phone..."
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
              <option value="Pending Contact">Pending Contact</option>
              <option value="Discovery Scheduled">Discovery Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Turnover:</span>
            <select
              value={bracketFilter}
              onChange={(e) => setBracketFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#07143D]"
            >
              {brackets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Promoter & Enterprise</th>
                <th className="py-3 px-4">Revenue Bracket</th>
                <th className="py-3 px-4">Primary Challenge</th>
                <th className="py-3 px-4">Contact Coordinates</th>
                <th className="py-3 px-4">Booking Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredConsultations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                    No consultation requests match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredConsultations.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedConsultation(item)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-[#07143D]">
                      {item.id}
                      <div className="text-[10px] text-slate-400 font-sans">{item.submittedAt}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{item.fullName}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Building size={11} className="text-slate-400" />
                        {item.companyName}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-700">
                      <span className="flex items-center gap-1">
                        <DollarSign size={12} className="text-[#E56A2E]" />
                        {item.revenueBracket}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-700 max-w-xs truncate" title={item.primaryChallenge}>
                      {item.primaryChallenge}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      <div>{item.phone}</div>
                      <div className="text-[11px] text-slate-400">{item.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          item.status === 'Pending Contact'
                            ? 'bg-amber-100 text-amber-800'
                            : item.status === 'Discovery Scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : item.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedConsultation(item);
                        }}
                        className="p-1.5 text-slate-400 hover:text-[#07143D] hover:bg-slate-100 rounded-lg transition-colors"
                        title="Inspect Consultation"
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

      {/* Consultation Detail Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div>
                <span className="text-xs font-mono font-semibold text-slate-400">{selectedConsultation.id}</span>
                <h2 className="text-xl font-bold font-serif text-[#07143D] mt-0.5">
                  {selectedConsultation.fullName}
                </h2>
                <p className="text-xs text-slate-500">
                  {selectedConsultation.companyName} &bull; Received on {selectedConsultation.submittedAt}
                </p>
              </div>
              <button
                onClick={() => setSelectedConsultation(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              {/* Core Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-400 font-medium block">Revenue Bracket</span>
                  <span className="text-sm font-semibold text-[#07143D] mt-0.5 block">{selectedConsultation.revenueBracket}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-400 font-medium block">Phone Coordinate</span>
                  <a href={`tel:${selectedConsultation.phone}`} className="text-sm font-semibold text-[#07143D] mt-0.5 flex items-center gap-1.5 hover:underline">
                    <Phone size={13} className="text-[#E56A2E]" />
                    {selectedConsultation.phone}
                  </a>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 col-span-1 sm:col-span-2">
                  <span className="text-xs text-slate-400 font-medium block">Email Address</span>
                  <a href={`mailto:${selectedConsultation.email}`} className="text-sm font-semibold text-[#07143D] mt-0.5 flex items-center gap-1.5 hover:underline">
                    <Mail size={13} className="text-slate-500" />
                    {selectedConsultation.email}
                  </a>
                </div>
              </div>

              {/* Primary Challenge */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Identified Primary Challenge / Bottleneck
                </span>
                <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs leading-relaxed text-slate-800 flex items-start gap-2">
                  <AlertCircle size={16} className="text-[#E56A2E] shrink-0 mt-0.5" />
                  <span>{selectedConsultation.primaryChallenge}</span>
                </p>
              </div>

              {/* Status Update */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Consultation Progression Status
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(['Pending Contact', 'Discovery Scheduled', 'Completed', 'Cancelled'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedConsultation.id, status)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                        selectedConsultation.status === status
                          ? 'bg-[#07143D] text-white border-[#07143D] shadow-sm'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Notes Feed */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Internal Engagement Notes
                </span>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add operator notes, call logs, or next steps..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote(selectedConsultation.id)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                  />
                  <button
                    onClick={() => handleAddNote(selectedConsultation.id)}
                    className="px-3 py-2 text-xs font-semibold bg-[#07143D] text-white rounded-lg hover:bg-[#07143D]/90 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Plus size={14} /> Add Note
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedConsultation.notes.map((note, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedConsultation(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
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
