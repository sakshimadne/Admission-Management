import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  LogOut,
  Building2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 cursor-pointer ${
      isActive
        ? "text-indigo-600 font-medium"
        : "text-gray-700 hover:text-indigo-600"
    }`;

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-5 fixed">
      <h1 className="text-xl font-semibold text-indigo-600 mb-10">
        College CRM
      </h1>

      <nav className="space-y-4">

        {/* Dashboard */}
        <NavLink to="/" className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        {/* Institutions */}
        <NavLink to="/institutions" className={linkClass}>
          <Building2 size={18} />
          Institutions
        </NavLink>

        {/* Applicants */}
        <NavLink to="/applicants" className={linkClass}>
          <Users size={18} />
          Applicants
        </NavLink>

        {/* Admissions */}
        <NavLink to="/admissions" className={linkClass}>
          <GraduationCap size={18} />
          Admissions
        </NavLink>
   
<NavLink to="/campuses" className={linkClass}>
  <Building2 size={18} />
  Campuses
</NavLink>
     <NavLink to="/departments" className={linkClass}>
  <Building2 size={18} />
  Departments
</NavLink>
<NavLink to="/programs" className={linkClass}>
  <GraduationCap size={18} />
  Programs
</NavLink>
<NavLink to="/seat-matrix" className={linkClass}>
  Seat Matrix
</NavLink>

        {/* Logout */}
        <div
          onClick={logout}
          className="flex items-center gap-3 text-gray-700 hover:text-red-500 cursor-pointer mt-10"
        >
          <LogOut size={18} />
          Logout
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;