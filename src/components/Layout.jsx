import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import StickyMobileBar from './StickyMobileBar';
import WhatsAppButton from './WhatsAppButton';
import CallbackModal from './CallbackModal';

export default function Layout({ children }) {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  const openCallback = () => setIsCallbackOpen(true);
  const closeCallback = () => setIsCallbackOpen(false);

  return (
    <div className="app-container">
      <Header onRequestCallback={openCallback} />
      
      <main className="main-content">
        {children}
      </main>

      <Footer />
      
      {/* Floating Utilities */}
      <WhatsAppButton />
      <StickyMobileBar onRequestCallback={openCallback} />
      
      {/* Callback request modal popup */}
      <CallbackModal isOpen={isCallbackOpen} onClose={closeCallback} />
    </div>
  );
}
