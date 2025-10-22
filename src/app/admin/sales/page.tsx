'use client';

import { useState, useEffect } from 'react';
import { sampleOrders, sampleProducts } from '@/data/sampleData';

export default function SalesReportsPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    completedOrders: 0,
    averageOrderValue: 0,
    topSellingProducts: [] as { name: string; quantity: number; revenue: number }[],
  });

  useEffect(() => {
    // Calculate statistics
    const completedOrders = sampleOrders.filter(order => order.status === 'completed');
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = sampleOrders.length;
    const averageOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

    // Calculate top selling products
    const productSales: { [key: string]: { name: string; quantity: number; revenue: number } } = {};

    sampleOrders.forEach(order => {
      order.items.forEach(item => {
        if (!productSales[item.id]) {
          productSales[item.id] = { name: item.name, quantity: 0, revenue: 0 };
        }
        productSales[item.id].quantity += item.quantity;
        productSales[item.id].revenue += item.price * item.quantity;
      });
    });

    const topSellingProducts = Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    setStats({
      totalRevenue,
      totalOrders,
      completedOrders: completedOrders.length,
      averageOrderValue,
      topSellingProducts,
    });
  }, []);

  const monthlyData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18500 },
    { month: 'Apr', revenue: 14000 },
    { month: 'May', revenue: 22000 },
    { month: 'Jun', revenue: 25000 },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Sales Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive sales analytics and performance metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">💰</div>
            </div>
            <p className="text-green-100 text-sm font-medium mb-1">Total Revenue</p>
            <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">🛍️</div>
            </div>
            <p className="text-blue-100 text-sm font-medium mb-1">Total Orders</p>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">📊</div>
            </div>
            <p className="text-purple-100 text-sm font-medium mb-1">Avg Order Value</p>
            <p className="text-3xl font-bold">${stats.averageOrderValue.toFixed(2)}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">✅</div>
            </div>
            <p className="text-orange-100 text-sm font-medium mb-1">Completed Orders</p>
            <p className="text-3xl font-bold">{stats.completedOrders}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Monthly Revenue</h2>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{data.month}</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">${data.revenue.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Top Selling Products</h2>
            <div className="space-y-4">
              {stats.topSellingProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{product.quantity} units sold</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600 dark:text-green-400">${product.revenue.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Status Breakdown</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { status: 'pending', count: sampleOrders.filter(o => o.status === 'pending').length, color: 'yellow', icon: '⏳' },
              { status: 'processing', count: sampleOrders.filter(o => o.status === 'processing').length, color: 'blue', icon: '📦' },
              { status: 'completed', count: sampleOrders.filter(o => o.status === 'completed').length, color: 'green', icon: '✅' },
              { status: 'cancelled', count: sampleOrders.filter(o => o.status === 'cancelled').length, color: 'red', icon: '❌' },
            ].map((item, index) => (
              <div key={index} className={`bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-lg p-6 text-center`}>
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.count}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{item.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Category Performance</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Total Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Avg Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {Object.entries(
                  sampleProducts.reduce((acc, product) => {
                    if (!acc[product.category]) {
                      acc[product.category] = { count: 0, totalStock: 0, totalPrice: 0 };
                    }
                    acc[product.category].count++;
                    acc[product.category].totalStock += product.stock;
                    acc[product.category].totalPrice += product.price;
                    return acc;
                  }, {} as Record<string, { count: number; totalStock: number; totalPrice: number }>)
                ).map(([category, data]) => (
                  <tr key={category} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                      {data.count} products
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {data.totalStock} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                      ${(data.totalPrice / data.count).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
