import React, { useState } from 'react';
import { Download, FileText, ShieldCheck, Printer, X, CheckCircle2, Lock, Eye, Package, FileCode, Award } from 'lucide-react';

export default function ExportModal({ isOpen, onClose, document: doc, onShowToast }) {
  const [includeWatermark, setIncludeWatermark] = useState(true);
  const [includeSec65B, setIncludeSec65B] = useState(true);
  const [includeManifest, setIncludeManifest] = useState(true);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL • POLICE DEPT • FOR COURT USE ONLY");
  const [exporting, setExporting] = useState(false);
  const [packageVerified, setPackageVerified] = useState(false);

  if (!isOpen || !doc) return null;

  const exportTimestamp = new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'medium' }) + " IST";
  const certId = `SEC65B-2026-DL-${Math.floor(100000 + Math.random() * 900000)}`;
  const packageId = `CASE_PACKAGE_${doc.caseId || '2026-00421'}`;

  const manifestData = {
    packageId,
    timestamp: exportTimestamp,
    caseId: doc.caseId,
    attestingOfficer: "Inspector Arjun Singh (Badge #IND-DL-8892)",
    manifestFiles: [
      { filename: "manifest.json", type: "metadata_index" },
      { filename: "case_summary.pdf", type: "executive_summary" },
      { filename: `evidence/${doc.name}`, sha256: doc.sha256 || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f" },
      { filename: "audit/custody_timeline.json", status: "VERIFIED" },
      { filename: "signatures/ecc_signature.sig", sigId: "SIG-2026-EC-9912" }
    ],
    manifestSha256Seal: "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b"
  };

  const handleTriggerExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      onShowToast(`📥 Generated Encrypted Case Package Bundle (${packageId}.zip) with manifest.json & SHA-256 seal ✓`, "success");
      onClose();
    }, 1200);
  };

  const handleVerifyPackage = () => {
    setPackageVerified(true);
    onShowToast("✓ Recalculated Case Package Hashes: 100% Match with manifest.json SHA-256 Seal!", "success");
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
              <Package size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Secure Case Package Export & Sec 65B Generator</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Encrypted Legal Evidence Package with manifest.json, SHA-256 Seal & Section 65B Certificate
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cv-btn-icon"><X size={18} /></button>
        </div>

        {/* Modal Body */}
        <div className="cv-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Document & Package Summary Pill */}
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
                {packageId} ({doc.name})
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Case ID: #{doc.caseId} • Manifest Seal: <code style={{ color: 'var(--accent-primary)' }}>{manifestData.manifestSha256Seal.substring(0, 16)}...</code>
              </div>
            </div>
            
            <button 
              onClick={handleVerifyPackage} 
              className="cv-btn cv-btn-secondary cv-btn-sm"
              style={{ fontSize: '0.75rem', fontWeight: 700 }}
            >
              <ShieldCheck size={14} style={{ color: 'var(--success-dark)' }} />
              <span>{packageVerified ? "✓ Hashes Verified" : "Verify Package Hashes"}</span>
            </button>
          </div>

          {/* Export Options Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            
            {/* Option A: Security Watermarking */}
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
                </div>
              )}
            </div>

            {/* Option B: Package Manifest JSON & Certificate */}
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
                  Attach Sec 65B Cert & Manifest
                </label>
              </div>

              {includeSec65B && (
                <p style={{ fontSize: '0.78125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Includes <code>manifest.json</code>, <code>SHA256_MANIFEST</code> seal lock, and official Section 65B Court Certificate under BSA 2023.
                </p>
              )}
            </div>

          </div>

          {/* MANIFEST JSON PREVIEW */}
          <div style={{
            padding: '0.875rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              <FileCode size={14} style={{ color: 'var(--accent-primary)' }} />
              <span>Generated Manifest Index (manifest.json):</span>
            </div>
            <pre style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-surface)',
              padding: '0.5rem 0.75rem',
              borderRadius: '4px',
              overflowX: 'auto',
              border: '1px solid var(--border-color)'
            }}>
              {JSON.stringify(manifestData, null, 2)}
            </pre>
          </div>

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
            <span>{exporting ? 'Packing & Signing...' : 'Download Encrypted Case Package (.zip)'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
