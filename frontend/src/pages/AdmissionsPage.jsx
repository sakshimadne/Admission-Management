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
  <div className="max-w-7xl mx-auto space-y-10">

    {/* ===== PAGE HEADER ===== */}
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Admissions
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Manage fee payments and confirmations
      </p>
    </div>

    {/* ===== FILTER BUTTONS ===== */}
    <div className="flex flex-wrap gap-3">

      {[
        { label: "All", value: "ALL" },
        { label: "Pending Fees", value: "PENDING" },
        { label: "Paid", value: "PAID" },
        { label: "Confirmed", value: "CONFIRMED" },
      ].map((btn) => (
        <button
          key={btn.value}
          onClick={() => setFilter(btn.value)}
          className={`
            h-11 px-5 rounded-xl text-sm font-medium transition
            ${
              filter === btn.value
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }
          `}
        >
          {btn.label}
        </button>
      ))}
    </div>

    {/* ===== TABLE CARD ===== */}
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
              <th className="p-4 font-medium">Admission No</th>
              <th className="p-4 font-medium">Applicant</th>
              <th className="p-4 font-medium">Program</th>
              <th className="p-4 font-medium">Quota</th>
              <th className="p-4 font-medium">Fee Status</th>
              <th className="p-4 font-medium">Confirmed</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAdmissions.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500 dark:text-gray-400">
                  No admissions found.
                </td>
              </tr>
            ) : (
              filteredAdmissions.map((admission) => (
                <tr
                  key={admission._id}
                  className="
                    border-t border-gray-200 dark:border-gray-800
                    hover:bg-gray-100 dark:hover:bg-gray-800/40
                    transition
                  "
                >

                  {/* Admission Number */}
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {admission.confirmed && admission.admissionNumber ? (
                      admission.admissionNumber
                    ) : (
                      <span className="text-gray-500 italic">
                        After Confirmation
                      </span>
                    )}
                  </td>

                  {/* Applicant */}
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {admission.applicantId?.name}
                  </td>

                  {/* Program */}
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {admission.programId?.name}
                  </td>

                  {/* Quota */}
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {admission.quotaType}
                  </td>

                  {/* Fee Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        admission.feeStatus === "Paid"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                      }`}
                    >
                      {admission.feeStatus}
                    </span>
                  </td>

                  {/* Confirmed */}
                  <td className="p-4">
                    {admission.confirmed ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        Confirmed
                      </span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                        Not Confirmed
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4 space-y-2">

                    {admission.feeStatus !== "Paid" && (
                      <button
                        onClick={() => handleFeeUpdate(admission._id)}
                        disabled={loadingId === admission._id}
                        className="
                          h-10 px-4 rounded-lg
                          bg-indigo-600 text-white text-sm
                          hover:opacity-90 transition
                          disabled:opacity-50
                        "
                      >
                        {loadingId === admission._id
                          ? "Processing..."
                          : "Mark Paid"}
                      </button>
                    )}

                    {!admission.confirmed &&
                      admission.feeStatus === "Paid" && (
                        <button
                          onClick={() => handleConfirm(admission)}
                          disabled={loadingId === admission._id}
                          className="
                            h-10 px-4 rounded-lg
                            bg-green-600 text-white text-sm
                            hover:opacity-90 transition
                            disabled:opacity-50
                          "
                        >
                          {loadingId === admission._id
                            ? "Processing..."
                            : "Confirm"}
                        </button>
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

export default AdmissionsPage;