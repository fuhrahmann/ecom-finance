'use client';

import { useEffect, useState } from 'react';
import { sampleOrders, sampleProducts } from '@/data/sampleData';
import { useTheme } from '@/contexts/ThemeContext';
import { formatUSD } from '@/utils/currency';

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
      value: formatUSD(stats.totalRevenue),
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
        <h1 className={`text-2xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Report</h1>
        <p className={`text-sm mt-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Your store finance report zilong</p>
      </div>
    </div>
  );
}
