import React from 'react';
import { Phone, Calendar, MessageCircle } from 'lucide-react';

export default function StickyMobileBar({ onRequestCallback }) {
  return (
    <div className="mobile-sticky">
      <a href="tel:03335770077" className="mobile-sticky-btn" aria-label="Call us">
        <Phone size={18} />
        <span>Call</span>
      </a>
      <a href="https://wa.me/443335770077?text=Hello%2C%20I%20have%20a%20land%20registry%20query." target="_blank" rel="noopener noreferrer" className="mobile-sticky-btn" aria-label="WhatsApp">
        <MessageCircle size={18} style={{ color: '#25D366' }} />
        <span>WhatsApp</span>
      </a>
      <button onClick={onRequestCallback} className="mobile-sticky-btn mobile-sticky-btn-primary" aria-label="Request callback">
        <Calendar size={18} />
        <span>Callback</span>
      </button>
    </div>
  );
}
