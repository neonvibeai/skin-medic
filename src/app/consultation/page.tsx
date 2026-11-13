import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import ConsultationClient from './ConsultationClient';

export const metadata: Metadata = buildPageMetadata({
  title: 'Book Free Skin Consultation',
  description:
    'Book a complimentary 30-minute video or in-clinic skin consultation with Roslyn Bolton in Hucknall, Nottingham for tailored skincare advice.',
  path: '/consultation'
});

export default function ConsultationPage() {
  return <ConsultationClient />;
}
