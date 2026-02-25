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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Seat Matrix</h1>

      {/* Program Dropdown */}
      <select
        value={selectedProgram}
        onChange={(e) => handleProgramChange(e.target.value)}
        className="mb-6 px-4 py-2 border rounded-lg w-80"
      >
        <option value="">Select Program</option>
        {programs.map((program) => (
          <option key={program._id} value={program._id}>
            {program.name}
          </option>
        ))}
      </select>

      {/* Inputs */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <input
          type="number"
          placeholder="KCET Seats"
          value={kcet}
          onChange={(e) => setKcet(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />

        <input
          type="number"
          placeholder="COMEDK Seats"
          value={comedk}
          onChange={(e) => setComedk(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />

        <input
          type="number"
          placeholder="Management Seats"
          value={management}
          onChange={(e) => setManagement(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Save Seat Matrix
      </button>

      {/* Display Matrix */}
      {seatMatrix && (
        <div className="mt-10 bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm text-gray-600">
              <tr>
                <th className="p-4">Quota</th>
                <th className="p-4">Total</th>
                <th className="p-4">Filled</th>
                <th className="p-4">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(seatMatrix.quotas).map(([quota, data]) => (
                <tr key={quota} className="border-t">
                  <td className="p-4">{quota}</td>
                  <td className="p-4">{data.total}</td>
                  <td className="p-4">{data.filled}</td>
                  <td className="p-4">
                    {data.total - data.filled}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SeatMatrixPage;