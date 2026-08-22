import React, { useState } from 'react';
import { Award, ChevronRight, X, Play, CheckCircle2, ShieldCheck, Lock, FileText, Stamp, FolderLock, History } from 'lucide-react';

export default function SihJudgeTourModal({ isOpen, onClose, onChangeView, onShowToast }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: "1. Create Case Docket",
      subtitle: "Case Initialization & Allocation",
      desc: "Inspector initializes Case #2026-00421. Legal hold parameters & assigned officers are defined.",
      view: "cases",
      badge: "Step 1/6",
      icon: FileText
    },
    {
      title: "2. Upload FIR & SHA-256 Lock",
      subtitle: "Web-Crypto Checksum Lock",
      desc: "FIR document ingested. Web Crypto API calculates SHA-256 digest in-browser before encryption.",
      view: "documents",
      badge: "Step 2/6",
      icon: Lock
    },
    {
      title: "3. Digital Signature & Officer Approval",
      subtitle: "ECC Signature Seal",
      desc: "Senior Investigation Officer reviews docket, applies ECC Digital Signature, and locks evidence.",
      view: "approvals-inbox",
      badge: "Step 3/6",
      icon: Stamp
    },
    {
      title: "4. Legal Hold & Statutory Preservation",
      subtitle: "BNSS 2023 Statutory Rules",
      desc: "Case placed under 7-Year / Permanent Legal Hold to prevent accidental purging or deletion.",
      view: "legal-hold",
      badge: "Step 4/6",
      icon: FolderLock
    },
    {
      title: "5. Real-Time NIST Audit Trail",
      subtitle: "Immutable Log Event Bus",
      desc: "Every view, share, download, or access attempt streams to NIST SP 800-92 compliant audit log.",
      view: "audit-trail",
      badge: "Step 5/6",
      icon: History
    },
    {
      title: "6. Section 65B PDF Certificate Generator",
      subtitle: "Court Admissibility Compliance",
      desc: "Generates official Section 65B Electronic Record Certificate under BSA 2023 with QR verifier.",
      view: "verify-portal",
      badge: "Step 6/6",
      icon: ShieldCheck
    }
  ];

  const handleNextStep = () => {
    const nextStepIdx = (currentStep + 1) % steps.length;
    setCurrentStep(nextStepIdx);
    if (onChangeView) {
      onChangeView(steps[nextStepIdx].view);
    }
    if (onShowToast) {
      onShowToast(`Step ${nextStepIdx + 1}: ${steps[nextStepIdx].title}`, "info");
    }
  };

  const stepData = steps[currentStep];
  const Icon = stepData.icon;

  return (
    <div className="cv-modal-backdrop" style={{ zIndex: 9999 }} onClick={onClose}>
      <div className="cv-modal cv-modal-md" onClick={e => e.stopPropagation()} style={{
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)',
        border: '2px solid var(--accent-primary)',
        boxShadow: 'var(--shadow-glow)'
      }}>
        
        {/* Header */}
        <div className="cv-modal-header" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="cv-badge cv-badge-indigo" style={{ padding: '0.5rem' }}>
              <Award size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800 }}>🏆 SIH 45-Second Guided Judge Demo</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Smart India Hackathon Evidence Lifecycle Interactive Walkthrough
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cv-btn-icon"><X size={18} /></button>
        </div>

        {/* Modal Body */}
        <div className="cv-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="cv-badge cv-badge-emerald" style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', fontWeight: 800 }}>
              {stepData.badge}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Click 'Next Step' to navigate app views
            </span>
          </div>

          {/* Current Step Card */}
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-light)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon size={22} />
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                {stepData.subtitle}
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {stepData.title}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                {stepData.desc}
              </p>
            </div>
          </div>

          {/* Stepper Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            {steps.map((s, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setCurrentStep(idx);
                  if (onChangeView) onChangeView(s.view);
                }}
                style={{
                  width: idx === currentStep ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  backgroundColor: idx === currentStep ? 'var(--accent-primary)' : 'var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              />
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="cv-modal-footer" style={{ justifyContent: 'space-between' }}>
          <button onClick={onClose} className="cv-btn cv-btn-secondary">
            Exit Demo
          </button>
          <button onClick={handleNextStep} className="cv-btn cv-btn-primary" style={{ fontWeight: 800 }}>
            <span>Next Step</span>
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
