import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Briefcase, 
  Search, 
  Filter, 
  AlertTriangle,
  UserCheck,
  ShieldCheck,
  Calendar,
  FileCheck
} from 'lucide-react';

export default function LegalHoldView({ documents = [], cases = [], onShowToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [retentionFilter, setRetentionFilter] = useState('all');
  const [legalHoldStatus, setLegalHoldStatus] = useState({});

  // Filter items under Legal Hold
  const holdDocs = documents.map(d => ({
    ...d,
    isHold: legalHoldStatus[d.id] !== undefined ? legalHoldStatus[d.id] : d.legalHold,
    retentionPolicy: d.classification === 'Highly Restricted' ? 'Permanent Hold (National Security)' : '7 Years (Standard Felony)'
  }));

  const filteredDocs = holdDocs.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRetention = retentionFilter === 'all' || d.retentionPolicy.toLowerCase().includes(retentionFilter.toLowerCase());
    return matchesSearch && matchesRetention;
  });

  const handleToggleHold = (docId, currentHoldState) => {
    const nextState = !currentHoldState;
    setLegalHoldStatus(prev => ({
      ...prev,
      [docId]: nextState
    }));

    if (nextState) {
      onShowToast(`🔒 Legal Hold APPLIED to Document #${docId}. File deletion & purging disabled.`, "success");
    } else {
      onShowToast(`🔓 Legal Hold RELEASED for Document #${docId} under Senior Command Authorization.`, "warning");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              ⚖️ Legal Hold & Statutory Retention Engine
            </h1>
            <span className="cv-badge cv-badge-emerald">
              BNSS 2023 Compliant
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Freeze digital evidence dockets during active judicial trial to prevent purging, modification, or deletion
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span className="cv-badge cv-badge-indigo" style={{ padding: '0.4rem 0.875rem', fontWeight: 800 }}>
            {holdDocs.filter(d => d.isHold).length} Active Legal Holds
          </span>
        </div>
      </div>

      {/* STATUTORY RETENTION POLICIES SUMMARY CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem'
      }}>
        
        <div className="cv-card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--danger)', letterSpacing: '0.05em' }}>
            NATIONAL SECURITY & ORGANIZED CRIME
          </span>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            Permanent Hold
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Indefinite preservation lock. No auto-purge permitted under MHA Directive.
          </p>
        </div>

        <div className="cv-card" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>
            FINANCIAL CYBER FRAUD
          </span>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            10 Years Retention
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Preserved for ED / CBI financial audit and asset recovery.
          </p>
        </div>

        <div className="cv-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--success-dark)', letterSpacing: '0.05em' }}>
            STANDARD FELONY & COGNIZABLE DOCKETS
          </span>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            7 Years Retention
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Standard statutory trial period under Indian Evidence Act.
          </p>
        </div>

      </div>

      {/* FILTER SEARCH BAR */}
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
              placeholder="Search evidence under Legal Hold by name, Case ID..."
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
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Retention Rule:</span>
            <select
              value={retentionFilter}
              onChange={e => setRetentionFilter(e.target.value)}
              className="cv-select"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem', width: 'auto' }}
            >
              <option value="all">All Retention Policies</option>
              <option value="permanent">Permanent Hold</option>
              <option value="7 years">7 Years Retention</option>
              <option value="10 years">10 Years Retention</option>
            </select>
          </div>

        </div>
      </div>

      {/* LEGAL HOLD ITEMS DATA TABLE */}
      <div className="cv-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="cv-table-container">
          <table className="cv-table">
            <thead>
              <tr>
                <th>Target Document</th>
                <th>Case Docket</th>
                <th>Classification</th>
                <th>Statutory Retention Policy</th>
                <th>Legal Hold Status</th>
                <th style={{ textAlign: 'right' }}>Hold Authorization</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map(doc => (
                <tr key={doc.id}>
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
                    <span className="cv-badge cv-badge-indigo">{doc.classification}</span>
                  </td>
                  <td style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {doc.retentionPolicy}
                  </td>
                  <td>
                    {doc.isHold ? (
                      <span className="cv-badge cv-badge-emerald" style={{ fontWeight: 800 }}>
                        <Lock size={12} /> Active Hold
                      </span>
                    ) : (
                      <span className="cv-badge cv-badge-amber">
                        <Unlock size={12} /> Unlocked
                      </span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleToggleHold(doc.id, doc.isHold)}
                      className={`cv-btn cv-btn-sm ${doc.isHold ? 'cv-btn-secondary' : 'cv-btn-primary'}`}
                      style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem' }}
                    >
                      {doc.isHold ? (
                        <>
                          <Unlock size={12} />
                          <span>Release Hold</span>
                        </>
                      ) : (
                        <>
                          <Lock size={12} />
                          <span>Apply Legal Hold</span>
                        </>
                      )}
                    </button>
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
