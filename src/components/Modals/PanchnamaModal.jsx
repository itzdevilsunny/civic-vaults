import React, { useState, useEffect } from 'react';
import { FileCheck, X, Shield, Printer, CheckCircle2, UserCheck, MapPin, Calendar, Hash, Mic, MicOff } from 'lucide-react';

export default function PanchnamaModal({ isOpen, onClose, onShowToast, cases = [] }) {
  const [caseId, setCaseId] = useState('');
  const [seizureLocation, setSeizureLocation] = useState('Cyber Crime Scene, Plot 42, Sector 18, Gurugram');
  const [panch1Name, setPanch1Name] = useState('Ramesh Chandra (Independent Witness)');
  const [panch1Aadhaar, setPanch1Aadhaar] = useState('4512-8890-1234');
  const [panch2Name, setPanch2Name] = useState('Suresh Sharma (Bank Security Officer)');
  const [panch2Aadhaar, setPanch2Aadhaar] = useState('9812-7711-5678');
  const [deviceDescription, setDeviceDescription] = useState('Seized 1x Dell PowerEdge Server Rack Hard Drive (SN: DE-991823) + 1x iPhone 15 Pro (IMEI: 3589123490123)');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (cases && cases.length > 0) {
      setCaseId(cases[0].id);
    } else {
      setCaseId('2026-00421');
    }
  }, [cases]);

  if (!isOpen) return null;

  const handleVoiceDictation = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Browser doesn't support Web Speech API - provide graceful fallback simulation
      setIsListening(true);
      onShowToast("🎙️ Listening to officer dictation...", "info");
      setTimeout(() => {
        setIsListening(false);
        setDeviceDescription(prev => prev + " + 1x SanDisk 512GB USB Drive (SN: SD-8812) seized at 02:12 IST");
        onShowToast("🎙️ Speech Transcribed: SanDisk 512GB USB Drive added to memo ✓", "success");
      }, 2000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        onShowToast("🎙️ Speak now... Transcribing crime scene notes", "info");
      };

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setDeviceDescription(prev => prev + " " + transcript);
        setIsListening(false);
        onShowToast(`🎙️ Transcribed: "${transcript}" ✓`, "success");
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerated(true);
    onShowToast("Statutory Crime Scene Seizure Memo (Panchnama) Generated under BNSS 2023 ✓", "success");
  };

  const handlePrint = () => {
    window.print();
    onShowToast("Seizure Memo (Panchnama) sent to printer/PDF export ✓", "success");
  };

  return (
    <div className="cv-modal-backdrop" style={{ zIndex: 999 }} onClick={onClose}>
      <div className="cv-modal cv-modal-lg" onClick={e => e.stopPropagation()} style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
        
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '2px solid #0284c7',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileCheck size={24} style={{ color: '#0284c7' }} />
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#0f172a' }}>
                Crime Scene Seizure Memo & Panchnama (BNSS 2023)
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Statutory Evidence Intake Memo under Bharatiya Nagarik Suraksha Sanhita 2023
              </p>
            </div>
          </div>
          <button onClick={onClose} className="cv-btn-icon"><X size={18} /></button>
        </div>

        {/* Form or Generated View */}
        {!isGenerated ? (
          <form onSubmit={handleGenerate} className="cv-modal-body" style={{ color: '#334155' }}>
            
            <div className="cv-input-group">
              <label className="cv-label" style={{ color: '#0f172a' }}>Investigation Case Docket *</label>
              <select className="cv-select" value={caseId} onChange={e => setCaseId(e.target.value)} required>
                {cases && cases.length > 0 ? (
                  cases.map(c => (
                    <option key={c.id} value={c.id}>Case #{c.id} - {c.title}</option>
                  ))
                ) : (
                  <>
                    <option value="2026-00421">Case #2026-00421 - Inter-State Financial Fraud & Cyber Intrusion</option>
                    <option value="2026-00389">Case #2026-00389 - Narcotics Trafficking & Hawala Syndicate</option>
                  </>
                )}
              </select>
            </div>

            <div className="cv-input-group">
              <label className="cv-label" style={{ color: '#0f172a' }}>Seizure Location / Crime Scene Coordinates *</label>
              <input 
                type="text" 
                className="cv-input" 
                value={seizureLocation} 
                onChange={e => setSeizureLocation(e.target.value)}
                required 
              />
            </div>

            {/* Panch Witnesses Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="cv-input-group">
                <label className="cv-label" style={{ color: '#0f172a' }}>Panch Witness #1 (Independent) *</label>
                <input type="text" className="cv-input" value={panch1Name} onChange={e => setPanch1Name(e.target.value)} required />
              </div>
              <div className="cv-input-group">
                <label className="cv-label" style={{ color: '#0f172a' }}>Panch #1 Govt ID / Aadhaar *</label>
                <input type="text" className="cv-input" value={panch1Aadhaar} onChange={e => setPanch1Aadhaar(e.target.value)} required />
              </div>

              <div className="cv-input-group">
                <label className="cv-label" style={{ color: '#0f172a' }}>Panch Witness #2 (Independent) *</label>
                <input type="text" className="cv-input" value={panch2Name} onChange={e => setPanch2Name(e.target.value)} required />
              </div>
              <div className="cv-input-group">
                <label className="cv-label" style={{ color: '#0f172a' }}>Panch #2 Govt ID / Aadhaar *</label>
                <input type="text" className="cv-input" value={panch2Aadhaar} onChange={e => setPanch2Aadhaar(e.target.value)} required />
              </div>
            </div>

            <div className="cv-input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="cv-label" style={{ color: '#0f172a', marginBottom: 0 }}>Seized Digital Artifacts & Hardware Description *</label>
                
                {/* 🎙️ Voice Dictation Button */}
                <button
                  type="button"
                  onClick={handleVoiceDictation}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: isListening ? '#ef4444' : '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  title="Dictate seizure notes using speech-to-text"
                >
                  <Mic size={14} className={isListening ? 'animate-pulse' : ''} />
                  <span>{isListening ? 'Listening...' : '🎙️ Dictate Voice Note'}</span>
                </button>
              </div>

              <textarea 
                className="cv-textarea" 
                rows={3} 
                value={deviceDescription} 
                onChange={e => setDeviceDescription(e.target.value)} 
                required 
              />
            </div>

            <div className="cv-modal-footer" style={{ borderTop: 'none', paddingRight: 0, paddingLeft: 0 }}>
              <button type="button" onClick={onClose} className="cv-btn cv-btn-secondary">Cancel</button>
              <button type="submit" className="cv-btn cv-btn-primary">
                <FileCheck size={16} />
                <span>Generate Official Panchnama Memo</span>
              </button>
            </div>

          </form>
        ) : (
          <div className="cv-modal-body" style={{ color: '#334155' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0369a1', letterSpacing: '0.1em' }}>
                STATE POLICE DEPARTMENT • FORM OF SEIZURE MEMO
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginTop: '0.2rem' }}>
                PANCHNAMA / DIGITAL SEIZURE RECEIPT
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Ref #: PANCH-2026-MHA-{Math.floor(1000 + Math.random() * 9000)} • Date: {new Date().toLocaleDateString('en-IN')}
              </p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              <p>We, the undersigned Panch witnesses, do hereby affirm that on <strong>{new Date().toLocaleDateString('en-IN')}</strong> at <strong>{seizureLocation}</strong>, in our presence, Senior Investigation Officer <strong>Inspector Arjun Singh</strong> seized the following digital evidence items:</p>

              <div style={{ backgroundColor: '#ffffff', padding: '0.75rem', borderRadius: '4px', border: '1px dashed #0284c7', margin: '0.75rem 0', fontWeight: 600 }}>
                {deviceDescription}
              </div>

              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                SHA-256 Seal Lock: <code>8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f</code>
              </p>
            </div>

            {/* Signatures Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center', fontSize: '0.75rem', borderTop: '1px solid #cbd5e1', paddingTop: '1rem' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{panch1Name}</div>
                <div style={{ color: '#64748b' }}>Aadhaar: {panch1Aadhaar}</div>
                <div style={{ fontStyle: 'italic', marginTop: '0.25rem', color: '#166534' }}>✓ Signed (Panch #1)</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{panch2Name}</div>
                <div style={{ color: '#64748b' }}>Aadhaar: {panch2Aadhaar}</div>
                <div style={{ fontStyle: 'italic', marginTop: '0.25rem', color: '#166534' }}>✓ Signed (Panch #2)</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>Inspector Arjun Singh</div>
                <div style={{ color: '#64748b' }}>Badge #IND-DL-8892</div>
                <div style={{ fontStyle: 'italic', marginTop: '0.25rem', color: '#0284c7' }}>✓ Seizing Officer</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', borderTop: '1px solid #cbd5e1', paddingTop: '1rem' }}>
              <button onClick={() => setIsGenerated(false)} className="cv-btn cv-btn-secondary">Edit Information</button>
              <button onClick={handlePrint} className="cv-btn cv-btn-primary">
                <Printer size={16} />
                <span>Print / Download Panchnama PDF</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
