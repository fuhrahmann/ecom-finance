'use client';

import { useState, useEffect } from 'react';
import { sampleOrders } from '@/data/sampleData';
import { Order } from '@/types';

export default function OrdersManagementPage() {
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
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Order Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage customer orders
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
              </div>
              <div className="text-4xl">🛍️</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Processing</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {orders.filter(o => o.status === 'processing').length}
                </p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {orders.filter(o => o.status === 'completed').length}
                </p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Filter by status:</span>
            {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as typeof filter)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Orders ({filteredOrders.length})
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Revenue: <span className="font-bold text-green-600 dark:text-green-400">${totalRevenue.toFixed(2)}</span>
              </div>
            </div>
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
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{order.userId}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {order.shippingAddress.city}, {order.shippingAddress.state}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
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
              <p className="text-gray-500 dark:text-gray-400">No orders found with this filter.</p>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Order Details - {selectedOrder.id}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Customer Information</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Customer ID: <span className="font-medium text-gray-900 dark:text-white">{selectedOrder.userId}</span></p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Address: <span className="font-medium text-gray-900 dark:text-white">
                        {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-medium text-gray-900 dark:text-white">${selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">Total:</span>
                    <span className="text-gray-900 dark:text-white">${selectedOrder.totalAmount.toFixed(2)}</span>
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
