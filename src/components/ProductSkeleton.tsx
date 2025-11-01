'use client';

import { useTheme } from '@/contexts/ThemeContext';

/**
 * Product Card Skeleton Loader
 * Displays animated placeholder while products are loading
 */
export default function ProductSkeleton() {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-md ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}
    >
      {/* Image Skeleton */}
      <div className="relative h-64 w-full bg-gray-200 dark:bg-gray-700 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category + Rating */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
        </div>

        {/* Price + Stock */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full animate-pulse mt-4" />
      </div>
    </div>
  );
}

/**
 * Product Grid Skeleton
 * Displays multiple skeleton cards in grid layout
 */
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}
