import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const DashboardChart = ({ summary }) => {
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode changes
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const data = [
    { name: "Applicants", value: summary?.totalApplicants || 0 },
    { name: "Admissions", value: summary?.totalAdmissions || 0 },
    { name: "Confirmed", value: summary?.confirmedAdmissions || 0 },
    { name: "Pending", value: summary?.pendingAdmissions || 0 },
  ];

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#374151" : "#E5E7EB"}
          />

          <XAxis
            dataKey="name"
            tick={{ fill: isDark ? "#D1D5DB" : "#374151" }}
            axisLine={{ stroke: isDark ? "#4B5563" : "#D1D5DB" }}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: isDark ? "#D1D5DB" : "#374151" }}
            axisLine={{ stroke: isDark ? "#4B5563" : "#D1D5DB" }}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
              border: "none",
              borderRadius: "12px",
              color: isDark ? "#FFFFFF" : "#111827",
            }}
            cursor={{ fill: isDark ? "#111827" : "#F3F4F6" }}
          />

          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            fill="#6366F1"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;

DashboardChart.propTypes = {
  summary: PropTypes.shape({
    totalApplicants: PropTypes.number,
    totalAdmissions: PropTypes.number,
    confirmedAdmissions: PropTypes.number,
    pendingAdmissions: PropTypes.number,
  }),
};