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

  const slice = singleLine.slice(0, maxLength);
  const lastSentenceEnd = Math.max(
    slice.lastIndexOf('. '),
    slice.lastIndexOf('! '),
    slice.lastIndexOf('? ')
  );
  if (lastSentenceEnd >= 70) {
    return slice.slice(0, lastSentenceEnd + 1).trim();
  }

  const lastSpace = slice.lastIndexOf(' ');
  const wordBoundary = lastSpace >= 60 ? slice.slice(0, lastSpace) : slice;
  return wordBoundary.replace(/[,;:\-\u2013\u2014]+$/, '').trim();
}

export function buildPageMetadata({
  title,
  description,
  path
}: PageMetadataOptions): Metadata {
  const normalizedPath = path === '/' ? '' : path;
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const cleanDescription = cleanMetaDescription(description, 155);
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
