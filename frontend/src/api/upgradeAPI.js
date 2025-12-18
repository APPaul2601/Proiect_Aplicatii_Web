// Functions: getAllUpgrades (fetch available upgrades), buyUpgrade (purchase upgrade)
<<<<<<< HEAD
//
// Step 1 implemented: `buyUpgrade()` sends a POST to `/api/upgrades/buy` with
// the JSON body `{ upgradeType }`, includes the `Authorization: Bearer <token>`
// header from localStorage, and returns the backend `progress` object on success.
// It also sets `Content-Type: application/json` and surfaces backend error messages.
=======
>>>>>>> develop
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

<<<<<<< HEAD
/**
 * Fetch all available upgrades
 * @returns {Promise<Array>} upgrades
 */
=======
>>>>>>> develop
export const getAllUpgrades = async () => {
  try {
    const res = await axios.get(`${API_URL}/upgrades`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error fetching upgrades");
  }
};

<<<<<<< HEAD
/**
 * Buy an upgrade on behalf of the current user
 * @param {string} upgradeType - upgrade id or key
 * @returns {Promise<Object>} updated progress object from backend
 */
export const buyUpgrade = async (upgradeType) => {
  try {
    const headers = { "Content-Type": "application/json", ...getAuthHeader() };
    const res = await axios.post(`${API_URL}/upgrades/buy`, { upgradeType }, { headers });
=======
export const buyUpgrade = async (upgradeType) => {
  try {
    const res = await axios.post(
      `${API_URL}/upgrades/buy`,
      { upgradeType },
      { headers: getAuthHeader() }
    );
>>>>>>> develop
    return res.data.progress;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error buying upgrade");
  }
};
<<<<<<< HEAD

// Default export for convenience
export default { getAllUpgrades, buyUpgrade };
=======
>>>>>>> develop
