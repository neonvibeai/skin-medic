'use client';

import React from 'react';
import Link from 'next/link';
import treatmentsData from '@/data/treatments.json';
import { Treatment } from '@/types';
import TreatmentContactSection, { TREATMENT_BOOKING_URL } from '@/components/TreatmentContactSection';
import {
  Sparkles,
  Calendar,
  MapPin,
  ArrowRight
} from 'lucide-react';

export default function TreatmentsPage() {
  const treatments = treatmentsData as Treatment[];

  return (
    <div className="bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100/90 min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — Matching Homepage Treatments Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a2240] text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            In-Clinic Aesthetic &amp; Medical Procedures
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0a2240]">
            Explore Our Treatments
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Discover the treatments available at our clinic. Each procedure is planned around your facial anatomy, concerns, and desired outcome, with medical-grade protocols and full aftercare support.
          </p>

          <div className="pt-1 flex items-center justify-center gap-2 text-xs text-slate-600 font-medium">
            <MapPin className="w-4 h-4 text-cyan-600" />
            <span>Skin Medic, 37 Portland Road, Hucknall, Nottingham, NG15 7SL</span>
          </div>
        </div>

        {/* 9 Treatments Grid — Identical to Homepage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {treatments.map((t) => {
            const priceLabel = t.priceHighlight
              ? t.priceHighlight.split(' per ')[0].split(' · ')[0]
              : t.pricingTable && t.pricingTable.length > 0
                ? `From ${t.pricingTable[0].price.replace(/^From\s*/i, '')}`
                : t.items && t.items.length > 0
                  ? `From ${t.items[0].price}`
                  : '';

            return (
              <Link
                key={t.id}
                href={`/treatments/${t.slug}`}
                className="group relative bg-gradient-to-br from-white via-cyan-50/45 to-blue-50/65 rounded-2xl overflow-hidden border border-cyan-500/35 ring-1 ring-[#0a2240]/5 hover:border-cyan-500/70 hover:ring-cyan-400/40 shadow-[0_10px_35px_-5px_rgba(10,34,64,0.10),0_0_24px_rgba(6,182,212,0.15)] hover:shadow-[0_20px_45px_-5px_rgba(10,34,64,0.18),0_0_34px_rgba(6,182,212,0.30)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between"
              >
                {/* Subtle inner glow orbs */}
                <div className="pointer-events-none absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-cyan-400/15 blur-2xl group-hover:bg-cyan-400/30 transition-all duration-500" />
                <div className="pointer-events-none absolute top-14 -left-10 w-28 h-28 rounded-full bg-blue-400/10 blur-2xl group-hover:bg-cyan-300/20 transition-all duration-500" />

                {/* Top Navy Header Strip */}
                <div className="relative z-10 bg-gradient-to-r from-[#0a2240] to-[#133863] px-6 py-4 flex items-center justify-between border-b border-cyan-400/25">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-white/15 border border-cyan-300/30 text-cyan-200">
                      {t.id}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-300">
                      Clinic Treatment
                    </span>
                  </div>
                  {priceLabel && (
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-cyan-400 text-slate-950 text-xs font-extrabold tracking-wide shadow-[0_0_12px_rgba(34,211,238,0.45)]">
                      {priceLabel}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="relative z-10 p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#0a2240] group-hover:text-cyan-800 transition-colors">
                      {t.title}
                    </h2>

                    <div className="text-sm font-serif italic text-cyan-800 font-medium mt-1.5">
                      {t.subtitle}
                    </div>

                    <p className="text-sm text-slate-700 mt-3.5 line-clamp-3 leading-relaxed">
                      {t.description.split('\n')[0]}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-cyan-900/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0a2240]">
                    <span className="group-hover:text-cyan-800 transition-colors">
                      View Treatment Details
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/90 border border-cyan-500/30 shadow-sm group-hover:bg-[#0a2240] group-hover:border-[#0a2240] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Consultation CTA */}
        <div className="mt-12 text-center">
          <a
            href={TREATMENT_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl bg-[#0a2240] hover:bg-[#123661] text-white font-semibold text-xs uppercase tracking-wider transition shadow-lg shadow-blue-950/20 inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-cyan-300" />
            Book Treatment Consultation
          </a>
        </div>

        {/* Shared Clinic Contact Section */}
        <TreatmentContactSection />
      </div>
    </div>
  );
}
