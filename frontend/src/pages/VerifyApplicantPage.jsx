import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getApplicantById, updateDocuments } from "../api/applicantApi";
import toast from "react-hot-toast";

const VerifyApplicantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [marksCard, setMarksCard] = useState("Pending");
  const [idProof, setIdProof] = useState("Pending");

  useEffect(() => {
    fetchApplicant();
  }, []);

  const fetchApplicant = async () => {
    const data = await getApplicantById(id);
    setMarksCard(data.documents?.marksCard || "Pending");
    setIdProof(data.documents?.idProof || "Pending");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDocuments(id, { marksCard, idProof });
      toast.success("Documents updated successfully");
      navigate("/applicants");
    } catch  {
      toast.error("Failed to update documents");
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-xl font-semibold mb-4">Verify Documents</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <select
          value={marksCard}
          onChange={(e) => setMarksCard(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="Pending">MarksCard - Pending</option>
          <option value="Verified">MarksCard - Verified</option>
        </select>

        <select
          value={idProof}
          onChange={(e) => setIdProof(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="Pending">ID Proof - Pending</option>
          <option value="Verified">ID Proof - Verified</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Update Documents
        </button>
      </form>
    </div>
  );
};

export default VerifyApplicantPage;