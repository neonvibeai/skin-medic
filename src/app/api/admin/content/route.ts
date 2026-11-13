import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { readRepoJson, writeRepoJson } from '@/lib/adminStorage';

export interface SiteSlide {
  src: string;
  alt: string;
  caption: string;
  tagline: string;
}

export interface SiteContentData {
  hero: {
    badge: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    trust1Value: string;
    trust1Label: string;
    trust2Value: string;
    trust2Label: string;
    trust3Value: string;
    trust3Label: string;
  };
  welcome: {
    badge: string;
    heading: string;
    body: string;
    directorBio: string;
    mostLovedQuote: string;
  };
  images: {
    founderPortrait: string;
    parallaxBannerDesktop: string;
    parallaxBannerMobile: string;
    videoConsultationBg: string;
  };
  heroSlides: SiteSlide[];
}

const CONTENT_PATH = 'src/data/siteContent.json';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const content = await readRepoJson<SiteContentData>(CONTENT_PATH);
    return NextResponse.json({ content });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load site content';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = (await req.json()) as { content?: SiteContentData };
    if (!body.content || !body.content.hero || !body.content.welcome || !body.content.images) {
      return NextResponse.json({ error: 'Invalid site content payload' }, { status: 400 });
    }
    const result = await writeRepoJson(
      CONTENT_PATH,
      body.content,
      'admin: update site content and images'
    );
    revalidatePath('/');
    return NextResponse.json({ ok: true, content: body.content, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save site content';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
