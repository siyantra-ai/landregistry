import React from 'react';
import { 
  Star, 
  CheckCircle, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Award, 
  Lock, 
  MessageSquare 
} from 'lucide-react';
import { REVIEWS } from '../data/reviews';

function ReviewCardItem({ rev }) {
  return (
    <div className="review-card">
      {/* Card Header: Rating, Badge, Date */}
      <div className="review-card-top">
        <div className="review-card-stars" aria-label={`${rev.rating} out of 5 stars`}>
          {[...Array(rev.rating)].map((_, i) => (
            <Star key={i} size={15} fill="#C7A25A" color="#C7A25A" />
          ))}
        </div>
        <div className="review-verified-tag">
          <CheckCircle size={13} />
          <span>Verified Transfer</span>
        </div>
      </div>

      {/* Service Pill Badge */}
      <div className="review-service-pill">
        <span className="review-service-name">{rev.serviceName}</span>
        <span className="review-price-tag">{rev.servicePrice} Fixed Fee</span>
      </div>

      {/* Review Headline */}
      <h3 className="review-card-title">
        "{rev.title}"
      </h3>

      {/* Review Body */}
      <p className="review-card-body">
        {rev.body}
      </p>

      {/* Card Footer: User details */}
      <div className="review-card-footer">
        <div className="review-author-avatar">
          {rev.avatar ? (
            <img
              src={rev.avatar}
              alt={rev.name}
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = 'flex';
                }
              }}
            />
          ) : null}
          <div className="review-avatar-fallback" style={{ display: rev.avatar ? 'none' : 'flex' }}>
            {rev.initials}
          </div>
        </div>

        <div className="review-author-info">
          <div className="review-author-name">{rev.name}</div>
          <div className="review-author-location">
            <MapPin size={13} className="location-icon" />
            <span>{rev.location}</span>
          </div>
        </div>

        <div className="review-date-stamp">
          {rev.date.replace('Verified Client • ', '')}
        </div>
      </div>
    </div>
  );
}

// Utility to build a seamless marquee loop
function buildMarqueeSet(items, minCount = 6) {
  if (!items || items.length === 0) return [];
  let base = [...items];
  while (base.length < minCount) {
    base = [...base, ...items];
  }
  // Duplicate base exactly once for seamless 0% -> -50% loop
  return [...base, ...base];
}

export default function ReviewsSection({ initialFilter = 'all', calendlyUrl }) {
  const reviewsList = (initialFilter && initialFilter !== 'all')
    ? (REVIEWS.filter(r => r.serviceId === initialFilter).length > 0
        ? REVIEWS.filter(r => r.serviceId === initialFilter)
        : REVIEWS)
    : REVIEWS;

  let row1Reviews = [];
  let row2Reviews = [];

  if (reviewsList.length <= 1) {
    row1Reviews = reviewsList;
    row2Reviews = reviewsList;
  } else {
    row1Reviews = reviewsList.filter((_, i) => i % 2 === 0);
    row2Reviews = reviewsList.filter((_, i) => i % 2 !== 0);
    if (row2Reviews.length === 0) {
      row2Reviews = row1Reviews;
    }
  }

  const track1Items = buildMarqueeSet(row1Reviews, 6);
  const track2Items = buildMarqueeSet(row2Reviews, 6);

  const getCalendlyPrefill = () => {
    return {
      name: '',
      email: '',
      customAnswers: { a1: 'Website Client Review Section Consultation' }
    };
  };

  return (
    <section className="section section-gray reviews-section" id="reviews">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center" style={{ maxWidth: '820px', marginInline: 'auto' }}>
          <div className="reviews-eyebrow">
            <span className="reviews-eyebrow-icon">✦</span>
            <span>CLIENT REVIEWS &amp; VERIFIED FEEDBACK</span>
          </div>

          <h2 className="section-title" style={{ marginTop: '12px', marginBottom: '16px' }}>
            Trusted by UK Homeowners <span className="gradient-text">Across England &amp; Wales</span>
          </h2>

          <p className="section-desc" style={{ fontSize: '17px', color: 'var(--text-secondary)' }}>
            Real experiences from property owners who used our direct fixed-fee conveyancing services for title deed changes, ownership transfers, and Land Registry applications.
          </p>
        </div>

        {/* Rating & Trust Metrics Strip */}
        <div className="reviews-trust-strip">
          <div className="reviews-rating-box">
            <div className="reviews-rating-number">4.9</div>
            <div className="reviews-rating-details">
              <div className="reviews-stars-row" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#C7A25A" color="#C7A25A" />
                ))}
              </div>
              <span className="reviews-rating-count">Based on <strong>1,280+</strong> verified transfers</span>
            </div>
          </div>

          <div className="reviews-trust-divider" />

          <div className="reviews-trust-pillars">
            <div className="reviews-trust-pillar-item">
              <div className="pillar-icon"><ShieldCheck size={20} /></div>
              <div>
                <strong>Regulated Solicitors</strong>
                <span>Direct oversight by qualified legal specialists</span>
              </div>
            </div>

            <div className="reviews-trust-pillar-item">
              <div className="pillar-icon"><Award size={20} /></div>
              <div>
                <strong>100% Fixed-Fee Promise</strong>
                <span>VAT included, no hidden disbursements</span>
              </div>
            </div>

            <div className="reviews-trust-pillar-item">
              <div className="pillar-icon"><Lock size={20} /></div>
              <div>
                <strong>HM Land Registry Compliant</strong>
                <span>Direct digital portal lodgement &amp; tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Right Animation Showcase */}
        <div className="reviews-marquee-stage">
          {/* Smooth Edge Fades */}
          <div className="reviews-fade-edge reviews-fade-left" aria-hidden="true" />
          <div className="reviews-fade-edge reviews-fade-right" aria-hidden="true" />

          <div className="reviews-marquee-container">
            {/* Row 1: Animates to the Right */}
            <div className="reviews-marquee-row" tabIndex={0} aria-label="Reviews right animation row 1">
              <div className="reviews-marquee-track reviews-track-right">
                {track1Items.map((rev, idx) => (
                  <ReviewCardItem key={`${rev.id}-r1-${idx}`} rev={rev} />
                ))}
              </div>
            </div>

            {/* Row 2 (Down Row): Animates to the Left */}
            <div className="reviews-marquee-row" tabIndex={0} aria-label="Reviews left animation row 2">
              <div className="reviews-marquee-track reviews-track-left">
                {track2Items.map((rev, idx) => (
                  <ReviewCardItem key={`${rev.id}-r2-${idx}`} rev={rev} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Card */}
        <div className="reviews-bottom-cta">
          <div className="reviews-cta-content">
            <div className="reviews-cta-icon">
              <MessageSquare size={28} />
            </div>
            <div>
              <h4 className="reviews-cta-title">Need advice regarding your property deeds?</h4>
              <p className="reviews-cta-subtitle">
                Speak directly with an experienced conveyancing specialist today. Transparent advice and no-obligation fixed pricing.
              </p>
            </div>
          </div>
          <div className="reviews-cta-actions">
            <button
              type="button"
              onClick={() => {
                if (calendlyUrl && window.Calendly) {
                  window.Calendly.initPopupWidget({
                    url: calendlyUrl,
                    prefill: getCalendlyPrefill()
                  });
                } else if (calendlyUrl) {
                  window.open(calendlyUrl, '_blank');
                } else {
                  const enquiryForm = document.getElementById('main-enquiry-form');
                  if (enquiryForm) {
                    enquiryForm.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/contact';
                  }
                }
              }}
              className="btn-mega-cta"
              style={{ fontSize: '15px', padding: '14px 28px' }}
            >
              Book a Free Call <ArrowRight size={16} style={{ marginLeft: '6px' }} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
