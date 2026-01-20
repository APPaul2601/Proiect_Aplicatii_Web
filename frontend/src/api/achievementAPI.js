import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const getPlayerAchievements = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_BASE}/achievements`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getPlayerAchievements,
};
