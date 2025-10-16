'use client';

import PaymentForm from '@/components/PaymentForm';
import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePaymentSubmit = () => {
    // Handle payment processing here
    console.log('Processing payment...');
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-2">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <p className="text-sm text-gray-500 mb-6">
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
              className="block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PaymentForm totalAmount={999.99} onSubmit={handlePaymentSubmit} />

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Sample Product</span>
                <span className="font-semibold">$999.99</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>$999.99</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>$100.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-blue-600">$1,099.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
