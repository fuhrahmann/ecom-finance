'use client';

import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { notFound, use } from "next/navigation";
import { useState, useEffect } from "react";
import { Product } from "@/types";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'features' | 'reviews' | 'specs'>('features');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch the specific product
        const productResponse = await fetch(`/api/products/${id}`);
        if (!productResponse.ok) {
          notFound();
          return;
        }
        const productData = await productResponse.json();
        setProduct(productData);

        // Fetch all products for related products
        const allProductsResponse = await fetch('/api/products');
        const allProducts = await allProductsResponse.json();
        const related = allProducts.filter((p: Product) => p.id !== id).slice(0, 3);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-sm flex-wrap">
          <Link href="/" className="text-gray-500 hover:text-blue-600 transition">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/products" className="text-gray-500 hover:text-blue-600 transition">
            Products
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative h-96 sm:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {product.stock < 10 && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                    Only {product.stock} left!
                  </span>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 p-3 rounded-xl text-center">
                  <div className="text-2xl mb-1">✓</div>
                  <div className="text-xs font-semibold text-green-700">Secure Payment</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl text-center">
                  <div className="text-2xl mb-1">🚚</div>
                  <div className="text-xs font-semibold text-blue-700">Free Shipping</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-xl text-center">
                  <div className="text-2xl mb-1">↩</div>
                  <div className="text-xs font-semibold text-purple-700">30-Day Returns</div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-4">
                <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {product.rating && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-2xl ${
                          i < Math.floor(product.rating!)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">
                    {product.rating} / 5.0
                  </span>
                  <span className="text-sm text-gray-500">(128 reviews)</span>
                </div>
              )}

              <p className="text-gray-600 mb-8 text-base sm:text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-gray-500 line-through text-xl">
                    ${(product.price * 1.3).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-md font-semibold">
                    Save 30%
                  </span>
                  <span className="text-gray-600">Limited time offer</span>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-700 mb-1">Availability:</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      product.stock < 10 ? "bg-red-500 animate-pulse" : "bg-green-500"
                    }`}
                  ></span>
                  <span
                    className={`font-semibold ${
                      product.stock < 10 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {product.stock < 10 ? `Only ${product.stock} left in stock!` : `In Stock (${product.stock} units)`}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity:
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold text-gray-700"
                    >
                      −
                    </button>
                    <span className="px-6 py-3 font-bold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold text-gray-700"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Total: <span className="font-bold text-gray-900">${(product.price * quantity).toFixed(2)}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 flex items-center justify-center gap-2"
                >
                  {addedToCart ? (
                    <>
                      <span>✓</span>
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-bold text-lg shadow-lg">
                  Buy Now
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-all font-semibold flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setSelectedTab('features')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  selectedTab === 'features'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Key Features
              </button>
              <button
                onClick={() => setSelectedTab('specs')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  selectedTab === 'specs'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setSelectedTab('reviews')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  selectedTab === 'reviews'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Reviews
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {selectedTab === 'features' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: '☁️', title: 'Cloud-Based Solution', desc: '99.9% uptime guarantee with automatic backups' },
                    { icon: '🔒', title: 'Enterprise Security', desc: 'Bank-level encryption and data protection' },
                    { icon: '📞', title: '24/7 Support', desc: 'Expert customer support always available' },
                    { icon: '🔄', title: 'Auto Updates', desc: 'Regular updates and security patches included' },
                    { icon: '🔗', title: 'Easy Integration', desc: 'Connects with major financial platforms' },
                    { icon: '📊', title: 'Advanced Analytics', desc: 'Real-time insights and reporting tools' },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="text-3xl">{feature.icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'specs' && (
                <div className="space-y-3">
                  {[
                    { label: 'Platform', value: 'Web-based (Cloud)' },
                    { label: 'Deployment', value: 'SaaS' },
                    { label: 'Updates', value: 'Automatic' },
                    { label: 'Support', value: '24/7 Premium' },
                    { label: 'Users', value: 'Unlimited' },
                    { label: 'Storage', value: '500GB included' },
                  ].map((spec, index) => (
                    <div key={index} className="flex justify-between py-3 border-b border-gray-200 last:border-0">
                      <span className="font-semibold text-gray-700">{spec.label}:</span>
                      <span className="text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="space-y-6">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Customer {index + 1}</div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-500">★</span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">2 days ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        Excellent product! Easy to use and integrates perfectly with our existing systems. Highly recommended for any business looking to streamline their financial operations.
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
