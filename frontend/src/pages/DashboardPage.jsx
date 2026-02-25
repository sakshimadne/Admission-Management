import { useEffect, useState } from "react";
import { fetchDashboardSummary } from "../api/dashboardApi";
import KpiCard from "../components/KpiCard";

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    loadData();
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <KpiCard
    title="Total Applicants"
    value={summary?.totalApplicants || 0}
     color="text-blue-600"
  />

  <KpiCard
    title="Total Admissions"
    value={summary?.totalAdmissions || 0}
     color="text-blue-600"
  />

  <KpiCard
    title="Confirmed Admissions"
    value={summary?.confirmedAdmissions || 0}
     color="text-blue-600"
  />

  <KpiCard
    title="Pending Admissions"
    value={summary?.pendingAdmissions || 0}
     color="text-blue-600"
  />
</div>
    </div>
  );
};

export default DashboardPage;