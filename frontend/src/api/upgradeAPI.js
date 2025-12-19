import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * @returns {Promise<Array>} 
 */
export const getAllUpgrades = async () => {
  try {
    const res = await axios.get(`${API_URL}/upgrades`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error fetching upgrades");
  }
};

/**
 * @param {string} upgradeType 
 * @returns {Promise<Object>} 
 */

/**
 * @param {string} upgradeType 
 * @returns {Promise<Object>} 
 */
export const buyUpgrade = async (upgradeType) => {
  try {
    const headers = { "Content-Type": "application/json", ...getAuthHeader() };
    const res = await axios.post(`${API_URL}/upgrades/buy`, { upgradeType }, { headers });
    if (res.data && res.data.data && res.data.data.progress) return res.data.data.progress;
    if (res.data && res.data.progress) return res.data.progress;
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error buying upgrade");
  }
};


export default { getAllUpgrades, buyUpgrade };
