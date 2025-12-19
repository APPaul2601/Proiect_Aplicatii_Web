import axios from "axios";

const API_BASE = "http://localhost:5000/api";

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
