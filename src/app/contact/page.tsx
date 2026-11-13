import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import ContactClient from './ContactClient';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Clinic | Hucknall, Nottingham',
  description:
    'Contact Skin Medic Skin Care at 37 Portland Road, Hucknall, Nottingham NG15 7SL. Book a consultation by phone, email or WhatsApp.',
  path: '/contact'
});

export default function ContactPage() {
  return <ContactClient />;
}
