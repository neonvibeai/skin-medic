import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const COOKIE_NAME = 'sm_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'SkinMedic2026!';
}

function getSigningSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || `sm-secret-${getAdminPassword()}`;
}

function signPayload(payload: string): string {
  return crypto
    .createHmac('sha256', getSigningSecret())
    .update(payload)
    .digest('base64url');
}

export function createSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = Buffer.from(JSON.stringify({ role: 'admin', exp }), 'utf8').toString('base64url');
  const sig = signPayload(payload);
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expectedSig = signPayload(payload);
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      role?: string;
      exp?: number;
    };
    if (parsed.role !== 'admin') return false;
    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

export function verifyPassword(input: string): boolean {
  const expected = getAdminPassword();
  const a = Buffer.from(input, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export function setSessionCookie(res: NextResponse): void {
  res.cookies.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearSessionCookie(res: NextResponse): void {
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}
