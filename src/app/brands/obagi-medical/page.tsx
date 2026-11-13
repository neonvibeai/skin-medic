import type { Metadata } from 'next';
import { CATALOG_COUNTS } from '@/lib/siteConfig';
import { buildPageMetadata } from '@/lib/seo';
import ObagiBrandClient from './ObagiBrandClient';

export const metadata: Metadata = buildPageMetadata({
  title: 'Obagi Medical | Hucknall Clinic',
  description: `Discover ${CATALOG_COUNTS.obagi} Obagi Medical skincare systems including Nu-Derm, Obagi-C and ELASTIderm with nurse-led consultations in Hucknall, Nottingham.`,
  path: '/brands/obagi-medical'
});

export default function ObagiMedicalBrandPage() {
  return <ObagiBrandClient />;
}
