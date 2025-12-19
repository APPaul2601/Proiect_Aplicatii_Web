import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/**
@param {number} amount 
@returns {Promise<Object>} 
/**
 
 * @param {number} amount 
 * @returns {Promise<Object>} 
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
