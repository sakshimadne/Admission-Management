import { useEffect, useState } from "react";
import { getPrograms, createProgram } from "../api/programApi";
import { getDepartments } from "../api/departmentApi";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [intake, setIntake] = useState("");
  const [departmentId, setDepartmentId] = useState("");
const [courseType, setCourseType] = useState("");
const [entryType, setEntryType] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const deptData = await getDepartments();
      const programData = await getPrograms();

      setDepartments(deptData);
      setPrograms(programData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!departmentId) {
      alert("Select department first");
      return;
    }

    try {
     await createProgram({
  name,
  code,
  departmentId,
  academicYear: Number(academicYear),
  courseType,
  entryType,
  intake: Number(intake),
});

      setName("");
      setCode("");
      setAcademicYear("");
      setIntake("");
      setDepartmentId("");

      fetchData();
    } catch (error) {
      console.error(error);
      alert("Program creation failed");
    }
  };

  const getDepartmentName = (id) => {
    const dept = departments.find((d) => d._id === id);
    return dept ? dept.name : "Unknown";
  };

  if (loading) return <div className="p-6">Loading programs...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Programs</h1>

      {/* Create Program */}
      <form onSubmit={handleCreate} className="grid grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="Program Name"
          className="border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Code"
          className="border px-3 py-2 rounded"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Academic Year"
          className="border px-3 py-2 rounded"
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          required
        />
<select
  className="border px-3 py-2 rounded"
  value={courseType}
  onChange={(e) => setCourseType(e.target.value)}
  required
>
  <option value="">Select Course Type</option>
  <option value="UG">UG</option>
  <option value="PG">PG</option>
</select>

<select
  className="border px-3 py-2 rounded"
  value={entryType}
  onChange={(e) => setEntryType(e.target.value)}
  required
>
  <option value="">Select Entry Type</option>
  <option value="Regular">Regular</option>
  <option value="Lateral">Lateral</option>
</select>
        <input
          type="number"
          placeholder="Intake"
          className="border px-3 py-2 rounded"
          value={intake}
          onChange={(e) => setIntake(e.target.value)}
          required
        />

        <select
          className="border px-3 py-2 rounded"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>

        <button className="col-span-5 bg-indigo-600 text-white px-4 py-2 rounded">
          Create Program
        </button>
      </form>

      {/* Programs Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4">Program</th>
              <th className="p-4">Code</th>
              <th className="p-4">Department</th>
              <th className="p-4">Year</th>
              <th className="p-4">Intake</th>
            </tr>
          </thead>

          <tbody>
            {programs.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No programs found
                </td>
              </tr>
            ) : (
              programs.map((program) => (
                <tr key={program._id} className="border-t">
                  <td className="p-4">{program.name}</td>
                  <td className="p-4">{program.code}</td>
                  <td className="p-4">
                    {getDepartmentName(program.departmentId)}
                  </td>
                  <td className="p-4">{program.academicYear}</td>
                  <td className="p-4">{program.intake}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramsPage;