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

/**
 * Buy an upgrade on behalf of the current user
 * @param {string} upgradeType - upgrade id or key
 * @returns {Promise<Object>} updated progress object from backend
 */
export const buyUpgrade = async (upgradeType) => {
  try {
    const headers = { "Content-Type": "application/json", ...getAuthHeader() };
    const res = await axios.post(`${API_URL}/upgrades/buy`, { upgradeType }, { headers });
    // backend wraps success responses with { success, message, data }
    // prefer res.data.data.progress when present
    if (res.data && res.data.data && res.data.data.progress) return res.data.data.progress;
    if (res.data && res.data.progress) return res.data.progress;
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error buying upgrade");
  }
};

// Default export for convenience
export default { getAllUpgrades, buyUpgrade };
