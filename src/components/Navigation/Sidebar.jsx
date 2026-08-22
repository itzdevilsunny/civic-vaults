import React from 'react';
import { 
  Shield, 
  FolderLock, 
  LayoutDashboard, 
  Briefcase, 
  PlusCircle, 
  Users, 
  FileText, 
  Share2, 
  FileQuestion, 
  Trash2, 
  Lock, 
  History, 
  ShieldAlert, 
  BarChart3, 
  PieChart, 
  Bell, 
  HardDrive, 
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Stamp,
  Network,
  Database,
  Activity,
  Package,
  GitCommit
} from 'lucide-react';

export default function Sidebar({ 
  activeView, 
  onChangeView, 
  isCollapsed, 
  onOpenCreateCase, 
  onOpenUploadModal,
  casesCount = 0,
  documentsCount = 0,
  activitiesCount = 0,
  securityLogsCount = 0
}) {
  
  const navSections = [
    {
      title: "DASHBOARD",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: "CASE MANAGEMENT",
      items: [
        { id: 'cases', label: 'All Cases', icon: Briefcase, badge: casesCount.toString() },
        { id: 'intelligence-graph', label: 'Intelligence Graph', icon: Network, badge: '🔥 Advanced' },
        { id: 'chain-of-custody', label: 'Chain of Custody', icon: ShieldCheck, badge: 'USP 🥇' },
        { id: 'create-case', label: 'Create New Case', icon: PlusCircle, isAction: true, action: onOpenCreateCase },
        { id: 'assignments', label: 'Case Assignments', icon: Users }
      ]
    },
    {
      title: "DOCUMENT MANAGEMENT",
      items: [
        { id: 'documents', label: 'All Documents', icon: FileText, badge: documentsCount.toLocaleString() },
        { id: 'document-lifecycle', label: 'Document Lifecycle', icon: GitCommit, badge: '7 Stages 🔄' },
        { id: 'case-package-export', label: 'Case Package Export', icon: Package, badge: 'manifest.json 📦' },
        { id: 'approvals-inbox', label: 'Approvals Inbox', icon: Stamp, badge: 'Digital Sig ✍️' },
        { id: 'shared', label: 'Shared With Me', icon: Share2 },
        { id: 'requests', label: 'Document Requests', icon: FileQuestion, badge: (documentsCount > 0 ? Math.ceil(documentsCount * 0.1) : 0).toString() },
        { id: 'trash', label: 'Trash / Archives', icon: Trash2 }
      ]
    },
    {
      title: "SECURITY & CONTROL",
      items: [
        { id: 'verify-portal', label: 'Public 65B Verifier', icon: ShieldCheck, badge: 'Sec 65B' },
        { id: 'legal-hold', label: 'Legal Hold & Retention', icon: FolderLock, badge: 'Hold ⚖️' },
        { id: 'backup-vault', label: 'Backup Vault & PITR', icon: Database, badge: 'Snapshots 💾' },
        { id: 'system-health', label: 'System Telemetry Health', icon: Activity, badge: '14ms ⚡' },
        { id: 'access-control', label: 'Access Control', icon: Lock },
        { id: 'audit-trail', label: 'Audit Trail', icon: History },
        { id: 'security-logs', label: 'Security Logs', icon: ShieldAlert, badge: securityLogsCount.toString(), alert: securityLogsCount > 0 }
      ]
    },
    {
      title: "REPORTS & ANALYTICS",
      items: [
        { id: 'reports', label: 'Reports', icon: BarChart3 },
        { id: 'analytics', label: 'Analytics', icon: PieChart }
      ]
    },
    {
      title: "ALERTS & NOTIFICATIONS",
      items: [
        { id: 'alerts', label: 'Alerts & Notifications', icon: Bell, badge: activitiesCount.toString() }
      ]
    }
  ];

  // Dynamic storage usage calculation
  const usedGB = (documentsCount * 0.2 + casesCount * 0.5).toFixed(1);
  const usedPercent = Math.min(((usedGB / 1000) * 100), 100).toFixed(1);

  return (
    <aside style={{
      width: isCollapsed ? '72px' : '260px',
      backgroundColor: 'var(--sidebar-bg)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      transition: 'width var(--transition-normal)',
      flexShrink: 0,
      overflow: 'hidden'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '1.25rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.875rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: 'var(--shadow-glow)',
          flexShrink: 0
        }}>
          <Shield size={22} strokeWidth={2.5} />
        </div>
        {!isCollapsed && (
          <div style={{ overflow: 'hidden' }}>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.04em', lineHeight: 1.1 }}>
              CASEVAULT
            </h1>
            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.02em', marginTop: '2px' }}>
              Secure. Compliant. Trusted.
            </p>
          </div>
        )}
      </div>

      {/* Main Navigation Links */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem 0.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        {navSections.map((section, idx) => (
          <div key={idx}>
            {!isCollapsed && (
              <div style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                padding: '0 0.5rem 0.5rem 0.5rem'
              }}>
                {section.title}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                const handleClick = () => {
                  if (item.isAction && item.action) {
                    item.action();
                  } else {
                    onChangeView(item.id);
                  }
                };

                return (
                  <button
                    key={item.id}
                    onClick={handleClick}
                    title={isCollapsed ? item.label : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: isCollapsed ? '0.625rem' : '0.55rem 0.75rem',
                      justifyContent: isCollapsed ? 'center' : 'flex-start',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                      color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                      fontWeight: isActive ? 700 : 500,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.84rem',
                      width: '100%',
                      transition: 'all var(--transition-fast)',
                      textAlign: 'left'
                    }}
                    className="sidebar-item-btn"
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} style={{ flexShrink: 0 }} />
                    {!isCollapsed && (
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.label}
                      </span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.45rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: item.alert ? 'var(--danger-light)' : 'var(--bg-subtle)',
                        color: item.alert ? 'var(--danger-dark)' : 'var(--text-secondary)'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section: Security Status & Storage */}
      {!isCollapsed ? (
        <div style={{
          padding: '1rem',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.875rem'
        }}>
          {/* Security Status Card */}
          <div style={{
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--success-light)',
              color: 'var(--success-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <CheckCircle2 size={18} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Your data is secure
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                End-to-end encrypted
              </div>
            </div>
          </div>

          {/* Dynamic Storage Usage Widget */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Storage Usage</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{usedPercent}%</span>
            </div>
            <div style={{
              height: '6px',
              backgroundColor: 'var(--border-color)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${usedPercent}%`,
                minWidth: '4px',
                height: '100%',
                backgroundColor: 'var(--accent-primary)',
                borderRadius: '3px'
              }} />
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              {usedGB} GB of 1 TB used
            </div>
          </div>

          {/* Support Link */}
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600
          }}>
            <HelpCircle size={14} />
            <span>Help & Compliance Support</span>
          </button>
        </div>
      ) : (
        <div style={{
          padding: '1rem 0.5rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <CheckCircle2 size={20} style={{ color: 'var(--success)' }} title="Data Secure & Encrypted" />
          <HardDrive size={20} style={{ color: 'var(--text-secondary)' }} title={`Storage ${usedPercent}% Used`} />
        </div>
      )}
    </aside>
  );
}
