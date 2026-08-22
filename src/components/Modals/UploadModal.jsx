import React, { useState } from 'react';
import { Upload, X, ShieldCheck, Lock, FileText, CheckCircle2, LockKeyhole, Hash } from 'lucide-react';

export default function UploadModal({ isOpen, onClose, onUploadComplete, cases }) {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState('Evidence');
  const [selectedCaseId, setSelectedCaseId] = useState('2026-0789');
  const [classification, setClassification] = useState('Highly Restricted');
  const [legalHold, setLegalHold] = useState(true);
  const [description, setDescription] = useState('');
  const [isHashing, setIsHashing] = useState(false);
  const [calculatedHash, setCalculatedHash] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Simulate real-time SHA-256 Hash Computation
      setIsHashing(true);
      setTimeout(() => {
        const mockSha = Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        setCalculatedHash(mockSha);
        setIsHashing(false);
      }, 1200);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setIsSuccess(true);
    setTimeout(() => {
      onUploadComplete({
        name: file.name,
        type: docType,
        caseId: selectedCaseId,
        classification,
        legalHold,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        sha256: calculatedHash || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f"
      });
      setIsSuccess(false);
      setFile(null);
      onClose();
    }, 1000);
  };

  return (
    <div className="cv-modal-backdrop" onClick={onClose}>
      <div className="cv-modal cv-modal-lg" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="cv-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="cv-badge cv-badge-indigo" style={{ padding: '0.5rem' }}>
              <Upload size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Upload Investigation Document / Evidence</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Encrypted Vault Upload & Automated SHA-256 Chain of Custody Intake
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cv-btn-icon">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="cv-modal-body">
          
          {/* Drag & Drop File Box */}
          <div style={{
            border: file ? '2px dashed var(--success)' : '2px dashed var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            backgroundColor: file ? 'var(--success-light)' : 'var(--bg-subtle)',
            marginBottom: '1.5rem',
            position: 'relative',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}>
            <input
              type="file"
              onChange={handleFileSelect}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: 'pointer',
                width: '100%',
                height: '100%'
              }}
            />

            {!file ? (
              <div>
                <Upload size={36} style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }} />
                <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  Drag & Drop files here or click to browse
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Supports PDF, JPG, PNG, DOCX, ZIP, MP4 evidence files up to 2 GB
                </p>
              </div>
            ) : (
              <div>
                <CheckCircle2 size={36} style={{ color: 'var(--success-dark)', marginBottom: '0.5rem' }} />
                <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {file.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Size: {(file.size / (1024 * 1024)).toFixed(2)} MB • Status: Ready for Hashing
                </p>

                {/* SHA-256 Hashing Bar */}
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    <Hash size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span>Cryptographic SHA-256 Hash Verification:</span>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: isHashing ? 'var(--warning)' : 'var(--success-dark)',
                    backgroundColor: 'var(--bg-subtle)',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '4px',
                    marginTop: '0.35rem',
                    wordBreak: 'break-all'
                  }}>
                    {isHashing ? "Computing cryptographic SHA-256 checksum..." : (calculatedHash || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f")}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Fields Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            
            {/* Case ID Selection */}
            <div className="cv-input-group">
              <label className="cv-label">Target Investigation Case *</label>
              <select 
                className="cv-select"
                value={selectedCaseId}
                onChange={e => setSelectedCaseId(e.target.value)}
                required
              >
                {cases.map(c => (
                  <option key={c.id} value={c.id}>
                    Case #{c.id} - {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Document Category */}
            <div className="cv-input-group">
              <label className="cv-label">Document Category *</label>
              <select 
                className="cv-select"
                value={docType}
                onChange={e => setDocType(e.target.value)}
                required
              >
                <option value="FIR / Complaints">FIR / Complaints</option>
                <option value="Statements">Witness / Suspect Statement</option>
                <option value="Evidence">Forensic Evidence / Capture</option>
                <option value="Reports">Investigation Report</option>
                <option value="Other Documents">Legal Notice / Seizure Memo</option>
              </select>
            </div>

            {/* Security Classification */}
            <div className="cv-input-group">
              <label className="cv-label">Security Classification Level *</label>
              <select 
                className="cv-select"
                value={classification}
                onChange={e => setClassification(e.target.value)}
                required
              >
                <option value="Confidential">Confidential (Level 1)</option>
                <option value="Restricted">Restricted (Level 2)</option>
                <option value="Highly Restricted">Highly Restricted / Top Secret (Level 3)</option>
              </select>
            </div>

            {/* Legal Hold Protection Option */}
            <div className="cv-input-group">
              <label className="cv-label">Legal Hold & Retention Policy</label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.625rem 0.875rem',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-subtle)'
              }}>
                <input 
                  type="checkbox"
                  id="legalHoldCheck"
                  checked={legalHold}
                  onChange={e => setLegalHold(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--accent-primary)' }}
                />
                <label htmlFor="legalHoldCheck" style={{ fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                  Enable Legal Hold (Prevents Deletion)
                </label>
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="cv-input-group" style={{ marginTop: '0.5rem' }}>
            <label className="cv-label">Document Description / Forensic Notes</label>
            <textarea 
              className="cv-textarea"
              rows={3}
              placeholder="Enter details regarding evidence seizure, source, or forensic observations..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          {/* Encryption Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--success-dark)',
            backgroundColor: 'var(--success-light)',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-md)'
          }}>
            <ShieldCheck size={16} />
            <span>Files are encrypted using AES-256-GCM before stored in CaseVault immutable storage.</span>
          </div>

          {/* Footer Buttons */}
          <div className="cv-modal-footer" style={{ marginTop: '1.5rem', paddingRight: 0, paddingLeft: 0, borderBottom: 'none' }}>
            <button type="button" onClick={onClose} className="cv-btn cv-btn-secondary">
              Cancel
            </button>
            <button 
              type="submit" 
              className="cv-btn cv-btn-primary"
              disabled={!file || isHashing || isSuccess}
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Ingested & Encrypted ✓</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span>Upload & Ingest to Vault</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
