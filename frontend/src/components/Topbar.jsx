import {
  Search,
  ChevronDown,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // ✅ Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  // ✅ Toggle theme
  const toggleDarkMode = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/applicants?search=${query}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between px-8 transition-colors duration-300">

      {/* LEFT: SEARCH */}
      <div className="relative w-[420px]">
        <Search
          size={18}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search applicants, admissions..."
          className="w-full pl-10 pr-4 py-2 rounded-xl 
                     border border-gray-200 dark:border-gray-700 
                     bg-white dark:bg-gray-800 
                     text-gray-800 dark:text-white 
                     focus:ring-2 focus:ring-indigo-500 
                     outline-none transition"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 flex items-center justify-center rounded-xl 
                     bg-gray-100 dark:bg-gray-800 
                     hover:bg-indigo-100 dark:hover:bg-gray-700 
                     transition"
        >
          {dark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-indigo-600" />
          )}
        </button>

        {/* USER BLOCK */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer 
                       hover:bg-gray-100 dark:hover:bg-gray-800 
                       px-3 py-2 rounded-xl transition"
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role || "Administrator"}
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
              {(user?.name?.charAt(0) || "A").toUpperCase()}
            </div>

            <ChevronDown size={16} className="text-gray-400" />
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-40 
                            bg-white dark:bg-gray-800 
                            border border-gray-200 dark:border-gray-700 
                            rounded-xl shadow-lg py-2 z-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm 
                           text-gray-600 dark:text-gray-300 
                           hover:bg-red-50 dark:hover:bg-red-900 
                           hover:text-red-500 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;