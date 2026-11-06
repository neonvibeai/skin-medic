'use client';

import React from 'react';
import { CLINIC_INFO } from '@/data/siteData';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    'Hello Skin Medic Skin Care! I would like to enquire about booking a free skincare consultation.'
  );

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      {/* Tooltip on hover */}
      <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-lg border border-slate-700 pointer-events-none">
        WhatsApp Roslyn Bolton
      </span>

      {/* Floating button */}
      <a
        href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 relative border-2 border-white"
        aria-label="WhatsApp Roslyn Bolton"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-white animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-white"></span>
        <MessageSquare className="w-7 h-7 fill-white/20 stroke-white" />
      </a>
    </aside>
  );
}
