'use client';

import React, { useState } from 'react';
import productsData from '@/data/products.json';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import Carousel3D, { Slide } from '@/components/Carousel3D';
import { useConsultation } from '@/context/ConsultationContext';
import { Product } from '@/types';
import {
  Sparkles,
  Calendar,
  CheckCircle,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const ZO_HERO_SLIDES: Slide[] = [
  {
    src: '/images/brands/zo-1.jpg',
    alt: 'ZO Skin Health Clarity before and after blemish and redness transformation',
    caption: 'Clarity & Blemish Control',
    tagline: 'ZO® Skin Health Before & After'
  },
  {
    src: '/images/brands/zo-2.jpg',
    alt: 'ZO Skin Health clinical before and after wrinkle and texture improvement',
    caption: 'Wrinkle & Texture Renewal',
    tagline: 'ZO® Clinical Before & After Result'
  },
  {
    src: '/images/brands/zo-3.jpg',
    alt: 'Skin Medic patient before and after ZO Skin Health protocol',
    caption: 'Comprehensive Skin Rejuvenation',
    tagline: 'Skin Medic Patient Transformation'
  }
];

const GSR_STEPS = [
  {
    step: '01',
    badge: 'Purify & Normalise',
    title: 'Step 1: Cleanse',
    description:
      'Normalises surface sebum and thoroughly sweeps away impurities, makeup, and environmental pollutants without compromising the skin barrier.',
    products: [
      'Exfoliating Cleanser (Normal to Oily Skin)',
      'Gentle Cleanser (All Skin Types)',
      'Hydrating Cleanser (Normal to Dry Skin)',
      'Balancing Cleansing Emulsion'
    ]
  },
  {
    step: '02',
    badge: 'Stimulate Renewal',
    title: 'Step 2: Exfoliate',
    description:
      'Removes dull, dead surface keratinocytes to stimulate epidermal renewal, brighten skin tone, and maximise penetration of active treatments.',
    products: [
      'Exfoliating Polish (Ultra-fine Magnesium Crystals)',
      'Dual Action Scrub (Lactic & Salicylic Acids)'
    ]
  },
  {
    step: '03',
    badge: 'Balance Sebum & pH',
    title: 'Step 3: Tone',
    description:
      'Controls excess surface oil, minimises pore appearance, and restores optimal dermal pH while soothing dry or sensitised skin.',
    products: [
      'Complexion Renewal Pads (Salicylic + Glycolic)',
      'Oil Control Pads (2% Salicylic Acid)',
      'Calming Toner pH Balancer'
    ]
  }
];

export default function ZOSkinHealthBrandPage() {
  const { openConsultation } = useConsultation();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>('default');

  const allProducts = productsData as Product[];
  const zoProducts = allProducts.filter((p) => p.brand === 'ZO Skin Health');

  const filteredZO = zoProducts
    .filter((p) => {
      if (selectedCategory === 'all') return true;
      return p.categories.some((c) => c.toLowerCase().includes(selectedCategory.toLowerCase()));
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return (a.orderIndex ?? 999) - (b.orderIndex ?? 999);
    });

  return (
    <div className="bg-white min-h-screen">
      {/* 1. BRAND HERO — Clean White + Navy/Blue Shadows matching Homepage (gap: 48px) */}
      <section className="relative overflow-hidden bg-white text-slate-900 pt-8 pb-14 sm:pb-20 lg:pb-24 border-b border-slate-100">
        {/* Subtle ambient blue/cyan glows */}
        <div className="absolute -top-24 right-0 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (z-index: 20 to prevent slider overlap) */}
            <div className="lg:col-span-6 relative z-20 min-w-0 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0a2240] text-xs font-semibold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span>Flagship Clinical Brand at Skin Medic Skin Care</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-slate-900 leading-[1.15]">
                ZO® Skin Health <br />
                <span className="text-[#0a2240]">
                  Science-Driven Cellular Care
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                Physician-developed skincare by world-renowned dermatologist <strong>Dr. Zein Obagi</strong>. Built on decades of clinical expertise, ZO goes beyond simple topical correction by restoring your skin&apos;s natural cellular function and strengthening its protective barrier.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => openConsultation('ZO Skin Health Protocol')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0a2240] hover:bg-[#123661] text-white font-bold text-sm shadow-xl shadow-blue-950/15 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-cyan-300" />
                  Free skincare consultation
                </button>

                <a
                  href="#gsr"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 hover:border-[#0a2240] transition flex items-center justify-center gap-2"
                >
                  Learn The GSR® Protocol
                  <ArrowRight className="w-4 h-4 text-[#0a2240]" />
                </a>
              </div>

              {/* Trust Indicators matching Homepage */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-bold font-serif text-slate-900">GSR®</div>
                  <div className="text-[11px] text-slate-500 font-medium">3-Step Foundation</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif text-[#0a2240]">Authorised</div>
                  <div className="text-[11px] text-slate-500 font-medium">ZO Clinic Partner</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif text-slate-900">100%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Medical-Grade Actives</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Carousel Slider without arrows (max-width: 540px) */}
            <div className="lg:col-span-6 relative z-10 min-w-0 w-full max-w-[540px] mx-auto lg:mr-0">
              <Carousel3D slides={ZO_HERO_SLIDES} showArrows={false} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. GSR® PROTOCOL SECTION — Styled with Homepage Navy Headers & Luminous Blue/Cyan Shadows */}
      <section id="gsr" className="py-20 bg-gradient-to-b from-slate-50 via-blue-50/25 to-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0a2240] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
              The Essential Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              Getting Skin Ready® (GSR)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Every healthy skincare transformation begins with Dr. Zein Obagi&apos;s proven 3-step system to normalise skin function.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GSR_STEPS.map((item) => (
              <div
                key={item.step}
                className="group relative bg-gradient-to-br from-white via-cyan-50/45 to-blue-50/65 rounded-2xl border border-cyan-500/35 ring-1 ring-cyan-400/20 shadow-[0_10px_35px_-5px_rgba(10,34,64,0.10),0_0_24px_rgba(6,182,212,0.15)] hover:shadow-[0_22px_50px_-8px_rgba(10,34,64,0.22),0_0_36px_rgba(6,182,212,0.30)] hover:border-cyan-500/70 hover:ring-cyan-400/45 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Ambient glow */}
                <div className="pointer-events-none absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-cyan-400/15 blur-2xl group-hover:bg-cyan-400/25 transition-all duration-300" />

                <div>
                  {/* Navy Header Strip matching Homepage Cards */}
                  <div className="bg-gradient-to-r from-[#0a2240] via-[#0e2d54] to-[#133863] px-6 py-4 flex items-center justify-between border-b border-cyan-500/25">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-300">
                      {item.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 font-extrabold text-xs tracking-wide shadow-sm">
                      STEP {item.step}
                    </span>
                  </div>

                  <div className="p-7">
                    <h3 className="font-serif font-bold text-2xl text-slate-900 group-hover:text-[#0a2240] transition-colors mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-7 pb-7 pt-4 border-t border-cyan-900/10 space-y-2 relative z-10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#0a2240] mb-2">
                    Key Protocol Formulas:
                  </div>
                  {item.products.map((prod, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>{prod}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ZO PRODUCTS CATALOG */}
      <section className="py-16 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                UK Registered Stock • Official 2026 Sequence
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
                All ZO® Skin Health Products ({filteredZO.length})
              </h2>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All ZO' },
                { id: 'cleanse', label: 'Cleanse' },
                { id: 'ageing', label: 'Ageing Skin' },
                { id: 'acne', label: 'Acne & Oil' },
                { id: 'brightening', label: 'Brightening' },
                { id: 'hydrators', label: 'Barrier / Hydrators' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    selectedCategory === tab.id
                      ? 'bg-[#0a2240] text-white shadow-md shadow-blue-950/15'
                      : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-[#0a2240] border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc' | 'name-asc')}
                aria-label="Sort ZO products"
                className="ml-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 shadow-sm focus:outline-none focus:border-[#0a2240]"
              >
                <option value="default">Sort: Default Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredZO.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
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
