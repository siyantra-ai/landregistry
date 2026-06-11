import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, FileText, Loader2, Lock, Clock, Sparkles, MapPin, Calendar, User, ShieldAlert } from 'lucide-react';
import SEO from '../components/SEO';
import { saveEnquiry } from '../db/supabase';

function PostcodeLookup({ onAddressSelect }) {
  const [postcode, setPostcode] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupPostcode = async () => {
    if (!postcode) return;
    setLoading(true);
    setError('');
    setAddresses([]);

    const apiKey = import.meta.env.VITE_GETADDRESS_API_KEY;
    if (apiKey) {
      try {
        const res = await fetch(`https://api.getaddress.io/find/${postcode}?api-key=${apiKey}&expand=true`);
        if (res.ok) {
          const data = await res.json();
          const formatted = (data.addresses || []).map(addr => ({
            line1: addr.line_1 || addr.formatted_address[0] || '',
            line2: addr.line_2 || addr.formatted_address[1] || '',
            city: addr.town_or_city || data.town_or_city || '',
            county: addr.county || data.county || '',
            postcode: data.postcode
          }));
          setAddresses(formatted);
          if (formatted.length === 0) setError('No addresses found for this postcode.');
        } else {
          setError('Postcode not found or API error.');
        }
      } catch (err) {
        setError('Error reaching postcode service.');
      }
    } else {
      // Demo Mode: Mock response after delay
      await new Promise(resolve => setTimeout(resolve, 600));
      const cleanPc = postcode.toUpperCase().replace(/\s/g, '');
      if (cleanPc === 'SW1A1AA') {
        setAddresses([
          { line1: '10 Downing Street', line2: '', city: 'London', county: 'Greater London', postcode: 'SW1A 1AA' },
          { line1: '11 Downing Street', line2: '', city: 'London', county: 'Greater London', postcode: 'SW1A 1AA' },
          { line1: '12 Downing Street', line2: '', city: 'London', county: 'Greater London', postcode: 'SW1A 1AA' }
        ]);
      } else {
        const mockStreets = ['High Street', 'London Road', 'Church Street', 'Park Lane', 'Main Street'];
        const mockCities = ['Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Bristol'];
        const cleanPcShow = postcode.toUpperCase();
        setAddresses([
          { line1: `1 ${mockStreets[Math.floor(Math.random()*5)]}`, line2: 'Flat A', city: mockCities[Math.floor(Math.random()*5)], county: 'West Midlands', postcode: cleanPcShow },
          { line1: `15 ${mockStreets[Math.floor(Math.random()*5)]}`, line2: '', city: mockCities[Math.floor(Math.random()*5)], county: 'Lancashire', postcode: cleanPcShow },
          { line1: `42 ${mockStreets[Math.floor(Math.random()*5)]}`, line2: '', city: mockCities[Math.floor(Math.random()*5)], county: 'Yorkshire', postcode: cleanPcShow }
        ]);
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ marginBottom: '16px', background: 'rgba(199, 162, 90, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-default)' }}>
      <label className="form-label" style={{ fontSize: '13px', fontWeight: 700 }}>Search Address by Postcode</label>
      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
        <input 
          type="text" 
          placeholder="e.g. SW1A 1AA" 
          value={postcode} 
          onChange={e => setPostcode(e.target.value)} 
          className="form-input" 
          style={{ textTransform: 'uppercase', padding: '10px 14px' }}
        />
        <button 
          type="button" 
          onClick={lookupPostcode} 
          disabled={loading} 
          className="btn-primary"
          style={{ whiteSpace: 'nowrap', padding: '10px 16px', fontSize: '13px', backgroundColor: 'var(--blue-600)', color: '#ffffff', borderRadius: '10px', border: 'none', cursor: 'pointer' }}
        >
          {loading ? 'Searching...' : 'Find Address'}
        </button>
      </div>
      {error && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px', marginBottom: 0 }}>{error}</p>}
      {addresses.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <label className="form-label" style={{ fontSize: '12px' }}>Select from {addresses.length} addresses</label>
          <select 
            className="form-select" 
            onChange={e => {
              const idx = parseInt(e.target.value);
              if (!isNaN(idx)) onAddressSelect(addresses[idx]);
            }}
            defaultValue=""
            style={{ padding: '10px 14px', borderRadius: '10px' }}
          >
            <option value="" disabled>Choose an address...</option>
            {addresses.map((addr, idx) => (
              <option key={idx} value={idx}>
                {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}, {addr.city}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

const SERVICES = {
  'transfer-of-equity': {
    title: 'Transfer of Equity',
    price: 450,
    subtitle: 'Add or remove a partner, spouse, or family member from property deeds.'
  },
  'death-of-joint-proprietor': {
    title: 'Death of a Joint Proprietor',
    price: 400,
    subtitle: 'Remove a deceased joint owner from property deeds.'
  },
  'deceased-joint-proprietor': {
    title: 'Death of a Joint Proprietor',
    price: 400,
    subtitle: 'Remove a deceased joint owner from property deeds.'
  },
  'name-change': {
    title: 'Name Change on Deeds',
    price: 150,
    subtitle: 'Update your legal name on property records.'
  },
  'removal-of-restriction': {
    title: 'Removal of a Restriction',
    price: 350,
    subtitle: 'Clear outdated charges, cautions, or restrictions.'
  },
  'transfer-of-equity-wills-probate': {
    title: 'Transfer of Equity (Wills / Probate)',
    price: 450,
    subtitle: 'Transfer inherited property to executors or beneficiaries.'
  },
  'applying-for-restriction': {
    title: 'Applying for a Restriction',
    price: 350,
    subtitle: 'Protect your trust or financial interest on property titles.'
  },
  'first-registration': {
    title: 'First Registration',
    price: 600,
    subtitle: 'Register unregistered historic deeds with HM Land Registry.'
  }
};

export default function ApplyWizard() {
  const { serviceId, stepId } = useParams();
  const navigate = useNavigate();
  
  const currentStep = parseInt(stepId) || 1;
  const s = SERVICES[serviceId];

  // If service is invalid, redirect to home with pre-selected document type
  if (!s) {
    return <Navigate to={`/?select=${serviceId}`} replace />;
  }

  // --- WIZARD FORM STATE ---
  // Step 1: Property
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');

  // Step 2: Custom Case Details
  // - Transfer of Equity
  const [hasMortgage, setHasMortgage] = useState('');
  const [lenderName, setLenderName] = useState('');
  const [addedNames, setAddedNames] = useState('');
  const [removedNames, setRemovedNames] = useState('');
  // - Death of Joint Proprietor
  const [deceasedName, setDeceasedName] = useState('');
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [survivingNames, setSurvivingNames] = useState('');
  // - Name Change
  const [currentName, setCurrentName] = useState('');
  const [newName, setNewName] = useState('');
  const [nameChangeReason, setNameChangeReason] = useState('');
  // - Removal of Restriction
  const [restrictionType, setRestrictionType] = useState('');
  const [restrictionHolder, setRestrictionHolder] = useState('');
  // - Wills / Probate
  const [probateStatus, setProbateStatus] = useState('');
  const [executorNames, setExecutorNames] = useState('');
  const [beneficiaryNames, setBeneficiaryNames] = useState('');
  // - Applying for Restriction
  const [restrictionReason, setRestrictionReason] = useState('');
  const [beneficiaryToProtect, setBeneficiaryToProtect] = useState('');
  // - First Registration
  const [holdsPhysicalDeeds, setHoldsPhysicalDeeds] = useState('');
  const [claimantNames, setClaimantNames] = useState('');

  // Step 3: Contact & Checkout
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [turnaroundType, setTurnaroundType] = useState('standard'); // 'standard' or 'fast-track'
  const [waiverChecked, setWaiverChecked] = useState(false);

  // Submit / Success States
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // --- PRICE SPLIT CALCULATION ---
  const getCheckoutCalculations = () => {
    const basePrice = s.price;
    const fastTrackUpgrade = turnaroundType === 'fast-track' ? 95 : 0;
    const total = basePrice + fastTrackUpgrade;
    const documentFee = 7.00;
    const taxable = total - documentFee;
    const vat = taxable * 1 / 6;
    const searchProcessingFee = taxable * 5 / 6;

    return {
      documentFee,
      searchProcessingFee,
      vat,
      total
    };
  };

  const calcs = getCheckoutCalculations();

  // --- FORM STEP SUBMISSIONS ---
  const handleNextStep = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      navigate(`/apply/${serviceId}/step/${currentStep + 1}`);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      navigate(`/apply/${serviceId}/step/${currentStep - 1}`);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!waiverChecked) return;
    setLoading(true);

    // Compile custom case notes based on service
    let caseNotes = `Application for: ${s.title}\n`;
    caseNotes += `Property Address: ${address}, Postcode: ${postcode}\n\n`;

    if (serviceId === 'transfer-of-equity') {
      caseNotes += `Mortgage Status: ${hasMortgage}\n`;
      if (hasMortgage === 'Yes') caseNotes += `Lender: ${lenderName}\n`;
      caseNotes += `Names added: ${addedNames}\n`;
      caseNotes += `Names removed: ${removedNames}\n`;
    } else if (serviceId === 'death-of-joint-proprietor' || serviceId === 'deceased-joint-proprietor') {
      caseNotes += `Deceased Proprietor: ${deceasedName}\n`;
      caseNotes += `Date of Death: ${dateOfDeath}\n`;
      caseNotes += `Surviving Proprietor(s): ${survivingNames}\n`;
    } else if (serviceId === 'name-change') {
      caseNotes += `Current Name: ${currentName}\n`;
      caseNotes += `New Name: ${newName}\n`;
      caseNotes += `Reason for change: ${nameChangeReason}\n`;
    } else if (serviceId === 'removal-of-restriction') {
      caseNotes += `Restriction Type: ${restrictionType}\n`;
      caseNotes += `Restriction Holder Name: ${restrictionHolder}\n`;
    } else if (serviceId === 'transfer-of-equity-wills-probate') {
      caseNotes += `Deceased Name: ${deceasedName}\n`;
      caseNotes += `Probate Status: ${probateStatus}\n`;
      caseNotes += `Executor Names: ${executorNames}\n`;
      caseNotes += `Beneficiary Names: ${beneficiaryNames}\n`;
    } else if (serviceId === 'applying-for-restriction') {
      caseNotes += `Reason for restriction: ${restrictionReason}\n`;
      caseNotes += `Beneficiary to protect: ${beneficiaryToProtect}\n`;
    } else if (serviceId === 'first-registration') {
      caseNotes += `Holds physical deeds?: ${holdsPhysicalDeeds}\n`;
      caseNotes += `Claimant names: ${claimantNames}\n`;
    }

    caseNotes += `\nTurnaround Type: ${turnaroundType === 'fast-track' ? 'Fast Track (48 hours)' : 'Standard (14 working days)'}\n`;
    caseNotes += `Pricing breakdown: Document Fee £${calcs.documentFee.toFixed(2)}, Processing £${calcs.searchProcessingFee.toFixed(2)}, VAT £${calcs.vat.toFixed(2)}, Total Paid £${calcs.total.toFixed(2)}`;

    const res = await saveEnquiry({
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      service: `Apply Form: ${s.title}`,
      notes: caseNotes
    });

    setLoading(false);
    if (res.success) {
      setSuccess(true);
      window.scrollTo(0, 0);
    }
  };

  // --- RENDER DYNAMIC STEP 2 FIELDS ---
  const renderStep2Fields = () => {
    switch (serviceId) {
      case 'transfer-of-equity':
        return (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="has-mortgage">Is there an active mortgage on the property?</label>
              <select id="has-mortgage" required className="form-select" value={hasMortgage} onChange={(e) => setHasMortgage(e.target.value)}>
                <option value="" disabled>Select option...</option>
                <option value="Yes">Yes, there is an active mortgage</option>
                <option value="No">No, the property has no mortgage</option>
              </select>
            </div>
            {hasMortgage === 'Yes' && (
              <div className="form-group">
                <label className="form-label" htmlFor="lender-name">Mortgage Lender Name</label>
                <input id="lender-name" type="text" required className="form-input" placeholder="e.g. Halifax, Nationwide" value={lenderName} onChange={(e) => setLenderName(e.target.value)} />
              </div>
            )}
            <div className="form-group">
              <label className="form-label" htmlFor="added-names">Who is being ADDED to the title deeds? (Full Name)</label>
              <input id="added-names" type="text" required className="form-input" placeholder="e.g. Sarah Smith" value={addedNames} onChange={(e) => setAddedNames(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="removed-names">Who is being REMOVED from the title deeds? (if any)</label>
              <input id="removed-names" type="text" className="form-input" placeholder="e.g. Leaving blank if only adding someone" value={removedNames} onChange={(e) => setRemovedNames(e.target.value)} />
            </div>
          </>
        );
      
      case 'death-of-joint-proprietor':
      case 'deceased-joint-proprietor':
        return (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="deceased-name">Deceased Proprietor's Full Name</label>
              <input id="deceased-name" type="text" required className="form-input" placeholder="e.g. Arthur Pendelton" value={deceasedName} onChange={(e) => setDeceasedName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="date-death">Date of Death</label>
              <input id="date-death" type="date" required className="form-input" value={dateOfDeath} onChange={(e) => setDateOfDeath(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="surviving-names">Surviving Proprietor's Full Name(s)</label>
              <input id="surviving-names" type="text" required className="form-input" placeholder="e.g. Gwendolyn Pendelton" value={survivingNames} onChange={(e) => setSurvivingNames(e.target.value)} />
            </div>
          </>
        );

      case 'name-change':
        return (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="current-name">Current Name registered on Deeds</label>
              <input id="current-name" type="text" required className="form-input" placeholder="e.g. Evelyn Rose Baker" value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="new-name">New Legal Name to register</label>
              <input id="new-name" type="text" required className="form-input" placeholder="e.g. Evelyn Rosewood" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="name-reason">Reason for Name Change</label>
              <select id="name-reason" required className="form-select" value={nameChangeReason} onChange={(e) => setNameChangeReason(e.target.value)}>
                <option value="" disabled>Select reason...</option>
                <option value="Marriage">Marriage (Marriage Certificate available)</option>
                <option value="Divorce">Divorce (Decree Absolute / Divorce Order available)</option>
                <option value="Deed Poll">Deed Poll (Deed Poll document available)</option>
                <option value="Other">Other / Typo Correction</option>
              </select>
            </div>
          </>
        );

      case 'removal-of-restriction':
        return (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="rest-type">Type of Restriction/Charge to remove</label>
              <select id="rest-type" required className="form-select" value={restrictionType} onChange={(e) => setRestrictionType(e.target.value)}>
                <option value="" disabled>Select restriction type...</option>
                <option value="Form A (Tenant in Common)">Form A Restriction (Tenants in Common)</option>
                <option value="Private Mortgage / Charge">Private Loan or Financial Charge</option>
                <option value="Bankruptcy Caution">Outdated Bankruptcy Caution/Notice</option>
                <option value="Other / Unsure">Other restriction / Unsure of type</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="rest-holder">Name of Creditor / Restriction Holder (if known)</label>
              <input id="rest-holder" type="text" className="form-input" placeholder="e.g. Bank name or person's name" value={restrictionHolder} onChange={(e) => setRestrictionHolder(e.target.value)} />
            </div>
          </>
        );

      case 'transfer-of-equity-wills-probate':
        return (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="dec-owner-name">Deceased Owner's Full Name</label>
              <input id="dec-owner-name" type="text" required className="form-input" placeholder="e.g. Ronald Weasley" value={deceasedName} onChange={(e) => setDeceasedName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="probate-status">Will / Probate Status</label>
              <select id="probate-status" required className="form-select" value={probateStatus} onChange={(e) => setProbateStatus(e.target.value)}>
                <option value="" disabled>Select status...</option>
                <option value="Granted">Grant of Probate has been Granted</option>
                <option value="Letters of Admin">Letters of Administration Granted</option>
                <option value="In Progress">Probate in progress / submitted</option>
                <option value="No Probate Needed">No Probate required (small estate)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="executor-names">Executor / Administrator Names</label>
              <input id="executor-names" type="text" required className="form-input" placeholder="e.g. Harry Potter" value={executorNames} onChange={(e) => setExecutorNames(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="beneficiary-names">Beneficiary Names (Who will own the property?)</label>
              <input id="beneficiary-names" type="text" required className="form-input" placeholder="e.g. Rose Weasley" value={beneficiaryNames} onChange={(e) => setBeneficiaryNames(e.target.value)} />
            </div>
          </>
        );

      case 'applying-for-restriction':
        return (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="apply-reason">Reason for applying for a Restriction</label>
              <select id="apply-reason" required className="form-select" value={restrictionReason} onChange={(e) => setRestrictionReason(e.target.value)}>
                <option value="" disabled>Select reason...</option>
                <option value="Protect Trust Deed">Protect Trust Deed (Joint tenants / Declaration of trust)</option>
                <option value="Secure Loan">Secure a loan / private mortgage agreement</option>
                <option value="Gifted Deposit">Protect a family member's gifted deposit</option>
                <option value="Other">Other interest protection</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="ben-protect">Name of Beneficiary to be protected by the restriction</label>
              <input id="ben-protect" type="text" required className="form-input" placeholder="e.g. Hermione Granger" value={beneficiaryToProtect} onChange={(e) => setBeneficiaryToProtect(e.target.value)} />
            </div>
          </>
        );

      case 'first-registration':
        return (
          <>
            <div className="form-group">
              <label className="form-label" htmlFor="holds-deeds">Do you hold the physical bundle of original historic deeds?</label>
              <select id="holds-deeds" required className="form-select" value={holdsPhysicalDeeds} onChange={(e) => setHoldsPhysicalDeeds(e.target.value)}>
                <option value="" disabled>Select option...</option>
                <option value="Yes">Yes, I hold all physical deeds in my possession</option>
                <option value="No">No, original deeds are lost/destroyed</option>
                <option value="Unsure">Unsure where deeds are held</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="claimant-names">Names of Claimant(s) / Current Legal Owners</label>
              <input id="claimant-names" type="text" required className="form-input" placeholder="e.g. Percy Jackson & Annabeth Chase" value={claimantNames} onChange={(e) => setClaimantNames(e.target.value)} />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  // --- RENDER SUCCESS VIEW ---
  if (success) {
    return (
      <div className="container" style={{ padding: '80px 24px', maxWidth: '640px', textAlign: 'center' }}>
        <SEO title="Application Submitted" description="Your property deed transfer application has been received successfully." />
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid var(--border-default)', padding: '48px 32px', boxShadow: 'var(--shadow-lg)' }}>
          <CheckCircle size={64} style={{ color: 'var(--blue-600)', margin: '0 auto 24px' }} />
          <h1 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '12px', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Application Received!</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
            Thank you. Your conveyance application details for <strong>{s.title}</strong> have been logged successfully. 
          </p>
          <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: '10px', padding: '20px', marginBottom: '32px', textAlign: 'left' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--text-primary)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Clock size={16} style={{ color: 'var(--blue-600)' }} /> Next Steps:
            </h4>
            <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>A deed specialist will review your details against HM Land Registry index records.</li>
              <li>We will call you on <strong>{clientPhone}</strong> to confirm identity check requirements (such as Form ID1).</li>
              <li>Draft documentation and invoice calculations will be dispatched to <strong>{clientEmail}</strong>.</li>
            </ul>
          </div>
          <Link to="/" className="btn-primary" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}>
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // --- MAIN WIZARD VIEW ---
  return (
    <>
      <SEO title={`Apply - ${s.title}`} description={`Apply online for ${s.title} conveyancing services.`} />

      <div className="container" style={{ padding: '60px 24px 100px', maxWidth: '720px' }}>
        
        {/* Dynamic header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-accent)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Online Portal Application</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>{s.subtitle}</p>
        </div>

        {/* Stepper Progress Indicator */}
        <div className="apply-stepper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', position: 'relative', width: '100%' }}>
          <div style={{ position: 'absolute', top: '15px', left: '10%', right: '10%', height: '2.5px', background: 'var(--border-default)', zIndex: 1 }} />
          <div style={{ position: 'absolute', top: '15px', left: '10%', width: currentStep === 1 ? '0%' : currentStep === 2 ? '40%' : '80%', height: '2.5px', background: 'var(--blue-600)', zIndex: 1, transition: 'width 0.3s ease' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, width: '25%', textAlign: 'center' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: currentStep >= 1 ? 'var(--blue-600)' : 'var(--bg-secondary)', border: currentStep >= 1 ? 'none' : '1.5px solid var(--border-default)', color: currentStep >= 1 ? '#ffffff' : 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12.5px', fontWeight: 700, boxShadow: currentStep === 1 ? '0 0 10px rgba(47, 79, 70, 0.3)' : 'none' }}>
              1
            </div>
            <span style={{ fontSize: '11px', marginTop: '6px', fontWeight: currentStep === 1 ? 700 : 500, color: currentStep === 1 ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>Property</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, width: '25%', textAlign: 'center' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: currentStep >= 2 ? 'var(--blue-600)' : '#ffffff', border: currentStep >= 2 ? 'none' : '1.5px solid var(--border-default)', color: currentStep >= 2 ? '#ffffff' : 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12.5px', fontWeight: 700, boxShadow: currentStep === 2 ? '0 0 10px rgba(47, 79, 70, 0.3)' : 'none' }}>
              2
            </div>
            <span style={{ fontSize: '11px', marginTop: '6px', fontWeight: currentStep === 2 ? 700 : 500, color: currentStep === 2 ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>Details</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, width: '25%', textAlign: 'center' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: currentStep >= 3 ? 'var(--blue-600)' : '#ffffff', border: currentStep >= 3 ? 'none' : '1.5px solid var(--border-default)', color: currentStep >= 3 ? '#ffffff' : 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12.5px', fontWeight: 700, boxShadow: currentStep === 3 ? '0 0 10px rgba(47, 79, 70, 0.3)' : 'none' }}>
              3
            </div>
            <span style={{ fontSize: '11px', marginTop: '6px', fontWeight: currentStep === 3 ? 700 : 500, color: currentStep === 3 ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>Checkout</span>
          </div>
        </div>

        {/* Wizard Form Wrapper Card */}
        <div style={{ background: '#ffffff', border: '1.5px solid var(--border-default)', borderRadius: '16px', padding: '36px 32px', boxShadow: 'var(--shadow-md)' }}>
          {currentStep === 1 && (
            <form onSubmit={handleNextStep}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}><MapPin size={18} /> Step 1: Property Location</h3>
              
              <PostcodeLookup onAddressSelect={(addr) => {
                setPostcode(addr.postcode);
                setAddress(addr.line1 + (addr.line2 ? ', ' + addr.line2 : '') + ', ' + addr.city);
              }} />

              <div className="form-group">
                <label className="form-label" htmlFor="apply-postcode">Property Postcode</label>
                <input id="apply-postcode" type="text" required className="form-input" placeholder="e.g. BB1 8AB" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="apply-address">Property Address / House Number &amp; Street</label>
                <input id="apply-address" type="text" required className="form-input" placeholder="e.g. 1 Limbrick, Blackburn" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
                <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Next Step <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={handleNextStep}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}><FileText size={18} /> Step 2: Conveyancing Details</h3>
              
              {renderStep2Fields()}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                <button type="button" onClick={handlePrevStep} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
                  <ArrowLeft size={15} /> Back
                </button>
                <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Next Step <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleSubmitApplication}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}><User size={18} /> Step 3: Contact &amp; Checkout Summary</h3>
              
              <div className="form-group">
                <label className="form-label" htmlFor="client-name">Your Full Name</label>
                <input id="client-name" type="text" required className="form-input" placeholder="e.g. John Smith" value={clientName} onChange={(e) => setClientName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="client-email">Email Address</label>
                <input id="client-email" type="email" required className="form-input" placeholder="e.g. john@example.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="client-phone">Phone Number</label>
                <input id="client-phone" type="tel" required className="form-input" placeholder="e.g. 07123 456789" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
              </div>

              {/* Turnaround times Selection */}
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label className="form-label">Select Turnaround Speed</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '6px' }}>
                  <div 
                    onClick={() => setTurnaroundType('standard')}
                    style={{ border: turnaroundType === 'standard' ? '2.5px solid var(--blue-600)' : '1.5px solid var(--border-default)', padding: '16px', borderRadius: '10px', cursor: 'pointer', backgroundColor: turnaroundType === 'standard' ? 'var(--bg-secondary)' : '#ffffff', transition: 'all 0.2s ease' }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Standard</span>
                      {turnaroundType === 'standard' && <CheckCircle size={15} style={{ color: 'var(--blue-600)' }} />}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '4px' }}>14 working days · Free</div>
                  </div>
                  
                  <div 
                    onClick={() => setTurnaroundType('fast-track')}
                    style={{ border: turnaroundType === 'fast-track' ? '2.5px solid var(--blue-600)' : '1.5px solid var(--border-default)', padding: '16px', borderRadius: '10px', cursor: 'pointer', backgroundColor: turnaroundType === 'fast-track' ? 'var(--bg-secondary)' : '#ffffff', transition: 'all 0.2s ease' }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Fast Track (+£95)</span>
                      {turnaroundType === 'fast-track' && <CheckCircle size={15} style={{ color: 'var(--blue-600)' }} />}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '4px' }}>48 working hours</div>
                  </div>
                </div>
              </div>

              {/* Price Split Breakdown */}
              <div className="price-split-breakdown" style={{ 
                marginTop: '24px', 
                padding: '18px', 
                backgroundColor: 'var(--bg-secondary)', 
                borderRadius: '10px', 
                border: '1.5px solid var(--border-default)', 
                fontSize: '13px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                  <span>HM Land Registry Document Fee (gov.uk cost):</span>
                  <span style={{ fontWeight: 600 }}>£{calcs.documentFee.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                  <span>Search &amp; Processing Fee:</span>
                  <span style={{ fontWeight: 600 }}>£{calcs.searchProcessingFee.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                  <span>VAT (20% on Search &amp; Processing):</span>
                  <span style={{ fontWeight: 600 }}>£{calcs.vat.toFixed(2)}</span>
                </div>
                <div style={{ height: '1.5px', backgroundColor: 'var(--border-default)', margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '15.5px', color: 'var(--text-primary)' }}>
                  <span>Total Conveyancing Fee:</span>
                  <span>£{calcs.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Required Cancellation Waiver Checkbox */}
              <div className="compliance-checkbox-group" style={{ marginTop: '20px', marginBottom: '24px' }}>
                <label style={{ display: 'flex', gap: '10px', cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input 
                    type="checkbox" 
                    required 
                    checked={waiverChecked}
                    onChange={(e) => setWaiverChecked(e.target.checked)}
                    style={{ marginTop: '3.5px', accentColor: 'var(--blue-600)' }}
                  />
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    I agree to waive my 14-day cancellation right to allow Swift Task Services Ltd to start retrieving deed files immediately. I understand the search and processing fee is non-refundable once started.
                  </span>
                </label>
              </div>

              {/* Security badges */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: 'var(--text-tertiary)', fontSize: '11px', borderTop: '1px solid var(--border-default)', paddingTop: '16px' }}>
                <Lock size={12} />
                <span>Secure SSL Check · GDPR compliant · Encrypted Data</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={handlePrevStep} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
                  <ArrowLeft size={15} /> Back
                </button>
                <button type="submit" disabled={loading || !waiverChecked} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', opacity: waiverChecked ? 1 : 0.6 }}>
                  {loading ? (
                    <>
                      <Loader2 size={15} className="spinner" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </>
  );
}
