import React from 'react';
import { ShieldAlert, X, AlertTriangle, Lock, UserX, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export default function IncidentResponseModal({ isOpen, onClose, alert, onShowToast }) {
  if (!isOpen || !alert) return null;

  const handleAction = (actionName) => {
    onShowToast(`Incident action executed: ${actionName} for event ${alert.id}`, "warning");
    onClose();
  };

  return (
    <div className="cv-modal-backdrop" onClick={onClose}>
      <div className="cv-modal" onClick={e => e.stopPropagation()}>
        <div className="cv-modal-header" style={{ borderBottom: '1px solid var(--danger)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="cv-badge cv-badge-red" style={{ padding: '0.5rem' }}>
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--danger-dark)' }}>
                Security Incident Response Center
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Event Ref: #{alert.id || "SEC-9001"} • Severity Level: {alert.severity || "CRITICAL"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cv-btn-icon"><X size={18} /></button>
        </div>

        <div className="cv-modal-body">
          <div style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--danger-light)',
            border: '1px solid rgba(239,68,68,0.3)',
            marginBottom: '1.25rem'
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--danger-dark)' }}>
              {alert.event || "Unauthorized Document Access Attempt"}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              {alert.details || "Multiple failed clearance checks detected from unrecognized IP node."}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              marginTop: '0.75rem',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)'
            }}>
              <div>Origin IP: <strong>{alert.ipAddress || "192.168.1.45"}</strong></div>
              <div>User/Session: <strong>{alert.user || "Unknown User"}</strong></div>
              <div>Device: <strong>{alert.device || "Windows Workstation"}</strong></div>
              <div>Time: <strong>{alert.timestamp || "2026-08-22 18:30 IST"}</strong></div>
            </div>
          </div>

          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Available Incident Remediation Actions:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button 
              onClick={() => handleAction("Active Session Terminated & IP Blocked")}
              className="cv-btn cv-btn-danger"
              style={{ justifyContent: 'flex-start' }}
            >
              <UserX size={16} />
              <span>Block IP Address & Terminate Active Session Immediately</span>
            </button>
            <button 
              onClick={() => handleAction("Mandatory MFA Enforcement Triggered")}
              className="cv-btn cv-btn-secondary"
              style={{ justifyContent: 'flex-start' }}
            >
              <Lock size={16} />
              <span>Force Mandatory Re-Authentication & MFA Challenge</span>
            </button>
            <button 
              onClick={() => handleAction("Forensic Audit Export Completed")}
              className="cv-btn cv-btn-secondary"
              style={{ justifyContent: 'flex-start' }}
            >
              <FileSpreadsheet size={16} />
              <span>Export Full Forensic Incident Packet for Cyber Cell</span>
            </button>
          </div>
        </div>

        <div className="cv-modal-footer">
          <button onClick={onClose} className="cv-btn cv-btn-secondary">Dismiss Alert</button>
        </div>
      </div>
    </div>
  );
}
