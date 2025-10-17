# Authentication & Role-Based Access Guide

## Overview
This application now has a complete authentication system with role-based access control (Admin & User roles).

## Demo Accounts

### Admin Account
- **Email**: `admin@demo.com`
- **Password**: `admin123`
- **Access**: Full access including product management

### User Account
- **Email**: `user@demo.com`
- **Password**: `user123`
- **Access**: Can view products and make purchases

## Features Implemented

### 1. Authentication System
- **Login Page**: `/login`
- **Session Management**: Cookie-based sessions (7 days expiry)
- **Auto-redirect**: Protects checkout and admin routes

### 2. Role-Based Navigation
- **Admin Users See**:
  - "Manage Products" menu item
  - Access to `/admin/products` for CRUD operations

- **Regular Users See**:
  - Standard navigation only
  - Cannot access admin routes

- **Guest Users**:
  - Can browse products freely
  - Must login to checkout or manage cart

### 3. Protected Routes

#### Admin Routes (Admin only)
- `/admin/products` - Product CRUD management
- Middleware automatically redirects non-admin users

#### Checkout Routes (Login required)
- `/checkout` - Requires any authenticated user
- Auto-redirects to login if not authenticated

### 4. Smart Login Prompts
- **Cart/Checkout**: Shows warning only when user tries to checkout (not when just viewing)
- **Product Browsing**: No login required, can view freely
- **Add to Cart**: Will show login prompt when attempting checkout

## How It Works

### Authentication Flow
1. User logs in at `/login`
2. Session stored in HTTP-only cookie
3. AuthContext provides user state globally
4. Middleware protects admin routes
5. Components check auth for actions

### Session Storage
- **Location**: HTTP-only cookies
- **Duration**: 7 days
- **Data Stored**: User ID, name, email, role

### Role Checking
```typescript
// In components
const { user } = useAuth();

if (user?.role === 'admin') {
  // Show admin features
}
```

## User Experience

### As a Guest
- Browse products freely ✓
- View product details ✓
- See cart page ✓
- Add items to cart ✓
- **Login required** when clicking "Proceed to Checkout"

### As a Regular User
- All guest features ✓
- Complete checkout ✓
- View orders ✓
- **Cannot** access product management

### As an Admin
- All user features ✓
- Access product management ✓
- Create/Edit/Delete products ✓
- Full CRUD operations ✓

## Key Files

### Authentication
- `src/contexts/AuthContext.tsx` - Global auth state
- `src/app/api/auth/login/route.ts` - Login endpoint
- `src/app/api/auth/session/route.ts` - Session validation
- `src/app/api/auth/logout/route.ts` - Logout endpoint
- `src/middleware.ts` - Route protection

### UI Components
- `src/components/Navbar.tsx` - Shows role-based menu
- `src/components/CartSummary.tsx` - Login prompt for checkout
- `src/app/login/page.tsx` - Login form

### Types
- `src/types/index.ts` - User and AuthSession interfaces

## Testing the System

1. **Visit** http://localhost:3000
2. **Browse products** - No login needed
3. **Try to checkout** - Login prompt appears
4. **Login as admin** - See "Manage Products" in menu
5. **Login as user** - No admin menu visible

## Security Features

- HTTP-only cookies (prevent XSS)
- Session expiry (7 days)
- Middleware route protection
- Role-based access control
- Automatic redirects for unauthorized access

## Next Steps (Optional Enhancements)

- Add password hashing (bcrypt)
- Connect to real database
- Add user registration
- Implement refresh tokens
- Add email verification
- Two-factor authentication
