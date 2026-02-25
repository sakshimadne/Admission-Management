import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
  <div className="flex min-h-screen
 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
    transition-colors duration-300">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col transition-all duration-300">
        <Topbar setIsOpen={setIsOpen} />
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto text-gray-800 dark:text-gray-100 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;