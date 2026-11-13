'use client';

import React from 'react';
import Link from 'next/link';
import { useConsultation } from '@/context/ConsultationContext';
import { Video, FileText, Truck, Sparkles, Calendar, CheckCircle } from 'lucide-react';

export default function HowItWorksPage() {
  const { openConsultation } = useConsultation();

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0a2240]">
            The Skin Medic Journey
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Skincare Made Simple, Effective & Personal
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Healthy, radiant skin shouldn&apos;t be complicated. Here is how our 3-step consultation and home delivery process works for you.
          </p>
        </div>

        {/* 3 Step Timeline Cards */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0a2240] flex items-center justify-center font-bold text-xl shrink-0">
              01
            </div>
            <div className="space-y-2 flex-1">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                Step One
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Book Your Free Video Consultation
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Schedule a 30-minute virtual appointment with Roslyn Bolton or our certified Skin Specialists. You can connect from anywhere in the UK via phone, Zoom, or WhatsApp. We assess your skin condition, discuss concerns (acne, pigmentation, wrinkles, sensitivity), and review your medical history.
              </p>
              <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>100% complimentary • Zero purchase commitment</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0a2240] flex items-center justify-center font-bold text-xl shrink-0">
              02
            </div>
            <div className="space-y-2 flex-1">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                Step Two
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Receive Your Tailored Medical Skincare Plan
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Following your assessment, your practitioner crafts a bespoke regimen featuring medical-grade active products (primarily ZO® Skin Health and Obagi® Medical). You receive complete morning and evening step-by-step instructions.
              </p>
              <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Customized dosages, step-up protocols & sun protection</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0a2240] flex items-center justify-center font-bold text-xl shrink-0">
              03
            </div>
            <div className="space-y-2 flex-1">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                Step Three
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Direct UK Delivery & Ongoing Support
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Once approved, your products are dispatched directly from our Nottingham clinic with next-day courier delivery. Your Skin Specialist provides continuous check-ins and monitors your skin transformation.
              </p>
              <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Free delivery over £100 • Unlimited aftercare questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-[#0a2240] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <h3 className="font-serif font-bold text-2xl text-white">
            Ready to Begin Your Skincare Journey?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Take the first step to healthier, glowing skin. Book your consultation today and we will design a personalised plan just for you.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openConsultation()}
              className="px-8 py-3.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm hover:bg-cyan-300 transition shadow-lg inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              Book Your Free Consultation Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
