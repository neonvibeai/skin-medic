import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { readRepoJson, slugify, writeRepoJson } from '@/lib/adminStorage';
import { Treatment } from '@/types';

const TREATMENTS_PATH = 'src/data/treatments.json';

function uniqueSlug(base: string, existing: Treatment[]): string {
  const clean = slugify(base) || `treatment-${Date.now()}`;
  const used = new Set(existing.map((t) => t.slug));
  if (!used.has(clean)) return clean;
  let i = 2;
  while (used.has(`${clean}-${i}`)) i++;
  return `${clean}-${i}`;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const treatments = await readRepoJson<Treatment[]>(TREATMENTS_PATH);
    return NextResponse.json({ treatments });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load treatments';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = (await req.json()) as { treatment?: Partial<Treatment> };
    const input = body.treatment;
    if (!input || !input.title) {
      return NextResponse.json({ error: 'Treatment title is required' }, { status: 400 });
    }

    const treatments = await readRepoJson<Treatment[]>(TREATMENTS_PATH);
    const slug = uniqueSlug(input.slug || input.title, treatments);
    const id = input.id?.trim() || slug;

    const newTreatment: Treatment = {
      id,
      slug,
      title: input.title.trim(),
      subtitle: input.subtitle?.trim() || 'Aesthetic Clinical Treatment',
      description: input.description?.trim() || '',
      pricingSectionTitle: input.pricingSectionTitle?.trim() || 'Treatment Pricing',
      priceHighlight: input.priceHighlight?.trim() || 'Consultation Required',
      pricingDetails: input.pricingDetails?.trim() || '',
      pricingNote: input.pricingNote?.trim() || '',
      pricingTable: Array.isArray(input.pricingTable) ? input.pricingTable : [],
      faqs: Array.isArray(input.faqs) ? input.faqs : [],
      ctaTitle: input.ctaTitle?.trim() || `Book Your ${input.title.trim()} Consultation`,
      ctaDescription:
        input.ctaDescription?.trim() ||
        'Schedule a personalised assessment with Registered Nurse Roslyn Bolton.',
      ctaButton: input.ctaButton?.trim() || 'Book Consultation',
    };

    const updated = [...treatments, newTreatment];
    const result = await writeRepoJson(
      TREATMENTS_PATH,
      updated,
      `admin: add treatment ${newTreatment.title}`
    );
    revalidatePath('/');
    revalidatePath('/treatments');
    return NextResponse.json({ ok: true, treatment: newTreatment, treatments: updated, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create treatment';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = (await req.json()) as { treatment?: Treatment };
    const incoming = body.treatment;
    if (!incoming || !incoming.id) {
      return NextResponse.json({ error: 'Treatment id is required' }, { status: 400 });
    }

    const treatments = await readRepoJson<Treatment[]>(TREATMENTS_PATH);
    const idx = treatments.findIndex((t) => t.id === incoming.id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Treatment not found' }, { status: 404 });
    }

    const updated = [...treatments];
    updated[idx] = { ...treatments[idx], ...incoming };

    const result = await writeRepoJson(
      TREATMENTS_PATH,
      updated,
      `admin: update treatment ${updated[idx].title}`
    );
    revalidatePath('/');
    revalidatePath('/treatments');
    revalidatePath(`/treatments/${updated[idx].slug}`);
    return NextResponse.json({ ok: true, treatment: updated[idx], treatments: updated, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update treatment';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Treatment id query param is required' }, { status: 400 });
    }

    const treatments = await readRepoJson<Treatment[]>(TREATMENTS_PATH);
    const target = treatments.find((t) => t.id === id);
    if (!target) {
      return NextResponse.json({ error: 'Treatment not found' }, { status: 404 });
    }

    const updated = treatments.filter((t) => t.id !== id);
    const result = await writeRepoJson(
      TREATMENTS_PATH,
      updated,
      `admin: delete treatment ${target.title}`
    );
    revalidatePath('/');
    revalidatePath('/treatments');
    return NextResponse.json({ ok: true, treatments: updated, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete treatment';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
