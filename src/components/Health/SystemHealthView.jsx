import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Wifi, 
  Server, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Globe,
  Radio,
  BarChart2
} from 'lucide-react';

export default function SystemHealthView({ onShowToast }) {
  const [dbPing, setDbPing] = useState(14);
  const [wsStatus, setWsStatus] = useState('CONNECTED');
  const [cpuUsage, setCpuUsage] = useState(18);
  const [memoryUsage, setMemoryUsage] = useState(34);
  const [requestsPerSec, setRequestsPerSec] = useState(142);

  useEffect(() => {
    const interval = setInterval(() => {
      setDbPing(Math.floor(12 + Math.random() * 8));
      setCpuUsage(Math.floor(15 + Math.random() * 10));
      setMemoryUsage(Math.floor(32 + Math.random() * 5));
      setRequestsPerSec(Math.floor(135 + Math.random() * 25));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              ⚡ System Health & Live Latency Performance Monitor
            </h1>
            <span className="cv-badge cv-badge-emerald">All Systems Operational</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Real-time telemetry, database response latency, edge server cluster status, and CERT-In health monitoring.
          </p>
        </div>

        <button 
          onClick={() => onShowToast("System Telemetry Metrics Refresh Triggered ✓", "info")}
          className="cv-btn cv-btn-secondary"
        >
          <Activity size={16} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* LIVE TELEMETRY METRICS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        <div className="cv-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Database Ping Latency</span>
            <Database size={18} style={{ color: 'var(--success-dark)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--success-dark)' }}>{dbPing} ms</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Supabase ap-south-1 Direct Connection
          </div>
        </div>

        <div className="cv-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Real-Time WebSocket Sync</span>
            <Radio size={18} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>{wsStatus}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--success-dark)', marginTop: '0.2rem' }}>
            ⚡ Channels Subscribed & Listening
          </div>
        </div>

        <div className="cv-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Vault Throughput</span>
            <Zap size={18} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>{requestsPerSec} req/sec</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Peak Capacity: 10,000 req/sec
          </div>
        </div>

        <div className="cv-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>CPU & RAM Load</span>
            <Cpu size={18} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>
            CPU {cpuUsage}% • RAM {memoryUsage}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--success-dark)', marginTop: '0.2rem' }}>
            Healthy Operating Bounds
          </div>
        </div>

      </div>

      {/* EDGE CLUSTER REGIONAL STATUS TABLE */}
      <div className="cv-card" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          🌐 National Edge Vault Relay Node Health
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {[
            { region: "ap-south-1 (Mumbai Main)", status: "ONLINE", ping: "12 ms", uptime: "99.99%" },
            { region: "ap-south-2 (Hyderabad Cold)", status: "ONLINE", ping: "16 ms", uptime: "100%" },
            { region: "gov-cloud-1 (New Delhi NIC)", status: "ONLINE", ping: "8 ms", uptime: "99.98%" },
            { region: "gov-cloud-2 (Bengaluru Data)", status: "ONLINE", ping: "22 ms", uptime: "100%" }
          ].map((r, idx) => (
            <div key={idx} style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>{r.region}</span>
                <span className="cv-badge cv-badge-emerald" style={{ fontSize: '0.68rem' }}>{r.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Latency: <strong style={{ color: 'var(--text-primary)' }}>{r.ping}</strong></span>
                <span>Uptime: <strong style={{ color: 'var(--success-dark)' }}>{r.uptime}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
