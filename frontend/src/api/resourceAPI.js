import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const collectResource = async (buildingType) => {
  const token = localStorage.getItem("token");

  console.log("🌐 collectResource called with:", buildingType);  
  console.log("🔑 Token:", token ? "EXISTS" : "MISSING");  
  return axios.post(
    `${API_BASE}/resources/collect`,
    { buildingType },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default {
  collectResource,
};