'use client';

import React, { useState } from 'react';
import { CLINIC_INFO, SKIN_CONCERNS } from '@/data/siteData';
import {
  Calendar,
  Video,
  MapPin,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Clock,
  UserCheck
} from 'lucide-react';

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    consultationType: 'video',
    concern: 'Anti-Ageing',
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'Morning (10:00 - 13:00)',
    notes: '',
    skinType: 'Combination',
    priorMedicalSkincare: 'No'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppSubmit = () => {
    const text = `Hello Roslyn Bolton! I would like to book a medical skincare consultation.
*Consultation Type:* ${formData.consultationType.toUpperCase()}
*Primary Concern:* ${formData.concern}
*Skin Type:* ${formData.skinType}
*Used Medical Skincare Before:* ${formData.priorMedicalSkincare}
*Preferred Date:* ${formData.preferredDate || 'Flexible'} (${formData.preferredTime})
*Name:* ${formData.fullName}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
${formData.notes ? `*Notes:* ${formData.notes}` : ''}`;

    const url = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0a2240] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            100% Free Virtual Assessment
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900">
            Book Your Free Skin Consultation
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get personalised advice, clinical recommendations for ZO® Skin Health and Obagi® Medical, and a tailored treatment plan designed by Roslyn Bolton.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-10">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Consultation Request Confirmed!
              </h2>
              <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Roslyn Bolton and our clinical team will review your answers and contact you via email/phone within 24 hours to finalise your video or clinic time slot.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Roslyn Bolton
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Consultation Format */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. Choose Your Preferred Consultation Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: 'video' })}
                    className={`p-4 rounded-2xl border text-left transition flex flex-col gap-1.5 ${
                      formData.consultationType === 'video'
                        ? 'border-[#0a2240] bg-blue-50/80 text-[#0a2240] ring-2 ring-[#0a2240]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <Video className="w-4 h-4 text-blue-600" />
                      Free Video Consultation
                    </div>
                    <span className="text-[11px] text-slate-500">
                      30 mins via Zoom / WhatsApp from the comfort of home
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: 'clinic' })}
                    className={`p-4 rounded-2xl border text-left transition flex flex-col gap-1.5 ${
                      formData.consultationType === 'clinic'
                        ? 'border-[#0a2240] bg-blue-50/80 text-[#0a2240] ring-2 ring-[#0a2240]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      In-Clinic Assessment
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Private clinic at 37 Portland Road, Hucknall, Nottingham
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: 'whatsapp' })}
                    className={`p-4 rounded-2xl border text-left transition flex flex-col gap-1.5 ${
                      formData.consultationType === 'whatsapp'
                        ? 'border-[#0a2240] bg-blue-50/80 text-[#0a2240] ring-2 ring-[#0a2240]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <MessageSquare className="w-4 h-4 text-teal-600" />
                      Quick WhatsApp Advice
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Send photos & quick questions to our registered nurse
                    </span>
                  </button>
                </div>
              </div>

              {/* Skin Assessment Details */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Skin Concern
                  </label>
                  <select
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240] bg-white"
                  >
                    {SKIN_CONCERNS.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    <option value="General ZO Skincare Advice">General ZO Skincare Advice</option>
                    <option value="Anti-Ageing & Retinoids">Anti-Ageing & Retinoids</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Skin Type
                  </label>
                  <select
                    value={formData.skinType}
                    onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240] bg-white"
                  >
                    <option>Normal</option>
                    <option>Combination</option>
                    <option>Oily / Blemish-Prone</option>
                    <option>Dry / Dehydrated</option>
                    <option>Sensitive / Rosacea-Prone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Used Medical Skincare Before?
                  </label>
                  <select
                    value={formData.priorMedicalSkincare}
                    onChange={(e) => setFormData({ ...formData, priorMedicalSkincare: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240] bg-white"
                  >
                    <option>No, first time</option>
                    <option>Yes, ZO® Skin Health</option>
                    <option>Yes, Obagi® Medical</option>
                    <option>Yes, other brands</option>
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240]"
                  />
                </div>
              </div>

              {/* Scheduling preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240] bg-white"
                  >
                    <option>Morning (10:00 - 13:00)</option>
                    <option>Afternoon (13:00 - 17:00)</option>
                    <option>Evening (17:00 - 20:00)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Products, Medications, or Specific Questions (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share any products you currently use or details about your skin goals..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240]"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#0a2240] text-white font-bold text-xs hover:bg-[#123661] shadow-md shadow-blue-950/20 transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-cyan-300" />
                  Submit Booking Request
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="py-3.5 px-6 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Roslyn Bolton
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
