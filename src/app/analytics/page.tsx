'use client';

import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { sampleAnalytics } from "@/data/sampleData";
import { useTheme } from '@/contexts/ThemeContext';

export default function AnalyticsPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen w-full relative ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      {/* Pink Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: theme === 'light'
            ? "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)"
            : "radial-gradient(125% 125% at 50% 90%, #000000 40%, #2b0707 100%)",
          backgroundSize: "100% 100%",
        }}
      />
      {/* Content with relative z-index to appear above background */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnalyticsDashboard analytics={sampleAnalytics} />
        </div>
      </div>
    </div>
  );
}
