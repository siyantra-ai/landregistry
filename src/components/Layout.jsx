import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import CallbackModal from './CallbackModal';

export default function Layout({ children }) {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <div className="app-layout">
      <div className="compliance-notice-bar">
        We are an independent service. Not affiliated with HM Land Registry or the UK Government. The same documents are available from gov.uk for £7.
      </div>
      <Header onRequestCallback={() => setCallbackOpen(true)} />
      <main className="app-main">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CallbackModal isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </div>
  );
}
