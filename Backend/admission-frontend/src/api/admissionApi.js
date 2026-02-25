import API from "./axios";

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