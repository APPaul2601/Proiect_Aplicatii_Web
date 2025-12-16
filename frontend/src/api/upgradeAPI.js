// Upgrade API - Handles all API calls for upgrades catalog and purchases
// Functions: getAllUpgrades (fetch available upgrades), buyUpgrade (purchase upgrade)
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllUpgrades = async () => {
  try {
    const res = await axios.get(`${API_URL}/upgrades`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error fetching upgrades");
  }
};

export const buyUpgrade = async (upgradeType) => {
  try {
    const res = await axios.post(
      `${API_URL}/upgrades/buy`,
      { upgradeType },
      { headers: getAuthHeader() }
    );
    return res.data.progress;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error buying upgrade");
  }
};
