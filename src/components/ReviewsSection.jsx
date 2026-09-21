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

  const track1Items = buildMarqueeSet(reviewsList, 6);

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
        
        {/* Compact Section Header */}
        <div className="section-header text-center" style={{ maxWidth: '600px', marginInline: 'auto' }}>
          <h2 className="section-title" style={{ fontSize: '20px', margin: '0 0 8px 0' }}>
            Trusted by UK Homeowners
          </h2>
          <div className="reviews-stars-row" style={{ justifyContent: 'center', marginBottom: '12px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#C7A25A" color="#C7A25A" />
            ))}
            <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '8px' }}>4.9/5 based on 1,280+ transfers</span>
          </div>
        </div>
      </div>

      {/* Reviews Animation Showcase - Moved outside container for full width */}
      <div className="reviews-marquee-stage" style={{ marginTop: '0', padding: '0' }}>
        <div className="reviews-marquee-container">
          {/* Single Row: Animates to the Right */}
          <div className="reviews-marquee-row" tabIndex={0} aria-label="Reviews animation row">
            <div className="reviews-marquee-track reviews-track-right">
              {track1Items.map((rev, idx) => (
                <ReviewCardItem key={`${rev.id}-r1-${idx}`} rev={rev} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
