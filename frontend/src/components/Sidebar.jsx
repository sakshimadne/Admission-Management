import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  LogOut,
  Building2,
  Layers,
  GitBranch,
  School,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center ${
      isOpen ? "justify-start gap-3 px-4" : "justify-center"
    } py-2 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold shadow-sm"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600"
    }`;

  return (
    <div
      className={`min-h-screen border-r border-gray-200 dark:border-gray-800 
      bg-white dark:bg-gray-900 
      transition-all duration-300 ease-in-out 
      ${isOpen ? "w-64" : "w-20"} 
      p-4 flex flex-col`}
    >
   
  {/* ===== Header + Toggle ===== */}
<div className="relative mb-10">

  {/* Logo */}
  {isOpen && (
    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      College CRM
    </h1>
  )}

  {/* Toggle Button */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center 
               rounded-lg bg-gray-100 dark:bg-gray-800 
               hover:bg-indigo-100 dark:hover:bg-gray-700 
               transition shadow-sm"
  >
    {isOpen ? (
      <ChevronLeft size={16} className="text-indigo-600" />
    ) : (
      <ChevronRight size={16} className="text-indigo-600" />
    )}
  </button>

</div>

      {/* ===== Navigation ===== */}
      <nav className="flex-1 space-y-6">

        {/* Dashboard */}
        <NavLink to="/" className={linkClass}>
          <LayoutDashboard size={20} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        {/* Academic Setup */}
        <div>
          {isOpen && (
            <p className="text-xs uppercase text-gray-400 mb-3 tracking-wider px-4">
              Academic Setup
            </p>
          )}

          <div className="space-y-2">
            <NavLink to="/institutions" className={linkClass}>
              <Building2 size={20} />
              {isOpen && <span>Institutions</span>}
            </NavLink>

            <NavLink to="/campuses" className={linkClass}>
              <School size={20} />
              {isOpen && <span>Campuses</span>}
            </NavLink>

            <NavLink to="/departments" className={linkClass}>
              <GitBranch size={20} />
              {isOpen && <span>Departments</span>}
            </NavLink>

            <NavLink to="/programs" className={linkClass}>
              <GraduationCap size={20} />
              {isOpen && <span>Programs</span>}
            </NavLink>

            <NavLink to="/seat-matrix" className={linkClass}>
              <Layers size={20} />
              {isOpen && <span>Seat Matrix</span>}
            </NavLink>
          </div>
        </div>

        {/* Admission */}
        <div>
          {isOpen && (
            <p className="text-xs uppercase text-gray-400 mb-3 tracking-wider px-4">
              Admission
            </p>
          )}

          <div className="space-y-2">
            <NavLink to="/applicants" className={linkClass}>
              <Users size={20} />
              {isOpen && <span>Applicants</span>}
            </NavLink>

            <NavLink to="/admissions" className={linkClass}>
              <GraduationCap size={20} />
              {isOpen && <span>Admissions</span>}
            </NavLink>
          </div>
        </div>
      </nav>

      {/* ===== Logout ===== */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={logout}
          className={`flex items-center ${
            isOpen ? "justify-start gap-3 px-4" : "justify-center"
          } py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-500 transition w-full`}
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};


export default Sidebar;
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};