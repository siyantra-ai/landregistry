import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Check, Clock, FileText, ArrowRight, ShieldCheck, AlertCircle, ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import EnquiryForm from '../components/EnquiryForm';

const GIFS = {
  'transfer-of-equity': '/gifs/add_name.gif',
  'death-of-joint-proprietor': '/gifs/death.gif',
  'name-change': '/gifs/namechange.gif',
  'removal-of-restriction': '/gifs/tennant.gif',
  'transfer-of-equity-wills-probate': '/gifs/add_name.gif',
  'applying-for-restriction': '/gifs/tennant.gif',
  'first-registration': '/gifs/first_registration.gif',
};

const DATA = {
  'transfer-of-equity': { title:'Transfer of Equity', price:'£450', tag:'Securely add or remove a person from your property deeds.', desc:'A Transfer of Equity changes the joint ownership status of a property — adding a new person or removing an existing co-owner.', whoFor:['Married couples adding a spouse to title deeds','Co-owners separating and removing a partner','Parents transferring a share to children','Joint tenants restructuring ownership shares'], included:['Conveyancing specialist assessment','Transfer Deed (Form TR1) preparation','Mortgage lender consent coordination','Stamp Duty Land Tax declarations','Identity verification (Form ID1)','HM Land Registry filing'], timeline:'3–6 weeks', mortgage:'If there is an active mortgage, your lender must consent to the transfer. We handle all lender communications on your behalf.', stampDuty:'SDLT may be payable if transferring equity in exchange for payment or if mortgage debt exceeds the tax-free threshold.', steps:[{n:'Deed Drafting',d:'We gather details and draft the Transfer Deed (TR1).'},{n:'Lender Consent',d:'If a mortgage exists, we obtain the bank\'s written consent.'},{n:'ID Verification',d:'We verify identities of all parties to prevent fraud.'},{n:'Official Filing',d:'We file the SDLT return and submit the AP1 application.'}], faqs:[{q:'Do both parties need independent legal representation?',a:'Yes, if there is a conflict of interest or if one party is giving up equity without payment.'},{q:'Will I have to pay Stamp Duty?',a:'Only if the consideration exceeds current SDLT thresholds. Divorce transfers are usually exempt.'}], related:['death-of-joint-proprietor','transfer-of-equity-wills-probate','applying-for-restriction'] },
  'death-of-joint-proprietor': { title:'Death of a Joint Proprietor', price:'£400', tag:'Remove a deceased joint owner from the property deeds.', desc:'When a joint owner passes away, the property passes to the surviving owner. This service removes the deceased from the official register.', whoFor:['Surviving spouses or civil partners','Executors handling a deceased person\'s estate','Surviving children who inherited joint property'], included:['Title Deeds and Death Certificate review','Land Registry application (Form DJP)','Direct filing with HM Land Registry','Updated Title Register delivery'], timeline:'2–4 weeks', mortgage:'The lender needs formal notification. We manage this smoothly.', stampDuty:'No SDLT is payable for removing a name following death.', steps:[{n:'Certificate Review',d:'We verify the official Death Certificate.'},{n:'DJP Form',d:'We prepare the official Form DJP.'},{n:'Registry Submission',d:'We submit the application with certified certificates.'},{n:'Title Update',d:'We deliver the new Title Register.'}], faqs:[{q:'What\'s the difference between Joint Tenants and Tenants in Common?',a:'Joint Tenants: property passes automatically. Tenants in Common: share passes via Will.'},{q:'What documents are required?',a:'Original or certified Death Certificate or Grant of Probate.'}], related:['transfer-of-equity-wills-probate','name-change','removal-of-restriction'] },
  'name-change': { title:'Name Change on Deeds', price:'£150', tag:'Update your legal name on property records.', desc:'Ensure your property records match your current legal name — whether due to marriage, divorce, or deed poll.', whoFor:['Recently married or civil partnership individuals','Divorced individuals reverting to maiden name','Anyone who changed name via Deed Poll'], included:['Current Land Register review','Application to Change Name (Form AP1)','Certified evidence submission','Updated Title Register delivery'], timeline:'2–3 weeks', mortgage:'We notify the lender of your name change. No lender fees required.', stampDuty:'Name changes are administrative only. No SDLT applicable.', steps:[{n:'Verify Proofs',d:'We collect your Marriage Certificate, Decree Absolute, or Deed Poll.'},{n:'Prepare Application',d:'We draft the official Form AP1.'},{n:'Submit to Registry',d:'We upload documents to the Land Registry system.'},{n:'Deliver Updated Title',d:'We retrieve your new deeds showing the corrected name.'}], faqs:[{q:'Is a certified copy of my marriage certificate enough?',a:'Yes. We certify the copy and upload it electronically.'},{q:'Can I change my name as a joint owner?',a:'Yes. Only the owner who changed their name needs to sign.'}], related:['death-of-joint-proprietor','removal-of-restriction','applying-for-restriction'] },
  'removal-of-restriction': { title:'Removal of a Restriction', price:'£350', tag:'Clear outdated charges or restrictions from your deeds.', desc:'Restrictions and cautions can prevent selling or mortgaging your home. We remove outdated restrictions when no longer applicable.', whoFor:['Homeowners who paid off a private loan','Sole surviving owners removing a TIC restriction','Owners with outdated restrictions'], included:['Restriction clause analysis','Form RX3/RX4 preparation','Release/consent evidence','Filing and monitoring with Land Registry'], timeline:'3–6 weeks', mortgage:'If a lender placed a Restriction, we coordinate the release document.', stampDuty:'No SDLT associated with removing restrictions.', steps:[{n:'Deed Inspection',d:'We isolate the specific restriction wording.'},{n:'Gather Evidence',d:'We obtain consent, deed of release, or proof of payment.'},{n:'Prepare Forms',d:'We prepare RX3/RX4 forms based on restriction type.'},{n:'Submit Application',d:'We file and monitor responses from Land Registry.'}], faqs:[{q:'What is a Form A restriction?',a:'It prevents a sole owner from selling without appointing a second trustee. Can be removed if you are the sole legal and beneficial owner.'},{q:'What if the restriction holder refuses to cooperate?',a:'We can file a unilateral application for cancellation with proof the conditions have been satisfied.'}], related:['applying-for-restriction','transfer-of-equity','first-registration'] },
  'transfer-of-equity-wills-probate': { title:'Transfer of Equity (Wills / Probate)', price:'£450', tag:'Transfer inherited property to executors or beneficiaries.', desc:'Following probate, property titles must be updated to transfer ownership to beneficiaries or executors.', whoFor:['Executors transferring property to beneficiaries','Administrators transferring under intestacy rules','Beneficiaries buying out other heirs'], included:['Grant of Probate validation','Assent (Form AS1) or Transfer Deed (TR1)','Stamp Duty declaration','ID verification and Land Registry submission'], timeline:'4–8 weeks', mortgage:'If deceased had a mortgage, it must be paid off or the beneficiary must take over with lender consent.', stampDuty:'Inheriting via a Will (Assent) is typically exempt from SDLT.', steps:[{n:'Verify Probate',d:'We review the Grant of Probate or Letters of Administration.'},{n:'Assent Drafting',d:'We draft the official Assent (AS1) or Transfer Deed.'},{n:'Signatures & ID',d:'All parties verify identity and sign the deeds.'},{n:'Land Registry Filing',d:'We submit with Probate documentation.'}], faqs:[{q:'Do I need probate to transfer?',a:'Yes. HM Land Registry requires a Grant of Probate before updating title deeds.'},{q:'Can we sell immediately?',a:'You can sometimes sell directly as executor without registering yourselves first.'}], related:['death-of-joint-proprietor','transfer-of-equity','first-registration'] },
  'applying-for-restriction': { title:'Applying for a Restriction', price:'£350', tag:'Protect your trust or financial interest on property titles.', desc:'A Restriction prevents sale, transfer, or mortgage without compliance with specific conditions.', whoFor:['Co-owners establishing a trust deed','Private lenders securing a loan against property','Parents protecting gifted deposits'], included:['Restriction clause drafting','Application (Form RX1)','Proprietor consent','Restriction registration on Title Register'], timeline:'3–5 weeks', mortgage:'Your restriction sits behind the lender\'s charge. We manage notice requirements.', stampDuty:'No land tax or SDLT involved.', steps:[{n:'Define Wording',d:'We draft specific restriction wording.'},{n:'Prepare Form RX1',d:'We populate the Application for Restriction.'},{n:'Proprietor Consent',d:'We obtain signed consent from current owners.'},{n:'Filing & Confirmation',d:'We submit and deliver confirmation once active.'}], faqs:[{q:'Can I register without the owner\'s consent?',a:'Yes, with sufficient beneficial interest. The Registry will notify the owner.'},{q:'How does this protect my money?',a:'The restriction prevents registration of any purchase until your conditions are met.'}], related:['removal-of-restriction','transfer-of-equity','first-registration'] },
  'first-registration': { title:'First Registration', price:'£600', tag:'Register historic deeds with HM Land Registry.', desc:'If a property hasn\'t changed hands since the 1990s, it may still be unregistered. We register it electronically for modern security.', whoFor:['Owners of historic family properties','Executors dealing with unregistered land','Buyers of unregistered plots'], included:['Physical deeds review and scanning','Chain of title reconstruction','Form FR1 preparation','Scale Land Registry plan if needed','Full legal filing'], timeline:'6–12 weeks', mortgage:'Unregistered properties with mortgages require careful handling. We register the charge alongside ownership.', stampDuty:'Only applicable if registering a recent purchase. No SDLT for historic family ownership.', steps:[{n:'Deed Intake',d:'We audit your physical bundle of deeds.'},{n:'Epitome of Title',d:'We compile a chronological ownership summary.'},{n:'FR1 Drafting',d:'We complete FR1 forms and verify boundary plans.'},{n:'Registry Lodgement',d:'We securely submit the full packet.'}], faqs:[{q:'What if some historic deeds are missing?',a:'We draft a Statutory Declaration describing long-term ownership.'},{q:'Why should I register?',a:'It protects against adverse possession, prevents deed loss, and makes selling faster.'}], related:['transfer-of-equity-wills-probate','removal-of-restriction','applying-for-restriction'] }
};

export default function ServiceDetail() {
  const { id } = useParams();
  const [activeFaq, setActiveFaq] = useState(null);
  const s = DATA[id];
  if (!s) return <Navigate to="/" replace />;

  const schema = {"@context":"https://schema.org","@graph":[{"@type":"Service","name":s.title,"description":s.desc,"provider":{"@type":"LocalBusiness","name":"Landregistrytransfers.com","telephone":"+443335770077"},"offers":{"@type":"Offer","price":s.price.replace('£',''),"priceCurrency":"GBP","valueAddedTaxIncluded":true}},{"@type":"FAQPage","mainEntity":s.faqs.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))}]};

  return (
    <>
      <SEO title={`${s.title} — Fixed Fee Conveyancing`} description={s.tag} schemaJson={schema} />

      <section className="service-hero">
        <div className="hero-grid-pattern" />
        <div className="container service-hero-grid">
          <div>
            <span className="service-hero-badge">Fixed Price Service</span>
            <h1>{s.title}</h1>
            <p className="service-hero-desc">{s.desc}</p>

            <div className="price-card">
              <div>
                <div className="price-card-label">Fixed Conveyancing Fee</div>
                <div className="price-card-amount">{s.price}</div>
              </div>
              <span className="price-card-vat">VAT Included</span>
            </div>

            <div style={{ marginTop: 24, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to={`/apply/${id}`} className="btn-primary">
                Apply Online <ArrowRight size={14} />
              </Link>
              <a href="#enquiry-section" className="btn-secondary">
                Request Quote
              </a>
              <div className="timeline-badge-sm">
                <Clock size={16} style={{ color: 'var(--blue-500)' }} />
                <span><strong>Timeline:</strong> {s.timeline}</span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="service-illustration-frame">
              <div className="micro-grid-bg" />
              <img src={GIFS[id]} alt={s.title} className="service-gif-media" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
            <div className="content-card">
              <div className="micro-grid-bg" />
              <h3 className="content-card-title"><FileText size={18} /> Who This Is For</h3>
              <ul className="check-list">{s.whoFor.map((item,i)=>(<li key={i} className="check-item"><Check size={15} /><span>{item}</span></li>))}</ul>
            </div>

            <div className="content-card">
              <div className="micro-grid-bg" />
              <h3 className="content-card-title"><ShieldCheck size={18} style={{color:'var(--emerald-500)'}} /> What's Included</h3>
              <ul className="check-list">{s.included.map((item,i)=>(<li key={i} className="check-item"><Check size={15} /><span>{item}</span></li>))}</ul>
            </div>

            <div className="content-card">
              <div className="micro-grid-bg" />
              <h3 className="content-card-title"><Clock size={18} /> Step-by-Step Process</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:0, marginTop:8 }}>
                {s.steps.map((step,i)=>(<div key={i} className="process-step"><div className="process-step-num">{i+1}</div><div><h4 className="process-step-title">{step.n}</h4><p className="process-step-desc">{step.d}</p></div></div>))}
              </div>
            </div>

            <div className="content-card">
              <div className="micro-grid-bg" />
              <h3 className="content-card-title"><AlertCircle size={18} /> Important Notes</h3>
              <div className="note-grid">
                <div className="note-box"><h4>Mortgage & Lender Consent</h4><p>{s.mortgage}</p></div>
                <div className="note-box note-box-alt"><h4>Stamp Duty & Tax</h4><p>{s.stampDuty}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">Questions & Answers</h2>
          </div>
          <div className="faq-list">
            {s.faqs.map((faq,i)=>(<div key={i} className={`faq-item ${activeFaq===i?'active':''}`}><button className="faq-trigger" onClick={()=>setActiveFaq(activeFaq===i?null:i)}><span>{faq.q}</span><span className="faq-icon"><ChevronDown size={16}/></span></button>{activeFaq===i&&<div className="faq-answer"><p>{faq.a}</p></div>}</div>))}
          </div>
        </div>
      </section>

      {/* Dedicated Conversion Form Section */}
      <section className="section section-gray" id="enquiry-section">
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="section-header" style={{ marginBottom: 32 }}>
            <span className="section-eyebrow">Quote Request</span>
            <h2 className="section-title" style={{ fontSize: 32 }}>Start Your Transfer</h2>
            <p className="section-desc">Submit details about your property transfer below, and a specialist will contact you in under 1 hour.</p>
          </div>
          <EnquiryForm initialService={id} />
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 40 }}>
            <span className="section-eyebrow">Related</span>
            <h2 className="section-title" style={{ fontSize: 28 }}>Other Services</h2>
          </div>
          <div className="related-grid">
            {s.related.map(rid => { const r=DATA[rid]; if(!r) return null; return (
              <Link key={rid} to={`/services/${rid}`} className="related-card">
                <div className="micro-grid-bg" />
                <h4>{r.title}</h4>
                <p>{r.tag}</p>
                <div className="related-card-footer">
                  <span className="related-card-price">{r.price} <span style={{ fontSize: 9, color: 'var(--text-tertiary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>inc. VAT</span></span>
                  <span className="related-card-arrow">View <ArrowRight size={12}/></span>
                </div>
              </Link>
            ); })}
          </div>
        </div>
      </section>
    </>
  );
}
