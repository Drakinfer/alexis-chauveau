import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/studio/:path*'],
};

function unauthorized() {
  return new NextResponse('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Studio"' },
  });
}

export function proxy(req: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next();
  }

  const user = process.env.STUDIO_USER;
  const pass = process.env.STUDIO_PASS;
  if (!user || !pass) return unauthorized();

  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) return unauthorized();

  const base64 = auth.slice('Basic '.length);
  let decoded = '';
  try {
    decoded = Buffer.from(base64, 'base64').toString('utf8');
  } catch {
    return unauthorized();
  }

  const [u, p] = decoded.split(':');
  if (u !== user || p !== pass) return unauthorized();

  return NextResponse.next();
}
