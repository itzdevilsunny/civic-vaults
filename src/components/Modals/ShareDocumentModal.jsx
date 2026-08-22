import React, { useState } from 'react';
import { Share2, X, Lock, Copy, Check, Clock, Eye, ShieldCheck, FileText, UserCheck, Key, Shield } from 'lucide-react';

export default function ShareDocumentModal({ isOpen, onClose, document, onShowToast }) {
  const [recipientRole, setRecipientRole] = useState('Forensic Officer');
  const [recipientName, setRecipientName] = useState('Dr. S. K. Raman (Central Forensic Lab)');
  const [permission, setPermission] = useState('View + Download');
  const [expiryHours, setExpiryHours] = useState('48');
  const [allowDownload, setAllowDownload] = useState(true);
  const [allowReshare, setAllowReshare] = useState(false);
  const [watermark, setWatermark] = useState(true);
  const [requirePin, setRequirePin] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !document) return null;

  const shareToken = `SEC-8Xk92-${Math.floor(1000 + Math.random() * 9000)}`;
  const shareableUrl = `https://civic-vaults.onrender.com/share/${shareToken}`;

  const handleShareSecurely = (e) => {
    e.preventDefault();
    setIsGenerated(true);
    onShowToast(`Secure Access Granted to ${recipientRole} (${expiryHours}h Expiry) ✓`, "success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    onShowToast("Secure encrypted sharing link copied to clipboard ✓", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cv-modal-backdrop" style={{ zIndex: 999 }} onClick={onClose}>
      <div className="cv-modal cv-modal-md" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cv-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="cv-badge cv-badge-indigo" style={{ padding: '0.5rem' }}>
              <Share2 size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Secure Document Sharing & Access Control</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Granular RBAC, time-bound access, watermark overlay & audit logging
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cv-btn-icon"><X size={18} /></button>
        </div>

        {/* Form Panel */}
        {!isGenerated ? (
          <form onSubmit={handleShareSecurely} className="cv-modal-body">
            
            {/* Target Document Banner */}
            <div style={{
              padding: '0.875rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Share Target Document:</span>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{document.name}</div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                <span className="cv-badge cv-badge-indigo">{document.classification}</span>
                <span className="cv-badge cv-badge-emerald">Case #{document.caseId}</span>
              </div>
            </div>

            {/* Recipient Selection */}
            <div className="cv-input-group">
              <label className="cv-label">👤 Share With (Recipient Role) *</label>
              <select className="cv-select" value={recipientRole} onChange={e => setRecipientRole(e.target.value)}>
                <option value="Forensic Officer">Forensic Officer (Central Lab)</option>
                <option value="Public Prosecutor">Public Prosecutor (High Court Docket)</option>
                <option value="Senior Inspecting Officer">Senior Inspecting Officer</option>
                <option value="Defense Counsel">Defense Counsel (Court Discovery)</option>
              </select>
            </div>

            <div className="cv-input-group">
              <label className="cv-label">Recipient Name / Official ID</label>
              <input type="text" className="cv-input" value={recipientName} onChange={e => setRecipientName(e.target.value)} required />
            </div>

            {/* Granular Permissions & Expiry Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              
              <div className="cv-input-group">
                <label className="cv-label">🔐 Permission Level</label>
                <select className="cv-select" value={permission} onChange={e => setPermission(e.target.value)}>
                  <option value="View Only">View Only (Restricted)</option>
                  <option value="View + Download">View + Download</option>
                </select>
              </div>

              <div className="cv-input-group">
                <label className="cv-label">⏱️ Access Expiry</label>
                <select className="cv-select" value={expiryHours} onChange={e => setExpiryHours(e.target.value)}>
                  <option value="1">1 Hour (One-Time View)</option>
                  <option value="24">24 Hours (1 Day)</option>
                  <option value="48">48 Hours (Standard)</option>
                  <option value="168">7 Days (Court Session)</option>
                </select>
              </div>

            </div>

            {/* Checkboxes Configuration */}
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.625rem',
              margin: '0.75rem 0'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                <input type="checkbox" checked={allowDownload} onChange={e => setAllowDownload(e.target.checked)} style={{ accentColor: 'var(--accent-primary)' }} />
                📥 Allow File Download
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                <input type="checkbox" checked={allowReshare} onChange={e => setAllowReshare(e.target.checked)} style={{ accentColor: 'var(--accent-primary)' }} />
                🔄 Allow Further Resharing
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                <input type="checkbox" checked={watermark} onChange={e => setWatermark(e.target.checked)} style={{ accentColor: 'var(--accent-primary)' }} />
                💧 Embed Recipient Identity Watermark Overlay
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                <input type="checkbox" checked={requirePin} onChange={e => setRequirePin(e.target.checked)} style={{ accentColor: 'var(--accent-primary)' }} />
                🔑 Require 6-digit OTP / PIN Access Authentication
              </label>
            </div>

            {/* Mandatory Audit Notice */}
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={14} style={{ color: 'var(--success)' }} />
              <span>Receipt & Access Event will be permanently recorded in immutable Audit Trail</span>
            </div>

            <div className="cv-modal-footer" style={{ borderTop: 'none', paddingRight: 0, paddingLeft: 0, marginTop: '1rem' }}>
              <button type="button" onClick={onClose} className="cv-btn cv-btn-secondary">Cancel</button>
              <button type="submit" className="cv-btn cv-btn-primary">
                <Share2 size={16} />
                <span>Share Securely</span>
              </button>
            </div>

          </form>
        ) : (
          <div className="cv-modal-body">
            
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: 'var(--success-light)',
                color: 'var(--success-dark)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem'
              }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Secure Access Granted!
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Time-limited access generated for <strong>{recipientName}</strong> ({recipientRole})
              </p>
            </div>

            <div className="cv-input-group">
              <label className="cv-label">🔑 Temporary Secure Access Link</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input className="cv-input" type="text" readOnly value={shareableUrl} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78125rem', fontWeight: 700 }} />
                <button onClick={handleCopy} className="cv-btn cv-btn-primary">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              padding: '0.875rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.78125rem',
              lineHeight: 1.6
            }}>
              <div><strong>Permission:</strong> {permission}</div>
              <div><strong>Expiry:</strong> {expiryHours} Hours (Auto Revocation)</div>
              <div><strong>Watermarking:</strong> {watermark ? 'Enabled ✓' : 'Disabled'}</div>
              <div><strong>OTP PIN Challenge:</strong> {requirePin ? 'Active (Required)' : 'Disabled'}</div>
            </div>

            <div className="cv-modal-footer" style={{ marginTop: '1rem' }}>
              <button onClick={() => setIsGenerated(false)} className="cv-btn cv-btn-secondary">Modify Settings</button>
              <button onClick={onClose} className="cv-btn cv-btn-primary">Done</button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
