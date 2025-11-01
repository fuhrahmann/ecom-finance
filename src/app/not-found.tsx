'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Custom 404 Not Found Page
 * Displays when user navigates to non-existent route
 */
export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* 404 Large Number */}
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-9xl font-bold mb-4 ${
            theme === 'light'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600'
              : 'bg-gradient-to-r from-blue-400 to-purple-400'
          } bg-clip-text text-transparent`}
        >
          404
        </motion.h1>

        {/* Error Message */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-3xl font-semibold mb-4 ${
            theme === 'light' ? 'text-gray-800' : 'text-gray-100'
          }`}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-lg mb-8 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              theme === 'light'
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
            }`}
          >
            Browse Products
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mt-12"
        >
          <svg
            className={`w-24 h-24 mx-auto ${
              theme === 'light' ? 'text-gray-300' : 'text-gray-700'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
