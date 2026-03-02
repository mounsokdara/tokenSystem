import { NextRequest, NextResponse } from 'next/server';
import { generateDailyToken, getCurrentUtcDateStr } from '@/app/lib/token-utils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = searchParams.get('AccessToken');

  // Security Gate
  if (accessToken !== '1Y8DIWB99ET') {
    return new NextResponse('Unauthorized: Invalid AccessToken', { 
      status: 401,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  const dateStr = getCurrentUtcDateStr();
  const token = generateDailyToken(dateStr);
  
  return new NextResponse(token, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store'
    },
  });
}
