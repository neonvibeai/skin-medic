'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useConsultation } from '@/context/ConsultationContext';
import { X, Calendar, ShieldCheck, ExternalLink } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { openConsultation } = useConsultation();

  if (!product) return null;

  const isZO = product.brand === 'ZO Skin Health';
  const hasLocalImage = product.localImages && product.localImages.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Column */}
        <div className="md:w-5/12 bg-gradient-to-b from-slate-100 to-slate-50 p-8 flex flex-col items-center justify-center relative">
          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
              isZO ? 'bg-[#002447] text-cyan-200' : 'bg-slate-900 text-amber-200'
            }`}
          >
            {isZO ? (
              <>
                ZO<sup className="text-[0.6em] font-normal">®</sup> Skin Health
              </>
            ) : (
              <>
                Obagi<sup className="text-[0.6em] font-normal">®</sup> Medical
              </>
            )}
          </span>

          {hasLocalImage ? (
            <div className="my-6 flex items-center justify-center h-64 w-full">
              <img
                src={product.localImages![0]}
                alt={product.name}
                className="max-h-56 max-w-full object-contain drop-shadow-lg"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center my-6">
              <div className="w-12 h-8 rounded-t-md bg-gradient-to-r from-slate-300 via-slate-200 to-slate-400 border border-slate-400" />
              <div className="w-9 h-2 bg-slate-300 border-x border-slate-400" />
              <div className="w-32 h-48 rounded-b-2xl bg-white shadow-xl border border-slate-200 flex flex-col items-center justify-between p-3 text-center">
                <div className="text-[10px] font-black tracking-widest text-slate-800 pt-2">
                  {isZO ? 'ZO® SKIN HEALTH' : 'OBAGI® MEDICAL'}
                </div>
                <div className="px-2">
                  <div className="text-xs font-bold text-slate-900 line-clamp-3">
                    {product.name}
                  </div>
                </div>
                <div className="text-[8px] text-slate-400 border-t border-slate-100 pt-1 w-full flex justify-between">
                  <span>CLINICAL</span>
                  <span>RRP £{product.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="text-center text-xs text-slate-500">
            Prescription medical-grade skincare formulation.
          </div>
        </div>

        {/* Details Column */}
        <div className="md:w-7/12 p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              {product.categories.slice(0, 3).join(' • ')}
            </div>

            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              {product.name}
            </h3>

            <div className="flex items-center gap-3 mt-3 pb-3 border-b border-slate-100">
              <span className="text-2xl font-bold text-slate-900">
                £{product.price.toFixed(2)}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Available via Consultation
              </span>
            </div>

            {/* Description */}
            <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                {product.description || product.shortDescription || 'Medical-grade targeted skincare protocol.'}
              </p>

              {product.howToUse && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 mt-3">
                  <h4 className="font-bold text-xs text-slate-900 mb-1">How To Use:</h4>
                  <p className="text-xs text-slate-600">{product.howToUse}</p>
                </div>
              )}

              {product.ingredients && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 mt-2">
                  <h4 className="font-bold text-xs text-slate-900 mb-1">Key Ingredients:</h4>
                  <p className="text-xs text-slate-600 line-clamp-3">{product.ingredients}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                openConsultation(product.name);
              }}
              className="flex-1 py-3 px-5 rounded-xl bg-[#0a2240] text-white text-xs font-bold hover:bg-[#123661] transition flex items-center justify-center gap-2 shadow-md shadow-blue-950/20"
            >
              <Calendar className="w-4 h-4 text-cyan-300" />
              Book Free Consultation For This Product
            </button>

            <Link
              href={`/shop/${product.slug}`}
              onClick={onClose}
              className="py-3 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-1.5"
            >
              Full Details
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
