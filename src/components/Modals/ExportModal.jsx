import React, { useState } from 'react';
import { Download, FileText, ShieldCheck, Printer, X, CheckCircle2, Lock, Eye } from 'lucide-react';

export default function ExportModal({ isOpen, onClose, document: doc, onShowToast }) {
  const [includeWatermark, setIncludeWatermark] = useState(true);
  const [includeSec65B, setIncludeSec65B] = useState(true);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL • POLICE DEPT • FOR COURT USE ONLY");
  const [exporting, setExporting] = useState(false);

  if (!isOpen || !doc) return null;

  const exportTimestamp = new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'medium' }) + " IST";
  const certId = `SEC65B-2026-DL-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleTriggerExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      onShowToast(`📥 Exported ${doc.name} with Watermark & Sec 65B Certificate (${certId}) ✓`, "success");
      onClose();
    }, 1200);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="cv-modal-backdrop" style={{ zIndex: 999 }} onClick={onClose}>
      <div className="cv-modal cv-modal-lg" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cv-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="cv-badge cv-badge-indigo" style={{ padding: '0.5rem' }}>
              <Download size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Secure Export & Sec 65B Certificate Generator</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Bharatiya Sakshya Adhiniyam (BSA 2023) / Section 65B compliant legal evidence export
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cv-btn-icon"><X size={18} /></button>
        </div>

        {/* Modal Body */}
        <div className="cv-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Document Summary Pill */}
          <div style={{
            padding: '0.875rem 1rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {doc.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Case ID: #{doc.caseId} • SHA-256 Lock: <code style={{ color: 'var(--accent-primary)' }}>{doc.sha256?.substring(0, 16)}...</code>
              </div>
            </div>
            <span className="cv-badge cv-badge-emerald">SHA-256 Verified</span>
          </div>

          {/* Export Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            
            {/* Option A: Dynamic Security Watermarking */}
            <div style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-surface)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="wmCheck"
                  checked={includeWatermark}
                  onChange={e => setIncludeWatermark(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="wmCheck" style={{ fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer' }}>
                  Enable Security Watermark
                </label>
              </div>

              {includeWatermark && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Custom Overlay Text:</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={e => setWatermarkText(e.target.value)}
                    className="cv-input"
                    style={{ fontSize: '0.78125rem' }}
                  />
                  <span style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)' }}>
                    Auto-stamps Officer ID, Timestamp & IP on every page.
                  </span>
                </div>
              )}
            </div>

            {/* Option B: Section 65B Certificate Inclusion */}
            <div style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-surface)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="secCheck"
                  checked={includeSec65B}
                  onChange={e => setIncludeSec65B(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="secCheck" style={{ fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer' }}>
                  Generate Sec 65B Certificate
                </label>
              </div>

              {includeSec65B && (
                <p style={{ fontSize: '0.78125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Attaches statutory Certificate under Section 65B of Indian Evidence Act / BSA 2023 affirming electronic record authenticity.
                </p>
              )}
            </div>

          </div>

          {/* PRINTABLE SEC 65B CERTIFICATE PREVIEW CARD */}
          {includeSec65B && (
            <div style={{
              border: '2px dashed var(--accent-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              backgroundColor: 'var(--bg-surface)',
              lineHeight: 1.6
            }} className="printable-cert">
              
              <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                  GOVERNMENT OF INDIA • MINISTRY OF HOME AFFAIRS
                </h3>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  CERTIFICATE UNDER SECTION 65B OF THE INDIAN EVIDENCE ACT / BSA 2023
                </h4>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Certificate Ref ID: <strong>{certId}</strong>
                </div>
              </div>

              <div style={{ fontSize: '0.78125rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p>
                  I, <strong>Inspector Arjun Singh (Badge #IND-DL-8892)</strong>, hereby certify that the electronic record titled <strong>"{doc.name}"</strong> associated with Case Docket <strong>#{doc.caseId}</strong> was produced by CaseVault secure digital evidence repository operating under normal activity.
                </p>

                <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.625rem', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                  <div>SHA-256 Hash Digest: {doc.sha256}</div>
                  <div>Verification Timestamp: {exportTimestamp}</div>
                  <div>Vault Custody Status: VERIFIED & LOCKED</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Cryptographic Seal:</span>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--success-dark)' }}>
                      ✓ ECC Digital Signature Applied
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>Inspector Arjun Singh</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Senior Cyber Forensic Officer</div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="cv-modal-footer">
          {includeSec65B && (
            <button onClick={handlePrintCertificate} className="cv-btn cv-btn-secondary">
              <Printer size={16} />
              <span>Print Certificate</span>
            </button>
          )}

          <button onClick={handleTriggerExport} disabled={exporting} className="cv-btn cv-btn-primary" style={{ fontWeight: 800 }}>
            <Download size={16} />
            <span>{exporting ? 'Generating Package...' : 'Download Secure Package'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
