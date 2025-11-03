'use client';

import Link from 'next/link';
import { sampleOrders, sampleAnalytics } from '@/data/sampleData';
import { useTheme } from '@/contexts/ThemeContext';
import { formatUSD } from '@/utils/currency';

export default function DashboardPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} relative`}>
      {/* Pink Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 90%, ${theme === 'light' ? '#ffffff 40%, #ec4899 100%' : '#111827 40%, #831843 100%'})
          `,
          backgroundSize: "100% 100%",
        }}
      />
      {/* Content with relative z-index to appear above background */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-8`}>Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-md p-6`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Revenue</h3>
            <div className={`${theme === 'light' ? 'bg-green-100' : 'bg-green-900/30'} p-2 rounded-lg`}>
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
          <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            ${sampleAnalytics.totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-md p-6`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Orders</h3>
            <div className={`${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'} p-2 rounded-lg`}>
              <svg
                className="w-5 h-5 text-blue-600"
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
          </div>
          <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {sampleAnalytics.totalOrders}
          </p>
        </div>

        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-md p-6`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Avg Order Value</h3>
            <div className={`${theme === 'light' ? 'bg-purple-100' : 'bg-purple-900/30'} p-2 rounded-lg`}>
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01"
                />
              </svg>
            </div>
          </div>
          <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {formatUSD(sampleAnalytics.averageOrderValue)}
          </p>
        </div>

        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-md p-6`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Pending Payments</h3>
            <div className={`${theme === 'light' ? 'bg-orange-100' : 'bg-orange-900/30'} p-2 rounded-lg`}>
              <svg
                className="w-5 h-5 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {sampleAnalytics.pendingPayments}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-md p-6`}>
          <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4`}>Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/products"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition text-center"
            >
              Browse Products
            </Link>
            <Link
              href="/orders"
              className={`block w-full ${theme === 'light' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} py-3 px-4 rounded-lg transition text-center`}
            >
              View All Orders
            </Link>
            <Link
              href="/analytics"
              className={`block w-full ${theme === 'light' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} py-3 px-4 rounded-lg transition text-center`}
            >
              View Full Analytics
            </Link>
          </div>
        </div>

        <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-md p-6`}>
          <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4`}>Recent Activity</h2>
          <div className="space-y-3">
            {sampleOrders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="border-l-4 border-blue-500 pl-3 py-2"
              >
                <p className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Order #{order.id}
                </p>
                <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {formatUSD(order.totalAmount)} - {order.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
