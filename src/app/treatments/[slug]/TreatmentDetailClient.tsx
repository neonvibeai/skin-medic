'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Treatment } from '@/types';
import TreatmentContactSection, { TREATMENT_BOOKING_URL } from '@/components/TreatmentContactSection';
import {
  ChevronRight,
  ChevronDown,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface Props {
  treatment: Treatment;
}

export default function TreatmentDetailClient({ treatment }: Props) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // All "Book…" buttons on treatment pages point to the dedicated external Aesthetic Nurse Software booking portal
  const bookingHref = (_itemName?: string) => TREATMENT_BOOKING_URL;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-slate-900 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/treatments" className="hover:text-slate-900 transition">
            Treatments
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate">
            {treatment.title}
          </span>
        </nav>

        {/* Hero / Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
              In-Clinic Procedure
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-slate-900 tracking-tight">
            {treatment.title}
          </h1>

          <p className="text-lg sm:text-xl font-serif italic text-[#0a2240] font-light mt-2 mb-6">
            {treatment.subtitle}
          </p>

          <div className="space-y-4 text-slate-600 font-light text-base sm:text-lg leading-relaxed border-t border-slate-100 pt-6">
            {treatment.description.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
            <a
              href={bookingHref()}
              target="_blank"
              rel="noopener"
              className="px-8 py-3.5 rounded-xl bg-[#0a2240] hover:bg-[#123661] text-white text-xs font-semibold tracking-wider uppercase transition shadow-lg flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-cyan-300" />
              Book a treatment
            </a>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full medical assessment prior to treatment</span>
            </div>
          </div>
        </div>

        {/* Treatments & Prices Section */}
        {treatment.pricingTable && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm mb-10">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0a2240]">
                Pricing & Structure
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 mt-1">
                {treatment.pricingSectionTitle || 'Treatments & Prices'}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/70">
                    <th className="py-3 px-4">Treatment / Concern</th>
                    {treatment.pricingTable.some((row) => row.amount) && (
                      <th className="py-3 px-4">Amount</th>
                    )}
                    <th className="py-3 px-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {treatment.pricingTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="py-4 px-4 font-medium text-slate-900">
                        {row.name}
                      </td>
                      {treatment.pricingTable?.some((r) => r.amount) && (
                        <td className="py-4 px-4 text-slate-500 font-light">
                          {row.amount || '—'}
                        </td>
                      )}
                      <td className="py-4 px-4 text-right font-serif font-semibold text-[#0a2240]">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {treatment.pricingNote && (
              <p className="text-xs text-slate-500 italic mt-4 pt-4 border-t border-slate-100">
                {treatment.pricingNote}
              </p>
            )}
          </div>
        )}

        {/* Price Highlight (e.g. Profhilo, HArmonyCa, Sculptra, Microneedling) */}
        {treatment.priceHighlight && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0a2240]">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 mt-1 mb-4">
              {treatment.pricingSectionTitle || 'Treatment & Price'}
            </h2>

            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-[#0a2240]">
                  {treatment.priceHighlight}
                </div>
                {treatment.pricingDetails && (
                  <div className="mt-3 space-y-2 text-sm text-slate-600 font-light leading-relaxed max-w-xl">
                    {treatment.pricingDetails.split('\n\n').map((par, i) => (
                      <p key={i}>{par}</p>
                    ))}
                  </div>
                )}
              </div>

              <a
                href={bookingHref()}
                target="_blank"
                rel="noopener"
                className="shrink-0 px-6 py-3.5 rounded-xl bg-[#0a2240] hover:bg-[#123661] text-white font-semibold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-cyan-300" />
                Book a treatment
              </a>
            </div>
          </div>
        )}

        {/* Facial Items Cards (for Obagi Facials and ZO Skin Health Facials) */}
        {treatment.items && treatment.items.length > 0 && (
          <div className="space-y-6 mb-10">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0a2240]">
                Individual Treatments
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 mt-1">
                Clinical Facial Protocols
              </h2>
              <p className="text-sm text-slate-500 font-light mt-1">
                Each facial is custom-adapted to your skin profile and conducted under clinical standards.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {treatment.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-300 transition"
                >
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-serif font-bold text-slate-400">
                        #{idx + 1}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-normal text-slate-900">
                        {item.name}
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm text-slate-600 font-light leading-relaxed">
                      {item.description.split('\n\n').map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-1">
                      {item.duration && (
                        <div className="flex items-center gap-1.5 text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-md">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.duration}</span>
                        </div>
                      )}
                      <div className="font-serif font-bold text-base text-[#0a2240]">
                        {item.price}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <a
                      href={bookingHref(item.name)}
                      target="_blank"
                      rel="noopener"
                      className="w-full md:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-[#0a2240] text-white text-xs font-semibold tracking-wider uppercase transition shadow-sm flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                      Book a treatment
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expandable FAQs Accordion */}
        {treatment.faqs && treatment.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm mb-10">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0a2240]">
                Patient Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 mt-1">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-500 font-light mt-1">
                Essential clinical guidance regarding procedure, expectations, and aftercare.
              </p>
            </div>

            <div className="space-y-3">
              {treatment.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200/80 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition"
                    >
                      <span className="font-serif font-medium text-base sm:text-lg text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-[#0a2240]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-5 sm:p-6 bg-white border-t border-slate-100 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Treatment-Specific CTA Box */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-3xl p-8 sm:p-10 text-center space-y-4 mb-6">
          <h3 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900">
            {treatment.ctaTitle}
          </h3>
          {treatment.ctaDescription && (
            <p className="text-sm sm:text-base text-slate-600 font-light max-w-xl mx-auto">
              {treatment.ctaDescription}
            </p>
          )}
          <div className="pt-2">
            <a
              href={bookingHref()}
              target="_blank"
              rel="noopener"
              className="px-8 py-3.5 rounded-xl bg-[#0a2240] hover:bg-[#123661] text-white text-xs font-bold uppercase tracking-wider transition shadow-lg inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-cyan-300" />
              Book a treatment
            </a>
          </div>
        </div>

        {/* Shared Clinic Contact Section on Every Treatment Page */}
        <TreatmentContactSection treatmentTitle={treatment.title} />
      </div>
    </div>
  );
}
