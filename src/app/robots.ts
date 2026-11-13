import type { MetadataRoute } from 'next';
import { IS_PREVIEW_ENV, SITE_URL } from '@/lib/siteConfig';

export default function robots(): MetadataRoute.Robots {
  const isVercelPreviewHost =
    SITE_URL.includes('vercel.app') ||
    Boolean(process.env.VERCEL_URL && process.env.VERCEL_ENV !== 'production');

  if (IS_PREVIEW_ENV || isVercelPreviewHost) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/'
      }
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
