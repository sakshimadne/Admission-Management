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

  const getCampusName = (id) => {
    const campus = campuses.find((c) => c._id === id);
    return campus ? campus.name : "Unknown";
  };

  if (loading) return <div className="p-6">Loading departments...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Departments</h1>

      {/* Create Department */}
      <form onSubmit={handleCreate} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Department Name"
          className="border px-3 py-2 rounded w-60"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          className="border px-3 py-2 rounded w-60"
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

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4">Department</th>
              <th className="p-4">Campus</th>
              <th className="p-4">Created At</th>
            </tr>
          </thead>

          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No departments found
                </td>
              </tr>
            ) : (
              departments.map((dept) => (
                <tr key={dept._id} className="border-t">
                  <td className="p-4">{dept.name}</td>
                  <td className="p-4">
                    {getCampusName(dept.campusId)}
                  </td>
                  <td className="p-4">
                    {new Date(dept.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentsPage;