'use client';

import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { formatUSD } from '@/utils/currency';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { theme } = useTheme();

  const handleCheckout = () => {
    alert('Checkout functionality will be implemented soon!');
  };

  if (cart.length === 0) {
    return (
      <div className={`min-h-screen w-full relative ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        {/* Dynamic Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: theme === 'light'
              ? "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)"
              : "radial-gradient(125% 125% at 50% 90%, #000000 40%, #2b0707 100%)",
          }}
        />
        <div className="relative z-10">
          <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>Shopping Cart</h1>
          <div className={`rounded-2xl shadow-xl p-12 sm:p-16 text-center ${
            theme === 'light' ? 'bg-white border border-gray-100' : 'bg-gray-800 border border-gray-700'
          }`}>
            <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
              theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30'
            }`}>
              <svg
                className={`w-16 h-16 ${theme === 'light' ? 'text-blue-400' : 'text-blue-500'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Your cart is empty
            </h2>
            <p className={`mb-8 text-lg max-w-md mx-auto ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Discover our amazing products and start shopping today!
            </p>
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
            >
              Browse Products →
            </Link>

            {/* Benefits */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  theme === 'light' ? 'bg-green-100' : 'bg-green-900/30'
                }`}>
                  <svg className={`w-5 h-5 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Free Shipping</h3>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>On all orders</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'
                }`}>
                  <svg className={`w-5 h-5 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Secure Payment</h3>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>100% protected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  theme === 'light' ? 'bg-purple-100' : 'bg-purple-900/30'
                }`}>
                  <svg className={`w-5 h-5 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>24/7 Support</h3>
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Always here to help</p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full relative ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: theme === 'light'
            ? "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)"
            : "radial-gradient(125% 125% at 50% 90%, #000000 40%, #2b0707 100%)",
        }}
      />
      <div className="relative z-10">
        <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>Shopping Cart</h1>
          <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow ${
                  theme === 'light' ? 'bg-white border border-gray-100' : 'bg-gray-800 border border-gray-700'
                }`}
              >
                <div className="flex gap-4 sm:gap-6">
                  <div className={`relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 group ${
                    theme === 'light' ? 'bg-gradient-to-br from-gray-100 to-gray-200' : 'bg-gradient-to-br from-gray-700 to-gray-800'
                  }`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 80px, 112px"
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold mb-1 text-base sm:text-lg truncate ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>{item.name}</h3>
                        <p className={`text-xs sm:text-sm mb-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                          <span className={`inline-block px-2 py-0.5 rounded-md font-medium ${
                            theme === 'light' ? 'bg-blue-50 text-blue-700' : 'bg-blue-900/30 text-blue-400'
                          }`}>
                            {item.category}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition-colors flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <p className={`text-xl sm:text-2xl font-bold ${
                        theme === 'light' ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-blue-400 to-blue-500'
                      } bg-clip-text text-transparent`}>
                        {formatUSD(item.price)}
                      </p>

                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Qty:</span>
                        <div className={`flex items-center border-2 rounded-xl overflow-hidden ${
                          theme === 'light' ? 'border-gray-200 bg-white' : 'border-gray-600 bg-gray-700'
                        }`}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className={`w-9 h-9 transition-colors flex items-center justify-center font-bold ${
                              theme === 'light' ? 'bg-gray-50 hover:bg-gray-100 text-gray-700' : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                            }`}>
                            −
                          </button>
                          <span className={`w-12 text-center font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className={`w-9 h-9 transition-colors flex items-center justify-center font-bold disabled:opacity-50 ${
                              theme === 'light' ? 'bg-gray-50 hover:bg-gray-100 text-gray-700' : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                            }`}>
                            +
                          </button>
                        </div>
                        <span className={`text-sm hidden sm:inline ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                          Total: <span className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{formatUSD(item.price * item.quantity)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/products"
              className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl transition-all font-semibold shadow-md hover:shadow-lg ${
                theme === 'light'
                  ? 'bg-white text-blue-600 border-2 border-blue-200 hover:bg-blue-50'
                  : 'bg-gray-800 text-blue-400 border-2 border-blue-800 hover:bg-gray-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className={`rounded-2xl shadow-xl p-6 ${
                theme === 'light' ? 'bg-white border border-gray-100' : 'bg-gray-800 border border-gray-700'
              }`}>
                <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className={`flex justify-between ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    <span>Subtotal</span>
                    <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{formatUSD(cartTotal)}</span>
                  </div>
                  <div className={`flex justify-between ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">FREE</span>
                  </div>
                  <div className={`border-t pt-4 ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                    <div className="flex justify-between text-xl font-bold">
                      <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Total</span>
                      <span className={`${
                        theme === 'light' ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-blue-400 to-blue-500'
                      } bg-clip-text text-transparent`}>{formatUSD(cartTotal)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg hover:shadow-xl mb-3"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium py-2"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
