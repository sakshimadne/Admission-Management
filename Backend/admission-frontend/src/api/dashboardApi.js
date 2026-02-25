import API from "./axios";

export const fetchDashboardSummary = async (token) => {
  const response = await API.get("/dashboard/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const fetchSeatAvailability = async (token) => {
  const response = await API.get("/dashboard/seats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};