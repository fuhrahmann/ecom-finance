# ShopHub - E-Commerce Platform with Financial Management

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwind-css)

**A modern, full-featured e-commerce platform with integrated financial analytics**

[Live Demo](#) • [Features](#features) • [Tech Stack](#tech-stack) • [Screenshots](#screenshots)

</div>

---

## 📋 Overview

**ShopHub** is a portfolio demonstration project showcasing a production-quality e-commerce platform built with Next.js 15, React 19, and TypeScript. This project demonstrates modern web development practices, responsive design, and a complete shopping experience with an AdminLTE-inspired admin dashboard.

> **Note:** This is a demo/portfolio project. Data is simulated using sample data and local storage - perfect for showcasing UI/UX and frontend development skills.

---

## ✨ Features

### Customer Experience
- 🛍️ **Product Catalog** - Browse 20+ sample products across 6 categories
- 🛒 **Shopping Cart** - Full cart management with localStorage persistence
- 🔍 **Product Filtering** - Filter by category, search, and sort options
- 💳 **Checkout Flow** - Beautiful checkout interface (demo mode)
- 📊 **Analytics Dashboard** - View order history and spending insights
- 🌓 **Dark Mode** - System-aware theme with manual toggle
- 📱 **Responsive Design** - Mobile-first, works on all devices

### Admin Dashboard (AdminLTE-Inspired)
- 📈 **Dashboard Overview** - Statistics cards with key metrics
- 📦 **Product Management** - CRUD operations interface
- 🧾 **Order Management** - View and manage customer orders
- 👥 **Customer Management** - Customer data overview
- 💰 **Sales Reports** - Revenue analytics and insights
- 🎨 **Collapsible Sidebar** - Clean, organized navigation

### Authentication
- 🔐 **Role-Based Access** - Admin and customer roles
- 🚪 **Protected Routes** - Middleware-enforced authorization
- 👤 **Demo Accounts** - Pre-configured test users

---

## 🛠️ Tech Stack

### Core
- **Framework:** [Next.js 15.5](https://nextjs.org/) (App Router)
- **UI Library:** [React 19.1](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4.1](https://tailwindcss.com/)

### Libraries
- **Animations:** [Framer Motion 12](https://www.framer.com/motion/)
- **State Management:** React Context API
- **Data Persistence:** localStorage (demo mode)
- **Image Optimization:** Next.js Image with Unsplash integration

### Development Tools
- **Linting:** ESLint with Next.js config
- **Type Checking:** TypeScript strict mode
- **Package Manager:** npm

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ecom-finance
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

---

## 🎭 Demo Accounts

Use these credentials to explore different user roles:

| Role     | Email                    | Password     |
|----------|--------------------------|--------------|
| Admin    | admin@shophub.com        | admin123     |
| Customer | customer1@email.com      | customer123  |
| Customer | customer2@email.com      | customer123  |
| Customer | customer3@email.com      | customer123  |

---

## 📁 Project Structure

```
ecom-finance/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard pages
│   │   ├── api/               # API routes (auth, products)
│   │   ├── cart/              # Shopping cart page
│   │   ├── checkout/          # Checkout page
│   │   ├── products/          # Product listing & details
│   │   └── ...
│   ├── components/            # React components
│   │   ├── Navbar.tsx         # Main navigation
│   │   ├── AdminLayout.tsx    # Admin sidebar layout
│   │   ├── ProductCard.tsx    # Product display card
│   │   └── ...
│   ├── contexts/              # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state
│   │   ├── CartContext.tsx    # Shopping cart state
│   │   └── ThemeContext.tsx   # Dark/light theme
│   ├── data/                  # Sample data
│   │   └── sampleData.ts      # Mock products & orders
│   ├── types/                 # TypeScript definitions
│   │   └── index.ts
│   ├── utils/                 # Utility functions
│   │   └── currency.ts        # IDR formatting
│   └── middleware.ts          # Route protection
├── public/                    # Static assets
└── ...config files
```

---

## 🎨 Key Highlights

### Design & UX
- **Modern Gradient Backgrounds** - Animated radial gradients adapted to theme
- **Smooth Animations** - Framer Motion for engaging user experience
- **Intuitive Navigation** - Role-aware menu items and breadcrumbs
- **Product Cards** - Hover effects, stock indicators, discount badges
- **Responsive Tables** - Mobile-optimized data displays

### Technical Implementation
- **Type-Safe Codebase** - 100% TypeScript coverage
- **Component Architecture** - Modular, reusable components
- **Server/Client Split** - Optimized rendering strategy
- **Context API Pattern** - Clean state management
- **Protected Routes** - Middleware-based authorization
- **Currency Formatting** - IDR (Indonesian Rupiah) support

### Performance
- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Dynamic imports for faster load times
- **Font Optimization** - Geist font with next/font

---

## 🌟 Features Showcase

### Customer Features
✅ Browse product catalog with filtering
✅ Add/remove items from cart
✅ Update quantities in cart
✅ View cart total with discount calculations
✅ Checkout interface (demo)
✅ Order history view
✅ Dark/light theme toggle
✅ Responsive mobile navigation

### Admin Features
✅ Dashboard with statistics
✅ Product management interface
✅ Order overview table
✅ Customer list view
✅ Sales analytics page
✅ Collapsible sidebar navigation
✅ Quick stats in sidebar

---

## 📊 Sample Data

The project includes realistic sample data:
- **20 Products** across 6 categories (Electronics, Clothing, Accessories, etc.)
- **8 Sample Orders** with various statuses
- **4 Demo Users** (1 admin, 3 customers)
- **Monthly Revenue Data** for analytics

---

## 🚧 Limitations (Demo Project)

This is a portfolio/demo project with the following limitations:

- ❌ No real database (uses localStorage + sample data)
- ❌ No payment processing integration
- ❌ Authentication is client-side only (not production-secure)
- ❌ No email notifications
- ❌ Data resets on browser refresh
- ❌ No user registration flow
- ❌ No real-time updates

**For production use**, this would require:
- Database integration (PostgreSQL/MongoDB)
- Proper JWT-based authentication
- Payment gateway (Stripe/Midtrans)
- Email service (Resend/SendGrid)
- Backend API with validation
- Testing suite (Jest/Playwright)

---

## 📝 Documentation

Additional documentation available:
- [AUTH_GUIDE.md](AUTH_GUIDE.md) - Authentication system details
- [ADMINLTE_IMPLEMENTATION.md](ADMINLTE_IMPLEMENTATION.md) - Admin dashboard guide
- [SETUP_COMPLETE.md](SETUP_COMPLETE.md) - Implementation status & roadmap

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Deploy automatically

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

### Manual Deployment

```bash
npm run build
# Upload .next folder and run:
npm start
```

---

## 🎯 Learning Outcomes

This project demonstrates proficiency in:
- Modern React patterns (hooks, context, composition)
- Next.js App Router architecture
- TypeScript for type safety
- Tailwind CSS utility-first styling
- Framer Motion animations
- Component-driven development
- Responsive design principles
- State management patterns
- Protected routing & authentication
- Admin dashboard design

---

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome!

---

## 📄 License

This project is open source and available for portfolio/learning purposes.

---

## 👤 Author

Created as a portfolio demonstration project.

**Tech Stack:** Next.js • React • TypeScript • Tailwind CSS
**Year:** 2025

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

</div>
