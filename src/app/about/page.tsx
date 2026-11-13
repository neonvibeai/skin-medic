import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import AboutClient from './AboutClient';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Roslyn Bolton | Hucknall',
  description:
    'Meet Roslyn Bolton, Registered Nurse and founder of Skin Medic Skin Care in Hucknall, Nottingham, offering medical-grade skincare guidance.',
  path: '/about'
});

export default function AboutPage() {
  return <AboutClient />;
}
