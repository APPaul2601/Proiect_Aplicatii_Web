import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Registration failed");
  }
};

export const loginUser = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Login failed");
  }
};
