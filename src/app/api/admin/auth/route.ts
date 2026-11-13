import { NextRequest, NextResponse } from 'next/server';
import {
  clearSessionCookie,
  isAuthenticated,
  setSessionCookie,
  verifyPassword,
} from '@/lib/adminAuth';
import { hasGitHubToken, isCloudEnvironment } from '@/lib/adminStorage';

export async function GET() {
  const authenticated = await isAuthenticated();
  return NextResponse.json({
    authenticated,
    cloudMode: isCloudEnvironment(),
    githubConfigured: hasGitHubToken(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { password?: string };
    const password = typeof body.password === 'string' ? body.password : '';
    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
    const res = NextResponse.json({
      authenticated: true,
      cloudMode: isCloudEnvironment(),
      githubConfigured: hasGitHubToken(),
    });
    setSessionCookie(res);
    return res;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ authenticated: false });
  clearSessionCookie(res);
  return res;
}
