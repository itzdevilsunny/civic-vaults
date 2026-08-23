import React, { useState } from 'react';
import { Shield, Lock, User, Key, CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react';

export default function AuthModal({ isOpen, onSignIn, onShowToast }) {
  const [badgeId, setBadgeId] = useState('IND-POL-8819');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSignIn({
        name: "Inspector Arjun Singh",
        badgeNumber: badgeId,
        role: "Senior Investigation Officer",
        department: "Cyber Crime & Special Cell",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      });
      if (onShowToast) {
        onShowToast(`Officer Authenticated: Welcome back ${badgeId} ✓`, "success");
      }
    }, 800);
  };

  return (
    <div className="cv-modal-backdrop" style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="cv-modal cv-modal-sm" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: 'var(--shadow-glow)',
            marginBottom: '0.75rem'
          }}>
            <Shield size={30} strokeWidth={2.5} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
            CASEVAULT OFFICER AUTHENTICATION
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.25rem' }}>
            Government of India • Ministry of Home Affairs Protocol
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>
              OFFICIAL POLICE BADGE ID / USERNAME *
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={badgeId}
                onChange={e => setBadgeId(e.target.value)}
                className="cv-input"
                style={{ paddingLeft: '2.4rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>
              SECURE CRYPTOGRAPHIC PASSWORD *
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="cv-input"
                style={{ paddingLeft: '2.4rem' }}
                required
              />
            </div>
          </div>

          <div style={{
            padding: '0.65rem 0.875rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle2 size={14} style={{ color: 'var(--success)', flexShrink: 0 }} />
            <span>Encrypted with TLS 1.3 & AES-256 HSM Hardware Authentication</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="cv-btn cv-btn-primary"
            style={{ fontWeight: 800, padding: '0.75rem', fontSize: '0.9375rem', marginTop: '0.5rem', justifyContent: 'center' }}
          >
            {isSubmitting ? "Authenticating Session..." : "AUTHENTICATE OFFICER SESSION"}
            <ArrowRight size={16} />
          </button>
        </form>

      </div>
    </div>
  );
}
