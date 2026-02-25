import { useEffect, useState } from "react";
import { getApplicants } from "../api/applicantApi";
import { allocateSeat } from "../api/admissionApi";
import { useNavigate } from "react-router-dom";
import { getPrograms } from "../api/programApi";
import toast from "react-hot-toast";
const ApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [programs, setPrograms] = useState([]);
const [selectedPrograms, setSelectedPrograms] = useState({});
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
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Applicants</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 px-4 py-2 border rounded-lg w-80"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
<button
  onClick={() => navigate("/applicants/create")}
  className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
>
  Add Applicant
</button>
      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Course</th>
               <th className="p-4">Documents</th> 
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplicants.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No applicants found
                </td>
              </tr>
            ) : (
              filteredApplicants.map((applicant) => (
                <tr
                  key={applicant._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* <td className="p-4">{applicant.name}</td> */}
                  <td
  className="p-4 text-indigo-600 cursor-pointer hover:underline"
  onClick={() => navigate(`/applicants/${applicant._id}`)}
>
  {applicant.name}
</td>
                  <td className="p-4">{applicant.email}</td>

            <td className="p-4">{applicant.category}</td>
            <td className="p-4">
  <div className="flex flex-col gap-1 text-xs">
    <span
      className={`px-2 py-1 rounded-full w-fit ${
        applicant.documents?.marksCard === "Verified"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      Marks: {applicant.documents?.marksCard || "Pending"}
    </span>

    <span
      className={`px-2 py-1 rounded-full w-fit ${
        applicant.documents?.idProof === "Verified"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      ID: {applicant.documents?.idProof || "Pending"}
    </span>
  </div>
</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                       applicant.status === "Allocated"
  ? "bg-green-100 text-green-700"
  : applicant.status === "Created"
  ? "bg-yellow-100 text-yellow-700"
  : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </td>
<td className="p-4 space-x-2">

  {applicant.status !== "Confirmed" && (
    <>
    

      {/* Program Dropdown */}
      <select
        className="px-2 py-1 border rounded text-sm"
        value={selectedPrograms[applicant._id] || ""}
        onChange={(e) =>
          setSelectedPrograms({
            ...selectedPrograms,
            [applicant._id]: e.target.value,
          })
        }
      >
        <option value="">Select Program</option>
        {programs.map((program) => (
          <option key={program._id} value={program._id}>
            {program.name}
          </option>
        ))}
      </select>


      {/* Allocate Button */}
      {applicant.status === "Created" &&
        applicant.documents?.marksCard === "Verified" &&
        applicant.documents?.idProof === "Verified" && (
          <button
            onClick={() => handleAllocate(applicant)}
            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
          >
            Allocate Seat
          </button>
      )}
        {/* Edit Button */}
      {applicant.status === "Created" && (
        <button
          onClick={() => navigate(`/applicants/${applicant._id}/edit`)}
          className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
        >
          Edit
        </button>
      )}
    </>
  )}

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

export default ApplicantsPage;