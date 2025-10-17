import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { User, AuthSession } from '@/types';

// Demo users - in production, this would be from a database
const DEMO_USERS = [
  {
    id: 'user-admin-1',
    email: 'admin@demo.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-1',
    email: 'user@demo.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user' as const,
    createdAt: new Date().toISOString(),
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find user
    const user = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create user object without password
    const userWithoutPassword: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };

    // Create session
    const session: AuthSession = {
      user: userWithoutPassword,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    };

    // Store session in cookie
    const cookieStore = await cookies();
    cookieStore.set('auth_session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
