'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { sampleOrders, sampleProducts } from '@/data/sampleData';

export default function AdminDashboard() {
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
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Welcome to your e-commerce management center</p>
      </div>

      {/* Info Boxes - AdminLTE Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Orders */}
        <Link href="/admin/orders" className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-4 flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Orders</div>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 text-xs text-blue-700 dark:text-blue-300">
            View Details →
          </div>
        </Link>

        {/* Total Revenue */}
        <Link href="/admin/sales" className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-4 flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalRevenue.toFixed(2)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 text-xs text-green-700 dark:text-green-300">
            View Details →
          </div>
        </Link>

        {/* Total Products */}
        <Link href="/admin/products" className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-4 flex items-center">
            <div className="flex-shrink-0 bg-yellow-500 rounded p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProducts}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Products</div>
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 text-xs text-yellow-700 dark:text-yellow-300">
            View Details →
          </div>
        </Link>

        {/* Low Stock Alert */}
        <Link href="/admin/products" className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-4 flex items-center">
            <div className="flex-shrink-0 bg-red-500 rounded p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.lowStockProducts}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Low Stock Items</div>
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 px-4 py-2 text-xs text-red-700 dark:text-red-300">
            View Details →
          </div>
        </Link>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sampleOrders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {order.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-semibold">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
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
