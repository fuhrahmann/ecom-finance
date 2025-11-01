'use client';

import { sampleOrders } from '@/data/sampleData';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export default function OrdersPage() {
  const { theme } = useTheme();

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-8`}>My Orders</h1>

      <div className="space-y-4">
        {sampleOrders.map((order) => (
          <div key={order.id} className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-md p-6`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Order #{order.id}
                </h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  statusColors[order.status]
                }`}
              >
                {order.status.toUpperCase()}
              </span>
            </div>

            <div className={`border-t border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} py-4 mb-4`}>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                      {item.name} x {item.quantity}
                    </span>
                    <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Amount</p>
                <p className="text-xl font-bold text-blue-600">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/orders/${order.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  View Details
                </Link>
                <button className={`${theme === 'light' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} px-4 py-2 rounded-lg transition text-sm`}>
                  Download Invoice
                </button>
              </div>
            </div>

            <div className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              <p>
                <strong>Shipping Address:</strong>{' '}
                {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
            </div>
          </div>
        ))}

        {sampleOrders.length === 0 && (
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-md p-12 text-center`}>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-4`}>You haven&apos;t placed any orders yet</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
        </div>
      </div>
    </div>
  );
}
