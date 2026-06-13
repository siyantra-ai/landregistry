import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer-light">
      {/* Decorative background overlays */}
      <div className="footer-mesh" />
      <div className="footer-glow" />
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        <div className="footer-redesigned-grid">
          
          {/* Left Column Stack: Logo, Copyright & Quick Links */}
          <div className="footer-left-stack">
            <div className="footer-brand-section">
              <Link to="/">
                <img
                  src="/land-registry-transfers-logo.svg"
                  alt="Landregistrytransfers.com Logo"
                  className="footer-logo-img"
                />
              </Link>
              <span className="footer-copyright-text">
                &copy; {year} Swift Task Services Ltd. All rights reserved.
              </span>
            </div>
            
            <div className="footer-links-section">
              <h4 className="footer-section-title">Quick Links</h4>
              <div className="footer-links-grid">
                <Link to="/about" className="footer-link-item">About Us</Link>
                <Link to="/contact" className="footer-link-item">Contact</Link>
                <Link to="/faq" className="footer-link-item">FAQs</Link>
                <Link to="/privacy" className="footer-link-item">Privacy Policy</Link>
                <Link to="/terms" className="footer-link-item">Terms of Use</Link>
              </div>
            </div>
          </div>

          {/* Right Column Stack: Details, Contact, Hours & Disclaimer */}
          <div className="footer-right-stack">
            <h4 className="footer-section-title">Contact & Company Details</h4>
            
            <div className="footer-contact-details">
              <a href="tel:03335770077" className="footer-detail-item">
                <Phone size={14} />
                <span>0333 577 0077</span>
              </a>
              <a href="mailto:enquiries@landregistrytransfers.com" className="footer-detail-item">
                <Mail size={14} />
                <span>enquiries@landregistrytransfers.com</span>
              </a>
              <div className="footer-detail-item">
                <MapPin size={14} />
                <span>Swift Task Services Ltd, 1 Limbrick, Blackburn, BB1 8AB</span>
              </div>
              <div className="footer-detail-item">
                <Clock size={14} />
                <span>Opening Hours: Mon – Fri, 9am – 5pm</span>
              </div>
            </div>

            <div className="footer-compliance-box">
              <p className="footer-legal-disclaimer">
                We are an independent service. Not affiliated with HM Land Registry or the UK Government. The same documents are available from gov.uk for £7.
              </p>
              <p className="footer-legal-notice-secondary">
                Disclaimer: Landregistrytransfers.com is an independent property services portal operated by Swift Task Services Ltd. We are not associated or affiliated with HM Land Registry, the UK Government, or any government department. SRA-regulated lawyers handle legal conveyancing filings.
              </p>
            </div>
          </div>

        </div>
        
      </div>
    </footer>
  );
}
