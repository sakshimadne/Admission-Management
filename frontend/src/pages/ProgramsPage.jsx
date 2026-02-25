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

  // const getDepartmentName = (id) => {
  //   const dept = departments.find((d) => d._id === id);
  //   return dept ? dept.name : "Unknown";
  // };

  if (loading) return <div className="p-6">Loading programs...</div>;

  return (
  <div className="max-w-7xl mx-auto space-y-10">


    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Programs
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Manage academic programs under departments
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
        Create Program
      </h2>

      <form
        onSubmit={handleCreate}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
     
       <div>


  {/* <select
    className="input-field"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  >
    <option value="">Select Program</option>

    {programs.map((program) => (
      <option key={program._id} value={program.name}>
        {program.name}
      </option>
    ))}
  </select> */}
  <input
  type="text"
  placeholder="Program Name"
  className="input-field"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
/>
</div>

 
        <input
          type="text"
          placeholder="Code"
          className="input-field"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />


        <input
          type="number"
          placeholder="Academic Year"
          className="input-field"
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          required
        />

  
        <select
          className="input-field"
          value={courseType}
          onChange={(e) => setCourseType(e.target.value)}
          required
        >
          <option value="">Select Course Type</option>
          <option value="UG">UG</option>
          <option value="PG">PG</option>
        </select>

        <select
          className="input-field"
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
          className="input-field"
          value={intake}
          onChange={(e) => setIntake(e.target.value)}
          required
        />

        <select
          className="input-field lg:col-span-2"
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

 
        <div className="lg:col-span-3">
          <button
            className="
              w-full h-11 rounded-xl
              bg-gradient-to-r from-indigo-600 to-purple-600
              hover:opacity-90
              text-white font-medium
              transition
            "
          >
            Create Program
          </button>
        </div>
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
          Program List
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-4 font-medium">Program</th>
              <th className="p-4 font-medium">Code</th>
              <th className="p-4 font-medium">Department</th>
              <th className="p-4 font-medium">Year</th>
              <th className="p-4 font-medium">Intake</th>
            </tr>
          </thead>

          <tbody>
            {programs.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No programs found
                </td>
              </tr>
            ) : (
              programs.map((program) => (
                <tr
                  key={program._id}
                  className="
                    border-t border-gray-100 dark:border-gray-800
                    hover:bg-gray-50 dark:hover:bg-gray-800/50
                    transition
                  "
                >
                  <td className="p-4 text-gray-800 dark:text-gray-200">
                    {program.name}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {program.code}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                 
                    {program.departmentId?.name || "Unknown"}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {program.academicYear}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {program.intake}
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

export default ProgramsPage;