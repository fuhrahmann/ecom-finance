'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, user } = useAuth();
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // Small delay to ensure state is updated
      setTimeout(() => {
        // Get the updated user from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          // Redirect admin to admin dashboard, customers to homepage
          if (userData.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/');
          }
        } else {
          router.push('/');
        }
        setLoading(false);
      }, 100);
    } else {
      setError(result.error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Dynamic Background - Pink Glow for Light, Crimson Depth for Dark */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: theme === 'light'
            ? "radial-gradient(125% 125% at 50% 10%, #fef3f8 40%, #ffc9e3 100%)"
            : "radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b0707 100%)",
        }}
      />
      {/* Content with relative z-index to appear above background */}
      <div className="relative z-10">
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent mb-2">
            ShopHub
          </h1>
          <p className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>Sign in to your account</p>
        </div>

        <div className={`backdrop-blur-md rounded-2xl shadow-2xl p-8 ${
          theme === 'light'
            ? 'bg-white/70 border border-pink-200'
            : 'bg-white/5 border border-white/10'
        }`}>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  theme === 'light'
                    ? 'border-pink-300 bg-white text-gray-900 placeholder-gray-400'
                    : 'border-white/20 bg-white/10 text-white placeholder-gray-400'
                }`}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  theme === 'light'
                    ? 'border-pink-300 bg-white text-gray-900 placeholder-gray-400'
                    : 'border-white/20 bg-white/10 text-white placeholder-gray-400'
                }`}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className={`mt-8 pt-6 border-t ${theme === 'light' ? 'border-pink-200' : 'border-white/10'}`}>
            <h3 className={`text-sm font-semibold mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Demo Accounts:</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/30">
                <p className={`font-semibold ${theme === 'light' ? 'text-blue-700' : 'text-blue-300'}`}>Admin Account:</p>
                <p className={theme === 'light' ? 'text-blue-600' : 'text-blue-200'}>Email: admin@shophub.com</p>
                <p className={theme === 'light' ? 'text-blue-600' : 'text-blue-200'}>Password: admin123</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/30">
                <p className={`font-semibold ${theme === 'light' ? 'text-green-700' : 'text-green-300'}`}>Customer Account:</p>
                <p className={theme === 'light' ? 'text-green-600' : 'text-green-200'}>Email: customer1@email.com</p>
                <p className={theme === 'light' ? 'text-green-600' : 'text-green-200'}>Password: customer123</p>
              </div>
            </div>
          </div>
        </div>

        <p className={`text-center text-sm mt-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
        </div>
      </div>
    </div>
  );
}
