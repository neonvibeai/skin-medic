import React from 'react';
import { Phone, MessageSquare, MapPin, Calendar } from 'lucide-react';

interface Props {
  treatmentTitle?: string;
}

export const CLINIC_WHATSAPP_URL = 'https://wa.me/447956072102';
export const TREATMENT_BOOKING_URL = 'https://portal.aestheticnursesoftware.com/book-online/30610';

/** Builds a WhatsApp booking link with an optional pre-filled message. */
export function whatsappBookingLink(message?: string) {
  return message
    ? `${CLINIC_WHATSAPP_URL}?text=${encodeURIComponent(message)}`
    : CLINIC_WHATSAPP_URL;
}

/**
 * Shared clinic contact banner displayed at the end of every treatment page.
 * Content follows the client brief exactly.
 */
export default function TreatmentContactSection({ treatmentTitle }: Props) {
  const waHref = whatsappBookingLink(
    treatmentTitle
      ? `Hello Skin Medic, I would like to book a consultation for ${treatmentTitle}.`
      : undefined
  );

  return (
    <section
      className="clinic-contact-banner mt-16 sm:mt-24 bg-[#0a2240] text-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/10 shadow-2xl relative overflow-hidden"
      aria-labelledby="clinic-contact-heading"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h3
          id="clinic-contact-heading"
          className="text-3xl sm:text-4xl font-serif font-normal text-white"
        >
          Book Your Consultation
        </h3>

        <p className="mt-4 text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
          Discuss your concerns, explore suitable options and understand your treatment plan before deciding.
        </p>

        <div className="mt-6">
          <a
            href={TREATMENT_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold uppercase tracking-wider transition shadow-xl inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-slate-950" />
            Book a treatment
          </a>
        </div>

        <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <li className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-3">
            <Phone className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong className="block font-semibold text-white mb-0.5">Call or text:</strong>
              <a href="tel:07956072102" className="text-cyan-200 hover:text-white underline-offset-4 hover:underline transition">
                07956 072102
              </a>
            </div>
          </li>

          <li className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong className="block font-semibold text-white mb-0.5">WhatsApp:</strong>
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="text-cyan-200 hover:text-white underline-offset-4 hover:underline transition"
              >
                Chat on WhatsApp
              </a>
            </div>
          </li>

          <li className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong className="block font-semibold text-white mb-0.5">Visit us:</strong>
              <span className="text-slate-300">Skin Medic, 37 Portland Road, Hucknall, NG15 7SL</span>
            </div>
          </li>
        </ul>

        <p className="disclaimer mt-8 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-400 leading-relaxed">
          <em>
            Treatment suitability, results and recovery vary. Your practitioner will explain the proposed procedure, risks, aftercare and full cost before you proceed.
          </em>
        </p>
      </div>
    </section>
  );
}
