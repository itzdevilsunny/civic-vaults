import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Eye, 
  ShieldCheck, 
  FolderLock, 
  History, 
  Users, 
  Activity, 
  Key, 
  Database, 
  Share2, 
  GitCommit, 
  Package, 
  FileSpreadsheet, 
  AlertTriangle, 
  HardDrive, 
  Inbox, 
  Check, 
  Sun, 
  Moon, 
  Globe, 
  Sparkles,
  ChevronRight,
  Layers,
  FileSearch,
  UserCheck,
  Building2,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function LandingPage({ onLaunchDashboard, theme, onToggleTheme, onShowToast }) {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState('01');
  const [activeRole, setActiveRole] = useState('officer');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-surface)',
      color: 'var(--text-primary)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: 1.5
    }}>

      {/* 1. NAVBAR (Sticky with subtle border) */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0.875rem 2rem'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={onLaunchDashboard}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}>
              <Shield size={22} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: '1.125rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.04em', lineHeight: 1.1 }}>
                CASEVAULT
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Secure. Compliant. Trusted.
              </div>
            </div>
          </div>

          {/* Center Links */}
          <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }} className="landing-nav-links">
            <a onClick={() => scrollToSection('platform')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Platform</a>
            <a onClick={() => scrollToSection('security')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Security</a>
            <a onClick={() => scrollToSection('evidence')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Evidence</a>
            <a onClick={() => scrollToSection('compliance')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Compliance</a>
            <a onClick={() => scrollToSection('roles')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Features</a>
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={onToggleTheme}
              className="cv-btn-icon" 
              title="Toggle Light/Dark Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} style={{ color: '#f59e0b' }} />}
            </button>

            <button 
              onClick={onLaunchDashboard}
              className="cv-btn cv-btn-secondary"
              style={{ fontWeight: 700, fontSize: '0.875rem' }}
            >
              Sign In
            </button>

            <button 
              onClick={onLaunchDashboard}
              className="cv-btn cv-btn-primary"
              style={{ fontWeight: 800, padding: '0.55rem 1.25rem', fontSize: '0.875rem' }}
            >
              <span>Access CaseVault</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section style={{
        padding: '5rem 2rem 4rem 2rem',
        background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.875rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent-primary)',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            marginBottom: '1.5rem',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}>
            <ShieldCheck size={14} />
            <span>SECURE DIGITAL INVESTIGATION PLATFORM</span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            maxWidth: '900px',
            margin: '0 auto 1.25rem auto'
          }}>
            Secure Every Document. <br />
            <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Protect Every Case.
            </span>
          </h1>

          {/* Second line accent subhead */}
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            margin: '0 auto 2rem auto',
            fontWeight: 500,
            lineHeight: 1.6
          }}>
            From evidence intake to final disposition, CaseVault keeps every investigation record secure, traceable, and under control.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <button 
              onClick={onLaunchDashboard}
              className="cv-btn cv-btn-primary"
              style={{ padding: '0.875rem 2rem', fontSize: '1rem', fontWeight: 800, boxShadow: 'var(--shadow-glow)' }}
            >
              <span>Access CaseVault</span>
              <ArrowRight size={18} />
            </button>

            <button 
              onClick={() => scrollToSection('platform')}
              className="cv-btn cv-btn-secondary"
              style={{ padding: '0.875rem 1.75rem', fontSize: '1rem', fontWeight: 700 }}
            >
              <span>Explore Platform</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            marginBottom: '3.5rem'
          }}>
            <span>🔐 Encrypted</span>
            <span>•</span>
            <span>✓ Access Controlled</span>
            <span>•</span>
            <span>◉ Fully Audited</span>
            <span>•</span>
            <span>⚖ Evidence Integrity</span>
          </div>

          {/* Hero Visual Interface Preview */}
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
            backgroundColor: 'var(--bg-surface)',
            overflow: 'hidden',
            textAlign: 'left'
          }}>
            {/* Top Bar Mockup */}
            <div style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: 'var(--bg-subtle)',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', items: 'center', gap: '0.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                  casevault.mha.gov.in / docket / #2026-00421
                </span>
              </div>
              <div className="cv-badge cv-badge-emerald" style={{ fontSize: '0.7rem', fontWeight: 800 }}>
                ● TLS 1.3 Active
              </div>
            </div>

            {/* Dashboard Mockup Body */}
            <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              
              <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.35rem' }}>
                  ACTIVE DOCKET #2026-00421
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Cyber Extortion & Banking Heist
                </h4>
                <p style={{ fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                  Lead Officer: Inspector Arjun Singh • Priority: Critical
                </p>
                <div style={{ marginTop: '0.875rem', display: 'flex', gap: '0.5rem' }}>
                  <span className="cv-badge cv-badge-emerald">SHA-256 Verified ✓</span>
                  <span className="cv-badge cv-badge-indigo">Legal Hold Active</span>
                </div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  CHAIN OF CUSTODY TIMELINE
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>09:14 Evidence Intake Ingested</span>
                    <strong style={{ color: 'var(--accent-primary)' }}>EV-2026-9901</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>10:05 Custody Handoff Signed</span>
                    <strong style={{ color: 'var(--success-dark)' }}>Dr. Raman (CFSL)</strong>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  REAL-TIME AUDIT LOG STREAM
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div>[13:42:08] SHA-256 Verified (100% Match)</div>
                  <div>[13:43:16] Section 65B Certificate Issued</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section id="platform" style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Investigation data shouldn't be fragmented.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Modern law enforcement faces severe bottlenecks when managing critical digital evidence across legacy systems.
            </p>
          </div>

          {/* Pain Point Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            
            <div className="cv-card" style={{ padding: '1.75rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <FileText size={22} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                📁 Scattered Records
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Documents distributed across physical paper files, unencrypted local drives, and disconnected legacy systems.
              </p>
            </div>

            <div className="cv-card" style={{ padding: '1.75rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: 'rgba(245,158,11,0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Lock size={22} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                🔓 Unauthorized Access
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Sensitive investigation information requires strict, role-based controlled access without security loopholes.
              </p>
            </div>

            <div className="cv-card" style={{ padding: '1.75rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: 'rgba(99,102,241,0.1)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <AlertTriangle size={22} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                ⚠️ Integrity Risks
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Untracked modifications or unverified checksums can compromise document reliability in court trials.
              </p>
            </div>

            <div className="cv-card" style={{ padding: '1.75rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Search size={22} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                🔎 Slow Retrieval
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Locating crucial case records and cross-referencing suspects across dockets shouldn't take hours or days.
              </p>
            </div>

          </div>

          {/* Transition Banner */}
          <div style={{
            textAlign: 'center',
            padding: '1.5rem',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--accent-primary)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              CaseVault brings the entire document lifecycle into one secure environment.
            </h4>
          </div>

        </div>
      </section>

      {/* 4. PLATFORM OVERVIEW (Horizontal Lifecycle) */}
      <section style={{ padding: '5rem 2rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              One platform. Every stage of the case.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              End-to-end evidence workflow compliant with NIST SP 800-92, BNSS 2023, and BSA 2023.
            </p>
          </div>

          {/* Horizontal Lifecycle */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
            {[
              { stage: 'INTAKE', icon: Inbox, desc: 'Register evidence & source provenance' },
              { stage: 'ORGANIZE', icon: Layers, desc: 'Link to case dockets & metadata' },
              { stage: 'SECURE', icon: Lock, desc: 'Apply AES-256 & SHA-256 hash locks' },
              { stage: 'COLLABORATE', icon: Share2, desc: 'Share with authorized officers' },
              { stage: 'VERIFY', icon: ShieldCheck, desc: 'Perform live checksum audits' },
              { stage: 'AUDIT', icon: History, desc: 'Record immutable event trails' },
              { stage: 'PRESERVE', icon: FolderLock, desc: 'Apply legal holds & retention' },
              { stage: 'EXPORT', icon: Package, desc: 'Generate signed case packages' }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} style={{
                  padding: '1.25rem 0.875rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComp size={18} />
                  </div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
                    {item.stage}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    {item.desc}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. CORE PRODUCT SHOWCASE */}
      <section id="evidence" style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          
          {/* Showcase A: Secure Document Management */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                SECURE DOCUMENT MANAGEMENT
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.2 }}>
                Centralize every investigation record.
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Maintain complete control over investigation dockets, FIR filings, witness statements, and forensic reports with granular access permissions and automatic versioning.
              </p>

              <button onClick={onLaunchDashboard} className="cv-btn cv-btn-primary" style={{ fontWeight: 800 }}>
                <span>Explore Documents</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* UI Mockup Card */}
            <div className="cv-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 800 }}>Case Repository (#2026-00421)</h4>
                <span className="cv-badge cv-badge-indigo">4 Documents Ingested</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.8125rem' }}>FIR_2026_0789_CyberCrime.pdf</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>FIR / Complaints • v2.0 • Highly Restricted</div>
                  </div>
                  <span className="cv-badge cv-badge-emerald">Verified ✓</span>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.8125rem' }}>Evidence_Image_ServerRack_01.jpg</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Digital Evidence • v1.0 • Restricted</div>
                  </div>
                  <span className="cv-badge cv-badge-emerald">Verified ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Showcase B: Evidence Integrity & Chain of Custody */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            
            {/* Chain of Custody Flow Card */}
            <div className="cv-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 800 }}>Evidence Lifecycle Ledger</h4>
                <span className="cv-badge cv-badge-emerald" style={{ fontWeight: 800 }}>Integrity Verified ✓</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.78125rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px' }}>
                  1. Evidence Registered ➔ EV-2026-00421
                </div>
                <div style={{ padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px' }}>
                  2. SHA-256 Generated ➔ 8f4c2b9a...
                </div>
                <div style={{ padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px' }}>
                  3. Checksum Verified ➔ 100% Match
                </div>
                <div style={{ padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px' }}>
                  4. Evidence Sealed ➔ Immutable Lock
                </div>
                <div style={{ padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px' }}>
                  5. Custody Transferred ➔ INS-1042 to FOR-2088
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                EVIDENCE INTEGRITY
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.2 }}>
                Know exactly what happened to every piece of evidence.
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Cryptographically seal files at intake. Automatically verify raw SHA-256 digests against the ledger before every download or court presentation.
              </p>

              <div className="cv-badge cv-badge-emerald" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', fontWeight: 800 }}>
                Integrity Verified ✓
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. SECURITY SECTION (Dark Navy Panel) */}
      <section id="security" style={{
        padding: '5rem 2rem',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        borderBottom: '1px solid #1e293b'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#818cf8', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              HARDENED ARCHITECTURE
            </div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Security isn't a feature. It's the foundation.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            
            <div style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <Users size={24} style={{ color: '#818cf8', marginBottom: '0.875rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '0.4rem' }}>🔐 Role-Based Access</h3>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>Only authorized personnel access sensitive records according to statutory clearance ranks.</p>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <Shield size={24} style={{ color: '#34d399', marginBottom: '0.875rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '0.4rem' }}>🛡 Encryption</h3>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>Protect documents during TLS 1.3 transit and AES-256 HSM storage.</p>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <History size={24} style={{ color: '#fbbf24', marginBottom: '0.875rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '0.4rem' }}>🧾 Audit Trail</h3>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>Every sensitive action, view, and transfer is recorded in an immutable audit ledger.</p>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <Key size={24} style={{ color: '#f472b6', marginBottom: '0.875rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '0.4rem' }}>🔑 MFA</h3>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>Strengthen account protection with mandatory hardware-level MFA authentication.</p>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <ShieldCheck size={24} style={{ color: '#38bdf8', marginBottom: '0.875rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '0.4rem' }}>🔏 Integrity Verification</h3>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>Verify files instantly using client-side cryptographic SHA-256 checksum hashing.</p>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
              <AlertTriangle size={24} style={{ color: '#f87171', marginBottom: '0.875rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '0.4rem' }}>🚨 Security Monitoring</h3>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>Detect suspicious access patterns using automated rule-based security controls.</p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. INVESTIGATION WORKFLOW (Interactive Horizontal Timeline) */}
      <section style={{ padding: '5rem 2rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              From evidence intake to final disposition.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Streamlined statutory investigation pipeline.
            </p>
          </div>

          {/* Steps Horizontal Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {[
              { step: '01', title: 'Intake', desc: 'Register evidence & capture provenance.' },
              { step: '02', title: 'Verify', desc: 'Generate & record SHA-256 hashes.' },
              { step: '03', title: 'Manage', desc: 'Control access & permissions.' },
              { step: '04', title: 'Collaborate', desc: 'Share securely with officers.' },
              { step: '05', title: 'Audit', desc: 'Track every important action.' },
              { step: '06', title: 'Preserve', desc: 'Apply legal hold & retention.' },
              { step: '07', title: 'Export', desc: 'Generate verified case packages.' }
            ].map(s => (
              <div 
                key={s.step}
                onClick={() => setActiveWorkflowTab(s.step)}
                style={{
                  padding: '1.25rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: activeWorkflowTab === s.step ? 'var(--accent-primary)' : 'var(--bg-subtle)',
                  color: activeWorkflowTab === s.step ? '#ffffff' : 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 900, opacity: 0.8, marginBottom: '0.25rem' }}>
                  {s.step} — {s.title}
                </div>
                <div style={{ fontSize: '0.72rem', opacity: 0.9 }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. CHAIN OF CUSTODY SHOWCASE (Vertical Timeline) */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              IMMUTABLE HANDOFF LEDGER
            </div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.2 }}>
              Every handoff. Every action. Every timestamp.
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Cryptographically verified chain of custody ensuring statutory admissibility under Section 65B of Indian Evidence Act / BSA 2023.
            </p>

            <button onClick={onLaunchDashboard} className="cv-btn cv-btn-primary" style={{ fontWeight: 800 }}>
              <span>View Complete Chain</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Vertical Timeline Card */}
          <div className="cv-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', width: '48px', paddingTop: '2px' }}>09:14</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Evidence Registered</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Officer ID: INS-1042 (Inspector Arjun Singh)</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', width: '48px', paddingTop: '2px' }}>09:16</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)' }}>SHA-256 Checksum Generated</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 700 }}>Integrity: Verified ✓</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', width: '48px', paddingTop: '2px' }}>10:05</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Custody Transferred</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>INS-1042 ➔ FOR-2088 (Dr. Raman)</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', width: '48px', paddingTop: '2px' }}>10:07</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Custody Accepted & Digitally Signed</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recipient: FOR-2088</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', width: '48px', paddingTop: '2px' }}>14:32</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Evidence Reviewed & Sealed</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Forensic Audit Report Completed</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 9. SEARCH SECTION */}
      <section style={{ padding: '5rem 2rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Find what matters. Instantly.
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
            Search across your entire investigation workspace.
          </p>

          {/* Global Search UI Mockup */}
          <div className="cv-card" style={{ padding: '1.5rem', textAlign: 'left', border: '1.5px solid var(--accent-primary)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: 'var(--bg-subtle)',
              padding: '0.875rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '1.25rem'
            }}>
              <Search size={20} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', flex: 1 }}>
                Search cases, documents, evidence...
              </span>
              <kbd style={{ fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.5rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                ⌘ K
              </kbd>
            </div>

            {/* Results Preview List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <div style={{ padding: '0.65rem 0.875rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between' }}>
                <span>📁 Case Docket: <strong>CV-2026-00421</strong></span>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>Cyber Extortion</span>
              </div>
              <div style={{ padding: '0.65rem 0.875rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between' }}>
                <span>📄 Document: <strong>Forensic_Report.pdf</strong></span>
                <span style={{ color: 'var(--success-dark)', fontWeight: 700 }}>SHA-256 Verified</span>
              </div>
              <div style={{ padding: '0.65rem 0.875rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between' }}>
                <span>🔒 Evidence: <strong>EV-2026-00421</strong></span>
                <span style={{ color: '#8b5cf6', fontWeight: 700 }}>Sealed Lock</span>
              </div>
              <div style={{ padding: '0.65rem 0.875rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between' }}>
                <span>📜 Audit Event: <strong>Document Downloaded</strong></span>
                <span style={{ color: 'var(--text-muted)' }}>13:42 IST</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 10. COMPLIANCE SECTION */}
      <section id="compliance" style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              STATUTORY COMPLIANCE
            </div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.2 }}>
              Built for accountability.
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Audit-ready. Traceable. Controlled. Meets statutory investigation guidelines.
            </p>

            <button onClick={onLaunchDashboard} className="cv-btn cv-btn-primary" style={{ fontWeight: 800 }}>
              <span>View Compliance Portal</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Compliance Dashboard Card */}
          <div className="cv-card" style={{ padding: '1.75rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Compliance Status Meter
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <span>Document Integrity</span>
                <strong style={{ color: 'var(--success-dark)' }}>✓ Verified</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <span>Access Control</span>
                <strong style={{ color: 'var(--success-dark)' }}>✓ Active</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <span>Audit Coverage</span>
                <strong style={{ color: 'var(--success-dark)' }}>✓ Complete</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <span>Retention Policies</span>
                <strong style={{ color: 'var(--success-dark)' }}>✓ Configured</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <span>Legal Holds</span>
                <strong style={{ color: 'var(--accent-primary)' }}>12 Active</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Pending Approvals</span>
                <strong style={{ color: '#f59e0b' }}>07 Pending</strong>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 11. ROLES SECTION */}
      <section id="roles" style={{ padding: '5rem 2rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              One platform. Controlled access for every role.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Enforces strict Separation of Duties (SoD) across investigation personnel.
            </p>
          </div>

          {/* Role Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
            {[
              { role: 'Administrator', desc: 'Manage users, permissions, system settings, and retention policies.' },
              { role: 'Investigation Officer', desc: 'Manage cases, evidence dockets, and upload digital documents.' },
              { role: 'Forensic Officer', desc: 'Review technical evidence, perform hash checks, and author reports.' },
              { role: 'Legal Officer', desc: 'Access legal records, issue statutory approvals, and verify Section 65B.' },
              { role: 'Senior Officer', desc: 'Review, approve, and monitor high-level investigation operations.' }
            ].map((r, idx) => (
              <div key={idx} className="cv-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {r.role}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Permission Matrix Table */}
          <div className="cv-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="cv-table-container">
              <table className="cv-table">
                <thead>
                  <tr>
                    <th>PERMISSION ACTION</th>
                    <th>ADMINISTRATOR</th>
                    <th>INVESTIGATION OFFICER</th>
                    <th>FORENSIC OFFICER</th>
                    <th>SENIOR OFFICER</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>View Public Evidence</td>
                    <td>✓ Full</td>
                    <td>✓ Full</td>
                    <td>✓ Full</td>
                    <td>✓ Full</td>
                  </tr>
                  <tr>
                    <td>Access Restricted Dockets</td>
                    <td>✓ Full</td>
                    <td>Requires MFA</td>
                    <td>Requires MFA</td>
                    <td>✓ Full</td>
                  </tr>
                  <tr>
                    <td>Transfer Evidence Custody</td>
                    <td>✓ Full</td>
                    <td>✓ Full</td>
                    <td>✓ Full</td>
                    <td>✓ Full</td>
                  </tr>
                  <tr>
                    <td>Statutory 65B Approval</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>✓ Executive Sign-off</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 12. LIVE SECURITY SECTION */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--danger-light)', color: 'var(--danger-dark)', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.875rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--danger)' }} className="animate-pulse-glow" />
              LIVE SECURITY ACTIVITY
            </div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>
              See what's happening. As it happens.
            </h2>
          </div>

          {/* Live Activity Stream */}
          <div className="cv-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.65rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: 700 }}>● Document uploaded: FIR_Financial_Breach_Report.pdf</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>13:42:08 IST</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.65rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: 700 }}>● Access request approved for Forensic Officer Dr. Raman</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>13:43:16 IST</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.65rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: 700 }}>● Evidence integrity verified (SHA-256 100% Match)</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--success-dark)' }}>13:44:02 IST</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.65rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: 700 }}>● Secure document shared with High Court Bench</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>13:45:21 IST</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: 'var(--danger-dark)' }}>● Failed login attempt blocked from IP 192.168.1.45</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--danger-dark)' }}>13:46:03 IST</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 13. FINAL CTA */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Secure the record. Protect the investigation.
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            CaseVault brings documents, evidence, access control and accountability together in one secure platform.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={onLaunchDashboard}
              className="cv-btn cv-btn-primary"
              style={{ padding: '0.875rem 2rem', fontSize: '1rem', fontWeight: 800, boxShadow: 'var(--shadow-glow)' }}
            >
              <span>Access CaseVault</span>
              <ArrowRight size={18} />
            </button>

            <button 
              onClick={() => scrollToSection('security')}
              className="cv-btn cv-btn-secondary"
              style={{ padding: '0.875rem 1.75rem', fontSize: '1rem', fontWeight: 700 }}
            >
              <span>Explore Security</span>
            </button>
          </div>

        </div>
      </section>

      {/* 14. FOOTER */}
      <footer style={{ padding: '4rem 2rem 2rem 2rem', backgroundColor: 'var(--bg-subtle)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2.5rem', marginBottom: '3.5rem' }}>
            
            {/* Brand Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Shield size={22} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontSize: '1.125rem', fontWeight: 900, color: 'var(--text-primary)' }}>CASEVAULT</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Secure. Compliant. Trusted. Digital Evidence & Investigation Document System.
              </p>
            </div>

            {/* Column 1: Platform */}
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>Platform</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Cases Directory</a>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Documents Vault</a>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Evidence Locker</a>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Global Search</a>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Reports</a>
              </div>
            </div>

            {/* Column 2: Security */}
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>Security</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Access Control</a>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Encryption</a>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Audit Trail</a>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Integrity Hashing</a>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Security Monitoring</a>
              </div>
            </div>

            {/* Column 3: Governance */}
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>Governance</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Digital Signatures</a>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Retention Rules</a>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Legal Hold</a>
                <a onClick={onLaunchDashboard} style={{ cursor: 'pointer' }}>Compliance Portal</a>
              </div>
            </div>

            {/* Column 4: Company */}
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>Company</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <span>About CaseVault</span>
                <span>MHA / SIH 2026</span>
                <span>Documentation</span>
                <span>Contact Support</span>
              </div>
            </div>

          </div>

          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            <div>© 2026 CaseVault • Government of India MHA Compliant</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span>Privacy Policy</span>
              <span>Security Controls</span>
              <span>Terms of Service</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
