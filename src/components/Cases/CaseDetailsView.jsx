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
  UserCheck,
  Plus,
  Move
} from 'lucide-react';
import { MOCK_EVIDENCE_GRAPH, MOCK_DOCUMENTS } from '../../data/mockData';

export default function CaseDetailsView({ caseData, onBack, onSelectDocument, onShowToast }) {
  const [activeTab, setActiveTab] = useState('graph');
  const [selectedNode, setSelectedNode] = useState(null);

  // Interactive Drag-and-Drop Nodes State
  const [nodes, setNodes] = useState([
    { id: '1', label: `CASE #${caseData?.id || '2026-0789'}`, type: 'Case Docket', x: 400, y: 200, color: '#6366f1' },
    { id: '2', label: 'Insp. Arjun Singh', type: 'Lead Officer', x: 200, y: 100, color: '#3b82f6' },
    { id: '3', label: 'R. Mehta (Lab)', type: 'Forensic Analyst', x: 200, y: 300, color: '#3b82f6' },
    { id: '4', label: "Vikram 'Ghost' Malhotra", type: 'Prime Suspect', x: 600, y: 100, color: '#ef4444' },
    { id: '5', label: 'Dell Server Rack #01', type: 'Physical Evidence', x: 100, y: 200, color: '#10b981' },
    { id: '6', label: 'Shell Account #99812', type: 'Financial Asset', x: 620, y: 280, color: '#8b5cf6' }
  ]);

  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  if (!caseData) return null;

  const caseDocs = MOCK_DOCUMENTS.filter(d => d.caseId === caseData.id || caseData.id === '2026-0789');

  const handleMouseDown = (nodeId, e) => {
    setDraggingNodeId(nodeId);
    const node = nodes.find(n => n.id === nodeId);
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingNodeId) return;
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left;
    const newY = e.clientY - canvasRect.top;

    setNodes(nodes.map(n => n.id === draggingNodeId ? { ...n, x: Math.max(40, Math.min(760, newX)), y: Math.max(40, Math.min(360, newY)) } : n));
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  const handleAddNode = () => {
    const newNode = {
      id: Date.now().toString(),
      label: `Suspect Account #${Math.floor(100 + Math.random() * 900)}`,
      type: 'Linked Node',
      x: 350 + Math.random() * 100,
      y: 150 + Math.random() * 100,
      color: '#f59e0b'
    };
    setNodes([...nodes, newNode]);
    onShowToast("Added new evidence node to interactive investigation canvas", "info");
  };

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
          { id: 'graph', label: 'Interactive Crime Mind Map (USP 🕸️)', icon: Network },
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

      {/* 1. INTERACTIVE DRAG & DROP EVIDENCE GRAPH (USP 🕸️) */}
      {activeTab === 'graph' && (
        <div className="cv-card" style={{ padding: '1.5rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800 }}>
                🕸️ Interactive Drag-and-Drop Investigation Canvas
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Drag nodes around the canvas to map suspect connections, shell accounts, and evidence lines
              </p>
            </div>
            <button onClick={handleAddNode} className="cv-btn cv-btn-secondary cv-btn-sm">
              <Plus size={14} />
              <span>Add Node</span>
            </button>
          </div>

          {/* Canvas Wrapper */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              width: '100%',
              height: '440px',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              position: 'relative',
              overflow: 'hidden',
              userSelect: 'none',
              cursor: draggingNodeId ? 'grabbing' : 'default'
            }}
          >
            {/* SVG Connecting Lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {nodes.slice(1).map((n, idx) => (
                <line
                  key={idx}
                  x1={nodes[0].x}
                  y1={nodes[0].y}
                  x2={n.x}
                  y2={n.y}
                  stroke={n.color}
                  strokeWidth="2.5"
                  strokeDasharray={n.type.includes('Suspect') ? '5' : 'none'}
                />
              ))}
            </svg>

            {/* Draggable HTML Nodes */}
            {nodes.map(n => (
              <div
                key={n.id}
                onMouseDown={e => handleMouseDown(n.id, e)}
                onClick={() => setSelectedNode(n)}
                style={{
                  position: 'absolute',
                  left: `${n.x - 45}px`,
                  top: `${n.y - 25}px`,
                  padding: '0.5rem 0.875rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: n.color,
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.78125rem',
                  boxShadow: 'var(--shadow-md)',
                  cursor: 'grab',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: '2px solid #ffffff',
                  zIndex: 20
                }}
              >
                <Move size={12} style={{ opacity: 0.7 }} />
                <span>{n.label}</span>
              </div>
            ))}

            {/* Selected Node Details Drawer */}
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
                boxShadow: 'var(--shadow-lg)',
                zIndex: 30
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="cv-badge cv-badge-indigo" style={{ fontSize: '0.7rem' }}>
                      {selectedNode.type.toUpperCase()}
                    </span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '0.25rem' }}>
                      {selectedNode.label}
                    </h4>
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
          </div>

          <div className="cv-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Assigned Investigation Officers
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img src={caseData.leadOfficerAvatar} alt="Officer" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{caseData.assignedTo}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{caseData.assignedRole}</div>
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
