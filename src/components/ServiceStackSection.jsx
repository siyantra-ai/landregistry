import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const getCalendlyPrefill = () => {
  try {
    const name = localStorage.getItem('landregistry_prefill_name') || '';
    const email = localStorage.getItem('landregistry_prefill_email') || '';
    const phone = localStorage.getItem('landregistry_prefill_phone') || '';
    
    const prefill = {};
    if (name) prefill.name = name;
    if (email) prefill.email = email;
    if (phone) {
      prefill.customAnswers = {
        a1: phone,
        a2: phone,
        a3: phone
      };
    }
    return Object.keys(prefill).length > 0 ? prefill : undefined;
  } catch (e) {
    return undefined;
  }
};

/* Per-service bullet points shown in the card */
const SERVICE_DETAILS = {
  'transfer-of-equity': [
    'Drafting the TR1 Transfer Deed',
    'Mortgage lender consent handled',
    'HM Land Registry electronic filing',
  ],
  'death-of-joint-proprietor': [
    'Death certificate registration',
    'Survivorship application (DJP)',
    'Title register updated in your name',
  ],
  'name-change': [
    'Deed poll or marriage cert accepted',
    'Official title register update',
    'Confirmation letter provided',
  ],
  'transfer-of-equity-wills-probate': [
    'Probate grant review',
    'Assent or transfer deed drafted',
    'Estate administration support',
  ],
  'tenants-in-common': [
    'Severance of joint tenancy',
    'Protect your specific property share',
    'Change your ownership structure',
  ],
  'first-registration': [
    'Historic deeds reviewed & verified',
    'Form FR1 filed electronically',
    'Official title register created',
  ],
  'additional-services': [
    'Custom conveyancing solutions',
    'Expert registry advice',
    'Complex property matters',
  ],
};

export default function ServiceStackSection({ services }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!isMobile) return null;

  // Filter out the Deceased Joint Proprietor / Death of a Joint Proprietor service for mobile view
  const filteredServices = services.filter(
    (s) => s.id !== 'death-of-joint-proprietor' && s.id !== 'deceased-joint-proprietor'
  );

  return (
    <div className="mobile-services-clean-section">
      <div className="section-header" style={{ marginBottom: '24px', textAlign: 'center' }}>
        <span className="section-eyebrow">Our Services</span>
        <h2 className="section-title" style={{ fontSize: '24px', marginTop: '8px' }}>
          Property Deed &amp; Land Registry Services
        </h2>
        <p className="section-desc" style={{ fontSize: '14px' }}>
          Direct, fixed pricing on all common HM Land Registry deed alterations, ownership transfers, and official restrictions.
        </p>
      </div>

      <div className="mobile-services-grid">
        {filteredServices.map((s, idx) => {
          const bullets = SERVICE_DETAILS[s.id] || [];
          return (
            <div
              key={s.id}
              onClick={() => {
                if (import.meta.env.VITE_CALENDLY_URL && window.Calendly) {
                  window.Calendly.initPopupWidget({ 
                    url: import.meta.env.VITE_CALENDLY_URL,
                    prefill: getCalendlyPrefill()
                  });
                } else {
                  window.location.href = `/services/${s.id}`;
                }
              }}
              className="mobile-service-card"
              style={{ cursor: 'pointer' }}
            >
              <div className="mobile-service-card-top">
                <span className="mobile-card-index">{(idx + 1).toString().padStart(2, '0')}</span>
                <img src={s.gif} alt={s.title} className="mobile-service-card-gif" />
              </div>
              <div className="mobile-service-card-body">
                <h3 className="mobile-service-card-title">{s.title}</h3>
                <p className="mobile-service-card-desc">{s.desc}</p>
                {bullets.length > 0 && (
                  <ul className="mobile-service-card-bullets">
                    {bullets.map((b, bi) => (
                      <li key={bi} className="mobile-service-card-bullet">
                        <CheckCircle size={13} className="bullet-icon" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <span className="mobile-service-card-cta">
                  Book now <ArrowRight size={13} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
