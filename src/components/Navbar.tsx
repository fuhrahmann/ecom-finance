'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200/50 dark:border-emerald-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-black dark:text-emerald-50">
                FinanceHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link href="/" className="text-black dark:text-emerald-100 hover:text-teal-600 dark:hover:text-emerald-300 transition-colors px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/products" className="text-black dark:text-emerald-100 hover:text-teal-600 dark:hover:text-emerald-300 transition-colors px-3 py-2 text-sm font-medium">
              Products
            </Link>

            {user && user.role === 'admin' && (
              <Link href="/admin/products" className="text-black dark:text-emerald-100 hover:text-teal-600 dark:hover:text-emerald-300 transition-colors px-3 py-2 text-sm font-medium">
                Manage Products
              </Link>
            )}

            <Link href="/dashboard" className="text-black dark:text-emerald-100 hover:text-teal-600 dark:hover:text-emerald-300 transition-colors px-3 py-2 text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/orders" className="text-black dark:text-emerald-100 hover:text-teal-600 dark:hover:text-emerald-300 transition-colors px-3 py-2 text-sm font-medium">
              Orders
            </Link>
            <Link href="/analytics" className="text-black dark:text-emerald-100 hover:text-teal-600 dark:hover:text-emerald-300 transition-colors px-3 py-2 text-sm font-medium">
              Analytics
            </Link>
            <Link
              href="/cart"
              className="ml-2 bg-teal-500 dark:bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-teal-600 dark:hover:bg-emerald-500 transition-colors text-sm font-medium flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Cart (0)</span>
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg bg-gray-100 dark:bg-emerald-900/50 hover:bg-gray-200 dark:hover:bg-emerald-800/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* User Menu */}
            {!loading && (
              <div className="relative ml-2">
                {user ? (
                  <>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-emerald-900/50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 dark:from-emerald-500 dark:to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-black dark:text-emerald-100">{user.name}</span>
                      <svg className="w-4 h-4 text-black dark:text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black/95 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-emerald-800">
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-emerald-800">
                          <p className="text-sm font-semibold text-black dark:text-emerald-50">{user.name}</p>
                          <p className="text-xs text-black dark:text-emerald-200">{user.email}</p>
                          <span className="inline-block mt-1 px-2 py-1 bg-teal-100 dark:bg-emerald-900 text-teal-700 dark:text-emerald-300 text-xs font-semibold rounded">
                            {user.role === 'admin' ? 'Admin' : 'User'}
                          </span>
                        </div>
                        <div className="px-4 py-2">
                          <button
                            onClick={handleLogout}
                            className="w-full text-center px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-500 transition-colors rounded-sm"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-emerald-900/50 hover:bg-gray-200 dark:hover:bg-emerald-800/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black dark:text-emerald-100 hover:text-teal-600 dark:hover:text-emerald-300 focus:outline-none p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-emerald-900/50 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-gray-200 dark:border-emerald-800 shadow-lg">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {user ? (
              <div className="px-4 py-3 bg-teal-50 dark:bg-emerald-900/30 rounded-xl mb-3">
                <p className="text-sm font-semibold text-black dark:text-emerald-50">{user.name}</p>
                <p className="text-xs text-black dark:text-emerald-200">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-1 bg-teal-600 dark:bg-emerald-600 text-white text-xs font-semibold rounded">
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-3 text-xs text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-xl transition-colors font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-3 bg-teal-600 dark:bg-emerald-600 text-white rounded-xl hover:bg-teal-700 dark:hover:bg-emerald-700 transition-colors font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}

            <Link
              href="/"
              className="block px-4 py-3 text-black dark:text-emerald-100 hover:bg-teal-50 dark:hover:bg-emerald-900/30 hover:text-teal-600 dark:hover:text-emerald-300 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-4 py-3 text-black dark:text-emerald-100 hover:bg-teal-50 dark:hover:bg-emerald-900/30 hover:text-teal-600 dark:hover:text-emerald-300 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>

            {user && user.role === 'admin' && (
              <Link
                href="/admin/products"
                className="block px-4 py-3 text-black dark:text-emerald-100 hover:bg-teal-50 dark:hover:bg-emerald-900/30 hover:text-teal-600 dark:hover:text-emerald-300 rounded-xl transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Manage Products
              </Link>
            )}

            <Link
              href="/dashboard"
              className="block px-4 py-3 text-black dark:text-emerald-100 hover:bg-teal-50 dark:hover:bg-emerald-900/30 hover:text-teal-600 dark:hover:text-emerald-300 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/orders"
              className="block px-4 py-3 text-black dark:text-emerald-100 hover:bg-teal-50 dark:hover:bg-emerald-900/30 hover:text-teal-600 dark:hover:text-emerald-300 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              href="/analytics"
              className="block px-4 py-3 text-black dark:text-emerald-100 hover:bg-teal-50 dark:hover:bg-emerald-900/30 hover:text-teal-600 dark:hover:text-emerald-300 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link
              href="/cart"
              className="block px-4 py-3 bg-teal-500 dark:bg-emerald-600 text-white rounded-xl hover:bg-teal-600 dark:hover:bg-emerald-500 transition-all font-semibold shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart (0)
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
