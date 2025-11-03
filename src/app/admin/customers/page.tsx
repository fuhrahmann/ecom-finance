'use client';

import { useState, useEffect } from 'react';
import { sampleOrders } from '@/data/sampleData';
import { useTheme } from '@/contexts/ThemeContext';
import { formatUSD } from '@/utils/currency';

interface Customer {
  id: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'inactive';
}

export default function CustomersManagementPage() {
  const { theme } = useTheme();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Generate customer data from orders
    const customerMap: { [key: string]: Customer } = {};

    sampleOrders.forEach(order => {
      if (!customerMap[order.userId]) {
        customerMap[order.userId] = {
          id: order.userId,
          totalOrders: 0,
          totalSpent: 0,
          lastOrderDate: order.createdAt,
          status: 'active',
        };
      }

      customerMap[order.userId].totalOrders++;
      if (order.status === 'completed') {
        customerMap[order.userId].totalSpent += order.totalAmount;
      }

      // Update last order date if this order is more recent
      if (new Date(order.createdAt) > new Date(customerMap[order.userId].lastOrderDate)) {
        customerMap[order.userId].lastOrderDate = order.createdAt;
      }
    });

    setCustomers(Object.values(customerMap));
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Customer Management
          </h1>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            View and manage your customer database
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">👥</div>
            </div>
            <p className="text-blue-100 text-sm font-medium mb-1">Total Customers</p>
            <p className="text-3xl font-bold">{customers.length}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">✅</div>
            </div>
            <p className="text-green-100 text-sm font-medium mb-1">Active Customers</p>
            <p className="text-3xl font-bold">
              {customers.filter(c => c.status === 'active').length}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl">💰</div>
            </div>
            <p className="text-purple-100 text-sm font-medium mb-1">Avg Customer Value</p>
            <p className="text-3xl font-bold">
              {customers.length > 0
                ? formatUSD(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)
                : formatUSD(0)}
            </p>
          </div>
        </div>

        {/* Customers Table */}
        <div className={`rounded-xl shadow-md overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <div className={`px-6 py-4 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
            <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              All Customers ({customers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
              <thead className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Customer ID
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Total Orders
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Total Spent
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Last Order
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'light' ? 'bg-white divide-gray-200' : 'bg-gray-800 divide-gray-700'}`}>
                {customers.map((customer) => (
                  <tr key={customer.id} className={`transition ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-700'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {customer.id.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                            {customer.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {customer.totalOrders}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-600">
                        {formatUSD(customer.totalSpent)}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {new Date(customer.lastOrderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        View Details
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {customers.length === 0 && (
            <div className="text-center py-12">
              <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>No customers found.</p>
            </div>
          )}
        </div>

        {/* Customer Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className={`text-xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Top Customers by Spending</h2>
            <div className="space-y-4">
              {customers
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 5)
                .map((customer, index) => (
                  <div key={customer.id} className={`flex items-center justify-between p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{customer.id}</p>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{customer.totalOrders} orders</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-600">{formatUSD(customer.totalSpent)}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className={`text-xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Recent Activity</h2>
            <div className="space-y-4">
              {customers
                .sort((a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime())
                .slice(0, 5)
                .map((customer) => (
                  <div key={customer.id} className={`flex items-center justify-between p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        {customer.id.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{customer.id}</p>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                          Last order: {new Date(customer.lastOrderDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
