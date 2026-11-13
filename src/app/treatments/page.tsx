import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import TreatmentsClient from './TreatmentsClient';

export const metadata: Metadata = buildPageMetadata({
  title: 'Clinic Treatments | Hucknall, Nottingham',
  description:
    'Explore in-clinic aesthetic and medical skin treatments in Hucknall, Nottingham, including dermal fillers, Profhilo, Sculptra and clinical facials.',
  path: '/treatments'
});

export default function TreatmentsPage() {
  return <TreatmentsClient />;
}
