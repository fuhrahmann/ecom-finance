'use client';

import { CartItem } from '@/types';

interface CartSummaryProps {
  items: CartItem[];
  onCheckout?: () => void;
}

export default function CartSummary({ items, onCheckout }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        disabled={items.length === 0}
      >
        Proceed to Checkout
      </button>

      <div className="mt-4 text-center text-sm text-gray-500">
        Secure checkout powered by FinanceHub
      </div>
    </div>
  );
}
