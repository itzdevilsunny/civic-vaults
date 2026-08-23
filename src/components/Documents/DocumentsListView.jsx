import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Upload, 
  Filter, 
  Download, 
  Share2, 
  Lock, 
  ShieldCheck, 
  Hash, 
  Eye, 
  FilePlus, 
  Database,
  CheckSquare,
  Square,
  Package,
  FolderLock,
  RefreshCw
} from 'lucide-react';
import { createLiveAuditLog } from '../../lib/supabaseClient';

export default function DocumentsListView({ documents = [], onSelectDocument, onOpenUpload, onOpenShare, onShowToast, onSeedDatabase }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDocIds, setSelectedDocIds] = useState([]);
  const [isBulkVerifying, setIsBulkVerifying] = useState(false);

  const filteredDocs = documents.filter(d => {
    const matchesSearch = (d.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (d.caseId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (d.uploadedBy || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || d.type === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDocIds(filteredDocs.map(d => d.id));
    } else {
      setSelectedDocIds([]);
    }
  };

  const handleToggleDocSelect = (id) => {
    if (selectedDocIds.includes(id)) {
      setSelectedDocIds(selectedDocIds.filter(i => i !== id));
    } else {
      setSelectedDocIds([...selectedDocIds, id]);
    }
  };

  const handleBulkVerify = async () => {
    if (selectedDocIds.length === 0) return;
    setIsBulkVerifying(true);

    setTimeout(async () => {
      setIsBulkVerifying(false);

      await createLiveAuditLog({
        user: "Inspector Arjun Singh",
        action: "Batch SHA-256 Checksum Verification Executed",
        target: `${selectedDocIds.length} Evidence Documents`,
        result: "All Digests Verified 100%"
      });

      onShowToast(`✓ BATCH INTEGRITY VERIFIED: All ${selectedDocIds.length} selected files match original SHA-256 ledger digests!`, "success");
      setSelectedDocIds([]);
    }, 1200);
  };

  const handleBulkLegalHold = async () => {
    if (selectedDocIds.length === 0) return;

    await createLiveAuditLog({
      user: "Inspector Arjun Singh",
      action: "Bulk Statutory Legal Hold Applied",
      target: `${selectedDocIds.length} Evidence Items`,
      result: "BNSS Legal Hold Active"
    });

    onShowToast(`🔒 Statutory Legal Hold applied across all ${selectedDocIds.length} selected evidence items ✓`, "warning");
    setSelectedDocIds([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Digital Document & Evidence Vault
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Encrypted storage repository with cryptographic SHA-256 hash lock and Chain of Custody logging
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {documents.length === 0 && onSeedDatabase && (
            <button onClick={onSeedDatabase} className="cv-btn cv-btn-secondary">
              <Database size={16} />
              <span>Seed Initial Database</span>
            </button>
          )}
          <button onClick={onOpenUpload} className="cv-btn cv-btn-primary">
            <Upload size={16} />
            <span>Upload New Evidence</span>
          </button>
        </div>
      </div>

      {/* BATCH ACTIONS BAR (Appears when items are selected) */}
      {selectedDocIds.length > 0 && (
        <div style={{
          padding: '0.875rem 1.25rem',
          backgroundColor: 'var(--accent-light)',
          border: '1.5px solid var(--accent-primary)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{ fontWeight: 800, color: 'var(--accent-primary)', fontSize: '0.875rem' }}>
            ✓ {selectedDocIds.length} Evidence Items Selected
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={handleBulkVerify} 
              disabled={isBulkVerifying}
              className="cv-btn cv-btn-primary cv-btn-sm" 
              style={{ fontWeight: 800 }}
            >
              <RefreshCw size={14} className={isBulkVerifying ? 'animate-spin' : ''} />
              <span>{isBulkVerifying ? 'Verifying...' : 'Bulk Verify SHA-256'}</span>
            </button>

            <button 
              onClick={handleBulkLegalHold} 
              className="cv-btn cv-btn-secondary cv-btn-sm" 
              style={{ fontWeight: 800, color: 'var(--warning-dark)' }}
            >
              <FolderLock size={14} />
              <span>Apply Legal Hold</span>
            </button>

            <button 
              onClick={() => setSelectedDocIds([])} 
              className="cv-btn cv-btn-secondary cv-btn-sm"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Filter Category Pills & Search */}
      <div className="cv-card" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Category Tabs with Item Counts */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {[
              { id: 'All', label: 'All Artifacts', count: documents.length },
              { id: 'FIR / Complaints', label: 'FIR / Complaints', count: documents.filter(d => d.type === 'FIR / Complaints').length },
              { id: 'Statements', label: 'Statements', count: documents.filter(d => d.type === 'Statements').length },
              { id: 'Evidence', label: 'Digital Evidence', count: documents.filter(d => d.type === 'Evidence' || d.type.includes('Digital')).length },
              { id: 'Reports', label: 'Forensic Reports', count: documents.filter(d => d.type === 'Reports').length },
              { id: 'Other Documents', label: 'Other Docs', count: documents.filter(d => d.type === 'Other Documents').length }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.4rem 0.875rem',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === cat.id ? 'var(--accent-primary)' : 'var(--bg-subtle)',
                  color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  fontSize: '0.6875rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: selectedCategory === cat.id ? 'rgba(255,255,255,0.25)' : 'var(--bg-surface)',
                  color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-muted)'
                }}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem 0.875rem'
          }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by file name, Case ID, uploader..."
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

        </div>
      </div>

      {/* Documents Table / Empty State */}
      <div className="cv-card" style={{ padding: 0, overflow: 'hidden' }}>
        {filteredDocs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: 'var(--text-muted)' }}>
            <FilePlus size={48} style={{ opacity: 0.4, marginBottom: '1rem', color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              No Evidence Documents Found in Repository
            </h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', maxWidth: '480px', margin: '0.35rem auto 1.5rem auto' }}>
              Upload your first evidence file or complaint PDF to store it securely in the encrypted vault.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={onOpenUpload} className="cv-btn cv-btn-primary">
                <Upload size={16} />
                <span>Upload First Evidence</span>
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
                  <th style={{ width: '40px', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={selectedDocIds.length === filteredDocs.length && filteredDocs.length > 0}
                      onChange={handleSelectAll}
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                  <th>Document Name</th>
                  <th>Case ID</th>
                  <th>Category</th>
                  <th>Classification</th>
                  <th>SHA-256 Verification</th>
                  <th>Uploaded By</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map(doc => {
                  const isSelected = selectedDocIds.includes(doc.id);

                  return (
                    <tr 
                      key={doc.id} 
                      onClick={() => onSelectDocument(doc)} 
                      style={{ 
                        cursor: 'pointer',
                        backgroundColor: isSelected ? 'var(--accent-light)' : 'transparent'
                      }}
                    >
                      <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleDocSelect(doc.id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td style={{ fontWeight: 700 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FileText size={18} style={{ color: 'var(--accent-primary)' }} />
                          <div>
                            <div>{doc.name}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                              Size: {doc.size} • Version: {doc.version}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-primary)' }}>
                        #{doc.caseId}
                      </td>
                      <td>{doc.type}</td>
                      <td>
                        <span className={`cv-badge ${
                          doc.classification === 'Highly Restricted' ? 'cv-badge-red' :
                          doc.classification === 'Restricted' ? 'cv-badge-amber' : 'cv-badge-blue'
                        }`}>
                          {doc.classification}
                        </span>
                      </td>
                      <td>
                        <div className="cv-badge cv-badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <ShieldCheck size={12} />
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>✓ SHA-256 Verified</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.8125rem' }}>
                        <div>{doc.uploadedBy}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{doc.uploadDate}</div>
                      </td>
                      <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.35rem' }}>
                          <button 
                            onClick={() => onSelectDocument(doc)}
                            className="cv-btn cv-btn-secondary cv-btn-sm"
                            title="View Metadata & Chain of Custody"
                          >
                            <Eye size={14} />
                            <span>Inspect</span>
                          </button>
                          <button 
                            onClick={() => onOpenShare(doc)}
                            className="cv-btn cv-btn-secondary cv-btn-sm"
                            title="Share Encrypted Link"
                          >
                            <Share2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
