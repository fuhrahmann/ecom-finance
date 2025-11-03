'use client';

import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Product } from "@/types";
import { sampleProducts } from "@/data/sampleData";
import { formatUSD } from "@/utils/currency";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from '@/contexts/ThemeContext';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { theme } = useTheme();
  const router = useRouter();
  const { addToCart } = useCart();
  const [productId, setProductId] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'features' | 'reviews' | 'specs'>('features');
  const [addedToCart, setAddedToCart] = useState(false);

  // Unwrap params
  useEffect(() => {
    params.then((p) => setProductId(p.id));
  }, [params]);

  // Get product from sample data when ID is available
  useEffect(() => {
    if (!productId) return;

    const foundProduct = sampleProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      // Get related products from same category
      const related = sampleProducts
        .filter((p: Product) => p.category === foundProduct.category && p.id !== productId)
        .slice(0, 3);
      setRelatedProducts(related);
    } else {
      router.push('/products');
    }
  }, [productId, router]);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className={`min-h-screen w-full relative ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      {/* Pink Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: theme === 'light'
            ? "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)"
            : "radial-gradient(125% 125% at 50% 90%, #000000 40%, #2b0707 100%)",
          backgroundSize: "100% 100%",
        }}
      />
      {/* Content with relative z-index to appear above background */}
      <div className="relative z-10">
        <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-sm flex-wrap">
          <Link href="/" className={`hover:text-blue-600 transition ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            Home
          </Link>
          <span className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}>/</span>
          <Link href="/products" className={`hover:text-blue-600 transition ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            Products
          </Link>
          <span className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}>/</span>
          <span className={`font-medium truncate ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{product.name}</span>
        </nav>

        <div className={`rounded-2xl shadow-xl overflow-hidden border mb-12 ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
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
                <div className={`p-3 rounded-xl text-center ${theme === 'light' ? 'bg-green-50' : 'bg-green-900/30'}`}>
                  <div className="text-2xl mb-1">✓</div>
                  <div className={`text-xs font-semibold ${theme === 'light' ? 'text-green-700' : 'text-green-400'}`}>Secure Payment</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/30'}`}>
                  <div className="text-2xl mb-1">🚚</div>
                  <div className={`text-xs font-semibold ${theme === 'light' ? 'text-blue-700' : 'text-blue-400'}`}>Free Shipping</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${theme === 'light' ? 'bg-purple-50' : 'bg-purple-900/30'}`}>
                  <div className="text-2xl mb-1">↩</div>
                  <div className={`text-xs font-semibold ${theme === 'light' ? 'text-purple-700' : 'text-purple-400'}`}>30-Day Returns</div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-4">
                <span className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full ${theme === 'light' ? 'text-blue-600 bg-blue-50' : 'text-blue-400 bg-blue-900/30'}`}>
                  {product.category}
                </span>
              </div>

              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
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
                            : theme === 'light' ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {product.rating} / 5.0
                  </span>
                  <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>(128 reviews)</span>
                </div>
              )}

              <p className={`mb-8 text-base sm:text-lg leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                {product.description}
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    {formatUSD(product.price)}
                  </span>
                  {product.discount && (
                    <span className="text-gray-500 line-through text-xl">
                      {formatUSD(product.price / (1 - product.discount / 100))}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-md font-semibold">
                      Save {product.discount}%
                    </span>
                    <span className="text-gray-600">Limited time offer</span>
                  </div>
                )}
              </div>

              <div className={`mb-6 p-4 rounded-xl ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <p className={`text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Availability:</p>
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
                <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Quantity:
                </label>
                <div className="flex items-center gap-4">
                  <div className={`flex items-center border-2 rounded-xl overflow-hidden ${theme === 'light' ? 'border-gray-200' : 'border-gray-600'}`}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className={`px-4 py-3 transition-colors font-semibold ${theme === 'light' ? 'bg-gray-50 hover:bg-gray-100 text-gray-700' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                    >
                      −
                    </button>
                    <span className={`px-6 py-3 font-bold text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className={`px-4 py-3 transition-colors font-semibold ${theme === 'light' ? 'bg-gray-50 hover:bg-gray-100 text-gray-700' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                    >
                      +
                    </button>
                  </div>
                  <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                    Total: <span className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{formatUSD(product.price * quantity)}</span>
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
                <button className={`w-full py-3 px-6 rounded-xl transition-all font-semibold flex items-center justify-center gap-2 ${theme === 'light' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className={`border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
            <div className={`flex border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
              <button
                onClick={() => setSelectedTab('features')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  selectedTab === 'features'
                    ? `text-blue-600 border-b-2 border-blue-600 ${theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/30'}`
                    : `${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-gray-200'}`
                }`}
              >
                Key Features
              </button>
              <button
                onClick={() => setSelectedTab('specs')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  selectedTab === 'specs'
                    ? `text-blue-600 border-b-2 border-blue-600 ${theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/30'}`
                    : `${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-gray-200'}`
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setSelectedTab('reviews')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  selectedTab === 'reviews'
                    ? `text-blue-600 border-b-2 border-blue-600 ${theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/30'}`
                    : `${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-gray-200'}`
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
                    <div key={index} className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${theme === 'light' ? 'bg-gray-50 hover:bg-gray-100' : 'bg-gray-700 hover:bg-gray-600'}`}>
                      <div className="text-3xl">{feature.icon}</div>
                      <div>
                        <h3 className={`font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{feature.title}</h3>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{feature.desc}</p>
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
                    <div key={index} className={`flex justify-between py-3 border-b last:border-0 ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                      <span className={`font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{spec.label}:</span>
                      <span className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="space-y-6">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className={`border-b pb-6 last:border-0 ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div>
                          <div className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Customer {index + 1}</div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-500">★</span>
                              ))}
                            </div>
                            <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>2 days ago</span>
                          </div>
                        </div>
                      </div>
                      <p className={`leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
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
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
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
      </div>
    </div>
  );
}
