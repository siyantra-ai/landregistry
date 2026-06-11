import React from 'react';
import { Phone, Mail, MapPin, Clock, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import EnquiryForm from '../components/EnquiryForm';

export default function Contact() {
  return (
    <>
      <SEO 
        title="Contact Us - Free Fixed Conveyancing Quote" 
        description="Get in touch with Landregistrytransfers.com. Call 0333 577 0077, email enquiries@landregistrytransfers.com or sales@landregistrytransfers.com, or visit our office in Blackburn."
      />

      {/* Hero */}
      <section className="service-hero" style={{ paddingBottom: 60 }}>
        <div className="hero-grid-pattern" />
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 720, textAlign: 'center' }}>
          <span className="service-hero-badge">Support Center</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>Get in Touch</h1>
          <p className="service-hero-desc" style={{ maxWidth: 540, margin: '0 auto' }}>
            Have questions about property deeds? Our team of advisors is here to help you navigate title deeds and land registry transfers.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section section-white">
        <div className="container">
          <div className="contact-grid">
            
            {/* Contact details card */}
            <div className="contact-card">
              <div className="support-illustration-container">
                <img src="/gifs/support.gif" alt="Support Specialist" className="support-illustration-media" />
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, color: 'var(--text-primary)', textAlign: 'center' }}>Our Contact Details</h3>

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

              {/* Map Placeholder */}
              <div className="map-placeholder">
                <MapPin size={24} style={{ color: 'var(--blue-600)' }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Map of Blackburn Area</span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>1 Limbrick, Blackburn</span>
              </div>
            </div>

            {/* Form & Security notice */}
            <div>
              <EnquiryForm />
              
              <div style={{ 
                marginTop: 24, 
                padding: 20, 
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
