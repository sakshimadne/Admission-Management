import { useEffect, useState } from "react";
import { getCampuses, createCampus } from "../api/campusApi";
import { getInstitutions } from "../api/institutionApi";

const CampusesPage = () => {
  const [campuses, setCampuses] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [institutionId, setInstitutionId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const instData = await getInstitutions();
      const campusData = await getCampuses();

      setInstitutions(instData);
      setCampuses(campusData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!institutionId) {
      alert("Select institution first");
      return;
    }

    try {
      await createCampus({ name, institutionId });
      setName("");
      setInstitutionId("");
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Campus creation failed");
    }
  };

  // Helper function to get institution name
  const getInstitutionName = (id) => {
    const inst = institutions.find((i) => i._id === id);
    return inst ? inst.name : "Unknown";
  };

  if (loading) return <div className="p-6">Loading campuses...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Campuses</h1>

      {/* Create Campus */}
      <form onSubmit={handleCreate} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Campus Name"
          className="border px-3 py-2 rounded w-60"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          className="border px-3 py-2 rounded w-60"
          value={institutionId}
          onChange={(e) => setInstitutionId(e.target.value)}
          required
        >
          <option value="">Select Institution</option>
          {institutions.map((inst) => (
            <option key={inst._id} value={inst._id}>
              {inst.name}
            </option>
          ))}
        </select>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      {/* Campus Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4">Campus Name</th>
              <th className="p-4">Institution</th>
              <th className="p-4">Created At</th>
            </tr>
          </thead>

          <tbody>
            {campuses.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No campuses found
                </td>
              </tr>
            ) : (
              campuses.map((campus) => (
                <tr key={campus._id} className="border-t">
                  <td className="p-4">{campus.name}</td>
                  <td className="p-4">
                    {getInstitutionName(campus.institutionId)}
                  </td>
                  <td className="p-4">
                    {new Date(campus.createdAt).toLocaleDateString()}
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

export default CampusesPage;