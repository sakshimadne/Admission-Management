import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplicantById } from "../api/applicantApi";
import { updateDocuments } from "../api/applicantApi";
const ApplicantDetailsPage = () => {
  const { id } = useParams();

  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const data = await getApplicantById(id);
        setApplicant(data);
      } catch (error) {
        console.error("Error fetching applicant:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicant();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!applicant)
    return <div className="p-6 text-red-600">Applicant not found</div>;
const handleVerify = async (field) => {
  try {
    const updatedDocs = {
      ...applicant.documents,
      [field]: "Verified",
    };

    await updateDocuments(id, updatedDocs);

    // refresh applicant
    const refreshed = await getApplicantById(id);
    setApplicant(refreshed);

  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Applicant Details
      </h1>

      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <p><strong>Name:</strong> {applicant.name}</p>
        <p><strong>Email:</strong> {applicant.email}</p>
        <p><strong>Phone:</strong> {applicant.phone}</p>
        <p><strong>Category:</strong> {applicant.category}</p>
        <p><strong>Quota:</strong> {applicant.quotaType}</p>
        <p><strong>Marks:</strong> {applicant.marks}</p>
        <p><strong>Status:</strong> {applicant.status}</p>
      </div>
      <div className="bg-white shadow rounded-xl p-6 mt-6">
  <h2 className="text-lg font-semibold mb-4">Documents</h2>

  {/* Marks Card */}
  <div className="flex justify-between items-center mb-3">
    <span>Marks Card</span>
    <div className="flex items-center gap-3">
      <span
        className={`px-3 py-1 rounded-full text-xs ${
          applicant.documents.marksCard === "Verified"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {applicant.documents.marksCard}
      </span>

      {applicant.documents.marksCard !== "Verified" && (
        <button
          onClick={() => handleVerify("marksCard")}
          className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
        >
          Verify
        </button>
      )}
    </div>
  </div>

  {/* ID Proof */}
  <div className="flex justify-between items-center">
    <span>ID Proof</span>
    <div className="flex items-center gap-3">
      <span
        className={`px-3 py-1 rounded-full text-xs ${
          applicant.documents.idProof === "Verified"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {applicant.documents.idProof}
      </span>

      {applicant.documents.idProof !== "Verified" && (
        <button
          onClick={() => handleVerify("idProof")}
          className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
        >
          Verify
        </button>
      )}
    </div>
  </div>
</div>
    </div>
  );
};

export default ApplicantDetailsPage;