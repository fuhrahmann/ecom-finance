import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
      <div className="relative h-56 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {product.stock < 10 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            Low Stock
          </span>
        )}
        {product.rating && product.rating >= 4.5 && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            ⭐ Bestseller
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-3">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-md">
            {product.category}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </span>
          </div>
          {product.rating && (
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            View Details
          </Link>
          <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
