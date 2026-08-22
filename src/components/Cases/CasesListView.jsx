import React, { useState } from 'react';
import { Briefcase, Search, PlusCircle, Filter, Download, MoreVertical, ShieldCheck, ChevronRight, FolderPlus, Database } from 'lucide-react';

export default function CasesListView({ cases, onSelectCase, onOpenCreateCase, onShowToast, onSeedDatabase }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority = priorityFilter === 'all' || c.priority.toLowerCase() === priorityFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPriority;
  });

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
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

        </div>
      </div>

      {/* Cases Table / Empty State */}
      <div className="cv-card" style={{ padding: 0, overflow: 'hidden' }}>
        {filteredCases.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: 'var(--text-muted)' }}>
            <FolderPlus size={48} style={{ opacity: 0.4, marginBottom: '1rem', color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              No Investigation Cases Found in Live Database
            </h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', maxWidth: '480px', margin: '0.35rem auto 1.5rem auto' }}>
              Create your first investigation case docket or click below to seed your live Supabase database with sample records.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={onOpenCreateCase} className="cv-btn cv-btn-primary">
                <PlusCircle size={16} />
                <span>Initialize First Case</span>
              </button>
              {onSeedDatabase && (
                <button onClick={onSeedDatabase} className="cv-btn cv-btn-secondary">
                  <Database size={16} />
                  <span>Seed Initial Records</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="cv-table-container">
            <table className="cv-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Case Title</th>
                  <th>Assigned Officer</th>
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
                      <button 
                        onClick={() => onSelectCase(c)}
                        className="cv-btn cv-btn-secondary cv-btn-sm"
                      >
                        <span>Open Docket</span>
                        <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
