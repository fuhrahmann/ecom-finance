import { Product, Order, Transaction, FinanceAnalytics } from '@/types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Financial Management Software',
    description: 'Comprehensive financial management and accounting software for businesses',
    price: 299.99,
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    stock: 100,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Investment Analytics Tool',
    description: 'Advanced analytics and reporting tool for investment portfolio management',
    price: 499.99,
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    stock: 50,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Business Budget Planner',
    description: 'Strategic budget planning and forecasting tool for enterprises',
    price: 199.99,
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    stock: 75,
    rating: 4.6,
  },
  {
    id: '4',
    name: 'Tax Compliance Suite',
    description: 'Automated tax calculation and compliance management system',
    price: 399.99,
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    stock: 60,
    rating: 4.7,
  },
  {
    id: '5',
    name: 'Payroll Management System',
    description: 'Complete payroll processing and employee payment tracking',
    price: 349.99,
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    stock: 80,
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Expense Tracking App',
    description: 'Mobile-first expense tracking and receipt management',
    price: 99.99,
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    stock: 200,
    rating: 4.4,
  },
];

export const sampleOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user-123',
    items: [
      { ...sampleProducts[0], quantity: 2 },
      { ...sampleProducts[1], quantity: 1 },
    ],
    totalAmount: 1099.97,
    status: 'completed',
    createdAt: '2025-10-15T10:30:00Z',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      street: '123 Business St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
  },
];

export const sampleTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    orderId: 'ORD-001',
    amount: 1099.97,
    type: 'payment',
    status: 'completed',
    date: '2025-10-15T10:35:00Z',
    paymentMethod: 'Credit Card',
  },
];

export const sampleAnalytics: FinanceAnalytics = {
  totalRevenue: 125000,
  totalOrders: 342,
  averageOrderValue: 365.5,
  pendingPayments: 12,
  completedPayments: 330,
  monthlyRevenue: [
    { month: 'Jan', revenue: 10000 },
    { month: 'Feb', revenue: 12000 },
    { month: 'Mar', revenue: 15000 },
    { month: 'Apr', revenue: 13000 },
    { month: 'May', revenue: 18000 },
    { month: 'Jun', revenue: 20000 },
  ],
};
