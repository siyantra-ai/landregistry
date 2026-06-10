import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Clock, Award, Heart, Target } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO title="About Our Property Transfer Specialists" description="Meet the team behind LandRegistryTransfers.com — professional conveyancing experts making property deed changes simple." />

      {/* Hero */}
      <section className="service-hero" style={{ paddingBottom: 60 }}>
        <div className="hero-grid-pattern" />
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 720, textAlign: 'center' }}>
          <span className="service-hero-badge">About Us</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>About Land Registry Transfers</h1>
          <p className="service-hero-desc" style={{ maxWidth: 540, margin: '16px auto 0' }}>
            We make property deed changes fast, transparent, and affordable for everyone in the UK.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Values</span>
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-desc">Every decision we make is guided by these core principles.</p>
          </div>

          <div className="features-grid" style={{ gap: 20 }}>
            {[
              { icon: <Target size={22} />, title: 'Radical Transparency', desc: 'Fixed fees displayed upfront. No call to find out. No hidden extras. You know what you\'re paying before you start.' },
              { icon: <Heart size={22} />, title: 'Human-First Service', desc: 'Every client gets direct access to a named specialist. No call centres, no ticket queues. Real people solving real problems.' },
              { icon: <Clock size={22} />, title: 'Speed as Standard', desc: 'Most applications are drafted within 3–5 working days. We file electronically whenever possible for faster registry processing.' },
              { icon: <Shield size={22} />, title: 'Regulated & Insured', desc: 'All work is handled by regulated firms with Professional Indemnity Insurance up to £3,000,000.' },
              { icon: <Award size={22} />, title: 'Deep Expertise', desc: 'Our team of conveyancing experts has collectively filed thousands of HM Land Registry applications.' },
              { icon: <Users size={22} />, title: 'Built on Trust', desc: '4.9/5 rating from 10,000+ completed transfers. Our reputation is our most valuable asset.' }
            ].map((v, i) => (
              <div key={i} className="feature-card">
                <div className="micro-grid-bg" />
                <div className="feature-icon">
                  {v.icon}
                </div>
                <h3 className="feature-name">{v.title}</h3>
                <p className="feature-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <h2 className="section-title" style={{ color: 'white', marginBottom: 16 }}>Ready to Get Started?</h2>
          <p className="section-desc" style={{ marginBottom: 32 }}>Pick a service and get your free quote in under 60 seconds.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/#services" className="btn-primary btn-lg">
              View Services <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-secondary btn-lg" style={{ background: 'rgba(255,255,255,0.06)', color: 'white', borderColor: 'rgba(255,255,255,0.12)' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
