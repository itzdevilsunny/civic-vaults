import React from 'react';
import { BarChart3, Download, Printer, FileSpreadsheet, ShieldCheck, PieChart, TrendingUp } from 'lucide-react';

export default function ReportsView({ onShowToast }) {
  const reportsList = [
    { title: "Case Performance & Disposition Report", type: "Executive Summary", date: "Aug 2026", size: "2.4 MB" },
    { title: "Digital Evidence Chain of Custody Audit Log", type: "Legal Audit", date: "Aug 2026", size: "4.8 MB" },
    { title: "Officer Workload & Active Docket Matrix", type: "Operations", date: "Aug 2026", size: "1.8 MB" },
    { title: "Security Incidents & Firewall Breach Summary", type: "Security Ops", date: "Aug 2026", size: "3.1 MB" },
    { title: "Vault Storage & Immutable Retention Compliance", type: "Compliance", date: "Aug 2026", size: "1.2 MB" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Investigation Reports & Intelligence Analytics
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Generate court-admissible PDF reports, officer productivity stats, and chain of custody logs
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => onShowToast("Print queue sent to high-security network printer", "info")}
            className="cv-btn cv-btn-secondary"
          >
            <Printer size={16} />
            <span>Print Docket</span>
          </button>
          <button 
            onClick={() => onShowToast("Exported all investigation metrics to CSV/PDF", "success")}
            className="cv-btn cv-btn-primary"
          >
            <Download size={16} />
            <span>Export All Reports</span>
          </button>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {reportsList.map((r, idx) => (
          <div key={idx} className="cv-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="cv-badge cv-badge-indigo">{r.type}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.date}</span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{r.title}</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>File Size: {r.size} • PDF Signed</p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
              <button 
                onClick={() => onShowToast(`Downloaded ${r.title} PDF`, "success")}
                className="cv-btn cv-btn-primary cv-btn-sm"
                style={{ flex: 1 }}
              >
                <Download size={14} />
                <span>PDF Export</span>
              </button>
              <button 
                onClick={() => onShowToast(`Downloaded ${r.title} CSV`, "info")}
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
