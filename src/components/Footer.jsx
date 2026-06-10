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
        
        {/* Main Footer Row */}
        <div className="footer-main-row">
          
          {/* Left: Brand Logo & Copyright */}
          <div className="footer-left-brand">
            <Link to="/">
              <img
                src="/land-registry-transfers-logo.svg"
                alt="Land Registry Transfers"
                className="footer-logo-img"
              />
            </Link>
            <span className="footer-copyright-text">
              &copy; {year} Land Registry Transfers. All rights reserved.
            </span>
          </div>

          {/* Middle: Links */}
          <div className="footer-center-links">
            <Link to="/about" className="footer-inline-link">About Us</Link>
            <span className="link-dot">•</span>
            <Link to="/contact" className="footer-inline-link">Contact</Link>
            <span className="link-dot">•</span>
            <Link to="/privacy" className="footer-inline-link">Privacy Policy</Link>
            <span className="link-dot">•</span>
            <Link to="/terms" className="footer-inline-link">Terms of Use</Link>
          </div>

          {/* Right: Compact Contact Row */}
          <div className="footer-right-contact">
            <a href="tel:02079460192" className="footer-contact-item" title="Call Us">
              <Phone size={14} />
              <span>020 7946 0192</span>
            </a>
            
            <span className="contact-divider">|</span>
            
            <a href="mailto:Enquiries@landregistrytransfers.com" className="footer-contact-item" title="Email Enquiries">
              <Mail size={14} />
              <span>Enquiries@landregistrytransfers.com</span>
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="footer-divider-light" />

        {/* Bottom Details Row */}
        <div className="footer-details-row">
          <div className="footer-meta-block">
            <div className="footer-meta-item">
              <MapPin size={13} className="meta-icon" />
              <span>Registered Office: 1 Limbrick, Blackburn, BB1 8AB</span>
            </div>
            <div className="footer-meta-item">
              <Clock size={13} className="meta-icon" />
              <span>Opening Hours: Mon – Fri, 9am – 5pm</span>
            </div>
          </div>
          
          <p className="footer-legal-notice">
            Disclaimer: Land Registry Transfers is an independent specialist agency providing property transfer coordination and document retrieval services. We are not associated or affiliated with HM Land Registry, the UK Government, or any government department. Registered in England &amp; Wales. SRA-regulated lawyers handle legal filings.
          </p>
        </div>

      </div>
    </footer>
  );
}
