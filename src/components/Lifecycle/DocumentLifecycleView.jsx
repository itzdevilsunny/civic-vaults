import React, { useState } from 'react';
import { 
  GitCommit, 
  FileText, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Stamp, 
  Archive, 
  FolderLock, 
  Trash2, 
  AlertCircle, 
  ShieldCheck,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { createLiveAuditLog } from '../../lib/supabaseClient';

export default function DocumentLifecycleView({ documents = [], onShowToast }) {
  const [docList, setDocList] = useState(
    documents.length > 0 ? documents : [
      {
        id: 'DOC-2026-101',
        name: 'FIR_2026_0421_CyberExtortion.pdf',
        caseId: '2026-00421',
        type: 'FIR / Complaints',
        lifecycleStage: 'ACTIVE',
        uploadedBy: 'Inspector Arjun Singh',
        uploadDate: '22 Aug 2026, 10:30 IST'
      },
      {
        id: 'DOC-2026-102',
        name: 'PwC_Banking_Forensic_Audit.pdf',
        caseId: '2026-00421',
        type: 'Reports',
        lifecycleStage: 'APPROVAL',
        uploadedBy: 'Dr. Roy (CFSL)',
        uploadDate: '22 Aug 2026, 11:15 IST'
      },
      {
        id: 'DOC-2026-103',
        name: 'Seized_HardDrive_ByteStream.bin',
        caseId: '2026-00421',
        type: 'Evidence',
        lifecycleStage: 'REVIEW',
        uploadedBy: 'Panch Witness #1',
        uploadDate: '22 Aug 2026, 12:00 IST'
      },
      {
        id: 'DOC-2026-104',
        name: 'Draft_Investigation_Memo.docx',
        caseId: '2026-00389',
        type: 'Other Documents',
        lifecycleStage: 'DRAFT',
        uploadedBy: 'Sub-Inspector Rohit',
        uploadDate: '23 Aug 2026, 01:20 IST'
      }
    ]
  );

  const [selectedStageFilter, setSelectedStageFilter] = useState('ALL');

  const lifecycleStages = [
    { id: 'DRAFT', label: '1. Draft', color: '#94a3b8', desc: 'Authoring in progress' },
    { id: 'REVIEW', label: '2. Review', color: '#f59e0b', desc: 'Peer / Legal inspection' },
    { id: 'APPROVAL', label: '3. Approval', color: '#8b5cf6', desc: 'Senior Officer digital signature' },
    { id: 'ACTIVE', label: '4. Active', color: '#10b981', desc: 'Court admissible evidence' },
    { id: 'ARCHIVED', label: '5. Archived', color: '#6366f1', desc: 'Immutable vault archive' },
    { id: 'RETENTION', label: '6. Retention Hold', color: '#3b82f6', desc: 'Statutory legal hold active' },
    { id: 'DISPOSAL', label: '7. Disposal Review', color: '#ef4444', desc: 'Controlled secure deletion' }
  ];

  const handlePromoteStage = async (docId, currentStage) => {
    const stageOrder = ['DRAFT', 'REVIEW', 'APPROVAL', 'ACTIVE', 'ARCHIVED', 'RETENTION', 'DISPOSAL'];
    const currentIdx = stageOrder.indexOf(currentStage);
    if (currentIdx === -1 || currentIdx >= stageOrder.length - 1) return;

    const nextStage = stageOrder[currentIdx + 1];

    setDocList(prev => prev.map(d => d.id === docId ? { ...d, lifecycleStage: nextStage } : d));

    onShowToast(`Promoted document ${docId} from ${currentStage} ➔ ${nextStage} ✓`, "success");

    // Insert Real Supabase Audit Log Event
    await createLiveAuditLog({
      user: "Inspector Arjun Singh",
      action: "Document Lifecycle Stage Promoted",
      target: `${docId} (${currentStage} ➔ ${nextStage})`,
      result: "Lifecycle Transition Recorded"
    });
  };

  const filteredDocs = selectedStageFilter === 'ALL' 
    ? docList 
    : docList.filter(d => d.lifecycleStage === selectedStageFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              🔄 Unified Document Lifecycle Management
            </h1>
            <span className="cv-badge cv-badge-indigo">BNSS 2023 Compliant</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Track and control document transitions across all 7 lifecycle stages with real-time audit event logging.
          </p>
        </div>
      </div>

      {/* LIFECYCLE STAGE FLOWCHART */}
      <div className="cv-card" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          📐 Unified Lifecycle Transition Pipeline
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.75rem',
          alignItems: 'center'
        }}>
          {lifecycleStages.map((stg, idx) => (
            <div
              key={stg.id}
              onClick={() => setSelectedStageFilter(selectedStageFilter === stg.id ? 'ALL' : stg.id)}
              style={{
                padding: '0.75rem 0.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: selectedStageFilter === stg.id ? 'var(--accent-light)' : 'var(--bg-subtle)',
                border: `1.5px solid ${stg.color}`,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: stg.color }}>{stg.label}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {stg.desc}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '0.35rem', color: 'var(--text-primary)' }}>
                {docList.filter(d => d.lifecycleStage === stg.id).length} Docs
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOCUMENT LIFECYCLE MANAGEMENT BOARD */}
      <div className="cv-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            📄 Evidence Lifecycle State Board ({filteredDocs.length} Documents)
          </h3>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => setSelectedStageFilter('ALL')}
              className={`cv-btn cv-btn-sm ${selectedStageFilter === 'ALL' ? 'cv-btn-primary' : 'cv-btn-secondary'}`}
              style={{ fontSize: '0.72rem' }}
            >
              Show All Stages
            </button>
          </div>
        </div>

        <div className="cv-table-container">
          <table className="cv-table">
            <thead>
              <tr>
                <th>DOCUMENT NAME</th>
                <th>CASE ID</th>
                <th>CATEGORY</th>
                <th>CURRENT LIFECYCLE STAGE</th>
                <th>UPLOADED BY</th>
                <th>TRANSITION ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map(d => {
                const stageObj = lifecycleStages.find(s => s.id === d.lifecycleStage) || lifecycleStages[3];

                return (
                  <tr key={d.id}>
                    <td>
                      <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{d.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{d.id}</div>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>Case #{d.caseId}</td>
                    <td style={{ fontSize: '0.8125rem' }}>{d.type}</td>
                    <td>
                      <span className="cv-badge" style={{ backgroundColor: `${stageObj.color}20`, color: stageObj.color, border: `1px solid ${stageObj.color}`, fontWeight: 800 }}>
                        {stageObj.label}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.78125rem' }}>{d.uploadedBy}</td>
                    <td>
                      {d.lifecycleStage !== 'DISPOSAL' ? (
                        <button
                          onClick={() => handlePromoteStage(d.id, d.lifecycleStage)}
                          className="cv-btn cv-btn-secondary cv-btn-sm"
                          style={{ fontSize: '0.72rem', fontWeight: 800 }}
                        >
                          <ChevronRight size={13} />
                          <span>Advance Stage</span>
                        </button>
                      ) : (
                        <span className="cv-badge cv-badge-red" style={{ fontSize: '0.68rem' }}>
                          Locked for Secure Disposal Review
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
