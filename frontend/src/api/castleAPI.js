import axios from "axios";


// Castle API - Handles all API calls related to castle progress system
//
// updateCastleProgress(amount):
//   - Sends a POST to /api/castle/progress with the JSON body { amount }
//   - Includes the Authorization: Bearer <token> header from localStorage
//   - Sets Content-Type: application/json
//   - Returns the backend progress object and milestone info on success
//   - Surfaces backend error messages
const API_BASE = "http://localhost:5000/api";
//
// Usage Example:
// import { updateCastleProgress } from "../api/castleAPI";
// await updateCastleProgress(10); // Increments progress by 10

/**
 * Update castle progress for the current user
 * @param {number} amount - Amount to increment castle progress by
 * @returns {Promise<Object>} updated progress object from backend
 */
/**
 * Update castle progress for the current user
 * @param {number} amount - Amount to increment castle progress by
 * @returns {Promise<Object>} updated progress object from backend
 */
export const updateCastleProgress = async (amount) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${API_BASE}/castle/progress`,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export default {
  updateCastleProgress,
};
