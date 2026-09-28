import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '../data/reviews';

function ReviewCardItem({ rev }) {
  return (
    <div className="review-card">
      <p className="review-card-body">“{rev.body}”</p>
      <p className="review-author-name">{rev.name}</p>
    </div>
  );
}

function buildReviewPages(reviews) {
  const pages = [];
  for (let start = 0; start < reviews.length; start += 2) {
    pages.push(reviews.slice(start, start + 2));
  }
  return pages;
}

export default function ReviewsSection({ initialFilter = 'all' }) {
  const reviewsList = (initialFilter && initialFilter !== 'all')
    ? (REVIEWS.filter(r => r.serviceId === initialFilter).length > 0
        ? REVIEWS.filter(r => r.serviceId === initialFilter)
        : REVIEWS)
    : REVIEWS;
  const reviewPages = buildReviewPages(reviewsList);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (reviewPages.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActivePage(currentPage => (currentPage + 1) % reviewPages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [reviewPages.length]);

  const showPreviousPage = () => {
    setActivePage(currentPage => (currentPage - 1 + reviewPages.length) % reviewPages.length);
  };

  const showNextPage = () => {
    setActivePage(currentPage => (currentPage + 1) % reviewPages.length);
  };

  return (
    <section className="section section-gray reviews-section" id="reviews">
      <div className="container">
        <div className="section-header reviews-heading">
          <h2 className="section-title">What Our Customers Say</h2>
        </div>
        <div className="reviews-grid" key={activePage}>
          {(reviewPages[activePage] || []).map(rev => (
            <ReviewCardItem key={rev.id} rev={rev} />
          ))}
        </div>
        {reviewPages.length > 1 && (
          <div className="reviews-controls" aria-label="Review navigation">
            <button type="button" onClick={showPreviousPage} aria-label="Previous reviews">
              <ChevronLeft size={28} aria-hidden="true" />
            </button>
            <button type="button" onClick={showNextPage} aria-label="Next reviews">
              <ChevronRight size={28} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
