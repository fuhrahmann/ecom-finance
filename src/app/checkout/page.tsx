'use client';

import PaymentForm from '@/components/PaymentForm';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            You will receive an email confirmation shortly.
          </p>
          <div className="space-y-3">
            <Link
              href="/orders"
              className="block bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              View Orders
            </Link>
            <Link
              href="/products"
              className="block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PaymentForm totalAmount={999.99} onSubmit={handlePaymentSubmit} />

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Sample Product</span>
                <span className="font-semibold text-gray-900 dark:text-white">$999.99</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>$999.99</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (10%)</span>
                <span>$100.00</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span className="text-green-600 dark:text-green-400">FREE</span>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-blue-600 dark:text-blue-400">$1,099.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
