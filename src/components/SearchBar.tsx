'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Product } from '@/types';

interface SearchBarProps {
  products: Product[];
  onSearch: (query: string) => void;
  placeholder?: string;
}

/**
 * Search Bar Component with Autocomplete
 * Provides real-time product search with suggestions
 */
export default function SearchBar({ products, onSearch, placeholder = 'Search products...' }: SearchBarProps) {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle search input
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, products]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (productName: string) => {
    setQuery(productName);
    onSearch(productName);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSearch} className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className={`w-5 h-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            theme === 'light'
              ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              : 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
          }`}
          aria-label="Search products"
          aria-autocomplete="list"
          aria-controls="search-suggestions"
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
              theme === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-500 hover:text-gray-300'
            }`}
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>

      {/* Autocomplete Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          id="search-suggestions"
          className={`absolute z-10 mt-2 w-full rounded-lg shadow-lg overflow-hidden ${
            theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
          }`}
          role="listbox"
        >
          {suggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSuggestionClick(product.name)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}
              role="option"
            >
              {/* Product Image */}
              <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden">
                {product.image && (
                  <img
                    src={product.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {product.category}
                </p>
              </div>

              {/* Price */}
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {showSuggestions && query && suggestions.length === 0 && (
        <div
          className={`absolute z-10 mt-2 w-full rounded-lg shadow-lg p-4 text-center ${
            theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
          }`}
        >
          <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
            No products found for "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
