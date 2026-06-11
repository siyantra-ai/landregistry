import React, { useState } from 'react';
import { X, Phone, Clock, User, CheckCircle } from 'lucide-react';
import { saveEnquiry } from '../db/supabase';

export default function CallbackModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [timeSlot, setTimeSlot] = useState('As soon as possible');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await saveEnquiry({ name, phone, email: 'callback@request', service: 'Callback Request', notes: `Preferred time: ${timeSlot}` });
    setLoading(false);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => { setSuccess(false); setName(''); setPhone(''); setTimeSlot('As soon as possible'); onClose(); }, 2500);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle size={48} style={{ color: 'var(--emerald-500)', marginBottom: 16 }} />
            <h3 className="modal-title">Request Received!</h3>
            <p className="modal-desc">A property expert will call you at your preferred time.</p>
          </div>
        ) : (
          <>
            <h3 className="modal-title">Request a Callback</h3>
            <p className="modal-desc">Free advice, no obligation. We'll call you back shortly.</p>

            {import.meta.env.VITE_CALENDLY_URL && (
              <div style={{ padding: '16px', backgroundColor: 'var(--bg-secondary)', border: '1.5px solid var(--border-default)', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', margin: 0 }}>Prefer to schedule a specific time?</h4>
                <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '12px', marginTop: '4px', lineHeight: '1.4' }}>Book a direct call with a specialist on our calendar.</p>
                <button 
                  type="button"
                  onClick={() => {
                    if (window.Calendly) {
                      window.Calendly.initPopupWidget({ url: import.meta.env.VITE_CALENDLY_URL });
                    } else {
                      window.open(import.meta.env.VITE_CALENDLY_URL, '_blank');
                    }
                  }}
                  className="btn-primary" 
                  style={{ border: 'none', cursor: 'pointer', display: 'inline-flex', width: '100%', justifyContent: 'center', backgroundColor: 'var(--text-accent)', color: '#ffffff', padding: '10px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '13px', textDecoration: 'none' }}
                >
                  Book Instant Appointment
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="cb-name">Your Name</label>
                <input id="cb-name" type="text" required className="form-input" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cb-phone">Phone Number</label>
                <input id="cb-phone" type="tel" required className="form-input" placeholder="07123 456789" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cb-time">Best Time to Call</label>
                <select id="cb-time" className="form-select" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                  <option>As soon as possible</option>
                  <option>Morning (9 AM – 12 PM)</option>
                  <option>Afternoon (12 PM – 4 PM)</option>
                  <option>Evening (4 PM – 6 PM)</option>
                </select>
              </div>
              <button type="submit" disabled={loading} className="form-submit">
                {loading ? 'Submitting…' : 'Request Callback'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
