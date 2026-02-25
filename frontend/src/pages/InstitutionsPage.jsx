import { useEffect, useState } from "react";
import { getInstitutions, createInstitution } from "../api/institutionApi";

const InstitutionsPage = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const data = await getInstitutions();
      setInstitutions(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load institutions");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createInstitution({ name, code });
      setName("");
      setCode("");
      fetchInstitutions();
    } catch (err) {
      console.error(err);
      alert("Only Admin can create institution");
    }
  };

  if (loading) return <div className="p-6">Loading institutions...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Institutions</h1>

      {/* Create Form */}
      <form onSubmit={handleCreate} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Institution Name"
          className="border px-3 py-2 rounded w-60"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Code"
          className="border px-3 py-2 rounded w-32"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Code</th>
              <th className="p-4">Created At</th>
            </tr>
          </thead>

          <tbody>
            {institutions.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No institutions found
                </td>
              </tr>
            ) : (
              institutions.map((inst) => (
                <tr key={inst._id} className="border-t">
                  <td className="p-4">{inst.name}</td>
                  <td className="p-4">{inst.code}</td>
                  <td className="p-4">
                    {new Date(inst.createdAt).toLocaleDateString()}
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

export default InstitutionsPage;