import API from "./axios";

export const getInstitutions = async () => {
  const response = await API.get("/institutions");
  return response.data;
};

export const createInstitution = async (data) => {
  const response = await API.post("/institutions", data);
  return response.data;
};