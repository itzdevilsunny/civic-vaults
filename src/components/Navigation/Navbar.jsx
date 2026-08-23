import React, { useState, useRef, useEffect } from 'react';
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
  Globe,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shield,
  QrCode,
  LogOut,
  Settings,
  History,
  Award,
  X,
  CheckCircle2
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
  onToggleLang,
  onOpenAiAssistant,
  onNavigateBack,
  onNavigateNext,
  onShowToast,
  onOpenAccessControl,
  onOpenAuditTrail,
  onOpenMfa
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setIsProfileOpen(false);
    if (onShowToast) {
      onShowToast("🔒 Session Locked - Officer Security Credentials Re-verification Required", "warning");
    }
    if (onOpenMfa) onOpenMfa();
  };

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
      {/* Left Section: Sidebar Toggle & Search Trigger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button 
          onClick={onToggleSidebar}
          className="cv-btn-icon" 
          title="Toggle Navigation Sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Back / Next Navigation Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', padding: '2px' }}>
          <button 
            onClick={onNavigateBack}
            className="cv-btn-icon"
            style={{ width: '32px', height: '32px' }}
            title="Navigate Back to Previous View"
          >
            <ChevronLeft size={18} />
          </button>

          <button 
            onClick={onNavigateNext}
            className="cv-btn-icon"
            style={{ width: '32px', height: '32px' }}
            title="Navigate Forward to Next View"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Quick Search Bar Trigger */}
        <div 
          onClick={onOpenSearch}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.45rem 0.875rem',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            minWidth: '240px',
            transition: 'all var(--transition-fast)'
          }}
          className="search-trigger-btn"
        >
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', flex: 1 }}>
            Search cases, docs, hashes (Ctrl + K)...
          </span>
          <kbd style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            padding: '0.15rem 0.4rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            color: 'var(--text-secondary)'
          }}>
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section: System Actions & Officer Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        
        {/* Gemini AI Assistant Drawer Button */}
        <button
          onClick={onOpenAiAssistant}
          className="cv-btn cv-btn-sm"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 800,
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)'
          }}
          title="Open Google Gemini 1.5 Flash AI Assistant"
        >
          <Sparkles size={15} />
          <span>🤖 Gemini AI</span>
        </button>

        {/* Offline Mode Toggle Button */}
        <button 
          onClick={onToggleOffline}
          className={`cv-btn cv-btn-sm ${isOffline ? 'cv-btn-danger' : 'cv-btn-secondary'}`}
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
          title={isOffline ? "Offline Field Mode Active (Local Encrypted Storage)" : "Live Online Supabase Database Connected"}
        >
          {isOffline ? (
            <>
              <WifiOff size={14} />
              <span>Offline Mode</span>
            </>
          ) : (
            <>
              <Wifi size={14} style={{ color: 'var(--success)' }} />
              <span>Online Sync</span>
            </>
          )}
        </button>

        {/* Language Switch Button */}
        <button
          onClick={onToggleLang}
          className="cv-btn cv-btn-secondary cv-btn-sm"
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
          title="Switch Language (English / Hindi)"
        >
          <Globe size={14} />
          <span>{lang === 'en' ? 'EN' : 'हिन्दी'}</span>
        </button>

        {/* Theme Toggle Button */}
        <button 
          onClick={onToggleTheme}
          className="cv-btn-icon" 
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
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

        {/* User Profile Dropdown Container */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.35rem 0.5rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: isProfileOpen ? 'var(--bg-subtle)' : 'transparent',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'background-color 0.2s'
            }}
          >
            <div style={{ position: 'relative' }}>
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                alt={user?.name || "Inspector Arjun Singh"}
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
                {user?.name || "Inspector Arjun Singh"}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {user?.role || "Senior Investigation Officer"}
              </span>
            </div>

            <ChevronDown 
              size={16} 
              style={{ 
                color: 'var(--text-muted)',
                transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }} 
            />
          </div>

          {/* DROPDOWN MENU */}
          {isProfileOpen && (
            <div 
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '310px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                overflow: 'hidden',
                zIndex: 100,
                animation: 'fadeIn 0.15s ease-out'
              }}
            >
              {/* Officer Info Header */}
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-subtle)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem'
              }}>
                <img 
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                  alt={user?.name}
                  style={{ width: '46px', height: '46px', borderRadius: '50%', border: '2px solid var(--accent-primary)' }}
                />
                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {user?.name || "Inspector Arjun Singh"}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    Badge #{user?.badgeNumber || "IND-POL-2026-8819"}
                  </div>
                  <span className="cv-badge cv-badge-indigo" style={{ fontSize: '0.65rem', marginTop: '0.25rem' }}>
                    Level 4 Top Secret Clear
                  </span>
                </div>
              </div>

              {/* Actions List */}
              <div style={{ padding: '0.5rem' }}>
                
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsBadgeModalOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.625rem 0.75rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  className="dropdown-item-btn"
                >
                  <Award size={16} style={{ color: 'var(--accent-primary)' }} />
                  <span>View Official Police ID Badge</span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    if (onOpenAccessControl) onOpenAccessControl();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.625rem 0.75rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  className="dropdown-item-btn"
                >
                  <Settings size={16} style={{ color: 'var(--text-secondary)' }} />
                  <span>Security & Access Control</span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    if (onOpenAuditTrail) onOpenAuditTrail();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.625rem 0.75rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  className="dropdown-item-btn"
                >
                  <History size={16} style={{ color: 'var(--text-secondary)' }} />
                  <span>My Audit Activity Logs</span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    if (onOpenMfa) onOpenMfa();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.625rem 0.75rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  className="dropdown-item-btn"
                >
                  <Lock size={16} style={{ color: 'var(--warning-dark)' }} />
                  <span>Re-authenticate MFA Hardware Token</span>
                </button>

                <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '0.35rem 0' }} />

                <button
                  onClick={handleSignOut}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.625rem 0.75rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--danger)',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  className="dropdown-item-btn"
                >
                  <LogOut size={16} />
                  <span>Lock Session / Sign Out</span>
                </button>

              </div>
            </div>
          )}
        </div>

      </div>

      {/* OFFICIAL POLICE ID BADGE MODAL */}
      {isBadgeModalOpen && (
        <div className="cv-modal-backdrop" style={{ zIndex: 999 }} onClick={() => setIsBadgeModalOpen(false)}>
          <div className="cv-modal cv-modal-sm" onClick={e => e.stopPropagation()} style={{ padding: 0, overflow: 'hidden', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#ffffff', border: '1px solid #6366f1' }}>
            
            {/* Header */}
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={20} style={{ color: '#6366f1' }} />
                <span style={{ fontWeight: 800, fontSize: '0.875rem', letterSpacing: '0.05em' }}>MINISTRY OF HOME AFFAIRS • DIGITAL ID</span>
              </div>
              <button onClick={() => setIsBadgeModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {/* Badge Body */}
            <div style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              
              <div style={{ position: 'relative' }}>
                <img 
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                  alt={user?.name}
                  style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6366f1', boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}
                />
                <CheckCircle2 size={24} style={{ position: 'absolute', bottom: 0, right: 0, color: '#10b981', background: '#0f172a', borderRadius: '50%' }} />
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.2rem' }}>
                  {user?.name || "Inspector Arjun Singh"}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: '#a5b4fc', fontWeight: 700 }}>
                  {user?.role || "Senior Investigation Officer"}
                </p>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                  Badge #{user?.badgeNumber || "IND-POL-2026-8819"}
                </div>
              </div>

              {/* ID QR Code & Statutory Authority */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', padding: '1rem', width: '100%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.6875rem', color: '#94a3b8', fontWeight: 600 }}>SECURITY CLEARANCE</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#10b981' }}>Level 4 - Top Secret</div>
                  <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginTop: '0.35rem' }}>AUTHORITY</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff' }}>Delhi Police Special Cell</div>
                </div>

                <div style={{ padding: '0.5rem', background: '#ffffff', borderRadius: '6px' }}>
                  <QrCode size={54} style={{ color: '#0f172a' }} />
                </div>
              </div>

              <div style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                CERT-In Statutory Ledger Seal • BNSS 2023 Verified ID
              </div>

            </div>

          </div>
        </div>
      )}

    </header>
  );
}
