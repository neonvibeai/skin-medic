import type { Metadata } from 'next';
import { CATALOG_COUNTS } from '@/lib/siteConfig';
import { buildPageMetadata } from '@/lib/seo';
import ShopClient from './ShopClient';

export const metadata: Metadata = buildPageMetadata({
  title: 'Medical Skincare Shop',
  description: `Browse ${CATALOG_COUNTS.total} medical-grade ZO Skin Health and Obagi Medical products available via clinical consultation from Skin Medic Skin Care in Hucknall.`,
  path: '/shop'
});

export default function ShopPage() {
  return <ShopClient />;
}
