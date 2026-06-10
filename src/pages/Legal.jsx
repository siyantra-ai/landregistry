import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Legal() {
  const { pathname } = useLocation();
  const dateUpdated = 'June 10, 2026';

  // Privacy Policy Content
  if (pathname === '/privacy') {
    return (
      <>
        <SEO title="Privacy Policy" description="Privacy policy and data protection guidelines for Land Registry Transfers UK." />
        <section className="section section-light">
          <div className="container">
            <div className="legal-wrapper">
              <h1 className="legal-title">Privacy Policy</h1>
              <div className="legal-meta">Last Updated: {dateUpdated}</div>
              
              <div className="legal-content">
                <p>Land Registry Transfers ("we", "our", "us") is committed to protecting and respecting your privacy. This policy sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed.</p>
                
                <h2>1. Information We Collect</h2>
                <p>We may collect and process the following data about you:</p>
                <ul>
                  <li>Information you provide by filling in forms on our website (including enquiries, callbacks, and quote requests). This includes name, phone number, email address, property details, and mortgage status.</li>
                  <li>Records of correspondence if you contact us.</li>
                  <li>Details of your visits to our site including traffic data, location data, and resources accessed.</li>
                </ul>

                <h2>2. How We Use the Information</h2>
                <p>We use information held about you in the following ways:</p>
                <ul>
                  <li>To provide you with information, quotes, or services that you request from us.</li>
                  <li>To introduce you to our regulated panel conveyancing firms who will execute your legal filings.</li>
                  <li>To notify you about updates or progress on your application.</li>
                </ul>

                <h2>3. Data Storage and Retention</h2>
                <p>All personal data is stored securely. We retain customer information only as long as necessary to comply with legal compliance, anti-money laundering audit requirements, and to service your enquiries.</p>

                <h2>4. Your Rights</h2>
                <p>Under the UK General Data Protection Regulation (GDPR), you have the right to access, rectify, or request the deletion of your personal data held by us. Contact our support team to exercise these rights.</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Terms & Conditions Content
  if (pathname === '/terms') {
    return (
      <>
        <SEO title="Terms & Conditions" description="Terms of service and conditions of use for Land Registry Transfers." />
        <section className="section section-light">
          <div className="container">
            <div className="legal-wrapper">
              <h1 className="legal-title">Terms & Conditions</h1>
              <div className="legal-meta">Last Updated: {dateUpdated}</div>

              <div className="legal-content">
                <p>Please read these Terms and Conditions carefully before using our conveyancing service portal.</p>

                <h2>1. Service Scope</h2>
                <p>Land Registry Transfers is a private online portal connecting users to property title specialists and regulated conveyancing solicitors. We are not HM Land Registry, nor are we a government agency. Our fee covers documentation preparation, compliance reviews, and submission management.</p>

                <h2>2. Fixed Fee Guarantee</h2>
                <p>The prices stated on our portal are fixed and inclusive of VAT. These fees cover standard, uncontested applications. If your application becomes contested, requires complex boundary disputes, or involves litigation, additional legal fees may apply, which will be fully disclosed beforehand.</p>

                <h2>3. User Responsibilities</h2>
                <p>Users must provide accurate, complete, and true information. You agree to cooperate with all necessary identity verification steps (such as Form ID1 or digital ID checks) to comply with HM Land Registry anti-fraud guidelines.</p>

                <h2>4. Limitation of Liability</h2>
                <p>While we exert every effort to guarantee swift and accurate submissions, we are not liable for Land Registry backlogs, delays caused by third-party mortgage lenders, or errors in historical records provided by you.</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Cookie Policy Content
  if (pathname === '/cookies') {
    return (
      <>
        <SEO title="Cookie Policy" description="Cookie policy and website analytics statement for Land Registry Transfers." />
        <section className="section section-light">
          <div className="container">
            <div className="legal-wrapper">
              <h1 className="legal-title">Cookie Policy</h1>
              <div className="legal-meta">Last Updated: {dateUpdated}</div>

              <div className="legal-content">
                <p>Our website uses cookies to distinguish you from other users. This helps us to provide you with a good experience when you browse and allows us to improve our portal.</p>

                <h2>1. What are Cookies?</h2>
                <p>Cookies are small text files stored on your computer or mobile device when you visit web pages. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information.</p>

                <h2>2. Types of Cookies We Use</h2>
                <ul>
                  <li><strong>Strictly Necessary Cookies:</strong> Required for the basic functioning of the website (e.g. rendering pages and security).</li>
                  <li><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how they move around the site to improve user journeys.</li>
                  <li><strong>Functional Cookies:</strong> Used to recognize you when you return to our website to remember your preferences (e.g. selected service choice).</li>
                </ul>

                <h2>3. Managing Cookies</h2>
                <p>You can block cookies by activating the setting on your browser that allows you to refuse all or some cookies. However, if you block all cookies, you may not be able to access all parts of our site or submit forms successfully.</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Default redirect / sitemap
  return <Navigate to="/" replace />;
}
