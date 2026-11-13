'use client';

import React, { useState } from 'react';
import faqsData from '@/data/faqs.json';
import { useConsultation } from '@/context/ConsultationContext';
import { ChevronDown, Calendar } from 'lucide-react';

export default function FAQClient() {
  const { openConsultation } = useConsultation();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0a2240]">
            Help &amp; Guidance
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed text-left sm:text-center">
            Have questions about our medical products, prescription guidelines, consultations, or how Skin Medic works? Find clear answers below.
          </p>
        </div>

        {/* FAQs Accordion — all answers stay present in DOM/HTML for SEO & accessibility */}
        <div className="space-y-4">
          {faqsData.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-slate-900 hover:text-[#0a2240] transition"
                >
                  <span>{f.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0a2240]' : ''
                    }`}
                  />
                </button>

                <div
                  className={`px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                >
                  {f.answer}
                </div>
              </div>
            );
          })}
        </div>

        {/* Medical Policy Box */}
        <div className="bg-gradient-to-r from-[#0a2240] to-[#123866] text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-xl text-white">
              Still have questions about your skin?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md">
              Speak directly with Roslyn Bolton during a free, friendly 30-minute video appointment.
            </p>
          </div>
          <button
            onClick={() => openConsultation()}
            className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition shrink-0 inline-flex items-center gap-2 shadow-md"
          >
            <Calendar className="w-4 h-4 text-slate-950" />
            Book Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
