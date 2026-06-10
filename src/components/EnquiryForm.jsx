import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { saveEnquiry } from '../db/supabase';

export default function EnquiryForm({ initialService = '' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService);
  const [notes, setNotes] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [warningMsg, setWarningMsg] = useState('');

  const services = [
    { value: 'transfer-of-equity', label: 'Transfer of Equity (£450)' },
    { value: 'death-of-joint-proprietor', label: 'Death of a Joint Proprietor (£400)' },
    { value: 'name-change', label: 'Name Change (£150)' },
    { value: 'removal-of-restriction', label: 'Removal of a Restriction (£350)' },
    { value: 'transfer-of-equity-wills-probate', label: 'Transfer of Equity (Wills/Probate) (£450)' },
    { value: 'applying-for-restriction', label: 'Applying for a Restriction (£350)' },
    { value: 'first-registration', label: 'First Registration (£600)' },
    { value: 'other', label: 'Other / General Enquiry' }
  ];

  // Sync initialService when it changes
  React.useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWarningMsg('');
    setSuccess(false);

    const payload = {
      name,
      email,
      phone,
      service: services.find(s => s.value === service)?.label || service || 'General',
      notes
    };

    const res = await saveEnquiry(payload);
    setLoading(false);

    if (res.success) {
      setSuccess(true);
      if (res.warning) {
        setWarningMsg(res.warning);
      }
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
    }
  };

  return (
    <div className="enquiry-card">
      <h3 className="enquiry-card-title">Get a Free Fixed Quote</h3>
      <p className="enquiry-card-subtitle">
        Fill out your details below and a property expert will respond within 1 hour.
      </p>

      <form onSubmit={handleSubmit} id="main-enquiry-form">
        <div className="form-group">
          <label className="form-label" htmlFor="enq-name">Full Name</label>
          <input
            id="enq-name"
            type="text"
            required
            className="form-input"
            placeholder="John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="enq-email">Email Address</label>
          <input
            id="enq-email"
            type="email"
            required
            className="form-input"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="enq-phone">Phone Number</label>
          <input
            id="enq-phone"
            type="tel"
            required
            className="form-input"
            placeholder="07123 456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="enq-service">Select Service Needed</label>
          <select
            id="enq-service"
            required
            className="form-select"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="" disabled>-- Select Conveyancing Service --</option>
            {services.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="enq-notes">Additional Details (Optional)</label>
          <textarea
            id="enq-notes"
            className="form-input form-textarea"
            placeholder="Please mention any mortgage lenders, joint names, or probate status here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading} className="form-submit-btn">
          {loading ? 'Submitting...' : (
            <>
              Request Free Quote <Send size={15} />
            </>
          )}
        </button>

        {success && (
          <div className="form-success-alert">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 700, marginBottom: 4 }}>
              <CheckCircle size={16} /> Thank you!
            </div>
            <p>Your details have been registered. A conveyancer will contact you shortly.</p>
            {warningMsg && (
              <div style={{ marginTop: 8, fontSize: 11, color: 'hsl(35, 90%, 35%)', display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={12} /> {warningMsg}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
