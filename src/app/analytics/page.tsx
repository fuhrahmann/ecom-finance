import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { sampleAnalytics } from "@/data/sampleData";

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnalyticsDashboard analytics={sampleAnalytics} />
    </div>
  );
}
