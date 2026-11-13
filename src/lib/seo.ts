import type { Metadata } from 'next';
import { SITE_URL } from './siteConfig';

interface PageMetadataOptions {
  title: string | { absolute: string };
  description: string;
  path: string;
}

export function cleanMetaDescription(raw: string, maxLength = 155): string {
  const singleLine = raw.replace(/\s+/g, ' ').trim();
  if (singleLine.length <= maxLength) return singleLine;
  return `${singleLine.slice(0, maxLength - 1).trimEnd()}…`;
}

export function buildPageMetadata({
  title,
  description,
  path
}: PageMetadataOptions): Metadata {
  const normalizedPath = path === '/' ? '' : path;
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const cleanDescription = cleanMetaDescription(description, 160);
  const ogTitle = typeof title === 'string' ? `${title} | Skin Medic Skin Care` : title.absolute;

  return {
    title,
    description: cleanDescription,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: ogTitle,
      description: cleanDescription,
      url: canonicalUrl,
      siteName: 'Skin Medic Skin Care',
      locale: 'en_GB',
      type: 'website'
    }
  };
}
