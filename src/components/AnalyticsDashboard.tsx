'use client';

import { FinanceAnalytics } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { formatUSD } from '@/utils/currency';

interface AnalyticsDashboardProps {
  analytics: FinanceAnalytics;
}

export default function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Financial Analytics</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} rounded-lg shadow-md p-6 border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                {formatUSD(analytics.totalRevenue)}
              </p>
            </div>
            <div className={`${theme === 'light' ? 'bg-green-100' : 'bg-green-900/30'} p-3 rounded-full`}>
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} rounded-lg shadow-md p-6 border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Orders</p>
              <p className="text-2xl font-bold text-blue-600">{analytics.totalOrders}</p>
            </div>
            <div className={`${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/30'} p-3 rounded-full`}>
              <svg
                className="w-6 h-6 text-blue-600"
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
        </div>

        <div className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} rounded-lg shadow-md p-6 border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Avg Order Value</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatUSD(analytics.averageOrderValue)}
              </p>
            </div>
            <div className={`${theme === 'light' ? 'bg-purple-100' : 'bg-purple-900/30'} p-3 rounded-full`}>
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} rounded-lg shadow-md p-6 border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Pending Payments</p>
              <p className="text-2xl font-bold text-orange-600">
                {analytics.pendingPayments}
              </p>
            </div>
            <div className={`${theme === 'light' ? 'bg-orange-100' : 'bg-orange-900/30'} p-3 rounded-full`}>
              <svg
                className="w-6 h-6 text-orange-600"
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
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} rounded-lg shadow-md p-6 border`}>
        <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-6`}>Monthly Revenue</h2>
        <div className="space-y-4">
          {analytics.monthlyRevenue.map((data) => {
            const maxRevenue = Math.max(...analytics.monthlyRevenue.map((d) => d.revenue));
            const percentage = (data.revenue / maxRevenue) * 100;

            return (
              <div key={data.month}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{data.month}</span>
                  <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>{formatUSD(data.revenue)}</span>
                </div>
                <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} rounded-full h-3`}>
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Status */}
      <div className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} rounded-lg shadow-md p-6 border`}>
        <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-6`}>Payment Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-green-500 pl-4">
            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Completed Payments</p>
            <p className="text-3xl font-bold text-green-600">
              {analytics.completedPayments}
            </p>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
              {((analytics.completedPayments / analytics.totalOrders) * 100).toFixed(1)}%
              of total orders
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Pending Payments</p>
            <p className="text-3xl font-bold text-orange-600">
              {analytics.pendingPayments}
            </p>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
              {((analytics.pendingPayments / analytics.totalOrders) * 100).toFixed(1)}%
              of total orders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
