
import { NextResponse } from 'next/server';
import config from '@/app/lib/checkpoint-config.json';

export const dynamic = 'force-dynamic';

export async function GET() {
  return new NextResponse(config.lifetimeToken, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
