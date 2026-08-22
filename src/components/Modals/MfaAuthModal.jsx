import React, { useState } from 'react';
import { ShieldAlert, Lock, KeyRound, CheckCircle2, X } from 'lucide-react';

export default function MfaAuthModal({ isOpen, onClose, onSuccess, actionTitle = "Access Highly Restricted Evidence" }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  const handleChange = (index, value) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsError(false);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`mfa-otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`mfa-otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (enteredOtp === '123456' || enteredOtp.length === 6) {
        onSuccess();
        onClose();
      } else {
        setIsError(true);
      }
    }, 900);
  };

  return (
    <div className="cv-modal-backdrop" style={{ zIndex: 9999 }} onClick={onClose}>
      <div className="cv-modal cv-modal-md" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cv-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="cv-badge cv-badge-red" style={{ padding: '0.5rem' }}>
              <KeyRound size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800 }}>CERT-In / MHA MFA Challenge</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Multi-Factor OTP Authentication required for: <strong>{actionTitle}</strong>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cv-btn-icon"><X size={18} /></button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleVerify} className="cv-modal-body" style={{ textAlign: 'center', padding: '1.5rem' }}>
          
          <div style={{
            display: 'inline-flex',
            padding: '1rem',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent-primary)',
            marginBottom: '1rem'
          }}>
            <Lock size={32} />
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
            Enter 6-Digit One-Time Security Passcode
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            A security code has been dispatched to Inspector Arjun Singh's registered Government Device (+91 98****8992).
          </p>

          {/* 6 Digit Inputs */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`mfa-otp-input-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(idx, e.target.value)}
                onKeyDown={e => handleKeyDown(idx, e)}
                style={{
                  width: '44px',
                  height: '52px',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  textAlign: 'center',
                  borderRadius: 'var(--radius-md)',
                  border: isError ? '2px solid var(--danger)' : '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            ))}
          </div>

          {isError && (
            <p style={{ fontSize: '0.75rem', color: 'var(--danger)', fontWeight: 700, marginBottom: '1rem' }}>
              Invalid passcode. Please enter a valid 6-digit code. (Demo Code: 123456)
            </p>
          )}

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Demo Passcode hint: <strong>123456</strong>
          </div>

          {/* Footer Buttons */}
          <div className="cv-modal-footer" style={{ paddingRight: 0, paddingLeft: 0, borderBottom: 'none', justifyContent: 'space-between' }}>
            <button type="button" onClick={onClose} className="cv-btn cv-btn-secondary">
              Cancel
            </button>
            <button type="submit" className="cv-btn cv-btn-primary" disabled={isVerifying || otp.join('').length < 6}>
              {isVerifying ? "Verifying Token..." : "Authenticate & Proceed"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
