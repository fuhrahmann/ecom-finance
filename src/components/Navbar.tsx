'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-white font-bold text-lg sm:text-xl">F</span>
              </div>
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                FinanceHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 font-medium">
              Products
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 font-medium">
              Dashboard
            </Link>
            <Link href="/orders" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 font-medium">
              Orders
            </Link>
            <Link href="/analytics" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 font-medium">
              Analytics
            </Link>
            <Link
              href="/cart"
              className="ml-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Cart (0)</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-blue-50 transition-colors"
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
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 pt-3 pb-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/orders"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              href="/analytics"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link
              href="/cart"
              className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              🛒 Cart (0)
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
