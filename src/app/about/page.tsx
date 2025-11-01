'use client';

import { useTheme } from '@/contexts/ThemeContext';
import Breadcrumb from '@/components/Breadcrumb';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { theme } = useTheme();

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Modern Tech Stack',
      description: 'Built with Next.js 15, React 19, TypeScript, and Tailwind CSS for optimal performance.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure & Reliable',
      description: 'Role-based authentication with protected routes and middleware security.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Beautiful Design',
      description: 'Responsive UI with dark mode support and smooth animations using Framer Motion.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Production Ready',
      description: 'Error boundaries, SEO optimization, and accessibility features built-in.',
    },
  ];

  const techStack = [
    { name: 'Next.js', version: '15.5', category: 'Framework' },
    { name: 'React', version: '19.1', category: 'Library' },
    { name: 'TypeScript', version: '5.0', category: 'Language' },
    { name: 'Tailwind CSS', version: '4.1', category: 'Styling' },
    { name: 'Framer Motion', version: '12', category: 'Animation' },
    { name: 'Context API', version: '-', category: 'State Management' },
  ];

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className={`text-5xl font-bold mb-6 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            A modern e-commerce platform built as a portfolio demonstration project,
            showcasing full-stack development skills and best practices.
          </p>
        </motion.div>

        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mb-16 p-8 rounded-xl ${
            theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800'
          }`}
        >
          <h2 className={`text-3xl font-semibold mb-6 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            The Project
          </h2>
          <div className={`space-y-4 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <p className="text-lg leading-relaxed">
              ShopHub is a comprehensive e-commerce platform that demonstrates modern web development
              capabilities. This project showcases expertise in building scalable, user-friendly applications
              with a focus on performance, accessibility, and user experience.
            </p>
            <p className="text-lg leading-relaxed">
              The platform features a complete shopping experience including product browsing, cart management,
              checkout flow, and an AdminLTE-inspired admin dashboard for managing products, orders, and
              viewing analytics.
            </p>
            <p className="text-lg leading-relaxed">
              While this is a demonstration project using simulated data, it's architected to be production-ready
              with proper error handling, SEO optimization, and responsive design that works seamlessly across
              all devices.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-semibold mb-8 text-center ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className={`p-6 rounded-xl ${
                  theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-800'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={`p-8 rounded-xl ${
            theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800'
          }`}
        >
          <h2 className={`text-3xl font-semibold mb-6 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Technology Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                className={`p-4 rounded-lg border ${
                  theme === 'light'
                    ? 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                    : 'border-gray-700 hover:border-blue-500 hover:bg-blue-900/20'
                } transition`}
              >
                <div className={`text-lg font-semibold mb-1 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {tech.name}
                </div>
                <div className={`text-sm ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {tech.category}
                </div>
                {tech.version !== '-' && (
                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    v{tech.version}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className={`inline-block p-8 rounded-xl ${
            theme === 'light' ? 'bg-gradient-to-r from-blue-50 to-purple-50' : 'bg-gradient-to-r from-blue-900/30 to-purple-900/30'
          }`}>
            <h3 className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Interested in Working Together?
            </h3>
            <p className={`mb-6 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Feel free to reach out if you'd like to discuss this project or potential opportunities.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
