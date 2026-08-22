import React, { useState } from 'react';
import { ShieldAlert, Shield, AlertTriangle, Lock, Eye, ArrowRight, UserX } from 'lucide-react';
import { MOCK_SECURITY_LOGS } from '../../data/mockData';

export default function SecurityLogsView({ onOpenAlert, onShowToast }) {
  const [logs] = useState(MOCK_SECURITY_LOGS);
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredLogs = logs.filter(l => 
    severityFilter === 'all' || l.severity.toLowerCase() === severityFilter.toLowerCase()
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Real-Time Security Operations & Incident Monitoring
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Live security threats, unauthorized access attempts, session terminations, and MFA enforcement logs
          </p>
        </div>
        <div className="cv-badge cv-badge-red animate-pulse-glow" style={{ padding: '0.5rem 1rem' }}>
          <ShieldAlert size={16} />
          <span>Active Guardian Monitoring</span>
        </div>
      </div>

      {/* Security Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div className="cv-card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--danger)' }}>CRITICAL ALERTS</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem' }}>02</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>1 requiring active remediation</span>
        </div>

        <div className="cv-card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706' }}>FAILED LOGINS</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem' }}>07</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Last 24 hours stream</span>
        </div>

        <div className="cv-card" style={{ borderLeft: '4px solid var(--info)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--info)' }}>ACTIVE TLS SESSIONS</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem' }}>24</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>0 suspicious nodes</span>
        </div>

        <div className="cv-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success-dark)' }}>ENCRYPTED FILES</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem' }}>1,284</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>100% SHA-256 Verified</span>
        </div>
      </div>

      {/* Severity Filter */}
      <div className="cv-card" style={{ padding: '0.75rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)' }}>Filter Severity:</span>
          {['all', 'critical', 'high', 'medium', 'low'].map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                backgroundColor: severityFilter === sev ? 'var(--accent-primary)' : 'var(--bg-subtle)',
                color: severityFilter === sev ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Security Logs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredLogs.map(log => (
          <div 
            key={log.id}
            onClick={() => onOpenAlert(log)}
            className="cv-card"
            style={{
              padding: '1.25rem',
              cursor: 'pointer',
              borderLeft: `4px solid ${
                log.severity === 'CRITICAL' ? 'var(--danger)' :
                log.severity === 'HIGH' ? '#ef4444' :
                log.severity === 'MEDIUM' ? '#f59e0b' : 'var(--info)'
              }`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`cv-badge ${log.severity === 'CRITICAL' || log.severity === 'HIGH' ? 'cv-badge-red' : 'cv-badge-amber'}`}>
                    {log.severity}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    #{log.id}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    • {log.timestamp}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, marginTop: '0.35rem', color: 'var(--text-primary)' }}>
                  {log.event}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {log.details}
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Origin: <strong>{log.ipAddress}</strong></span>
                  <span>User: <strong>{log.user}</strong></span>
                  <span>Target: <strong>{log.target}</strong></span>
                </div>
              </div>

              <button className="cv-btn cv-btn-danger cv-btn-sm" onClick={e => { e.stopPropagation(); onOpenAlert(log); }}>
                <span>Remediate Incident</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
