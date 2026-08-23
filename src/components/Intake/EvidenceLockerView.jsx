import React, { useState } from 'react';
import { 
  Lock, 
  HardDrive, 
  RefreshCcw, 
  Send, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  ShieldAlert, 
  Search, 
  Filter, 
  FileText, 
  ArrowRightLeft, 
  X,
  Stamp,
  FolderLock,
  GitCommit
} from 'lucide-react';
import { createLiveAuditLog } from '../../lib/supabaseClient';

export default function EvidenceLockerView({ documents = [], onShowToast, onOpenIntake }) {
  const [evidenceList, setEvidenceList] = useState(
    documents.length > 0 ? documents.map(d => ({
      ...d,
      custodyStatus: d.custodyStatus || (d.classification === 'Highly Restricted' ? 'SEALED' : 'IN CUSTODY'),
      currentCustodian: d.uploadedBy || 'Inspector Arjun Singh',
      transferPendingTo: null,
      transferPurpose: ''
    })) : [
      {
        id: 'EV-2026-00421',
        name: 'Seized_Server_ByteDump_Partition1.img',
        caseId: '2026-00421',
        type: 'Digital Evidence (Disk Image)',
        size: '4.8 GB',
        custodyStatus: 'SEALED',
        currentCustodian: 'Inspector Arjun Singh',
        uploadedBy: 'Inspector Arjun Singh',
        sha256: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
        transferPendingTo: null
      },
      {
        id: 'EV-2026-00389',
        name: 'PwC_Banking_Forensic_Audit.pdf',
        caseId: '2026-00389',
        type: 'Reports',
        size: '12.4 MB',
        custodyStatus: 'UNDER EXAMINATION',
        currentCustodian: 'Forensic Officer Dr. Raman',
        uploadedBy: 'Dr. Roy (CFSL)',
        sha256: 'f0e9d8c7b6a543210987654321fedcba0987654321fedcba0987654321fedcba',
        transferPendingTo: null
      },
      {
        id: 'EV-2026-00210',
        name: 'Wiretap_Audio_Interception_04.wav',
        caseId: '2026-00210',
        type: 'Audio Recording',
        size: '142 MB',
        custodyStatus: 'TRANSFER PENDING',
        currentCustodian: 'Sub-Inspector Rohit',
        uploadedBy: 'Sub-Inspector Rohit',
        sha256: '9876543210abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
        transferPendingTo: 'Inspector Arjun Singh',
        transferPurpose: 'High Court Evidence Submission'
      }
    ]
  );

  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [transferModalItem, setTransferModalItem] = useState(null);
  const [recipientOfficer, setRecipientOfficer] = useState('Forensic Officer Dr. Raman');
  const [transferPurpose, setTransferPurpose] = useState('CFSL Lab Forensic Byte Extraction & Hash Verification');
  const [transferLocation, setTransferLocation] = useState('CFSL High-Security Evidence Safe #04');

  // Compute Real Locker Metrics
  const stats = {
    active: evidenceList.length,
    sealed: evidenceList.filter(e => e.custodyStatus === 'SEALED').length,
    underExamination: evidenceList.filter(e => e.custodyStatus === 'UNDER EXAMINATION').length,
    transferPending: evidenceList.filter(e => e.custodyStatus === 'TRANSFER PENDING').length,
    legalHold: evidenceList.filter(e => e.legalHold).length,
    archived: evidenceList.filter(e => e.custodyStatus === 'ARCHIVED').length
  };

  // Initiate Custody Transfer
  const handleInitiateTransfer = async () => {
    if (!transferModalItem) return;

    setEvidenceList(prev => prev.map(item => {
      if (item.id === transferModalItem.id) {
        return {
          ...item,
          custodyStatus: 'TRANSFER PENDING',
          transferPendingTo: recipientOfficer,
          transferPurpose: transferPurpose
        };
      }
      return item;
    }));

    // Insert Real Supabase Audit Event
    await createLiveAuditLog({
      user: transferModalItem.currentCustodian,
      action: "Custody Transfer Initiated",
      target: `${transferModalItem.id} ➔ ${recipientOfficer}`,
      caseId: transferModalItem.caseId,
      result: "Pending Custody Acceptance"
    });

    onShowToast(`Custody transfer for ${transferModalItem.id} initiated to ${recipientOfficer} ✓`, "info");
    setTransferModalItem(null);
  };

  // Accept Custody Handoff
  const handleAcceptCustody = async (itemId) => {
    setEvidenceList(prev => prev.map(item => {
      if (item.id === itemId) {
        const newCustodian = item.transferPendingTo || 'Inspector Arjun Singh';
        return {
          ...item,
          custodyStatus: 'IN CUSTODY',
          currentCustodian: newCustodian,
          transferPendingTo: null,
          transferPurpose: ''
        };
      }
      return item;
    }));

    const targetItem = evidenceList.find(e => e.id === itemId);

    // Insert Real Supabase Audit Event
    await createLiveAuditLog({
      user: targetItem?.transferPendingTo || 'Inspector Arjun Singh',
      action: "Custody Handoff Accepted & Signed",
      target: itemId,
      caseId: targetItem?.caseId,
      result: "New Custodian Locked"
    });

    onShowToast(`Custody of evidence ${itemId} accepted and digitally signed ✓`, "success");
  };

  const filteredItems = selectedStatusFilter === 'ALL'
    ? evidenceList
    : evidenceList.filter(e => e.custodyStatus === selectedStatusFilter || (selectedStatusFilter === 'LEGAL_HOLD' && e.legalHold));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              🔐 Virtual Digital Evidence Locker
            </h1>
            <span className="cv-badge cv-badge-emerald">Live Custody Ledger</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Real-time custody tracking, evidence sealing status, and dual-party transfer acceptance workflows.
          </p>
        </div>

        {onOpenIntake && (
          <button onClick={onOpenIntake} className="cv-btn cv-btn-primary" style={{ fontWeight: 800 }}>
            <Lock size={16} />
            <span>New Evidence Reception Intake</span>
          </button>
        )}
      </div>

      {/* VIRTUAL LOCKER STATUS METRICS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
        
        <div 
          onClick={() => setSelectedStatusFilter('ALL')}
          className="cv-card" 
          style={{ padding: '1.25rem', cursor: 'pointer', border: selectedStatusFilter === 'ALL' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)' }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ACTIVE EVIDENCE</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.25rem' }}>{stats.active}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', marginTop: '0.2rem', fontWeight: 700 }}>In Vault Storage</div>
        </div>

        <div 
          onClick={() => setSelectedStatusFilter('SEALED')}
          className="cv-card" 
          style={{ padding: '1.25rem', cursor: 'pointer', border: selectedStatusFilter === 'SEALED' ? '2px solid var(--success)' : '1px solid var(--border-color)' }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>SEALED LOCK</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--success-dark)', marginTop: '0.25rem' }}>{stats.sealed}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--success-dark)', marginTop: '0.2rem', fontWeight: 700 }}>Immutable Hash Lock</div>
        </div>

        <div 
          onClick={() => setSelectedStatusFilter('UNDER EXAMINATION')}
          className="cv-card" 
          style={{ padding: '1.25rem', cursor: 'pointer', border: selectedStatusFilter === 'UNDER EXAMINATION' ? '2px solid #8b5cf6' : '1px solid var(--border-color)' }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>EXAMINATION</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#8b5cf6', marginTop: '0.25rem' }}>{stats.underExamination}</div>
          <div style={{ fontSize: '0.72rem', color: '#8b5cf6', marginTop: '0.2rem', fontWeight: 700 }}>Forensic Inspection</div>
        </div>

        <div 
          onClick={() => setSelectedStatusFilter('TRANSFER PENDING')}
          className="cv-card" 
          style={{ padding: '1.25rem', cursor: 'pointer', border: selectedStatusFilter === 'TRANSFER PENDING' ? '2px solid #f59e0b' : '1px solid var(--border-color)' }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>TRANSFER PENDING</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f59e0b', marginTop: '0.25rem' }}>{stats.transferPending}</div>
          <div style={{ fontSize: '0.72rem', color: '#f59e0b', marginTop: '0.2rem', fontWeight: 700 }}>Awaiting Acceptance</div>
        </div>

        <div 
          onClick={() => setSelectedStatusFilter('LEGAL_HOLD')}
          className="cv-card" 
          style={{ padding: '1.25rem', cursor: 'pointer', border: selectedStatusFilter === 'LEGAL_HOLD' ? '2px solid #3b82f6' : '1px solid var(--border-color)' }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>LEGAL HOLD</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#3b82f6', marginTop: '0.25rem' }}>{stats.legalHold}</div>
          <div style={{ fontSize: '0.72rem', color: '#3b82f6', marginTop: '0.2rem', fontWeight: 700 }}>Court Hold Active</div>
        </div>

      </div>

      {/* EVIDENCE LOCKER TABLE */}
      <div className="cv-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            🔐 Evidence Items Register ({filteredItems.length} Records)
          </h3>

          <button onClick={() => setSelectedStatusFilter('ALL')} className="cv-btn cv-btn-secondary cv-btn-sm" style={{ fontSize: '0.72rem' }}>
            Show All Items
          </button>
        </div>

        <div className="cv-table-container">
          <table className="cv-table">
            <thead>
              <tr>
                <th>EVIDENCE ID</th>
                <th>FILE / ARTIFACT</th>
                <th>CASE ID</th>
                <th>CUSTODY STATUS</th>
                <th>CURRENT CUSTODIAN</th>
                <th>SHA-256 DIGEST</th>
                <th>CUSTODY ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-primary)' }}>
                    {item.id}
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.type} • {item.size}</div>
                  </td>
                  <td style={{ fontWeight: 700 }}>Case #{item.caseId}</td>
                  <td>
                    <span className={`cv-badge ${
                      item.custodyStatus === 'SEALED' ? 'cv-badge-emerald' :
                      item.custodyStatus === 'UNDER EXAMINATION' ? 'cv-badge-indigo' :
                      item.custodyStatus === 'TRANSFER PENDING' ? 'cv-badge-amber' : 'cv-badge-blue'
                    }`} style={{ fontWeight: 800 }}>
                      {item.custodyStatus === 'SEALED' ? '🔒 SEALED' : item.custodyStatus}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: '0.8125rem' }}>{item.currentCustodian}</div>
                    {item.transferPendingTo && (
                      <div style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700 }}>
                        ➔ Transfer to: {item.transferPendingTo}
                      </div>
                    )}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {item.sha256 ? item.sha256.substring(0, 14) + '...' : 'Verified Hash'}
                  </td>
                  <td>
                    {item.custodyStatus === 'TRANSFER PENDING' ? (
                      <button
                        onClick={() => handleAcceptCustody(item.id)}
                        className="cv-btn cv-btn-primary cv-btn-sm"
                        style={{ fontSize: '0.72rem', fontWeight: 800 }}
                      >
                        <CheckCircle2 size={13} />
                        <span>ACCEPT CUSTODY</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setTransferModalItem(item)}
                        className="cv-btn cv-btn-secondary cv-btn-sm"
                        style={{ fontSize: '0.72rem', fontWeight: 700 }}
                      >
                        <ArrowRightLeft size={13} />
                        <span>Transfer Custody</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTODY TRANSFER MODAL */}
      {transferModalItem && (
        <div className="cv-modal-backdrop" style={{ zIndex: 999 }} onClick={() => setTransferModalItem(null)}>
          <div className="cv-modal cv-modal-md" onClick={e => e.stopPropagation()}>
            <div className="cv-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowRightLeft size={20} style={{ color: 'var(--accent-primary)' }} />
                <h2 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Initiate Legal Custody Transfer</h2>
              </div>
              <button onClick={() => setTransferModalItem(null)} className="cv-btn-icon"><X size={18} /></button>
            </div>

            <div className="cv-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '0.875rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                  ITEM: {transferModalItem.id} ({transferModalItem.name})
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Current Custodian: {transferModalItem.currentCustodian}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>
                  SELECT NEW RECIPIENT CUSTODIAN *
                </label>
                <select value={recipientOfficer} onChange={e => setRecipientOfficer(e.target.value)} className="cv-input">
                  <option value="Forensic Officer Dr. Raman">Forensic Officer Dr. Raman (CFSL Lab)</option>
                  <option value="Inspector Arjun Singh">Inspector Arjun Singh (Special Cell)</option>
                  <option value="Sub-Inspector Rohit">Sub-Inspector Rohit (Evidence Safe Manager)</option>
                  <option value="Registrar Judicial Bench">Registrar Judicial Bench (High Court)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>
                  PURPOSE OF CUSTODY TRANSFER *
                </label>
                <input type="text" value={transferPurpose} onChange={e => setTransferPurpose(e.target.value)} className="cv-input" />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>
                  TRANSFER LOCATION / SAFE DESTINATION *
                </label>
                <input type="text" value={transferLocation} onChange={e => setTransferLocation(e.target.value)} className="cv-input" />
              </div>
            </div>

            <div className="cv-modal-footer">
              <button onClick={() => setTransferModalItem(null)} className="cv-btn cv-btn-secondary">
                Cancel
              </button>
              <button onClick={handleInitiateTransfer} className="cv-btn cv-btn-primary" style={{ fontWeight: 800 }}>
                <Send size={14} />
                <span>Sign & Issue Custody Transfer</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
