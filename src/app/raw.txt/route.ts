import { NextResponse } from 'next/server';
import { generateDailyToken, getCurrentUtcDateStr } from '@/app/lib/token-utils';

export const dynamic = 'force-dynamic';

export async function GET() {
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
