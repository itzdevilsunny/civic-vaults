import React, { useState } from 'react';
import { Bell, X, ShieldAlert, FileText, CheckCircle2, AlertTriangle, Info, Trash2, Filter } from 'lucide-react';

export default function NotificationsModal({ isOpen, onClose, notifications = [], onClearAll, onShowToast }) {
  const [filterType, setFilterType] = useState('all');

  if (!isOpen) return null;

  const defaultNotifications = notifications.length > 0 ? notifications : [
    {
      id: "NOTIF-01",
      category: "critical",
      title: "🚨 Failed Login Threshold Exceeded",
      detail: "5 consecutive failed authentication attempts detected for user 'officer_102'. Account temporarily locked.",
      time: "10 mins ago",
      icon: ShieldAlert,
      badge: "Critical Alert"
    },
    {
      id: "NOTIF-02",
      category: "warning",
      title: "🟠 Document Access Permission Requested",
      detail: "Forensic Officer Dr. Raman requested elevated download access for Evidence_042.pdf in Case #2026-0789.",
      time: "25 mins ago",
      icon: AlertTriangle,
      badge: "Pending Approval"
    },
    {
      id: "NOTIF-03",
      category: "info",
      title: "🔵 New Digital Evidence Ingested",
      detail: "FIR_Financial_Breach_Report.pdf uploaded by Inspector Arjun Singh with SHA-256 Lock.",
      time: "1 hour ago",
      icon: FileText,
      badge: "Ingestion"
    },
    {
      id: "NOTIF-04",
      category: "success",
      title: "🟢 SHA-256 File Integrity Verified",
      detail: "Automated routine checksum verification passed with 100% match against CaseVault ledger.",
      time: "2 hours ago",
      icon: CheckCircle2,
      badge: "Verified"
    }
  ];

  const filteredNotifs = defaultNotifications.filter(n => filterType === 'all' || n.category === filterType);

  return (
    <div className="cv-modal-backdrop" style={{ zIndex: 999 }} onClick={onClose}>
      <div className="cv-modal cv-modal-md" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cv-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="cv-badge cv-badge-indigo" style={{ padding: '0.5rem' }}>
              <Bell size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Real-Time Security & System Notification Center</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                NIST-compliant live alert monitoring & system event stream
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cv-btn-icon"><X size={18} /></button>
        </div>

        {/* Filter Controls */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--bg-subtle)',
          borderBottom: '1px solid var(--border-color)',
          overflowX: 'auto'
        }}>
          {[
            { id: 'all', label: 'All Events' },
            { id: 'critical', label: '🔴 Critical' },
            { id: 'warning', label: '🟠 Warning' },
            { id: 'info', label: '🔵 Info' },
            { id: 'success', label: '🟢 Success' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: filterType === f.id ? 'var(--accent-primary)' : 'var(--bg-surface)',
                color: filterType === f.id ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List Body */}
        <div className="cv-modal-body" style={{ maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredNotifs.map(n => {
            const Icon = n.icon || Bell;
            const badgeClass = n.category === 'critical' ? 'cv-badge-red' :
                              n.category === 'warning' ? 'cv-badge-amber' :
                              n.category === 'success' ? 'cv-badge-emerald' : 'cv-badge-blue';

            return (
              <div 
                key={n.id}
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: n.category === 'critical' ? 'var(--danger-light)' : 'var(--bg-surface)',
                  border: `1px solid ${n.category === 'critical' ? 'var(--danger)' : 'var(--border-color)'}`,
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: n.category === 'critical' ? 'var(--danger)' : 'var(--accent-light)',
                  color: n.category === 'critical' ? '#ffffff' : 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <Icon size={16} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {n.title}
                    </h4>
                    <span className={`cv-badge ${badgeClass}`} style={{ fontSize: '0.6875rem' }}>
                      {n.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {n.detail}
                  </p>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    {n.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="cv-modal-footer">
          <button onClick={() => {
            if (onClearAll) onClearAll();
            onShowToast("Cleared notification drawer", "info");
          }} className="cv-btn cv-btn-secondary">
            <Trash2 size={14} />
            <span>Clear Read</span>
          </button>
          <button onClick={onClose} className="cv-btn cv-btn-primary">
            Close Notifications
          </button>
        </div>

      </div>
    </div>
  );
}
