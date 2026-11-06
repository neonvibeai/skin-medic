'use client';

import React, { useState } from 'react';
import productsData from '@/data/products.json';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import Carousel3D, { Slide } from '@/components/Carousel3D';
import { useConsultation } from '@/context/ConsultationContext';
import { Product } from '@/types';
import { Sparkles, Calendar, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';

const OBAGI_HERO_SLIDES: Slide[] = [
  {
    src: '/images/brands/obagi-1.jpg',
    alt: 'Obagi Medical pigmentation and skin tone transformation before and after',
    caption: 'Pigmentation & Tone Transformation',
    tagline: 'Obagi® Nu-Derm® & Obagi-C® Clinical Results'
  },
  {
    src: '/images/brands/obagi-2.jpg',
    alt: 'Obagi Nu-Cil and eye contour 12-week clinical study results',
    caption: '12-Week Clinical Study Results',
    tagline: 'Obagi® Nu-Cil® & Eye Rejuvenation'
  },
  {
    src: '/images/brands/obagi-3.webp',
    alt: 'Obagi Medical 8-week clinical test texture and clarity results',
    caption: '8-Week Texture & Clarity Study',
    tagline: 'Proven Medical-Grade Efficacy'
  }
];

const OBAGI_SYSTEMS = [
  {
    step: '01',
    badge: 'Brightening & Tone',
    title: 'Nu-Derm® Fx System',
    description:
      'The gold standard transformational system for hyperpigmentation, age spots, and uneven skin tone powered by 7% Arbutin and exfoliating complexes.',
    highlights: ['Nu-Derm® Clear Fx & Blender Fx', 'Exfoderm® & Exfoderm® Forte', 'Foaming Gel, Gentle Cleanser & Toner']
  },
  {
    step: '02',
    badge: 'Antioxidant Defense',
    title: 'Obagi-C® Rx & Fx',
    description:
      'Combines stabilized high-potency L-Ascorbic Acid (Vitamin C) with Arbutin to neutralize free radicals, brighten dullness, and support collagen.',
    highlights: ['Professional-C® Serum 15% & 20%', 'C-Clarifying Serum & Night Cream', 'C-Cleansing Gel & Day Lotion']
  },
  {
    step: '03',
    badge: 'Elastin & Firmness',
    title: 'ELASTIderm® Collection',
    description:
      'Formulated with patented Bi-Mineral Contour Complex™ to replenish depleted elastin and visibly firm delicate skin around the eyes, face, and neck.',
    highlights: ['ELASTIderm® Eye Cream & Firming Gel', 'ELASTIderm® Facial Serum', 'Neck and Décolleté Concentrate']
  },
  {
    step: '04',
    badge: 'Hydration & Enhancement',
    title: 'Targeted Specialists',
    description:
      'Clinically proven specialty formulas engineered for long-lasting barrier hydration, microfluidic eye rejuvenation, and fuller-looking brows.',
    highlights: ['Hydrate® Facial Moisturizer (8-hr moisture)', 'Daily Hydro-Drops® Eye Gel Cream', 'Nu-Cil® Eyebrow Boosting Serum']
  }
];

export default function ObagiMedicalBrandPage() {
  const { openConsultation } = useConsultation();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>('default');

  const allProducts = productsData as Product[];
  const obagiProducts = allProducts.filter((p) => p.brand === 'Obagi Medical');

  const filteredObagi = obagiProducts
    .filter((p) => {
      if (selectedSystem === 'all') return true;
      return p.categories.some((c) => c.toLowerCase().includes(selectedSystem.toLowerCase()));
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
                <span>Over 35 Years of Clinical Excellence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-slate-900 leading-[1.15]">
                Obagi® Medical <br />
                <span className="text-[#0a2240]">
                  Transformative Skin Health
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                Obagi is a globally recognized leader in medical-grade skincare, trusted by dermatologists and aesthetic clinicians for over 35 years. Formulated with high-potency active ingredients to transform hyperpigmentation, uneven tone, fine lines, and sun damage.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => openConsultation('Obagi Medical System')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0a2240] hover:bg-[#123661] text-white font-bold text-sm shadow-xl shadow-blue-950/15 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-cyan-300" />
                  Book Your Obagi Assessment
                </button>

                <a
                  href="#obagi-catalog"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 hover:border-[#0a2240] transition flex items-center justify-center gap-2"
                >
                  Explore Obagi Products
                  <ArrowRight className="w-4 h-4 text-[#0a2240]" />
                </a>
              </div>

              {/* Trust Indicators matching Homepage */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-bold font-serif text-slate-900">35+ Years</div>
                  <div className="text-[11px] text-slate-500 font-medium">Clinical Heritage</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif text-[#0a2240]">Nurse-Led</div>
                  <div className="text-[11px] text-slate-500 font-medium">Bespoke Prescribing</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif text-slate-900">100%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Authentic UK Stock</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Carousel Slider without arrows (max-width: 540px) */}
            <div className="lg:col-span-6 relative z-10 min-w-0 w-full max-w-[540px] mx-auto lg:mr-0">
              <Carousel3D slides={OBAGI_HERO_SLIDES} showArrows={false} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SYSTEMS OVERVIEW — Styled with Homepage Navy Headers & Luminous Blue/Cyan Shadows */}
      <section className="py-20 bg-gradient-to-b from-slate-50 via-blue-50/25 to-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0a2240] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
              Prescribed Clinical Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
              Renowned Obagi® Transformational Systems
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Scientifically engineered regimens designed to work synergistically at the cellular level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OBAGI_SYSTEMS.map((sys) => (
              <div
                key={sys.step}
                className="group relative bg-gradient-to-br from-white via-cyan-50/45 to-blue-50/65 rounded-2xl border border-cyan-500/35 ring-1 ring-cyan-400/20 shadow-[0_10px_35px_-5px_rgba(10,34,64,0.10),0_0_24px_rgba(6,182,212,0.15)] hover:shadow-[0_22px_50px_-8px_rgba(10,34,64,0.22),0_0_36px_rgba(6,182,212,0.30)] hover:border-cyan-500/70 hover:ring-cyan-400/45 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Ambient glow */}
                <div className="pointer-events-none absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-cyan-400/15 blur-2xl group-hover:bg-cyan-400/25 transition-all duration-300" />

                <div>
                  {/* Navy Header Bar matching Homepage Cards */}
                  <div className="bg-gradient-to-r from-[#0a2240] via-[#0e2d54] to-[#133863] px-5 py-3.5 flex items-center justify-between border-b border-cyan-500/25">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-300">
                      {sys.badge}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center justify-center shadow-sm">
                      {sys.step}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-[#0a2240] transition-colors mb-2.5">
                      {sys.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {sys.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-cyan-900/10 space-y-1.5 relative z-10">
                  {sys.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS CATALOG */}
      <section id="obagi-catalog" className="py-16 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                UK Registered Stock • Default Clinical Sequence
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
                All Obagi® Medical Products ({filteredObagi.length})
              </h2>
            </div>

            {/* System Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Obagi' },
                { id: 'nu-derm', label: 'Nu-Derm' },
                { id: 'obagi-c', label: 'Obagi-C' },
                { id: 'elastiderm', label: 'ELASTIderm' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSystem(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    selectedSystem === tab.id
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
                aria-label="Sort Obagi products"
                className="ml-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 shadow-sm focus:outline-none focus:border-[#0a2240]"
              >
                <option value="default">Sort: Default Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredObagi.map((product) => (
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
