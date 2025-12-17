import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getPlayerData = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_BASE}/castle`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const clickCastle = async () => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${API_BASE}/castle/click`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default {
  getPlayerData,
  clickCastle,
};