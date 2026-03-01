
import { NextResponse, NextRequest } from 'next/server';
import config from '@/app/lib/checkpoint-config.json';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const accept = request.headers.get('accept') || '';
  
  // Detect standard browsers and redirect them to Rickroll.
  if (accept.includes('text/html') || userAgent.includes('Mozilla')) {
    return NextResponse.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }

  return new NextResponse(config.lifetimeToken, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
