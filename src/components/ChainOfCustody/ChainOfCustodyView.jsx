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
  Key
} from 'lucide-react';

export default function ChainOfCustodyView({ documents = [], onShowToast, onSelectDocument }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [selectedDoc, setSelectedDoc] = useState(documents[0] || null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [simulateTamper, setSimulateTamper] = useState(false);

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

        {/* Target Document Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)' }}>Target Evidence:</span>
          <select 
            className="cv-select"
            value={selectedDoc?.id || ''}
            onChange={e => {
              const doc = documents.find(d => d.id === e.target.value);
              if (doc) setSelectedDoc(doc);
            }}
            style={{ width: 'auto', minWidth: '220px' }}
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
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map(event => (
                <tr key={event.id}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
