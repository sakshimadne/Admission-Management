import { useEffect, useState } from "react";
import { getPrograms } from "../api/programApi";
import {
  createSeatMatrix,
  getSeatMatrixByProgram,
} from "../api/seatMatrixApi";
import toast from "react-hot-toast";
const SeatMatrixPage = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [seatMatrix, setSeatMatrix] = useState(null);

  const [kcet, setKcet] = useState("");
  const [comedk, setComedk] = useState("");
  const [management, setManagement] = useState("");

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const data = await getPrograms();
      setPrograms(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProgramChange = async (programId) => {
    setSelectedProgram(programId);
    if (!programId) return;

    try {
      const data = await getSeatMatrixByProgram(programId);
      setSeatMatrix(data);

      if (data?.quotas) {
        setKcet(data.quotas.KCET?.total || "");
        setComedk(data.quotas.COMEDK?.total || "");
        setManagement(data.quotas.Management?.total || "");
      }
    } catch  {
      setSeatMatrix(null);
      setKcet("");
      setComedk("");
      setManagement("");
      
    }
  };

 const handleSubmit = async () => {
  if (!selectedProgram) {
    toast.error("Please select a program");
    return;
  }

  const total =
    Number(kcet || 0) +
    Number(comedk || 0) +
    Number(management || 0);

  const selected = programs.find(p => p._id === selectedProgram);

  if (total !== selected.intake) {
    toast.error(
      `Quota total (${total}) must equal program intake (${selected.intake})`
    );
    return;
  }

  try {
    await createSeatMatrix({
      programId: selectedProgram,
      KCET: Number(kcet),
      COMEDK: Number(comedk),
      Management: Number(management),
    });

    toast.success("Seat matrix created successfully");
    handleProgramChange(selectedProgram);
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to save seat matrix";
    toast.error(message);
  }
};

  return (
  <div className="max-w-7xl mx-auto space-y-10">

    {/* ===== PAGE HEADER ===== */}
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Seat Matrix
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Configure seat allocation for each program
      </p>
    </div>

    {/* ===== FORM SECTION ===== */}
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

      {/* Program Dropdown */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Select Program
        </label>
        <select
          value={selectedProgram}
          onChange={(e) => handleProgramChange(e.target.value)}
          className="
            w-96 h-12 px-4 rounded-xl
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-gray-800 dark:text-white
            focus:ring-2 focus:ring-indigo-500
            outline-none transition
          "
        >
          <option value="">Select Program</option>
          {programs.map((program) => (
            <option key={program._id} value={program._id}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      {/* Seat Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <input
          type="number"
          placeholder="KCET Seats"
          value={kcet}
          onChange={(e) => setKcet(e.target.value)}
          className="seat-input"
        />

        <input
          type="number"
          placeholder="COMEDK Seats"
          value={comedk}
          onChange={(e) => setComedk(e.target.value)}
          className="seat-input"
        />

        <input
          type="number"
          placeholder="Management Seats"
          value={management}
          onChange={(e) => setManagement(e.target.value)}
          className="seat-input"
        />

      </div>

      <button
        onClick={handleSubmit}
        className="
          h-12 px-8 rounded-xl
          bg-gradient-to-r from-indigo-600 to-purple-600
          hover:opacity-90
          text-white font-medium
          transition
        "
      >
        Save Seat Matrix
      </button>

    </section>

    {/* ===== DISPLAY MATRIX SECTION ===== */}
    {seatMatrix && (
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
            Seat Allocation Overview
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
              <tr>
                <th className="p-4 font-medium">Quota</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Filled</th>
                <th className="p-4 font-medium">Remaining</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(seatMatrix.quotas).map(([quota, data]) => (
                <tr
                  key={quota}
                  className="
                    border-t border-gray-100 dark:border-gray-800
                    hover:bg-gray-50 dark:hover:bg-gray-800/50
                    transition
                  "
                >
                  <td className="p-4 text-gray-800 dark:text-gray-200 font-medium">
                    {quota}
                  </td>

                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {data.total}
                  </td>

                  <td className="p-4 text-green-600 font-medium">
                    {data.filled}
                  </td>

                  <td className="p-4 text-indigo-600 font-medium">
                    {data.total - data.filled}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )}

  </div>
);
};

export default SeatMatrixPage;