'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { CLINIC_INFO, REVIEWS } from '@/data/siteData';
import { useConsultation } from '@/context/ConsultationContext';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import Carousel3D from '@/components/Carousel3D';
import ParallaxBanner from '@/components/ParallaxBanner';
import productsData from '@/data/products.json';
import treatmentsData from '@/data/treatments.json';
import { Product, Treatment } from '@/types';
import {
  Sparkles,
  Calendar,
  CheckCircle,
  FileText,
  Star,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  MessageSquare,
  Clock,
  Tag
} from 'lucide-react';

export default function HomePage() {
  const { openConsultation } = useConsultation();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cast products
  const allProducts = productsData as Product[];

  // Primary ZO products (Showcasing ZO prominently, excluding Most Loved to avoid duplicates!)
  const mostLovedZOIds = ['6449', '6471', '6491', '6519', '6564'];
  const mostLovedObagiIds = ['6092', '6259', '6241', '6197', '6219', '6224', '6292', '6303'];

  const zoProducts = allProducts.filter((p) => p.brand === 'ZO Skin Health');
  const featuredZO = zoProducts.filter((p) => !mostLovedZOIds.includes(p.id)).slice(0, 8);

  // Obagi products (Secondary brand spotlight, excluding Most Loved to avoid duplicates!)
  const obagiProducts = allProducts.filter((p) => p.brand === 'Obagi Medical');
  const featuredObagi = obagiProducts.filter((p) => !mostLovedObagiIds.includes(p.id)).slice(0, 4);

  const mostLovedZO = mostLovedZOIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const mostLovedObagi = mostLovedObagiIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. HERO SECTION (Clean White Background + 3D Carousel) */}
      <section className="relative overflow-hidden bg-white text-slate-900 pt-8 pb-14 sm:pb-20 lg:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column (above carousel in stacking order) */}
            <div className="lg:col-span-6 relative z-20 min-w-0 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0a2240] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span>EXPERT CARE. YOUR SKIN FIRST.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-slate-900 leading-[1.15]">
                Advanced Skincare <br />
                <span className="text-[#0a2240]">
                  Backed by Science
                </span>
              </h1>

              {/* Exact Copy from Prompt Point 3 */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light text-left">
                Book a complimentary video consultation with our skin specialists and discover a personalised skincare routine with ZO<sup className="text-[0.6em] font-normal">®</sup>{'\u00A0'}Skin{'\u00A0'}Health and Obagi<sup className="text-[0.6em] font-normal">®</sup> Medical. Explore science-led skincare, with professional guidance to help you understand your skin and choose a routine suited to your needs.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => openConsultation()}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0a2240] hover:bg-[#123661] text-white font-bold text-sm shadow-xl shadow-blue-950/15 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-cyan-300" />
                  Free skincare consultation
                </button>

                <a
                  href="#treatments"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 hover:border-[#0a2240] transition flex items-center justify-center gap-2"
                >
                  Explore Our Treatments
                  <ArrowRight className="w-4 h-4 text-[#0a2240]" />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
                <div>
                  <div className="text-lg sm:text-2xl font-bold font-serif text-slate-900">4.9 / 5.0</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight mt-0.5">Google Verified Rating</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold font-serif text-[#0a2240] leading-tight">Expert Guidance</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight mt-0.5">Personalised Skincare Support</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold font-serif text-slate-900">100%</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight mt-0.5">Medical-Grade Formulas</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Carousel (width-capped, contained) */}
            <div className="lg:col-span-6 relative z-10 min-w-0 w-full max-w-[560px] mx-auto lg:mr-0">
              <Carousel3D />
            </div>
          </div>
        </div>
      </section>

      {/* 2. WELCOME / FOUNDER SECTION WITH ROSLYN'S PHOTO AS FULL BACKGROUND + NAVY CLINICAL DIRECTOR CARD */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-[#07192f] text-white border-b border-slate-200">
        {/* Roslyn Bolton Genuine Photo as Background for the whole section */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/roslyn-bolton.jpg"
            alt="Roslyn Bolton - Skin Medic Clinical Director"
            className="w-full h-full object-cover object-[center_15%] sm:object-[right_20%] opacity-35 sm:opacity-40 filter brightness-90"
  width={682}
  height={1024}
  sizes="100vw"
/>
          {/* Subtle multi-layer gradient ensuring exceptional contrast and elegance */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06182f] via-[#06182f]/95 sm:via-[#06182f]/90 to-[#0a2240]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06182f] via-transparent to-[#06182f]/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top 2-Column: Left Text Description + Right Navy Clinical Director Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Welcome to a New Standard in Skincare
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-white leading-snug drop-shadow-sm">
                Where clinical efficacy meets personalised skin care.
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light text-left">
                Skin Medic Skin Care Clinic is your dedicated partner in achieving optimal skin health, offering a curated range of medical-grade skincare solutions that bridge the gap between the dermatologist&apos;s office and your daily routine. Our clinically formulated products are powered by pharmaceutical-grade concentrations of proven active ingredients, meticulously designed to deliver visible, transformative results for concerns like ageing, acne, hyperpigmentation, and sensitivity. More than just products, we provide a professional, guided approach to skincare, empowering you with the effective tools and expert knowledge necessary to reveal a healthier, more radiant, and confident complexion.
              </p>

              <div className="pt-3 border-t border-white/15">
                <div className="font-serif italic text-lg text-white">
                  Roslyn Bolton
                </div>
                <div className="text-xs text-cyan-300 font-medium tracking-wide uppercase mt-0.5">
                  Registered Nurse &amp; Skin Specialist, Founder of Skin Medic Skin Care
                </div>
              </div>
            </div>

            {/* Right Column: Granatowy Kafelek Clinical Director (Przeniesiony obok opisu Welcome) */}
            <div className="lg:col-span-5">
              <div className="bg-[#0a2240]/90 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  {/* Roslyn Bolton Genuine Photo */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-cyan-400/60 shadow-xl ring-2 ring-white/10">
                    <Image
                      src="/images/roslyn-bolton.jpg"
                      alt="Roslyn Bolton - Clinical Director"
                      className="w-full h-full object-cover"
  width={682}
  height={1024}
  sizes="200px"
/>
                  </div>

                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="font-serif font-bold text-xl text-white">
                        Roslyn Bolton
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-white/15 border border-cyan-400/30 px-2.5 py-0.5 rounded-full inline-block self-center sm:self-auto">
                        Clinical Director
                      </span>
                    </div>

                    <div className="text-xs text-cyan-200 font-semibold tracking-wide">
                      Registered Nurse &amp; Skin Specialist
                    </div>

                    <p className="text-xs text-slate-200 font-light leading-relaxed pt-1">
                      With years of experience in skin care, Roslyn offers a professional, personalised approach, taking time to understand your skin concerns and guide you through your skincare routine.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <a
                        href={CLINIC_INFO.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg"
                      >
                        <MessageSquare className="w-4 h-4" />
                        WhatsApp Roslyn Bolton
                      </a>

                      <button
                        onClick={() => openConsultation('Personal Skincare Assessment with Roslyn')}
                        className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 transition text-center"
                      >
                        Free skincare consultation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Welcome Message Card from the Team (Frosted Glass Card on top of background) */}
          <div className="mt-16 bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/60 shadow-2xl text-slate-900">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-[#0a2240] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
                A Personal Welcome
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900">
                Welcome to the Skin Medic Family!
              </h3>
              <p className="font-serif italic text-base sm:text-lg text-cyan-900 font-light">
                Your Prescription for Radiant Skin Awaits ❤️
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-3xl mx-auto text-left">
              <p>
                On behalf of our entire team, a huge welcome to Skin Medic Skin Care. We’re so glad you&apos;ve decided to invest in your skin&apos;s health with us.
              </p>
              <p>
                You now have access to a curated arsenal of medical-grade skincare, the same caliber used by dermatologists and aestheticians. Our mission is simple: to provide you with highly effective, innovative products that actually work, helping you achieve clear, healthy, and luminous skin from the comfort of your home.
              </p>
            </div>

            {/* Action Links: To get you started */}
            <div className="mt-8 pt-6 border-t border-slate-200/70">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 text-center sm:text-left">
                To get you started:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => openConsultation('Personalised Skin Guide')}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#0a2240] hover:shadow-md transition text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Need help finding your perfect routine?</div>
                    <div className="text-sm font-semibold text-[#0a2240] group-hover:underline flex items-center gap-1">
                      Consult Our Skin Guide
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>

                <Link
                  href="/shop"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#0a2240] hover:shadow-md transition text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Ready to explore?</div>
                    <div className="text-sm font-semibold text-[#0a2240] group-hover:underline flex items-center gap-1">
                      Discover Our Best Sellers
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                <a
                  href="#treatments"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#0a2240] hover:shadow-md transition text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Have clinical concerns?</div>
                    <div className="text-sm font-semibold text-[#0a2240] group-hover:underline flex items-center gap-1">
                      Explore Clinic Treatments
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Signoff */}
            <div className="mt-8 pt-6 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <p className="text-sm text-slate-600 font-light">
                  Your journey to transformative results is just beginning. We&apos;re here to support you every step of the way.
                </p>
                <div className="mt-3 font-serif font-bold text-slate-900 text-sm">
                  Welcome to the family,<br />
                  <span className="font-normal italic text-slate-700">The Skin Medic Skin Care Team</span>
                </div>
              </div>

              <div className="bg-slate-50 px-5 py-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 max-w-xs shrink-0 shadow-sm">
                <span className="font-semibold text-slate-900 block mb-0.5">P.S. Have a question?</span>
                Our certified skin care experts are just a reply away at{' '}
                <a href="mailto:info@skinmedicskincare.com" className="text-[#0a2240] font-semibold hover:underline">
                  info@skinmedicskincare.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPLORE OUR TREATMENTS (Point 6) */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100/90 border-b border-slate-200" id="treatments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a2240] text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              Clinical Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0a2240]">
              Explore Our Treatments
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Discover the treatments available at our clinic. Explore your options and book a consultation to discuss your skin concerns and goals.
            </p>
          </div>

          {/* 9 Treatments Grid — Cards with Subtle Tinted Background, Soft Glow & Delicate Frame */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {(treatmentsData as Treatment[]).map((t) => {
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
                  {/* Subtle inner glow orb */}
                  <div className="pointer-events-none absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-cyan-400/15 blur-2xl group-hover:bg-cyan-400/30 transition-all duration-500" />
                  <div className="pointer-events-none absolute top-14 -left-10 w-28 h-28 rounded-full bg-blue-400/10 blur-2xl group-hover:bg-cyan-300/20 transition-all duration-500" />

                  {/* Top Navy Header Strip */}
                  <div className="relative z-10 bg-gradient-to-r from-[#0a2240] to-[#133863] px-6 py-4 flex items-center justify-between border-b border-cyan-400/25">
                    <div className="flex items-center gap-2.5">
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
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0a2240] group-hover:text-cyan-800 transition-colors">
                        {t.title}
                      </h3>

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

          {/* Bottom Treatments Action */}
          <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://portal.aestheticnursesoftware.com/book-online/30610"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-xl bg-[#0a2240] hover:bg-[#123661] text-white font-semibold text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-cyan-300" />
              Book a treatment
            </a>
            <Link
              href="/treatments"
              className="px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-800 text-slate-800 font-semibold text-xs uppercase tracking-wider transition"
            >
              View Full Treatments Directory
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PRIMARY BRAND SPOTLIGHT: ZO® SKIN HEALTH */}
      <section className="py-20 bg-white" id="zo-spotlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0a2240] text-xs font-bold uppercase tracking-wider border border-blue-100">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                Our Flagship Skincare Range
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                Science-Driven Skincare by ZO<sup className="text-[0.6em] font-normal">®</sup>{'\u00A0'}Skin{'\u00A0'}Health
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                ZO{'\u00A0'}Skin{'\u00A0'}Health is a physician-developed skincare brand founded by renowned dermatologist Dr. Zein Obagi. Built on decades of clinical expertise, it goes beyond traditional skincare supporting the skin&apos;s natural function, strengthening its barrier, and delivering science-based solutions for long-term health and resilience.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/brands/zo-skin-health"
                className="px-5 py-2.5 rounded-xl bg-[#0a2240] hover:bg-[#123661] text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
              >
                Explore Full ZO Line ({zoProducts.length} items)
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 3 Steps Getting Skin Ready Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-[#0a2240] to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-12 border border-slate-800 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block mb-1">
                  ZO Step 1 • Cleanse
                </span>
                <h3 className="font-serif font-bold text-lg text-white">Normalise &amp; Cleanse</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Eliminate surface oil and environmental impurities without stripping the protective stratum corneum.
                </p>
              </div>

              <div className="border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block mb-1">
                  ZO Step 2 • Exfoliate
                </span>
                <h3 className="font-serif font-bold text-lg text-white">Renew Cellular Turnover</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Ultra-fine magnesium crystals gently slough away dead skin cells to reveal instant luminosity and smooth texture.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block mb-1">
                  ZO Step 3 • Tone
                </span>
                <h3 className="font-serif font-bold text-lg text-white">Balance &amp; Soothe</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Salicylic and glycolic formulations balance natural pH and unclog pores, preparing skin for therapeutic treatments.
                </p>
              </div>
            </div>
          </div>

          {/* ZO Featured Products Grid (4 on mobile, 8 on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredZO.map((product, idx) => (
              <div key={product.id} className={idx >= 4 ? 'hidden sm:flex' : 'flex'}>
                <ProductCard
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE SKIN MEDIC DIFFERENCE & PARALLAX BANNER (Point 11: 08_PARALLAX.jpg) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60" id="why-trust-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              The Skin Medic Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Why You Can Trust Us With Your Skin
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-light leading-relaxed">
              Medical precision, evidence-based formulations, and individualised guidance for lifelong skin health.
            </p>
          </div>

          {/* Subtle Parallax Showcase Banner for 08_PARALLAX.jpg */}
          <ParallaxBanner />

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0a2240] flex items-center justify-center mb-5">
                <ShieldCheck className="w-7 h-7 text-cyan-700" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">
                Medical-Grade Products
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light text-left sm:text-center">
                We offer only proven, medical-grade skincare from trusted leaders ZO{'\u00A0'}Skin{'\u00A0'}Health and Obagi. These advanced formulations contain high-performance active ingredients designed to penetrate deeper into the skin.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0a2240] flex items-center justify-center mb-5">
                <Sparkles className="w-7 h-7 text-cyan-700" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">
                Expert-Led Care
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light text-left sm:text-center">
                Your skin is guided by healthcare professionals. Our approach is rooted in expert knowledge and clinical experience, ensuring you receive advice you can trust from certified skincare specialists.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0a2240] flex items-center justify-center mb-5">
                <FileText className="w-7 h-7 text-cyan-700" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">
                Personalised Solutions
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light text-left sm:text-center">
                No two skins are the same; your routine shouldn&apos;t be either. Whether you&apos;re targeting acne, ageing, or pigmentation, we build a personalised routine that delivers long-term, healthy results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECONDARY BRAND SPOTLIGHT: OBAGI MEDICAL */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-200">
                Clinical Skincare Leader
              </div>
              <h2 className="text-3xl font-serif font-bold text-slate-900">
                Advanced Skincare by Obagi<sup className="text-[0.6em] font-normal">®</sup> Medical
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                Obagi is a globally recognised leader in medical-grade skincare, trusted by dermatologists for over 35 years. With a science-first approach, Obagi products are designed to improve skin health at a cellular level, delivering clinically proven visible results for pigmentation, fine lines, and sun damage.
              </p>
            </div>

            <div>
              <Link
                href="/brands/obagi-medical"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-2"
              >
                View Obagi Range ({obagiProducts.length} items)
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredObagi.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. 3 EASY STEPS TO SKIN CONFIDENCE (Bright, Clearly Visible Video Consultation Background) */}
      <section className="relative overflow-hidden py-24 sm:py-28 bg-slate-100 text-white">
        {/* Background Image: Full-brightness Video Consultation Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/video-consultation.jpg"
            alt="Free video consultation with a Skin Medic skin specialist"
            className="w-full h-full object-cover object-center opacity-100"
  width={1024}
  height={682}
  sizes="(max-width: 1024px) 100vw, 50vw"
/>
          {/* Very light, airy contrast veil so the background photo remains bright and clearly visible */}
          <div className="absolute inset-0 bg-[#0a2240]/15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a2240]/30 via-transparent to-[#0a2240]/35" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5 bg-[#0a2240]/75 backdrop-blur-md px-6 py-6 sm:px-10 sm:py-7 rounded-3xl border border-white/25 shadow-xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-cyan-300/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              Simple, Safe &amp; Medical-Led
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white drop-shadow-sm">
              Achieve Skin Confidence in 3 Easy Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 font-light">
              Healthy, radiant skin shouldn&apos;t be complicated. That&apos;s why we&apos;ve made it simple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="bg-[#0a2240]/75 rounded-3xl p-7 sm:p-8 border border-white/25 backdrop-blur-md shadow-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-lg mb-5 shadow-md">
                  1
                </div>

                <h3 className="font-serif font-bold text-xl text-white mb-2.5">
                  Free Video Consultation
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-light">
                  Book a free 30-minute video consultation with our certified Skin Specialist. We take the time to understand your skin, concerns, and goals with no pressure and no commitment.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20 text-xs text-cyan-300 font-semibold">
                ✓ Held via Zoom or WhatsApp video
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0a2240]/75 rounded-3xl p-7 sm:p-8 border border-white/25 backdrop-blur-md shadow-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-lg mb-5 shadow-md">
                  2
                </div>

                <h3 className="font-serif font-bold text-xl text-white mb-2.5">
                  Your Personalised Skin Plan
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-light">
                  Based on your consultation, your Skin Expert will design a tailored treatment plan using clinically proven, medical-grade products from ZO and Obagi chosen specifically for your skin type.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20 text-xs text-cyan-300 font-semibold">
                ✓ 100% Tailored to your lifestyle
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0a2240]/75 rounded-3xl p-7 sm:p-8 border border-white/25 backdrop-blur-md shadow-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-lg mb-5 shadow-md">
                  3
                </div>

                <h3 className="font-serif font-bold text-xl text-white mb-2.5">
                  Real, Visible Results
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-light">
                  Your products are delivered straight to your door, complete with expert guidance on how to use them. Your Skin Expert will check in regularly to track your progress and adjust your plan as your skin improves.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20 text-xs text-cyan-300 font-semibold">
                ✓ Free ongoing guidance &amp; reviews
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => openConsultation()}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold text-sm shadow-xl hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              Book Your Free Consultation with a Skincare Expert Today
            </button>
          </div>
        </div>
      </section>

      {/* 8. MOST LOVED BY PATIENTS & ROSLYN BOLTON HIGHLIGHTED QUOTE */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-100" id="most-loved">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0a2240]">
              Patient Favourites
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-slate-900">
              Most Loved <span className="italic font-light text-[#0a2240]">by Patients</span>
            </h2>
            <p className="text-sm text-slate-500 font-light">
              Selected medical-grade formulations most frequently recommended and cherished by our clinic patients.
            </p>
          </div>

          {/* A. ZO Skin Health Most Loved (5 Products) */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#0a2240] text-cyan-200 text-xs font-bold uppercase tracking-wider">
                  ZO® Skin Health
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  ZO Skin Health Patient Favourites
                </h3>
              </div>
              <Link
                href="/brands/zo-skin-health"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0a2240] hover:underline"
              >
                View Full ZO Range
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
              {mostLovedZO.map((product, idx) => (
                <div key={product.id} className={idx >= 4 ? 'hidden sm:flex' : 'flex'}>
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* HIGHLIGHTED QUOTE BY ROSLYN BOLTON */}
          <div className="my-14 sm:my-18 py-10 sm:py-12 px-6 sm:px-10 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/30 border border-blue-100 shadow-sm">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 text-center md:text-left">
              {/* Circular Portrait of Roslyn Bolton */}
              <div className="order-2 md:order-1 shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl ring-4 ring-white border-2 border-blue-200">
                  <Image
                    src="/images/roslyn-bolton.jpg"
                    alt="Roslyn Bolton"
                    className="w-full h-full object-cover object-top"
  width={682}
  height={1024}
  sizes="300px"
/>
                </div>
              </div>

              {/* Quote Text & Clean Non-Italic Signature */}
              <div className="order-1 md:order-2 space-y-3">
                <blockquote className="font-serif italic text-slate-800 text-[20px] sm:text-[22px] md:text-[26px] lg:text-[28px] leading-relaxed">
                  &ldquo;These products literally fly off the shelves! My patients absolutely love them.&rdquo;
                </blockquote>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-slate-900 tracking-wide not-italic">
                    Roslyn Bolton
                  </div>
                  <div className="text-xs text-[#0a2240] font-medium uppercase tracking-wider mt-0.5 not-italic">
                    Registered Nurse &amp; Skin Specialist, Founder of Skin Medic Skin Care
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* B. Obagi Medical Most Loved (8 Products) */}
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#0a2240] text-blue-200 text-xs font-bold uppercase tracking-wider">
                  Obagi® Medical
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Obagi Medical Patient Favourites
                </h3>
              </div>
              <Link
                href="/brands/obagi-medical"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0a2240] hover:underline"
              >
                View Full Obagi Range
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {mostLovedObagi.map((product, idx) => (
                <div key={product.id} className={idx >= 4 ? 'hidden sm:flex' : 'flex'}>
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Single shared Browse all products CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0a2240] hover:bg-[#123661] text-white font-semibold text-xs uppercase tracking-wider transition shadow-md"
            >
              Browse all products
              <ArrowRight className="w-4 h-4 text-cyan-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. WHAT OUR PATIENTS SAY & REAL BEFORE/AFTER */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Patient Reviews
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
              What Our Patients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map((r, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-serif font-bold text-sm text-slate-900">
                      {r.name}
                    </p>
                    <span className="text-[11px] text-slate-400">{r.role} • {r.date}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {r.brand}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Real Before & After Cases with Images */}
          <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                Real Results • Real People
              </span>
              <h3 className="font-serif font-bold text-2xl text-slate-900 mt-1">
                Their Skin Journey with Skin Medic
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mel */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 flex flex-col sm:flex-row gap-5 items-center">
                <div className="w-full sm:w-44 h-56 sm:h-48 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                  <Image
                    src="/images/mel.jpg"
                    alt="Mel - Skin Medic Patient"
                    className="w-full h-full object-cover object-[center_20%]"
  width={682}
  height={1024}
  sizes="300px"
/>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">Mel</span>
                    <span className="text-[10px] font-semibold bg-[#002447] text-cyan-200 px-2 py-0.5 rounded">
                      ZO Skin Health
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#0a2240]">
                    ZO Pigmentation &amp; Clarity Protocol
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    &ldquo;My skin looks clearer and more radiant, and I don&apos;t need heavy makeup anymore. The discolouration has reduced dramatically.&rdquo;
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                      ✓ Faded dark patches
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                      ✓ Even skin tone
                    </span>
                  </div>
                </div>
              </div>

              {/* Andras */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 flex flex-col sm:flex-row gap-5 items-center">
                <div className="w-full sm:w-44 h-56 sm:h-48 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                  <Image
                    src="/images/andras.jpg"
                    alt="Andras - Skin Medic Patient"
                    className="w-full h-full object-cover object-[center_18%]"
  width={682}
  height={1024}
  sizes="300px"
/>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">Andras</span>
                    <span className="text-[10px] font-semibold bg-[#002447] text-cyan-200 px-2 py-0.5 rounded">
                      ZO Skin Health
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#0a2240]">
                    ZO Anti-Ageing &amp; Texture Transformation
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    &ldquo;I get compliments about my skin now, and I haven&apos;t changed my routine. Definitely worth it.&rdquo;
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                      ✓ Smoothed expression lines
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                      ✓ More refreshed look
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA & WHATSAPP */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0a2240] to-[#143763] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Ready to Start Your Own Skin Journey?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-light text-left sm:text-center">
            Book a complimentary virtual consultation with Roslyn Bolton and our certified clinical team. We will analyse your skin and design a medical-grade plan tailored specifically to you.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openConsultation()}
              className="px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm shadow-xl transition"
            >
              Free skincare consultation
            </button>
            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Roslyn Bolton: {CLINIC_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
