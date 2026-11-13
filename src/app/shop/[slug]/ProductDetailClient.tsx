'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { splitProductName } from '@/lib/productName';
import { useConsultation } from '@/context/ConsultationContext';
import { CLINIC_INFO } from '@/data/siteData';
import ProductCard from '@/components/ProductCard';
import {
  Calendar,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Info,
  Truck,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts
}: ProductDetailClientProps) {
  const { openConsultation } = useConsultation();
  const [activeTab, setActiveTab] = useState<'desc' | 'how' | 'ingredients' | 'safety' | 'consultation'>('desc');
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  const isZO = product.brand === 'ZO Skin Health';
  const images = product.localImages && product.localImages.length > 0 ? product.localImages : [];

  const whatsappMessage = encodeURIComponent(
    `Hello Roslyn Bolton! I would like to enquire about the prescription product: ${product.name} (${product.brand}).`
  );

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-slate-900 transition">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/shop" className="hover:text-slate-900 transition">
            Shop Catalogue
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link
            href={isZO ? '/brands/zo-skin-health' : '/brands/obagi-medical'}
            className="hover:text-slate-900 transition font-medium"
          >
            {product.brand}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Showcase Box */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Visual Column */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-100 via-slate-50 to-white rounded-2xl p-6 flex flex-col items-center justify-between relative border border-slate-100 min-h-[420px]">
              <span
                className={`self-start px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm ${
                  isZO ? 'bg-[#002447] text-cyan-200' : 'bg-slate-900 text-amber-200'
                }`}
              >
                {product.brand}
              </span>

              {/* Main Image */}
              <div className="my-auto py-4 flex items-center justify-center w-full min-h-[260px]">
                {images.length > 0 ? (
                  <Image
                    src={images[selectedImgIdx] || images[0]}
                    alt={product.name}
                    className="max-h-72 max-w-full object-contain drop-shadow-xl transition-all duration-300 w-auto h-auto"
  width={800}
  height={800}
  sizes="(max-width: 1024px) 90vw, 500px"
/>
                ) : (
                  <div className="w-36 h-56 rounded-b-2xl bg-white shadow-xl border border-slate-200 flex flex-col items-center justify-between p-4 text-center">
                    <div className="text-xs font-black tracking-widest text-slate-800 pt-2">
                      {isZO ? (
                        <>
                          ZO<sup className="text-[0.6em] font-normal">®</sup> SKIN HEALTH
                        </>
                      ) : (
                        <>
                          OBAGI<sup className="text-[0.6em] font-normal">®</sup> MEDICAL
                        </>
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-900 line-clamp-3">
                      {product.name}
                    </div>
                    <div className="text-[8px] text-slate-400 border-t pt-1 w-full">
                      CLINICAL FORMULA
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 pt-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIdx(idx)}
                      className={`w-14 h-14 rounded-xl border p-1 bg-white shrink-0 transition ${
                        selectedImgIdx === idx
                          ? 'border-[#0a2240] ring-2 ring-[#0a2240]'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - view ${idx + 1}`}
                        className="w-full h-full object-contain"
  width={160}
  height={160}
  sizes="80px"
/>
                    </button>
                  ))}
                </div>
              )}

              <div className="text-center text-xs text-slate-500 mt-2">
                100% Authentic Stock • Dispatched from Skin Medic Clinic, Hucknall
              </div>
            </div>

            {/* Right Product Information Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {product.categories.map((c, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight text-balance">
                  {splitProductName(product.name).title}
                  {splitProductName(product.name).size && (
                    <span className="block text-base font-sans font-medium text-slate-500 mt-1 tracking-normal">
                      {splitProductName(product.name).size}
                    </span>
                  )}
                </h1>

                <div className="mt-4 flex items-baseline gap-4 pb-4 border-b border-slate-100">
                  <span className="text-3xl font-bold text-slate-900">
                    £{product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-500">
                    Recommended Retail Price (RRP)
                  </span>
                </div>

                {/* Why Consultation Required Alert */}
                <div className="my-5 p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#0a2240] text-sm">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Professional Skin Consultation Required
                  </div>
                  <p className="leading-relaxed">
                    This medical-grade product contains active clinical ingredients. To protect your skin health and ensure suitability, this formula can only be dispensed following an online or in-clinic skin assessment.
                  </p>
                </div>

                {/* Primary Actions (NO Add to Cart!) */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openConsultation(product.name)}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#0a2240] hover:bg-[#123661] text-white font-bold text-sm shadow-lg shadow-blue-950/20 transition flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-cyan-300" />
                    Free skincare consultation
                  </button>

                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp Roslyn Bolton
                  </a>
                </div>

                {/* Trust Bullets */}
                <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-cyan-600" />
                    <span>Free UK delivery over £100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-600" />
                    <span>Next-day dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                    <span>Free ongoing reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Detailed Information */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            {/* Tabs Header */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveTab('desc')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'desc'
                    ? 'bg-[#0a2240] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Description
              </button>

              {product.howToUse && (
                <button
                  onClick={() => setActiveTab('how')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'how'
                      ? 'bg-[#0a2240] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  How To Use
                </button>
              )}

              {product.ingredients && (
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'ingredients'
                      ? 'bg-[#0a2240] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Active Ingredients
                </button>
              )}

              {product.safetyInfo && (
                <button
                  onClick={() => setActiveTab('safety')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'safety'
                      ? 'bg-[#0a2240] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Safety &amp; Precautions
                </button>
              )}

              <button
                onClick={() => setActiveTab('consultation')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'consultation'
                    ? 'bg-[#0a2240] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Why We Consult
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-6 text-sm text-slate-700 leading-relaxed max-w-4xl">
              {activeTab === 'desc' && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    About {product.name}
                  </h3>
                  {product.indication && (
                    <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs text-slate-700">
                      <span className="font-bold text-[#0a2240] uppercase tracking-wider mr-1.5">Skin Type &amp; Indication:</span>
                      {product.indication}
                    </div>
                  )}
                  <p className="whitespace-pre-line">{product.description || product.shortDescription || 'Medical-grade targeted skincare protocol.'}</p>
                  {product.benefits && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="font-bold text-xs uppercase text-slate-800 mb-2">Clinical Benefits:</h4>
                      <p className="text-xs text-slate-600 whitespace-pre-line">{product.benefits}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'how' && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Application Instructions &amp; Protocol
                  </h3>
                  <p className="whitespace-pre-line">{product.howToUse}</p>
                  <p className="text-xs text-slate-500 italic">
                    * Specific protocol dosage and frequency will be personalised during your video consultation with Roslyn Bolton.
                  </p>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Active &amp; Key Ingredients
                  </h3>
                  <p className="font-mono text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200 whitespace-pre-line">
                    {product.ingredients}
                  </p>
                </div>
              )}

              {activeTab === 'safety' && product.safetyInfo && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Warnings, Precautions &amp; Contraindications
                  </h3>
                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                    {product.safetyInfo}
                  </div>
                  {product.storage && (
                    <p className="text-xs text-slate-500">
                      <strong>Storage:</strong> {product.storage}
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'consultation' && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    The Importance of Professional Consultation
                  </h3>
                  <p>
                    Medical-grade skincare lines such as <strong>{product.brand}</strong> are developed with potent therapeutic concentrations of active ingredients (such as high-potency retinoids, hydroquinone alternatives, hydroxy acids, and growth factors).
                  </p>
                  <p>
                    Unlike standard beauty counter products, they stimulate cellular-level activity within the deeper dermal layers. A preliminary consultation allows us to ensure:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                    <li>Contraindications and allergies are screened</li>
                    <li>Correct step-up protocols are provided to avoid unnecessary irritation</li>
                    <li>The product synergises with your existing skincare regime</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Recommended Regimen
                </span>
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  Complementary {product.brand} Products
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold text-[#0a2240] hover:underline"
              >
                View All Products →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
