import { NextResponse } from 'next/server';
import { generateDailyToken, getCurrentUtcDateStr } from '@/app/lib/token-utils';

export async function GET() {
  const dateStr = getCurrentUtcDateStr();
  const token = generateDailyToken(dateStr);
  
  return NextResponse.json({
    token,
    date: dateStr,
    timestamp: new Date().toISOString(),
    status: 'success',
    version: '1.0.0'
  });
}
