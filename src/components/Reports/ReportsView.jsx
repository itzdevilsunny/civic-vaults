import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Printer, 
  FileSpreadsheet, 
  ShieldCheck, 
  PieChart, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Briefcase, 
  Award,
  Filter,
  Sparkles
} from 'lucide-react';

export default function ReportsView({ onShowToast }) {
  const [selectedReportType, setSelectedReportType] = useState('all');

  const reportsList = [
    { title: "Case Performance & Judicial Disposition Report", type: "Executive Summary", date: "Aug 2026", size: "2.4 MB", badge: "Monthly" },
    { title: "Digital Evidence Chain of Custody Audit Log", type: "Legal Audit", date: "Aug 2026", size: "4.8 MB", badge: "BNSS 2023" },
    { title: "Officer Workload & Active Docket Matrix", type: "Operations", date: "Aug 2026", size: "1.8 MB", badge: "Live" },
    { title: "CERT-In Security Incidents & Threat Summary", type: "Security Ops", date: "Aug 2026", size: "3.1 MB", badge: "Critical" },
    { title: "Vault Storage & Immutable Retention Compliance", type: "Compliance", date: "Aug 2026", size: "1.2 MB", badge: "Audit" },
    { title: "Section 65B Statutory Admissibility Register", type: "Legal Audit", date: "Aug 2026", size: "5.6 MB", badge: "BSA 2023" }
  ];

  const filteredReports = reportsList.filter(r => 
    selectedReportType === 'all' || r.type.toLowerCase().includes(selectedReportType.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              📊 Legal Compliance Reports & Intelligence Analytics
            </h1>
            <span className="cv-badge cv-badge-indigo">
              Step 6 Completed
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Generate court-admissible Section 65B compliance packages, officer workload stats, and chain of custody logs
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => onShowToast("Sent full report bundle to network printer queue", "info")}
            className="cv-btn cv-btn-secondary"
          >
            <Printer size={16} />
            <span>Print All Dockets</span>
          </button>
          <button 
            onClick={() => onShowToast("Exported all compliance metrics to encrypted PDF/CSV bundle ✓", "success")}
            className="cv-btn cv-btn-primary"
          >
            <Download size={16} />
            <span>Export Complete Package</span>
          </button>
        </div>
      </div>

      {/* COMPLIANCE METRICS STATS CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '1.25rem'
      }}>
        
        <div className="cv-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>CASE RESOLUTION RATE</span>
            <span className="cv-badge cv-badge-emerald">+14.2%</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            94.8%
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 600 }}>
            42 Active Cases Tracked
          </span>
        </div>

        <div className="cv-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>EVIDENCE INTEGRITY</span>
            <span className="cv-badge cv-badge-indigo">SHA-256 Lock</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-primary)', marginTop: '0.25rem' }}>
            100% Verified
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Zero Checksum Mismatches
          </span>
        </div>

        <div className="cv-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>SEC 65B CERTIFICATES</span>
            <span className="cv-badge cv-badge-amber">BSA 2023</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            1,284 Issued
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Court Admissible & Signed
          </span>
        </div>

        <div className="cv-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>AUDIT TRAIL LOGS</span>
            <span className="cv-badge cv-badge-blue">Live Stream</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            18,420 Events
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 600 }}>
            NIST SP 800-92 Compliant
          </span>
        </div>

      </div>

      {/* FILTER BAR */}
      <div className="cv-card" style={{ padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '0.8125rem', fontWeight: 700 }}>Filter Category:</span>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Reports' },
            { id: 'Executive Summary', label: 'Executive' },
            { id: 'Legal Audit', label: 'Legal Audit (Sec 65B)' },
            { id: 'Operations', label: 'Operations' },
            { id: 'Security Ops', label: 'Security Ops' },
            { id: 'Compliance', label: 'Compliance' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedReportType(f.id)}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedReportType === f.id ? 'var(--accent-primary)' : 'var(--bg-subtle)',
                color: selectedReportType === f.id ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* REPORTS LIST GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredReports.map((r, idx) => (
          <div key={idx} className="cv-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="cv-badge cv-badge-indigo">{r.type}</span>
                <span className="cv-badge cv-badge-emerald" style={{ fontSize: '0.65rem' }}>{r.badge}</span>
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>{r.title}</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Generated: {r.date} • Size: {r.size} • Cryptographically Signed
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button 
                onClick={() => onShowToast(`Downloaded ${r.title} PDF Package ✓`, "success")}
                className="cv-btn cv-btn-primary cv-btn-sm"
                style={{ flex: 1, fontWeight: 700 }}
              >
                <Download size={14} />
                <span>PDF Export</span>
              </button>
              <button 
                onClick={() => onShowToast(`Downloaded ${r.title} CSV Spreadsheet`, "info")}
                className="cv-btn cv-btn-secondary cv-btn-sm"
              >
                <FileSpreadsheet size={14} />
                <span>CSV</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
