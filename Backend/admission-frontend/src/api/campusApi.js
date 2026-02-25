import API from "./axios";

// Get all campuses
export const getCampuses = async () => {
  const response = await API.get("/campuses");
  return response.data;
};

// Get campus by ID
export const getCampusById = async (id) => {
  const response = await API.get(`/campuses/${id}`);
  return response.data;
};

// Get campuses by institution
export const getCampusesByInstitution = async (institutionId) => {
  const response = await API.get(
    `/campuses/institution/${institutionId}`
  );
  return response.data;
};

// Create campus (Admin only)
export const createCampus = async (data) => {
  const response = await API.post("/campuses", data);
  return response.data;
};