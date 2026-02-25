import PropTypes from "prop-types";

const KpiCard = ({ title, value, color }) => {
  return (
    <div
      className="
 bg-gray-50 dark:bg-gray-800/70 backdrop-blur-sm
        rounded-2xl
        p-6
        border border-gray-100 dark:border-gray-700
        shadow-sm
        hover:shadow-lg hover:-translate-y-1
        transition-all duration-300
      "
    >
      {/* Title */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 tracking-wide">
        {title}
      </p>

      {/* Value */}
      <h2
        className={`text-3xl font-bold ${color} transition-transform duration-300`}
      >
        {value}
      </h2>

      {/* Accent Line */}
      <div className="mt-4 h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-70" />
    </div>
  );
};

KpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string,
};

export default KpiCard;