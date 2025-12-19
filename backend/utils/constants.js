const RESOURCE_TYPES = {
  GOLD: "gold",
  WOOD: "wood",
  STONE: "stone",
  WHEAT: "wheat",
};

const BUILDING_TYPES = {
  CASTLE: "castle",
  QUARRY: "quarry",
  LUMBER_YARD: "lumber_yard",
  WHEAT_FIELD: "wheat_field",
};

const UPGRADE_EFFECTS = {
  CLICK_POWER: "clickPower",
  RESOURCE_COLLECTION: "resourceCollection",
  WORKER_SPEED: "workerSpeed",
  WORKER_EFFICIENCY: "workerEfficiency",
  STONE_COLLECTION: "stoneCollection",
  WOOD_COLLECTION: "woodCollection",
};


const STAGE_REQUIREMENTS = {
  1: {
    unlocks: ["sharper_sword", "stronger_swing"],
    name: "Building Foundation",
  },
  2: {
    unlocks: ["magic_enchantment", "better_tools", "faster_workers"],
    name: "Main Structure",
  },
  3: {
    unlocks: ["advanced_magic", "master_craftsmanship"],
    name: "Towers & Walls",
  },
  4: {
    unlocks: ["final_blessing", "legendary_enhancement"],
    name: "Complete Castle",
  },
};

const ERROR_MESSAGES = {
  INVALID_USERNAME: "Username must be 3-20 characters",
  INVALID_PASSWORD: "Password must be at least 6 characters",
  USER_EXISTS: "Username already exists",
  INVALID_CREDENTIALS: "Invalid username or password",
  NOT_ENOUGH_RESOURCES: "Not enough resources to complete this action",
  UPGRADE_NOT_FOUND: "Upgrade not found",
  PROGRESS_NOT_FOUND: "Player progress not found",
  USER_NOT_FOUND: "User not found",
  INVALID_TOKEN: "Invalid or expired token",
  NO_TOKEN: "No authorization token provided",
};

const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  REGISTER_SUCCESS: "User registered successfully",
  UPGRADE_PURCHASED: "Upgrade purchased successfully",
  CLICK_RECORDED: "Click recorded successfully",
};

module.exports = {
  RESOURCE_TYPES,
  BUILDING_TYPES,
  UPGRADE_EFFECTS,
  STAGE_REQUIREMENTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
