import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

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
  'removal-of-restriction': [
    'Restriction assessment included',
    'RX3 / RX4 form preparation',
    'Outdated charge or caveat cleared',
  ],
  'transfer-of-equity-wills-probate': [
    'Probate grant review',
    'Assent or transfer deed drafted',
    'Estate administration support',
  ],
  'applying-for-restriction': [
    'RX1 restriction application',
    'Protects trust / joint ownership',
    'Prevents unauthorised sale',
  ],
  'first-registration': [
    'Historic deeds reviewed & verified',
    'Form FR1 filed electronically',
    'Official title register created',
  ],
};

export default function ServiceStackSection({ services }) {
  const outerRef   = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile,  setIsMobile]  = useState(false);
  const [viewportH, setViewportH] = useState(700);

  const SCROLL_PER_CARD = 420;
  const TOTAL_SCROLL    = SCROLL_PER_CARD * (services.length - 1);

  useEffect(() => {
    const update = () => {
      setViewportH(window.innerHeight);
      setIsMobile(window.innerWidth <= 767);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const outer = outerRef.current;
    if (!outer) return;

    const onScroll = () => {
      const outerTop     = outer.getBoundingClientRect().top + window.scrollY;
      const scrolledInto = Math.max(0, window.scrollY - outerTop);
      const idx          = Math.min(
        Math.floor(scrolledInto / SCROLL_PER_CARD),
        services.length - 1
      );
      setActiveIdx(idx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile, services.length]);

  if (!isMobile) return null;

  const getCardTransform = (idx) => {
    const isCurrent = idx === activeIdx;
    const isStacked = idx < activeIdx;
    const isPending = idx > activeIdx;

    if (isPending) {
      return {
        opacity: 0,
        transform: 'translateY(110%) scale(0.92)',
        transition: 'opacity 0.46s cubic-bezier(0.22,1,0.36,1), transform 0.46s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none',
        zIndex: idx + 2,
      };
    }
    if (isStacked && !isCurrent) {
      const depth  = activeIdx - idx;
      const offset = depth * 9;
      const scale  = 1 - depth * 0.028;
      const op     = Math.max(0.2, 1 - depth * 0.25);
      return {
        opacity: op,
        transform: `translateY(${offset}px) scale(${scale})`,
        transition: 'opacity 0.46s cubic-bezier(0.22,1,0.36,1), transform 0.46s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none',
        zIndex: idx + 2,
      };
    }
    return {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
      transition: 'opacity 0.46s cubic-bezier(0.22,1,0.36,1), transform 0.46s cubic-bezier(0.22,1,0.36,1)',
      pointerEvents: 'auto',
      zIndex: idx + 2,
    };
  };

  const outerHeight = TOTAL_SCROLL + viewportH;

  return (
    <div
      ref={outerRef}
      className="service-stack-outer"
      style={{ height: outerHeight }}
    >
      <div className="service-stack-sticky">

        {/* header */}
        <div className="service-stack-header">
          <span className="section-eyebrow">Our Services</span>
          <h2 className="section-title" style={{ fontSize: '21px', marginTop: 7, lineHeight: 1.2 }}>
            Property Deed &amp; Land Registry Services
          </h2>
          <div className="service-stack-pips">
            {services.map((_, i) => (
              <div key={i} className={`service-stack-pip${i <= activeIdx ? ' active' : ''}`} />
            ))}
          </div>
        </div>

        {/* arena */}
        <div className="service-stack-arena">
          {services.map((s, idx) => {
            const bullets = SERVICE_DETAILS[s.id] || [];
            return (
              <div
                key={s.id}
                onClick={() => {
                  if (import.meta.env.VITE_CALENDLY_URL && window.Calendly) {
                    window.Calendly.initPopupWidget({ url: import.meta.env.VITE_CALENDLY_URL });
                  } else {
                    window.location.href = `/services/${s.id}`;
                  }
                }}
                className="service-stack-card-link"
                style={{ textDecoration: 'none', cursor: 'pointer', ...getCardTransform(idx) }}
              >
                <div className="ssc-card">

                  {/* ── TOP: gradient hero with GIF + title ── */}
                  <div className="ssc-hero">
                    {/* decorative blobs */}
                    <div className="ssc-blob ssc-blob-1" />
                    <div className="ssc-blob ssc-blob-2" />

                    {/* counter pill */}
                    <span className="ssc-counter">
                      {(idx + 1).toString().padStart(2, '0')} / {services.length.toString().padStart(2, '0')}
                    </span>

                    {/* GIF */}
                    <img src={s.gif} alt={s.title} className="ssc-gif" />

                    {/* service title inside hero */}
                    <h3 className="ssc-hero-title">{s.title}</h3>
                  </div>

                  {/* ── BOTTOM: description + bullets + price + CTA ── */}
                  <div className="ssc-body">

                    <p className="ssc-desc">{s.desc}</p>

                    {bullets.length > 0 && (
                      <ul className="ssc-bullets">
                        {bullets.map((b, bi) => (
                          <li key={bi} className="ssc-bullet">
                            <CheckCircle size={13} className="ssc-bullet-icon" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="ssc-footer">
                      <div className="ssc-price-row">
                        <span className="ssc-price">{s.price}</span>
                        <span className="ssc-vat">incl. VAT · fixed fee</span>
                      </div>
                      <span className="ssc-cta-btn">
                        Book now <ArrowRight size={14} />
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* bottom hints */}
        {activeIdx === 0 && (
          <div className="service-stack-scroll-hint">
            <div className="scroll-hint-line" />
            <span>Scroll to explore services</span>
            <div className="scroll-hint-line" />
          </div>
        )}
        {activeIdx === services.length - 1 && (
          <div className="service-stack-done-hint">
            <span>Keep scrolling to continue ↓</span>
          </div>
        )}
      </div>
    </div>
  );
}
