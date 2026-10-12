import React, { useState, useMemo } from 'react';
import { AdminStore } from './adminStore';
import type { LeadMagnetSubmissionRecord } from './types';
import {
  FileDown,
  Search,
  CheckCircle,
  Clock,
  ExternalLink,
  Mail,
  Building,
  User,
  ShieldAlert,
  FileText,
  Send,
} from 'lucide-react';

export const LeadMagnetManagement: React.FC = () => {
  const [submissionsList, setSubmissionsList] = useState<LeadMagnetSubmissionRecord[]>(AdminStore.getLeadMagnets());
  const [searchTerm, setSearchTerm] = useState('');
  const [magnetFilter, setMagnetFilter] = useState<string>('All');
  const [deliveryFilter, setDeliveryFilter] = useState<string>('All');
  const [followUpFilter, setFollowUpFilter] = useState<string>('All');

  const magnetNames = useMemo(() => {
    const set = new Set(submissionsList.map((m) => m.leadMagnetName));
    return ['All', ...Array.from(set)];
  }, [submissionsList]);

  const filteredSubmissions = useMemo(() => {
    return submissionsList.filter((item) => {
      const email = item.email.toLowerCase();
      const name = (item.fullName || '').toLowerCase();
      const company = (item.companyName || '').toLowerCase();
      const magnet = item.leadMagnetName.toLowerCase();

      const matchesSearch =
        email.includes(searchTerm.toLowerCase()) ||
        name.includes(searchTerm.toLowerCase()) ||
        company.includes(searchTerm.toLowerCase()) ||
        magnet.includes(searchTerm.toLowerCase());

      const matchesMagnet = magnetFilter === 'All' || item.leadMagnetName === magnetFilter;
      const matchesDelivery = deliveryFilter === 'All' || item.deliveryStatus === deliveryFilter;
      const matchesFollowUp = followUpFilter === 'All' || item.followUpStatus === followUpFilter;

      return matchesSearch && matchesMagnet && matchesDelivery && matchesFollowUp;
    });
  }, [submissionsList, searchTerm, magnetFilter, deliveryFilter, followUpFilter]);

  const handleFollowUpChange = (id: string, followUp: LeadMagnetSubmissionRecord['followUpStatus']) => {
    AdminStore.updateLeadMagnetFollowUp(id, followUp);
    setSubmissionsList(AdminStore.getLeadMagnets());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#07143D] flex items-center gap-2">
            <FileDown size={24} className="text-[#E56A2E]" />
            <span>Lead Magnet Submissions & Content Delivery</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track asset downloads, executive whitepapers, and operational frameworks requested by inbound visitors.
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
          <span className="font-semibold text-slate-800">Pre-Backend Audit Note:</span> While executive whitepapers and diagnostic frameworks are referenced across Avencis journeys, standalone gated PDF download modal handlers are not yet connected to an automated email dispatch queue.
        </div>
        <span className="text-[11px] text-slate-400 shrink-0">Source: src/data/siteData.ts</span>
      </div>

      {/* Asset Catalog Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: '13-Week Cash Flow Predictor',
            type: 'Financial Governance Tool',
            status: 'Ready for PDF API',
            downloads: 48,
          },
          {
            title: 'Founder Handover Matrix',
            type: 'Leadership Framework',
            status: 'Ready for PDF API',
            downloads: 62,
          },
          {
            title: 'EMT Accountability Model',
            type: 'Executive System',
            status: 'Ready for PDF API',
            downloads: 39,
          },
          {
            title: '90-Day Sprint Playbook',
            type: 'Methodology Briefing',
            status: 'Ready for PDF API',
            downloads: 54,
          },
        ].map((asset, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-start justify-between">
              <span className="p-2 rounded-lg bg-orange-50 text-[#E56A2E]">
                <FileText size={18} />
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                {asset.downloads} requests
              </span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#07143D] leading-snug">{asset.title}</h3>
              <p className="text-[11px] text-slate-400">{asset.type}</p>
            </div>
            <div className="text-[10px] text-emerald-600 font-medium pt-1 border-t border-slate-100">
              &bull; {asset.status}
            </div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by respondent email, promoter name, company, or asset title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07143D]/20 focus:border-[#07143D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Asset:</span>
            <select
              value={magnetFilter}
              onChange={(e) => setMagnetFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#07143D]"
            >
              {magnetNames.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Delivery:</span>
            <select
              value={deliveryFilter}
              onChange={(e) => setDeliveryFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#07143D]"
            >
              <option value="All">All Deliveries</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending Delivery">Pending Delivery</option>
              <option value="Link Clicked">Link Clicked</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Follow-Up:</span>
            <select
              value={followUpFilter}
              onChange={(e) => setFollowUpFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#07143D]"
            >
              <option value="All">All</option>
              <option value="Uncontacted">Uncontacted</option>
              <option value="Email Sent">Email Sent</option>
              <option value="Followed Up">Followed Up</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Download ID</th>
                <th className="py-3 px-4">Requested Asset</th>
                <th className="py-3 px-4">Recipient</th>
                <th className="py-3 px-4">Landing Page Origin</th>
                <th className="py-3 px-4">Delivery Status</th>
                <th className="py-3 px-4">Follow-Up Stage</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                    No lead magnet submissions match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-[#07143D]">
                      {item.id}
                      <div className="text-[10px] text-slate-400 font-sans">{item.submittedAt}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 text-xs">{item.leadMagnetName}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <div className="font-medium text-slate-800 flex items-center gap-1">
                        <User size={12} className="text-slate-400" />
                        {item.fullName || 'Anonymous User'}
                      </div>
                      <div className="text-slate-500 flex items-center gap-1 mt-0.5">
                        <Mail size={12} className="text-slate-400" />
                        {item.email}
                      </div>
                      {item.companyName && (
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Building size={11} /> {item.companyName}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-slate-600">
                      <span className="flex items-center gap-1">
                        <ExternalLink size={12} className="text-slate-400" />
                        {item.landingPage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {item.deliveryStatus === 'Delivered' && (
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle size={12} /> Delivered
                        </span>
                      )}
                      {item.deliveryStatus === 'Pending Delivery' && (
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock size={12} /> Pending Delivery
                        </span>
                      )}
                      {item.deliveryStatus === 'Link Clicked' && (
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          <ExternalLink size={12} /> Link Clicked
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={item.followUpStatus}
                        onChange={(e) =>
                          handleFollowUpChange(item.id, e.target.value as LeadMagnetSubmissionRecord['followUpStatus'])
                        }
                        className="text-xs py-1 px-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#07143D]"
                      >
                        <option value="Uncontacted">Uncontacted</option>
                        <option value="Email Sent">Email Sent</option>
                        <option value="Followed Up">Followed Up</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`mailto:${item.email}?subject=Regarding your request for ${encodeURIComponent(item.leadMagnetName)}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-[#07143D] hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                        title="Send Follow-up Email"
                      >
                        <Send size={12} /> Email
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
