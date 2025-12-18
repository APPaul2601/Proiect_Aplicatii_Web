// ============================================
// VALIDATORS - Input Validation Functions
// ============================================
// Centralized validation logic
// Reusable across controllers

const { ERROR_MESSAGES } = require("./constants");

// ===== VALIDATE USERNAME =====
// Check username format and length
const validateUsername = (username) => {
  if (!username || typeof username !== "string") {
    return { valid: false, error: ERROR_MESSAGES.INVALID_USERNAME };
  }
  if (username.length < 3 || username.length > 20) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_USERNAME };
  }
  return { valid: true };
};

// ===== VALIDATE PASSWORD =====
// Check password length
const validatePassword = (password) => {
  if (!password || typeof password !== "string") {
    return { valid: false, error: ERROR_MESSAGES.INVALID_PASSWORD };
  }
  if (password.length < 6) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_PASSWORD };
  }
  return { valid: true };
};

// ===== VALIDATE CLICKS =====
// Check if clicks is a positive number
const validateClicks = (clicks) => {
  if (typeof clicks !== "number" || clicks < 1) {
    return { valid: false, error: "Clicks must be a positive number" };
  }
  return { valid: true };
};

// ===== VALIDATE RESOURCE AMOUNT =====
// Check if amount is valid for resource collection
const validateResourceAmount = (amount) => {
  if (typeof amount !== "number" || amount < 1) {
    return { valid: false, error: "Amount must be a positive number" };
  }
  return { valid: true };
};

// ===== VALIDATE UPGRADE TYPE =====
// Check if upgrade type is provided
const validateUpgradeType = (upgradeType) => {
  if (!upgradeType || typeof upgradeType !== "string") {
    return { valid: false, error: "Upgrade type must be a string" };
  }
  return { valid: true };
};

// ===== VALIDATE BUILDING TYPE =====
// Check if building type is provided
const validateBuildingType = (buildingType) => {
  if (!buildingType || typeof buildingType !== "string") {
    return { valid: false, error: "Building type must be a string" };
  }
  return { valid: true };
};

module.exports = {
  validateUsername,
  validatePassword,
  validateClicks,
  validateResourceAmount,
  validateUpgradeType,
  validateBuildingType,
};
