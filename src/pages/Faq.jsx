import React, { useState } from 'react';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function Faq() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: 'How long does a Transfer of Equity take to register with HM Land Registry?', a: 'Preparing and drafting the TR1 transfer deed takes 3 to 5 working days. Once signed and submitted electronically to HM Land Registry, the official processing time can range from 2 weeks to several months depending on their current application queues. We track your application status to ensure swift registration.' },
    { q: 'Do I need a solicitor to change or update a name on my property deeds?', a: 'While you can file applications independently, using a regulated practitioner ensures forms (like the AP1) are filled legally and comply with strict anti-fraud checks. We manage the entire process for name changes due to marriage, divorce, or deed poll.' },
    { q: 'What is the process to remove a deceased joint owner from land registry deeds?', a: 'To remove a deceased owner, a surviving proprietor must file a Deceased Joint Proprietor application (Form DJP) supported by a certified copy of the Death Certificate or Grant of Probate. This updates the register under survivorship rules, ensuring legal records remain accurate.' },
    { q: 'Can I transfer property deeds if there is an active mortgage on the property?', a: 'Yes, transferring equity on a mortgaged property requires the written consent of the mortgage lender. Our partner conveyancers handle the lender liaison, submitting the necessary documentation to ensure the mortgage terms are successfully updated alongside the property title transfer.' },
    { q: 'How do I clear an outdated restriction or charge from my property deeds?', a: 'Outdated restrictions or charges (such as a paid-off private loan or tenant-in-common restriction) are removed by filing Form RX3 or RX4 with HM Land Registry. This requires official supporting evidence of release or cancellation. Our team reviews your documents to ensure a successful removal.' }
  ];

  return (
    <>
      <SEO title="Deed Transfer & Conveyancing FAQs | Landregistrytransfers.com" description="Find answers to all your property registry, ownership transfers, deed name changes, and restriction removal questions." />

      {/* Hero */}
      <section className="service-hero" style={{ paddingBottom: 60 }}>
        <div className="hero-grid-pattern" />
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 720, textAlign: 'center' }}>
          <span className="service-hero-badge">Support</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>Frequently Asked Questions</h1>
          <p className="service-hero-desc" style={{ maxWidth: 540, margin: '16px auto 0' }}>
            Find clear, expert answers to your questions about property registry, ownership transfers, and official document filings.
          </p>
        </div>
      </section>

      {/* FAQs list */}
      <section className="section section-light">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`} style={{ marginBottom: '16px' }}>
                <button 
                  className="faq-trigger" 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  <span style={{ fontWeight: 600 }}>{faq.q}</span>
                  <span className="faq-icon"><ChevronDown size={18} /></span>
                </button>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer-inner">
                    <div className="faq-answer">
                      <p style={{ margin: 0, padding: '16px 0 8px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, textAlign: 'center', background: 'var(--white)', padding: 32, borderRadius: 16, border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
            <div className="help-card-glow" style={{ opacity: 0.15 }} />
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>Still have questions?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: '15px' }}>Speak directly to an experienced conveyancing specialist today.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">
                Contact Our Team <ArrowRight size={16} />
              </Link>
              <Link to="/#services" className="btn-secondary">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
