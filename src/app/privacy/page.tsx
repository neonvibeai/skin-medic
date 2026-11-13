import React from 'react';
import type { Metadata } from 'next';
import { CLINIC_INFO } from '@/data/siteData';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'Read the Privacy Policy for Skin Medic Skin Care Limited in Hucknall, Nottingham, explaining how we handle personal and clinical data.',
  path: '/privacy'
});

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
        <h1 className="font-serif font-bold text-3xl text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last updated: October 2026 | Skin Medic Skin Care Limited (UK)
        </p>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-lg text-slate-900">1. Who We Are</h2>
          <p>
            Skin Medic Skin Care Limited (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the clinic and online consultation services for medical-grade skincare (ZO® Skin Health and Obagi® Medical) located at 37 Portland Road, Hucknall, Nottingham, NG15 7SL, United Kingdom.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-lg text-slate-900">2. Medical & Consultation Data</h2>
          <p>
            During your free online or in-clinic skin consultation, we collect health-related details regarding skin conditions, sensitivities, allergies, and prior skincare treatments. This information is held in strict medical confidentiality in accordance with UK Data Protection and GDPR laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-lg text-slate-900">3. How We Use Your Information</h2>
          <p>
            Your information is used strictly to provide clinical skin assessments, dispense personalised skincare plans, arrange next-day courier deliveries within the UK, and follow up on your skin progress. We never sell or share your data with third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-lg text-slate-900">4. Contact Our Clinical Privacy Officer</h2>
          <p>
            For any enquiries regarding your data, please contact Roslyn Bolton at <a href={`mailto:${CLINIC_INFO.email}`} className="text-[#0a2240] font-semibold underline">{CLINIC_INFO.email}</a> or telephone {CLINIC_INFO.phone}.
          </p>
        </section>
      </div>
    </div>
  );
}
