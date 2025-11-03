'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: '📊',
      path: '/admin',
      exact: true,
    },
    {
      title: 'Product Management',
      icon: '📦',
      path: '/admin/products',
    },
    {
      title: 'Orders',
      icon: '🛍️',
      path: '/admin/orders',
    },
    {
      title: 'Customers',
      icon: '👥',
      path: '/admin/customers',
    },
    {
      title: 'Sales Reports',
      icon: '💰',
      path: '/admin/sales',
    },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Dynamic Background - Pink Glow for Light, Crimson Depth for Dark */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: theme === 'light'
            ? "radial-gradient(125% 125% at 50% 10%, #fef3f8 40%, #ffc9e3 100%)"
            : "radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b0707 100%)",
        }}
      />
      {/* Content with relative z-index to appear above background */}
      <div className="relative z-10 min-h-screen">
      {/* Top Navbar */}
      <nav className={`fixed top-0 z-50 w-full backdrop-blur-md border-b ${
        theme === 'light'
          ? 'bg-white/50 border-pink-200'
          : 'bg-black/40 border-white/10'
      }`}>
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              {/* Sidebar Toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`inline-flex items-center p-2 text-sm rounded-lg focus:outline-none focus:ring-2 ${
                  theme === 'light'
                    ? 'text-gray-700 hover:bg-pink-100 focus:ring-pink-300'
                    : 'text-gray-300 hover:bg-white/10 focus:ring-white/20'
                }`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {/* Brand */}
              <Link href="/admin" className="flex ml-2 md:mr-24">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">SH</span>
                </div>
                <span className={`self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  ShopHub Admin
                </span>
              </Link>
            </div>

            {/* Right Side Items */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                  theme === 'light'
                    ? 'text-gray-700 hover:bg-pink-100'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              {/* Back to Store */}
              <Link
                href="/"
                className={`hidden md:flex items-center gap-2 px-3 py-2 text-sm rounded-lg ${
                  theme === 'light'
                    ? 'text-gray-700 hover:bg-pink-100'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Store</span>
              </Link>
              <Link
                href="/"
                className={`lg:hidden md:hidden md:flex items-center gap-2 px-3 py-2 text-sm rounded-lg ${
                  theme === 'light'
                    ? 'text-gray-700 hover:bg-pink-100'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>

              {/* User Menu */}
              <div className="flex items-center">
                <button
                  type="button"
                  className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    theme === 'light'
                      ? 'bg-pink-100 hover:bg-pink-200 focus:ring-pink-300'
                      : 'bg-white/10 hover:bg-white/20 focus:ring-white/30'
                  }`}
                  onClick={handleLogout}
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{user?.name}</div>
                    <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Admin</div>
                  </div>
                  <svg className={`w-4 h-4 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } backdrop-blur-md border-r ${
          theme === 'light'
            ? 'bg-white/50 border-pink-200'
            : 'bg-black/40 border-white/10'
        }`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          {/* Main Navigation */}
          <ul className="space-y-2 font-medium">
            <li className="pt-2 pb-2">
              <div className={`text-xs font-semibold uppercase tracking-wider px-3 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-500'
              }`}>
                Main Navigation
              </div>
            </li>
            {menuItems.map((item) => {
              const active = isActive(item.path, item.exact);
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center p-2 rounded-lg group transition-colors ${
                      active
                        ? 'bg-blue-600 text-white'
                        : theme === 'light'
                        ? 'text-gray-700 hover:bg-pink-100'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="ml-3">{item.title}</span>
                    {active && (
                      <span className="ml-auto">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick Stats */}
          <div className={`pt-4 mt-4 space-y-2 border-t ${
            theme === 'light' ? 'border-pink-200' : 'border-white/10'
          }`}>
            <div className={`text-xs font-semibold uppercase tracking-wider px-3 pb-2 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-500'
            }`}>
              Quick Stats
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Products</div>
                  <div className={`text-lg font-bold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>20</div>
                </div>
                <div className="text-2xl">📦</div>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Orders</div>
                  <div className={`text-lg font-bold ${theme === 'light' ? 'text-green-700' : 'text-green-400'}`}>8</div>
                </div>
                <div className="text-2xl">🛍️</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`p-4 ${sidebarOpen ? 'sm:ml-64' : ''} transition-all`}>
        <div className="pt-20">
          {children}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      </div>
    </div>
  );
}
