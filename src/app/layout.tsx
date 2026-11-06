import type { Metadata } from 'next';
import { Playfair_Display, Roboto } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ConsultationModal from '@/components/ConsultationModal';
import { ConsultationProvider } from '@/context/ConsultationContext';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap'
});

const roboto = Roboto({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Skin Medic Skin Care | ZO® Skin Health & Obagi® Medical Specialists (UK)',
  description:
    'Advanced medical-grade skincare backed by science. Official ZO Skin Health & Obagi Medical consultations and tailored skin protocols led by Roslyn Bolton in Hucknall, Nottingham.',
  keywords: [
    'ZO Skin Health UK',
    'Obagi Medical',
    'Skin Medic Skin Care',
    'Medical Skincare Consultation',
    'Roslyn Bolton',
    'Hucknall Skin Clinic',
    'Clinical Facials',
    'ZO Anti-Ageing',
    'ZO Cleanser'
  ],
  authors: [{ name: 'Roslyn Bolton' }],
  openGraph: {
    title: 'Skin Medic Skin Care | Advanced Skincare Backed by Science',
    description: 'Book your free online video consultation with a certified medical skin expert.',
    url: 'https://skinmedicskincare.com',
    siteName: 'Skin Medic Skin Care',
    locale: 'en_GB',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased selection:bg-cyan-100 selection:text-[#0a2240]">
        <ConsultationProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ConsultationModal />
          <WhatsAppButton />
        </ConsultationProvider>
      </body>
    </html>
  );
}
