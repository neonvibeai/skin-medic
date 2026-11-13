'use client';

import React from 'react';
import Link from 'next/link';
import { CLINIC_INFO } from '@/data/siteData';
import { useConsultation } from '@/context/ConsultationContext';
import { ShieldCheck, Award, Heart, CheckCircle2, Calendar, MapPin } from 'lucide-react';

export default function AboutPage() {
  const { openConsultation } = useConsultation();

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0a2240]">
            Our Story & Medical Leadership
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight">
            We believe everyone deserves to feel confident in their own skin.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Founded by Roslyn Bolton, Registered Nurse and skin specialist, Skin Medic Skin Care bridges the gap between clinical dermatological expertise and accessible home skincare routines.
          </p>
        </div>

        {/* Founder Bio Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Avatar / Photo */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="w-52 h-52 rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-200">
                <img
                  src="/images/roslyn-bolton.jpg"
                  alt="Roslyn Bolton - Registered Nurse & Skin Specialist"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Details */}
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-bold text-[#0a2240] uppercase tracking-widest">
                Registered Nurse & Skin Specialist, Founder
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Roslyn Bolton
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                With years of experience in skin care, Roslyn offers a professional, personalised approach, taking time to understand your skin concerns and guide you through your skincare routine.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Known for her compassionate approach and deep expertise, she has become a trusted name in clinical skincare. She believes that healthy skin requires an expert-led, tailored strategy—not generic trends.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#0a2240] font-semibold">
                  ✓ Certified ZO® Skin Health Expert
                </span>
                <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#0a2240] font-semibold">
                  ✓ Certified Obagi® Medical Prescriber
                </span>
                <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#0a2240] font-semibold">
                  ✓ UK Registered Healthcare Practitioner
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinic Mission & Medical Efficacy */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0a2240]">
            Our Mission & Clinical Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 leading-snug">
            Bridging the gap between the dermatologist&apos;s office and your daily routine.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            Skin Medic Skin Care Clinic is your dedicated partner in achieving optimal skin health, offering a curated range of medical-grade skincare solutions that bridge the gap between the dermatologist&apos;s office and your daily routine. Our clinically formulated products are powered by pharmaceutical-grade concentrations of proven active ingredients, meticulously designed to deliver visible, transformative results for concerns like ageing, acne, hyperpigmentation, and sensitivity. More than just products, we provide a professional, guided approach to skincare, empowering you with the effective tools and expert knowledge necessary to reveal a healthier, more radiant, and confident complexion. This is where clinical efficacy meets personalised care, ensuring your skin receives the professional treatment it deserves.
          </p>
        </div>

        {/* Our Standards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <h3 className="font-serif font-bold text-base text-slate-900">Medical-Grade Integrity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never recommend products without first understanding your skin history, lifestyle, and sensitivities.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <h3 className="font-serif font-bold text-base text-slate-900">Patient-First Care</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consultations are 100% complimentary with zero purchase obligation. Our priority is correct clinical guidance.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <h3 className="font-serif font-bold text-base text-slate-900">Ongoing Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your skin evolves; so should your routine. We provide check-ins and step-up adjustments throughout your journey.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => openConsultation()}
            className="px-8 py-3.5 rounded-xl bg-[#0a2240] text-white font-bold text-sm hover:bg-[#123661] shadow-lg transition inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-cyan-300" />
            Book a Consultation with Roslyn Bolton
          </button>
        </div>
      </div>
    </div>
  );
}
