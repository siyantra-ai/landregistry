import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight, FileText, Sparkles, ShieldCheck, Clock, MapPin } from 'lucide-react';

const DOCUMENT_SERVICES = [
  {
    id: 'title-register',
    title: 'Title Register',
    price: '£45',
    desc: 'Official record of ownership, charges, mortgages, and restrictions',
  },
  {
    id: 'title-plan',
    title: 'Title Plan',
    price: '£45',
    desc: 'Plan showing the general extent of the registered title boundaries',
  },
  {
    id: 'map-search',
    title: 'Map Search',
    price: '£65',
    desc: 'Retrieve Title Register & Plan for land/property without a known address',
  },
  {
    id: 'deed-search',
    title: 'Deed Search',
    price: '£75',
    desc: 'Search filed transfer, conveyancing, charge, or lease deeds',
  },
  {
    id: 'property-ownership',
    title: 'Property Ownership Search',
    price: '£55',
    desc: 'Combined title register and plan showing full ownership details',
  },
  {
    id: 'property-alert',
    title: 'Property Alert Service',
    price: 'Redirect',
    desc: 'Protect against property fraud with HM Land Registry alerts',
  }
];

export default function DocumentAccessSection() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if query param ?select=service-id is passed
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectId = params.get('select');
    if (selectId) {
      const matched = DOCUMENT_SERVICES.find(doc => doc.id === selectId);
      if (matched) {
        navigate(`/apply/${matched.id}`, { replace: true });
      }
    }
  }, [location.search, navigate]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectService = (doc) => {
    navigate(`/apply/${doc.id}`);
    setIsOpen(false);
  };

  return (
    <section className="section doc-access-section" id="document-access">
      <div className="container doc-access-container">
        
        {/* Left Side: Copy & Selection Dropdown */}
        <div className="doc-access-left" style={{ textAlign: 'left' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-accent)', fontWeight: 700, display: 'block', marginBottom: '12px' }}>
            HM Land Registry Documents
          </span>
          <h2 className="doc-access-title" style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '16px', lineHeight: '1.2' }}>
            Official Document Access
          </h2>
          <p className="doc-access-desc" style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '28px', maxWidth: '540px' }}>
            Need official extracts, title boundaries, deed records, or geographic land lookups? Select a service below to begin your secure application.
          </p>
          
          {/* Custom Dropdown */}
          <div className="doc-dropdown-wrapper" ref={dropdownRef} style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
            <button 
              type="button"
              className={`doc-trigger ${isOpen ? 'active' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsOpen(true)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                backgroundColor: '#ffffff',
                border: '1.5px solid var(--border-default)',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={18} style={{ color: 'var(--blue-600)' }} /> Select Land Registry Service...
              </span>
              <ChevronDown size={18} style={{ transition: 'transform 0.2s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>
            
            {isOpen && (
              <div 
                className="doc-menu" 
                role="listbox"
                onMouseLeave={() => setIsOpen(false)}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '8px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid var(--border-default)',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 200,
                  maxHeight: '320px',
                  overflowY: 'auto',
                  overflowX: 'hidden'
                }}
              >
                {DOCUMENT_SERVICES.map((doc) => (
                  <div
                    key={doc.id}
                    className="doc-item"
                    role="option"
                    onClick={() => handleSelectService(doc)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '14px 20px',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                      borderBottom: '1px solid var(--border-subtle)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                  >
                    <div className="doc-item-content" style={{ flex: 1, paddingRight: '16px' }}>
                      <span className="doc-item-title" style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>{doc.title}</span>
                      <span className="doc-item-desc" style={{ display: 'block', fontSize: '12.5px', color: 'var(--text-secondary)' }}>{doc.desc}</span>
                    </div>
                    <div className="doc-item-action" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ArrowRight size={14} style={{ color: 'var(--text-tertiary)' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right Side: Features Cards */}
        <div className="doc-access-right" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1.5px solid var(--border-default)', borderRadius: '16px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ backgroundColor: 'rgba(47, 79, 70, 0.08)', padding: '10px', borderRadius: '10px', color: 'var(--blue-600)' }}>
              <ShieldCheck size={24} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Official HM Land Registry Copies</h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>All documents are sourced directly from official government registry archives.</p>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1.5px solid var(--border-default)', borderRadius: '16px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ backgroundColor: 'rgba(47, 79, 70, 0.08)', padding: '10px', borderRadius: '10px', color: 'var(--blue-600)' }}>
              <Clock size={24} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Fast-Track Available</h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Standard delivery within 24 working hours, with fast-track processing in under 12 hours.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
