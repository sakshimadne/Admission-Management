import { useEffect, useState } from "react";
import {
  fetchDashboardSummary,
  fetchSeatAvailability,
} from "../api/dashboardApi";
import KpiCard from "../components/KpiCard";

import DashboardChart from "../components/DashboardCharts";
const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
       const summaryData = await fetchDashboardSummary();
const seatData = await fetchSeatAvailability();

setSummary(summaryData);
setSeats(seatData);
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    loadData();
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div>
 <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
  Dashboard
</h1>

   
{/* ===== OVERVIEW SECTION ===== */}
<section className="mb-12">
  <div
    className="
      bg-white dark:bg-gray-900
      rounded-2xl
      shadow-sm
      p-8
      border border-gray-100 dark:border-gray-800
      transition-colors duration-300
    "
  >
    <h2 className="text-xl font-semibold mb-8 text-gray-900 dark:text-white">
      Overview
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard
        title="Total Applicants"
        value={summary?.totalApplicants || 0}
        color="text-blue-600 dark:text-blue-400"
      />
      <KpiCard
        title="Total Admissions"
        value={summary?.totalAdmissions || 0}
        color="text-indigo-600 dark:text-indigo-400"
      />
      <KpiCard
        title="Confirmed Admissions"
        value={summary?.confirmedAdmissions || 0}
        color="text-green-600 dark:text-green-400"
      />
      <KpiCard
        title="Pending Admissions"
        value={summary?.pendingAdmissions || 0}
        color="text-yellow-600 dark:text-yellow-400"
      />
    </div>
  </div>
</section>

<section>
  <div className="
    bg-white dark:bg-gray-900
    rounded-2xl
    shadow-sm
    p-8
    border border-gray-100 dark:border-gray-800
    transition-colors duration-300
  ">
    <h2 className="text-xl font-semibold mb-8 text-gray-900 dark:text-white">
      Analytics Overview
    </h2>

    <DashboardChart summary={summary} />
  </div>
</section>
<div className="mt-10 bg-white dark:bg-gray-900 shadow-sm rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors duration-300">
  <h2 className="text-lg font-semibold p-4 border-b">
    Seat Usage
  </h2>

  <table className="w-full text-left">
    <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm">
     <tr  className="border-t hover:bg-indigo-50/40 transition-all duration-200">
        <th className="p-4">Program</th>
        <th className="p-4">Intake</th>
        <th className="p-4">KCET</th>
        <th className="p-4">COMEDK</th>
        <th className="p-4">Management</th>
        <th className="p-4">Total Filled</th>
        <th className="p-4">Total Remaining</th>
      </tr>
    </thead>

    <tbody>
      {seats.map((program, index) => (
        <tr key={index} className="border-t hover:bg-gray-50 transition">
          <td className="p-4">{program.programName}</td>
          <td className="p-4">{program.intake}</td>

          <td className="p-4">
            {program.KCET.filled} / {program.KCET.total}
          </td>

          <td className="p-4">
            {program.COMEDK.filled} / {program.COMEDK.total}
          </td>

          <td className="p-4">
            {program.Management.filled} / {program.Management.total}
          </td>

         <td className="p-4">
  <div className="flex flex-col gap-2">
    <span className="font-medium text-green-600">
      {program.totalFilled}
    </span>

    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
        style={{
          width: `${(program.totalFilled / program.intake) * 100}%`,
        }}
      />
    </div>
  </div>
</td>

          <td className="p-4 text-blue-600 font-medium">
            {program.totalRemaining}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default DashboardPage;