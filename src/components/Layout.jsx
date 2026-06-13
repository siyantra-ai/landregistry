import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CallbackModal from './CallbackModal';

export default function Layout({ children }) {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <div className="app-layout">
      <Header onRequestCallback={() => setCallbackOpen(true)} />
      <main className="app-main">{children}</main>
      <Footer />
      <CallbackModal isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </div>
  );
}
