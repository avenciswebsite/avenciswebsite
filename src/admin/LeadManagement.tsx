import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminStore } from './adminStore';
import type { LeadRecord, LeadStatus } from './types';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  Building,
  Plus,
  X,
  ExternalLink,
} from 'lucide-react';

export const LeadManagement: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id');

  const [leadsList, setLeadsList] = useState<LeadRecord[]>(AdminStore.getLeads());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(
    initialId ? AdminStore.getLeadById(initialId) || null : null
  );
  const [newNote, setNewNote] = useState('');

  // Filtered leads calculation
  const filteredLeads = useMemo(() => {
    return leadsList.filter((lead) => {
      const matchesSearch =
        lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm);

      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchesSource = sourceFilter === 'All' || lead.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leadsList, searchTerm, statusFilter, sourceFilter]);

  const handleStatusChange = (id: string, status: LeadStatus) => {
    AdminStore.updateLeadStatus(id, status);
    setLeadsList(AdminStore.getLeads());
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status });
    }
  };

  const handleAddNote = (id: string) => {
    if (!newNote.trim()) return;
    AdminStore.addLeadNote(id, newNote.trim());
    setLeadsList(AdminStore.getLeads());
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({
        ...selectedLead,
        notes: [newNote.trim(), ...selectedLead.notes],
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
            <Users size={24} className="text-[#E56A2E]" />
            <span>Lead & Enquiry Management</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track inquiries originated across diagnostic assessments, consultation bookings, and WhatsApp attribution journeys.
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
          Showing {filteredLeads.length} of {leadsList.length} leads
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by promoter name, enterprise, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#E56A2E]"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-3 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#E56A2E]"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Converted">Converted</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="py-2 px-3 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#E56A2E]"
          >
            <option value="All">All Origin Sources</option>
            <option value="Consultation Form">Consultation Form</option>
            <option value="Diagnostic Assessment">Diagnostic Assessment</option>
            <option value="WhatsApp Inquiry">WhatsApp Inquiry</option>
            <option value="Lead Magnet">Lead Magnet</option>
            <option value="Business Directory">Business Directory</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Contact & Enterprise</th>
                <th className="py-3 px-4">Source Journey</th>
                <th className="py-3 px-4">Revenue Bracket</th>
                <th className="py-3 px-4">Primary Challenge</th>
                <th className="py-3 px-4">Submitted At</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`cursor-pointer transition-colors ${
                    selectedLead?.id === lead.id ? 'bg-orange-50/50' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#07143D] text-sm">{lead.fullName}</div>
                    <div className="text-slate-600 font-medium">{lead.companyName}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{lead.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] text-slate-700">
                      {lead.source}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">
                    {lead.revenueBracket || '—'}
                  </td>
                  <td className="py-3.5 px-4 max-w-[200px] truncate text-slate-600" title={lead.primaryChallenge}>
                    {lead.primaryChallenge || '—'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {lead.createdAt}
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLead(lead);
                      }}
                      className="text-xs font-bold text-[#001A72] hover:text-[#E56A2E]"
                    >
                      Inspect →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-sm">
            No leads match your filter or search query.
          </div>
        )}
      </div>

      {/* Selected Lead Drawer / Inspection Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                    ID: {selectedLead.id}
                  </span>
                  <h2 className="text-xl font-bold font-serif text-[#07143D]">
                    {selectedLead.fullName}
                  </h2>
                  <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5 mt-0.5">
                    <Building size={13} />
                    <span>{selectedLead.companyName}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                  aria-label="Close detail view"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Status Selector Bar */}
              <div className="mb-6 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-2">
                  Update Lead Stage Status
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['New', 'Contacted', 'Qualified', 'Converted', 'Archived'] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedLead.id, st)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                        selectedLead.status === st
                          ? 'bg-[#001A72] text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-4 mb-6">
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Contact Coordinates
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail size={14} className="text-[#E56A2E]" />
                    <a href={`mailto:${selectedLead.email}`} className="font-semibold hover:underline">
                      {selectedLead.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone size={14} className="text-[#E56A2E]" />
                    <a href={`tel:${selectedLead.phone}`} className="font-semibold hover:underline">
                      {selectedLead.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                    <Calendar size={13} />
                    <span>Inbound Timestamp: {selectedLead.createdAt}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Discovery Metadata
                  </div>
                  <div>
                    <span className="text-slate-500">Revenue Threshold: </span>
                    <strong className="text-[#07143D]">{selectedLead.revenueBracket || 'Not specified'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Primary Bottleneck: </span>
                    <strong className="text-[#07143D]">{selectedLead.primaryChallenge || 'Not specified'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Attribution Source: </span>
                    <span className="font-semibold text-[#001A72]">{selectedLead.source}</span>
                  </div>
                </div>

                {selectedLead.linkedAssessmentId && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#001A72]">Linked Assessment Record</div>
                      <div className="text-[11px] text-slate-600">ID: {selectedLead.linkedAssessmentId}</div>
                    </div>
                    <a
                      href={`/admin/assessments?id=${selectedLead.linkedAssessmentId}`}
                      className="text-xs font-bold text-[#E56A2E] hover:underline flex items-center gap-1"
                    >
                      <span>Inspect Score</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>

              {/* Internal Operator Notes */}
              <div>
                <label className="text-xs font-bold uppercase text-slate-700 block mb-2">
                  Internal Senior Partner & Team Notes
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add an internal note or next action..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote(selectedLead.id)}
                    className="flex-1 py-1.5 px-3 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#E56A2E]"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddNote(selectedLead.id)}
                    className="py-1.5 px-3 bg-[#07143D] hover:bg-[#001A72] text-white rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>Add</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedLead.notes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2"
                    >
                      <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 mt-6 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="btn btn-secondary btn-sm text-xs"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
