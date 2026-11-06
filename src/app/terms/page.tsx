import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
        <h1 className="font-serif font-bold text-3xl text-slate-900">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-400">
          Last updated: October 2026 | Skin Medic Skin Care Limited (UK)
        </p>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-lg text-slate-900">1. Medical Skincare Consultation Terms</h2>
          <p>
            Skin Medic Skin Care provides professional skincare advice led by registered healthcare practitioners. Medical-grade formulations from ZO® Skin Health and Obagi® Medical require an initial skin consultation to ensure safe and effective use.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-lg text-slate-900">2. Prescription & Formulation Qualification</h2>
          <p>
            All products are dispensed strictly following an assessment with Roslyn Bolton or certified skin specialists. In compliance with UK guidelines, prescription formulations cannot be purchased directly without clinical assessment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-lg text-slate-900">3. Delivery & UK Shipping</h2>
          <p>
            Orders over £100 qualify for free UK delivery. Dispatches occur via tracked courier services with signature upon receipt.
          </p>
        </section>
      </div>
    </div>
  );
}
