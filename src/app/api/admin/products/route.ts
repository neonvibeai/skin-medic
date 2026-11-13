import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { readRepoJson, slugify, writeRepoJson } from '@/lib/adminStorage';
import { Product } from '@/types';

const PRODUCTS_PATH = 'src/data/products.json';

function uniqueSlug(base: string, existing: Product[]): string {
  const clean = slugify(base) || `product-${Date.now()}`;
  const used = new Set(existing.map((p) => p.slug));
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
    const products = await readRepoJson<Product[]>(PRODUCTS_PATH);
    return NextResponse.json({ products });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load products';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = (await req.json()) as { product?: Partial<Product> };
    const input = body.product;
    if (!input || !input.name || !input.brand || typeof input.price !== 'number') {
      return NextResponse.json(
        { error: 'Product name, brand, and numeric price are required' },
        { status: 400 }
      );
    }

    const products = await readRepoJson<Product[]>(PRODUCTS_PATH);
    const slug = uniqueSlug(input.slug || input.name, products);
    const id = input.id?.trim() || `${slug}-${Date.now().toString(36)}`;
    const maxOrder = products.reduce((max, p) => Math.max(max, p.orderIndex ?? 0), 0);

    const newProduct: Product = {
      id,
      slug,
      name: input.name.trim(),
      brand: input.brand,
      price: Number(input.price),
      salePrice: input.salePrice ?? null,
      categories: Array.isArray(input.categories) ? input.categories : ['Skincare'],
      description: input.description ?? '',
      shortDescription: input.shortDescription ?? '',
      howToUse: input.howToUse ?? '',
      ingredients: input.ingredients ?? '',
      safetyInfo: input.safetyInfo ?? '',
      benefits: input.benefits ?? '',
      storage: input.storage ?? 'Store at room temperature away from direct sunlight.',
      isFeatured: Boolean(input.isFeatured),
      isMostLoved: Boolean(input.isMostLoved),
      images:
        Array.isArray(input.images) && input.images.length > 0
          ? input.images
          : ['/images/hero-1.jpg'],
      inStock: input.inStock !== false,
      orderIndex: maxOrder + 1,
      ...(input.capacity ? { capacity: input.capacity } : {}),
      ...(input.indication ? { indication: input.indication } : {}),
    };

    const updated = [newProduct, ...products];
    const result = await writeRepoJson(
      PRODUCTS_PATH,
      updated,
      `admin: add product ${newProduct.name}`
    );
    revalidatePath('/');
    revalidatePath('/shop');
    return NextResponse.json({ ok: true, product: newProduct, products: updated, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create product';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = (await req.json()) as { product?: Product };
    const incoming = body.product;
    if (!incoming || !incoming.id) {
      return NextResponse.json({ error: 'Product id is required' }, { status: 400 });
    }

    const products = await readRepoJson<Product[]>(PRODUCTS_PATH);
    const idx = products.findIndex((p) => p.id === incoming.id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updated = [...products];
    updated[idx] = {
      ...products[idx],
      ...incoming,
      price: Number(incoming.price),
      salePrice: incoming.salePrice === null || incoming.salePrice === undefined ? null : Number(incoming.salePrice),
    };

    const result = await writeRepoJson(
      PRODUCTS_PATH,
      updated,
      `admin: update product ${updated[idx].name}`
    );
    revalidatePath('/');
    revalidatePath('/shop');
    revalidatePath(`/shop/${updated[idx].slug}`);
    return NextResponse.json({ ok: true, product: updated[idx], products: updated, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update product';
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
      return NextResponse.json({ error: 'Product id query param is required' }, { status: 400 });
    }

    const products = await readRepoJson<Product[]>(PRODUCTS_PATH);
    const target = products.find((p) => p.id === id);
    if (!target) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updated = products.filter((p) => p.id !== id);
    const result = await writeRepoJson(
      PRODUCTS_PATH,
      updated,
      `admin: delete product ${target.name}`
    );
    revalidatePath('/');
    revalidatePath('/shop');
    return NextResponse.json({ ok: true, products: updated, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete product';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
