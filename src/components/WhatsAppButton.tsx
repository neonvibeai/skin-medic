'use client';

import React, { useEffect, useState } from 'react';
import { CLINIC_INFO } from '@/data/siteData';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    'Hello Skin Medic Skin Care! I would like to enquire about booking a free skincare consultation.'
  );

  // On phones the button slides away while the visitor scrolls down through
  // text and comes back when they scroll up, so it never sits over copy.
  const [hiddenOnMobile, setHiddenOnMobile] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 8) return;
      setHiddenOnMobile(y > lastY && y > 200);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside
      aria-label="WhatsApp quick chat"
      className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 group transition-transform duration-300 sm:translate-y-0 ${
        hiddenOnMobile ? 'translate-y-24' : 'translate-y-0'
      }`}
    >
      {/* Tooltip on hover */}
      <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-lg border border-slate-700 pointer-events-none">
        WhatsApp Roslyn Bolton
      </span>

      {/* Floating button */}
      <a
        href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 sm:w-14 sm:h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg sm:shadow-2xl hover:scale-110 transition-all duration-300 relative border-2 border-white"
        aria-label="WhatsApp Roslyn Bolton"
      >
        <span className="hidden sm:block absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-white animate-ping"></span>
        <span className="hidden sm:block absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-white"></span>
        <MessageSquare className="w-5 h-5 sm:w-7 sm:h-7 fill-white/20 stroke-white" />
      </a>
    </aside>
  );
}
