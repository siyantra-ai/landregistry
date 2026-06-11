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
                alt="Landregistrytransfers.com Logo"
                className="footer-logo-img"
              />
            </Link>
            <span className="footer-copyright-text">
              &copy; {year} Swift Task Services Ltd. All rights reserved.
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
            <a href="tel:03335770077" className="footer-contact-item" title="Call Us">
              <Phone size={14} />
              <span>0333 577 0077</span>
            </a>
            
            <span className="contact-divider">|</span>
            
            <a href="mailto:enquiries@landregistrytransfers.com" className="footer-contact-item" title="Email Enquiries">
              <Mail size={14} />
              <span>enquiries@landregistrytransfers.com</span>
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
              <span>Swift Task Services Ltd, Company No. 17125428, 1 Limbrick, Blackburn, BB1 8AB</span>
            </div>
            <div className="footer-meta-item">
              <Clock size={13} className="meta-icon" />
              <span>Opening Hours: Mon – Fri, 9am – 5pm</span>
            </div>
          </div>
          
          <p className="footer-legal-notice">
            Disclaimer: Landregistrytransfers.com is an independent property services portal operated by Swift Task Services Ltd (Company No. 17125428). We are not associated or affiliated with HM Land Registry, the UK Government, or any government department. The same documents are available from gov.uk for £7. SRA-regulated lawyers handle legal conveyancing filings.
          </p>
        </div>

      </div>
    </footer>
  );
}
