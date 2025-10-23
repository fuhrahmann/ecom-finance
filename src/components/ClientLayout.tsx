'use client';

import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if we're on an admin page
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          {/* Only show customer navbar and footer if NOT on admin pages */}
          {!isAdminPage && <Navbar />}
          {children}
          {!isAdminPage && <Footer />}
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
