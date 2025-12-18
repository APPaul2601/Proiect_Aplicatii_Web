## Phase 1: Backend Model Updates (Models Cleaned Up)
- ✅ **Building.js** – Removed `cost` and `incomePerSecond` fields, added `icon` and `description`  
- ✅ **Upgrade.js** – Kept as-is (players buy upgrades, so costs stay)  
- ✅ **Progress.js** – Removed `buildings` array and `totalClicks` field  
- ✅ **PlayerStats.js** – Removed `buildingsOwned`, `totalClicksMade`, `firstBuildingBought` fields  
- ✅ **User.js** – No changes needed  

## Phase 2: Backend Controllers Reorganized

### progressController.js
- ✅ Fixed imports from nested paths to flat model structure  
- ✅ Changed `req.user.id` to `req.userId` (authMiddleware sets this)  
- ✅ Removed `buyBuilding()` function (buildings aren't purchasable)  
- ✅ Kept `getProgress()` and `clickCastle()` functions  
- ✅ Added debug logging with 📊 emoji for tracking  

### authController.js
- ✅ Fixed model imports from `../models/auth/User` and `../models/game/Progress`  
- ✅ Added console logging for registration/login debugging  
- ✅ Updated to create Progress document on registration with proper initial state  

### upgradeController.js (Created)
- ✅ Created new controller for upgrade purchases  
- ✅ Implemented `buyUpgrade()` function with resource deduction  
- ✅ Added upgrade effect application (clickPower boost)  
- ✅ Implemented `getUpgrades()` to fetch catalog  

### resourceController.js (Created)
- ✅ Created new controller for resource collection  
- ✅ Implemented `collectResource()` function  
- ✅ Maps buildings to resource types (castle → gold, quarry → stone, etc.)  
- ✅ Multiplies rewards by `clickPower`  

### shopController.js
- ✅ Removed `getBuildings()` function (buildings aren't purchasable)  
- ✅ Kept only `getUpgrades()` for upgrade catalog  

## Phase 3: Backend Routes Reorganized

### castleRoutes.js (Renamed from progressRoutes.js)
- ✅ Updated all endpoint comments from `/api/player` to `/api/castle`  
- ✅ Routes: `GET /api/castle`, `POST /api/castle/click`, `POST /api/castle/buy-upgrade`  
- ✅ Fixed imports to use correct controller functions  

### upgradeRoutes.js (Created)
- ✅ Created new route file for upgrade endpoints  
- ✅ Routes: `GET /api/upgrades`, `POST /api/upgrades/buy`  
- ✅ Properly imports from `upgradeController`  

### resourceRoutes.js (Created)
- ✅ Created new route file for resource collection  
- ✅ Route: `POST /api/resources/collect`  
- ✅ Properly imports from `resourceController`  

### shopRoutes.js
- ✅ Removed `/buildings` endpoints (buildings aren't purchasable)  
- ✅ Kept only `/upgrades` endpoint for consistency  

### authRoutes.js
- ✅ No changes needed (already correct)  

### progressRoutes.js
- ✅ Cleaned up - removed `buyBuilding` route reference  
- ✅ Kept only necessary endpoints  

## Phase 4: Backend Utilities Created

### utils/constants.js (Created)
- ✅ Defined `RESOURCE_TYPES`: gold, wood, stone, wheat  
- ✅ Defined `BUILDING_TYPES`: castle, quarry, lumber_yard, wheat_field  
- ✅ Created error and success message constants  
- ✅ Defined castle stages with unlock requirements  

### utils/validators.js (Created)
- ✅ `validateUsername()` – 3–20 characters  
- ✅ `validatePassword()` – 6+ characters  
- ✅ `validateClicks()` – Positive number validation  
- ✅ `validateResourceAmount()` – Positive number validation  
- ✅ `validateUpgradeType()` – String validation  
- ✅ `validateBuildingType()` – String validation  

### utils/responses.js (Created)
- ✅ `successResponse()` – Standard success wrapper  
- ✅ `errorResponse()` – Standard error wrapper  
- ✅ `validationError()` – Validation error wrapper  
- ✅ `unauthorizedResponse()` – 401 responses  
- ✅ `notFoundResponse()` – 404 responses  

## Phase 5: Backend Configuration & Seeds

### server.js
- ✅ Updated all route mounts to use new organized routes  
- ✅ Mounted `/api/auth` → `authRoutes`  
- ✅ Mounted `/api/castle` → `castleRoutes`  
- ✅ Mounted `/api/resources` → `resourceRoutes`  
- ✅ Mounted `/api/upgrades` → `upgradeRoutes`  
- ✅ Mounted `/api/shop` → `shopRoutes` (backward compatibility)  

### seedData.js
- ✅ Simplified buildings (removed `cost`, `incomePerSecond`)  
- ✅ Added `icon` and `description` fields to buildings  
- ✅ Reduced to 4 buildings: castle, quarry, lumber_yard, wheat_field  
- ✅ Updated upgrade seeding with proper cost structure  

### authMiddleware.js
- ✅ No changes needed (already correct)  

### config/db.js
- ✅ No changes needed (already correct)  

## Phase 6: Frontend API Layer Fixed

### playerAPI.js
- ✅ Fixed to use `/api/castle` endpoint instead of `/api/player`  
- ✅ Added proper Authorization header with Bearer token  
- ✅ All functions send token correctly  

### upgradeAPI.js
- ✅ Fixed endpoint from `/api/player/buy-upgrade` to `/api/upgrades/buy`  
- ✅ Added proper Authorization headers  
- ✅ Created `getAllUpgrades()` function  

### resourceAPI.js
- ✅ Already correct (if exists)  

## Phase 7: Frontend Hooks Updated

### useGameData.js
- ✅ Changed from polling every 2 seconds to fetching once on mount  
- ✅ Removed infinite refresh loop that caused stuttering  
- ✅ Returns: `{ player, loading, error, fetchPlayerData }`  
- ✅ Properly handles error states  

## Phase 8: Frontend Components Fixed

### GameUI.jsx
- ✅ Fixed destructuring from `playerData` to `player`  
- ✅ Changed `handleClickBuilding` to `fetchPlayerData()`  
- ✅ Changed `refetch` to `fetchPlayerData`  
- ✅ Updated all property references from `playerData.*` to `player.*`  
- ✅ Removed stuttering/constant refresh issue  

### UpgradesShop.jsx
- ✅ Added default value for `playerResources` to prevent undefined errors  
- ✅ Added safety check in `canAfford()` function  
- ✅ Added fallback to `0` for costs: `(upgrade.cost.gold || 0)`  
- ✅ Properly displays upgrade affordability status  

### BuildingClickerButtons.jsx
- ✅ Receives correct callback from `GameUI`  

### Header.jsx
- ✅ No changes needed  

### ResourcesDisplay.jsx
- ✅ No changes needed  

### ProgressBar.jsx
- ✅ No changes needed  

### LoadingSpinner.jsx
- ✅ No changes needed  
