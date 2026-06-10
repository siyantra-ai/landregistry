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
    
    const payload = {
      name,
      phone,
      email: 'callback@request.direct',
      service: 'Callback Request',
      notes: `Preferred callback time: ${timeSlot}`,
    };

    const res = await saveEnquiry(payload);
    setLoading(false);
    
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setName('');
        setPhone('');
        setTimeSlot('As soon as possible');
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ display: 'inline-flex', padding: 12, backgroundColor: 'var(--primary-light)', borderRadius: '50%', color: 'var(--accent-green)', marginBottom: 16 }}>
              <CheckCircle size={40} />
            </div>
            <h3 className="modal-title">Request Received!</h3>
            <p className="modal-desc">
              One of our property deed experts will call you back at your preferred time.
            </p>
          </div>
        ) : (
          <>
            <h3 className="modal-title">Request a Callback</h3>
            <p className="modal-desc">
              Submit your details and we will call you back shortly. Free advice, no obligation.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="callback-name">Your Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    id="callback-name"
                    type="text"
                    required
                    className="form-input"
                    placeholder="John Doe"
                    style={{ paddingLeft: 40 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="callback-phone">Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    id="callback-phone"
                    type="tel"
                    required
                    className="form-input"
                    placeholder="07123 456789"
                    style={{ paddingLeft: 40 }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="callback-time">Best Time to Call</label>
                <div style={{ position: 'relative' }}>
                  <Clock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <select
                    id="callback-time"
                    className="form-select"
                    style={{ paddingLeft: 40 }}
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                  >
                    <option value="As soon as possible">As soon as possible</option>
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 6 PM)">Evening (4 PM - 6 PM)</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading} className="form-submit-btn">
                {loading ? 'Submitting...' : 'Request Callback Now'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
