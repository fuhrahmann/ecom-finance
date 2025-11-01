'use client';

import { Invoice } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';

interface InvoiceCardProps {
  invoice: Invoice;
}

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
  const { theme } = useTheme();

  const statusColors = {
    paid: 'bg-green-100 text-green-800',
    unpaid: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{invoice.invoiceNumber}</h3>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Order ID: {invoice.orderId}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[invoice.status]
          }`}
        >
          {invoice.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Issue Date:</span>
          <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {new Date(invoice.issueDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Due Date:</span>
          <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {new Date(invoice.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className={`border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} pt-4 space-y-2`}>
        <div className={`flex justify-between text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          <span>Subtotal:</span>
          <span>${invoice.subtotal.toFixed(2)}</span>
        </div>
        <div className={`flex justify-between text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          <span>Tax:</span>
          <span>${invoice.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Total:</span>
          <span className="text-blue-600">${invoice.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm">
          View Invoice
        </button>
        <button className={`flex-1 ${theme === 'light' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} py-2 rounded-lg transition text-sm`}>
          Download PDF
        </button>
      </div>
    </div>
  );
}
