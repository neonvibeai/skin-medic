'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { splitProductName } from '@/lib/productName';
import { Sparkles, ArrowRight, Eye, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const isZO = product.brand === 'ZO Skin Health';
  const hasLocalImage = product.localImages && product.localImages.length > 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-blue-200/80 shadow-[0_8px_28px_-4px_rgba(10,34,64,0.08),0_0_16px_rgba(6,182,212,0.08)] hover:shadow-[0_18px_42px_-6px_rgba(10,34,64,0.18),0_0_28px_rgba(6,182,212,0.20)] hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm ${
            isZO
              ? 'bg-[#0a2240] text-cyan-200 border border-cyan-400/35'
              : 'bg-[#0a2240] text-blue-200 border border-blue-300/35'
          }`}
        >
          {isZO ? 'ZO\u00A0Skin\u00A0Health' : 'Obagi\u00A0Medical'}
        </span>

        {product.isMostLoved && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/20 flex items-center gap-1 backdrop-blur-sm bg-white/80">
            <Sparkles className="w-2.5 h-2.5 text-amber-600" />
            Most Loved
          </span>
        )}
      </div>

      {/* Visual Product Box */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative h-64 w-full bg-gradient-to-b from-slate-50 via-slate-100/40 to-white flex items-center justify-center p-6 overflow-hidden"
      >
        {/* Glow */}
        <div
          className={`absolute w-36 h-36 rounded-full blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-60 ${
            isZO ? 'bg-cyan-200' : 'bg-blue-200'
          }`}
        />

        {hasLocalImage ? (
          <Image
            src={product.localImages![0]}
            alt={product.name}
            className="max-h-48 max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 relative z-10 w-auto h-auto"
  width={600}
  height={600}
  sizes="(max-width: 640px) 80vw, 320px"
/>
        ) : (
          /* Fallback Cosmetic Bottle */
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-9 h-7 rounded-t-md shadow-inner border-t border-x ${
                isZO
                  ? 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 border-slate-400'
                  : 'bg-gradient-to-r from-slate-100 via-white to-slate-200 border-slate-300'
              }`}
            />
            <div className="w-7 h-1.5 bg-slate-300 border-x border-slate-400" />
            <div className="w-24 h-36 rounded-b-xl shadow-md border bg-white border-slate-200/90 text-slate-800 flex flex-col items-center justify-between p-2.5 text-center">
              <div className="pt-1">
                <div className={`text-[8px] font-black tracking-widest ${isZO ? 'text-[#002447]' : 'text-[#1b2b48]'}`}>
                  {isZO ? 'ZO\u00A0SKIN\u00A0HEALTH' : 'OBAGI'}
                </div>
              </div>
              <div className="my-auto px-1">
                <div className="text-[9px] font-bold line-clamp-2 leading-tight text-slate-900">
                  {product.name}
                </div>
              </div>
              <div className="pb-0.5 w-full border-t border-slate-200/60 pt-1 text-[6px] text-slate-400">
                CLINICAL RRP
              </div>
            </div>
          </div>
        )}

        {/* Quick View Floating Button on Hover */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-white/95 text-slate-700 shadow-md hover:bg-slate-900 hover:text-white transition opacity-0 group-hover:opacity-100 z-20"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <div className="text-[11px] font-medium text-slate-400 mb-1 line-clamp-1">
            {product.categories.slice(0, 2).join(' • ')}
          </div>

          {/* Name */}
          <Link
            href={`/shop/${product.slug}`}
            className="block hover:text-[#0a2240] transition"
          >
            <span className="font-serif font-bold text-slate-900 text-base line-clamp-2 text-balance">
              {splitProductName(product.name).title}
            </span>
            {splitProductName(product.name).size && (
              <span className="block text-xs font-medium text-slate-500 mt-0.5">
                {splitProductName(product.name).size}
              </span>
            )}
          </Link>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription || product.description || 'Medical-grade targeted skincare protocol.'}
          </p>
        </div>

        {/* Price & Consultation Action */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Price (RRP)</span>
              <span className="text-lg font-bold text-slate-900">
                {product.price > 0 ? `£${product.price.toFixed(2)}` : 'Consultation'}
              </span>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                Clinic Exclusive
              </span>
            </div>
          </div>

          {/* The booking call to action lives once in the page banner; cards lead to the product */}
          <Link
            href={`/shop/${product.slug}`}
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-2 border border-slate-300 text-[#0a2240] hover:bg-slate-50 hover:border-[#0a2240]"
          >
            View product
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
