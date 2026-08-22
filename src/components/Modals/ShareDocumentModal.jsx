import React, { useState } from 'react';
import { Share2, X, Lock, Copy, Check, Clock, Eye } from 'lucide-react';

export default function ShareDocumentModal({ isOpen, onClose, document, onShowToast }) {
  const [expiryHours, setExpiryHours] = useState('24');
  const [watermark, setWatermark] = useState(true);
  const [requirePin, setRequirePin] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !document) return null;

  const shareableUrl = `https://vault.casevault.gov.in/secure-share/link?id=${document.id}&token=exp_${Date.now()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    onShowToast("Secure encrypted sharing link copied to clipboard ✓", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cv-modal-backdrop" onClick={onClose}>
      <div className="cv-modal" onClick={e => e.stopPropagation()}>
        <div className="cv-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="cv-badge cv-badge-emerald" style={{ padding: '0.5rem' }}>
              <Share2 size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Secure Document Link Sharing</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Time-limited, watermarked, access-monitored distribution
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cv-btn-icon"><X size={18} /></button>
        </div>

        <div className="cv-modal-body">
          <div style={{
            padding: '0.875rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            marginBottom: '1.25rem'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target File:</span>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{document.name}</div>
            <span className="cv-badge cv-badge-indigo" style={{ marginTop: '0.35rem' }}>{document.classification}</span>
          </div>

          <div className="cv-input-group">
            <label className="cv-label">Link Expiration Time</label>
            <select className="cv-select" value={expiryHours} onChange={e => setExpiryHours(e.target.value)}>
              <option value="1">1 Hour (Single Use View)</option>
              <option value="24">24 Hours (1 Day)</option>
              <option value="72">72 Hours (3 Days)</option>
              <option value="168">7 Days (Court Term)</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1rem 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
              <input type="checkbox" checked={watermark} onChange={e => setWatermark(e.target.checked)} style={{ accentColor: 'var(--accent-primary)' }} />
              Embed Recipient Identity Watermark Overlay
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
              <input type="checkbox" checked={requirePin} onChange={e => setRequirePin(e.target.checked)} style={{ accentColor: 'var(--accent-primary)' }} />
              Require 6-digit OTP / PIN Access Authentication
            </label>
          </div>

          <div className="cv-input-group">
            <label className="cv-label">Encrypted Sharing Link</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input className="cv-input" type="text" readOnly value={shareableUrl} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }} />
              <button onClick={handleCopy} className="cv-btn cv-btn-primary">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="cv-modal-footer">
          <button onClick={onClose} className="cv-btn cv-btn-secondary">Done</button>
        </div>
      </div>
    </div>
  );
}
