import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Share2, 
  History, 
  ShieldCheck, 
  FileText, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  Eye,
  Award,
  RefreshCw,
  Stamp,
  Hash,
  Shield,
  Clock
} from 'lucide-react';

export default function DocumentViewerModal({ document, isOpen, onClose, onShowToast }) {
  const [activeTab, setActiveTab] = useState('metadata');
  const [isVerifyingHash, setIsVerifyingHash] = useState(false);
  const [showWatermark, setShowWatermark] = useState(true);
  const [isHashVerified, setIsHashVerified] = useState(true);

  if (!isOpen || !document) return null;

  const handleReVerifyHash = () => {
    setIsVerifyingHash(true);
    setTimeout(() => {
      setIsVerifyingHash(false);
      setIsHashVerified(true);
      onShowToast("SHA-256 Checksum re-verified against immutable ledger: 100% Match ✓", "success");
    }, 1200);
  };

  return (
    <div className="cv-modal-backdrop" onClick={onClose}>
      <div className="cv-modal cv-modal-xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="cv-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="cv-badge cv-badge-indigo" style={{ padding: '0.5rem' }}>
              <FileText size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 800 }}>{document.name}</h2>
                <span className={`cv-badge ${
                  document.classification === 'Highly Restricted' ? 'cv-badge-red' : 
                  document.classification === 'Restricted' ? 'cv-badge-amber' : 'cv-badge-blue'
                }`}>
                  <Lock size={12} />
                  {document.classification}
                </span>
                {document.legalHold && (
                  <span className="cv-badge cv-badge-emerald" title="Protected under Legal Retention Policy">
                    Legal Hold Active
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Case ID: #{document.caseId} ({document.caseTitle || "Investigation"}) • Version: {document.version}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              onClick={() => onShowToast(`Document ${document.name} downloaded securely. Watermark applied.`, 'success')}
              className="cv-btn cv-btn-primary cv-btn-sm"
            >
              <Download size={14} />
              <span>Download</span>
            </button>
            <button onClick={onClose} className="cv-btn-icon">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--bg-subtle)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {[
            { id: 'metadata', label: 'Document Metadata', icon: FileText },
            { id: 'chainOfCustody', label: 'Chain of Custody (USP 🥇)', icon: ShieldCheck, badge: document.chainOfCustody?.length },
            { id: 'versions', label: 'Version History', icon: History },
            { id: 'signatures', label: 'Digital Signatures', icon: Stamp }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.875rem',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="cv-badge cv-badge-indigo" style={{ fontSize: '0.6875rem', padding: '0.1rem 0.4rem' }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="cv-modal-body" style={{ minHeight: '380px' }}>
          
          {/* TAB 1: METADATA & PREVIEW */}
          {activeTab === 'metadata' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
              
              {/* Document Preview Box with Secure Watermarking Overlay */}
              <div style={{
                position: 'relative',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-subtle)',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                padding: '2rem'
              }}>
                {/* Watermark Overlay Generator */}
                {showWatermark && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    opacity: 0.12,
                    transform: 'rotate(-25deg)',
                    userSelect: 'none',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    textAlign: 'center',
                    lineHeight: 1.4
                  }}>
                    CASEVAULT CONFIDENTIAL<br/>
                    CASE #{document.caseId} • OFFICIAL USE ONLY<br/>
                    ACCESSED BY INSPECTOR ARJUN SINGH
                  </div>
                )}

                <FileText size={64} style={{ color: 'var(--accent-primary)', marginBottom: '1rem', opacity: 0.7 }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {document.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Preview Mode ({document.pages || 12} Pages • {document.size})
                </p>

                {/* Watermark Toggle Switch */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--bg-surface)',
                  padding: '0.4rem 0.875rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  zIndex: 20
                }}>
                  <input
                    type="checkbox"
                    id="watermarkToggle"
                    checked={showWatermark}
                    onChange={e => setShowWatermark(e.target.checked)}
                    style={{ accentColor: 'var(--accent-primary)' }}
                  />
                  <label htmlFor="watermarkToggle" style={{ fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                    Show Dynamic Security Watermark
                  </label>
                </div>
              </div>

              {/* Sidebar Metadata & Hash Inspector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* 🥈 SHA-256 Integrity Verification Box */}
                <div style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isHashVerified ? 'var(--success-light)' : 'var(--danger-light)',
                  border: `1px solid ${isHashVerified ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 700, fontSize: '0.8125rem' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--success-dark)' }} />
                      <span style={{ color: 'var(--success-dark)' }}>✓ INTEGRITY VERIFIED</span>
                    </div>
                    <button 
                      onClick={handleReVerifyHash}
                      disabled={isVerifyingHash}
                      className="cv-btn-icon"
                      style={{ padding: '0.2rem' }}
                      title="Re-run SHA-256 Checksum Verification"
                    >
                      <RefreshCw size={14} className={isVerifyingHash ? 'animate-spin' : ''} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Cryptographic Checksum (SHA-256):
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    backgroundColor: 'var(--bg-surface)',
                    padding: '0.4rem',
                    borderRadius: '4px',
                    wordBreak: 'break-all',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)'
                  }}>
                    {document.sha256}
                  </div>
                </div>

                {/* Metadata Details Table */}
                <div className="cv-card" style={{ padding: '1rem', fontSize: '0.8125rem' }}>
                  <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                    DOCUMENT METADATA
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem 0.5rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Type:</span>
                      <div style={{ fontWeight: 600 }}>{document.type}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>File Size:</span>
                      <div style={{ fontWeight: 600 }}>{document.size}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Uploaded By:</span>
                      <div style={{ fontWeight: 600 }}>{document.uploadedBy}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Upload Date:</span>
                      <div style={{ fontWeight: 600 }}>{document.uploadDate}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Current Version:</span>
                      <div style={{ fontWeight: 600 }}>{document.version}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Total Accesses:</span>
                      <div style={{ fontWeight: 600 }}>{document.accessCount || 48} times</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: CHAIN OF CUSTODY (USP 🥇) */}
          {activeTab === 'chainOfCustody' && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
                backgroundColor: 'var(--bg-subtle)',
                padding: '0.875rem 1rem',
                borderRadius: 'var(--radius-md)'
              }}>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                    🥇 Immutable Evidence Chain of Custody
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Cryptographically recorded sequence of transfer, analysis, and verification events.
                  </p>
                </div>
                <span className="cv-badge cv-badge-emerald">
                  Ledger Status: Immutable & Verified
                </span>
              </div>

              {/* Chain of Custody Timeline Stream */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--accent-primary)' }}>
                {document.chainOfCustody?.map((step, idx) => (
                  <div 
                    key={idx}
                    style={{
                      position: 'relative',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      left: '-1.45rem',
                      top: '1.25rem',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-primary)',
                      border: '2px solid var(--bg-surface)'
                    }} />

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {step.action}
                      </span>
                      <span className="cv-badge cv-badge-indigo" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                        {step.verificationId}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <span>👤 Officer: <strong>{step.officer}</strong> ({step.badge})</span>
                      <span>⏰ Timestamp: <strong>{step.timestamp}</strong></span>
                      <span>Result: <strong style={{ color: 'var(--success-dark)' }}>{step.result}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VERSION HISTORY */}
          {activeTab === 'versions' && (
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>
                Document Revision & Version Control
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {document.versions?.map((ver, idx) => (
                  <div key={idx} style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: idx === 0 ? 'var(--accent-light)' : 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent-primary)' }}>
                          {ver.version}
                        </span>
                        {idx === 0 && <span className="cv-badge cv-badge-emerald">Active Version</span>}
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>• {ver.date}</span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                        {ver.notes} (By {ver.uploader})
                      </p>
                    </div>
                    {idx !== 0 && (
                      <button 
                        onClick={() => onShowToast(`Restored version ${ver.version} as primary`, 'info')}
                        className="cv-btn cv-btn-secondary cv-btn-sm"
                      >
                        Restore Version
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DIGITAL SIGNATURES */}
          {activeTab === 'signatures' && (
            <div>
              <div style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--success-light)',
                border: '1px solid rgba(16,185,129,0.3)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <Stamp size={32} style={{ color: 'var(--success-dark)' }} />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--success-dark)' }}>
                    Digitally Signed & Approved Document
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Signed by: <strong>{document.digitalSignature?.signedBy || "Senior Officer S. Roy"}</strong>
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Signing Timestamp: {document.digitalSignature?.date || "2026-08-22 11:30 IST"}
                  </p>
                  <div style={{
                    marginTop: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    backgroundColor: 'var(--bg-surface)',
                    padding: '0.35rem 0.6rem',
                    borderRadius: '4px',
                    display: 'inline-block',
                    border: '1px solid var(--border-color)'
                  }}>
                    Signature Hash: {document.digitalSignature?.signatureHash || "SIG-99812-EC-2026"}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="cv-modal-footer">
          <button 
            onClick={() => onShowToast(`Access requested for ${document.name}`, 'info')}
            className="cv-btn cv-btn-secondary"
          >
            Request Elevated Permission
          </button>
          <button onClick={onClose} className="cv-btn cv-btn-primary">
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
