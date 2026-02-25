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


  // const getInstitutionName = (id) => {
  //   const inst = institutions.find((i) => i._id === id);
  //   return inst ? inst.name : "Unknown";
  // };

  if (loading) return <div className="p-6">Loading campuses...</div>;

 return (
  <div className="max-w-7xl mx-auto space-y-10">


    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Campuses
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Manage campuses under institutions
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
        Create Campus
      </h2>

      <form
        onSubmit={handleCreate}
        className="flex flex-wrap gap-4 items-end"
      >

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Campus Name
          </label>
          <input
            type="text"
            placeholder="Science Campus"
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
            Institution
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
          Campus List
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-4 font-medium">Campus Name</th>
              <th className="p-4 font-medium">Institution</th>
              <th className="p-4 font-medium">Created At</th>
            </tr>
          </thead>

          <tbody>
            {campuses.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="p-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No campuses found
                </td>
              </tr>
            ) : (
              campuses.map((campus) => (
                <tr
                  key={campus._id}
                  className="
                    border-t border-gray-100 dark:border-gray-800
                    hover:bg-gray-50 dark:hover:bg-gray-800/50
                    transition
                  "
                >
                  <td className="p-4 text-gray-800 dark:text-gray-200">
                    {campus.name}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">

                    {campus.institutionId?.name || "Unknown"}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {new Date(campus.createdAt).toLocaleDateString()}
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

export default CampusesPage;