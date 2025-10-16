'use client';

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { sampleProducts } from "@/data/sampleData";
import { motion } from "framer-motion";

export default function Home() {
  const featuredProducts = sampleProducts.slice(0, 3);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50">
=======
    <div className="min-h-screen bg-white">
>>>>>>> 3a15f9aebc5d6a02f3836cac27cdf747fa1f8cb7
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

<<<<<<< HEAD
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-center text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
            ✨ Welcome to the Future of Finance
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              FinanceHub
            </span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-6 text-blue-50 font-light">
            Your Trusted Platform for Financial Software Solutions
          </p>
          <p className="text-base sm:text-lg md:text-xl mb-10 max-w-3xl mx-auto text-blue-100 leading-relaxed">
            Streamline your business operations with our comprehensive suite of
            financial management tools, payment processing, and analytics solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              Browse Products →
            </Link>
            <Link
              href="/analytics"
              className="w-full sm:w-auto bg-transparent text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 border-2 border-white/30 backdrop-blur-sm"
            >
              View Analytics
            </Link>
          </div>
=======
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              <span className="text-sm font-semibold flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Welcome to the Future of Finance
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight"
            >
              Welcome to{" "}
              <span className="relative">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                  FinanceHub
                </span>
                <motion.span
                  className="absolute bottom-2 left-0 right-0 h-4 bg-white/20 -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-4 text-blue-50 font-light max-w-3xl mx-auto"
            >
              Your Trusted Platform for Financial Software Solutions
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-blue-100/90 leading-relaxed"
            >
              Streamline your business operations with our comprehensive suite of
              financial management tools, payment processing, and analytics solutions.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Browse Products
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>

              <Link
                href="/analytics"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold border-2 border-white/30 hover:bg-white/20 transition-all duration-300 shadow-lg"
              >
                View Analytics
              </Link>
            </motion.div>
          </motion.div>
>>>>>>> 3a15f9aebc5d6a02f3836cac27cdf747fa1f8cb7
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose FinanceHub?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to transform your financial operations
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "🔒",
                title: "Secure Payments",
                description: "Enterprise-grade security with end-to-end encryption for all your financial transactions",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: "📊",
                title: "Advanced Analytics",
                description: "Real-time insights and comprehensive reports on your financial performance",
                color: "from-green-500 to-emerald-600"
              },
              {
                icon: "⚡",
                title: "Fast Processing",
                description: "Lightning-fast transaction processing with instant reporting and notifications",
                color: "from-purple-500 to-violet-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">Discover our most popular financial solutions</p>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg"
            >
              View All Products
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                custom={index}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Join thousands of businesses already using FinanceHub to streamline their financial operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/products"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                Get Started Today →
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-block bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
