'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { CLINIC_INFO } from '@/data/siteData';
import { CATALOG_COUNTS } from '@/lib/siteConfig';
import { useConsultation } from '@/context/ConsultationContext';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { openConsultation } = useConsultation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 6000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#07172c] text-slate-300 pt-16 pb-24 sm:pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Card */}
        <div className="bg-gradient-to-r from-[#0d2a4f] to-[#123866] rounded-2xl p-6 sm:p-8 mb-16 shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              Stay in Touch with Clinical Skincare
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Join the Skin Medic Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md">
              Receive medical skincare guidance from Roslyn Bolton, product release updates, and exclusive consultation offers.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Thank you! You are now subscribed to our clinical updates.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 w-full md:w-96">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Founder */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/skin-medic-logo.png"
                alt="Skin Medic Logo"
                className="h-10 w-auto object-contain brightness-110 drop-shadow-sm"
  width={250}
  height={250}
  sizes="40px"
/>
              <div>
                <span className="font-serif font-bold text-lg text-white block">
                  Skin Medic Skin Care
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 block">
                  Advanced Skincare Backed by Science
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Founded and medically led by <span className="text-white font-medium">Roslyn Bolton</span> (Registered Nurse &amp; Skin Specialist). Specialising in targeted ZO<sup className="text-[0.6em] font-normal">®</sup> Skin Health and Obagi<sup className="text-[0.6em] font-normal">®</sup> Medical treatment plans.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-[11px] text-cyan-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                UK Registered Healthcare Professional
              </span>
            </div>
          </div>

          {/* Col 2: Brands (ZO Focus) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Medical Brands
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/brands/zo-skin-health" className="text-cyan-300 hover:text-white font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  ZO{'\u00A0'}Skin{'\u00A0'}Health
                </Link>
              </li>
              <li>
                <Link href="/shop?brand=ZO+Skin+Health" className="text-slate-400 hover:text-white transition">
                  ZO Products ({CATALOG_COUNTS.zo} items)
                </Link>
              </li>
              <li>
                <Link href="/brands/zo-skin-health#gsr" className="text-slate-400 hover:text-white transition">
                  Getting Skin Ready® (GSR)
                </Link>
              </li>
              <li>
                <Link href="/brands/obagi-medical" className="text-slate-300 hover:text-white font-medium flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Obagi Medical
                </Link>
              </li>
              <li>
                <Link href="/shop?brand=Obagi+Medical" className="text-slate-400 hover:text-white transition">
                  Obagi Systems ({CATALOG_COUNTS.obagi} items)
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-slate-400 hover:text-white transition">
                  Browse Full Catalogue ({CATALOG_COUNTS.total})
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinic & Treatments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Clinic & Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => openConsultation()} className="text-cyan-300 hover:underline text-left">
                  Free skincare consultation
                </button>
              </li>
              <li>
                <Link href="/treatments/dermal-fillers" className="text-slate-400 hover:text-white transition">
                  Dermal Fillers
                </Link>
              </li>
              <li>
                <Link href="/treatments/fine-lines-wrinkles" className="text-slate-400 hover:text-white transition">
                  Fine Lines & Wrinkles
                </Link>
              </li>
              <li>
                <Link href="/treatments/profhilo" className="text-slate-400 hover:text-white transition">
                  Profhilo®
                </Link>
              </li>
              <li>
                <Link href="/treatments/zo-skin-health-facials" className="text-slate-400 hover:text-white transition">
                  ZO Skin Health Facials
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="text-slate-400 hover:text-white transition">
                  All In-Clinic Treatments
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-slate-400 hover:text-white transition">
                  How It Works (3 Easy Steps)
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-white transition">
                  Prescription & Pricing FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Clinic */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact Clinic
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  {CLINIC_INFO.address.street}, {CLINIC_INFO.address.town}, {CLINIC_INFO.address.city}, {CLINIC_INFO.address.postcode}, {CLINIC_INFO.address.country}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white transition">
                  {CLINIC_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white transition">
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition"
              >
                <span>WhatsApp Roslyn Bolton</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Medical Notice */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-4">
          <p className="text-[11px] leading-relaxed text-slate-400 text-center max-w-4xl mx-auto">
            * Medical Notice: ZO® Skin Health and Obagi® Medical skincare products are clinical formulations requiring consultation with our certified healthcare practitioner prior to purchase. In compliance with UK guidelines, prescription formulations cannot be purchased directly without clinical assessment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>
              © 2026 {CLINIC_INFO.name}. All rights reserved. Registered in the United Kingdom.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition">
                Terms & Conditions
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-white transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
