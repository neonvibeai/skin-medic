'use client';

import React, { useState } from 'react';
import { CLINIC_INFO } from '@/data/siteData';
import { useConsultation } from '@/context/ConsultationContext';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const { openConsultation } = useConsultation();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Skincare Enquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 8000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0a2240]">
            We&apos;re Here to Help
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900">
            Contact Skin Medic Skin Care
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Whether you&apos;re looking to book a complimentary skin consultation, have questions about our ZO® or Obagi® medical products, or need advice—our clinical team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="font-serif font-bold text-xl text-slate-900">
                Clinic Details
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0a2240] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Address:</strong>
                    <span>
                      {CLINIC_INFO.address.street}, {CLINIC_INFO.address.town}, {CLINIC_INFO.address.city}, {CLINIC_INFO.address.postcode}, {CLINIC_INFO.address.country}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0a2240] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Telephone:</strong>
                    <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-[#0a2240] transition">
                      {CLINIC_INFO.phone}
                    </a>
                    <span className="block text-slate-400 text-xs">Alt: {CLINIC_INFO.phoneAlt}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0a2240] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Email:</strong>
                    <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-[#0a2240] transition">
                      {CLINIC_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0a2240] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Clinic Hours:</strong>
                    <span>Monday – Friday: 09:00 – 18:00</span>
                    <span className="block text-slate-500">Saturday: 10:00 – 16:00 (By Appointment)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href={CLINIC_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Roslyn Bolton
                </a>

                <button
                  onClick={() => openConsultation()}
                  className="w-full py-3 px-4 rounded-xl bg-[#0a2240] hover:bg-[#123661] text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  Free skincare consultation
                </button>
              </div>
            </div>
          </div>

          {/* Right: Interactive Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
            <h2 className="font-serif font-bold text-2xl text-slate-900 mb-2">
              Send an Online Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Fill out the form below and Roslyn Bolton or a clinical advisor will reply promptly within 24 hours.
            </p>

            {sent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-slate-900">
                  Message Sent Successfully
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for reaching out to Skin Medic Skin Care. We have received your enquiry and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+44 7..."
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Enquiry Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240] bg-white"
                    >
                      <option>General Skincare Enquiry</option>
                      <option>ZO® Skin Health Consultation</option>
                      <option>Obagi® Medical Prescription</option>
                      <option>In-Clinic Treatment in Hucknall</option>
                      <option>Order / Delivery Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your skin concerns, goals, or questions..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0a2240]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#0a2240] text-white font-bold text-xs hover:bg-[#123661] transition flex items-center justify-center gap-2 shadow-md shadow-blue-950/20"
                >
                  <Send className="w-4 h-4 text-cyan-300" />
                  Send Clinical Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
