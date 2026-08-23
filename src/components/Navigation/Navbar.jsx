import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  Moon, 
  Sun, 
  Bell, 
  ChevronRight, 
  Globe, 
  Wifi, 
  WifiOff, 
  Sparkles,
  ChevronLeft,
  ChevronDown,
  UserCheck,
  Award,
  Settings,
  History,
  Lock,
  X,
  QrCode,
  LogOut
} from 'lucide-react';
import { translations } from '../../lib/translations';

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  onOpenSearch, 
  isSidebarCollapsed, 
  onToggleSidebar, 
  isOffline, 
  onToggleOffline,
  user,
  unreadNotifications = 0,
  onOpenNotifications,
  lang = 'en',
  onToggleLang,
  onOpenAiAssistant,
  onNavigateBack,
  onNavigateNext,
  onShowToast,
  onOpenAccessControl,
  onOpenAuditTrail,
  onOpenMfa,
  onSignOut
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

  return (
    <>
      <header style={{
        height: '64px',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Left Section: Back/Next Navigation Buttons & Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          
          {/* Back & Next Navigation Buttons */}
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={onNavigateBack}
              className="cv-btn-icon"
              title="Navigate Back to Previous Screen"
              style={{ width: '32px', height: '32px' }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={onNavigateNext}
              className="cv-btn-icon"
              title="Navigate Next Screen"
              style={{ width: '32px', height: '32px' }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <span>MHA Special Cell</span>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>
              {translations[lang].vaultTitle}
            </span>
          </div>

          {/* Quick Search Input */}
          <div 
            onClick={onOpenSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.4rem 0.75rem',
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
            title={isOffline ? "Offline Mode Active (Queueing local actions)" : "Online Mode (Synced to Vault)"}
          >
            {isOffline ? <WifiOff size={14} /> : <Wifi size={14} />}
            <span>{isOffline ? 'Offline' : 'Online'}</span>
          </button>

          {/* Language Switcher */}
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
                    <Lock size={16} style={{ color: 'var(--text-secondary)' }} />
                    <span>Key MFA Token</span>
                  </button>

                  <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '0.35rem 0' }} />

                  {/* SIGN OUT BUTTON */}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      if (onSignOut) onSignOut();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      width: '100%',
                      padding: '0.625rem 0.75rem',
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--danger)',
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                    className="dropdown-item-btn"
                  >
                    <LogOut size={16} style={{ color: 'var(--danger)' }} />
                    <span>Sign Out Officer Session</span>
                  </button>

                </div>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* OFFICIAL DIGITAL POLICE ID BADGE MODAL */}
      {isBadgeModalOpen && (
        <div className="cv-modal-backdrop" style={{ zIndex: 999 }} onClick={() => setIsBadgeModalOpen(false)}>
          <div className="cv-modal cv-modal-sm" onClick={e => e.stopPropagation()} style={{ padding: 0, overflow: 'hidden' }}>
            
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
              color: '#ffffff',
              padding: '1.25rem',
              textAlign: 'center',
              position: 'relative'
            }}>
              <button 
                onClick={() => setIsBadgeModalOpen(false)} 
                style={{ position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
              
              <div style={{ fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.1em', color: '#93c5fd', textTransform: 'uppercase' }}>
                BHARAT SARKAR • MINISTRY OF HOME AFFAIRS
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 900, marginTop: '0.2rem', letterSpacing: '0.04em' }}>
                DIGITAL LAW ENFORCEMENT ID
              </h3>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', backgroundColor: 'var(--bg-surface)' }}>
              
              <div style={{ position: 'relative' }}>
                <img 
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt={user?.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--accent-primary)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'var(--success)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  padding: '4px',
                  border: '2px solid var(--bg-surface)'
                }}>
                  <UserCheck size={16} />
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  {user?.name || "Inspector Arjun Singh"}
                </h2>
                <div style={{ fontSize: '0.8125rem', color: 'var(--accent-primary)', fontWeight: 800, marginTop: '0.15rem' }}>
                  {user?.role || "Senior Investigation Officer"}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.15rem' }}>
                  {user?.department || "Cyber Crime Branch & Special Cell"}
                </div>
              </div>

              {/* ID Details Card */}
              <div style={{
                width: '100%',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.8125rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Official Badge #:</span>
                  <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    {user?.badgeNumber || "IND-POL-2026-8819"}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Clearance Level:</span>
                  <span className="cv-badge cv-badge-emerald" style={{ fontWeight: 800 }}>Level 4 (Top Secret)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>HSM Hardware Key:</span>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-primary)' }}>
                    HSM-IND-8819-OK
                  </span>
                </div>
              </div>

              {/* Scannable Verification QR Code */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                width: '100%',
                border: '1px dashed var(--border-color)'
              }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  backgroundColor: '#ffffff',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                    <rect width="100" height="100" fill="#ffffff" />
                    <rect x="10" y="10" width="30" height="30" fill="#000000" />
                    <rect x="15" y="15" width="20" height="20" fill="#ffffff" />
                    <rect x="20" y="20" width="10" height="10" fill="#000000" />
                    <rect x="60" y="10" width="30" height="30" fill="#000000" />
                    <rect x="65" y="15" width="20" height="20" fill="#ffffff" />
                    <rect x="70" y="20" width="10" height="10" fill="#000000" />
                    <rect x="10" y="60" width="30" height="30" fill="#000000" />
                    <rect x="15" y="65" width="20" height="20" fill="#ffffff" />
                    <rect x="20" y="70" width="10" height="10" fill="#000000" />
                    <rect x="50" y="50" width="10" height="10" fill="#000000" />
                    <rect x="70" y="50" width="20" height="10" fill="#000000" />
                    <rect x="50" y="70" width="20" height="20" fill="#000000" />
                  </svg>
                </div>
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  Scan to Verify MHA Digital Credential
                </span>
              </div>

            </div>

            {/* Footer */}
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-subtle)',
              borderTop: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <button 
                onClick={() => setIsBadgeModalOpen(false)} 
                className="cv-btn cv-btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontWeight: 800 }}
              >
                Close ID Badge
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
