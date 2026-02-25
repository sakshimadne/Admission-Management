import API from "./axios";

// Get all departments
export const getDepartments = async () => {
  const response = await API.get("/departments");
  return response.data;
};

// Get departments by campus
export const getDepartmentsByCampus = async (campusId) => {
  const response = await API.get(`/departments/campus/${campusId}`);
  return response.data;
};

// Create department (Admin only)
export const createDepartment = async (data) => {
  const response = await API.post("/departments", data);
  return response.data;
};