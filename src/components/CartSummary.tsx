'use client';

import { CartItem } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface CartSummaryProps {
  items: CartItem[];
  onCheckout?: () => void;
}

export default function CartSummary({ items, onCheckout }: CartSummaryProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { theme } = useTheme();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    if (onCheckout) {
      onCheckout();
    } else {
      router.push('/checkout');
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-md p-6`}>
      <h2 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className={`flex justify-between ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={`flex justify-between ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className={`${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} border-t pt-3 flex justify-between text-lg font-bold`}>
          <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Total</span>
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {showLoginPrompt && !user && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            <div className="flex-1">
              <p className="text-sm font-semibold text-yellow-900 mb-1">Login Required</p>
              <p className="text-xs text-yellow-700 mb-3">Please sign in to proceed with checkout</p>
              <button
                onClick={handleLogin}
                className="text-xs bg-yellow-600 text-white px-3 py-1.5 rounded hover:bg-yellow-700 transition font-medium"
              >
                Sign In Now
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleCheckout}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={items.length === 0}
      >
        Proceed to Checkout
      </button>

      <div className={`mt-4 text-center text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
        Secure checkout powered by FinanceHub
      </div>
    </div>
  );
}
