# 🎮 1-Day MVP Sprint - Clicker Game Edition

## Game Concept (SIMPLIFIED)
**Click castle 100M times to win. Upgrades & buildings help you progress faster.**

---

## **New Simplified Database Schema**

### Collections Needed (5 total):

```javascript
// 1. User (already exists - no changes)
{ username, password, createdAt }

// 2. Progress (MAJOR UPDATE)
{
  user: ObjectId,
  castleCompletion: Number, // 0 to 100,000,000
  castleCompleted: Boolean,
  clickPower: Number, // 1, 2, 3, etc (from upgrades)
  resources: {
    gold: Number,
    wood: Number,
    stone: Number,
    wheat: Number
  },
  buildings: [ // passive income
    { type: 'farm', count: 2 },
    { type: 'mine', count: 1 }
  ],
  upgrades: [ // unlocked upgrades
    { type: 'sharper_sword', level: 1 }
  ]
}

// 3. Building (NEW - Game Content)
{
  type: String (unique), // 'farm', 'mine', 'quarry'
  name: String,
  cost: { gold, wood, stone, wheat },
  incomePerSecond: Number, // passive income type
  resourceType: String // 'gold', 'wood', etc
}

// 4. Upgrade (NEW - Game Content)
{
  type: String (unique), // 'sharper_sword', 'stronger_swing'
  name: String,
  cost: { gold, wood, stone, wheat },
  effect: String, // 'clickPower', 'castleGoal'
  amount: Number // +1 damage, -1M castle goal, etc
}

// 5. PlayerStats (SIMPLIFIED - optional)
{
  user: ObjectId,
  totalClicksMade: Number,
  buildingsOwned: Number,
  upgradesUnlocked: Number
}
```

---

## **Database Changes Needed**

### ✅ NO CHANGES:
- User collection
- PlayerStats (mostly, just track stats)

### 🔄 UPDATE:
- **Progress.js** - Complete rewrite

### ❌ DELETE/SKIP:
- Wave.js (not needed yet)
- Monster.js (not needed yet)
- Action points (completely removed)

---

## **Code Changes Overview**

| File | Change | Status |
|------|--------|--------|
| Progress.js | Complete rewrite | 🔴 DO THIS |
| progressController.js | Complete rewrite | 🔴 DO THIS |
| progressRoutes.js | New endpoints | 🔴 DO THIS |
| Building.js | New file | 🔴 DO THIS |
| Upgrade.js | New file | 🔴 DO THIS |
| GameUI.jsx | Complete rewrite | 🔴 DO THIS |
| server.js | Add routes | 🟡 MINOR |

---

## **⏰ 1-Day Timeline (3 People)**

```
9:00 AM:  Setup & Sync (15 min)
├─ All: Pull latest code
├─ All: Review this plan
├─ Create feature branches
└─ Start!

10:00 AM - 12:00 PM (2 hours):
├─ Person 1: Backend Click System
├─ Person 2: Backend Buildings & Upgrades
└─ Person 3: Frontend UI

12:00 PM - 1:00 PM: LUNCH ☕

1:00 PM - 2:30 PM (1.5 hours):
├─ Integration: Connect frontend to backend
└─ Test: Full game loop

2:30 PM - 5:00 PM (2.5 hours):
├─ Bug fixes
├─ Final testing
├─ Code review
└─ Push to GitHub

DONE! 🎉
```

---

# **👤 PERSON 1: Click System (10 AM - 12 PM)**

## Step 1: Update `backend/models/Progress.js`

````javascript
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  
  // CASTLE - Main goal
  castleCompletion: { type: Number, default: 0 }, // 0 to 100,000,000
  castleCompleted: { type: Boolean, default: false },
  
  // CLICK POWER (from upgrades)
  clickPower: { type: Number, default: 1 },
  
  // RESOURCES
  resources: {
    gold: { type: Number, default: 0 },
    wood: { type: Number, default: 0 },
    stone: { type: Number, default: 0 },
    wheat: { type: Number, default: 0 }
  },
  
  // BUILDINGS OWNED
  buildings: [
    {
      type: String, // 'farm', 'mine', etc
      count: { type: Number, default: 0 }
    }
  ],
  
  // UPGRADES UNLOCKED
  upgrades: [
    {
      type: String, // 'sharper_sword', etc
      level: { type: Number, default: 1 }
    }
  ],
  
  // STATS TRACKING
  totalClicks: { type: Number, default: 0 }
}, { timestamps: true, collection: 'players' });

module.exports = mongoose.model('Progress', progressSchema);