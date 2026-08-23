import React, { useState } from 'react';
import { History, Search, Download, Filter, Shield, Calendar, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export default function AuditTrailView({ onShowToast, liveLogs = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const defaultAuditEvents = [
    { id: "LOG-1001", timestamp: "2026-08-22 18:42:10 IST", user: "Inspector Arjun Singh", action: "Document SHA-256 Verified", target: "FIR_2026_0789.pdf", caseId: "2026-0789", ip: "10.42.108.15", device: "Workstation #01", result: "Success (100% Match)" },
    { id: "LOG-1002", timestamp: "2026-08-22 17:30:45 IST", user: "Officer Priya Sharma", action: "Document Shared (Link Created)", target: "Witness_Statement_A.pdf", caseId: "2026-0788", ip: "10.42.100.8", device: "Mobile Field Unit", result: "Created Link (Exp: 24h)" },
    { id: "LOG-1003", timestamp: "2026-08-22 16:15:20 IST", user: "Forensic Analyst R. Mehta", action: "Evidence Image Ingested", target: "Server_Rack_Photo.jpg", caseId: "2026-0789", ip: "10.42.112.4", device: "Lab Terminal #03", result: "Created v1.0" },
    { id: "LOG-1004", timestamp: "2026-08-22 14:00:10 IST", user: "System Security Guard", action: "Unauthorized Access Blocked", target: "Financial_Ledger_Q3.pdf", caseId: "2026-0787", ip: "192.168.1.45", device: "Unknown Client", result: "Access Denied" },
    { id: "LOG-1005", timestamp: "2026-08-22 11:20:00 IST", user: "Senior Officer S. Roy", action: "Digital Signature Applied", target: "FIR_2026_0789.pdf", caseId: "2026-0789", ip: "10.42.100.2", device: "Command Center", result: "SIG-99812-EC Verified" }
  ];

  const displayLogs = liveLogs.length > 0 ? liveLogs : defaultAuditEvents;

  const filteredLogs = displayLogs.filter(l => {
    const matchesSearch = (l.user || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (l.target || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (l.caseId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (l.ip || '').includes(searchTerm);
    const matchesAction = actionFilter === 'all' || (l.action || '').toLowerCase().includes(actionFilter.toLowerCase());
    return matchesSearch && matchesAction;
  });

  const handleExportCsv = () => {
    const headers = "Event ID,Timestamp,User Officer,Action Performed,Target File,Case ID,IP Address,Result\n";
    const rows = filteredLogs.map(l => 
      `"${l.id}","${l.timestamp}","${l.user}","${l.action}","${l.target}","${l.caseId}","${l.ip}","${l.result}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CaseVault_NIST_Audit_Trail_${Date.now()}.csv`;
    a.click();

    if (onShowToast) {
      onShowToast("✓ NIST SP 800-92 Audit Trail CSV Exported to Downloads", "success");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Immutable System Audit Trail
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Cryptographically sealed activity ledger recording every document access, edit, download, and permission change
          </p>
        </div>

        <button 
          onClick={handleExportCsv}
          className="cv-btn cv-btn-primary"
          style={{ fontWeight: 800 }}
        >
          <FileSpreadsheet size={16} />
          <span>Export Audit Trail CSV</span>
        </button>
      </div>

      {/* Filter Controls */}
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
              placeholder="Search by user, document, Case ID, IP..."
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
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Action:</span>
            <select
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
              className="cv-select"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem', width: 'auto' }}
            >
              <option value="all">All Actions</option>
              <option value="verified">Verified / SHA Check</option>
              <option value="shared">Document Shared</option>
              <option value="ingested">File Ingested</option>
              <option value="blocked">Access Blocked</option>
            </select>
          </div>

        </div>
      </div>

      {/* Table */}
      <div className="cv-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="cv-table-container">
          <table className="cv-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Timestamp</th>
                <th>User / Officer</th>
                <th>Action Performed</th>
                <th>Target File / Case</th>
                <th>IP Address</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {log.id}
                  </td>
                  <td style={{ fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                    {log.timestamp}
                  </td>
                  <td style={{ fontWeight: 700 }}>{log.user}</td>
                  <td>
                    <span className="cv-badge cv-badge-indigo">{log.action}</span>
                  </td>
                  <td>
                    <div>{log.target}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                      Case #{log.caseId}
                    </div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78125rem' }}>{log.ip}</td>
                  <td>
                    <span className={`cv-badge ${log.result.includes('Blocked') || log.result.includes('Denied') ? 'cv-badge-red' : 'cv-badge-emerald'}`}>
                      {log.result}
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
