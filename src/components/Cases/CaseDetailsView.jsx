import React, { useState } from 'react';
import { 
  Briefcase, 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Users, 
  Network, 
  Lock, 
  CheckCircle2, 
  PlusCircle, 
  Share2, 
  Download, 
  Edit3, 
  FileSpreadsheet,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { MOCK_EVIDENCE_GRAPH, MOCK_DOCUMENTS } from '../../data/mockData';

export default function CaseDetailsView({ caseData, onBack, onSelectDocument, onShowToast }) {
  const [activeTab, setActiveTab] = useState('graph'); // Default to the Evidence Relationship Graph to WOW the user!
  const [selectedNode, setSelectedNode] = useState(null);

  if (!caseData) return null;

  const caseDocs = MOCK_DOCUMENTS.filter(d => d.caseId === caseData.id || caseData.id === '2026-0789');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Back Button & Header */}
      <div>
        <button 
          onClick={onBack}
          className="cv-btn cv-btn-secondary cv-btn-sm"
          style={{ marginBottom: '1rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Cases List</span>
        </button>

        <div className="cv-card" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.35rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  CASE #{caseData.id}
                </span>
                <span className={`cv-badge ${
                  caseData.status === 'Under Investigation' ? 'cv-badge-indigo' : 'cv-badge-blue'
                }`}>
                  {caseData.status}
                </span>
                <span className="cv-badge cv-badge-red">
                  Priority: {caseData.priority}
                </span>
                {caseData.legalHold && (
                  <span className="cv-badge cv-badge-emerald">
                    Legal Hold Active
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {caseData.title}
              </h1>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                Lead Assigned Inspector: <strong>{caseData.assignedTo}</strong> ({caseData.assignedRole}) • Created Date: {caseData.dateCreated}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => onShowToast(`Generated Comprehensive Case Report PDF for #${caseData.id}`, 'success')}
                className="cv-btn cv-btn-primary"
              >
                <FileSpreadsheet size={16} />
                <span>Generate Official Report</span>
              </button>
              <button 
                onClick={() => onShowToast(`Case #${caseData.id} priority updated`, 'info')}
                className="cv-btn cv-btn-secondary"
              >
                <Edit3 size={16} />
                <span>Edit Case</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.5rem',
        overflowX: 'auto'
      }}>
        {[
          { id: 'graph', label: 'Evidence Relationship Graph (USP 🕸️)', icon: Network },
          { id: 'overview', label: 'Overview', icon: Briefcase },
          { id: 'documents', label: 'Documents & Evidence', icon: FileText, badge: caseDocs.length },
          { id: 'timeline', label: 'Investigation Timeline', icon: Clock },
          { id: 'officers', label: 'Assigned Officers', icon: Users }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-surface)',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="cv-badge cv-badge-indigo" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENTS */}

      {/* 1. EVIDENCE RELATIONSHIP GRAPH (USP 🕸️) */}
      {activeTab === 'graph' && (
        <div className="cv-card" style={{ padding: '1.5rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800 }}>
                🕸️ Interactive Evidence & Suspect Relationship Network
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Click on any node (Case, Officer, Evidence, Suspect, Report) to inspect linked criminal intelligence
              </p>
            </div>
            <span className="cv-badge cv-badge-emerald">
              Interactive Network View
            </span>
          </div>

          {/* SVG Relationship Graph Canvas */}
          <div style={{
            width: '100%',
            height: '420px',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 800 400" style={{ width: '100%', height: '100%' }}>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted)" />
                </marker>
              </defs>

              {/* Connecting Edges */}
              <line x1="400" y1="200" x2="200" y2="100" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4" markerEnd="url(#arrow)" />
              <line x1="400" y1="200" x2="200" y2="300" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4" markerEnd="url(#arrow)" />
              <line x1="400" y1="200" x2="600" y2="100" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
              <line x1="200" y1="100" x2="100" y2="200" stroke="#10b981" strokeWidth="2" />
              <line x1="200" y1="300" x2="100" y2="200" stroke="#10b981" strokeWidth="2" />
              <line x1="200" y1="300" x2="320" y2="340" stroke="#f59e0b" strokeWidth="2" />
              <line x1="600" y1="100" x2="100" y2="200" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="2" />

              {/* Nodes */}
              {/* Central Case Node */}
              <g onClick={() => setSelectedNode(MOCK_EVIDENCE_GRAPH.nodes[0])} style={{ cursor: 'pointer' }}>
                <circle cx="400" cy="200" r="42" fill="#6366f1" stroke="#ffffff" strokeWidth="4" />
                <text x="400" y="196" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">CASE #2026-0789</text>
                <text x="400" y="210" textAnchor="middle" fill="#ffffff" fontSize="9">Cyber Fraud</text>
              </g>

              {/* Officer 1 */}
              <g onClick={() => setSelectedNode(MOCK_EVIDENCE_GRAPH.nodes[1])} style={{ cursor: 'pointer' }}>
                <circle cx="200" cy="100" r="32" fill="#3b82f6" stroke="#ffffff" strokeWidth="3" />
                <text x="200" y="98" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">Insp. Arjun</text>
                <text x="200" y="110" textAnchor="middle" fill="#ffffff" fontSize="8">Lead Officer</text>
              </g>

              {/* Officer 2 */}
              <g onClick={() => setSelectedNode(MOCK_EVIDENCE_GRAPH.nodes[2])} style={{ cursor: 'pointer' }}>
                <circle cx="200" cy="300" r="32" fill="#3b82f6" stroke="#ffffff" strokeWidth="3" />
                <text x="200" y="298" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">R. Mehta</text>
                <text x="200" y="310" textAnchor="middle" fill="#ffffff" fontSize="8">Forensics</text>
              </g>

              {/* Suspect Node */}
              <g onClick={() => setSelectedNode(MOCK_EVIDENCE_GRAPH.nodes[3])} style={{ cursor: 'pointer' }}>
                <circle cx="600" cy="100" r="36" fill="#ef4444" stroke="#ffffff" strokeWidth="4" />
                <text x="600" y="96" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">Karan Oberoi</text>
                <text x="600" y="110" textAnchor="middle" fill="#ffffff" fontSize="8">Primary Suspect</text>
              </g>

              {/* Evidence 1 */}
              <g onClick={() => setSelectedNode(MOCK_EVIDENCE_GRAPH.nodes[4])} style={{ cursor: 'pointer' }}>
                <circle cx="100" cy="200" r="30" fill="#10b981" stroke="#ffffff" strokeWidth="3" />
                <text x="100" y="198" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">Server Capture</text>
                <text x="100" y="210" textAnchor="middle" fill="#ffffff" fontSize="8">Hardware Evid.</text>
              </g>

              {/* Report 1 */}
              <g onClick={() => setSelectedNode(MOCK_EVIDENCE_GRAPH.nodes[6])} style={{ cursor: 'pointer' }}>
                <circle cx="320" cy="340" r="28" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />
                <text x="320" y="338" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">IP Packet Dump</text>
                <text x="320" y="350" textAnchor="middle" fill="#ffffff" fontSize="8">Packet Log</text>
              </g>
            </svg>

            {/* Selected Node Details Drawer Overlay */}
            {selectedNode && (
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                width: '280px',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="cv-badge cv-badge-indigo" style={{ fontSize: '0.7rem' }}>
                      {selectedNode.type.toUpperCase()}
                    </span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '0.25rem' }}>
                      {selectedNode.label}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {selectedNode.sub}
                    </p>
                  </div>
                  <button onClick={() => setSelectedNode(null)} className="cv-btn-icon" style={{ padding: '0.2rem' }}>
                    ✕
                  </button>
                </div>
                <button 
                  onClick={() => onShowToast(`Inspecting linked evidence chain for ${selectedNode.label}`, 'info')}
                  className="cv-btn cv-btn-primary cv-btn-sm"
                  style={{ width: '100%', marginTop: '0.75rem' }}
                >
                  View Node Intelligence
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          <div className="cv-card">
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Executive Case Summary & Investigation Scope
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {caseData.summary}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '0.875rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date Initiated</span>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{caseData.dateCreated}</div>
              </div>
              <div style={{ padding: '0.875rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Jurisdiction</span>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Special Crime Cell - Zone 4</div>
              </div>
            </div>
          </div>

          <div className="cv-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Assigned Investigation Officers
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={caseData.leadOfficerAvatar} alt="Officer" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{caseData.assignedTo}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{caseData.assignedRole}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. DOCUMENTS TAB */}
      {activeTab === 'documents' && (
        <div className="cv-card">
          <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '1rem' }}>
            Case Documents & Linked Evidence ({caseDocs.length})
          </h3>
          <div className="cv-table-container">
            <table className="cv-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Category</th>
                  <th>Classification</th>
                  <th>Uploaded By</th>
                  <th>SHA-256 Checksum</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {caseDocs.map(doc => (
                  <tr key={doc.id} onClick={() => onSelectDocument(doc)} style={{ cursor: 'pointer' }}>
                    <td style={{ fontWeight: 700 }}>{doc.name}</td>
                    <td>{doc.type}</td>
                    <td>
                      <span className="cv-badge cv-badge-indigo">{doc.classification}</span>
                    </td>
                    <td>{doc.uploadedBy}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                      {doc.sha256.substring(0, 16)}...
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => onSelectDocument(doc)} className="cv-btn cv-btn-secondary cv-btn-sm">
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
