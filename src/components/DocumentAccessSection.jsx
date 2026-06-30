import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DOCUMENT_SERVICES = [
  {
    id: 'title-register',
    title: 'Title Register',
    desc: 'Proof of ownership and registered charges.',
    cta: 'Get the document',
  },
  {
    id: 'title-plan',
    title: 'Title Plan',
    desc: 'Official map showing boundaries.',
    cta: 'Get the document',
  },
  {
    id: 'map-search',
    title: 'Map Search',
    desc: 'Identify property titles from map coordinates.',
    cta: 'Get the document',
  },
  {
    id: 'deed-search',
    title: 'Deed Search',
    desc: 'Retrieve historical deeds and documents.',
    cta: 'Get the document',
  },
  {
    id: 'property-ownership',
    title: 'Property Ownership',
    desc: 'Check who currently owns any UK property.',
    cta: 'Get the document',
  },
  {
    id: 'property-alert',
    title: "Land Registry's Property Alert",
    desc: 'Monitor and protect property against fraud.',
    cta: 'Setup Alerts',
  }
];

export default function DocumentAccessSection() {
  const navigate = useNavigate();

  const handleSelectService = (id) => {
    navigate(`/apply/${id}`);
  };

  return (
    <section className="doc-access-redesign-section" id="document-access">
      <div className="doc-access-redesign-grid">
        
        {/* Left Column: Clean List of Document Links */}
        <div className="doc-access-redesign-left">
          <div className="doc-access-content-wrapper">
            <h2 className="doc-access-redesign-title">
              Individual Documents Access
            </h2>
            <p className="doc-access-redesign-subtitle">
              Need individual documents?
            </p>
            
            <div className="doc-access-links-list">
              {DOCUMENT_SERVICES.map((doc) => (
                <div 
                  key={doc.id}
                  className="doc-access-link-block"
                  onClick={() => handleSelectService(doc.id)}
                >
                  <span className="doc-access-item-name">{doc.title}</span>
                  <p className="doc-access-item-desc">{doc.desc}</p>
                  <span className="doc-access-item-cta">
                    {doc.cta} <ArrowRight size={14} className="cta-arrow" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Full-Height Image matching user screenshot */}
        <div className="doc-access-redesign-right" style={{ position: 'relative', overflow: 'hidden' }}>
          <img 
            src="https://cdn.prod.website-files.com/5e987a7cdcd036149c98cfbf/66490176857b770d060aa6b2_official-copy-register-title__1_.png" 
            alt="Official Land Registry copy register title document" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '360px' }}
          />
          <div className="doc-access-image-overlay" />
        </div>

      </div>
    </section>
  );
}
