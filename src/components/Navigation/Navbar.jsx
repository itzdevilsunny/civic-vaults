import React from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Mail, 
  ShieldCheck, 
  Wifi, 
  WifiOff,
  Menu,
  ChevronDown,
  Lock,
  UserCheck,
  Globe
} from 'lucide-react';

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  onOpenSearch, 
  isSidebarCollapsed, 
  onToggleSidebar, 
  isOffline, 
  onToggleOffline,
  user,
  unreadNotifications,
  onOpenNotifications,
  lang = 'en',
  onToggleLang
}) {
  return (
    <header className="cv-navbar" style={{
      height: '68px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Left Navigation: Toggle & Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <button 
          onClick={onToggleSidebar}
          className="cv-btn-icon"
          title="Toggle Navigation Sidebar"
          style={{ cursor: 'pointer' }}
        >
          <Menu size={20} />
        </button>

        {/* Global Search Bar */}
        <div 
          onClick={onOpenSearch}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem 0.875rem',
            maxWidth: '420px',
            width: '100%',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
          className="search-input-wrapper"
        >
          <Search size={17} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', flex: 1 }}>
            {lang === 'hi' ? 'मामले, साक्ष्य, अधिकारी खोजें...' : 'Search cases, documents, officers...'}
          </span>
          <kbd style={{
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-strong)',
            borderRadius: '4px',
            padding: '0.15rem 0.4rem',
            color: 'var(--text-secondary)',
            fontWeight: 600
          }}>
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* Right Navigation: Language, Status, Theme, Alerts & User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        
        {/* 🇮🇳 MHA Bilingual Language Switcher Button (EN ↔ हिंदी) */}
        <button
          onClick={onToggleLang}
          className="cv-badge cv-badge-indigo"
          style={{ 
            cursor: 'pointer', 
            padding: '0.4rem 0.75rem',
            fontWeight: 800,
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent-primary)',
            border: '1px solid var(--accent-primary)'
          }}
          title="Switch Language (English ↔ हिंदी गृह मंत्रालय मानक)"
        >
          <Globe size={14} />
          <span>{lang === 'en' ? 'EN | हिंदी' : 'हिंदी | EN'}</span>
        </button>

        {/* Offline Mode Sync Simulator Badge */}
        <button
          onClick={onToggleOffline}
          className={`cv-badge ${isOffline ? 'cv-badge-amber' : 'cv-badge-emerald'}`}
          style={{ cursor: 'pointer', border: '1px solid currentColor', padding: '0.35rem 0.75rem' }}
          title={isOffline ? "Currently in Offline Field Mode - Actions queued locally" : "Online & Synchronized with Vault Server"}
        >
          {isOffline ? <WifiOff size={14} /> : <Wifi size={14} />}
          <span style={{ fontSize: '0.75rem' }}>
            {isOffline ? "Offline Field Mode" : "Vault Sync: Live"}
          </span>
        </button>

        {/* Security Level Indicator */}
        <div 
          className="cv-badge cv-badge-indigo"
          style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.35rem 0.75rem' }}
          title="Encrypted connection - TLS 1.3 + AES-256"
        >
          <Lock size={13} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>TLS 1.3 Secured</span>
        </div>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)', margin: '0 0.25rem' }} />

        {/* Light/Dark Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="cv-btn-icon"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`}
          style={{ cursor: 'pointer', borderRadius: 'var(--radius-full)' }}
        >
          {theme === 'light' ? (
            <Moon size={20} style={{ color: 'var(--text-secondary)' }} />
          ) : (
            <Sun size={20} style={{ color: '#f59e0b' }} />
          )}
        </button>

        {/* Notifications Icon with Badge */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={onOpenNotifications}
            className="cv-btn-icon" 
            title="Notifications"
            style={{ cursor: 'pointer' }}
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '18px',
                height: '18px',
                backgroundColor: 'var(--danger)',
                color: '#ffffff',
                fontSize: '0.6875rem',
                fontWeight: 700,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 2px var(--bg-surface)'
              }}>
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>

        {/* User Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          paddingLeft: '0.5rem',
          cursor: 'pointer'
        }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={user.avatar} 
              alt={user.name}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-primary)'
              }}
            />
            <span style={{
              position: 'absolute',
              bottom: '1px',
              right: '1px',
              width: '10px',
              height: '10px',
              backgroundColor: 'var(--success)',
              borderRadius: '50%',
              border: '2px solid var(--bg-surface)'
            }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }} className="user-profile-text">
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {user.name}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              {user.role}
            </span>
          </div>
          <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
        </div>

      </div>
    </header>
  );
}
