import React from 'react';
import { ShieldCheck, Award, Users, Scale, FileText, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO 
        title="About Us - Property Title Deed Specialists" 
        description="Learn about Land Registry Transfers. We are an online conveyancing portal specializing in fast, fixed-fee property deed changes and registrations."
      />

      {/* Hero Header */}
      <section className="service-detail-hero" style={{ textAlign: 'center', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <span className="service-badge">Our Company</span>
          <h1 className="service-title-h1">Conveyancing Made Simple</h1>
          <p className="hero-subtitle">
            We are built on transparency, fixed fees, and exceptional speed.
          </p>
        </div>
      </section>

      {/* Core Section */}
      <section className="section section-light" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, alignItems: 'center' }}>
            
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 16 }}>Who We Are</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: 15, lineHeight: 1.7 }}>
                Land Registry Transfers was created to solve a common headache in UK property management: the slow, opaque, and expensive process of updating property deeds. 
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 15, lineHeight: 1.7 }}>
                Instead of dealing with traditional hourly legal rates and convoluted legal paperwork, we provide a modern online portal. We handle everything from Transfer of Equity to removing restrictions at flat, transparent fees that include VAT.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ padding: 20, backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <h4 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 6 }}>10,000+</h4>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Successful Registrations</p>
                </div>
                <div style={{ padding: 20, backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <h4 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 6 }}>100% Fixed</h4>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Guaranteed Fees (Inc. VAT)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Philosophy / Values */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Core Pillars</span>
            <h2 className="section-title">Our Operational Philosophy</h2>
            <p className="section-desc">We operate on three simple commitments to our clients.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 30 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
              {[
                { icon: <Scale size={20} />, title: 'Absolute Transparency', text: 'Traditional solicitors quote "estimates" that quickly snowball with disbursements. We quote a single, fixed fee that includes VAT. You know exactly what you are paying from day one.' },
                { icon: <ShieldCheck size={20} />, title: 'Compliance & Safety First', text: 'All property filings undergo rigorous quality audits. We strictly adhere to HM Land Registry guidelines, Anti-Money Laundering (AML) standards, and Form ID1 identification protocols.' },
                { icon: <Award size={20} />, title: 'Proactive Communications', text: 'We submit all files electronically through the Land Registry business portal. We update you at every key stage of your transfer, Assent, or registration.' }
              ].map((value, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 16, padding: 24, backgroundColor: 'var(--light-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'fit-content', padding: 10, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--primary-light)' }}>
                    {value.icon}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-main)', marginBottom: 8 }}>{value.title}</h4>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{value.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
