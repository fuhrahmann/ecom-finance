import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthSession } from '@/types';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('auth_session');

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const session: AuthSession = JSON.parse(sessionCookie.value);

      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Check if user is admin
      if (session.user.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
