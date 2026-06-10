import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown, Phone, Menu, X, ArrowRight, Home } from 'lucide-react';

export default function Header({ onRequestCallback }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const phoneNumber = '020 7946 0192';

  const services = [
    { id: 'transfer-of-equity', title: 'Transfer of Equity', price: '£450' },
    { id: 'death-of-joint-proprietor', title: 'Death of a Joint Proprietor', price: '£400' },
    { id: 'name-change', title: 'Name Change', price: '£150' },
    { id: 'removal-of-restriction', title: 'Removal of a Restriction', price: '£350' },
    { id: 'transfer-of-equity-wills-probate', title: 'Transfer of Equity (Wills/Probate)', price: '£450' },
    { id: 'applying-for-restriction', title: 'Applying for a Restriction', price: '£350' },
    { id: 'first-registration', title: 'First Registration', price: '£600' },
  ];

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
          LandRegistry<span>Transfers</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-menu">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          
          <div className="dropdown-container">
            <button className="dropdown-trigger">
              Services <ChevronDown size={14} />
            </button>
            <div className="dropdown-menu">
              {services.map((s) => (
                <Link key={s.id} to={`/services/${s.id}`} className="dropdown-item">
                  <span className="dropdown-item-title">{s.title}</span>
                  <span className="dropdown-item-subtitle">Fixed Fee: {s.price} inc. VAT</span>
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Contact
          </NavLink>
          
          <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
            <Phone size={15} style={{ color: 'var(--primary)' }} /> {phoneNumber}
          </a>
        </nav>

        {/* Desktop CTA */}
        <button 
          onClick={onRequestCallback} 
          className="nav-cta" 
          style={{ display: 'none', border: 'none', cursor: 'pointer' }}
        >
          Request Callback <ArrowRight size={14} />
        </button>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav panel */}
      {mobileMenuOpen && (
        <div className="mobile-menu-panel">
          <div className="mobile-menu-title">Main Menu</div>
          <div className="mobile-nav-links">
            <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Contact Details
            </Link>
          </div>

          <div className="mobile-menu-title" style={{ marginTop: 16 }}>Our Conveyancing Services</div>
          <div className="mobile-services-grid">
            {services.map((s) => (
              <Link 
                key={s.id} 
                to={`/services/${s.id}`} 
                className="mobile-service-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{s.title}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{s.price}</span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a 
              href={`tel:${phoneNumber.replace(/\s+/g, '')}`} 
              className="form-submit-btn" 
              style={{ background: 'var(--light-bg)', color: 'var(--text-main)', border: '1px solid var(--border-color)', display: 'flex', gap: 8 }}
            >
              <Phone size={18} /> Call {phoneNumber}
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onRequestCallback(); }} 
              className="form-submit-btn"
            >
              Request Call Back
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
