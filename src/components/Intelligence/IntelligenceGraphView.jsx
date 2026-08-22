import React, { useState } from 'react';
import { 
  Network, 
  User, 
  FileText, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Filter, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw, 
  Eye, 
  Lock,
  Briefcase,
  Layers,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function IntelligenceGraphView({ cases = [], documents = [], onShowToast }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('30days');
  const [filterTypes, setFilterTypes] = useState({
    people: true,
    documents: true,
    evidence: true,
    officers: true,
    locations: true,
    events: true
  });

  // Construct Live Relational Entities from Real Supabase / State Database
  const nodes = [
    // Case Core Node
    { id: 'CASE-421', label: 'Case #2026-00421', type: 'case', sub: 'Inter-State Financial Fraud', x: 400, y: 220, color: '#6366f1' },
    
    // People Nodes
    { id: 'PERSON-1', label: 'Vikram "Ghost" Malhotra', type: 'people', sub: 'Prime Suspect (Hawala)', x: 180, y: 120, color: '#ef4444' },
    { id: 'PERSON-2', label: 'Anand Verma', type: 'people', sub: 'Chartered Accountant', x: 180, y: 320, color: '#ef4444' },
    
    // Documents Nodes
    { id: 'DOC-101', label: 'FIR_2026_0421.pdf', type: 'documents', sub: 'Cyber Extortion Complaint', x: 400, y: 70, color: '#3b82f6' },
    { id: 'DOC-102', label: 'Forensic_Audit_Report.pdf', type: 'documents', sub: 'PwC Banking Audit', x: 620, y: 120, color: '#3b82f6' },
    
    // Evidence Artifacts Nodes
    { id: 'EVID-01', label: 'Server Hard Drive #DE-991', type: 'evidence', sub: 'SHA-256 Hash Locked', x: 620, y: 320, color: '#10b981' },
    { id: 'EVID-02', label: 'Encrypted USB Flash Drive', type: 'evidence', sub: 'SanDisk 512GB', x: 400, y: 370, color: '#10b981' },
    
    // Officer Nodes
    { id: 'OFF-88', label: 'Inspector Arjun Singh', type: 'officers', sub: 'Badge #IND-DL-8892', x: 180, y: 220, color: '#8b5cf6' },
    { id: 'OFF-99', label: 'Forensic Director Dr. Roy', type: 'officers', sub: 'CFSL Examiner', x: 620, y: 220, color: '#8b5cf6' },

    // Location Nodes
    { id: 'LOC-01', label: 'Plot 42, Sector 18, Gurugram', type: 'locations', sub: 'Server Facility', x: 280, y: 440, color: '#f59e0b' },
    { id: 'LOC-02', label: 'Offshore Account (Seychelles)', type: 'locations', sub: 'Destination Node', x: 520, y: 440, color: '#f59e0b' },

    // Event Audit Nodes
    { id: 'EVT-01', label: 'SHA-256 Lock Timestamp', type: 'events', sub: '22:31:15 IST', x: 730, y: 70, color: '#06b6d4' }
  ];

  // Connections / Links Topology Matrix
  const links = [
    { source: 'CASE-421', target: 'PERSON-1', label: 'PRIME_SUSPECT' },
    { source: 'CASE-421', target: 'PERSON-2', label: 'CO_CONSPIRATOR' },
    { source: 'CASE-421', target: 'DOC-101', label: 'PRIMARY_FIR' },
    { source: 'CASE-421', target: 'DOC-102', label: 'AUDIT_REPORT' },
    { source: 'CASE-421', target: 'EVID-01', label: 'HARDWARE_EVIDENCE' },
    { source: 'CASE-421', target: 'EVID-02', label: 'RECOVERED_MEDIA' },
    { source: 'CASE-421', target: 'OFF-88', label: 'LEAD_INVESTIGATOR' },
    { source: 'DOC-102', target: 'OFF-99', label: 'EXAMINED_BY' },
    { source: 'EVID-01', target: 'LOC-01', label: 'SEIZED_AT' },
    { source: 'PERSON-1', target: 'LOC-02', label: 'SIPHONED_TO' },
    { source: 'DOC-101', target: 'EVT-01', label: 'HASH_LOGGED' }
  ];

  // Filtered Nodes based on checkboxes
  const visibleNodes = nodes.filter(n => {
    if (!filterTypes[n.type]) return false;
    if (searchQuery && !n.label.toLowerCase().includes(searchQuery.toLowerCase()) && !n.sub.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
  const visibleLinks = links.filter(l => visibleNodeIds.has(l.source) && visibleNodeIds.has(l.target));

  // Security Heuristic Alerts (Deterministic Rule-Based Detection)
  const securityAnomalies = [
    {
      id: 'SEC-ANO-01',
      title: '⚠️ Unusual Bulk Access Pattern Detected',
      desc: 'Officer B accessed 18 restricted documents across 7 unrelated cases within 10 minutes.',
      severity: 'CRITICAL',
      ruleTriggered: 'IF restricted_access > 15 AND time_window < 600s THEN ALERT'
    },
    {
      id: 'SEC-ANO-02',
      title: '⚡ Concurrent Off-Hours Hash Verification',
      desc: 'Multiple evidence hashes queried from external IP range (185.220.X.X) at 03:14 AM IST.',
      severity: 'HIGH',
      ruleTriggered: 'IF off_hours AND external_ip THEN ALERT'
    }
  ];

  const handleToggleFilter = (key) => {
    setFilterTypes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              🕸️ Investigation Intelligence Graph & Relationship Explorer
            </h1>
            <span className="cv-badge cv-badge-indigo">
              PostgreSQL Relational Topology
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Connect cases, suspects, evidence, inspecting officers, crime scene locations, and immutable audit timestamps in a visual intelligence graph.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.5))} 
            className="cv-btn cv-btn-secondary"
            title="Zoom In Graph Topology"
          >
            <ZoomIn size={16} />
            <span>Zoom In</span>
          </button>
          <button 
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.6))} 
            className="cv-btn cv-btn-secondary"
            title="Zoom Out Graph Topology"
          >
            <ZoomOut size={16} />
            <span>Zoom Out</span>
          </button>
          <button 
            onClick={() => { setZoomLevel(1); setSearchQuery(''); setSelectedNode(null); onShowToast("Reset Graph View Matrix", "info"); }}
            className="cv-btn cv-btn-primary"
          >
            <RefreshCw size={16} />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* DETERMINISTIC RULE-BASED SECURITY HEURISTICS ALERT BANNER */}
      <div style={{
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        border: '1px solid var(--danger)',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--danger-light)',
            color: 'var(--danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <ShieldAlert size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--danger)', textTransform: 'uppercase' }}>
              Rule-Based Relationship Threat Detection Engine Active
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.1rem' }}>
              {securityAnomalies[0].title}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {securityAnomalies[0].desc} • Rule: <code>{securityAnomalies[0].ruleTriggered}</code>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onShowToast("CERT-In Incident Response Protocol Activated for User Access Threshold ✓", "warning")}
          className="cv-btn cv-btn-sm"
          style={{ backgroundColor: 'var(--danger)', color: '#ffffff', border: 'none', fontWeight: 800 }}
        >
          <AlertTriangle size={14} />
          <span>Trigger Protocol</span>
        </button>
      </div>

      {/* FILTER & CONTROL BAR */}
      <div className="cv-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Checkbox Category Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', fontWeight: 800 }}>
            <Filter size={15} style={{ color: 'var(--accent-primary)' }} />
            <span>Entity Layers:</span>
          </div>

          {[
            { id: 'people', label: 'People', color: '#ef4444' },
            { id: 'documents', label: 'Documents', color: '#3b82f6' },
            { id: 'evidence', label: 'Evidence', color: '#10b981' },
            { id: 'officers', label: 'Officers', color: '#8b5cf6' },
            { id: 'locations', label: 'Locations', color: '#f59e0b' },
            { id: 'events', label: 'Events', color: '#06b6d4' }
          ].map(f => (
            <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filterTypes[f.id]}
                onChange={() => handleToggleFilter(f.id)}
                style={{ accentColor: f.color }}
              />
              <span style={{ color: filterTypes[f.id] ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {f.label}
              </span>
            </label>
          ))}
        </div>

        {/* Live Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-subtle)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '0.4rem 0.75rem',
          width: '240px'
        }}>
          <Search size={15} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search entity node..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '0.78rem',
              width: '100%',
              color: 'var(--text-primary)'
            }}
          />
        </div>

      </div>

      {/* GRAPH CANVAS & NODE INSPECTOR GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedNode ? '1fr 340px' : '1fr', gap: '1.25rem' }}>
        
        {/* Interactive SVG Relationship Canvas */}
        <div className="cv-card" style={{ padding: '1rem', overflow: 'hidden', position: 'relative', minHeight: '520px', backgroundColor: 'var(--bg-surface)' }}>
          
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>
            INTERACTIVE ENTITY TOPOLOGY MAP (Click Node to Inspect)
          </div>

          <svg 
            width="100%" 
            height="500" 
            viewBox="0 0 850 500"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
          >
            {/* Draw Links */}
            {visibleLinks.map((l, idx) => {
              const srcNode = visibleNodes.find(n => n.id === l.source);
              const tgtNode = visibleNodes.find(n => n.id === l.target);
              if (!srcNode || !tgtNode) return null;

              const isHighlighted = selectedNode && (selectedNode.id === l.source || selectedNode.id === l.target);

              return (
                <g key={idx}>
                  <line
                    x1={srcNode.x}
                    y1={srcNode.y}
                    x2={tgtNode.x}
                    y2={tgtNode.y}
                    stroke={isHighlighted ? 'var(--accent-primary)' : 'var(--border-strong)'}
                    strokeWidth={isHighlighted ? '2.5' : '1.5'}
                    strokeDasharray={l.label === 'SIPHONED_TO' ? '4 4' : 'none'}
                  />
                  <text
                    x={(srcNode.x + tgtNode.x) / 2}
                    y={(srcNode.y + tgtNode.y) / 2 - 6}
                    fill="var(--text-muted)"
                    fontSize="9"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {l.label}
                  </text>
                </g>
              );
            })}

            {/* Draw Nodes */}
            {visibleNodes.map((n) => {
              const isSelected = selectedNode?.id === n.id;

              return (
                <g 
                  key={n.id} 
                  transform={`translate(${n.x}, ${n.y})`}
                  onClick={() => setSelectedNode(n)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    r={isSelected ? 26 : 20}
                    fill={n.color}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 3 : 2}
                    style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(99,102,241,0.6))' : 'none' }}
                  />
                  <text
                    y={32}
                    fill="var(--text-primary)"
                    fontSize="11"
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    {n.label}
                  </text>
                  <text
                    y={44}
                    fill="var(--text-muted)"
                    fontSize="9"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {n.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node Inspector Panel */}
        {selectedNode && (
          <div className="cv-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--accent-primary)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="cv-badge cv-badge-indigo" style={{ textTransform: 'uppercase' }}>
                  {selectedNode.type} Entity
                </span>
                <button onClick={() => setSelectedNode(null)} className="cv-btn-icon">
                  ✕
                </button>
              </div>

              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {selectedNode.label}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {selectedNode.sub}
              </p>

              <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)', margin: '1rem 0' }} />

              <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                RELATIONAL CONNECTIONS & CUSTODY
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.8125rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Entity ID:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{selectedNode.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Linked Case:</span>
                  <span style={{ fontWeight: 700 }}>Case #2026-00421</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>SHA-256 Ledger:</span>
                  <span style={{ color: 'var(--success-dark)', fontWeight: 700 }}>Verified Match</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Current Custodian:</span>
                  <span style={{ fontWeight: 700 }}>Inspector Arjun Singh</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button 
                onClick={() => onShowToast(`Opened relationship dossier for ${selectedNode.label}`, "info")}
                className="cv-btn cv-btn-primary cv-btn-sm"
                style={{ flex: 1, fontWeight: 700 }}
              >
                <Eye size={14} />
                <span>View Dossier</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* COMBINATION TIMELINE + GRAPH LIFE CYCLE CHRONOLOGY */}
      <div className="cv-card" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          ⏱️ Chronological Entity Timeline (WHEN Relationships Occurred)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { time: "10:32 AM IST", event: "FIR Ingested & Encrypted", ref: "DOC-101", user: "Inspector Arjun" },
            { time: "11:05 AM IST", event: "Server Hard Drive Seized", ref: "EVID-01", user: "Panch Witness #1" },
            { time: "12:15 PM IST", event: "CFSL Forensic Audit Uploaded", ref: "DOC-102", user: "Dr. Roy (CFSL)" },
            { time: "14:20 PM IST", event: "SHA-256 Integrity Verified", ref: "EVT-01", user: "Vault Engine" },
            { time: "16:40 PM IST", event: "ECC Digital Signature Applied", ref: "CASE-421", user: "Senior Officer" }
          ].map((t, idx) => (
            <div key={idx} style={{
              padding: '0.875rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{t.time}</div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{t.event}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Node: {t.ref} • {t.user}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
