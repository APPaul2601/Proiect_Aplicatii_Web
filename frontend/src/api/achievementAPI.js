// frontend/src/api/achievementAPI.js
import api from "../services/api";

export async function getAllAchievements() {
  const res = await api.get("/achievements");
  return res.data;
}

export async function checkAndUnlockAchievements(payload) {
  const res = await api.post("/achievements/check", payload);
  return res.data;
}
