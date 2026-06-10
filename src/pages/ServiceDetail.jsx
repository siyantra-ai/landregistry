import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Check, Clock, FileText, ArrowRight, ShieldCheck, AlertCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';
import EnquiryForm from '../components/EnquiryForm';

const serviceData = {
  'transfer-of-equity': {
    title: 'Transfer of Equity',
    price: '£450',
    tagline: 'Securely add or remove a person from your property deeds.',
    description: 'A Transfer of Equity is the legal process used when an owner wants to change the joint ownership status of their property - either by adding a new person (e.g., a spouse or partner) or removing an existing co-owner.',
    whoIsFor: [
      'Married couples adding a spouse to their property title deeds',
      'Co-owners separating and removing a partner from the deeds',
      'Parents transferring a share of their property to their children',
      'Joint tenants wanting to restructure ownership shares'
    ],
    included: [
      'Direct assessment by a conveyancing specialist',
      'Preparation of the official Transfer Deed (Form TR1)',
      'Coordination with mortgage lenders (if applicable) for consent',
      'Checking and filing of Stamp Duty Land Tax (SDLT) declarations',
      'Identity verification compliance check (Form ID1)',
      'Filing registration with HM Land Registry'
    ],
    timeline: '3 to 6 weeks (subject to lender approval times)',
    mortgageNotes: 'If there is an active mortgage on the property, your lender must consent to the transfer. They will evaluate the creditworthiness of the remaining/new owners. We handle all lender communications and coordinate the consent process on your behalf.',
    stampDutyNotes: 'Stamp Duty Land Tax (SDLT) may be payable if you are transferring equity in exchange for a payment (consideration) or if the value of the mortgage debt being taken over exceeds the tax-free threshold. We will calculate your exact SDLT position.',
    steps: [
      { name: 'Deed Drafting', desc: 'We gather details and draft the Transfer Deed (TR1) for all parties to sign.' },
      { name: 'Lender Consent', desc: 'If a mortgage exists, we submit documents to obtain the bank\'s written consent.' },
      { name: 'ID & Signature Check', desc: 'We verify the identities of all transferors and transferees to prevent fraud.' },
      { name: 'Official Filing', desc: 'We calculate Stamp Duty, file the return, and submit the AP1 application to HM Land Registry.' }
    ],
    faqs: [
      { q: 'Do both parties need independent legal representation?', a: 'Yes, if there is a conflict of interest (such as a divorce separation) or if one party is giving up equity without receiving money, they should obtain independent legal advice to protect their interests and comply with Land Registry requirements.' },
      { q: 'Will I have to pay Stamp Duty?', a: 'Only if the "consideration" (money paid plus the value of any mortgage debt being transferred) exceeds the current SDLT thresholds. Transfers due to divorce or court order are usually exempt.' }
    ],
    related: ['death-of-joint-proprietor', 'transfer-of-equity-wills-probate', 'applying-for-restriction']
  },
  'death-of-joint-proprietor': {
    title: 'Death of a Joint Proprietor',
    price: '£400',
    tagline: 'Remove a deceased joint owner from the property deeds.',
    description: 'When a property is owned jointly (as Joint Tenants) and one of the owners passes away, the property automatically passes to the surviving owner. This legal service removes the deceased proprietor\'s name from the official register to keep the deeds up-to-date and clean.',
    whoIsFor: [
      'Surviving spouses or civil partners who were joint owners',
      'Executors or administrators handling a deceased person\'s estate',
      'Surviving children who inherited joint property title deeds'
    ],
    included: [
      'Detailed review of Title Deeds and Death Certificates',
      'Preparation of Land Registry application (Form DJP)',
      'Direct processing and filing with HM Land Registry',
      'Provision of updated Title Register showing the surviving owner'
    ],
    timeline: '2 to 4 weeks',
    mortgageNotes: 'If there is an active mortgage, the lender will need to be formally notified. In most joint tenant situations, the debt remains with the surviving owner. We help manage this notification smoothly.',
    stampDutyNotes: 'No Stamp Duty Land Tax (SDLT) is payable for removing a name following the death of a joint owner.',
    steps: [
      { name: 'Certificate Review', desc: 'We verify the official Death Certificate or Grant of Probate.' },
      { name: 'DJP Form Preparation', desc: 'We prepare the official Form DJP (Deceased Joint Proprietor).' },
      { name: 'Registry Submission', desc: 'We submit the application to HM Land Registry along with certified certificates.' },
      { name: 'Title Update', desc: 'We receive and deliver the new Title Register showing the sole surviving owner.' }
    ],
    faqs: [
      { q: 'What is the difference between Joint Tenants and Tenants in Common?', a: 'If you are Joint Tenants, the property passes automatically. If you are Tenants in Common, the deceased\'s share passes according to their Will. If you were Tenants in Common, we will need to execute a Transfer of Equity/Probate instead of a simple DJP form.' },
      { q: 'What documents are required?', a: 'We will need the original or a certified copy of the Death Certificate, or the Grant of Probate, along with the address of the property.' }
    ],
    related: ['transfer-of-equity-wills-probate', 'name-change', 'removal-of-restriction']
  },
  'name-change': {
    title: 'Name Change on Deeds',
    price: '£150',
    tagline: 'Update your legal name on property records.',
    description: 'Ensure your property records match your current legal name. Whether due to marriage, divorce, or a deed poll, updating your name on the Land Registry ensures smooth transactions and avoids delays when selling or mortgaging the property.',
    whoIsFor: [
      'Individuals who have recently married or entered a civil partnership',
      'Divorced individuals reverting to their maiden name',
      'Anyone who has legally changed their name via Deed Poll'
    ],
    included: [
      'Review of the current Land Register entry',
      'Drafting of the Application to Change Name (Form AP1)',
      'Submission of certified supporting evidence to HM Land Registry',
      'Delivering the updated Title Register as proof of change'
    ],
    timeline: '2 to 3 weeks',
    mortgageNotes: 'If you have a mortgage, we notify the lender of your change of name so their records align with the Land Registry deeds. No lender fees or approvals are required.',
    stampDutyNotes: 'Updating your name on property deeds is a purely administrative change. No Stamp Duty (SDLT) is applicable.',
    steps: [
      { name: 'Verify Proofs', desc: 'We collect your Marriage Certificate, Decree Absolute, or Deed Poll.' },
      { name: 'Prepare Application', desc: 'We draft the official Form AP1 matching your current legal details.' },
      { name: 'Submit to Registry', desc: 'We upload your documents and credentials to the Land Registry system.' },
      { name: 'Deliver Updated Title', desc: 'We retrieve your new deeds showing your corrected name.' }
    ],
    faqs: [
      { q: 'Is a certified copy of my marriage certificate enough?', a: 'Yes. We will certify the copy ourselves and upload it electronically. You do not need to send us original documents by post.' },
      { q: 'Can I change my name if I am a joint owner?', a: 'Yes. Only the owner who changed their name needs to sign the application. The other joint owners will not be affected.' }
    ],
    related: ['death-of-joint-proprietor', 'removal-of-restriction', 'applying-for-restriction']
  },
  'removal-of-restriction': {
    title: 'Removal of a Restriction',
    price: '£350',
    tagline: 'Clear outdated cautions or restriction charges from your deeds.',
    description: 'Restrictions and cautions can prevent you from selling or mortgaging your home. We assist in removing outdated restrictions, paid-off private charges, or old tenancy-in-common restrictions (Form A) when they are no longer applicable.',
    whoIsFor: [
      'Homeowners who have paid off a private loan or charge',
      'Sole surviving owners removing a Tenants in Common restriction',
      'Owners with outdated restrictions where the beneficiary has agreed to lift it'
    ],
    included: [
      'Analysis of restriction clauses on the Title Register',
      'Preparation of Form RX3 (Cancellation) or Form RX4 (Withdrawal)',
      'Collating evidence of release or consent from the beneficiary',
      'Filing and monitoring the application with the Land Registry'
    ],
    timeline: '3 to 6 weeks',
    mortgageNotes: 'Most commercial mortgages are registered as Charges, not Restrictions. However, if a lender has placed a Restriction, we coordinate the release document (Form DS1 or equivalent consent) to clear the title.',
    stampDutyNotes: 'No Stamp Duty is associated with removing restrictions or caution entries.',
    steps: [
      { name: 'Deed Inspection', desc: 'We pull the register and isolate the specific restriction wording.' },
      { name: 'Gather Evidence', desc: 'We obtain the written consent, deed of release, or proof of payment.' },
      { name: 'Prepare Forms', desc: 'We prepare the RX3/RX4 forms based on the type of restriction.' },
      { name: 'Submit Application', desc: 'We file the application and monitor responses from Land Registry officers.' }
    ],
    faqs: [
      { q: 'What is a Form A restriction and how do we remove it?', a: 'A Form A restriction prevents a sole owner from selling without appointing a second trustee, usually because the property was held as Tenants in Common. It can be removed if you have become the sole legal and beneficial owner (e.g. through inheritance or buyout).' },
      { q: 'What if the restriction holder refuses to cooperate?', a: 'If you have proof the debt/conditions have been satisfied, we can file a unilateral application for cancellation, giving the restriction holder a set time to object.' }
    ],
    related: ['applying-for-restriction', 'transfer-of-equity', 'first-registration']
  },
  'transfer-of-equity-wills-probate': {
    title: 'Transfer of Equity (Wills/Probate)',
    price: '£450',
    tagline: 'Transfer inherited property titles to executors or beneficiaries.',
    description: 'Following probate or inheritance, property titles must be updated to transfer ownership from the deceased person\'s estate into the names of the legal beneficiaries or executors who will manage or sell it.',
    whoIsFor: [
      'Executors of a Will transferring property to named beneficiaries',
      'Administrators transferring property under intestacy rules',
      'Beneficiaries buying out other heirs named in a estate'
    ],
    included: [
      'Validation of Grant of Probate or Letters of Administration',
      'Drafting the Assent of Property (Form AS1) or Transfer Deed (TR1)',
      'Completing Stamp Duty declaration (usually exempt/gift)',
      'ID verification and submission to HM Land Registry'
    ],
    timeline: '4 to 8 weeks',
    mortgageNotes: 'If the deceased had a mortgage, it must either be paid off from estate funds or the beneficiary must take over the mortgage with lender consent. We coordinate this transfer of debt.',
    stampDutyNotes: 'Inheriting a property or receiving it via a Will (Assent) is typically exempt from Stamp Duty Land Tax (SDLT). We will file the appropriate exemption codes on your behalf.',
    steps: [
      { name: 'Verify Probate', desc: 'We review the Grant of Probate or Letters of Administration.' },
      { name: 'Assent Drafting', desc: 'We draft the official Assent (AS1) or Transfer Deed (TR1).' },
      { name: 'Signatures & ID', desc: 'All executors and beneficiaries verify their identity and sign the deeds.' },
      { name: 'Land Registry Filing', desc: 'We submit the deeds along with the Probate documentation for update.' }
    ],
    faqs: [
      { q: 'Do I need probate to transfer the property?', a: 'Yes. If the property was owned solely by the deceased, HM Land Registry will require a Grant of Probate before the title deeds can be updated.' },
      { q: 'What if we want to sell the property immediately?', a: 'If you are selling, you can sometimes sell directly as executor without registering yourselves first, provided you have the Grant of Probate. Contact us to verify your options.' }
    ],
    related: ['death-of-joint-proprietor', 'transfer-of-equity', 'first-registration']
  },
  'applying-for-restriction': {
    title: 'Applying for a Restriction',
    price: '£350',
    tagline: 'Protect your trust or financial interest on property titles.',
    description: 'A Restriction prevents any sale, transfer, or mortgage of the property without compliance with specific conditions. This protects joint owners, trust beneficiaries, or private lenders from unauthorized property dealings.',
    whoIsFor: [
      'Co-owners establishing a trust deed to split equity shares',
      'Private lenders securing a personal loan against a property',
      'Parents protecting money gifted to children for house deposits'
    ],
    included: [
      'Drafting the restriction clauses to fit your legal arrangement',
      'Preparing the application for restriction (Form RX1)',
      'Obtaining consent of the registered proprietors (if applicable)',
      'Registering the restriction on the Title Register'
    ],
    timeline: '3 to 5 weeks',
    mortgageNotes: 'Active mortgage lenders have priority charges. Your new restriction will sit behind the lender\'s charge. Lenders rarely object to ownership restrictions, and we manage the notice requirements.',
    stampDutyNotes: 'Applying for a restriction does not involve land tax or Stamp Duty (SDLT).',
    steps: [
      { name: 'Define Wording', desc: 'We draft the specific restriction wording (e.g. Standard Form L or M).' },
      { name: 'Prepare Form RX1', desc: 'We populate the Application for Restriction (RX1) with target wording.' },
      { name: 'Proprietor Consent', desc: 'We obtain signed consent from current owners to ensure fast registration.' },
      { name: 'Filing & Confirmation', desc: 'We submit to HM Land Registry and deliver confirmation once active.' }
    ],
    faqs: [
      { q: 'Can I register a restriction without the owner\'s consent?', a: 'Yes, if you have a sufficient "beneficial interest" (e.g. under a trust or court order). However, the Land Registry will notify the owner and they will have an opportunity to object.' },
      { q: 'How does this protect my money?', a: 'If a buyer tries to purchase the property, the restriction prevents registration of their purchase until they prove they have complied with your conditions (e.g. paying you back).' }
    ],
    related: ['removal-of-restriction', 'transfer-of-equity', 'first-registration']
  },
  'first-registration': {
    title: 'First Registration of Land',
    price: '£600',
    tagline: 'Register historic physical deeds with HM Land Registry.',
    description: 'If a property has not changed hands since the 1990s, it may still be unregistered. This service takes your physical bundle of historic title deeds, verifies the chain of ownership, and registers the property electronically with HM Land Registry for modern security.',
    whoIsFor: [
      'Owners of properties held in the family for decades without registry records',
      'Executors dealing with unregistered land following a death',
      'Buyers of unregistered plots of land'
    ],
    included: [
      'Review and digital scanning of the physical deeds bundle',
      'Reconstructing the chain of title and deeds history',
      'Preparing the detailed Land Registry form (Form FR1)',
      'Drafting a scale Land Registry compliant plan if needed',
      'Filing for First Registration with full legal execution'
    ],
    timeline: '6 to 12 weeks (due to extensive Land Registry review)',
    mortgageNotes: 'Unregistered properties with active mortgages require careful handling as the mortgage deeds are often mixed in with the physical bundle. We handle the process of registering the bank\'s charge alongside your ownership.',
    stampDutyNotes: 'Only applicable if registering a recent purchase of unregistered land. For historic family ownership, there is no Stamp Duty (SDLT) payable.',
    steps: [
      { name: 'Deed Intake', desc: 'We take delivery of and audit your physical bundle of deeds and contracts.' },
      { name: 'Epitome of Title', desc: 'We compile a chronological summary (Epitome of Title) linking all historic owners.' },
      { name: 'FR1 Drafting', desc: 'We complete the comprehensive FR1 forms and verify scale boundary plans.' },
      { name: 'Registry Lodgement', desc: 'We securely submit the entire packet to the registry\'s specialized team.' }
    ],
    faqs: [
      { q: 'What happens if some historic deeds are missing?', a: 'We can draft a Statutory Declaration (Form ST3) describing your long-term ownership and boundary usage to satisfy the Registry requirements.' },
      { q: 'Why should I register my unregistered land?', a: 'It protects you against land squatting/adverse possession, prevents loss of deeds in fire/flood, and makes selling or mortgaging the property twice as fast.' }
    ],
    related: ['transfer-of-equity-wills-probate', 'removal-of-restriction', 'applying-for-restriction']
  }
};

export default function ServiceDetail() {
  const { id } = useParams();
  const [activeFaq, setActiveFaq] = useState(null);

  // If service ID is not found, redirect to home
  const service = serviceData[id];
  if (!service) {
    return <Navigate to="/" replace />;
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Construct JSON-LD Schema for the service page
  const faqListSchema = service.faqs.map((faq, idx) => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Land Registry Transfers",
      "telephone": "+442079460192"
    },
    "offers": {
      "@type": "Offer",
      "price": service.price.replace('£', ''),
      "priceCurrency": "GBP",
      "valueAddedTaxIncluded": true
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Conveyancing Services"
    }
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema,
      {
        "@type": "FAQPage",
        "mainEntity": faqListSchema
      }
    ]
  };

  return (
    <>
      <SEO 
        title={`${service.title} Fixed Fee Conveyancing`} 
        description={service.tagline}
        schemaJson={combinedSchema}
      />

      {/* Service Hero */}
      <section className="service-detail-hero">
        <div className="container service-detail-grid">
          <div>
            <span className="service-badge">Fixed Price Service</span>
            <h1 className="service-title-h1">{service.title}</h1>
            <p className="hero-subtitle" style={{ marginBottom: 16 }}>{service.tagline}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.7 }}>{service.description}</p>
            
            {/* Price Banner */}
            <div className="service-price-banner">
              <div className="price-banner-text">
                <p>Fixed Conveyancing Fee</p>
                <p>{service.price}</p>
              </div>
              <div className="price-banner-badge">
                VAT Included
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', backgroundColor: 'var(--light-bg)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--secondary)' }}>
              <Clock size={18} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
              <div style={{ fontSize: 13, color: 'var(--text-main)' }}>
                <strong>Expected Timeline:</strong> {service.timeline}
              </div>
            </div>
          </div>

          <div>
            {/* Contextualized Form */}
            <EnquiryForm initialService={id} />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="section section-light" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="service-body-grid">
            
            {/* Who is it for & What is included */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
              <div className="card-box">
                <h3 className="card-box-title">
                  <FileText size={18} /> Who This Legal Service is For
                </h3>
                <ul className="check-list">
                  {service.whoIsFor.map((item, index) => (
                    <li key={index} className="check-item">
                      <Check size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-box">
                <h3 className="card-box-title">
                  <ShieldCheck size={18} style={{ color: 'var(--accent-green)' }} /> What is Included in the Fee
                </h3>
                <ul className="check-list">
                  {service.included.map((item, index) => (
                    <li key={index} className="check-item">
                      <Check size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step-by-Step Conveyancing Process */}
            <div className="card-box" style={{ marginTop: 8 }}>
              <h3 className="card-box-title">
                <Clock size={18} /> Step-by-Step Deed Process
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 16 }}>
                {service.steps.map((step, idx) => (
                  <div key={idx} className="timeline-step">
                    <div className="timeline-badge">{idx + 1}</div>
                    <div className="timeline-content">
                      <h4 className="timeline-title">{step.name}</h4>
                      <p className="timeline-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mortgages & Taxes Guidelines */}
            <div className="card-box" style={{ backgroundColor: 'hsla(221, 83%, 53%, 0.02)', border: '1px solid hsla(221, 83%, 53%, 0.1)' }}>
              <h3 className="card-box-title" style={{ borderBottom: '1px solid hsla(221, 83%, 53%, 0.1)' }}>
                <AlertCircle size={18} style={{ color: 'var(--primary)' }} /> Important Conveyancing Guidelines
              </h3>
              
              <div className="notes-grid" style={{ marginTop: 16 }}>
                <div className="note-box" style={{ borderLeftColor: 'var(--primary)' }}>
                  <h4 className="note-box-title">Mortgage & Lender Consent</h4>
                  <p className="note-box-desc">{service.mortgageNotes}</p>
                </div>

                <div className="note-box" style={{ borderLeftColor: 'var(--secondary)' }}>
                  <h4 className="note-box-title">Stamp Duty & Taxes</h4>
                  <p className="note-box-desc">{service.stampDutyNotes}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Service-Specific FAQs */}
      <section className="section" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">FAQ</span>
            <h2 className="section-title">Service Questions & Answers</h2>
            <p className="section-desc">Specific legal and technical questions answered directly by our advisors.</p>
          </div>

          <div className="faq-list">
            {service.faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button className="faq-question-btn" onClick={() => toggleFaq(index)}>
                  <span>{faq.q}</span>
                  {activeFaq === index ? <ChevronDown size={18} style={{ transform: 'rotate(180deg)', transition: 'var(--transition-smooth)' }} /> : <ChevronDown size={18} style={{ transition: 'var(--transition-smooth)' }} />}
                </button>
                {activeFaq === index && (
                  <div className="faq-answer-panel">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 40 }}>
            <span className="section-subtitle">Need something else?</span>
            <h2 className="section-title" style={{ fontSize: 28 }}>Related Deed Services</h2>
          </div>

          <div className="related-services-grid">
            {service.related.map((relId) => {
              const relService = serviceData[relId];
              if (!relService) return null;
              return (
                <Link key={relId} to={`/services/${relId}`} className="related-service-card">
                  <h4 className="related-service-title">{relService.title}</h4>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 12px', lineHeight: 1.5 }}>
                    {relService.tagline}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="related-service-price">{relService.price} inc. VAT</span>
                    <span style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                      View <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
