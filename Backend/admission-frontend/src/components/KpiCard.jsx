import PropTypes from "prop-types";

const KpiCard = ({ title, value, color = "text-gray-800" }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <h3 className={`text-3xl font-semibold ${color}`}>{value}</h3>
    </div>
  );
};

KpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string, // 👈 ADD THIS

};

export default KpiCard;