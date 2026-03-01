import { NextResponse, NextRequest } from 'next/server';
import config from '@config/checkpoint-config.json';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Rickroll removed as requested. Serving pure raw content to all clients.
  return new NextResponse(config.lifetimeToken, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
