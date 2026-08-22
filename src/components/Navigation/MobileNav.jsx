import React from 'react';
import { LayoutDashboard, Briefcase, FileText, History, ShieldAlert } from 'lucide-react';

export default function MobileNav({ activeView, onChangeView }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cases', label: 'Cases', icon: Briefcase },
    { id: 'documents', label: 'Docs', icon: FileText },
    { id: 'audit-trail', label: 'Audit', icon: History },
    { id: 'security-logs', label: 'Security', icon: ShieldAlert }
  ];

  return (
    <nav className="mobile-nav-bar" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '64px',
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      display: 'none', // Shown via media query in index.css
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 50,
      padding: '0 0.5rem',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.05)'
    }}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              background: 'none',
              border: 'none',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
              fontSize: '0.6875rem',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              flex: 1
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
