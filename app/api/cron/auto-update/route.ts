import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // For Vercel/Netlify scheduled functions

export async function GET() {
  // Trigger the auto-update check
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auto-update/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  return NextResponse.json(data);
} 