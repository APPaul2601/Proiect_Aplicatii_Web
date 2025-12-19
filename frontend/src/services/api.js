import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// set token pentru request-uri protejate
export const setToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    API_PLAYER.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
    delete API_PLAYER.defaults.headers.common["Authorization"];
  }
};

// export { API_PLAYER }; // Removed: not defined
export default API;
