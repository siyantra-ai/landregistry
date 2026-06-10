import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Lock, Phone, PhoneOff, Hourglass, MicOff, Volume2, Grid, Plus, User } from 'lucide-react';
import { saveEnquiry } from '../db/supabase';

export default function EnquiryForm({ initialService = '', isPhoneMockup = false }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [demoState, setDemoState] = useState('idle'); // 'idle', 'typing', 'submitting', 'incoming-call', 'active-call'
  const [activeIntervals, setActiveIntervals] = useState([]);
  const [activeTimeouts, setActiveTimeouts] = useState([]);
  const [callDuration, setCallDuration] = useState(0);

  const services = [
    { value: 'transfer-of-equity', label: 'Transfer of Equity (£450)' },
    { value: 'death-of-joint-proprietor', label: 'Death of a Joint Proprietor (£400)' },
    { value: 'name-change', label: 'Name Change (£150)' },
    { value: 'removal-of-restriction', label: 'Removal of a Restriction (£350)' },
    { value: 'transfer-of-equity-wills-probate', label: 'Transfer of Equity – Wills/Probate (£450)' },
    { value: 'applying-for-restriction', label: 'Applying for a Restriction (£350)' },
    { value: 'first-registration', label: 'First Registration (£600)' },
    { value: 'other', label: 'Other / General Enquiry' }
  ];

  useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  const clearAllDemoTimers = () => {
    activeIntervals.forEach(clearInterval);
    activeTimeouts.forEach(clearTimeout);
    setActiveIntervals([]);
    setActiveTimeouts([]);
  };

  useEffect(() => {
    if (isPhoneMockup) {
      const startTimeout = setTimeout(() => {
        startDemo();
      }, 1500);
      return () => {
        clearTimeout(startTimeout);
        clearAllDemoTimers();
      };
    }
  }, [isPhoneMockup]);

  useEffect(() => {
    let timer;
    if (demoState === 'active-call') {
      setCallDuration(0);
      timer = setInterval(() => {
        setCallDuration(prev => {
          if (prev >= 13) {
            setTimeout(() => {
              handleDeclineCall();
            }, 0);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [demoState]);

  const handleUserInteraction = () => {
    if (demoState !== 'idle') {
      clearAllDemoTimers();
      setDemoState('idle');
      setName(''); setEmail(''); setPhone(''); setService(''); setNotes('');
    }
  };

  const startDemo = () => {
    clearAllDemoTimers();
    setDemoState('typing');
    setName(''); setEmail(''); setPhone(''); setService(''); setNotes('');

    const intervals = [];
    const timeouts = [];

    // 1. Type Name
    const nameStr = "Charlotte Smith";
    let nameVal = "";
    let i = 0;
    const nInt = setInterval(() => {
      if (i < nameStr.length) {
        nameVal += nameStr[i];
        setName(nameVal);
        i++;
      } else {
        clearInterval(nInt);
        const eTime = setTimeout(typeEmail, 300);
        timeouts.push(eTime);
      }
    }, 70);
    intervals.push(nInt);

    // 2. Type Email
    const typeEmail = () => {
      const emailStr = "charlotte@example.com";
      let emailVal = "";
      let j = 0;
      const eInt = setInterval(() => {
        if (j < emailStr.length) {
          emailVal += emailStr[j];
          setEmail(emailVal);
          j++;
        } else {
          clearInterval(eInt);
          const pTime = setTimeout(typePhone, 300);
          timeouts.push(pTime);
        }
      }, 60);
      intervals.push(eInt);
    };

    // 3. Type Phone
    const typePhone = () => {
      const phoneStr = "07700 900077";
      let phoneVal = "";
      let k = 0;
      const pInt = setInterval(() => {
        if (k < phoneStr.length) {
          phoneVal += phoneStr[k];
          setPhone(phoneVal);
          k++;
        } else {
          clearInterval(pInt);
          const sTime = setTimeout(selectService, 300);
          timeouts.push(sTime);
        }
      }, 80);
      intervals.push(pInt);
    };

    // 4. Select Service
    const selectService = () => {
      setService('transfer-of-equity');
      const ntTime = setTimeout(typeNotes, 600);
      timeouts.push(ntTime);
    };

    // 5. Type Notes
    const typeNotes = () => {
      const notesStr = "Adding husband to deeds.";
      let notesVal = "";
      let l = 0;
      const ntInt = setInterval(() => {
        if (l < notesStr.length) {
          notesVal += notesStr[l];
          setNotes(notesVal);
          l++;
        } else {
          clearInterval(ntInt);
          const subTime = setTimeout(triggerSubmit, 600);
          timeouts.push(subTime);
        }
      }, 50);
      intervals.push(ntInt);
    };

    // 6. Submit
    const triggerSubmit = () => {
      setDemoState('submitting');
      setLoading(true);
      const resTime = setTimeout(() => {
        setLoading(false);
        setDemoState('incoming-call');
        
        // Auto accept call after 3.5s
        const autoAcceptTime = setTimeout(() => {
          setDemoState('active-call');
        }, 3500);
        setActiveTimeouts(prev => [...prev, autoAcceptTime]);
      }, 2500);
      timeouts.push(resTime);
    };

    setActiveIntervals(intervals);
    setActiveTimeouts(timeouts);
  };

  const handleDeclineCall = () => {
    clearAllDemoTimers();
    setDemoState('idle');
    setName(''); setEmail(''); setPhone(''); setService(''); setNotes('');
    
    // Auto-loop: restart demo typing after 3 seconds of idle time
    const loopTimeout = setTimeout(() => {
      startDemo();
    }, 3000);
    setActiveTimeouts([loopTimeout]);
  };

  const handleAcceptCall = () => {
    clearAllDemoTimers();
    setDemoState('active-call');
  };

  const formatDuration = (sec) => {
    const mins = Math.floor(sec / 60).toString().padStart(2, '0');
    const secs = (sec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const getCallCaption = () => {
    if (callDuration < 4) {
      return `Hi Charlotte! Oliver here from Land Registry Transfers. I saw your Transfer of Equity request...`;
    } else if (callDuration < 9) {
      return `I've opened the title records. The fixed fee is £450 as quoted on our website, including VAT.`;
    } else {
      return `I've sent the draft Transfer Deed (TR1) to charlotte@example.com. Let me know if you need anything else! ✦`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAllDemoTimers();
    setLoading(true);
    setSuccess(false);
    const selectedServiceLabel = services.find(s => s.value === service)?.label || 'Property Transfer';
    const res = await saveEnquiry({
      name, email, phone,
      service: selectedServiceLabel,
      notes
    });
    setLoading(false);
    if (res.success) {
      if (isPhoneMockup) {
        setDemoState('submitting');
        const callTime = setTimeout(() => {
          setDemoState('incoming-call');
        }, 2000);
        setActiveTimeouts([callTime]);
      } else {
        setSuccess(true);
        setName(''); setEmail(''); setPhone(''); setNotes('');
      }
    }
  };

  if (isPhoneMockup) {
    if (demoState === 'incoming-call') {
      return (
        <div className="phone-mockup">
          <div className="phone-notch" />
          <div className="phone-screen" style={{ background: '#1e293b' }}>
            <div className="phone-call-screen">
              <div>
                <div className="call-avatar">LR</div>
                <div className="call-caller">Land Registry Transfers</div>
                <div className="call-sub">Conveyancing Team</div>
              </div>

              <div className="call-actions-row">
                <div className="call-action-btn" onClick={handleDeclineCall} style={{ cursor: 'pointer' }}>
                  <div className="call-icon-circle call-btn-decline">
                    <PhoneOff size={24} />
                  </div>
                  <span>Decline</span>
                </div>

                <div className="call-action-btn" onClick={handleAcceptCall} style={{ cursor: 'pointer' }}>
                  <div className="call-icon-circle call-btn-accept">
                    <Phone size={24} />
                  </div>
                  <span>Accept</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (demoState === 'active-call') {
      return (
        <div className="phone-mockup">
          <div className="phone-notch" />
          <div className="phone-screen" style={{ background: '#0f172a' }}>
            <div className="phone-call-screen" style={{ background: '#0f172a', paddingTop: '36px', paddingBottom: '16px' }}>
              <div>
                <div className="call-caller" style={{ color: 'white', marginTop: 12 }}>Land Registry Transfers</div>
                <div className="call-sub" style={{ color: '#3b82f6', fontWeight: 600 }}>{formatDuration(callDuration)}</div>
              </div>

              <div style={{ width: '100%' }}>
                <div className="waveform-container">
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                </div>

                <div className="call-captions">
                  {getCallCaption()}
                </div>

                <div className="active-call-grid">
                  <div className="active-call-opt"><div className="opt-circle"><MicOff size={16} /></div><span>mute</span></div>
                  <div className="active-call-opt"><div className="opt-circle"><Grid size={16} /></div><span>keypad</span></div>
                  <div className="active-call-opt"><div className="opt-circle"><Volume2 size={16} /></div><span>speaker</span></div>
                  <div className="active-call-opt"><div className="opt-circle"><Plus size={16} /></div><span>add call</span></div>
                  <div className="active-call-opt"><div className="opt-circle"><User size={16} /></div><span>contacts</span></div>
                </div>
              </div>

              <div className="call-action-btn" onClick={handleDeclineCall} style={{ cursor: 'pointer', marginBottom: 4 }}>
                <div className="call-icon-circle call-btn-decline" style={{ width: 60, height: 60 }}>
                  <PhoneOff size={26} />
                </div>
                <span style={{ color: '#ef4444', fontWeight: 600, fontSize: 11 }}>End Call</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="phone-mockup">
        <div className="phone-notch" />
        <div className="phone-screen" style={{ background: 'white', padding: '24px 16px 16px' }}>
          
          {demoState === 'submitting' && (
            <div className="timer-overlay">
              <Hourglass size={48} className="hourglass-rotate" />
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Preparing your quote...</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Verifying details on HM Land Registry</div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginBottom: 14, paddingTop: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>Get Your Free Quote</h3>
            <p style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>A property expert responds within 1 hour.</p>
          </div>
          
          <form onSubmit={handleSubmit} id="main-enquiry-form" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: 11, marginBottom: 4 }}>Full Name</label>
              <input type="text" required onFocus={handleUserInteraction} className="form-input" style={{ padding: '8px 12px', fontSize: 13 }} placeholder="John Smith" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: 11, marginBottom: 4 }}>Email</label>
              <input type="email" required onFocus={handleUserInteraction} className="form-input" style={{ padding: '8px 12px', fontSize: 13 }} placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: 11, marginBottom: 4 }}>Phone</label>
              <input type="tel" required onFocus={handleUserInteraction} className="form-input" style={{ padding: '8px 12px', fontSize: 13 }} placeholder="07123 456789" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: 11, marginBottom: 4 }}>Service Needed</label>
              <select required onChange={(e) => { handleUserInteraction(); setService(e.target.value); }} className="form-select" style={{ padding: '8px 12px', fontSize: 13 }} value={service}>
                <option value="" disabled>Select a service…</option>
                {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: 11, marginBottom: 4 }}>Additional Details <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>(optional)</span></label>
              <textarea onFocus={handleUserInteraction} className="form-input form-textarea" style={{ padding: '8px 12px', fontSize: 13, height: 44, minHeight: 44 }} placeholder="Mortgage details, joint names..." value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            
            <button type="submit" disabled={loading} className="form-submit" style={{ padding: '10px', fontSize: 13, marginTop: 4 }}>
              {loading ? 'Submitting…' : <><Send size={12} /> Request Free Quote</>}
            </button>
          </form>

          {demoState === 'idle' && (
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <button type="button" onClick={startDemo} style={{ fontSize: 11, color: 'var(--text-accent)', fontWeight: 700, textDecoration: 'underline' }}>
                Replay Call Demo
              </button>
            </div>
          )}

          <div className="form-secure-badge" style={{ marginTop: 10, borderTop: '1px solid var(--border-default)', paddingTop: 10, justifyContent: 'center' }}>
            <Lock size={10} />
            <span style={{ fontSize: 10 }}>Secure & GDPR compliant</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="enquiry-card">
      <div className="enquiry-card-header">
        <h3 className="enquiry-card-title">Get Your Free Quote</h3>
        <p className="enquiry-card-subtitle">A property expert responds within 1 hour.</p>
      </div>

      <div className="enquiry-card-body">
        <form onSubmit={handleSubmit} id="main-enquiry-form">
          <div className="form-group">
            <label className="form-label" htmlFor="eq-name">Full Name</label>
            <input id="eq-name" type="text" required className="form-input" placeholder="John Smith" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="eq-email">Email</label>
            <input id="eq-email" type="email" required className="form-input" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="eq-phone">Phone</label>
            <input id="eq-phone" type="tel" required className="form-input" placeholder="07123 456789" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="eq-service">Service Needed</label>
            <select id="eq-service" required className="form-select" value={service} onChange={(e) => setService(e.target.value)}>
              <option value="" disabled>Select a service…</option>
              {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="eq-notes">Additional Details <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>(optional)</span></label>
            <textarea id="eq-notes" className="form-input form-textarea" placeholder="Mortgage details, joint names, probate status…" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <button type="submit" disabled={loading} className="form-submit">
            {loading ? 'Submitting…' : <><Send size={14} /> Request Free Quote</>}
          </button>

          {success && (
            <div className="form-success">
              <CheckCircle size={16} style={{ display: 'inline', verticalAlign: -3, marginRight: 6 }} />
              <strong>Thank you!</strong> A conveyancer will contact you shortly.
            </div>
          )}
        </form>
      </div>

      <div className="form-secure-badge">
        <Lock size={12} />
        <span>Secure & encrypted · GDPR compliant</span>
      </div>
    </div>
  );
}
