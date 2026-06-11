import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, CheckCircle, FileText, Loader2, Sparkles } from 'lucide-react';
import { saveEnquiry } from '../db/supabase';

const DOCUMENT_SERVICES = [
  {
    id: 'title-register',
    title: 'Title Register',
    price: '£45',
    desc: 'Official record of ownership, charges, and restrictions',
  },
  {
    id: 'title-plan',
    title: 'Title Plan',
    price: '£45',
    desc: 'Plan showing the general extent of the registered title',
  },
  {
    id: 'map-search',
    title: 'Map search',
    price: '£65',
    desc: 'Explore titles geographically before you apply',
  },
  {
    id: 'deed-search',
    title: 'Deed search',
    price: '£75',
    desc: 'General filed deed and optional flood risk for your property',
  },
  {
    id: 'leasehold-register',
    title: 'Leasehold Register & Plan',
    price: '£55',
    desc: 'Official lease terms, freeholder details and charges',
  },
  {
    id: 'ownership-history',
    title: 'Property History Search',
    price: '£95',
    desc: 'Trace historic ownership deeds and transfer records',
  }
];

export default function DocumentAccessSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  
  // Form fields
  const [postcode, setPostcode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const dropdownRef = useRef(null);

  const getPriceSplit = () => {
    if (!selectedDoc) return { documentFee: 0, searchProcessingFee: 0, vat: 0, total: 0 };
    const totalVal = parseFloat(selectedDoc.price.replace('£', ''));
    const docFeeVal = 7.00;
    const taxableVal = totalVal - docFeeVal;
    const vatVal = taxableVal * 1 / 6;
    const searchProcessingFeeVal = taxableVal * 5 / 6;
    return {
      documentFee: docFeeVal,
      searchProcessingFee: searchProcessingFeeVal,
      vat: vatVal,
      total: totalVal
    };
  };

  const { documentFee, searchProcessingFee, vat, total } = getPriceSplit();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectService = (doc) => {
    setSelectedDoc(doc);
    setIsOpen(false);
    setSuccess(false); // Reset success state if switching docs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoc) return;
    setLoading(true);

    const enquiryPayload = {
      name,
      email,
      phone,
      service: `Document Order: ${selectedDoc.title}`,
      notes: `Order for ${selectedDoc.title} (${selectedDoc.price}).\nAddress: ${houseNumber}, Postcode: ${postcode}`
    };

    const res = await saveEnquiry(enquiryPayload);
    setLoading(false);
    
    if (res.success) {
      setSuccess(true);
      // Clear form
      setPostcode('');
      setHouseNumber('');
      setName('');
      setEmail('');
      setPhone('');
    }
  };

  return (
    <section className="section doc-access-section" id="document-access">
      <div className="container doc-access-container">
        
        {/* Left Side: Copy, Dropdown & Inline Form */}
        <div className="doc-access-left">
          <h2 className="doc-access-title">Individual document access</h2>
          <p className="doc-access-desc">
            Need official extracts or searches? Order the register, plan, or map-led lookup below—or ask us about deeds, ownership checks, and alerts.
          </p>
          
          <p className="doc-access-instruction">
            Hover or tab into the menu below to choose a service.
          </p>
          
          {/* Custom Dropdown */}
          <div className="doc-dropdown-wrapper" ref={dropdownRef}>
            <button 
              type="button"
              className={`doc-trigger ${isOpen ? 'active' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsOpen(true)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <span>{selectedDoc ? selectedDoc.title : 'Property & document services'}</span>
              <ChevronDown size={18} className={`doc-trigger-chevron ${isOpen ? 'rotated' : ''}`} />
            </button>
            
            {isOpen && (
              <div 
                className="doc-menu" 
                role="listbox"
                onMouseLeave={() => setIsOpen(false)}
              >
                {DOCUMENT_SERVICES.map((doc) => (
                  <div
                    key={doc.id}
                    className={`doc-item ${selectedDoc?.id === doc.id ? 'selected' : ''}`}
                    role="option"
                    aria-selected={selectedDoc?.id === doc.id}
                    onClick={() => handleSelectService(doc)}
                  >
                    <div className="doc-item-content">
                      <span className="doc-item-title">{doc.title}</span>
                      <span className="doc-item-desc">{doc.desc}</span>
                    </div>
                    <div className="doc-item-action">
                      <span className="doc-item-price">{doc.price}</span>
                      <ArrowRight size={16} className="doc-item-arrow" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Order Details & Inline Form (displays only if a doc is selected) */}
          {selectedDoc && (
            <div className="doc-order-card">
              {success ? (
                <div className="doc-order-success">
                  <CheckCircle size={40} className="doc-success-icon" />
                  <h3>Order Request Received!</h3>
                  <p>
                    We will retrieve the official <strong>{selectedDoc.title}</strong> and email the PDF files directly to you once verified.
                  </p>
                  <button 
                    type="button" 
                    className="btn-reset-order"
                    onClick={() => setSelectedDoc(null)}
                  >
                    Order Another Document
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="doc-order-form">
                  <div className="doc-order-header">
                    <div className="doc-header-info">
                      <span className="doc-badge">Selected Document</span>
                      <h3>{selectedDoc.title}</h3>
                    </div>
                    <div className="doc-header-price">
                      <span className="price-tag">{selectedDoc.price}</span>
                      <span className="vat-hint">incl. VAT</span>
                    </div>
                  </div>
                  
                  <div className="doc-form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="doc-postcode">Postcode</label>
                      <input 
                        id="doc-postcode"
                        type="text" 
                        required 
                        className="form-input" 
                        placeholder="e.g. EC1V 2NX" 
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label" htmlFor="doc-number">House Number or Name</label>
                      <input 
                        id="doc-number"
                        type="text" 
                        required 
                        className="form-input" 
                        placeholder="e.g. Flat 4 or 128" 
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                      />
                    </div>
                    
                    <div className="form-group full-width">
                      <label className="form-label" htmlFor="doc-name">Your Full Name</label>
                      <input 
                        id="doc-name"
                        type="text" 
                        required 
                        className="form-input" 
                        placeholder="e.g. John Smith" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label" htmlFor="doc-email">Email Address</label>
                      <input 
                        id="doc-email"
                        type="email" 
                        required 
                        className="form-input" 
                        placeholder="e.g. john@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label" htmlFor="doc-phone">Phone Number</label>
                      <input 
                        id="doc-phone"
                        type="tel" 
                        required 
                        className="form-input" 
                        placeholder="e.g. 07123 456789" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Price Split Breakdown */}
                  <div className="price-split-breakdown" style={{ 
                    marginTop: '20px', 
                    padding: '16px', 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-default)', 
                    fontSize: '13px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                      <span>Document Fee (from gov.uk):</span>
                      <span style={{ fontWeight: 600 }}>£{documentFee.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                      <span>Search &amp; Processing Fee:</span>
                      <span style={{ fontWeight: 600 }}>£{searchProcessingFee.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                      <span>VAT (20%):</span>
                      <span style={{ fontWeight: 600 }}>£{vat.toFixed(2)}</span>
                    </div>
                    <div style={{ height: '1px', backgroundColor: 'var(--border-default)', margin: '12px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>
                      <span>Total Price (incl. VAT):</span>
                      <span>£{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Required Cancellation Waiver Checkbox */}
                  <div className="compliance-checkbox-group" style={{ marginTop: '16px', marginBottom: '16px' }}>
                    <label style={{ display: 'flex', gap: '10px', cursor: 'pointer', alignItems: 'flex-start' }}>
                      <input 
                        type="checkbox" 
                        required 
                        style={{ marginTop: '3px', accentColor: 'var(--blue-600)' }}
                      />
                      <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        I agree to waive my 14-day cancellation right to allow Swift Task Services Ltd to start the search and document retrieval immediately. I understand that the search and processing fee is non-refundable once started.
                      </span>
                    </label>
                  </div>
                  
                  <button type="submit" disabled={loading} className="btn-order-submit">
                    {loading ? (
                      <>
                        <Loader2 size={16} className="spinner" />
                        Processing Order...
                      </>
                    ) : (
                      <>
                        Request Document Access <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
          
        </div>
        
        {/* Right Side: Slogan / Banner card */}
        <div className="doc-access-right">
          <div className="doc-banner-card">
            <div className="doc-banner-gradient-overlay" />
            <div className="doc-banner-mesh" />
            
            <div className="doc-banner-content">
              <div className="doc-icon-frame">
                <FileText size={36} className="doc-banner-icon" />
                <Sparkles size={16} className="doc-banner-spark" />
              </div>
              <h3 className="doc-banner-slogan">
                OFFICIAL DOCUMENTS, DELIVERED WITH CLEAR NEXT STEPS
              </h3>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
