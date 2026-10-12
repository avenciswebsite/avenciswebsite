import React, { useState } from 'react';
import { AdminStore } from './adminStore';
import type { AdminUser, AdminRole } from './types';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  AlertTriangle,
  Check,
  X,
  KeyRound,
} from 'lucide-react';

export const UserManagement: React.FC = () => {
  const [usersList] = useState<AdminUser[]>(AdminStore.getUsers());

  const ROLE_PERMISSIONS: Record<AdminRole, Record<string, boolean>> = {
    'Super Admin': {
      'View & Edit CMS Pages': true,
      'Publish Case Studies & Insights': true,
      'View & Export Leads': true,
      'Access Diagnostic Assessment Results': true,
      'Approve / Reject Business Directory': true,
      'Manage User Accounts & Roles': true,
      'Access Audit Logs & Telemetry': true,
    },
    'Content Manager': {
      'View & Edit CMS Pages': true,
      'Publish Case Studies & Insights': true,
      'View & Export Leads': false,
      'Access Diagnostic Assessment Results': false,
      'Approve / Reject Business Directory': false,
      'Manage User Accounts & Roles': false,
      'Access Audit Logs & Telemetry': false,
    },
    'Lead / Assessment Manager': {
      'View & Edit CMS Pages': false,
      'Publish Case Studies & Insights': false,
      'View & Export Leads': true,
      'Access Diagnostic Assessment Results': true,
      'Approve / Reject Business Directory': true,
      'Manage User Accounts & Roles': false,
      'Access Audit Logs & Telemetry': false,
    },
  };

  const permissionKeys = Object.keys(ROLE_PERMISSIONS['Super Admin']);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#07143D] flex items-center gap-2">
            <ShieldCheck size={24} className="text-[#E56A2E]" />
            <span>Administrative Access & Role Governance</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure operator personas and view role-based access control (RBAC) boundaries for Avencis internal tools.
          </p>
        </div>
      </div>

      {/* Critical Security Boundary Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
        <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs leading-relaxed">
          <div className="font-bold text-amber-950">
            Mandatory Pre-Backend Security Boundary Notice
          </div>
          <p>
            The role selectors and views demonstrated here represent the intended administrative privilege model. In accordance with strict security architecture, <strong>frontend-only route gating does not constitute security</strong>. No private API keys, database credentials, or unrestricted database tokens are present in this client build. Prior to production release, access must be secured by HTTP-only authenticated sessions and server-side authorization middleware.
          </p>
        </div>
      </div>

      {/* Admin Users Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#07143D] flex items-center gap-2">
            <UserCheck size={18} className="text-[#E56A2E]" />
            <span>Provisioned Admin Personas</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">{usersList.length} Accounts Registered</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usersList.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{user.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{user.id}</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-600">{user.email}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                        user.role === 'Super Admin'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : user.role === 'Content Manager'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-400 font-mono">{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role-Based Permissions Matrix */}
      <div className="space-y-3">
        <div>
          <h2 className="text-base font-bold text-[#07143D] flex items-center gap-2">
            <Lock size={18} className="text-[#E56A2E]" />
            <span>Role-Based Access Control (RBAC) Specification Matrix</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Architectural privileges to be enforced by the future API gateway on all administrative endpoints.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-1/3">Capability / Endpoint Scope</th>
                <th className="py-3.5 px-4 text-center">Super Admin</th>
                <th className="py-3.5 px-4 text-center">Content Manager</th>
                <th className="py-3.5 px-4 text-center">Lead / Assessment Manager</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionKeys.map((perm) => (
                <tr key={perm} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-800 text-xs">{perm}</td>
                  {(['Super Admin', 'Content Manager', 'Lead / Assessment Manager'] as AdminRole[]).map((role) => {
                    const hasAccess = ROLE_PERMISSIONS[role][perm];
                    return (
                      <td key={role} className="py-3 px-4 text-center">
                        {hasAccess ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300">
                            <X size={12} strokeWidth={2.5} />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Architecture Guidance */}
      <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
        <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <KeyRound size={14} className="text-[#07143D]" />
          <span>Recommended Authentication Implementation</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          For the eventual backend, we recommend standard session cookies with <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">HttpOnly</code>, <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">Secure</code>, and <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">SameSite=Strict</code> flags, or JWTs verified by middleware on all <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">/api/v1/admin/*</code> routes. Public routes will never accept administrative tokens or expose customer contact logs.
        </p>
      </div>
    </div>
  );
};
