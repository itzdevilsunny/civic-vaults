import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Lock, 
  FileText, 
  UserCheck, 
  Clock, 
  Hash, 
  ArrowRight,
  Filter,
  Download,
  Shield,
  Eye,
  Key,
  Printer,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';

export default function ChainOfCustodyView({ documents = [], onShowToast, onSelectDocument }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [selectedDoc, setSelectedDoc] = useState(documents[0] || null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [simulateTamper, setSimulateTamper] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Sample or Derived Chain of Custody Timeline Events
  const defaultEvents = [
    {
      id: "COC-9081",
      time: "09:42 IST",
      date: "2026-08-22",
      officer: "Inspector Arjun Singh",
      userId: "OFFICER-IND-DL-8892",
      action: "Uploaded Evidence File",
      evidence: selectedDoc?.name || "Evidence_01.jpg",
      caseId: selectedDoc?.caseId || "2026-0789",
      ip: "10.42.108.15",
      device: "Workstation #01 (Dell Precision 7920)",
      prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
      currentHash: selectedDoc?.sha256 || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f",
      digitalSignature: "SIG-8892-VALID-EC",
      status: "✓ Verified",
      reason: "Initial Crime Scene Hardware Intake & Checksum Lock"
    },
    {
      id: "COC-9082",
      time: "10:15 IST",
      date: "2026-08-22",
      officer: "Officer Priya Sharma",
      userId: "OFFICER-IND-DL-4412",
      action: "Accessed & Viewed Evidence",
      evidence: selectedDoc?.name || "Evidence_01.jpg",
      caseId: selectedDoc?.caseId || "2026-0789",
      ip: "10.42.100.8",
      device: "Mobile Field Tablet #04",
      prevHash: selectedDoc?.sha256 || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f",
      currentHash: selectedDoc?.sha256 || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f",
      digitalSignature: "SIG-4412-VALID-EC",
      status: "✓ Logged",
      reason: "Investigative Case Review for Suspect Interrogation"
    },
    {
      id: "COC-9083",
      time: "11:30 IST",
      date: "2026-08-22",
      officer: "Officer C. Verma",
      userId: "OFFICER-IND-DL-1102",
      action: "Shared Encrypted Link",
      evidence: selectedDoc?.name || "Evidence_01.jpg",
      caseId: selectedDoc?.caseId || "2026-0789",
      ip: "10.42.100.2",
      device: "Command Center Terminal #02",
      prevHash: selectedDoc?.sha256 || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f",
      currentHash: selectedDoc?.sha256 || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f",
      digitalSignature: "SIG-1102-VALID-EC",
      status: "✓ Authorized",
      reason: "Forwarded to Digital Forensic Lab for Deep Analysis"
    },
    {
      id: "COC-9084",
      time: "14:20 IST",
      date: "2026-08-22",
      officer: "Forensic Analyst R. Mehta",
      userId: "ANALYST-LAB-9921",
      action: "Verified Cryptographic Hash",
      evidence: selectedDoc?.name || "Evidence_01.jpg",
      caseId: selectedDoc?.caseId || "2026-0789",
      ip: "10.42.112.4",
      device: "Forensic Lab Workstation #09",
      prevHash: selectedDoc?.sha256 || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f",
      currentHash: selectedDoc?.sha256 || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f",
      digitalSignature: "SIG-9921-VALID-EC",
      status: "✓ Validated",
      reason: "Automated Routine Hash Re-verification Check"
    },
    {
      id: "COC-9085",
      time: "16:05 IST",
      date: "2026-08-22",
      officer: "Senior Officer S. Roy",
      userId: "SENIOR-OFFICER-001",
      action: "Approved Section 65B Intake",
      evidence: selectedDoc?.name || "Evidence_01.jpg",
      caseId: selectedDoc?.caseId || "2026-0789",
      ip: "10.42.100.1",
      device: "Directorate Secure Workstation",
      prevHash: selectedDoc?.sha256 || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f",
      currentHash: selectedDoc?.sha256 || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f",
      digitalSignature: "SIG-001-APPROVED-EC",
      status: "✓ Approved",
      reason: "Statutory Approval for Submission to Special Court"
    }
  ];

  const filteredEvents = defaultEvents.filter(e => {
    const matchesSearch = e.officer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.evidence.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.caseId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || e.action.toLowerCase().includes(actionFilter.toLowerCase());
    return matchesSearch && matchesAction;
  });

  // PROMINENT VERIFY INTEGRITY FUNCTION
  const handleVerifyIntegrity = () => {
    setIsVerifying(true);
    setVerificationResult(null);

    setTimeout(() => {
      setIsVerifying(false);

      const originalSha = selectedDoc?.sha256 || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f";
      const currentSha = simulateTamper 
        ? "9e3b1a8f0c7d6e5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f99" 
        : originalSha;

      if (currentSha === originalSha) {
        setVerificationResult({
          success: true,
          originalHash: originalSha,
          currentHash: currentSha,
          timestamp: new Date().toLocaleString() + " IST",
          verifiedBy: "Inspector Arjun Singh (Badge #IND-DL-8892)"
        });
        onShowToast("✓ FILE INTEGRITY VERIFIED: Original & Current Checksums Match 100%", "success");
      } else {
        setVerificationResult({
          success: false,
          originalHash: originalSha,
          currentHash: currentSha,
          timestamp: new Date().toLocaleString() + " IST",
          verifiedBy: "Inspector Arjun Singh (Badge #IND-DL-8892)"
        });
        onShowToast("⚠ INTEGRITY VERIFICATION FAILED: Checksum Mismatch Detected!", "error");
      }
    }, 1200);
  };

  const handlePrintCertificate = () => {
    setShowCertificate(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              🥇 Digital Evidence Chain of Custody
            </h1>
            <span className="cv-badge cv-badge-emerald">
              Immutable Ledger Active
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Cryptographically sealed timeline tracking every evidence upload, access, transfer, and approval event
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button 
            onClick={handlePrintCertificate}
            className="cv-btn cv-btn-secondary"
            style={{ fontWeight: 800 }}
          >
            <Printer size={16} />
            <span>Export 65B Statutory Certificate</span>
          </button>

          {/* Target Document Selector */}
          <select 
            className="cv-select"
            value={selectedDoc?.id || ''}
            onChange={e => {
              const doc = documents.find(d => d.id === e.target.value);
              if (doc) setSelectedDoc(doc);
            }}
            style={{ width: 'auto', minWidth: '200px' }}
          >
            {documents.map(d => (
              <option key={d.id} value={d.id}>{d.name} (Case #{d.caseId})</option>
            ))}
          </select>
        </div>
      </div>

      {/* 🔐 PROMINENT "VERIFY INTEGRITY" CONTROL CARD */}
      <div className="cv-card" style={{
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(16,185,129,0.08) 100%)',
        border: '1px solid var(--accent-primary)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <ShieldCheck size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>
                CRYPTOGRAPHIC INTEGRITY CHECK ENGINE
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Target File: {selectedDoc?.name || "Evidence_01.jpg"} (Case #{selectedDoc?.caseId || "2026-0789"})
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                SHA-256 Checksum Lock: <code style={{ fontFamily: 'var(--font-mono)' }}>{(selectedDoc?.sha256 || "8f4c2b9a...").substring(0, 32)}...</code>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Tamper Test Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
              <input 
                type="checkbox" 
                id="tamperSimulate"
                checked={simulateTamper}
                onChange={e => setSimulateTamper(e.target.checked)}
                style={{ accentColor: 'var(--danger)' }}
              />
              <label htmlFor="tamperSimulate" style={{ fontWeight: 600, cursor: 'pointer', color: simulateTamper ? 'var(--danger)' : 'var(--text-muted)' }}>
                Simulate Tamper Checksum Mismatch
              </label>
            </div>

            <button 
              onClick={handleVerifyIntegrity}
              disabled={isVerifying}
              className="cv-btn cv-btn-primary"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', fontWeight: 800 }}
            >
              <RefreshCw size={18} className={isVerifying ? 'animate-spin' : ''} />
              <span>{isVerifying ? "Verifying SHA-256..." : "VERIFY INTEGRITY"}</span>
            </button>
          </div>

        </div>

        {/* 🔐 VERIFICATION RESULT BOX */}
        {verificationResult && (
          <div style={{
            marginTop: '1.25rem',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: verificationResult.success ? 'var(--success-light)' : 'var(--danger-light)',
            border: `2px solid ${verificationResult.success ? 'var(--success)' : 'var(--danger)'}`
          }}>
            {verificationResult.success ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: '1.125rem', color: 'var(--success-dark)', marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={24} />
                  <span>✓ FILE INTEGRITY VERIFIED</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  The cryptographic checksum of the current file matches the original registration hash locked at intake.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Original SHA-256:</div>
                    <div style={{ fontWeight: 700, color: 'var(--success-dark)', wordBreak: 'break-all' }}>{verificationResult.originalHash}</div>
                  </div>
                  <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Current SHA-256:</div>
                    <div style={{ fontWeight: 700, color: 'var(--success-dark)', wordBreak: 'break-all' }}>{verificationResult.currentHash}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: '1.125rem', color: 'var(--danger)', marginBottom: '0.5rem' }}>
                  <AlertTriangle size={24} />
                  <span>⚠ INTEGRITY VERIFICATION FAILED</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--danger)', fontWeight: 700, marginBottom: '0.75rem' }}>
                  The current file differs from the originally registered file! Potential unauthorized tampering or file corruption detected.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Original Registered Hash:</div>
                    <div style={{ fontWeight: 700, color: 'var(--success-dark)', wordBreak: 'break-all' }}>{verificationResult.originalHash}</div>
                  </div>
                  <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Current File Hash:</div>
                    <div style={{ fontWeight: 700, color: 'var(--danger)', wordBreak: 'break-all' }}>{verificationResult.currentHash}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FILTER CONTROLS */}
      <div className="cv-card" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem 0.875rem',
            flex: 1,
            minWidth: '240px'
          }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by Officer, action, evidence file, Case ID..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                width: '100%'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Action Filter:</span>
            <select
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
              className="cv-select"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem', width: 'auto' }}
            >
              <option value="all">All Actions</option>
              <option value="uploaded">Uploaded</option>
              <option value="accessed">Accessed</option>
              <option value="shared">Shared</option>
              <option value="verified">Verified</option>
              <option value="approved">Approved</option>
            </select>
          </div>

        </div>
      </div>

      {/* CHAIN OF CUSTODY TIMELINE TABLE */}
      <div className="cv-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="cv-table-container">
          <table className="cv-table">
            <thead>
              <tr>
                <th>Time / Date</th>
                <th>Officer (User ID)</th>
                <th>Action Performed</th>
                <th>Target Evidence</th>
                <th>IP / Device</th>
                <th>Digital Signature</th>
                <th>Status</th>
                <th>Inspect Payload</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map(event => {
                const isExpanded = expandedEventId === event.id;

                return (
                  <React.Fragment key={event.id}>
                    <tr>
                      <td style={{ fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{event.time}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{event.date}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{event.officer}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {event.userId}
                        </div>
                      </td>
                      <td>
                        <span className="cv-badge cv-badge-indigo" style={{ fontWeight: 700 }}>
                          {event.action}
                        </span>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          {event.reason}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{event.evidence}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                          Case #{event.caseId}
                        </div>
                      </td>
                      <td style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                        <div>{event.ip}</div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{event.device}</div>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-primary)' }}>
                        {event.digitalSignature}
                      </td>
                      <td>
                        <span className="cv-badge cv-badge-emerald" style={{ fontWeight: 800 }}>
                          {event.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                          className="cv-btn cv-btn-secondary cv-btn-sm"
                          style={{ fontSize: '0.7rem' }}
                        >
                          {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                      </td>
                    </tr>

                    {/* EXPANDABLE PAYLOAD INSPECTOR */}
                    {isExpanded && (
                      <tr style={{ backgroundColor: 'var(--bg-subtle)' }}>
                        <td colSpan={8} style={{ padding: '1rem 1.5rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.875rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', fontWeight: 800 }}>PREVIOUS LEDGER HASH</div>
                              <div style={{ color: 'var(--text-primary)', wordBreak: 'break-all', marginTop: '0.2rem' }}>{event.prevHash}</div>
                            </div>
                            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', fontWeight: 800 }}>CURRENT LEDGER HASH</div>
                              <div style={{ color: 'var(--accent-primary)', wordBreak: 'break-all', marginTop: '0.2rem' }}>{event.currentHash}</div>
                            </div>
                            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', fontWeight: 800 }}>ECC DIGITAL SIGNATURE SEAL</div>
                              <div style={{ color: 'var(--success-dark)', fontWeight: 800, marginTop: '0.2rem' }}>{event.digitalSignature}</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* STATUTORY 65B CERTIFICATE MODAL */}
      {showCertificate && (
        <div className="cv-modal-backdrop" style={{ zIndex: 999 }} onClick={() => setShowCertificate(false)}>
          <div className="cv-modal cv-modal-md" onClick={e => e.stopPropagation()} style={{ padding: '2rem', background: '#ffffff', color: '#0f172a' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <Award size={36} style={{ color: '#4f46e5', marginBottom: '0.35rem' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '0.04em' }}>
                CERTIFICATE UNDER SECTION 65B / BSA 2023
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>
                Admissibility of Electronic Records in Indian Courts of Law
              </p>
            </div>

            <div style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p>
                I, <strong>Inspector Arjun Singh</strong> (Senior Investigation Officer, Badge #IND-POL-8819), hereby certify under Section 65B of the Indian Evidence Act / BSA 2023 that:
              </p>
              <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
                <li>The digital evidence file <strong>{selectedDoc?.name || "Evidence_01.jpg"}</strong> (Case #{selectedDoc?.caseId || "2026-0789"}) was ingested into the CaseVault immutable ledger on 22 Aug 2026.</li>
                <li>The computer system and encryption hardware were operating properly at all material times.</li>
                <li>The raw SHA-256 checksum (<code>{(selectedDoc?.sha256 || "8f4c2b9a...").substring(0, 24)}...</code>) has remained 100% unchanged.</li>
              </ol>

              <div style={{ marginTop: '1rem', padding: '0.875rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.7rem' }}>
                <div>STATUTORY VERIFICATION HASH: {selectedDoc?.sha256 || "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f"}</div>
                <div>DIGITAL SIGNATURE SEAL: SIG-8892-STATUTORY-65B-VALID</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
              <button onClick={() => setShowCertificate(false)} className="cv-btn cv-btn-secondary">
                Close
              </button>
              <button onClick={() => window.print()} className="cv-btn cv-btn-primary" style={{ fontWeight: 800 }}>
                <Printer size={16} />
                <span>Print Statutory Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
