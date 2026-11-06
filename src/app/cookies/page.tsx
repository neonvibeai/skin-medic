import React from 'react';

export default function CookiesPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
        <h1 className="font-serif font-bold text-3xl text-slate-900">
          Cookie Policy
        </h1>
        <p className="text-xs text-slate-400">
          Skin Medic Skin Care Limited (UK)
        </p>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-lg text-slate-900">Essential Website Cookies</h2>
          <p>
            We use essential cookies to maintain your consultation session state, remember your navigation preferences, and ensure secure communication through our website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-lg text-slate-900">Managing Your Preferences</h2>
          <p>
            You can control and disable cookies via your web browser settings at any time without affecting your ability to book a virtual skin consultation with our clinic.
          </p>
        </section>
      </div>
    </div>
  );
}
