import API from "./axios";

// Get all programs
export const getPrograms = async () => {
  const response = await API.get("/programs");
  return response.data;
};

// Get programs by department
export const getProgramsByDepartment = async (departmentId) => {
  const response = await API.get(
    `/programs/department/${departmentId}`
  );
  return response.data;
};

// Create program (Admin only)
export const createProgram = async (data) => {
  const response = await API.post("/programs", data);
  return response.data;
};