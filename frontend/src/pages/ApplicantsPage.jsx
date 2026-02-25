import { useEffect, useState } from "react";
import { getApplicants } from "../api/applicantApi";
import { allocateSeat } from "../api/admissionApi";
import { useNavigate, useLocation } from "react-router-dom";
import { getPrograms } from "../api/programApi";
import toast from "react-hot-toast";
import { getSeatMatrixByProgram } from "../api/seatMatrixApi";
const ApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [programs, setPrograms] = useState([]);
const [selectedPrograms, setSelectedPrograms] = useState({});
const [seatMatrixMap, setSeatMatrixMap] = useState({});
const navigate = useNavigate();

const fetchApplicants = async () => {
  try {
    const data = await getApplicants();
    console.log(data);
    setApplicants(data);
    setFilteredApplicants(data);
  } catch (err) {
    console.error("Error fetching applicants:", err);
    setError("Failed to load applicants");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchApplicants();
  fetchPrograms();
}, []);
const location = useLocation();



useEffect(() => {
  fetchApplicants();
}, []);

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search");

  if (searchQuery !== null) {
    setSearch(searchQuery);
  }
}, [location.search]);

const fetchPrograms = async () => {
  const data = await getPrograms();
  setPrograms(data);
};

  // Search filter
  useEffect(() => {
    const filtered = applicants.filter((applicant) =>
      applicant.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredApplicants(filtered);
  }, [search, applicants]);

  if (loading) return <div className="p-6">Loading applicants...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
const handleAllocate = async (applicant) => {
  const programId = selectedPrograms[applicant._id];

  if (!programId) {
    toast.error("Please select a program");
    return;
  }

  try {
    const payload = {
      applicantId: applicant._id,
      programId,
      quotaType: applicant.quotaType,
      allotmentNumber: `${applicant.quotaType}-${Date.now()}`,
    };

    await allocateSeat(payload);
    toast.success("Seat Allocated Successfully");
    fetchApplicants();
  } catch (error) {
    toast.error(error.response?.data?.message || "Allocation Failed");
  }
};

const getRemainingSeats = (programId, quotaType) => {
  const matrix = seatMatrixMap[programId];
  if (!matrix) return null;

  const quota = matrix.quotas[quotaType];
  if (!quota) return null;

  return quota.total - quota.filled;
};

 return (
  <div className="max-w-7xl mx-auto space-y-10">

    {/* ===== PAGE HEADER ===== */}
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Applicants
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Manage and allocate applicants
      </p>
    </div>

    {/* ===== SEARCH + ACTION ===== */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div className="relative w-full md:w-96">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full h-12 px-4 rounded-xl
                     bg-gray-50 dark:bg-gray-800
                     border border-gray-200 dark:border-gray-700
                     text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 outline-none transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button
        onClick={() => navigate("/applicants/create")}
        className="h-12 px-6 rounded-xl
                   bg-gradient-to-r from-indigo-600 to-purple-600
                   text-white font-medium
                   hover:opacity-90 transition"
      >
        Add Applicant
      </button>
    </div>

    {search && (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing results for: <span className="font-medium">{search}</span>
      </p>
    )}

    {/* ===== TABLE SECTION ===== */}
    <section
      className="
        bg-gray-50 dark:bg-gray-900/60
        border border-gray-200 dark:border-gray-800
        rounded-2xl
        shadow-sm
        overflow-hidden
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Course</th>
              <th className="p-4 font-medium">Documents</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplicants.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500 dark:text-gray-400">
                  No applicants found
                </td>
              </tr>
            ) : (
              filteredApplicants.map((applicant) => (
                <tr
                  key={applicant._id}
                  className="
                    border-t border-gray-200 dark:border-gray-800
                    hover:bg-gray-100 dark:hover:bg-gray-800/40
                    transition
                  "
                >
                  {/* Name */}
                  <td
                    className="p-4 text-indigo-600 cursor-pointer hover:underline"
                    onClick={() => navigate(`/applicants/${applicant._id}`)}
                  >
                    {applicant.name}
                  </td>

                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {applicant.email}
                  </td>

                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {applicant.category}
                  </td>

                  {/* Documents */}
                  <td className="p-4">
                    <div className="flex flex-col gap-2 text-xs">
                      <span
                        className={`px-3 py-1 rounded-full w-fit font-medium ${
                          applicant.documents?.marksCard === "Verified"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                        }`}
                      >
                        Marks: {applicant.documents?.marksCard || "Pending"}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full w-fit font-medium ${
                          applicant.documents?.idProof === "Verified"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                        }`}
                      >
                        ID: {applicant.documents?.idProof || "Pending"}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        applicant.status === "Allocated"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                          : applicant.status === "Created"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                          : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 space-y-2">

                    {applicant.status !== "Confirmed" && (
                      <div className="flex flex-col gap-2">

                        <select
                          className="h-10 px-3 rounded-lg
                                     bg-gray-50 dark:bg-gray-800
                                     border border-gray-200 dark:border-gray-700
                                     text-sm"
                          value={selectedPrograms[applicant._id] || ""}
                          onChange={async (e) => {
                            const programId = e.target.value;

                            setSelectedPrograms({
                              ...selectedPrograms,
                              [applicant._id]: programId,
                            });

                            if (programId) {
                              const matrix = await getSeatMatrixByProgram(programId);

                              setSeatMatrixMap({
                                ...seatMatrixMap,
                                [programId]: matrix,
                              });
                            }
                          }}
                        >
                          <option value="">Select Program</option>
                          {programs.map((program) => (
                            <option key={program._id} value={program._id}>
                              {program.name}
                            </option>
                          ))}
                        </select>

                        {applicant.status === "Created" &&
                          applicant.documents?.marksCard === "Verified" &&
                          applicant.documents?.idProof === "Verified" && (
                            <button
                              onClick={() => handleAllocate(applicant)}
                              disabled={
                                getRemainingSeats(
                                  selectedPrograms[applicant._id],
                                  applicant.quotaType
                                ) <= 0
                              }
                              className="h-10 px-4 rounded-lg
                                         bg-indigo-600 text-white text-sm
                                         hover:opacity-90 transition
                                         disabled:opacity-50"
                            >
                              {getRemainingSeats(
                                selectedPrograms[applicant._id],
                                applicant.quotaType
                              ) <= 0
                                ? "Quota Full"
                                : "Allocate Seat"}
                            </button>
                          )}

                        {applicant.status === "Created" && (
                          <button
                            onClick={() =>
                              navigate(`/applicants/${applicant._id}/edit`)
                            }
                            className="h-10 px-4 rounded-lg
                                       bg-yellow-500 text-white text-sm
                                       hover:opacity-90 transition"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    )}

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

export default ApplicantsPage;