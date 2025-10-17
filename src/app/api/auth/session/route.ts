import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AuthSession } from '@/types';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('auth_session');

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const session: AuthSession = JSON.parse(sessionCookie.value);

    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      cookieStore.delete('auth_session');
      return NextResponse.json(
        { error: 'Session expired' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user: session.user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid session' },
      { status: 401 }
    );
  }
}
