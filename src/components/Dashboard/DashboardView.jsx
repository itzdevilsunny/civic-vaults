import React, { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  Clock, 
  ShieldAlert, 
  TrendingUp, 
  TrendingDown, 
  PlusCircle, 
  Upload, 
  Share2, 
  FileQuestion, 
  UserPlus, 
  BarChart3, 
  Shield, 
  MoreVertical, 
  CheckCircle2, 
  Eye, 
  Lock, 
  Activity,
  HardDrive,
  Calendar,
  ChevronRight,
  Filter,
  ArrowRight,
  ShieldCheck,
  Hash,
  History,
  Sparkles
} from 'lucide-react';

export default function DashboardView({ 
  kpis, 
  casesOverview, 
  documentsByType, 
  recentCases, 
  activities, 
  onSelectCase, 
  onSelectDocument, 
  onOpenUpload, 
  onOpenCreateCase,
  onChangeView,
  onShowToast,
  onOpenAlert
}) {
  const [dateFilter, setDateFilter] = useState('This Month');
  const [caseFilterStatus, setCaseFilterStatus] = useState('all');

  const filteredCases = caseFilterStatus === 'all' 
    ? recentCases 
    : recentCases.filter(c => c.status.toLowerCase().includes(caseFilterStatus.toLowerCase()));

  const workflowSteps = [
    { step: 1, label: 'Create Case', icon: PlusCircle, action: onOpenCreateCase, badge: 'Step 1' },
    { step: 2, label: 'Upload FIR / Evidence', icon: Upload, action: onOpenUpload, badge: 'Step 2' },
    { step: 3, label: 'Generate SHA-256', icon: Hash, action: () => onShowToast("SHA-256 Web-Crypto Byte Checksum Generated ✓", "info"), badge: 'Step 3' },
    { step: 4, label: 'Access Control & Share', icon: Share2, action: () => onShowToast("Select a document to set access permissions", "info"), badge: 'Step 4' },
    { step: 5, label: 'Chain of Custody', icon: ShieldCheck, action: () => onChangeView('chain-of-custody'), badge: 'Step 5' },
    { step: 6, label: 'Verify Integrity', icon: CheckCircle2, action: () => onChangeView('chain-of-custody'), badge: 'Step 6' },
    { step: 7, label: 'Audit Trail', icon: History, action: () => onChangeView('audit-trail'), badge: 'Step 7' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* 1. PAGE HEADER WITH GREETING & DATE FILTER */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Welcome back, Inspector! 👋
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Here's what's happening with your legal investigations, digital evidence, and security events today.
          </p>
        </div>

        {/* Date Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            padding: '0.4rem 0.875rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Calendar size={16} style={{ color: 'var(--accent-primary)' }} />
            <select
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="This Year">This Year</option>
              <option value="Custom Range">Custom Range</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🚀 CORE INVESTIGATION WORKFLOW STEPPER CARD */}
      <div className="cv-card" style={{
        padding: '1.25rem 1.5rem',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(59,130,246,0.06) 100%)',
        border: '1px solid var(--accent-primary)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>
              PRIMARY CASEVAULT MVP WORKFLOW
            </span>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              🚀 End-to-End Evidence Traceability & Integrity Pipeline
            </h3>
          </div>
          <span className="cv-badge cv-badge-emerald">
            Fully Operable Pipeline
          </span>
        </div>

        {/* Stepper Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.75rem',
          alignItems: 'center'
        }}>
          {workflowSteps.map((ws, idx) => {
            const Icon = ws.icon;
            return (
              <div 
                key={ws.step}
                onClick={ws.action}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.75rem 0.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                className="workflow-step-btn"
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.35rem',
                  fontWeight: 800
                }}>
                  <Icon size={16} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  {ws.label}
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {ws.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. KPI CARDS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem'
      }}>
        
        {/* Card 1: ACTIVE CASES */}
        <div 
          onClick={() => onChangeView('cases')}
          className="cv-card" 
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ACTIVE CASES
              </span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                {kpis.activeCases.count}
              </div>
            </div>
            <div className="cv-badge cv-badge-indigo" style={{ padding: '0.625rem' }}>
              <Briefcase size={22} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '1rem', fontSize: '0.75rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--success-dark)', fontWeight: 700 }}>
              <TrendingUp size={14} style={{ marginRight: '2px' }} /> {kpis.activeCases.trend}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>{kpis.activeCases.period}</span>
          </div>
        </div>

        {/* Card 2: TOTAL DOCUMENTS */}
        <div 
          onClick={() => onChangeView('documents')}
          className="cv-card" 
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                TOTAL DOCUMENTS
              </span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                {kpis.totalDocuments.count.toLocaleString()}
              </div>
            </div>
            <div className="cv-badge cv-badge-blue" style={{ padding: '0.625rem' }}>
              <FileText size={22} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '1rem', fontSize: '0.75rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--success-dark)', fontWeight: 700 }}>
              <TrendingUp size={14} style={{ marginRight: '2px' }} /> {kpis.totalDocuments.trend}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>{kpis.totalDocuments.period}</span>
          </div>
        </div>

        {/* Card 3: PENDING APPROVALS */}
        <div 
          onClick={() => onChangeView('documents')}
          className="cv-card" 
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                PENDING APPROVALS
              </span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                {kpis.pendingApprovals.count}
              </div>
            </div>
            <div className="cv-badge cv-badge-amber" style={{ padding: '0.625rem' }}>
              <Clock size={22} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '1rem', fontSize: '0.75rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--success-dark)', fontWeight: 700 }}>
              <TrendingDown size={14} style={{ marginRight: '2px' }} /> {kpis.pendingApprovals.trend}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>{kpis.pendingApprovals.period}</span>
          </div>
        </div>

        {/* Card 4: SECURITY ALERTS */}
        <div 
          onClick={() => onChangeView('security-logs')}
          className="cv-card" 
          style={{ 
            cursor: 'pointer',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            backgroundColor: 'var(--bg-surface)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--danger)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                SECURITY ALERTS
              </span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--danger-dark)', marginTop: '0.25rem' }}>
                0{kpis.securityAlerts.count}
              </div>
            </div>
            <div className="cv-badge cv-badge-red animate-pulse-glow" style={{ padding: '0.625rem' }}>
              <ShieldAlert size={22} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '1rem', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--danger-dark)', fontWeight: 700 }}>
              Requires Immediate Review
            </span>
          </div>
        </div>

      </div>

      {/* 3. MAIN DASHBOARD CONTENT GRID (Left 2-Cols + Right 1-Col) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 360px',
        gap: '1.5rem'
      }} className="dashboard-grid-main">
        
        {/* LEFT COLUMN: Charts & Recent Cases Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* DONUT CHART & DOCUMENTS BY TYPE PROGRESS GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.25rem'
          }} className="dashboard-grid-two-charts">
            
            {/* Chart A: Cases Overview Donut */}
            <div className="cv-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Cases Overview</h3>
                <button onClick={() => onChangeView('cases')} className="cv-btn cv-btn-secondary cv-btn-sm">
                  View All
                </button>
              </div>

              {/* Donut Visualizer SVG Container */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                minHeight: '190px'
              }}>
                <div style={{ position: 'relative', width: '140px', height: '140px', flexShrink: 0 }}>
                  <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="14" fill="none" stroke="var(--bg-subtle)" strokeWidth="4" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#6366f1" strokeWidth="4.5" strokeDasharray="37.7 88" strokeDashoffset="0" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="18.8 88" strokeDashoffset="-37.7" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="14.6 88" strokeDashoffset="-56.5" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="4.5" strokeDasharray="16.7 88" strokeDashoffset="-71.1" />
                  </svg>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                      {casesOverview.total}
                    </span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Cases</span>
                  </div>
                </div>

                {/* Legend List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                  <div 
                    onClick={() => setCaseFilterStatus('under investigation')}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
                    <span style={{ color: 'var(--text-secondary)', flex: 1 }}>Under Investigation</span>
                    <span style={{ fontWeight: 700 }}>18 (42.9%)</span>
                  </div>
                  <div 
                    onClick={() => setCaseFilterStatus('pending review')}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
                    <span style={{ color: 'var(--text-secondary)', flex: 1 }}>Pending Review</span>
                    <span style={{ fontWeight: 700 }}>9 (21.4%)</span>
                  </div>
                  <div 
                    onClick={() => setCaseFilterStatus('awaiting approval')}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                    <span style={{ color: 'var(--text-secondary)', flex: 1 }}>Awaiting Approval</span>
                    <span style={{ fontWeight: 700 }}>7 (16.7%)</span>
                  </div>
                  <div 
                    onClick={() => setCaseFilterStatus('closed')}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                    <span style={{ color: 'var(--text-secondary)', flex: 1 }}>Closed</span>
                    <span style={{ fontWeight: 700 }}>8 (19.0%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart B: Documents by Type Horizontal Progress Bars */}
            <div className="cv-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Documents by Type</h3>
                <button onClick={() => onChangeView('documents')} className="cv-btn cv-btn-secondary cv-btn-sm">
                  View All
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {documentsByType.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.type}</span>
                      <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>{item.count}</span>
                    </div>
                    <div style={{
                      height: '7px',
                      backgroundColor: 'var(--bg-subtle)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${item.percentage * 2.5}%`,
                        height: '100%',
                        backgroundColor: item.color,
                        borderRadius: '4px',
                        transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RECENT CASES DATA TABLE */}
          <div className="cv-card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>Recent Investigation Cases</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Active case dockets, lead officers, and last activity timestamps
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => onChangeView('cases')} className="cv-btn cv-btn-secondary cv-btn-sm">
                  View All Cases
                </button>
                <button onClick={onOpenCreateCase} className="cv-btn cv-btn-primary cv-btn-sm">
                  <PlusCircle size={14} />
                  <span>New Case</span>
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="cv-table-container">
              <table className="cv-table">
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Case Title</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map(c => (
                    <tr 
                      key={c.id} 
                      onClick={() => onSelectCase(c)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-primary)' }}>
                        #{c.id}
                      </td>
                      <td style={{ fontWeight: 600 }}>
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
                          <img 
                            src={c.leadOfficerAvatar} 
                            alt={c.assignedTo}
                            style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <span>{c.assignedTo}</span>
                        </div>
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
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                        {c.lastUpdated}
                      </td>
                      <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => onSelectCase(c)}
                          className="cv-btn-icon"
                          title="Open Case Details"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DOCUMENT ACTIVITY AREA CHART */}
          <div className="cv-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Document Activity Trends (This Month)</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Uploads, downloads, shares, and hash integrity checks stream
                </p>
              </div>
              <div className="cv-badge cv-badge-emerald">
                +18.2% from previous period
              </div>
            </div>

            {/* Area Chart SVG simulation */}
            <div style={{ width: '100%', height: '180px', position: 'relative' }}>
              <svg viewBox="0 0 500 150" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,120 Q50,60 100,90 T200,40 T300,70 T400,20 T500,60 L500,150 L0,150 Z"
                  fill="url(#chartGradient)"
                />
                <path
                  d="M0,120 Q50,60 100,90 T200,40 T300,70 T400,20 T500,60"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                />
                <circle cx="400" cy="20" r="5" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
              </svg>
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '90px',
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                boxShadow: 'var(--shadow-sm)'
              }}>
                156 Ingested
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Activity Stream & Quick Actions & Security Widget */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* QUICK ACTIONS GRID PANEL */}
          <div className="cv-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Quick Actions
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem'
            }}>
              <button 
                onClick={onOpenUpload}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 0.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--accent-light)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  color: 'var(--accent-primary)',
                  fontWeight: 700,
                  fontSize: '0.78125rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                className="quick-action-btn"
              >
                <Upload size={22} />
                <span>Upload Document</span>
              </button>

              <button 
                onClick={onOpenCreateCase}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 0.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--info-light)',
                  border: '1px solid rgba(37,99,235,0.2)',
                  color: 'var(--info)',
                  fontWeight: 700,
                  fontSize: '0.78125rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                className="quick-action-btn"
              >
                <PlusCircle size={22} />
                <span>Create New Case</span>
              </button>

              <button 
                onClick={() => onShowToast("Select a document from list to initiate encrypted sharing", "info")}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 0.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--success-light)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  color: 'var(--success-dark)',
                  fontWeight: 700,
                  fontSize: '0.78125rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                className="quick-action-btn"
              >
                <Share2 size={22} />
                <span>Share Document</span>
              </button>

              <button 
                onClick={() => onShowToast("Document permission request sent to Senior Command", "success")}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 0.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--warning-light)',
                  border: '1px solid rgba(245,158,11,0.2)',
                  color: '#d97706',
                  fontWeight: 700,
                  fontSize: '0.78125rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                className="quick-action-btn"
              >
                <FileQuestion size={22} />
                <span>Document Request</span>
              </button>
            </div>
          </div>

          {/* REAL-TIME RECENT ACTIVITY STREAM */}
          <div className="cv-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Recent Activity</h3>
              <button onClick={() => onChangeView('audit-trail')} className="cv-btn cv-btn-secondary cv-btn-sm">
                View All
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activities.map((act) => (
                <div key={act.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: `${act.badgeColor}15`,
                    color: act.badgeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <Activity size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {act.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {act.detail}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      By {act.user} • {act.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DEDICATED SECURITY OVERVIEW WIDGET */}
          <div className="cv-card" style={{ border: '1px solid var(--border-strong)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={18} style={{ color: 'var(--accent-primary)' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Security Overview</h3>
              </div>
              <button onClick={() => onChangeView('security-logs')} className="cv-btn cv-btn-secondary cv-btn-sm">
                View Logs
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)'
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL LOGINS</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>128</div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--success-dark)' }}>↑ 12.3% active</span>
              </div>

              <div 
                onClick={() => onOpenAlert(MOCK_SECURITY_LOGS[0])}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--danger-light)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '0.7rem', color: 'var(--danger-dark)', fontWeight: 700 }}>FAILED ATTEMPTS</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--danger-dark)' }}>7</div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--danger-dark)' }}>Requires Review</span>
              </div>

              <div style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)'
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE SESSIONS</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>24</div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--info)' }}>TLS 1.3 Protected</span>
              </div>

              <div style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)'
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>ENCRYPTED DOCS</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>1,284</div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--success-dark)' }}>100% AES-256</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
