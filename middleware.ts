import { NextRequest, NextResponse } from 'next/server';

const authHits = new Map<string, { count: number; ts: number }>();

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    const ip = req.ip ?? 'unknown';
    const now = Date.now();
    const bucket = authHits.get(ip) ?? { count: 0, ts: now };
    if (now - bucket.ts > 60_000) {
      bucket.count = 0;
      bucket.ts = now;
    }
    bucket.count += 1;
    authHits.set(ip, bucket);

    if (bucket.count > 40) {
      return NextResponse.json({ error: 'Too many auth requests' }, { status: 429 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/auth/:path*']
};
