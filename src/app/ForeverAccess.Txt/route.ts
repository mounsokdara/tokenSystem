import { NextRequest, NextResponse } from 'next/server';
import config from '@config/checkpoint-config.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const apiToken = searchParams.get('ApiAccessToken');

  // Security Gate
  if (apiToken !== 'YEUURYEYEEUU') {
    return new NextResponse('Unauthorized: Invalid ApiAccessToken', { 
      status: 401,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  return new NextResponse(config.lifetimeToken, {
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
