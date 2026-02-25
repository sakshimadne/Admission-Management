import { useEffect, useState } from "react";
import {
  getAdmissions,
  updateFeeStatus,
  confirmAdmission,
} from "../api/admissionApi";
import { updateApplicant } from "../api/applicantApi";

const AdmissionsPage = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
const [loadingId, setLoadingId] = useState(null);
const [filter, setFilter] = useState("ALL");
  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const data = await getAdmissions();
      console.log("Admissions Data:", data);
      setAdmissions(data);
    } catch (error) {
      console.error("Error fetching admissions:", error);
    } finally {
      setLoading(false);
    }
  };

const handleFeeUpdate = async (id) => {
  try {
    setLoadingId(id);
    await updateFeeStatus(id, "Paid");
    await fetchAdmissions();
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingId(null);
  }
};

const handleConfirm = async (admission) => {
  try {
    setLoadingId(admission._id);


    await confirmAdmission(admission._id);


    await updateApplicant(admission.applicantId._id, {
      status: "Confirmed",
    });

    await fetchAdmissions();

  } catch (error) {
    console.error(error);
  } finally {
    setLoadingId(null);
  }
};

  if (loading) return <div className="p-6">Loading admissions...</div>;
const filteredAdmissions = admissions.filter((admission) => {
  if (filter === "ALL") return true;

  if (filter === "PENDING")
    return admission.feeStatus !== "Paid";

  if (filter === "PAID")
    return admission.feeStatus === "Paid";

  if (filter === "CONFIRMED")
    return admission.confirmed === true;

  return true;
});
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Admissions</h1>
<div className="flex gap-4 mb-6">
  <button
    onClick={() => setFilter("ALL")}
    className="px-4 py-2 bg-gray-200 rounded"
  >
    All
  </button>

  <button
    onClick={() => setFilter("PENDING")}
    className="px-4 py-2 bg-yellow-200 rounded"
  >
    Pending Fees
  </button>

  <button
    onClick={() => setFilter("PAID")}
    className="px-4 py-2 bg-blue-200 rounded"
  >
    Paid
  </button>

  <button
    onClick={() => setFilter("CONFIRMED")}
    className="px-4 py-2 bg-green-200 rounded"
  >
    Confirmed
  </button>
</div>
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
                <th className="p-4">Admission No</th>
              <th className="p-4">Applicant</th>
              <th className="p-4">Program</th>
              <th className="p-4">Quota</th>
              <th className="p-4">Fee Status</th>
              <th className="p-4">Confirmed</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

         <tbody>
  
  {filteredAdmissions.length === 0 ? (
  <tr>
    <td colSpan="7" className="text-center p-6 text-gray-500">
      No admissions found.
    </td>
  </tr>
) : 
  
  (filteredAdmissions.map((admission) => (
    <tr key={admission._id} className="border-t">

      {/* <td className="p-4">{admission.admissionNumber}</td> */}
      <td className="p-4">
{admission.confirmed && admission.admissionNumber ? (
  admission.admissionNumber
) : (
  <span className="text-gray-500 italic">
    After Confirmation
  </span>
)}
</td>

      <td className="p-4">
        {admission.applicantId?.name}
      </td>

      <td className="p-4">
        {admission.programId?.name}
      </td>

      <td className="p-4">
        {admission.quotaType}
      </td>

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            admission.feeStatus === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {admission.feeStatus}
        </span>
      </td>

   
      <td className="p-4">
  {admission.confirmed ? (
    <span className="text-green-600 font-medium">
      Confirmed
    </span>
  ) : (
    <span className="text-yellow-600 font-medium">
      Not Confirmed
    </span>
  )}
</td>

      <td className="p-4 space-x-2">

       {admission.feeStatus !== "Paid" && (
  <button
    onClick={() => handleFeeUpdate(admission._id)}
    disabled={loadingId === admission._id}
    className="px-3 py-1 bg-indigo-600 text-white rounded text-sm disabled:opacity-50"
  >
    {loadingId === admission._id ? "Processing..." : "Mark Paid"}
  </button>
)}

        {!admission.confirmed && admission.feeStatus === "Paid" && (
  <button
    onClick={() => handleConfirm(admission)}
    disabled={loadingId === admission._id}
    className="px-3 py-1 bg-green-600 text-white rounded text-sm disabled:opacity-50"
  >
    {loadingId === admission._id ? "Processing..." : "Confirm"}
  </button>
)}

      </td>
    </tr>
  )))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmissionsPage;