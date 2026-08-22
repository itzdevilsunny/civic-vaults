import React, { useState, useEffect } from 'react';
import { Search, X, Briefcase, FileText, User, ShieldAlert, ArrowRight } from 'lucide-react';
import { MOCK_CASES, MOCK_DOCUMENTS, MOCK_SECURITY_LOGS } from '../../data/mockData';

export default function SearchModal({ isOpen, onClose, onSelectCase, onSelectDocument }) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose(); else openSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCases = MOCK_CASES.filter(c => 
    c.id.toLowerCase().includes(query.toLowerCase()) ||
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.assignedTo.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDocs = MOCK_DOCUMENTS.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.caseId.toLowerCase().includes(query.toLowerCase()) ||
    d.uploadedBy.toLowerCase().includes(query.toLowerCase()) ||
    d.type.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLogs = MOCK_SECURITY_LOGS.filter(l =>
    l.event.toLowerCase().includes(query.toLowerCase()) ||
    l.user.toLowerCase().includes(query.toLowerCase()) ||
    l.ipAddress.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="cv-modal-backdrop" onClick={onClose}>
      <div 
        className="cv-modal cv-modal-lg" 
        onClick={e => e.stopPropagation()}
        style={{ marginTop: '5vh' }}
      >
        {/* Search Header */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem'
        }}>
          <Search size={20} style={{ color: 'var(--accent-primary)' }} />
          <input
            type="text"
            placeholder="Search cases, documents, officers, logs (e.g. 2026-0789, FIR, Arjun)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              backgroundColor: 'transparent',
              color: 'var(--text-primary)'
            }}
          />
          <button onClick={onClose} className="cv-btn-icon">
            <X size={18} />
          </button>
        </div>

        {/* Categories Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          backgroundColor: 'var(--bg-subtle)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {['all', 'cases', 'documents', 'security'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.35rem 0.875rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                border: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                backgroundColor: activeTab === tab ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === tab ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="cv-modal-body" style={{ maxHeight: '420px' }}>
          {/* Cases Results */}
          {(activeTab === 'all' || activeTab === 'cases') && filteredCases.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                INVESTIGATION CASES ({filteredCases.length})
              </div>
              {filteredCases.map(c => (
                <div
                  key={c.id}
                  onClick={() => { onSelectCase(c); onClose(); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    marginBottom: '0.5rem',
                    cursor: 'pointer',
                    backgroundColor: 'var(--bg-surface)'
                  }}
                  className="search-result-item"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="cv-badge cv-badge-indigo" style={{ padding: '0.4rem' }}>
                      <Briefcase size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Case #{c.id} - {c.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Assigned: {c.assignedTo} ({c.assignedRole}) • Status: {c.status}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={16} style={{ color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          )}

          {/* Documents Results */}
          {(activeTab === 'all' || activeTab === 'documents') && filteredDocs.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                DOCUMENTS & EVIDENCE ({filteredDocs.length})
              </div>
              {filteredDocs.map(d => (
                <div
                  key={d.id}
                  onClick={() => { onSelectDocument(d); onClose(); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    marginBottom: '0.5rem',
                    cursor: 'pointer',
                    backgroundColor: 'var(--bg-surface)'
                  }}
                  className="search-result-item"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="cv-badge cv-badge-emerald" style={{ padding: '0.4rem' }}>
                      <FileText size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {d.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Case: #{d.caseId} • Type: {d.type} • Uploaded by {d.uploadedBy}
                      </div>
                    </div>
                  </div>
                  <span className="cv-badge cv-badge-indigo" style={{ fontSize: '0.7rem' }}>
                    {d.classification}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Security Logs Results */}
          {(activeTab === 'all' || activeTab === 'security') && filteredLogs.length > 0 && (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                SECURITY & AUDIT EVENTS ({filteredLogs.length})
              </div>
              {filteredLogs.map(l => (
                <div
                  key={l.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    marginBottom: '0.5rem',
                    backgroundColor: 'var(--bg-surface)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldAlert size={18} style={{ color: l.severity === 'CRITICAL' ? 'var(--danger)' : 'var(--warning)' }} />
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {l.event}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        User: {l.user} • IP: {l.ipAddress} • {l.timestamp}
                      </div>
                    </div>
                  </div>
                  <span className={`cv-badge ${l.severity === 'CRITICAL' ? 'cv-badge-red' : 'cv-badge-amber'}`}>
                    {l.severity}
                  </span>
                </div>
              ))}
            </div>
          )}

          {filteredCases.length === 0 && filteredDocs.length === 0 && filteredLogs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Search size={36} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
              <p style={{ fontWeight: 600 }}>No results found matching "{query}"</p>
              <p style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                Try searching by Case ID (e.g. 2026-0789), Document name, Officer name, or IP address.
              </p>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="cv-modal-footer" style={{ justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Tip: Press <kbd style={{ fontFamily: 'var(--font-mono)' }}>Esc</kbd> to close</span>
          <span>CaseVault Global Index: 1,284 Indexed Items</span>
        </div>
      </div>
    </div>
  );
}
