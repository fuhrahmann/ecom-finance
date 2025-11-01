'use client';

import { useState, useEffect } from 'react';
import { sampleOrders, sampleProducts } from '@/data/sampleData';
import { useTheme } from '@/contexts/ThemeContext';

export default function SalesReportsPage() {
  const { theme } = useTheme();
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Sales Reports
          </h1>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
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
          <div className={`rounded-xl shadow-md p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <h2 className={`text-xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Monthly Revenue</h2>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{data.month}</span>
                    <span className={`text-sm font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>${data.revenue.toLocaleString()}</span>
                  </div>
                  <div className={`w-full rounded-full h-3 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}>
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
          <div className={`rounded-xl shadow-md p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <h2 className={`text-xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Top Selling Products</h2>
            <div className="space-y-4">
              {stats.topSellingProducts.map((product, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{product.name}</p>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{product.quantity} units sold</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600">${product.revenue.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className={`rounded-xl shadow-md p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <h2 className={`text-xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Order Status Breakdown</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { status: 'pending', count: sampleOrders.filter(o => o.status === 'pending').length, color: 'yellow', icon: '⏳' },
              { status: 'processing', count: sampleOrders.filter(o => o.status === 'processing').length, color: 'blue', icon: '📦' },
              { status: 'completed', count: sampleOrders.filter(o => o.status === 'completed').length, color: 'green', icon: '✅' },
              { status: 'cancelled', count: sampleOrders.filter(o => o.status === 'cancelled').length, color: 'red', icon: '❌' },
            ].map((item, index) => (
              <div key={index} className={`bg-${item.color}-50 rounded-lg p-6 text-center`}>
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className={`text-2xl font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.count}</p>
                <p className={`text-sm capitalize ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{item.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Category Performance</h2>
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
              <thead>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Category
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Products
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Total Stock
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Avg Price
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
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
                  <tr key={category} className={`${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-700'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {data.count} products
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {data.totalStock} units
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
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
