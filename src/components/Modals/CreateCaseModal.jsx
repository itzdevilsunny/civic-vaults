import React, { useState } from 'react';
import { Briefcase, X, ShieldAlert, CheckCircle2, PlusCircle } from 'lucide-react';

export default function CreateCaseModal({ isOpen, onClose, onCreateCase }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('High');
  const [assignedTo, setAssignedTo] = useState('Arjun Singh');
  const [legalHold, setLegalHold] = useState(true);
  const [summary, setSummary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || isSubmitting) return;

    setIsSubmitting(true);
    const newCaseId = `2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCase = {
      id: newCaseId,
      title,
      priority,
      assignedTo,
      assignedRole: "Lead Inspector",
      status: "Under Investigation",
      lastUpdated: "Just now",
      dateCreated: new Date().toISOString().split('T')[0],
      documentCount: 0,
      evidenceCount: 0,
      legalHold,
      summary
    };

    await onCreateCase(newCase);
    setIsSubmitting(false);
    setTitle('');
    setSummary('');
    onClose();
  };

  return (
    <div className="cv-modal-backdrop" onClick={onClose}>
      <div className="cv-modal cv-modal-lg" onClick={e => e.stopPropagation()}>
        <div className="cv-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="cv-badge cv-badge-indigo" style={{ padding: '0.5rem' }}>
              <Briefcase size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Open New Investigation Case</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Initialize encrypted case vault & evidence chain tracking
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="cv-btn-icon"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="cv-modal-body">
          <div className="cv-input-group">
            <label className="cv-label">Case Title / Investigation Subject *</label>
            <input 
              className="cv-input"
              type="text"
              placeholder="e.g. Cyber Security Breach & Financial Asset Siphoning"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="cv-input-group">
              <label className="cv-label">Priority Level *</label>
              <select className="cv-select" value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
                <option value="Critical">Critical Priority / High Alert</option>
              </select>
            </div>

            <div className="cv-input-group">
              <label className="cv-label">Lead Assigned Officer *</label>
              <select className="cv-select" value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
                <option value="Arjun Singh">Inspector Arjun Singh</option>
                <option value="Priya Sharma">Officer Priya Sharma</option>
                <option value="Vikram Patel">Forensic Analyst Vikram Patel</option>
                <option value="Neha Verma">Officer Neha Verma</option>
              </select>
            </div>
          </div>

          <div className="cv-input-group">
            <label className="cv-label">Executive Case Summary & Initial Intake Notes *</label>
            <textarea 
              className="cv-textarea"
              rows={4}
              placeholder="Provide background context, jurisdiction details, and suspect information..."
              value={summary}
              onChange={e => setSummary(e.target.value)}
              required
            />
          </div>

          <div className="cv-modal-footer" style={{ paddingRight: 0, paddingLeft: 0, borderBottom: 'none' }}>
            <button type="button" onClick={onClose} className="cv-btn cv-btn-secondary">Cancel</button>
            <button type="submit" className="cv-btn cv-btn-primary" disabled={isSubmitting}>
              <PlusCircle size={16} />
              <span>{isSubmitting ? "Initializing Case..." : "Initialize Case Vault"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
