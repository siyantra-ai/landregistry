import React, { useState } from 'react';
import { Star, CheckCircle, ShieldCheck, MapPin, ArrowRight, Award, Lock, ThumbsUp, MessageSquare } from 'lucide-react';
import { REVIEWS, REVIEW_CATEGORIES } from '../data/reviews';

export default function ReviewsSection({ initialFilter = 'all', showCategories = true, calendlyUrl }) {
  const [activeCategory, setActiveCategory] = useState(initialFilter);

  const filteredReviews = activeCategory === 'all'
    ? REVIEWS
    : REVIEWS.filter(r => r.serviceId === activeCategory);

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

        {/* Category Filter Tabs (Scrollable on Mobile) */}
        {showCategories && (
          <div className="reviews-filter-container">
            <div className="reviews-filter-tabs">
              {REVIEW_CATEGORIES.map(cat => {
                const count = cat.id === 'all' 
                  ? REVIEWS.length 
                  : REVIEWS.filter(r => r.serviceId === cat.id).length;
                
                // Hide category pill if it has 0 items
                if (count === 0 && cat.id !== 'all') return null;

                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`reviews-filter-tab ${isActive ? 'active' : ''}`}
                  >
                    <span>{cat.label}</span>
                    <span className="reviews-filter-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="review-card">
              
              {/* Card Header: Rating, Badge, Date */}
              <div className="review-card-top">
                <div className="review-card-stars">
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
                <span>{rev.serviceName}</span>
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
                        // Fallback to initials if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
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
          ))}
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
