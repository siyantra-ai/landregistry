import React from 'react';
import { Phone, Calendar, MessageCircle } from 'lucide-react';

export default function StickyMobileBar({ onRequestCallback }) {
  const phoneNumber = '02079460192'; // +44 20 7946 0192
  const whatsAppNumber = '442079460192';
  const defaultWhatsAppMsg = encodeURIComponent("Hello, I have a land registry transfer query.");
  const whatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${defaultWhatsAppMsg}`;

  return (
    <div className="sticky-mobile-bar">
      <a href={`tel:${phoneNumber}`} className="mobile-bar-btn" aria-label="Call Land Registry team">
        <Phone />
        <span>Call Us</span>
      </a>
      
      <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="mobile-bar-btn" aria-label="Chat on WhatsApp">
        <MessageCircle style={{ color: '#25D366' }} />
        <span>WhatsApp</span>
      </a>

      <button onClick={onRequestCallback} className="mobile-bar-btn mobile-bar-btn-primary" aria-label="Request call back">
        <Calendar />
        <span>Request Callback</span>
      </button>
    </div>
  );
}
