// src/api/seatMatrixApi.js
import API from "./axios";

export const createSeatMatrix = async (data) => {
  const response = await API.post("/seat-matrix", data);
  return response.data;
};

export const getSeatMatrixByProgram = async (programId) => {
  const response = await API.get(`/seat-matrix/${programId}`);
  return response.data;
};





