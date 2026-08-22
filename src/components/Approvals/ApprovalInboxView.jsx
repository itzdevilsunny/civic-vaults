import React, { useState } from 'react';
import { 
  Stamp, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  Hash, 
  Eye, 
  AlertTriangle,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';

export default function ApprovalInboxView({ documents = [], onShowToast, onSelectDocument }) {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedDoc, setSelectedDoc] = useState(documents[0] || null);
  const [approvalStatus, setApprovalStatus] = useState({});
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Sample or Derived Pending Approvals
  const pendingDocs = documents.filter(d => d.classification === 'Highly Restricted' || d.id.includes('DOC'));

  const handleApproveAndSign = (doc) => {
    const timeStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) + " IST";
    
    setApprovalStatus(prev => ({
      ...prev,
      [doc.id]: {
        status: 'Approved',
        signedBy: 'Senior Investigation Officer (Inspector Arjun Singh)',
        timestamp: timeStr,
        hash: doc.sha256,
        sigId: `SIG-2026-EC-${Math.floor(1000 + Math.random() * 9000)}`
      }
    }));

    onShowToast(`✅ Document ${doc.name} Approved & Digitally Signed with ECC Seal!`, "success");
  };

  const handleReject = (doc) => {
    setApprovalStatus(prev => ({
      ...prev,
      [doc.id]: {
        status: 'Rejected',
        signedBy: 'Senior Investigation Officer',
        timestamp: new Date().toLocaleString() + " IST",
        reason: rejectionReason || "Incomplete forensic verification chain."
      }
    }));
    setShowRejectModal(false);
    setRejectionReason('');
    onShowToast(`❌ Document ${doc.name} Rejected and returned to officer`, "warning");
  };

  const handleRequestChanges = (doc) => {
    setApprovalStatus(prev => ({
      ...prev,
      [doc.id]: {
        status: 'Changes Requested',
        signedBy: 'Senior Investigation Officer',
        timestamp: new Date().toLocaleString() + " IST",
        reason: "Missing Section 65B statutory witness affirmation."
      }
    }));
    onShowToast(`🔄 Returned ${doc.name} for revisions`, "info");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              ✍️ Digital Signature & Approval Inbox
            </h1>
            <span className="cv-badge cv-badge-indigo">
              Official Document Lifecycle
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Review dockets, inspect cryptographic hashes, apply Senior Officer Digital Signatures, and lock approved evidence
          </p>
        </div>

        <span className="cv-badge cv-badge-amber" style={{ padding: '0.4rem 0.875rem', fontWeight: 800 }}>
          {pendingDocs.length} Pending Review
        </span>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.5rem',
        overflowX: 'auto'
      }}>
        {[
          { id: 'pending', label: 'Pending Approvals', badge: pendingDocs.length, color: 'cv-badge-amber' },
          { id: 'approved', label: 'Approved & Signed', badge: Object.values(approvalStatus).filter(s => s.status === 'Approved').length, color: 'cv-badge-emerald' },
          { id: 'rejected', label: 'Rejected', badge: Object.values(approvalStatus).filter(s => s.status === 'Rejected').length, color: 'cv-badge-red' },
          { id: 'changes', label: 'Returned for Changes', badge: Object.values(approvalStatus).filter(s => s.status === 'Changes Requested').length, color: 'cv-badge-blue' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === t.id ? 'var(--accent-primary)' : 'var(--bg-surface)',
              color: activeTab === t.id ? '#ffffff' : 'var(--text-secondary)'
            }}
          >
            <span>{t.label}</span>
            <span className={`cv-badge ${t.color}`} style={{ fontSize: '0.6875rem', padding: '0.1rem 0.4rem' }}>
              {t.badge}
            </span>
          </button>
        ))}
      </div>

      {/* MAIN APPROVAL CONSOLE GRID (Table + Inspection Detail) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '1.5rem' }}>
        
        {/* LEFT COLUMN: Approvals List Table */}
        <div className="cv-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="cv-table-container">
            <table className="cv-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Case ID</th>
                  <th>Priority</th>
                  <th>Uploaded By</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDocs.map(doc => {
                  const currentSig = approvalStatus[doc.id];
                  const isSelected = selectedDoc?.id === doc.id;

                  return (
                    <tr 
                      key={doc.id}
                      onClick={() => setSelectedDoc(doc)}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: isSelected ? 'var(--accent-light)' : 'transparent'
                      }}
                    >
                      <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FileText size={16} style={{ color: 'var(--accent-primary)' }} />
                          <span>{doc.name}</span>
                        </div>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78125rem', color: 'var(--accent-primary)' }}>
                        Case #{doc.caseId}
                      </td>
                      <td>
                        <span className="cv-badge cv-badge-red">High</span>
                      </td>
                      <td style={{ fontSize: '0.8125rem' }}>
                        {doc.uploadedBy}
                      </td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Today, 18:00 IST
                      </td>
                      <td>
                        {currentSig ? (
                          <span className={`cv-badge ${
                            currentSig.status === 'Approved' ? 'cv-badge-emerald' : 
                            currentSig.status === 'Rejected' ? 'cv-badge-red' : 'cv-badge-blue'
                          }`}>
                            {currentSig.status}
                          </span>
                        ) : (
                          <span className="cv-badge cv-badge-amber">Pending Sign</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                        {!currentSig ? (
                          <button 
                            onClick={() => handleApproveAndSign(doc)}
                            className="cv-btn cv-btn-primary cv-btn-sm"
                            style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                          >
                            <Stamp size={12} />
                            <span>Approve</span>
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 700 }}>✓ Done</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: Document Approval & Signature Inspector Card */}
        {selectedDoc && (
          <div className="cv-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="cv-badge cv-badge-indigo" style={{ fontSize: '0.7rem' }}>
                  DOCUMENT APPROVAL REVIEW
                </span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                  {selectedDoc.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Case ID: #{selectedDoc.caseId} • Version: {selectedDoc.version}
                </p>
              </div>
              <Lock size={20} style={{ color: 'var(--accent-primary)' }} />
            </div>

            {/* Checksum & Upload Meta */}
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              padding: '0.875rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.78125rem',
              lineHeight: 1.6
            }}>
              <div><strong>Uploaded By:</strong> {selectedDoc.uploadedBy}</div>
              <div><strong>Classification:</strong> {selectedDoc.classification}</div>
              <div style={{ marginTop: '0.35rem' }}>
                <strong>SHA-256 Hash Lock:</strong>
                <code style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', wordBreak: 'break-all', backgroundColor: 'var(--bg-surface)', padding: '0.3rem', borderRadius: '4px', marginTop: '0.2rem' }}>
                  {selectedDoc.sha256}
                </code>
              </div>
            </div>

            {/* ✅ SIGNATURE VERIFICATION CARD (IF APPROVED) */}
            {approvalStatus[selectedDoc.id]?.status === 'Approved' && (
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--success-light)',
                border: '2px solid var(--success)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, color: 'var(--success-dark)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={20} />
                  <span>✅ Signature Verified</span>
                </div>
                <div style={{ fontSize: '0.78125rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  <div><strong>Signed By:</strong> {approvalStatus[selectedDoc.id].signedBy}</div>
                  <div><strong>Timestamp:</strong> {approvalStatus[selectedDoc.id].timestamp}</div>
                  <div><strong>Digital Sig ID:</strong> {approvalStatus[selectedDoc.id].sigId}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--success-dark)', marginTop: '0.35rem', fontWeight: 800 }}>
                    🔒 DOCUMENT LOCKED & IMMUTABLE IN VAULT
                  </div>
                </div>
              </div>
            )}

            {/* 3 SPECIFIED APPROVAL BUTTONS */}
            {!approvalStatus[selectedDoc.id] ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <button
                  onClick={() => handleApproveAndSign(selectedDoc)}
                  className="cv-btn cv-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', fontWeight: 800 }}
                >
                  <Stamp size={18} />
                  <span>Approve & Sign Document</span>
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="cv-btn cv-btn-secondary"
                    style={{ color: 'var(--danger)', border: '1px solid var(--danger-light)' }}
                  >
                    <XCircle size={16} />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => handleRequestChanges(selectedDoc)}
                    className="cv-btn cv-btn-secondary"
                  >
                    <RotateCcw size={16} />
                    <span>Request Changes</span>
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setSelectedDoc(null)} 
                className="cv-btn cv-btn-secondary"
                style={{ width: '100%' }}
              >
                Close Inspector
              </button>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
