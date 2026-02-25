import { useEffect, useState } from "react";
import { getDepartments, createDepartment } from "../api/departmentApi";
import { getCampuses } from "../api/campusApi";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [campusId, setCampusId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const campusData = await getCampuses();
      const deptData = await getDepartments();

      setCampuses(campusData);
      setDepartments(deptData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!campusId) {
      alert("Select campus first");
      return;
    }

    try {
      await createDepartment({ name, campusId });
      setName("");
      setCampusId("");
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Department creation failed");
    }
  };

  // const getCampusName = (id) => {
  //   const campus = campuses.find((c) => c._id === id);
  //   return campus ? campus.name : "Unknown";
  // };
  
  if (loading) return <div className="p-6">Loading departments...</div>;

return (
  <div className="max-w-7xl mx-auto space-y-10">

    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Departments
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Manage departments under campuses
      </p>
    </div>


    <section
      className="
        bg-white dark:bg-gray-900
        border border-gray-100 dark:border-gray-800
        rounded-2xl
        shadow-sm
        p-8
        transition-colors duration-300
      "
    >
      <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Create Department
      </h2>

      <form
        onSubmit={handleCreate}
        className="flex flex-wrap gap-4 items-end"
      >

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Department Name
          </label>
          <input
            type="text"
            placeholder="Computer Science"
            className="
              w-64 px-4 py-2 rounded-xl
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-white
              focus:ring-2 focus:ring-indigo-500
              outline-none transition
            "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Campus
          </label>
          <select
            className="
              w-64 px-4 py-2 rounded-xl
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-white
              focus:ring-2 focus:ring-indigo-500
              outline-none transition
            "
            value={campusId}
            onChange={(e) => setCampusId(e.target.value)}
            required
          >
            <option value="">Select Campus</option>
            {campuses.map((campus) => (
              <option key={campus._id} value={campus._id}>
                {campus.name}
              </option>
            ))}
          </select>
        </div>


        <button
          className="
            h-10 px-6 rounded-xl
            bg-indigo-600 hover:bg-indigo-700
            text-white font-medium
            transition
          "
        >
          Create
        </button>
      </form>
    </section>


    <section
      className="
        bg-white dark:bg-gray-900
        border border-gray-100 dark:border-gray-800
        rounded-2xl
        shadow-sm
        overflow-hidden
        transition-colors duration-300
      "
    >
      <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Department List
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-4 font-medium">Department</th>
              <th className="p-4 font-medium">Campus</th>
              <th className="p-4 font-medium">Created At</th>
            </tr>
          </thead>

          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="p-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No departments found
                </td>
              </tr>
            ) : (
              departments.map((dept) => (
                <tr
                  key={dept._id}
                  className="
                    border-t border-gray-100 dark:border-gray-800
                    hover:bg-gray-50 dark:hover:bg-gray-800/50
                    transition
                  "
                >
                  <td className="p-4 text-gray-800 dark:text-gray-200">
                    {dept.name}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
              
                    {dept.campusId?.name || "Unknown"}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {new Date(dept.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>

  </div>
);
};

export default DepartmentsPage;