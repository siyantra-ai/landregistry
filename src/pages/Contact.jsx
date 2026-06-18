import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Shield, Send, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { saveHelpRequest } from '../db/supabase';

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const departments = [
    { value: 'enquiry', label: 'Existing Customer Enquiry' },
    { value: 'sales', label: 'Sales Enquiry' },
    { value: 'update', label: 'Request Forms or Update/Change Your Details' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg('');

    const selectedDeptLabel = departments.find(d => d.value === department)?.label || 'General Enquiry';
    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    const res = await saveHelpRequest({
      name: fullName,
      email: email,
      subject: `${selectedDeptLabel} - ${subject.trim()}`,
      body: `Phone: ${phone}\n\n${message.trim()}`
    });

    setLoading(false);
    if (res.success) {
      setSuccess(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setDepartment('');
      setMessage('');
      try {
        localStorage.setItem('landregistry_prefill_name', fullName);
        localStorage.setItem('landregistry_prefill_email', email);
        localStorage.setItem('landregistry_prefill_phone', phone);
      } catch (err) {
        console.error('Failed to save prefill details:', err);
      }
    } else {
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us - Land Registry Transfers" 
        description="Get in touch with Landregistrytransfers.com. Call 0333 577 0077, email enquiries@landregistrytransfers.com or sales@landregistrytransfers.com, or visit our office in Blackburn."
      />

      {/* Hero Section */}
      <section className="service-hero" style={{ paddingBottom: 60 }}>
        <div className="hero-grid-pattern" />
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 1200 }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 items-center">
            <div style={{ textAlign: 'left' }}>
              <span className="service-hero-badge" style={{ display: 'inline-block', marginBottom: '16px' }}>Support Center</span>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.15, marginBottom: '16px' }}>Whenever you need</h1>
              <p className="service-hero-desc" style={{ maxWidth: '560px', margin: '0', fontSize: '16px', lineHeight: 1.6 }}>
                We are here whenever you need us. Our technique distinguishes us from other service providers and ensures clients receive unrivalled assistance at all phases of their application and beyond.
              </p>
            </div>
            <div className="service-illustration-frame hidden md:flex" style={{ maxWidth: '320px', margin: '0' }}>
              <div className="micro-grid-bg" />
              <img src="/gifs/support.gif" alt="Support Specialist" className="service-gif-media" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section section-white" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="contact-grid">
            
            {/* Left Column: Get in touch form */}
            <div className="contact-card" style={{ padding: '40px', background: '#f8fafc', border: '1px solid var(--border-default)' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>Get in <strong>touch</strong></h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>
                Please contact us using the form below. We will contact you within 48 hours.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="first_name">First name</label>
                    <input
                      id="first_name"
                      type="text"
                      required
                      className="form-input"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="last_name">Last name</label>
                    <input
                      id="last_name"
                      type="text"
                      required
                      className="form-input"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="email">Email address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="form-input"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="phone">Phone number</label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      className="form-input"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    required
                    className="form-input"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="department">Select Department</label>
                  <select
                    id="department"
                    required
                    className="form-select"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="" disabled>Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value}>{dept.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="message">What do you require?</label>
                  <textarea
                    id="message"
                    required
                    className="form-input form-textarea"
                    placeholder="What do you require?"
                    rows={4}
                    style={{ minHeight: '120px' }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button type="submit" disabled={loading} className="form-submit" style={{ padding: '14px', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {loading ? 'Submitting...' : <><Send size={16} /> Submit</>}
                </button>

                {success && (
                  <div className="form-success" style={{ marginTop: '12px' }}>
                    <CheckCircle size={16} style={{ display: 'inline', verticalAlign: -3, marginRight: 6 }} />
                    <strong>Thank you!</strong> Your message has been sent. We will contact you within 48 hours.
                  </div>
                )}
                {errorMsg && (
                  <div style={{ color: 'var(--destructive)', fontSize: '14px', marginTop: '12px', textAlign: 'center' }}>
                    {errorMsg}
                  </div>
                )}
              </form>
            </div>

            {/* Right Column: CTA sidebar / info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="contact-card" style={{ padding: '40px', background: 'var(--gradient-brand)', color: 'white', border: 'none' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px', color: 'white', lineHeight: 1.25 }}>
                  Are you ready to request documents <strong>online?</strong>
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', marginBottom: '32px', fontSize: '15px', lineHeight: 1.6 }}>
                  Our online services allow the general public and professionals to obtain authentic copies of Land Registry Title documents.
                </p>
                <a href="/#services" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '16px', background: 'white', color: 'var(--blue-600)', fontWeight: 700, borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-md)' }}>
                  Obtain Documents
                </a>
              </div>

              {/* Address / info card */}
              <div className="contact-card" style={{ padding: '40px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-primary)' }}>Our Contact Details</h3>

                <div className="contact-info-block">
                  <div className="contact-info-icon">
                    <Phone size={20} />
                  </div>
                  <div className="contact-info-content">
                    <h4>Phone Support</h4>
                    <p style={{ fontWeight: 700, color: 'var(--blue-600)', fontSize: 16, marginTop: 2 }}>0333 577 0077</p>
                    <p style={{ fontSize: 13, marginTop: 2 }}>Speak directly to a property conveyancing expert.</p>
                  </div>
                </div>

                <div className="contact-info-block">
                  <div className="contact-info-icon">
                    <Mail size={20} />
                  </div>
                  <div className="contact-info-content">
                    <h4>Email Enquiry</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: 2 }}>
                      <a href="mailto:enquiries@landregistrytransfers.com" style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}>enquiries@landregistrytransfers.com</a>
                      <a href="mailto:sales@landregistrytransfers.com" style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}>sales@landregistrytransfers.com</a>
                    </div>
                    <p style={{ fontSize: 13, marginTop: 2 }}>Send documents and scans for file audits.</p>
                  </div>
                </div>

                <div className="contact-info-block">
                  <div className="contact-info-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-info-content">
                    <h4>Office Address</h4>
                    <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginTop: 2 }}>Swift Task Services Ltd</p>
                    <p style={{ fontSize: 13 }}>1 Limbrick, Blackburn, BB1 8AB</p>
                  </div>
                </div>

                <div className="contact-info-block">
                  <div className="contact-info-icon">
                    <Clock size={20} />
                  </div>
                  <div className="contact-info-content">
                    <h4>Opening Hours</h4>
                    <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginTop: 2 }}>Monday to Friday: 9:00 AM - 5:00 PM</p>
                    <p style={{ fontSize: 13 }}>Saturday & Sunday: Closed (Portal open for submissions)</p>
                  </div>
                </div>
              </div>

              <div style={{ 
                padding: '20px', 
                border: '1px solid var(--border-default)', 
                borderRadius: 'var(--r-md)', 
                display: 'flex', 
                gap: 12, 
                backgroundColor: 'rgba(0,0,0,0.01)',
                backdropFilter: 'blur(8px)'
              }}>
                <Shield size={24} style={{ color: 'var(--blue-600)', flexShrink: 0 }} />
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Secure Submission:</strong> We treat all personal details in strict confidence. Your data is protected by SSL encryption and processed in full compliance with the UK Data Protection Act / GDPR.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
