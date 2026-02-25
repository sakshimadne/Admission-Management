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
  <div className="max-w-7xl mx-auto space-y-10">

    {/* ===== PAGE TITLE ===== */}
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Institutions
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Manage and create institutions
      </p>
    </div>

    {/* ===== CREATE SECTION ===== */}
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
        Create Institution
      </h2>

      <form
        onSubmit={handleCreate}
        className="flex flex-wrap gap-4 items-end"
      >
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Institution Name
          </label>
          <input
            type="text"
            placeholder="ABC Engineering College"
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
            Code
          </label>
          <input
            type="text"
            placeholder="ABC001"
            className="
              w-40 px-4 py-2 rounded-xl
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-white
              focus:ring-2 focus:ring-indigo-500
              outline-none transition
            "
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
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

    {/* ===== TABLE SECTION ===== */}
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
          Institution List
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Code</th>
              <th className="p-4 font-medium">Created At</th>
            </tr>
          </thead>

          <tbody>
            {institutions.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="p-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No institutions found
                </td>
              </tr>
            ) : (
              institutions.map((inst) => (
                <tr
                  key={inst._id}
                  className="
                    border-t border-gray-100 dark:border-gray-800
                    hover:bg-gray-50 dark:hover:bg-gray-800/50
                    transition
                  "
                >
                  <td className="p-4 text-gray-800 dark:text-gray-200">
                    {inst.name}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {inst.code}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {new Date(inst.createdAt).toLocaleDateString()}
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

export default InstitutionsPage;