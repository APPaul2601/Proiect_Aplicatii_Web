// Upgrade API - Handles all API calls for upgrades catalog and purchases
//
// Step 1: Implement buyUpgrade API integration
// --------------------------------------------
// - buyUpgrade() sends a POST to /api/upgrades/buy with the JSON body { upgradeType }
// - Includes the Authorization: Bearer <token> header from localStorage
// - Sets Content-Type: application/json
// - Returns the backend progress object on success
// - Surfaces backend error messages
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Fetch all available upgrades from the backend
 * @returns {Promise<Array>} upgrades
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
 * Step 1: Buy an upgrade on behalf of the current user
 * Sends POST to /api/upgrades/buy with { upgradeType } in body
 * Includes Authorization and Content-Type headers
 * Returns updated progress object from backend
 * Surfaces backend error messages
 * @param {string} upgradeType - upgrade id or key
 * @returns {Promise<Object>} updated progress object from backend
 */
export const buyUpgrade = async (upgradeType) => {
  try {
    const headers = { "Content-Type": "application/json", ...getAuthHeader() };
    const res = await axios.post(`${API_URL}/upgrades/buy`, { upgradeType }, { headers });
    return res.data.progress;
  } catch (err) {
    // Surface backend error message if available
    throw new Error(err.response?.data?.error || "Error buying upgrade");
  }
};
<<<<<<< HEAD
// Upgrade API - Handles all API calls for upgrades catalog and purchases
// Functions: getAllUpgrades (fetch available upgrades), buyUpgrade (purchase upgrade)

//
// Step 1 implemented: `buyUpgrade()` sends a POST to `/api/upgrades/buy` with
// the JSON body `{ upgradeType }`, includes the `Authorization: Bearer <token>`
// header from localStorage, and returns the backend `progress` object on success.
// It also sets `Content-Type: application/json` and surfaces backend error messages.

/**
 * Fetch all available upgrades
 * @returns {Promise<Array>} upgrades
 */

/**
 * Buy an upgrade on behalf of the current user
 * @param {string} upgradeType - upgrade id or key
 * @returns {Promise<Object>} updated progress object from backend
 */
export const buyUpgrade = async (upgradeType) => {
  try {
    const headers = { "Content-Type": "application/json", ...getAuthHeader() };
    const res = await axios.post(`${API_URL}/upgrades/buy`, { upgradeType }, { headers });
    return res.data.progress;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error buying upgrade");
  }
};

// Default export for convenience
export default { getAllUpgrades, buyUpgrade };
=======
>>>>>>> develop
