import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, Lock, Phone, PhoneOff, Hourglass, MicOff, Volume2, Grid, Plus, User } from 'lucide-react';
import { saveEnquiry } from '../db/supabase';
import { SERVICES } from '../data/services';

const DEMO_SCENARIOS = [
  {
    name: "Charlotte Smith",
    email: "charlotte@example.com",
    phone: "07700 900077",
    service: "transfer-of-equity",
    notes: "Adding husband to deeds."
  },
  {
    name: "James Wilson",
    email: "james.w@example.co.uk",
    phone: "07800 800088",
    service: "death-of-joint-proprietor",
    notes: "Remove deceased joint owner."
  },
  {
    name: "Sarah Davies",
    email: "sarah.davies@example.com",
    phone: "07900 700099",
    service: "name-change",
    notes: "Change to married name on deeds."
  },
  {
    name: "Robert Taylor",
    email: "robert.t@example.com",
    phone: "07500 600055",
    service: "removal-of-restriction",
    notes: "Clear outdated charge from title."
  },
  {
    name: "Arthur Pendelton",
    email: "arthur@example.com",
    phone: "07400 500044",
    service: "first-registration",
    notes: "Register historic paper deeds."
  }
];

export default function EnquiryForm({ initialService = '', isPhoneMockup = false }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [demoState, setDemoState] = useState('idle'); // 'idle', 'typing', 'submitting', 'incoming-call', 'active-call'
  const [callDuration, setCallDuration] = useState(0);

  const scenarioIdxRef = useRef(0);
  const [activeScenario, setActiveScenario] = useState(DEMO_SCENARIOS[0]);
  const timersRef = useRef({ intervals: [], timeouts: [] });

  const addTimeout = (cb, delay) => {
    const id = setTimeout(cb, delay);
    timersRef.current.timeouts.push(id);
    return id;
  };

  const addInterval = (cb, delay) => {
    const id = setInterval(cb, delay);
    timersRef.current.intervals.push(id);
    return id;
  };

  const clearAllDemoTimers = () => {
    timersRef.current.timeouts.forEach(clearTimeout);
    timersRef.current.intervals.forEach(clearInterval);
    timersRef.current.timeouts = [];
    timersRef.current.intervals = [];
  };

  const services = [
    ...SERVICES.map(s => ({ value: s.id, label: s.title })),
    { value: 'other', label: 'Other / General Enquiry' }
  ];

  const priceSplit = null;

  useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  useEffect(() => {
    if (isPhoneMockup) {
      const startTimeout = addTimeout(() => {
        startDemo();
      }, 1500);
      return () => {
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

    const scenario = DEMO_SCENARIOS[scenarioIdxRef.current];
    setActiveScenario(scenario);
    scenarioIdxRef.current = (scenarioIdxRef.current + 1) % DEMO_SCENARIOS.length;

    // 1. Type Name
    const nameStr = scenario.name;
    let nameVal = "";
    let i = 0;
    const nInt = addInterval(() => {
      if (i < nameStr.length) {
        nameVal += nameStr[i];
        setName(nameVal);
        i++;
      } else {
        clearInterval(nInt);
        timersRef.current.intervals = timersRef.current.intervals.filter(id => id !== nInt);
        addTimeout(typeEmail, 300);
      }
    }, 70);

    // 2. Type Email
    const typeEmail = () => {
      const emailStr = scenario.email;
      let emailVal = "";
      let j = 0;
      const eInt = addInterval(() => {
        if (j < emailStr.length) {
          emailVal += emailStr[j];
          setEmail(emailVal);
          j++;
        } else {
          clearInterval(eInt);
          timersRef.current.intervals = timersRef.current.intervals.filter(id => id !== eInt);
          addTimeout(typePhone, 300);
        }
      }, 60);
    };

    // 3. Type Phone
    const typePhone = () => {
      const phoneStr = scenario.phone;
      let phoneVal = "";
      let k = 0;
      const pInt = addInterval(() => {
        if (k < phoneStr.length) {
          phoneVal += phoneStr[k];
          setPhone(phoneVal);
          k++;
        } else {
          clearInterval(pInt);
          timersRef.current.intervals = timersRef.current.intervals.filter(id => id !== pInt);
          addTimeout(selectService, 300);
        }
      }, 80);
    };

    // 4. Select Service
    const selectService = () => {
      setService(scenario.service);
      addTimeout(typeNotes, 600);
    };

    // 5. Type Notes
    const typeNotes = () => {
      const notesStr = scenario.notes;
      let notesVal = "";
      let l = 0;
      const ntInt = addInterval(() => {
        if (l < notesStr.length) {
          notesVal += notesStr[l];
          setNotes(notesVal);
          l++;
        } else {
          clearInterval(ntInt);
          timersRef.current.intervals = timersRef.current.intervals.filter(id => id !== ntInt);
          addTimeout(triggerSubmit, 600);
        }
      }, 50);
    };

    // 6. Submit
    const triggerSubmit = () => {
      setDemoState('submitting');
      setLoading(true);
      addTimeout(() => {
        setLoading(false);
        setDemoState('incoming-call');
        
        // Auto accept call after 3.5s
        addTimeout(() => {
          setDemoState('active-call');
        }, 3500);
      }, 2500);
    };
  };

  const handleDeclineCall = () => {
    clearAllDemoTimers();
    setDemoState('idle');
    setName(''); setEmail(''); setPhone(''); setService(''); setNotes('');
    
    // Auto-loop: restart demo typing after 3 seconds of idle time
    addTimeout(() => {
      startDemo();
    }, 3000);
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
    const firstName = activeScenario?.name ? activeScenario.name.split(' ')[0] : 'there';
    const email = activeScenario?.email || 'your email';
    const serviceName = services.find(s => s.value === activeScenario?.service)?.label || 'Property Transfer';

    if (callDuration < 4) {
      return `Hi ${firstName}! Oliver here from Landregistrytransfers.com. I saw your ${serviceName} request...`;
    } else if (callDuration < 9) {
      return `I've opened the title records. It's a standard transfer, which we can draft and file for you.`;
    } else {
      return `I've sent the draft Transfer Deed (TR1) to ${email}. Let me know if you need anything else! ✦`;
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
      try {
        localStorage.setItem('landregistry_prefill_name', name);
        localStorage.setItem('landregistry_prefill_email', email);
        localStorage.setItem('landregistry_prefill_phone', phone);
      } catch (err) {
        console.error('Failed to save prefill details:', err);
      }

      if (isPhoneMockup) {
        setDemoState('submitting');
        addTimeout(() => {
          setDemoState('incoming-call');
        }, 2000);
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
                <div className="call-avatar">LT</div>
                <div className="call-caller">0333 577 0077</div>
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
                <div className="call-caller" style={{ color: 'white', marginTop: 12 }}>0333 577 0077</div>
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
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>Book an Appointment</h3>
            <p style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>A property expert responds within 1 hour.</p>
          </div>
          
          <form onSubmit={handleSubmit} id="main-enquiry-form" style={{ display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>
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
            
            {priceSplit && (
              <>
                <div className="price-split-breakdown" style={{ 
                  marginTop: '6px', 
                  padding: '10px 12px', 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderRadius: '6px', 
                  border: '1px solid var(--border-default)', 
                  fontSize: '11px',
                  lineHeight: '1.4'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    <span>Document Fee (from gov.uk):</span>
                    <span style={{ fontWeight: 600 }}>£{priceSplit.documentFee.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    <span>Search &amp; Processing Fee:</span>
                    <span style={{ fontWeight: 600 }}>£{priceSplit.searchProcessingFee.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    <span>VAT (20%):</span>
                    <span style={{ fontWeight: 600 }}>£{priceSplit.vat.toFixed(2)}</span>
                  </div>
                  <div style={{ height: '1px', backgroundColor: 'var(--border-default)', margin: '8px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '12.5px', color: 'var(--text-primary)' }}>
                    <span>Total (incl. VAT):</span>
                    <span>£{priceSplit.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="compliance-checkbox-group" style={{ marginTop: '6px' }}>
                  <label style={{ display: 'flex', gap: '8px', cursor: 'pointer', alignItems: 'flex-start' }}>
                    <input 
                      type="checkbox" 
                      required 
                      style={{ marginTop: '2px', accentColor: 'var(--blue-600)' }}
                    />
                    <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      I agree to waive my 14-day cancellation right to allow Swift Task Services Ltd to start the work immediately. I understand the search/processing fee is non-refundable once started.
                    </span>
                  </label>
                </div>
              </>
            )}
            
            <button type="submit" disabled={loading} className="form-submit" style={{ padding: '10px', fontSize: 13, marginTop: 4 }}>
              {loading ? 'Submitting…' : <><Send size={12} /> Book Appointment</>}
            </button>
          </form>

          {/* Replay Call Demo button removed as requested */}

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
        <h3 className="enquiry-card-title">Book an Appointment</h3>
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
          
          {priceSplit && (
            <>
              <div className="price-split-breakdown" style={{ 
                marginTop: '16px', 
                padding: '16px', 
                backgroundColor: 'var(--bg-secondary)', 
                borderRadius: '8px', 
                border: '1px solid var(--border-default)', 
                fontSize: '13px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                  <span>Document Fee (from gov.uk):</span>
                  <span style={{ fontWeight: 600 }}>£{priceSplit.documentFee.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                  <span>Search &amp; Processing Fee:</span>
                  <span style={{ fontWeight: 600 }}>£{priceSplit.searchProcessingFee.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                  <span>VAT (20%):</span>
                  <span style={{ fontWeight: 600 }}>£{priceSplit.vat.toFixed(2)}</span>
                </div>
                <div style={{ height: '1px', backgroundColor: 'var(--border-default)', margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>
                  <span>Total Price (incl. VAT):</span>
                  <span>£{priceSplit.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="compliance-checkbox-group" style={{ marginTop: '12px', marginBottom: '16px' }}>
                <label style={{ display: 'flex', gap: '10px', cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input 
                    type="checkbox" 
                    required 
                    style={{ marginTop: '3px', accentColor: 'var(--blue-600)' }}
                  />
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    I agree to waive my 14-day cancellation right to allow Swift Task Services Ltd to start the work immediately. I understand the search/processing fee is non-refundable once started.
                  </span>
                </label>
              </div>
            </>
          )}
          
          <button type="submit" disabled={loading} className="form-submit">
            {loading ? 'Submitting…' : <><Send size={14} /> Book Appointment</>}
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
