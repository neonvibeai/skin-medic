import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import HowItWorksClient from './HowItWorksClient';

export const metadata: Metadata = buildPageMetadata({
  title: 'How Consultations Work',
  description:
    'Learn how our 3-step virtual skin consultation, personalised ZO Skin Health or Obagi plan and UK home delivery work at Skin Medic Skin Care.',
  path: '/how-it-works'
});

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
