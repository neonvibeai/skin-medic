import type { Metadata } from 'next';
import { Playfair_Display, Roboto } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ConsultationModal from '@/components/ConsultationModal';
import JsonLd from '@/components/JsonLd';
import { ConsultationProvider } from '@/context/ConsultationContext';
import { CLINIC_INFO } from '@/data/siteData';
import { ALLOW_INDEXING, SITE_URL } from '@/lib/siteConfig';

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

const shouldNoIndex = !ALLOW_INDEXING;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Skin Medic Skin Care | Hucknall, Nottingham',
    template: '%s | Skin Medic Skin Care'
  },
  description:
    'Medical-grade skincare consultations with Roslyn Bolton in Hucknall, Nottingham. Official ZO Skin Health and Obagi Medical clinic protocols.',
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
  authors: [{ name: CLINIC_INFO.founder.name }],
  ...(shouldNoIndex
    ? {
        robots: {
          index: false,
          follow: false
        }
      }
    : {}),
  openGraph: {
    title: 'Skin Medic Skin Care | Advanced Skincare Backed by Science',
    description:
      'Book your free online video consultation with a certified medical skin expert in Hucknall, Nottingham.',
    url: SITE_URL,
    siteName: CLINIC_INFO.name,
    locale: 'en_GB',
    type: 'website'
  }
};

const clinicJsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: CLINIC_INFO.name,
  url: SITE_URL,
  telephone: CLINIC_INFO.phone,
  email: CLINIC_INFO.email,
  logo: `${SITE_URL}/images/skin-medic-logo.png`,
  image: `${SITE_URL}/images/roslyn-bolton.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CLINIC_INFO.address.street,
    addressLocality: CLINIC_INFO.address.town,
    addressRegion: CLINIC_INFO.address.city,
    postalCode: CLINIC_INFO.address.postcode,
    addressCountry: 'GB'
  },
  areaServed: [
    { '@type': 'City', name: 'Hucknall' },
    { '@type': 'City', name: 'Nottingham' }
  ],
  founder: {
    '@type': 'Person',
    name: CLINIC_INFO.founder.name,
    jobTitle: CLINIC_INFO.founder.title
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${playfair.variable} ${roboto.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased selection:bg-cyan-100 selection:text-[#0a2240]">
        <JsonLd data={clinicJsonLd} />
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
