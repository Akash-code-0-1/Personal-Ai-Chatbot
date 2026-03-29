import { clearAuthCookie } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await clearAuthCookie();

    return NextResponse.json(
      { message: 'Logged out successfully' },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;',
        },
      }
    );
  } catch (error) {
    console.error('[auth/logout]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
