import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import ApplyWizard from './pages/ApplyWizard';

// Scroll to top helper on page/route transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const VALID_WIZARD_SERVICES = [
  'transfer-of-equity',
  'death-of-joint-proprietor',
  'deceased-joint-proprietor',
  'name-change',
  'removal-of-restriction',
  'transfer-of-equity-wills-probate',
  'applying-for-restriction',
  'first-registration'
];

// Redirect helper for /apply/:serviceId to /apply/:serviceId/step/1
function ApplyRedirect() {
  const { serviceId } = useParams();
  if (VALID_WIZARD_SERVICES.includes(serviceId)) {
    return <Navigate to={`/apply/${serviceId}/step/1`} replace />;
  }
  return <Navigate to={`/?select=${serviceId}`} replace />;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply/:serviceId/step/:stepId" element={<ApplyWizard />} />
          <Route path="/apply/:serviceId" element={<ApplyRedirect />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/cookies" element={<Legal />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

