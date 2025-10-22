'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demo purposes
const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@shophub.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'customer1@email.com',
    password: 'customer123',
    name: 'John Doe',
    role: 'user' as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'customer2@email.com',
    password: 'customer123',
    name: 'Jane Smith',
    role: 'user' as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    email: 'customer3@email.com',
    password: 'customer123',
    name: 'Mike Johnson',
    role: 'user' as const,
    createdAt: new Date().toISOString(),
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session on mount
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          // Also set auth cookie for middleware
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
          document.cookie = `auth_session=${JSON.stringify({
            user: parsedUser,
            expiresAt: expiresAt.toISOString()
          })}; path=/; max-age=${60 * 60 * 24 * 7}`;
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        document.cookie = 'auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = DEMO_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));

      // Set auth cookie for middleware
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
      document.cookie = `auth_session=${JSON.stringify({
        user: userWithoutPassword,
        expiresAt: expiresAt.toISOString()
      })}; path=/; max-age=${60 * 60 * 24 * 7}`;

      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    // Clear auth cookie
    document.cookie = 'auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
