'use client';

import { useState } from 'react';

interface PaymentFormProps {
  totalAmount: number;
  onSubmit?: (paymentData: PaymentData) => void;
}

export interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export default function PaymentForm({ totalAmount, onSubmit }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentData>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>

      <div className="border-b pb-4">
        <p className="text-sm text-gray-600">Total Amount</p>
        <p className="text-3xl font-bold text-blue-600">${totalAmount.toFixed(2)}</p>
      </div>

      {/* Card Details */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Card Details</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.cardName}
            onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input
              type="text"
              placeholder="123"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Billing Address</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            type="text"
            placeholder="123 Main St"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.billingAddress.street}
            onChange={(e) =>
              setFormData({
                ...formData,
                billingAddress: { ...formData.billingAddress, street: e.target.value },
              })
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              placeholder="New York"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.billingAddress.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billingAddress: { ...formData.billingAddress, city: e.target.value },
                })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              placeholder="NY"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.billingAddress.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billingAddress: { ...formData.billingAddress, state: e.target.value },
                })
              }
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code
          </label>
          <input
            type="text"
            placeholder="10001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.billingAddress.zipCode}
            onChange={(e) =>
              setFormData({
                ...formData,
                billingAddress: { ...formData.billingAddress, zipCode: e.target.value },
              })
            }
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        Complete Payment
      </button>

      <div className="text-xs text-gray-500 text-center">
        Your payment information is encrypted and secure
      </div>
    </form>
  );
}
