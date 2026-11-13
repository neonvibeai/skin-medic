import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { slugify, writeRepoFile } from '@/lib/adminStorage';

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: 'Image is too large (maximum 4 MB)' },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name).toLowerCase() || '.jpg';
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: 'Unsupported image format. Please use JPG, PNG, WebP, or AVIF.' },
        { status: 400 }
      );
    }

    const baseName = slugify(path.basename(file.name, ext)) || 'image';
    const fileName = `${baseName}-${Date.now().toString(36)}${ext}`;
    const repoPath = `public/images/uploads/${fileName}`;
    const publicUrl = `/images/uploads/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await writeRepoFile(repoPath, buffer, `admin: upload image ${fileName}`);
    return NextResponse.json({ ok: true, url: publicUrl, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to upload image';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
