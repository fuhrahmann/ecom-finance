import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { sampleAnalytics } from "@/data/sampleData";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Pink Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)
          `,
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
