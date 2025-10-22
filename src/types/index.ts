export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  stock: number;
  rating?: number;
  tags?: string[];
  brand?: string;
  isActive?: boolean;
  discount?: number;
  sku?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  paymentMethod: string;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  type: 'payment' | 'refund';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  paymentMethod: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'paid' | 'unpaid' | 'overdue';
}

export interface FinanceAnalytics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  pendingPayments: number;
  completedPayments: number;
  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface AuthSession {
  user: User;
  expiresAt: string;
}
