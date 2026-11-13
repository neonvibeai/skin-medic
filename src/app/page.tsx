import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import HomeClient from './HomeClient';

export const metadata: Metadata = buildPageMetadata({
  title: {
    absolute: 'Skin Medic Skin Care | Medical Skincare Hucknall, Nottingham'
  },
  description:
    'Medical-grade skincare consultations with Roslyn Bolton in Hucknall, Nottingham. Official ZO Skin Health and Obagi Medical clinic protocols.',
  path: '/'
});

export default function HomePage() {
  return <HomeClient />;
}
