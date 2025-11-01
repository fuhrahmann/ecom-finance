'use client';

import PaymentForm from '@/components/PaymentForm';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

export default function CheckoutPage() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handlePaymentSubmit = () => {
    // Handle payment processing here
    console.log('Processing payment...');
    setOrderPlaced(true);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (orderPlaced) {
    return (
      <div className={`min-h-screen w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} relative`}>
        {/* Pink Glow Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)
            `,
            backgroundSize: "100% 100%",
          }}
        />
        {/* Content with relative z-index to appear above background */}
        <div className="relative z-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} rounded-lg shadow-md p-12 text-center border`}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4`}>
            Order Placed Successfully!
          </h1>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-2`}>
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} mb-6`}>
            You will receive an email confirmation shortly.
          </p>
          <div className="space-y-3">
            <Link
              href="/orders"
              className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              View Orders
            </Link>
            <Link
              href="/products"
              className={`block ${theme === 'light' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} px-6 py-3 rounded-lg transition`}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} relative`}>
      {/* Pink Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />
      {/* Content with relative z-index to appear above background */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-8`}>Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PaymentForm totalAmount={999.99} onSubmit={handlePaymentSubmit} />

        {/* Order Summary */}
        <div className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} rounded-lg shadow-md p-6 h-fit border`}>
          <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4`}>
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className={`border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} pb-4`}>
              <div className="flex justify-between mb-2">
                <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Sample Product</span>
                <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>$999.99</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`flex justify-between ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                <span>Subtotal</span>
                <span>$999.99</span>
              </div>
              <div className={`flex justify-between ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                <span>Tax (10%)</span>
                <span>$100.00</span>
              </div>
              <div className={`flex justify-between ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
            </div>
            <div className={`border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} pt-4`}>
              <div className="flex justify-between text-xl font-bold">
                <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Total</span>
                <span className="text-blue-600">$1,099.99</span>
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
