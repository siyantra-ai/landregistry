import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import EnquiryForm from '../components/EnquiryForm';
import ServiceStackSection from '../components/ServiceStackSection';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const servicesSectionRef = useRef(null);
  const [visibleServiceCount, setVisibleServiceCount] = useState(0);

  const eyebrowTexts = [
    "Fixed-Fee Property Deed Transfers",
    "Transfer of Equity Specialists",
    "Land Registry Deed Name Changes",
    "Clear Outdated Title Restrictions",
    "Register Unregistered Property Deeds"
  ];

  const [eyebrowIdx, setEyebrowIdx] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  const services = [
    { id: 'transfer-of-equity', title: 'Transfer of Equity', desc: 'Add or remove a partner, spouse, or family member from your property title deeds.', gif: '/gifs/add_name.gif' },
    { id: 'death-of-joint-proprietor', title: 'Death of a Joint Proprietor', desc: 'Remove a deceased joint owner from the land registry title with care and precision.', gif: '/gifs/death.gif' },
    { id: 'name-change', title: 'Name Change on Deeds', desc: 'Update your legal name on property records due to marriage, divorce, or deed poll.', gif: '/gifs/namechange.gif' },
    { id: 'removal-of-restriction', title: 'Removal of a Restriction', desc: 'Clear outdated charges, restrictions, or cautions from your property title.', gif: '/gifs/tennant.gif' },
    { id: 'transfer-of-equity-wills-probate', title: 'Transfer of Equity (Wills / Probate)', desc: 'Transfer property ownership following probate, inheritance, or estate administration.', gif: '/gifs/add_name.gif' },
    { id: 'applying-for-restriction', title: 'Applying for a Restriction', desc: 'Protect your interest or trust ownership to prevent unauthorized property sale.', gif: '/gifs/tennant.gif' },
    { id: 'first-registration', title: 'First Registration', desc: 'Register unregistered historic deeds with HM Land Registry for modern legal security.', gif: '/gifs/first_registration.gif' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setEyebrowIdx((prev) => (prev + 1) % eyebrowTexts.length);
        setFadeState('fade-in');
      }, 300);
    }, 4000);

  }, []);

  const reviews = [
    {
      name: "Charlotte S.",
      text: "Equity transfer drafted in 3 days. Exceptional!",
      image: "https://i.pinimg.com/736x/e4/10/a9/e410a9c2f9fdc8a961b4fd3381c48c03.jpg"
    },
    {
      name: "Sophie T.",
      text: "Friendly staff helped me with deeds name change after marriage.",
      image: "https://i.pinimg.com/736x/6d/2d/2e/6d2d2ed816a4ee8a536efde5e2357374.jpg"
    },
    {
      name: "James W.",
      text: "Fixed price with VAT as promised. Transparent.",
      image: "https://i.pinimg.com/1200x/f5/36/71/f5367176dca91468d735e820db953f1c.jpg"
    },
    {
      name: "Harry E.",
      text: "Excellent service removing restriction after probate.",
      image: "https://i.pinimg.com/736x/af/60/b0/af60b0d59a08dce89e27b671820c2f8a.jpg"
    },
    {
      name: "Jack T.",
      text: "Historic first registration handled secure and fast.",
      image: "https://i.pinimg.com/1200x/65/7c/e1/657ce19e18e65061190c7927400947cf.jpg"
    },
    {
      name: "Oliver B.",
      text: "Really smooth process changing joint tenants deeds. Recommended.",
      image: "https://i.pinimg.com/1200x/f5/9c/90/f59c9088e58a7baaa3b463ddca7dbab2.jpg"
    }
  ];

  const [reviewIdx, setReviewIdx] = useState(0);
  const [reviewFade, setReviewFade] = useState('fade-in');

  useEffect(() => {
    const section = servicesSectionRef.current;
    if (!section) return undefined;

    const mobileQuery = window.matchMedia('(max-width: 767px)');
    if (!mobileQuery.matches) {
      setVisibleServiceCount(services.length);
      return undefined;
    }

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const currentScroll = window.scrollY;
      const scrollIntoSection = Math.max(0, currentScroll - sectionTop);
      
      // Each card takes ~360px height, plus scroll trigger buffer
      const cardHeight = 360;
      const scrollPerCard = 280; // scroll distance to trigger each card
      const cardIndex = Math.floor(scrollIntoSection / scrollPerCard);
      const visibleCount = Math.min(cardIndex + 1, services.length);
      
      setVisibleServiceCount(visibleCount);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [services.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setReviewFade('fade-out');
      setTimeout(() => {
        setReviewIdx((prev) => (prev + 1) % reviews.length);
        setReviewFade('fade-in');
      }, 200);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const faqs = [
    { q: 'How long does a Transfer of Equity take to register with HM Land Registry?', a: 'Preparing and drafting the TR1 transfer deed takes 3 to 5 working days. Once signed and submitted electronically to HM Land Registry, the official processing time can range from 2 weeks to several months depending on their current application queues. We track your application status to ensure swift registration.' },
    { q: 'Do I need a solicitor to change or update a name on my property deeds?', a: 'While you can file applications independently, using a regulated practitioner ensures forms (like the AP1) are filled legally and comply with strict anti-fraud checks. We manage the entire process for name changes due to marriage, divorce, or deed poll.' },
    { q: 'What is the process to remove a deceased joint owner from land registry deeds?', a: 'To remove a deceased owner, a surviving proprietor must file a Deceased Joint Proprietor application (Form DJP) supported by a certified copy of the Death Certificate or Grant of Probate. This updates the register under survivorship rules, ensuring legal records remain accurate.' },
    { q: 'Can I transfer property deeds if there is an active mortgage on the property?', a: 'Yes, transferring equity on a mortgaged property requires the written consent of the mortgage lender. Our partner conveyancers handle the lender liaison, submitting the necessary documentation to ensure the mortgage terms are successfully updated alongside the property title transfer.' },
    { q: 'How do I clear an outdated restriction or charge from my property deeds?', a: 'Outdated restrictions or charges (such as a paid-off private loan or tenant-in-common restriction) are removed by filing Form RX3 or RX4 with HM Land Registry. This requires official supporting evidence of release or cancellation. Our team reviews your documents to ensure a successful removal.' }
  ];


  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Landregistrytransfers.com",
    "url": "https://landregistrytransfers.com",
    "telephone": "+443335770077",
    "address": { "@type": "PostalAddress", "streetAddress": "1 Limbrick", "addressLocality": "Blackburn", "postalCode": "BB1 8AB", "addressCountry": "GB" },
    "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "17:00" }
  };

  return (
    <>
      <SEO title="Landregistrytransfers.com | Fixed-Fee Property Deed Transfers" description="Professional fixed-fee conveyancing for Transfer of Equity, Name Changes, Restrictions, and First Registrations. VAT included." schemaJson={businessSchema} />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid-pattern" />
        <div className="container hero-content">
          <div>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot">✦</span>
              <span className={`eyebrow-text-rotator ${fadeState}`}>
                {eyebrowTexts[eyebrowIdx]}
              </span>
            </div>

            <h1>
              Property Deed Transfers<br />
              <span className="gradient-text">Made Simple</span>
            </h1>

            <p className="hero-description">
              Expert title deed changes and land registry applications. Fast, transparent pricing with direct access to qualified conveyancers.
            </p>

            <div className="hero-actions">
              <a href="#services" className="btn-primary">
                View Services <ArrowRight size={16} />
              </a>
              {import.meta.env.VITE_CALENDLY_URL ? (
                <button
                  type="button"
                  onClick={() => {
                    if (window.Calendly) {
                      window.Calendly.initPopupWidget({ url: import.meta.env.VITE_CALENDLY_URL });
                    } else {
                      window.open(import.meta.env.VITE_CALENDLY_URL, '_blank');
                    }
                  }}
                  className="btn-secondary"
                  style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                >
                  Book a Call
                </button>
              ) : (
                <a href="#main-enquiry-form" className="btn-secondary">
                  Get a Quote
                </a>
              )}
            </div>

            <div className="hero-social-proof">
              <div className="hero-avatars" style={{ display: 'flex', alignItems: 'center' }}>
                {reviews.map((rev, rIdx) => (
                  <img
                    key={rIdx}
                    src={rev.image}
                    alt={rev.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: rIdx === reviewIdx ? '2px solid var(--text-accent)' : '2px solid white',
                      marginLeft: rIdx > 0 ? '-14px' : '0',
                      transition: 'all 0.3s ease',
                      transform: rIdx === reviewIdx ? 'scale(1.15)' : 'scale(1)',
                      zIndex: rIdx === reviewIdx ? '5' : '1',
                      objectFit: 'cover'
                    }}
                  />
                ))}
              </div>
              <div className="hero-social-text" style={{ minHeight: '56px' }}>
                <div className="hero-stars" style={{ display: 'flex', gap: '2px', color: '#fbbf24', marginBottom: '4px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                </div>
                <div className={`review-text-rotator ${reviewFade}`} style={{ fontSize: '15px', lineHeight: '1.4' }}>
                  <strong>{reviews[reviewIdx].name}</strong> — "{reviews[reviewIdx].text}"
                </div>
              </div>
            </div>
          </div>

          <div>
            <EnquiryForm isPhoneMockup={true} />
          </div>
        </div>
      </section>



      {/* ── MARQUEE RUNNING TEXT ── */}
      <div className="marquee-banner">
        <div className="marquee-content">
          {[...Array(3)].map((_, idx) => (
            <React.Fragment key={idx}>
              <div className="marquee-item"><span>✦</span> FIXED VAT-INCLUSIVE FEES</div>
              <div className="marquee-item"><span>✦</span> DRAFTED IN 3–5 WORKING DAYS</div>
              <div className="marquee-item"><span>✦</span> DIRECT ACCESS TO SPECIALISTS</div>
              <div className="marquee-item"><span>✦</span> HM LAND REGISTRY ELECTRONIC SUBMISSIONS</div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── SERVICES — Mobile: sticky stack, Desktop: grid ── */}

      {/* Mobile sticky stack (hidden on desktop via CSS) */}
      <section className="section section-gray section-services-mobile-only" id="services">
        <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <ServiceStackSection services={services} />
        </div>
      </section>

      {/* Desktop grid (hidden on mobile via CSS) */}
      <section className="section section-gray section-services-desktop-only" id="services-desktop" ref={servicesSectionRef}>
        {/* Decorative elements to match screenshot */}
        <div className="services-deco-arrow">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15,80 Q45,25 75,40 T35,70 Q25,60 85,25" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M75,22 L86,24 L82,35" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        <div className="services-deco-paperclip">
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        </div>
        
        <div className="services-deco-cardboard">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="#c49a6c" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,0 L0,0 L12,10 L8,14 L28,24 L22,28 L48,38 L42,42 L68,54 L62,58 L100,90 Z" />
            {/* inner shredded paper look */}
            <path d="M100,0 L8,0 L15,6 L12,9 L30,19 L25,23 L50,33 L45,37 L70,49 L65,53 L100,85 Z" fill="#b08557" opacity="0.6" />
          </svg>
        </div>

        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Services</span>
            <h2 className="section-title">Property Deed &amp; Land Registry Services</h2>
            <p className="section-desc">Direct, fixed pricing on all common HM Land Registry deed alterations, ownership transfers, and official restrictions.</p>
          </div>
          <div className="services-grid">
            {services.map((s, idx) => (
              <div 
                key={s.id} 
                onClick={() => {
                  if (import.meta.env.VITE_CALENDLY_URL && window.Calendly) {
                    window.Calendly.initPopupWidget({ url: import.meta.env.VITE_CALENDLY_URL });
                  } else {
                    window.location.href = `/services/${s.id}`;
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="service-card service-card-visible">
                  <div className="service-card-left">
                    <h3 className="service-card-name">{s.title}</h3>
                    <p className="service-card-desc">{s.desc}</p>
                    <span className="service-card-cta">
                      Book a consultation <ArrowRight size={13} />
                    </span>
                  </div>
                  <div className="service-card-right">
                    <span className="card-index" style={{ top: 16, right: 16 }}>{(idx + 1).toString().padStart(2, '0')}</span>
                    <img src={s.gif} alt={s.title} className="service-card-gif" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* ── FAQ ── */}
      <section className="section section-gray" id="faq">
        <div className="container faq-section-grid">
          
          {/* Left Column: Eyebrow, Title & Sticky Help Card */}
          <div className="faq-section-left">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">Deed Transfer &amp; Conveyancing FAQs</h2>
            <p className="section-desc">
              Clear answers to your property registry, ownership transfers, and official document queries.
            </p>
            
            <div className="faq-help-card">
              <div className="help-card-glow" />
              <div className="help-card-mesh" />
              <div className="help-card-content">
                <h4>Still have questions?</h4>
                <p>Speak directly to an experienced conveyancing specialist today.</p>
                <a href="#main-enquiry-form" className="help-card-btn">
                  Get a Free Consultation <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Next-Level Accordion List */}
          <div className="faq-section-right">
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`}>
                  <button className="faq-trigger" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <span className="faq-icon"><ChevronDown size={15} /></span>
                  </button>
                  <div className="faq-answer-wrapper">
                    <div className="faq-answer-inner">
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
