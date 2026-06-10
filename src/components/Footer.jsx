import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { id: 'transfer-of-equity', title: 'Transfer of Equity' },
    { id: 'death-of-joint-proprietor', title: 'Death of a Joint Proprietor' },
    { id: 'name-change', title: 'Name Change' },
    { id: 'removal-of-restriction', title: 'Removal of a Restriction' },
    { id: 'transfer-of-equity-wills-probate', title: 'Transfer of Equity (Wills/Probate)' },
    { id: 'applying-for-restriction', title: 'Applying for a Restriction' },
    { id: 'first-registration', title: 'First Registration' },
  ];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <Link to="/" className="logo">
              LandRegistry<span>Transfers</span>
            </Link>
            <p>
              Professional, fixed-fee legal services for UK property transfers, restriction additions, removals, and land registrations. Experienced team, direct communication, and rapid turnaround times.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {/* Trust badges can go here */}
              <div style={{ border: '1px solid var(--dark-border)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', fontSize: 11, backgroundColor: 'rgba(255,255,255,0.02)', color: '#fff' }}>
                ⭐ <strong>4.9/5 Rating</strong> on Reviews
              </div>
              <div style={{ border: '1px solid var(--dark-border)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', fontSize: 11, backgroundColor: 'rgba(255,255,255,0.02)', color: '#fff' }}>
                🔒 <strong>Secure Portal</strong> SSL Encrypted
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home Page</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact & Support</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="footer-link">{s.title}</Link>
                </li>
              ))}
              <li>
                <Link to="/services/applying-for-restriction" className="footer-link" style={{ fontSize: 13, color: 'var(--secondary)' }}>
                  View All Services +
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Times */}
          <div>
            <h4 className="footer-heading">Contact Details</h4>
            
            <div className="footer-contact-item">
              <Phone size={16} />
              <div>
                <p style={{ fontWeight: 600, color: 'var(--text-light)' }}>020 7946 0192</p>
                <p style={{ fontSize: 12 }}>Mon - Fri, 9 AM - 6 PM</p>
              </div>
            </div>

            <div className="footer-contact-item">
              <Mail size={16} />
              <div>
                <p style={{ color: 'var(--text-light)' }}>support@landregistrytransfers.com</p>
                <p style={{ fontSize: 12 }}>24/7 Enquiry Intake</p>
              </div>
            </div>

            <div className="footer-contact-item">
              <MapPin size={16} />
              <div>
                <p>128 City Road</p>
                <p>London, EC1V 2NX</p>
              </div>
            </div>

            <div className="footer-contact-item">
              <Clock size={16} />
              <div>
                <p>Office Opening Hours</p>
                <p style={{ fontSize: 12 }}>Monday to Friday: 9am - 6pm (Closed Bank Holidays)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Land Registry Transfers. All rights reserved. Land Registry Transfers is a private conveyancing service portal. We are not affiliated with HM Land Registry or any government agency.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms & Conditions</Link>
            <Link to="/cookies" className="footer-link">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
