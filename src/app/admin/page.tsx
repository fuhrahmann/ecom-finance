'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { sampleOrders, sampleProducts } from '@/data/sampleData';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdminDashboard() {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    activeProducts: 0,
    completedOrders: 0,
    processingOrders: 0,
  });

  useEffect(() => {
    // Calculate statistics
    const totalProducts = sampleProducts.length;
    const totalOrders = sampleOrders.length;
    const totalRevenue = sampleOrders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + order.totalAmount, 0);
    const pendingOrders = sampleOrders.filter(order => order.status === 'pending').length;
    const completedOrders = sampleOrders.filter(order => order.status === 'completed').length;
    const processingOrders = sampleOrders.filter(order => order.status === 'processing').length;
    const lowStockProducts = sampleProducts.filter(product => product.stock < 30).length;
    const activeProducts = sampleProducts.filter(product => product.isActive !== false).length;

    setStats({
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      lowStockProducts,
      activeProducts,
      completedOrders,
      processingOrders,
    });
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: '📦',
      bgColor: 'from-blue-500 to-blue-600',
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: '🛍️',
      bgColor: 'from-green-500 to-green-600',
      link: '/admin/orders',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: '💰',
      bgColor: 'from-purple-500 to-purple-600',
      link: '/admin/sales',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: '⏳',
      bgColor: 'from-orange-500 to-orange-600',
      link: '/admin/orders',
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockProducts,
      icon: '⚠️',
      bgColor: 'from-red-500 to-red-600',
      link: '/admin/products',
    },
    {
      title: 'Active Products',
      value: stats.activeProducts,
      icon: '✅',
      bgColor: 'from-teal-500 to-teal-600',
      link: '/admin/products',
    },
  ];

  const quickActions = [
    {
      title: 'Product Management',
      description: 'Add, edit, or remove products from your store',
      icon: '📦',
      link: '/admin/products',
      color: 'blue',
    },
    {
      title: 'Order Management',
      description: 'View and manage customer orders',
      icon: '🛍️',
      link: '/admin/orders',
      color: 'green',
    },
    {
      title: 'Sales Reports',
      description: 'View detailed sales analytics and reports',
      icon: '📊',
      link: '/admin/sales',
      color: 'purple',
    },
    {
      title: 'Customer Management',
      description: 'View and manage customer accounts',
      icon: '👥',
      link: '/admin/customers',
      color: 'orange',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className={`text-2xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Dashboard</h1>
        <p className={`text-sm mt-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Welcome to your e-commerce management center</p>
      </div>

      {/* Info Boxes - AdminLTE Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Orders */}
        <Link href="/admin/orders" className={`rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <div className="p-4 flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <div className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{stats.totalOrders}</div>
              <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Orders</div>
            </div>
          </div>
          <div className={`px-4 py-2 text-xs ${theme === 'light' ? 'bg-blue-50 text-blue-700' : 'bg-blue-900/30 text-blue-400'}`}>
            View Details →
          </div>
        </Link>

        {/* Total Revenue */}
        <Link href="/admin/sales" className={`rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <div className="p-4 flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <div className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>${stats.totalRevenue.toFixed(2)}</div>
              <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Revenue</div>
            </div>
          </div>
          <div className={`px-4 py-2 text-xs ${theme === 'light' ? 'bg-green-50 text-green-700' : 'bg-green-900/30 text-green-400'}`}>
            View Details →
          </div>
        </Link>

        {/* Total Products */}
        <Link href="/admin/products" className={`rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <div className="p-4 flex items-center">
            <div className="flex-shrink-0 bg-yellow-500 rounded p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <div className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{stats.totalProducts}</div>
              <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Products</div>
            </div>
          </div>
          <div className={`px-4 py-2 text-xs ${theme === 'light' ? 'bg-yellow-50 text-yellow-700' : 'bg-yellow-900/30 text-yellow-400'}`}>
            View Details →
          </div>
        </Link>

        {/* Low Stock Alert */}
        <Link href="/admin/products" className={`rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <div className="p-4 flex items-center">
            <div className="flex-shrink-0 bg-red-500 rounded p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <div className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{stats.lowStockProducts}</div>
              <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Low Stock Items</div>
            </div>
          </div>
          <div className={`px-4 py-2 text-xs ${theme === 'light' ? 'bg-red-50 text-red-700' : 'bg-red-900/30 text-red-400'}`}>
            View Details →
          </div>
        </Link>
      </div>

      {/* Recent Orders Table */}
      <div className={`rounded-lg shadow mb-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
        <div className={`px-6 py-4 border-b flex items-center justify-between ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
          <h2 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className={`min-w-full divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
            <thead className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Order ID
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Customer
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Amount
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'light' ? 'bg-white divide-gray-200' : 'bg-gray-800 divide-gray-700'}`}>
              {sampleOrders.slice(0, 5).map((order) => (
                <tr key={order.id} className={`${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-700'}`}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {order.id}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {order.userId}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
