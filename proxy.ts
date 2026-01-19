import { NextResponse, type NextRequest } from 'next/server';

export const config = {
  matcher: ['/studio/:path*'],
};

function unauthorized() {
  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Studio"',
    },
  });
}

export default function proxy(req: NextRequest) {
  // dev: pas de protection
  //if (process.env.NODE_ENV !== 'production') return NextResponse.next();

  const user = process.env.STUDIO_USER;
  const pass = process.env.STUDIO_PASS;
  if (!user || !pass) return unauthorized();

  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) return unauthorized();

  const encoded = auth.slice('Basic '.length);

  let decoded: string;
  try {
    decoded = Buffer.from(encoded, 'base64').toString('utf8');
  } catch {
    return unauthorized();
  }

  const [u, p] = decoded.split(':');
  if (u !== user || p !== pass) return unauthorized();

  return NextResponse.next();
}
