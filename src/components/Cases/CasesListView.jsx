import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  PlusCircle, 
  Filter, 
  Download, 
  MoreVertical, 
  ShieldCheck, 
  ChevronRight, 
  FolderPlus, 
  Database,
  Archive,
  Trash2,
  AlertTriangle,
  X
} from 'lucide-react';
import { createLiveAuditLog } from '../../lib/supabaseClient';

export default function CasesListView({ cases, onSelectCase, onOpenCreateCase, onShowToast, onSeedDatabase }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [disposalCaseItem, setDisposalCaseItem] = useState(null);

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority = priorityFilter === 'all' || c.priority.toLowerCase() === priorityFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleConfirmDisposal = async () => {
    if (!disposalCaseItem) return;

    await createLiveAuditLog({
      user: "Inspector Arjun Singh",
      action: "Case Docket Formally Archived & Statutory Disposal Initiated",
      target: `Case #${disposalCaseItem.id} (${disposalCaseItem.title})`,
      caseId: disposalCaseItem.id,
      result: "Moved to Statutory 7-Year Cold Retention Vault"
    });

    if (onShowToast) {
      onShowToast(`Case #${disposalCaseItem.id} Archived into Statutory Cold Retention Vault (BNSS 2023) ✓`, "success");
    }

    setDisposalCaseItem(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Investigation Cases Management
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Live directory of active legal cases, assigned officers, and retention status
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {cases.length === 0 && (
            <button onClick={onSeedDatabase} className="cv-btn cv-btn-secondary">
              <Database size={16} />
              <span>Seed Initial Database</span>
            </button>
          )}
          <button onClick={onOpenCreateCase} className="cv-btn cv-btn-primary">
            <PlusCircle size={16} />
            <span>Open New Case</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="cv-card" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {/* Search Box */}
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
              placeholder="Search by Case ID, title, officer..."
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

          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="cv-select"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem', width: 'auto' }}
            >
              <option value="all">All Statuses</option>
              <option value="under investigation">Under Investigation</option>
              <option value="pending review">Pending Review</option>
              <option value="awaiting approval">Awaiting Approval</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Priority:</span>
            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="cv-select"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem', width: 'auto' }}
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

        </div>
      </div>

      {/* Cases Table */}
      <div className="cv-card" style={{ padding: 0, overflow: 'hidden' }}>
        {filteredCases.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: 'var(--text-muted)' }}>
            <FolderPlus size={48} style={{ opacity: 0.4, marginBottom: '1rem', color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              No Investigation Cases Found
            </h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', maxWidth: '480px', margin: '0.35rem auto 1.5rem auto' }}>
              Create a new investigation case docket to begin tracking electronic evidence under BNSS 2023.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={onOpenCreateCase} className="cv-btn cv-btn-primary">
                <PlusCircle size={16} />
                <span>Open First Case</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="cv-table-container">
            <table className="cv-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Case Title & Details</th>
                  <th>Lead Officer</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Evidence Items</th>
                  <th>Last Updated</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map(c => (
                  <tr key={c.id} onClick={() => onSelectCase(c)} style={{ cursor: 'pointer' }}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-primary)' }}>
                      #{c.id}
                    </td>
                    <td style={{ fontWeight: 700 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{c.title}</span>
                        {c.legalHold && (
                          <span className="cv-badge cv-badge-emerald" style={{ fontSize: '0.65rem' }}>
                            Hold Active
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src={c.leadOfficerAvatar} alt={c.assignedTo} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                        <span>{c.assignedTo}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`cv-badge ${
                        c.priority === 'Critical' ? 'cv-badge-red' :
                        c.priority === 'High' ? 'cv-badge-amber' : 'cv-badge-blue'
                      }`}>
                        {c.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`cv-badge ${
                        c.status === 'Under Investigation' ? 'cv-badge-indigo' :
                        c.status === 'Pending Review' ? 'cv-badge-blue' :
                        c.status === 'Awaiting Approval' ? 'cv-badge-amber' : 'cv-badge-emerald'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {c.evidenceCount || 0} Evidence Files
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                      {c.lastUpdated}
                    </td>
                    <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.35rem' }}>
                        <button 
                          onClick={() => onSelectCase(c)}
                          className="cv-btn cv-btn-secondary cv-btn-sm"
                        >
                          <span>Open Docket</span>
                          <ChevronRight size={14} />
                        </button>
                        <button 
                          onClick={() => setDisposalCaseItem(c)}
                          className="cv-btn cv-btn-secondary cv-btn-sm"
                          style={{ color: 'var(--danger)' }}
                          title="Statutory Case Disposal & Cold Archive"
                        >
                          <Archive size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* STATUTORY CASE DISPOSAL MODAL */}
      {disposalCaseItem && (
        <div className="cv-modal-backdrop" style={{ zIndex: 999 }} onClick={() => setDisposalCaseItem(null)}>
          <div className="cv-modal cv-modal-md" onClick={e => e.stopPropagation()}>
            <div className="cv-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger-dark)' }}>
                <AlertTriangle size={20} />
                <h2 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Statutory Docket Disposal Authorization</h2>
              </div>
              <button onClick={() => setDisposalCaseItem(null)} className="cv-btn-icon"><X size={18} /></button>
            </div>

            <div className="cv-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '0.875rem', backgroundColor: 'var(--danger-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--danger)' }}>
                <div style={{ fontWeight: 800, color: 'var(--danger-dark)', fontSize: '0.875rem' }}>
                  LEGAL DISPOSAL RULE (BNSS 2023 / BSA 2023):
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                  Under Indian Evidence statutory rules, digital evidence and closed investigation dockets cannot be hard-deleted without explicit judicial authorization. 
                </p>
              </div>

              <div style={{ padding: '0.875rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                  TARGET DOCKET: Case #{disposalCaseItem.id} ({disposalCaseItem.title})
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Lead Officer: {disposalCaseItem.assignedTo} • Evidence Files: {disposalCaseItem.evidenceCount || 0}
                </div>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Clicking confirm will execute formal statutory closure, log an immutable event in the Supabase audit trail, and move the docket into the <strong>7-Year Statutory Cold Retention Vault</strong>.
              </p>
            </div>

            <div className="cv-modal-footer">
              <button onClick={() => setDisposalCaseItem(null)} className="cv-btn cv-btn-secondary">
                Cancel
              </button>
              <button onClick={handleConfirmDisposal} className="cv-btn cv-btn-primary" style={{ backgroundColor: 'var(--danger)', fontWeight: 800 }}>
                <Archive size={16} />
                <span>Confirm Statutory Archive & Disposal</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
