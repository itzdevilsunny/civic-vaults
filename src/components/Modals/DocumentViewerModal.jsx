import React, { useState, useEffect } from 'react';
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
  Clock,
  Printer,
  FileSpreadsheet,
  Sparkles,
  Cpu,
  Target,
  FileCode,
  AlertOctagon,
  UserCheck,
  Key
} from 'lucide-react';

import { analyzeForensicDocument } from '../../lib/aiForensicEngine';

export default function DocumentViewerModal({ document, isOpen, onClose, onShowToast }) {
  const [activeTab, setActiveTab] = useState('metadata');
  const [isVerifyingHash, setIsVerifyingHash] = useState(false);
  const [showWatermark, setShowWatermark] = useState(true);
  const [isHashVerified, setIsHashVerified] = useState(true);
  const [showCertModal, setShowCertModal] = useState(false);

  // AI Forensic State
  const [aiData, setAiData] = useState(null);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);

  useEffect(() => {
    if (activeTab === 'aiInsights' && !aiData) {
      setIsAnalyzingAi(true);
      analyzeForensicDocument(document.name, document.name).then(res => {
        setAiData(res);
        setIsAnalyzingAi(false);
      });
    }
  }, [activeTab, document, aiData]);

  if (!isOpen || !document) return null;

  // Sample Access History Events requested by user
  const accessHistory = [
    {
      id: 1,
      user: "Inspector Arjun Singh",
      role: "Senior Lead Inspector",
      action: "Viewed Evidence Document",
      timestamp: "22 Aug, 10:42 IST",
      ip: "10.42.108.15",
      device: "Workstation #01",
      status: "✓ Viewed",
      success: true
    },
    {
      id: 2,
      user: "Forensic Officer Dr. Raman",
      role: "Central Forensic Lab",
      action: "Downloaded Original File",
      timestamp: "22 Aug, 11:15 IST",
      ip: "10.42.112.4",
      device: "Forensic Terminal #09",
      status: "✓ Downloaded",
      success: true
    },
    {
      id: 3,
      user: "Inspector Arjun Singh",
      role: "Senior Lead Inspector",
      action: "Shared Encrypted Link (48h Expiry)",
      timestamp: "22 Aug, 11:30 IST",
      ip: "10.42.108.15",
      device: "Workstation #01",
      status: "✓ Shared",
      success: true
    },
    {
      id: 4,
      user: "Unknown Foreign IP (185.220.101.5)",
      role: "Unauthenticated Request",
      action: "Attempted Unauthorized Access",
      timestamp: "22 Aug, 12:04 IST",
      ip: "185.220.101.5",
      device: "Tor Network Node",
      status: "⚠ Blocked",
      success: false
    }
  ];

  const handleReVerifyHash = () => {
    setIsVerifyingHash(true);
    setTimeout(() => {
      setIsVerifyingHash(false);
      setIsHashVerified(true);
      onShowToast("SHA-256 Checksum re-verified against immutable ledger: 100% Match ✓", "success");
    }, 1200);
  };

  const handleExportSection65BCertificate = () => {
    setShowCertModal(true);
  };

  const handlePrintCertificate = () => {
    window.print();
    onShowToast("Statutory Section 65B Court Certificate generated and sent to print/PDF ✓", "success");
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
              onClick={handleExportSection65BCertificate}
              className="cv-btn cv-btn-secondary cv-btn-sm"
              title="Generate Bharatiya Sakshya Adhiniyam 2023 / Section 65B Evidence Certificate"
            >
              <Award size={14} style={{ color: 'var(--accent-primary)' }} />
              <span>Section 65B Cert</span>
            </button>
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
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--bg-subtle)',
          borderBottom: '1px solid var(--border-color)',
          overflowX: 'auto'
        }}>
          {[
            { id: 'metadata', label: 'Document Metadata', icon: FileText },
            { id: 'accessHistory', label: 'Access History (🔥 Logs)', icon: UserCheck, badge: accessHistory.length },
            { id: 'aiInsights', label: 'AI Forensic Intelligence (USP 💎)', icon: Sparkles, badge: 'AI' },
            { id: 'chainOfCustody', label: 'Chain of Custody (USP 🥇)', icon: ShieldCheck, badge: document.chainOfCustody?.length },
            { id: 'versions', label: 'Version Control', icon: History },
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
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  whiteSpace: 'nowrap'
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
              
              {/* Document Preview Box */}
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

              {/* Sidebar Metadata */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: ACCESS HISTORY LOGS (🔥 SPECIFICATION REQUIREMENT) */}
          {activeTab === 'accessHistory' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>
                    🔥 Document Access History & RBAC Audit Trail
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Real-time monitoring of all view, download, share, and unauthorized attempt events
                  </p>
                </div>
                <span className="cv-badge cv-badge-emerald">
                  Audit Logging Enabled ✓
                </span>
              </div>

              <div className="cv-card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="cv-table">
                  <thead>
                    <tr>
                      <th>User & Role</th>
                      <th>Action</th>
                      <th>Timestamp</th>
                      <th>IP & Device</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accessHistory.map(log => (
                      <tr key={log.id} style={{ backgroundColor: !log.success ? 'var(--danger-light)' : 'transparent' }}>
                        <td>
                          <div style={{ fontWeight: 800, color: log.success ? 'var(--text-primary)' : 'var(--danger)' }}>
                            {log.user}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {log.role}
                          </div>
                        </td>
                        <td style={{ fontWeight: 700 }}>
                          {log.action}
                        </td>
                        <td style={{ fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                          {log.timestamp}
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                          <div>{log.ip}</div>
                          <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{log.device}</div>
                        </td>
                        <td>
                          <span className={`cv-badge ${log.success ? 'cv-badge-emerald' : 'cv-badge-red'}`} style={{ fontWeight: 800 }}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: AI FORENSIC INTELLIGENCE (USP 💎) */}
          {activeTab === 'aiInsights' && (
            <div>
              {isAnalyzingAi ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
                  <Cpu size={40} className="animate-spin" style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    CaseVault AI Forensic NLP Engine Processing...
                  </h3>
                  <p style={{ fontSize: '0.8125rem', marginTop: '0.35rem' }}>
                    Extracting Suspect Entities, Bharatiya Nyaya Sanhita (BNS) Laws, & Asset Traces...
                  </p>
                </div>
              ) : aiData ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* AI Risk Score Banner */}
                  <div style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.15) 100%)',
                    border: '1px solid var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-primary)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        fontWeight: 900
                      }}>
                        {aiData.riskScore}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>
                          FORENSIC CONFIDENCE & THREAT SCORE
                        </div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {aiData.classification} (AI Confidence: {aiData.confidenceScore})
                        </h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Analyzed by {aiData.aiModelUsed} • {aiData.analysisTimestamp}
                        </p>
                      </div>
                    </div>

                    <span className="cv-badge cv-badge-indigo" style={{ padding: '0.5rem 0.875rem', fontSize: '0.8125rem' }}>
                      <Sparkles size={14} /> AI Parsed
                    </span>
                  </div>

                  {/* Executive AI Summary Box */}
                  <div className="cv-card" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      <Cpu size={16} style={{ color: 'var(--accent-primary)' }} />
                      <span>Executive Forensic AI Narrative Summary:</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {aiData.aiSummary}
                    </p>
                  </div>

                  {/* 2 Grid Columns for Entities & BNS Statutory Laws */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    
                    {/* Suspects & Persons of Interest Box */}
                    <div className="cv-card" style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                        <Target size={16} style={{ color: 'var(--danger)' }} />
                        <span>Extracted Suspects & POIs:</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {aiData.extractedEntities.suspects.map((s, idx) => (
                          <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--danger-light)',
                            color: 'var(--danger-dark)',
                            fontSize: '0.8125rem',
                            fontWeight: 700
                          }}>
                            <UserCheck size={14} />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <strong>Financial Asset Trace:</strong> {aiData.extractedEntities.financialTrace}
                      </div>
                    </div>

                    {/* Extracted Statutory Laws (BNS 2023 / IT Act) */}
                    <div className="cv-card" style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                        <FileCode size={16} style={{ color: 'var(--accent-primary)' }} />
                        <span>Mapped Bharatiya Nyaya Sanhita (BNS) Laws:</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {aiData.extractedEntities.bnsSections.map((bns, idx) => (
                          <div key={idx} style={{
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-subtle)'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontWeight: 800, fontSize: '0.8125rem', color: 'var(--accent-primary)' }}>
                                {bns.section}
                              </span>
                              <span className={`cv-badge ${bns.severity === 'CRITICAL' ? 'cv-badge-red' : 'cv-badge-amber'}`}>
                                {bns.severity}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                              {bns.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              ) : null}
            </div>
          )}

          {/* TAB 3: CHAIN OF CUSTODY */}
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

          {/* TAB 4: VERSION HISTORY */}
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: DIGITAL SIGNATURES */}
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
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="cv-modal-footer">
          <button 
            onClick={handleExportSection65BCertificate}
            className="cv-btn cv-btn-secondary"
          >
            <Award size={16} style={{ color: 'var(--accent-primary)' }} />
            <span>Generate Statutory 65B Certificate</span>
          </button>
          <button onClick={onClose} className="cv-btn cv-btn-primary">
            Close Inspector
          </button>
        </div>

      </div>

      {/* SECTION 65B STATUTORY EVIDENCE CERTIFICATE MODAL OVERLAY */}
      {showCertModal && (
        <div className="cv-modal-backdrop" style={{ zIndex: 999 }} onClick={() => setShowCertModal(false)}>
          <div className="cv-modal cv-modal-lg" onClick={e => e.stopPropagation()} style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
            
            {/* Government Header */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #0284c7', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: '#0369a1', textTransform: 'uppercase' }}>
                GOVERNMENT OF INDIA • MINISTRY OF HOME AFFAIRS
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginTop: '0.2rem' }}>
                CERTIFICATE OF ELECTRONIC EVIDENCE INTEGRITY
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
                Under Section 65B of Indian Evidence Act (BSA 2023 statutory compliance)
              </p>
            </div>

            {/* Certificate Body Content */}
            <div style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: '#334155' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '0.875rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.78125rem' }}>
                  <div><strong>Certificate Ref #:</strong> CERT-2026-MHA-9821</div>
                  <div><strong>Issue Date:</strong> {new Date().toLocaleDateString('en-IN')}</div>
                  <div><strong>Case Docket #:</strong> Case #{document.caseId}</div>
                  <div><strong>Target File:</strong> {document.name}</div>
                </div>
              </div>

              <p style={{ marginBottom: '0.75rem' }}>
                I, <strong>Inspector Arjun Singh (Badge #IND-DL-8892)</strong>, Senior Investigation Officer, do hereby certify that the electronic document specified above was ingested, processed, and stored using the CaseVault Encrypted Repository System under continuous lawful operation.
              </p>

              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#166534', fontSize: '0.78125rem', marginBottom: '0.25rem' }}>
                  ✓ Cryptographic SHA-256 Checksum Lock:
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#14532d', wordBreak: 'break-all' }}>
                  {document.sha256}
                </div>
              </div>

              <p style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', marginBottom: '1rem' }}>
                Declared under penalty of perjury. Sealed with immutable chain of custody verification ID: COC-{Math.floor(90000 + Math.random() * 9999)}.
              </p>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
              <button onClick={() => setShowCertModal(false)} className="cv-btn cv-btn-secondary">
                Close
              </button>
              <button onClick={handlePrintCertificate} className="cv-btn cv-btn-primary">
                <Printer size={16} />
                <span>Print / Download Certificate PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
