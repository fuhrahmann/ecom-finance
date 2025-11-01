'use client';

import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import { formatIDR } from '@/utils/currency';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

/**
 * Product Card Component
 * Displays product information with image, price, and add to cart functionality
 * @param product - Product object with all product details
 */
export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const toast = useToast();
  const { theme } = useTheme();
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('This product is out of stock');
      return;
    }

    setIsLoading(true);

    // Simulate async operation
    setTimeout(() => {
      addToCart(product, 1);
      setIsAdded(true);
      setIsLoading(false);
      toast.success(`${product.name} added to cart!`);

      setTimeout(() => setIsAdded(false), 2000);
    }, 300);
  };
  return (
    <div className={`rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden ${
      theme === 'light'
        ? 'bg-white border border-gray-200'
        : 'bg-gray-800 border border-gray-700'
    }`}>
      <Link href={`/products/${product.id}`} className={`block relative h-48 overflow-hidden group ${
        theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'
      }`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Only {product.stock} left!
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
        {product.rating && product.rating >= 4.5 && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
            ⭐ Bestseller
          </span>
        )}
        {product.discount && (
          <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}% OFF
          </span>
        )}
      </Link>

      <div className="p-4">
        <div className="mb-2">
          <span className={`text-xs font-semibold uppercase px-2 py-1 rounded ${
            theme === 'light'
              ? 'text-blue-600 bg-blue-50'
              : 'text-blue-400 bg-blue-900/30'
          }`}>
            {product.category}
          </span>
        </div>

        <h3 className={`text-lg font-bold mb-2 line-clamp-1 ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          {product.name}
        </h3>

        <p className={`text-sm mb-4 line-clamp-2 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className={`text-2xl font-bold ${
              theme === 'light' ? 'text-blue-600' : 'text-blue-400'
            }`}>
              {formatIDR(product.price)}
            </span>
            {product.discount && (
              <div className={`text-xs line-through ${
                theme === 'light' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {formatIDR(product.price / (1 - product.discount / 100))}
              </div>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className={`text-sm font-semibold ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                {product.rating}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isLoading}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            isAdded
              ? 'bg-green-600 text-white'
              : product.stock === 0 || isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-teal-600 text-white hover:bg-teal-700'
          }`}
          aria-label={`Add ${product.name} to cart`}
          aria-live="polite"
        >
          {isLoading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Adding...
            </>
          ) : isAdded ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added to Cart!
            </>
          ) : product.stock === 0 ? (
            'Out of Stock'
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
