'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb Navigation Component
 * Displays hierarchical navigation path
 * @param items - Array of breadcrumb items with label and optional href
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  const { theme } = useTheme();

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 px-4 sm:px-6 lg:px-8 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/50'
      }`}
    >
      <ol className="flex items-center space-x-2 text-sm max-w-7xl mx-auto">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg
                  className={`w-4 h-4 mx-2 ${
                    theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}

              {isLast || !item.href ? (
                <span
                  className={`font-medium ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`hover:underline transition ${
                    theme === 'light'
                      ? 'text-gray-500 hover:text-gray-700'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
