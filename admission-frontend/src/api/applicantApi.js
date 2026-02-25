import API from "./axios";

export const getApplicants = async () => {
  const response = await API.get("/applicants");
  return response.data;
};

export const getApplicantById = async (id) => {
  const response = await API.get(`/applicants/${id}`);
  return response.data;
};


export const updateDocuments = async (id, data) => {
  const response = await API.put(
    `/applicants/${id}/documents`,
    data
  );
  return response.data;
};

export const getAdmissions = async () => {
  const response = await API.get("/admissions");
  return response.data;
};

export const updateFeeStatus = async (id, feeStatus) => {
  const response = await API.put(`/admissions/${id}/fee`, {
    feeStatus,
  });
  return response.data;
};

export const confirmAdmission = async (id) => {
  const response = await API.put(`/admissions/${id}/confirm`);
  return response.data;
};
export const allocateSeat = async (data) => {
  const response = await API.post("/admissions/allocate", data);
  return response.data;
};

export const updateApplicant = async (id, data) => {
  const response = await API.put(`/applicants/${id}`, data);
  return response.data;
};

export const createApplicant = async (data) => {
  const response = await API.post("/applicants", data);
  return response.data;
};