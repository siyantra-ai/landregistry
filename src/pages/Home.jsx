import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Zap, Sparkles, Award, Scale, HelpCircle, ArrowRight, Star, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';
import EnquiryForm from '../components/EnquiryForm';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedService, setSelectedService] = useState('');

  const services = [
    { id: 'transfer-of-equity', title: 'Transfer of Equity', price: '£450', desc: 'Add or remove a partner, spouse, or family member to/from your property deeds securely.' },
    { id: 'death-of-joint-proprietor', title: 'Death of a Joint Proprietor', price: '£400', desc: 'Remove a deceased joint owner from the land registry title deeds with dignity and care.' },
    { id: 'name-change', title: 'Name Change on Deeds', price: '£150', desc: 'Officially update your legal name on property records due to marriage, divorce, or deed poll.' },
    { id: 'removal-of-restriction', title: 'Removal of a Restriction', price: '£350', desc: 'Remove outdated charges, restrictions, or cautions to free your property title deeds.' },
    { id: 'transfer-of-equity-wills-probate', title: 'Transfer of Equity (Wills/Probate)', price: '£450', desc: 'Transfer legal property ownership following estate administration, probate, or inheritance wills.' },
    { id: 'applying-for-restriction', title: 'Applying for a Restriction', price: '£350', desc: 'Protect your interest or verify trust ownership on property titles to prevent unauthorized sale.' },
    { id: 'first-registration', title: 'First Registration of Land', price: '£600', desc: 'Register unregistered historic deeds with HM Land Registry to secure modern legal ownership.' }
  ];

  const faqs = [
    { q: 'How long does a typical land registry transfer take?', a: 'Standard title transfers and name changes are usually prepared by our team within 3-5 working days. HM Land Registry then takes anywhere from 2 weeks to a few months to officially update the deeds depending on their backlog. We submit all files electronically to speed up this process.' },
    { q: 'Are your fees really fixed and inclusive of VAT?', a: 'Yes! All fees displayed on our website are completely fixed and inclusive of VAT. There are no hidden conveyancing costs, hourly rates, or file setup fees. The only extra cost would be standard Land Registry registration fees (which range from £20 to £150 depending on the property value).' },
    { q: 'Do I need a solicitor for a Transfer of Equity?', a: 'While you can legally transfer equity yourself, HM Land Registry has strict identity verification rules (Form ID1) and mortgage lenders always require an authorized legal practitioner to oversee changes. Our partner firms handle the entire process, including lender consent and stamp duty compliance.' },
    { q: 'Can you handle transfers if there is an active mortgage?', a: 'Absolutely. If there is a mortgage on the property, we must obtain your lender\'s consent to add or remove owners. We handle the communication with your bank, request the Transfer Deed approval, and process the redemption of old charges if needed.' }
  ];

  const howItWorks = [
    { title: '1. Request Quote', desc: 'Select your deed service, complete the quick online form, and receive a fixed fee illustration.' },
    { title: '2. Expert Consultation', desc: 'A dedicated deed conveyancing specialist reviews your case details via a free initial call.' },
    { title: '3. Legal Documentation', desc: 'We draft the Transfer Deed (TR1 or AP1 forms) and verify identities (ID1/ID2 compliance).' },
    { title: '4. Title Registered', desc: 'We submit your application electronically to HM Land Registry and send you the updated Title Register.' }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // LocalBusiness schema for SEO
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Land Registry Transfers",
    "image": "https://landregistrytransfers.com/logo.png",
    "@id": "https://landregistrytransfers.com/#localbusiness",
    "url": "https://landregistrytransfers.com",
    "telephone": "+442079460192",
    "priceRange": "£150-£600",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "128 City Road",
      "addressLocality": "London",
      "postalCode": "EC1V 2NX",
      "addressCountry": "GB"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <>
      <SEO 
        title="Fixed-Fee Property Deed Transfers & Land Registration Services" 
        description="Professional fixed-fee conveyancing portal for Transfer of Equity, Restriction addition or removal, Name changes on deeds, and First Registrations. VAT included."
        schemaJson={businessSchema}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <div className="hero-tag">
              <Sparkles size={13} style={{ fill: 'currentColor' }} /> Fixed-Fee Deed Transfers & Registrations
            </div>
            
            <h1 className="hero-title">
              Transfer Property Deeds <span>Easily & Securely</span>
            </h1>
            
            <p className="hero-subtitle">
              Expert title deed changes and land registry applications from just <strong>£150 inc. VAT</strong>. Fast, transparent, and direct access to legal conveyancers.
            </p>

            <div className="hero-trust">
              <div className="hero-trust-item">
                <Star size={16} fill="currentColor" stroke="none" style={{ color: '#fbbf24' }} />
                <span><strong>4.9/5</strong> Trust Score</span>
              </div>
              <div className="hero-trust-item">
                <ShieldCheck size={16} />
                <span>Fully Insured Partner Solicitors</span>
              </div>
              <div className="hero-trust-item">
                <Zap size={16} />
                <span>Fast 1-Hour Callback</span>
              </div>
            </div>

            {/* Quick service navigation selector */}
            <div style={{ marginTop: 40, padding: 20, backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-md)', border: '1px solid hsla(221, 83%, 53%, 0.1)' }}>
              <p style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--primary)', marginBottom: 10 }}>Select a service to get started:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {services.slice(0, 4).map(s => (
                  <button 
                    key={s.id} 
                    onClick={() => setSelectedService(s.id)}
                    className="nav-cta" 
                    style={{ background: selectedService === s.id ? 'var(--primary)' : 'rgba(255,255,255,0.8)', color: selectedService === s.id ? '#fff' : 'var(--text-main)', border: '1px solid var(--border-color)', fontSize: 13, cursor: 'pointer', padding: '8px 16px' }}
                  >
                    {s.title}
                  </button>
                ))}
                <Link to="/services/applying-for-restriction" className="nav-cta" style={{ background: 'none', color: 'var(--primary)', border: 'none', fontSize: 13, fontWeight: 700 }}>
                  View All +
                </Link>
              </div>
            </div>
          </div>

          <div>
            <EnquiryForm initialService={selectedService} />
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="section" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: '#fff' }}>
        <div className="container">
          <div className="trust-signals-grid">
            <div className="trust-card">
              <div className="trust-number">10,000+</div>
              <div className="trust-label">Applications Filed</div>
            </div>
            <div className="trust-card">
              <div className="trust-number">100%</div>
              <div className="trust-label">Fixed Fees (Inc. VAT)</div>
            </div>
            <div className="trust-card">
              <div className="trust-number">4.9 ★</div>
              <div className="trust-label">Customer Rating</div>
            </div>
            <div className="trust-card">
              <div className="trust-number">3-5 Days</div>
              <div className="trust-label">Average Draft Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-light" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Property Deed Experts</span>
            <h2 className="section-title">Our Conveyancing & Registration Services</h2>
            <p className="section-desc">We offer direct, fixed pricing on all common HM Land Registry deed alterations, ownership transfers, and official restrictions.</p>
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <div key={s.id} className="service-card">
                <div className="service-card-icon">
                  <FileText size={22} />
                </div>
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-desc">{s.desc}</p>
                
                <div className="service-card-footer">
                  <div className="service-price-box">
                    <span className="price-lbl">Fixed Fee</span>
                    <span className="price-val">{s.price} <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-muted)' }}>inc. VAT</span></span>
                  </div>
                  <Link to={`/services/${s.id}`} className="service-btn">
                    Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Process Flow</span>
            <h2 className="section-title">How the Transfer Process Works</h2>
            <p className="section-desc">We make changing your property deeds straightforward. Here is what to expect.</p>
          </div>

          <div className="how-it-works-grid">
            {howItWorks.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-number-badge">{idx + 1}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle" style={{ color: 'var(--secondary)' }}>Why Us</span>
            <h2 className="section-title" style={{ color: '#fff' }}>Smarter Conveyancing, Better Vibe</h2>
            <p className="section-desc">Experience a modern, SaaS-enabled legal portal that respects your time and budget.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32, marginTop: 40 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
              {[
                { icon: <Award size={20} />, title: 'Fully Certified Specialists', text: 'All property filings are prepared and verified by experienced conveyancing professionals and registered solicitor firms.' },
                { icon: <ShieldCheck size={20} />, title: 'Absolute Protection', text: 'Professional Indemnity Insurance up to £3,000,000 protects every transaction and document submitted.' },
                { icon: <Scale size={20} />, title: 'No Hidden Disbursements', text: 'The price you see is the price you pay. We do not add document storage fees, search markups, or admin surcharges.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 16, padding: 24, backgroundColor: 'var(--dark-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--dark-border)' }}>
                  <div style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'fit-content', padding: 10, borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 8 }}>{item.title}</h4>
                    <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-light" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">Clear answers to your property registry and deed queries.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button className="faq-question-btn" onClick={() => toggleFaq(index)}>
                  <span>{faq.q}</span>
                  {activeFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {activeFaq === index && (
                  <div className="faq-answer-panel">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
