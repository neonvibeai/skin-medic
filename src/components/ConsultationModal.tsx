'use client';

import React, { useState } from 'react';
import { useConsultation } from '@/context/ConsultationContext';
import { CLINIC_INFO, SKIN_CONCERNS } from '@/data/siteData';
import { X, Calendar, Clock, Video, MapPin, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';

export default function ConsultationModal() {
  const { isOpen, selectedProduct, closeConsultation } = useConsultation();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    consultationType: 'video',
    concern: 'Anti-Ageing',
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'Morning (10:00 - 13:00)',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppSubmit = () => {
    const text = `Hello Roslyn Bolton! I would like to book a skincare consultation with Skin Medic Skin Care.
${selectedProduct ? `*Product of Interest:* ${selectedProduct}\n` : ''}
*Consultation Format:* ${formData.consultationType.toUpperCase()}
*Primary Concern:* ${formData.concern}
*Preferred Date:* ${formData.preferredDate || 'Flexible'} (${formData.preferredTime})
*Name:* ${formData.fullName}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
${formData.notes ? `*Notes:* ${formData.notes}` : ''}`;

    const url = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    closeConsultation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0a2240] via-[#0f2e54] to-[#163a69] text-white p-6 relative">
          <button
            onClick={resetAndClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              100% Free Consultation
            </span>
            <span className="text-xs text-slate-300">No purchase obligation</span>
          </div>

          <h2 className="text-2xl font-serif font-bold tracking-tight">
            Book Your Expert Skin Consultation
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Personalised medical-grade assessment led by Roslyn Bolton (16+ yrs clinical experience).
          </p>

          {selectedProduct && (
            <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/15 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
              <p className="text-xs text-slate-100">
                Enquiring about prescription product: <span className="font-semibold text-white underline">{selectedProduct}</span>
              </p>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Consultation Request Received!
              </h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{formData.fullName || 'Patient'}</span>. 
                Roslyn Bolton and our clinical team will review your enquiry and contact you within 24 hours to confirm your video or clinic appointment.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition text-sm"
                >
                  Back to Website
                </button>
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition text-sm inline-flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Roslyn Bolton
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Consultation Format */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Select Consultation Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: 'video' })}
                    className={`p-3 rounded-xl border text-left transition flex flex-col gap-1 ${
                      formData.consultationType === 'video'
                        ? 'border-[#0a2240] bg-blue-50/70 text-[#0a2240] ring-1 ring-[#0a2240]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs">
                      <Video className="w-4 h-4 text-blue-600" />
                      Video Consultation
                    </div>
                    <span className="text-[11px] text-slate-500">Free 30-min Zoom / WhatsApp Call</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: 'clinic' })}
                    className={`p-3 rounded-xl border text-left transition flex flex-col gap-1 ${
                      formData.consultationType === 'clinic'
                        ? 'border-[#0a2240] bg-blue-50/70 text-[#0a2240] ring-1 ring-[#0a2240]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      In-Clinic Visit
                    </div>
                    <span className="text-[11px] text-slate-500">Hucknall, Nottingham clinic</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: 'whatsapp' })}
                    className={`p-3 rounded-xl border text-left transition flex flex-col gap-1 ${
                      formData.consultationType === 'whatsapp'
                        ? 'border-[#0a2240] bg-blue-50/70 text-[#0a2240] ring-1 ring-[#0a2240]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs">
                      <MessageSquare className="w-4 h-4 text-teal-600" />
                      Fast WhatsApp Chat
                    </div>
                    <span className="text-[11px] text-slate-500">Quick question & photo assessment</span>
                  </button>
                </div>
              </div>

              {/* Skin Concern */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Primary Skin Concern
                </label>
                <select
                  value={formData.concern}
                  onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2240] bg-white text-slate-800"
                >
                  {SKIN_CONCERNS.map((c) => (
                    <option key={c.slug} value={c.name}>
                      {c.name} — {c.tagline}
                    </option>
                  ))}
                  <option value="General ZO Skin Health Protocol">General ZO Skin Health Protocol</option>
                  <option value="Obagi Medical Prescription Routine">Obagi Medical Prescription Routine</option>
                  <option value="Other / Clinical Advice">Other / Clinical Advice</option>
                </select>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2240]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +44 7123 456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2240]"
                  />
                </div>
              </div>

              {/* Email & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2240]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date & Time Window
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-1/2 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#0a2240]"
                    />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-1/2 px-2 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#0a2240] bg-white"
                    >
                      <option>Morning (10:00 - 13:00)</option>
                      <option>Afternoon (13:00 - 17:00)</option>
                      <option>Evening (17:00 - 20:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Routine / Allergies / Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share any skin sensitivity, past treatments, or products you currently use..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#0a2240]"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 rounded-xl bg-[#0a2240] text-white font-semibold text-sm hover:bg-[#103058] shadow-md shadow-blue-950/20 transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-cyan-300" />
                  Submit Consultation Request
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="py-3 px-5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Roslyn Bolton
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                🔒 Your medical details are strictly confidential under UK healthcare regulations.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
