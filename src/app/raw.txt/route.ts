
import { NextResponse, NextRequest } from 'next/server';
import { generateDailyToken, getCurrentUtcDateStr } from '@/app/lib/token-utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const accept = request.headers.get('accept') || '';
  
  // Detect standard browsers (which usually send text/html in Accept header)
  // and redirect them to Rickroll.
  if (accept.includes('text/html') || userAgent.includes('Mozilla')) {
    return NextResponse.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }

  const dateStr = getCurrentUtcDateStr();
  const token = generateDailyToken(dateStr);
  
  return new NextResponse(token, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
