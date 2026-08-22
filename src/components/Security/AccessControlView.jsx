import React, { useState } from 'react';
import { Lock, Shield, Users, Check, X, Sliders, ShieldCheck } from 'lucide-react';
import { MOCK_RBAC_ROLES } from '../../data/mockData';

export default function AccessControlView({ onShowToast }) {
  const [roles, setRoles] = useState(MOCK_RBAC_ROLES);

  const togglePermission = (roleIdx, permKey) => {
    const updated = [...roles];
    updated[roleIdx].permissions[permKey] = !updated[roleIdx].permissions[permKey];
    setRoles(updated);
    onShowToast(`RBAC matrix permission '${permKey}' updated for ${updated[roleIdx].role}`, 'info');
  };

  const permissionsList = [
    { key: 'view', label: 'View Case' },
    { key: 'upload', label: 'Upload Evidence' },
    { key: 'edit', label: 'Edit Metadata' },
    { key: 'download', label: 'Download File' },
    { key: 'share', label: 'Share Link' },
    { key: 'delete', label: 'Delete Document' },
    { key: 'approve', label: 'Digital Sign / Approve' },
    { key: 'assign', label: 'Assign Officers' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Role-Based Access Control (RBAC) & Permissions Matrix
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Enforce granular access policies across system roles, investigation officers, and legal reviewers
          </p>
        </div>
        <div className="cv-badge cv-badge-indigo" style={{ padding: '0.5rem 1rem' }}>
          <ShieldCheck size={16} />
          <span>Policy Enforcement: Active</span>
        </div>
      </div>

      {/* Permissions Matrix Card */}
      <div className="cv-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="cv-table-container">
          <table className="cv-table">
            <thead>
              <tr>
                <th style={{ minWidth: '220px' }}>Role / Designation</th>
                <th>Users Active</th>
                {permissionsList.map(p => (
                  <th key={p.key} style={{ textAlign: 'center' }}>{p.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((r, roleIdx) => (
                <tr key={roleIdx}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.role}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{r.description}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{r.usersCount} Active</td>
                  {permissionsList.map(p => {
                    const isGranted = r.permissions[p.key];
                    return (
                      <td key={p.key} style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => togglePermission(roleIdx, p.key)}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: isGranted ? 'var(--success-light)' : 'var(--danger-light)',
                            color: isGranted ? 'var(--success-dark)' : 'var(--danger-dark)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all var(--transition-fast)'
                          }}
                          title={`Toggle ${p.label} for ${r.role}`}
                        >
                          {isGranted ? <Check size={16} /> : <X size={16} />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
