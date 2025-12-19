const { ERROR_MESSAGES } = require("./constants");

const validateUsername = (username) => {
  if (!username || typeof username !== "string") {
    return { valid: false, error: ERROR_MESSAGES.INVALID_USERNAME };
  }
  if (username.length < 3 || username.length > 20) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_USERNAME };
  }
  return { valid: true };
};

const validatePassword = (password) => {
  if (!password || typeof password !== "string") {
    return { valid: false, error: ERROR_MESSAGES.INVALID_PASSWORD };
  }
  if (password.length < 6) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_PASSWORD };
  }
  return { valid: true };
};

const validateClicks = (clicks) => {
  if (typeof clicks !== "number" || clicks < 1) {
    return { valid: false, error: "Clicks must be a positive number" };
  }
  return { valid: true };
};

const validateResourceAmount = (amount) => {
  if (typeof amount !== "number" || amount < 1) {
    return { valid: false, error: "Amount must be a positive number" };
  }
  return { valid: true };
};


const validateUpgradeType = (upgradeType) => {
  if (!upgradeType || typeof upgradeType !== "string") {
    return { valid: false, error: "Upgrade type must be a string" };
  }
  return { valid: true };
};

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
