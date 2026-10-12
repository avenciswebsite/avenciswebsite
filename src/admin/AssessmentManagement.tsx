import React, { useState, useMemo } from 'react';
import { AdminStore } from './adminStore';
import type { AssessmentSubmissionRecord } from './types';
import {
  Activity,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  MessageSquare,
  Award,
  ShieldAlert,
  Building,
} from 'lucide-react';

export const AssessmentManagement: React.FC = () => {
  const [assessmentsList, setAssessmentsList] = useState<AssessmentSubmissionRecord[]>(AdminStore.getAssessments());
  const [searchTerm, setSearchTerm] = useState('');
  const [dependencyFilter, setDependencyFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentSubmissionRecord | null>(null);

  const filteredAssessments = useMemo(() => {
    return assessmentsList.filter((item) => {
      const leadName = item.leadName || '';
      const company = item.companyName || '';
      const email = item.email || '';
      const bottleneck = item.primaryBottleneck || '';

      const matchesSearch =
        leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bottleneck.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDependency = dependencyFilter === 'All' || item.dependencyLevel === dependencyFilter;
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

      return matchesSearch && matchesDependency && matchesStatus;
    });
  }, [assessmentsList, searchTerm, dependencyFilter, statusFilter]);

  const handleStatusChange = (id: string, status: AssessmentSubmissionRecord['status']) => {
    AdminStore.updateAssessmentStatus(id, status);
    setAssessmentsList(AdminStore.getAssessments());
    if (selectedAssessment && selectedAssessment.id === id) {
      setSelectedAssessment({
        ...selectedAssessment,
        status,
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 45) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#07143D] flex items-center gap-2">
            <Activity size={24} className="text-[#E56A2E]" />
            <span>Business Diagnostic Assessments</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review 5-question diagnostic submissions, calculated founder-dependency scores, and question-level responses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5 font-medium">
            <ShieldAlert size={14} className="text-amber-600" />
            <span>Demo Persistence State</span>
          </div>
        </div>
      </div>

      {/* Pre-Backend Note */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-slate-800">Pre-Backend Audit Note:</span> The public assessment in <code className="text-slate-800 font-mono">src/components/Assessment.tsx</code> calculates scores client-side and triggers a WhatsApp link without persistent database storage. Records below reflect actual question structures from the codebase.
        </div>
        <span className="text-[11px] text-slate-400 shrink-0">Source: src/components/Assessment.tsx</span>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by respondent name, company, email, or bottleneck..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Bottleneck Level:</span>
            <select
              value={dependencyFilter}
              onChange={(e) => setDependencyFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#07143D]"
            >
              <option value="All">All Levels</option>
              <option value="High">High Dependency</option>
              <option value="Moderate">Moderate Dependency</option>
              <option value="Low">Low Dependency</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Review Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#07143D]"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Consultation Scheduled">Consultation Scheduled</option>
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
                <th className="py-3 px-4">Submission ID</th>
                <th className="py-3 px-4">Promoter / Enterprise</th>
                <th className="py-3 px-4">Score (0-100)</th>
                <th className="py-3 px-4">Dependency Level</th>
                <th className="py-3 px-4">Primary Bottleneck</th>
                <th className="py-3 px-4">WhatsApp Shared</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssessments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-sm">
                    No diagnostic records match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredAssessments.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedAssessment(item)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-[#07143D]">
                      {item.id}
                      <div className="text-[10px] text-slate-400 font-sans">{item.submittedAt}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{item.leadName || 'Anonymous Promoter'}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <Building size={11} /> {item.companyName || 'Undisclosed Enterprise'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreColor(item.overallScore)}`}>
                        <Award size={12} /> {item.overallScore}/100
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          item.dependencyLevel === 'High'
                            ? 'bg-rose-100 text-rose-800'
                            : item.dependencyLevel === 'Moderate'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.dependencyLevel} Risk
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-700 max-w-xs truncate" title={item.primaryBottleneck}>
                      {item.primaryBottleneck}
                    </td>
                    <td className="py-3.5 px-4">
                      {item.whatsappShared ? (
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle2 size={12} /> Triggered
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Not shared</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAssessment(item);
                        }}
                        className="p-1.5 text-slate-400 hover:text-[#07143D] hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Full Breakdown"
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

      {/* Assessment Detail Drawer / Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-slate-400">{selectedAssessment.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getScoreColor(selectedAssessment.overallScore)}`}>
                    Score: {selectedAssessment.overallScore}/100
                  </span>
                </div>
                <h2 className="text-xl font-bold font-serif text-[#07143D] mt-1">
                  {selectedAssessment.leadName || 'Promoter Submission'}
                </h2>
                <p className="text-xs text-slate-500">
                  {selectedAssessment.companyName || 'Enterprise'} &bull; Submitted on {selectedAssessment.submittedAt}
                </p>
              </div>
              <button
                onClick={() => setSelectedAssessment(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              {/* Outcome Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                    Calculated Primary Bottleneck
                  </span>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5 pt-1">
                    <AlertCircle size={16} className="text-rose-500 shrink-0" />
                    {selectedAssessment.primaryBottleneck}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                    Recommended 90-Day Intervention
                  </span>
                  <div className="text-sm font-semibold text-[#07143D] pt-1">
                    {selectedAssessment.recommendedFocus}
                  </div>
                </div>
              </div>

              {/* Status Update Control */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-600 block">Assessment Follow-up Status</span>
                  <span className="text-xs text-slate-400">Current: {selectedAssessment.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedAssessment.id, 'Reviewed')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      selectedAssessment.status === 'Reviewed'
                        ? 'bg-[#07143D] text-white border-[#07143D]'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Mark Reviewed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedAssessment.id, 'Consultation Scheduled')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      selectedAssessment.status === 'Consultation Scheduled'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Consultation Scheduled
                  </button>
                </div>
              </div>

              {/* Question-by-Question Response Audit */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare size={14} className="text-[#E56A2E]" />
                  <span>Submitted Responses ({selectedAssessment.answers.length} Questions)</span>
                </h3>

                <div className="space-y-2.5">
                  {selectedAssessment.answers.map((ans, idx) => (
                    <div
                      key={ans.questionId}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                              Q{idx + 1} &bull; {ans.category}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-900 pt-1">{ans.questionText}</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-200 shrink-0">
                          +{ans.score} pts
                        </span>
                      </div>
                      <div className="mt-3 p-2.5 rounded-lg bg-slate-50/80 border border-slate-100 text-xs text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E56A2E] shrink-0"></span>
                        <span className="font-medium">Selected Answer:</span>
                        <span>{ans.selectedOptionText}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedAssessment(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#07143D] hover:bg-[#07143D]/90 rounded-lg shadow-sm transition-colors"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
