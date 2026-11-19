import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/portfolio';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = getPortfolioData();
  if (!data) {
    return NextResponse.json({ error: 'Portfolio data not found' }, { status: 404 });
  }
  return NextResponse.json(data);
}

export async function POST(request) {
  return handleSave(request);
}

export async function PUT(request) {
  return handleSave(request);
}

async function handleSave(request) {
  // Guard: Verify Admin Session
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin credentials required to edit portfolio.' },
      { status: 401 }
    );
  }

  try {
    const updatedData = await request.json();
    if (!updatedData || typeof updatedData !== 'object') {
      return NextResponse.json({ error: 'Invalid portfolio data payload' }, { status: 400 });
    }

    const success = savePortfolioData(updatedData);
    if (!success) {
      return NextResponse.json({ error: 'Failed to save portfolio data' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Portfolio updated successfully by ' + session.username,
      data: updatedData,
    });
  } catch (error) {
    console.error('Portfolio save error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
