'use client';

import { useState, useEffect } from 'react';
import { sampleOrders } from '@/data/sampleData';
import { Order } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { formatUSD } from '@/utils/currency';

export default function OrdersManagementPage() {
  const { theme } = useTheme();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(sampleOrders);
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const totalRevenue = filteredOrders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Order Management
          </h1>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Track and manage customer orders
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`rounded-xl shadow-md p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Orders</p>
                <p className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{orders.length}</p>
              </div>
              <div className="text-4xl">🛍️</div>
            </div>
          </div>

          <div className={`rounded-xl shadow-md p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>

          <div className={`rounded-xl shadow-md p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Processing</p>
                <p className="text-3xl font-bold text-blue-600">
                  {orders.filter(o => o.status === 'processing').length}
                </p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
          </div>

          <div className={`rounded-xl shadow-md p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'completed').length}
                </p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Filter by status:</span>
            {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as typeof filter)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : `${theme === 'light' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className={`rounded-xl shadow-md overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <div className={`px-6 py-4 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
            <div className="flex justify-between items-center">
              <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Orders ({filteredOrders.length})
              </h2>
              <div className="text-sm text-gray-600">
                Total Revenue: <span className="font-bold text-green-600">{formatUSD(totalRevenue)}</span>
              </div>
            </div>
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
                    Items
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Total
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Payment
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Date
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'light' ? 'bg-white divide-gray-200' : 'bg-gray-800 divide-gray-700'}`}>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className={`transition ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-700'}`}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{order.userId}</div>
                      <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                        {order.shippingAddress.city}, {order.shippingAddress.state}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {formatUSD(order.totalAmount)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {order.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)} border-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>No orders found with this filter.</p>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
              <div className={`p-6 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                <div className="flex justify-between items-center">
                  <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Order Details - {selectedOrder.id}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Customer Information</h3>
                  <div className={`rounded-lg p-4 space-y-2 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Customer ID: <span className="font-medium text-gray-900">{selectedOrder.userId}</span></p>
                    <p className="text-sm text-gray-600">
                      Address: <span className="font-medium text-gray-900">
                        {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className={`flex items-center justify-between rounded-lg p-4 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                        <div className="flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div>
                            <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{formatUSD(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Subtotal:</span>
                    <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{formatUSD(selectedOrder.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Payment Method:</span>
                    <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Status:</span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                    <span className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Total:</span>
                    <span className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{formatUSD(selectedOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
