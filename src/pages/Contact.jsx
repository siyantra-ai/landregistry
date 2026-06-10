import React from 'react';
import { Phone, Mail, MapPin, Clock, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import EnquiryForm from '../components/EnquiryForm';

export default function Contact() {
  return (
    <>
      <SEO 
        title="Contact Us - Free Fixed Conveyancing Quote" 
        description="Get in touch with Land Registry Transfers. Call 020 7946 0192, email support@landregistrytransfers.com, or visit our office in London."
      />

      <section className="service-detail-hero" style={{ padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="service-badge">Support Center</span>
          <h1 className="service-title-h1">Get in Touch</h1>
          <p className="hero-subtitle">
            Have questions about property deeds? Our team of advisors is here to help.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="contact-grid">
            
            {/* Contact details card */}
            <div className="contact-card">
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, letterSpacing: '-0.5px' }}>Our Contact Details</h3>

              <div className="contact-info-block">
                <div className="contact-info-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-info-content">
                  <h4>Phone Support</h4>
                  <p style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 16 }}>020 7946 0192</p>
                  <p>Speak directly to a property conveyancing expert.</p>
                </div>
              </div>

              <div className="contact-info-block">
                <div className="contact-info-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-info-content">
                  <h4>Email Enquiry</h4>
                  <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>support@landregistrytransfers.com</p>
                  <p>Send documents and scans for file audits.</p>
                </div>
              </div>

              <div className="contact-info-block">
                <div className="contact-info-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-info-content">
                  <h4>Office Address</h4>
                  <p>Land Registry Transfers</p>
                  <p>128 City Road, London, EC1V 2NX</p>
                </div>
              </div>

              <div className="contact-info-block">
                <div className="contact-info-icon">
                  <Clock size={20} />
                </div>
                <div className="contact-info-content">
                  <h4>Opening Hours</h4>
                  <p>Monday to Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday & Sunday: Closed (Portal open for submissions)</p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="map-placeholder">
                <MapPin size={24} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: 14, fontWeight: 700 }}>Map of EC1V London Area</span>
                <span style={{ fontSize: 11 }}>128 City Road, London</span>
              </div>
            </div>

            {/* Form */}
            <div>
              <EnquiryForm />
              
              <div style={{ marginTop: 24, padding: 20, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', gap: 12, backgroundColor: '#ffffff', boxShadow: 'var(--shadow-sm)' }}>
                <Shield size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  <strong>Secure Submission:</strong> We treat all personal details in strict confidence. Your data is protected by SSL encryption and processed in full compliance with the UK Data Protection Act / GDPR.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
