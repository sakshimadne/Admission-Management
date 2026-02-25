import { Search } from "lucide-react";

const Topbar = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 ml-64">
      <div className="relative w-80">
        <Search
          size={18}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search applicants, admissions..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="text-gray-600">Admin</div>
    </div>
  );
};

export default Topbar;