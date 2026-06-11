import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, FileText, Loader2, Lock, Clock, MapPin, User, Eye, ShieldCheck, Plus, Minus } from 'lucide-react';
import SEO from '../components/SEO';
import { saveEnquiry } from '../db/supabase';

/* ─────────────────────────────────────────────
   SERVICE CONFIGURATION
   ───────────────────────────────────────────── */
const DOC_SERVICES = {
  'title-register': {
    title: 'Land Registry Title Register',
    desc: 'Official record of ownership, charges, and restrictions for any property in England & Wales.',
    basePrice: 45,
    basePriceLabel: 'Title Register',
    addOns: [
      { id: 'title_plan', label: 'Include Title Plan', price: 30 },
      { id: 'flood_risk', label: 'Include Flood Risk Report', price: 12.50 },
    ],
    extraFields: [],
    timescales: { standard: 'Processed within 24 working hours', fast_track: 'Processed within 12 working hours' },
    fastTrackPrice: 10,
    printedCopyPrice: 7.50,
    smsUpdatesPrice: 4,
  },
  'title-plan': {
    title: 'Land Registry Title Plan',
    desc: 'Plan showing the general extent of the registered title boundary for any property.',
    basePrice: 45,
    basePriceLabel: 'Title Plan',
    addOns: [
      { id: 'title_register', label: 'Include Title Register', price: 30 },
      { id: 'flood_risk', label: 'Include Flood Risk Report', price: 12.50 },
    ],
    extraFields: [],
    timescales: { standard: 'Processed within 24 working hours', fast_track: 'Processed within 12 working hours' },
    fastTrackPrice: 10,
    printedCopyPrice: 7.50,
    smsUpdatesPrice: 4,
  },
  'map-search': {
    title: 'Land Registry Map Search',
    desc: 'Obtain a Title Register and Title Plan for any land or property without a known address.',
    basePrice: 65,
    basePriceLabel: 'Title Plan & Title Register (Map Search)',
    addOns: [
      { id: 'flood_risk', label: 'Include Flood Risk Report', price: 12.50 },
    ],
    extraFields: ['map_search'],
    timescales: { standard: 'Processed within 24 working hours', fast_track: 'Processed within 12 working hours' },
    fastTrackPrice: 10,
    printedCopyPrice: 7.50,
    smsUpdatesPrice: 4,
  },
  'deed-search': {
    title: 'Land Registry Deed Search',
    desc: 'Obtain a copy of conveyancing, transfer, charge, or lease deeds filed for any property.',
    basePrice: 75,
    basePriceLabel: 'General Filed Deed',
    addOns: [
      { id: 'flood_risk', label: 'Include Flood Risk Report', price: 12.50 },
    ],
    extraFields: ['deed_preference', 'reason_for_search'],
    timescales: { standard: 'Processed within 24 working hours', fast_track: 'Processed within 12 working hours' },
    fastTrackPrice: 10,
    printedCopyPrice: 15,
    smsUpdatesPrice: 4,
  },
  'property-ownership': {
    title: 'Property Ownership Search',
    desc: 'Combined Title Register and Title Plan showing full ownership details for any property.',
    basePrice: 55,
    basePriceLabel: 'Title Register & Title Plan',
    addOns: [
      { id: 'flood_risk', label: 'Include Flood Risk Report', price: 12.50 },
    ],
    extraFields: [],
    timescales: { standard: 'Processed within 24 working hours', fast_track: 'Processed within 12 working hours' },
    fastTrackPrice: 10,
    printedCopyPrice: 7.50,
    smsUpdatesPrice: 4,
  },
};

export default function DocApplyWizard() {
  const { serviceId } = useParams();

  // Redirect property-alert externally
  if (serviceId === 'property-alert') {
    window.location.href = 'https://propertyalert.landregistry.gov.uk/';
    return null;
  }

  const svc = DOC_SERVICES[serviceId];
  if (!svc) {
    return <Navigate to="/" replace />;
  }

  /* ── Step state ── */
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  /* ── Step 1: Property + Personal Details ── */
  const [numProperties, setNumProperties] = useState(1);
  const [properties, setProperties] = useState([makeBlankProperty()]);
  const [personalTitle, setPersonalTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [phone, setPhone] = useState('');

  // Map search extra fields
  const [reasonForSearch, setReasonForSearch] = useState('');
  const [reasonOther, setReasonOther] = useState('');

  /* ── Step 2: Finalize Order ── */
  const [appType, setAppType] = useState('');
  const [printedCopy, setPrintedCopy] = useState('');
  const [smsUpdates, setSmsUpdates] = useState('');
  // Postal address (if printed copy)
  const [postalLine1, setPostalLine1] = useState('');
  const [postalLine2, setPostalLine2] = useState('');
  const [postalCity, setPostalCity] = useState('');
  const [postalCounty, setPostalCounty] = useState('');
  const [postalPostcode, setPostalPostcode] = useState('');

  /* ── Step 3: T&C ── */
  const [termsAccepted, setTermsAccepted] = useState(false);

  /* ── Step 4: Submit ── */
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ── Helpers ── */
  function makeBlankProperty() {
    return {
      addOns: {},
      country: '',
      titleNumber: '',
      tenure: '',
      postcode: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      county: '',
      // Map search specifics
      latitude: '',
      longitude: '',
      locationDescription: '',
      locationLookup: '',
      // Deed search
      preferredDeed: '',
    };
  }

  function handleNumPropertiesChange(n) {
    const val = parseInt(n) || 1;
    setNumProperties(val);
    const updated = [...properties];
    while (updated.length < val) updated.push(makeBlankProperty());
    while (updated.length > val) updated.pop();
    setProperties(updated);
  }

  function updateProperty(idx, field, value) {
    const updated = [...properties];
    updated[idx] = { ...updated[idx], [field]: value };
    setProperties(updated);
  }

  function toggleAddOn(idx, addOnId) {
    const updated = [...properties];
    const current = updated[idx].addOns[addOnId] || false;
    updated[idx] = { ...updated[idx], addOns: { ...updated[idx].addOns, [addOnId]: !current } };
    setProperties(updated);
  }

  /* ── Price Calculation ── */
  function calculatePrices() {
    let subtotalExVat = 0;
    // Per-property base + add-ons
    for (const prop of properties) {
      subtotalExVat += svc.basePrice;
      for (const addOn of svc.addOns) {
        if (prop.addOns[addOn.id]) subtotalExVat += addOn.price;
      }
    }
    // Fast track
    if (appType === 'Fast Track') subtotalExVat += svc.fastTrackPrice * numProperties;
    // Printed copy
    if (printedCopy === 'yes') subtotalExVat += svc.printedCopyPrice * numProperties;
    // SMS
    if (smsUpdates === 'yes') subtotalExVat += svc.smsUpdatesPrice;

    const vat = subtotalExVat * 0.2;
    const documentFee = 7.00;
    const searchProcessingFee = (subtotalExVat + vat) - documentFee;
    const total = subtotalExVat + vat;

    return {
      subtotalExVat,
      vat,
      total,
      documentFee,
      searchProcessingFee,
      documentCount: numProperties * (1 + svc.addOns.filter((_, i) => properties.some(p => p.addOns[svc.addOns[i]?.id])).length),
    };
  }

  const prices = calculatePrices();

  /* ── Navigation ── */
  function nextStep(e) {
    if (e) e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  }

  /* ── Submit ── */
  async function handleSubmit() {
    if (!termsAccepted) return;
    setLoading(true);

    let notes = `Document Order: ${svc.title}\n`;
    notes += `Turnaround: ${appType || 'Standard'}\n`;
    notes += `Printed Copy: ${printedCopy === 'yes' ? 'Yes' : 'No'}\n`;
    notes += `SMS Updates: ${smsUpdates === 'yes' ? 'Yes' : 'No'}\n\n`;

    properties.forEach((prop, i) => {
      notes += `--- Property ${i + 1} ---\n`;
      notes += `Address: ${prop.addressLine1}, ${prop.addressLine2 ? prop.addressLine2 + ', ' : ''}${prop.city}, ${prop.county}, ${prop.postcode}\n`;
      notes += `Country: ${prop.country}, Tenure: ${prop.tenure}\n`;
      if (prop.titleNumber) notes += `Title Number: ${prop.titleNumber}\n`;
      if (prop.preferredDeed) notes += `Preferred Deed: ${prop.preferredDeed}\n`;
      if (prop.latitude) notes += `Lat/Lng: ${prop.latitude}, ${prop.longitude}\n`;
      if (prop.locationDescription) notes += `Location Description: ${prop.locationDescription}\n`;
      const activeAddOns = svc.addOns.filter(a => prop.addOns[a.id]).map(a => a.label).join(', ');
      if (activeAddOns) notes += `Add-ons: ${activeAddOns}\n`;
      notes += '\n';
    });

    if (reasonForSearch) notes += `Reason for Search: ${reasonForSearch}${reasonForSearch === 'Other' ? ' - ' + reasonOther : ''}\n`;
    if (printedCopy === 'yes') {
      notes += `\nPostal Address: ${postalLine1}, ${postalLine2 ? postalLine2 + ', ' : ''}${postalCity}, ${postalCounty}, ${postalPostcode}\n`;
    }
    notes += `\nPrice Breakdown:\n`;
    notes += `Document Fee: £${prices.documentFee.toFixed(2)}\n`;
    notes += `Search & Processing Fee: £${prices.searchProcessingFee.toFixed(2)}\n`;
    notes += `Total (incl. VAT): £${prices.total.toFixed(2)}\n`;

    const res = await saveEnquiry({
      name: `${personalTitle} ${firstName} ${middleName ? middleName + ' ' : ''}${surname}`.trim(),
      email,
      phone,
      service: `Document Order: ${svc.title}`,
      notes,
    });

    setLoading(false);
    if (res.success) {
      setSuccess(true);
      window.scrollTo(0, 0);
    }
  }

  /* ── Render: Success ── */
  if (success) {
    return (
      <div className="container" style={{ padding: '80px 24px', maxWidth: '720px', textAlign: 'center' }}>
        <SEO title={`Application Submitted — ${svc.title}`} description={`Your ${svc.title} application has been received.`} />
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid var(--border-default)', padding: '48px 32px', boxShadow: 'var(--shadow-lg)' }}>
          <CheckCircle size={64} style={{ color: 'var(--emerald-500)', margin: '0 auto 24px' }} />
          <h1 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '12px', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Application Received!</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
            Thank you. Your <strong>{svc.title}</strong> application has been submitted successfully. Our processing team will begin work on your order immediately.
          </p>
          <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: '10px', padding: '20px', marginBottom: '32px', textAlign: 'left' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--text-primary)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Clock size={16} style={{ color: 'var(--blue-600)' }} /> What Happens Next:
            </h4>
            <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Your documents will be retrieved from HM Land Registry records.</li>
              <li>PDF copies will be emailed directly to <strong>{email}</strong>.</li>
              {printedCopy === 'yes' && <li>A printed copy will be posted to your address.</li>}
              <li>If we need additional details, we'll contact you on <strong>{phone}</strong>.</li>
            </ul>
          </div>
          <Link to="/" className="btn-primary" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}>
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  /* ── Render: Main Wizard ── */
  const isMapSearch = svc.extraFields.includes('map_search');
  const isDeedSearch = svc.extraFields.includes('deed_preference');
  const hasReasonField = svc.extraFields.includes('reason_for_search');

  return (
    <>
      <SEO title={`Apply — ${svc.title}`} description={svc.desc} />

      <div className="container" style={{ padding: '48px 24px 100px', maxWidth: '780px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-accent)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Online Application</span>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '8px' }}>{svc.title}</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto' }}>{svc.desc}</p>
        </div>

        {/* Floating Price Bar */}
        <div className="dw-price-bar">
          <div className="dw-price-bar-inner">
            <span>{numProperties} {numProperties === 1 ? 'property' : 'properties'}</span>
            <span style={{ fontWeight: 700 }}>£{prices.subtotalExVat.toFixed(2)} + VAT</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="dw-progress-wrapper">
          <div className="dw-progress-track">
            <div className="dw-progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
          <div className="dw-progress-label">Step {step} of {totalSteps}</div>
        </div>

        {/* Wizard Card */}
        <div style={{ background: '#ffffff', border: '1.5px solid var(--border-default)', borderRadius: '16px', padding: 'clamp(24px, 4vw, 36px) clamp(20px, 3vw, 32px)', boxShadow: 'var(--shadow-md)' }}>

          {/* ═══════════ STEP 1 ═══════════ */}
          {step === 1 && (
            <form onSubmit={nextStep}>
              {/* Getting Started */}
              <div className="dw-section-card" style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', marginBottom: '28px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}><FileText size={18} /> Getting Started</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 12px' }}>Simply complete our online form below and we will take care of the rest. Once you have completed your application, your details will be processed immediately.</p>
                <ol style={{ paddingLeft: '18px', margin: 0, fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>Complete the form</li>
                  <li>Confirm your order</li>
                  <li>Receive your documents</li>
                </ol>
              </div>

              {/* Number of properties */}
              <div className="form-group">
                <label className="form-label" htmlFor="dw-num-props">How many properties would you like to search?</label>
                <select id="dw-num-props" required className="form-select" value={numProperties} onChange={e => handleNumPropertiesChange(e.target.value)}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {/* Per-property fields */}
              {properties.map((prop, idx) => (
                <div key={idx} className="dw-property-block">
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid var(--border-default)' }}>
                    Property {idx + 1}
                  </h4>

                  {/* Required Documents / Add-ons */}
                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', marginBottom: '10px' }}>Required Documents</p>

                    <div className="dw-addon-row dw-addon-row--active">
                      <span className="dw-addon-label">{svc.basePriceLabel}</span>
                      <span className="dw-addon-price">£{svc.basePrice.toFixed(2)}+vat</span>
                    </div>

                    {svc.addOns.map(addOn => (
                      <label key={addOn.id} className={`dw-addon-row ${prop.addOns[addOn.id] ? 'dw-addon-row--active' : ''}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input type="checkbox" checked={!!prop.addOns[addOn.id]} onChange={() => toggleAddOn(idx, addOn.id)} style={{ accentColor: 'var(--blue-600)' }} />
                          <span className="dw-addon-label">{addOn.label}</span>
                        </span>
                        <span className="dw-addon-price">£{addOn.price.toFixed(2)}+vat</span>
                      </label>
                    ))}
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '6px' }}>Documents are subject to availability.</p>
                  </div>

                  {/* Deed search: preferred deed */}
                  {isDeedSearch && (
                    <div className="form-group">
                      <label className="form-label">Preferred Deed</label>
                      <select required className="form-select" value={prop.preferredDeed} onChange={e => updateProperty(idx, 'preferredDeed', e.target.value)}>
                        <option value="" disabled>Select Preference</option>
                        <option value="The Most Relevant Filed Deed">The Most Relevant Filed Deed</option>
                        <option value="Conveyancing Deeds">Conveyancing Deeds</option>
                        <option value="Transfer Deeds">Transfer Deeds</option>
                        <option value="Charge Deeds">Charge Deeds</option>
                        <option value="Lease Deeds">Lease Deeds</option>
                      </select>
                    </div>
                  )}

                  {/* Country */}
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <select required className="form-select" value={prop.country} onChange={e => updateProperty(idx, 'country', e.target.value)}>
                      <option value="" disabled>Select Country</option>
                      <option value="England">England</option>
                      <option value="Wales">Wales</option>
                      <option value="Scotland">Scotland</option>
                      {serviceId !== 'deed-search' && <option value="Northern Ireland">Northern Ireland</option>}
                    </select>
                  </div>

                  {/* Title Number */}
                  {!isMapSearch && (
                    <div className="form-group">
                      <label className="form-label">Title Number <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>(If known)</span></label>
                      <input type="text" className="form-input" placeholder="e.g. LN123456" value={prop.titleNumber} onChange={e => updateProperty(idx, 'titleNumber', e.target.value)} />
                    </div>
                  )}

                  {/* Tenure */}
                  <div className="form-group">
                    <label className="form-label">Tenure</label>
                    <select required className="form-select" value={prop.tenure} onChange={e => updateProperty(idx, 'tenure', e.target.value)}>
                      <option value="" disabled>Select Tenure</option>
                      <option value="Freehold">Freehold</option>
                      <option value="Leasehold">Leasehold</option>
                      <option value="Unsure">Unsure</option>
                    </select>
                  </div>

                  {/* Map Search: location fields */}
                  {isMapSearch ? (
                    <>
                      <div className="form-group">
                        <label className="form-label">Enter the address, street, town, city or postcode</label>
                        <input type="text" required className="form-input" placeholder="e.g. 10 Downing Street, London" value={prop.locationLookup} onChange={e => updateProperty(idx, 'locationLookup', e.target.value)} />
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                        Please provide the latitude and longitude of the property or land. You can find coordinates using Google Maps (right-click → "What's here?").
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-label">Latitude</label>
                          <input type="text" required className="form-input" placeholder="e.g. 51.5034" value={prop.latitude} onChange={e => updateProperty(idx, 'latitude', e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Longitude</label>
                          <input type="text" required className="form-input" placeholder="e.g. -0.1276" value={prop.longitude} onChange={e => updateProperty(idx, 'longitude', e.target.value)} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Description of the location</label>
                        <textarea required className="form-input" rows={4} placeholder="Please provide as much information as possible to help us identify the land/property." value={prop.locationDescription} onChange={e => updateProperty(idx, 'locationDescription', e.target.value)} style={{ resize: 'vertical' }} />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Standard property address fields */}
                      <div style={{ background: 'rgba(47, 79, 70, 0.04)', border: '1px solid var(--border-default)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                        <strong>Tip:</strong> You can search for <strong>any property</strong> — you do not need to own the property.
                      </div>
                      <div className="form-group">
                        <label className="form-label">Property Postcode</label>
                        <input type="text" required className="form-input" placeholder="e.g. SW1A 1AA" value={prop.postcode} onChange={e => updateProperty(idx, 'postcode', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Property Address Line 1</label>
                        <input type="text" required className="form-input" placeholder="e.g. 10 Downing Street" value={prop.addressLine1} onChange={e => updateProperty(idx, 'addressLine1', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Property Address Line 2</label>
                        <input type="text" className="form-input" placeholder="(Optional)" value={prop.addressLine2} onChange={e => updateProperty(idx, 'addressLine2', e.target.value)} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-label">City</label>
                          <input type="text" required className="form-input" placeholder="e.g. London" value={prop.city} onChange={e => updateProperty(idx, 'city', e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">County</label>
                          <input type="text" required className="form-input" placeholder="e.g. Greater London" value={prop.county} onChange={e => updateProperty(idx, 'county', e.target.value)} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* Reason for search (map search & deed search) */}
              {(hasReasonField || isDeedSearch) && (
                <>
                  <div className="form-group">
                    <label className="form-label">What information are you looking for?</label>
                    <select required className="form-select" value={reasonForSearch} onChange={e => setReasonForSearch(e.target.value)}>
                      <option value="" disabled>Select Reason</option>
                      <option value="Ownership history">Ownership history</option>
                      <option value="Boundary information">Boundary information</option>
                      <option value="Transfer of ownership details">Transfer of ownership details</option>
                      <option value="Property description">Property description</option>
                      <option value="Charges on the property">Charges on the property</option>
                      <option value="Confirmation mortgage has been paid off">Confirmation mortgage has been paid off</option>
                      <option value="Check if my property is registered">Check if my property is registered</option>
                      <option value="Dispute with council over road or land">Dispute with council over road or land</option>
                      <option value="Tenancy/lease agreement">Tenancy/lease agreement</option>
                      <option value="Restrictions on property">Restrictions on property</option>
                      <option value="Proof of ownership">Proof of ownership</option>
                      <option value="Purchase price history">Purchase price history</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {reasonForSearch === 'Other' && (
                    <div className="form-group">
                      <label className="form-label">Please specify</label>
                      <input type="text" required className="form-input" value={reasonOther} onChange={e => setReasonOther(e.target.value)} />
                    </div>
                  )}
                </>
              )}

              {/* Personal Details */}
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '32px', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid var(--border-default)' }}>
                <User size={18} /> Personal Details
              </h3>

              <div className="form-group">
                <label className="form-label">Title</label>
                <select required className="form-select" value={personalTitle} onChange={e => setPersonalTitle(e.target.value)}>
                  <option value="" disabled>Select Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                  <option value="Mx">Mx</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" required className="form-input" placeholder="e.g. John" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Middle Name <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>(if applicable)</span></label>
                  <input type="text" className="form-input" value={middleName} onChange={e => setMiddleName(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Surname</label>
                <input type="text" required className="form-input" placeholder="e.g. Smith" value={surname} onChange={e => setSurname(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" required className="form-input" placeholder="e.g. john@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Email Address</label>
                <input type="email" required className="form-input" placeholder="Re-enter your email" value={emailConfirm} onChange={e => setEmailConfirm(e.target.value)} />
                {emailConfirm && email && emailConfirm !== email && (
                  <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>Email addresses do not match.</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Phone Number</label>
                <input type="tel" required className="form-input" placeholder="e.g. 07123 456789" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '28px' }}>
                <button type="submit" disabled={email !== emailConfirm} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', opacity: email === emailConfirm ? 1 : 0.5 }}>
                  Next <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}

          {/* ═══════════ STEP 2 ═══════════ */}
          {step === 2 && (
            <form onSubmit={nextStep}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <ShieldCheck size={18} /> Finalise Your Order
              </h3>

              {/* Turnaround */}
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Would you like your documents quicker?</label>
                <div className="dw-option-group">
                  <label className={`dw-option-row ${appType === 'Fast Track' ? 'dw-option-row--selected' : ''}`}>
                    <div>
                      <span className="dw-option-main">
                        <input type="radio" name="app_type" required value="Fast Track" checked={appType === 'Fast Track'} onChange={e => setAppType(e.target.value)} style={{ accentColor: 'var(--blue-600)' }} />
                        Yes, I would like to receive the documents faster
                      </span>
                      <span className="dw-option-sub">{svc.timescales.fast_track}</span>
                    </div>
                    <span className="dw-option-price">£{svc.fastTrackPrice.toFixed(2)}+vat</span>
                  </label>
                  <label className={`dw-option-row ${appType === 'Standard' ? 'dw-option-row--selected' : ''}`}>
                    <div>
                      <span className="dw-option-main">
                        <input type="radio" name="app_type" value="Standard" checked={appType === 'Standard'} onChange={e => setAppType(e.target.value)} style={{ accentColor: 'var(--blue-600)' }} />
                        No, I'm happy with the standard service
                      </span>
                      <span className="dw-option-sub">{svc.timescales.standard}</span>
                    </div>
                    <span className="dw-option-price">Included</span>
                  </label>
                </div>
              </div>

              {/* Printed copy */}
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Would you also like a printed copy of the deeds posted to you?</label>
                <div className="dw-option-group">
                  <label className={`dw-option-row ${printedCopy === 'yes' ? 'dw-option-row--selected' : ''}`}>
                    <div>
                      <span className="dw-option-main">
                        <input type="radio" name="printed" required value="yes" checked={printedCopy === 'yes'} onChange={e => setPrintedCopy(e.target.value)} style={{ accentColor: 'var(--blue-600)' }} />
                        Yes, I would like a PDF and printed copy
                      </span>
                    </div>
                    <span className="dw-option-price">£{svc.printedCopyPrice.toFixed(2)}+vat</span>
                  </label>
                  <label className={`dw-option-row ${printedCopy === 'no' ? 'dw-option-row--selected' : ''}`}>
                    <div>
                      <span className="dw-option-main">
                        <input type="radio" name="printed" value="no" checked={printedCopy === 'no'} onChange={e => setPrintedCopy(e.target.value)} style={{ accentColor: 'var(--blue-600)' }} />
                        No, I'm happy with just a PDF copy
                      </span>
                    </div>
                    <span className="dw-option-price">Included</span>
                  </label>
                </div>
              </div>

              {/* Postal address */}
              {printedCopy === 'yes' && (
                <div style={{ marginBottom: '24px', padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-default)' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Your Postal Address</h4>
                  <div className="form-group">
                    <label className="form-label">Address Line 1</label>
                    <input type="text" required className="form-input" value={postalLine1} onChange={e => setPostalLine1(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address Line 2</label>
                    <input type="text" className="form-input" value={postalLine2} onChange={e => setPostalLine2(e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input type="text" required className="form-input" value={postalCity} onChange={e => setPostalCity(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">County</label>
                      <input type="text" required className="form-input" value={postalCounty} onChange={e => setPostalCounty(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Postcode</label>
                    <input type="text" required className="form-input" value={postalPostcode} onChange={e => setPostalPostcode(e.target.value)} />
                  </div>
                </div>
              )}

              {/* SMS Updates */}
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700 }}>Would you like SMS application status updates?</label>
                <div className="dw-option-group">
                  <label className={`dw-option-row ${smsUpdates === 'yes' ? 'dw-option-row--selected' : ''}`}>
                    <div>
                      <span className="dw-option-main">
                        <input type="radio" name="sms" required value="yes" checked={smsUpdates === 'yes'} onChange={e => setSmsUpdates(e.target.value)} style={{ accentColor: 'var(--blue-600)' }} />
                        Yes, I would like text updates
                      </span>
                      <span className="dw-option-sub">We will send you SMS updates at each stage of the process.</span>
                    </div>
                    <span className="dw-option-price">£{svc.smsUpdatesPrice.toFixed(2)}+vat</span>
                  </label>
                  <label className={`dw-option-row ${smsUpdates === 'no' ? 'dw-option-row--selected' : ''}`}>
                    <div>
                      <span className="dw-option-main">
                        <input type="radio" name="sms" value="no" checked={smsUpdates === 'no'} onChange={e => setSmsUpdates(e.target.value)} style={{ accentColor: 'var(--blue-600)' }} />
                        No, I'm happy with email updates
                      </span>
                    </div>
                    <span className="dw-option-price">Included</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
                <button type="button" onClick={prevStep} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
                  <ArrowLeft size={15} /> Previous
                </button>
                <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Next <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}

          {/* ═══════════ STEP 3: REVIEW ═══════════ */}
          {step === 3 && (
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Eye size={18} /> Review Your Application
              </h3>

              {/* Personal summary table */}
              <table className="dw-review-table">
                <tbody>
                  <tr><td>Title</td><td>{personalTitle}</td></tr>
                  <tr><td>First Name</td><td>{firstName}</td></tr>
                  {middleName && <tr><td>Middle Name</td><td>{middleName}</td></tr>}
                  <tr><td>Surname</td><td>{surname}</td></tr>
                  <tr><td>Email</td><td>{email}</td></tr>
                  <tr><td>Phone</td><td>{phone}</td></tr>
                  {properties.map((prop, i) => (
                    <tr key={i}>
                      <td>Property {i + 1}</td>
                      <td>
                        {isMapSearch
                          ? `${prop.locationLookup} (${prop.latitude}, ${prop.longitude})`
                          : `${prop.addressLine1}${prop.addressLine2 ? ', ' + prop.addressLine2 : ''}, ${prop.city}, ${prop.county}, ${prop.postcode}`
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Price Breakdown */}
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px' }}>Price Breakdown</h4>
              <table className="dw-review-table">
                <tbody>
                  <tr>
                    <td>Document Fee</td>
                    <td>£{prices.documentFee.toFixed(2)} <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', display: 'block' }}>Including VAT</span></td>
                  </tr>
                  <tr>
                    <td>Search & Processing Fee</td>
                    <td>£{prices.searchProcessingFee.toFixed(2)} <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', display: 'block' }}>Including VAT</span></td>
                  </tr>
                  <tr style={{ fontWeight: 700 }}>
                    <td>Total Fee</td>
                    <td>£{prices.total.toFixed(2)} <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', display: 'block', fontWeight: 400 }}>Including VAT</span></td>
                  </tr>
                </tbody>
              </table>

              {/* T&C */}
              <div style={{ marginTop: '20px', marginBottom: '24px' }}>
                <label style={{ display: 'flex', gap: '10px', cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input type="checkbox" required checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} style={{ marginTop: '3px', accentColor: 'var(--blue-600)' }} />
                  <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    I accept the <Link to="/terms" target="_blank" style={{ color: 'var(--blue-600)', textDecoration: 'underline' }}>terms & conditions</Link>. I agree to waive my 14-day cancellation right to allow Swift Task Services Ltd to start processing immediately. The search & processing fee is non-refundable once started.
                  </span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
                <button type="button" onClick={prevStep} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
                  <ArrowLeft size={15} /> Previous
                </button>
                <button type="submit" disabled={!termsAccepted} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', opacity: termsAccepted ? 1 : 0.5 }}>
                  Next <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}

          {/* ═══════════ STEP 4: CONFIRM & SUBMIT ═══════════ */}
          {step === 4 && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Total Amount</h3>
              <p style={{ fontSize: '36px', fontWeight: 800, color: 'var(--blue-600)', fontFamily: 'Poppins, sans-serif', margin: '0 0 8px' }}>£{prices.total.toFixed(2)}</p>
              <button type="button" onClick={prevStep} style={{ fontSize: '13px', color: 'var(--blue-600)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '32px' }}>
                Edit Your Order
              </button>

              {/* Security notice */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: 'var(--text-tertiary)', fontSize: '11px', borderTop: '1px solid var(--border-default)', paddingTop: '16px' }}>
                <Lock size={12} />
                <span>Secure SSL · GDPR compliant · Encrypted Data</span>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 40px', fontSize: '15px', width: '100%', justifyContent: 'center' }}
              >
                {loading ? (
                  <><Loader2 size={18} className="spinner" /> Processing...</>
                ) : (
                  <>Submit Application <ArrowRight size={16} /></>
                )}
              </button>

              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '16px', lineHeight: '1.5' }}>
                By submitting, you confirm all details are correct. A specialist will process your application and email your documents.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
