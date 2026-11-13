import type { Metadata } from 'next';
import { CATALOG_COUNTS } from '@/lib/siteConfig';
import { buildPageMetadata } from '@/lib/seo';
import ZOBrandClient from './ZOBrandClient';

export const metadata: Metadata = buildPageMetadata({
  title: 'ZO Skin Health | Hucknall Clinic',
  description: `Explore ${CATALOG_COUNTS.zo} physician-dispensed ZO Skin Health products and Getting Skin Ready protocols with clinical guidance in Hucknall, Nottingham.`,
  path: '/brands/zo-skin-health'
});

export default function ZOSkinHealthBrandPage() {
  return <ZOBrandClient />;
}
