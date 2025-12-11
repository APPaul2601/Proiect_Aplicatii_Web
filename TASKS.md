# 🎮 MVP Clicker Game - 2 Person 1-Day Sprint

## Game Concept

**Simple Clicker Game:**
- Click castle 100M times to win
- Upgrades increase your click power
- Buildings generate passive resources
- Complete the castle = YOU WIN!

No turns, no action points, no complexity. Just **click → upgrade → win**.

---

## **Simplified Database Schema**

### Collections Needed (3 total):

**1. Progress** (Player State)
- Castle completion (0 to 100M)
- Resources (gold, wood, stone, wheat)
- Click power (1, 2, 3, etc)
- Buildings owned
- Upgrades unlocked
- Win status

**2. Building** (Game Content)
- Type, name, cost
- What it generates per second
- Resource type

**3. Upgrade** (Game Content)
- Type, name, cost
- Effect (clickPower boost, etc)
- Amount of boost

**No need for:**
- ❌ Wave model
- ❌ Action points
- ❌ Turn system
- ❌ Complex progression

---

## **Team Breakdown**

| Person | Role | Main Responsibility |
|--------|------|-------------------|
| **Person 1** | Backend | Database + all API endpoints |
| **Person 2** | Frontend | Game UI + connect to backend |

---

## **⏰ Full Day Timeline**

```
9:00 AM  - 9:30 AM   : Team Sync & Setup (30 min)
9:30 AM  - 10:30 AM  : Person 1 - Create Models (1 hour) ⭐ CRITICAL
10:30 AM - 12:00 PM  : Person 1 - Build Endpoints (1.5 hours)
10:30 AM - 1:00 PM   : Person 2 - Build UI (2.5 hours) [parallel]
12:00 PM - 1:00 PM   : LUNCH (1 hour)
1:00 PM  - 2:00 PM   : Integration & Testing (1 hour)
2:00 PM  - 3:30 PM   : Bug Fixes & Polish (1.5 hours)
3:30 PM  - 5:00 PM   : Final Testing & Deploy (1.5 hours)
```

---

## **PHASE 1: Setup (9:00 AM - 9:30 AM) - BOTH**

### What to Do:
1. Pull latest code: `git pull origin main`
2. Create branch: `git checkout -b mvp-clicker`
3. Verify MongoDB is running
4. Review this plan together
5. **START CODING!**

---

## **PHASE 2: Data Models (9:30 AM - 10:30 AM) - PERSON 1 ONLY**

### ⭐ CRITICAL - BLOCKS PERSON 2

Person 1 creates 3 new model files:

**What needs to be created:**
- `Progress.js` - Update existing or create new
  - castleCompletion (0 to 100,000,000)
  - clickPower
  - resources (gold, wood, stone, wheat)
  - buildings array
  - upgrades array

- `Building.js` - New file
  - type, name, cost
  - incomePerSecond, resourceType

- `Upgrade.js` - New file
  - type, name, cost
  - effect, amount

**Person 2 waits until this is done!**

**Estimated time: 1 hour** ✅

---

## **PHASE 3A: Backend Endpoints (10:30 AM - 12:00 PM) - PERSON 1**

### What needs to be done:

**Update progressController.js:**
- `GET /api/player` - Get player progress
- `POST /api/player/click` - Click castle, increase completion
- `POST /api/player/buy-upgrade` - Buy an upgrade
- `POST /api/player/buy-building` - Buy a building

**Create shopController.js:**
- `GET /api/buildings` - Get all building types
- `GET /api/upgrades` - Get all upgrade types

**Create routes:**
- progressRoutes.js - Player actions
- shopRoutes.js - Shop data

**Update server.js:**
- Add routes
- Seed initial building & upgrade data

**Estimated time: 1.5 hours** ✅

---

## **PHASE 3B: Frontend UI (10:30 AM - 1:00 PM) - PERSON 2**

### Can start while Person 1 finishes models

**What needs to be done:**

**Update GameUI.jsx:**
- Display castle progress bar
- Display resources (gold, wood, stone, wheat)
- Display click power
- **ATTACK CASTLE** button
- Click multiple times input
- Buildings section (list + buy buttons)
- Upgrades section (list + buy buttons)

**Styling:**
- Grid layout (2 columns: left=buildings, right=upgrades)
- Castle progress at top
- Resources bar
- Big red attack button in center

**No animations needed. Keep it simple!**

**Estimated time: 2.5 hours** ✅

---

## **PHASE 4: Integration (1:00 PM - 2:00 PM) - BOTH**

### Person 1:
- Test all endpoints with Postman
- Verify data saves to MongoDB
- Check backend has no errors

### Person 2:
- Connect frontend API calls to backend endpoints
- Test clicking works
- Test buying upgrades works
- Test buying buildings works

### Together:
- Play through full game loop
- Verify everything connects

**Estimated time: 1 hour** ✅

---

## **PHASE 5: Bug Fixes (2:00 PM - 3:30 PM) - BOTH**

### Common Issues to Check:

```
❌ Frontend not connecting to backend?
   → Check API URLs are correct
   → Check token is in headers
   → Check CORS is enabled

❌ Click not working?
   → Check endpoint returns correct data
   → Check frontend receives response

❌ Can't buy upgrade?
   → Check resources validation
   → Check cost calculation

❌ Data not persisting?
   → Check MongoDB is running
   → Check save() is being called

❌ Console errors?
   → F12 → Console tab
   → Fix backend + frontend errors
```

**Estimated time: 1.5 hours** ✅

---

## **PHASE 6: Final Testing & Deploy (3:30 PM - 5:00 PM) - BOTH**

### Full Game Test Sequence:

```
✅ 1. Login to game
✅ 2. See castle at 0/100M
✅ 3. Click castle 100 times
✅ 4. See gold increase
✅ 5. Buy "Sharper Sword" upgrade
✅ 6. Click power increases to 2
✅ 7. Click castle 50 times → 100 progress (2x power)
✅ 8. Buy "Farm" building
✅ 9. See "Farm - Owned: 1"
✅ 10. Refresh page → all data persists
✅ 11. Keep clicking until castle = 100M
✅ 12. See "YOU WIN!" message
✅ 13. Git commit & push
```

**Estimated time: 1.5 hours** ✅

---

## **What Each Person Creates**

### Person 1 (Backend):
- Backend/models/Progress.js
- Backend/models/Building.js
- Backend/models/Upgrade.js
- Backend/controllers/progressController.js
- Backend/controllers/shopController.js
- Backend/routes/progressRoutes.js
- Backend/routes/shopRoutes.js
- Backend/server.js (updates)

### Person 2 (Frontend):
- Frontend/src/pages/GameUI.jsx (complete rewrite)
- Update API service calls (if needed)

---

## **Critical Path (Dependencies)**

```
MUST DO FIRST:
9:30 AM - Person 1 creates models
  ↓
10:30 AM - Person 1 creates endpoints
  (Person 2 can start UI at same time)
  ↓
12:00 PM - Both integrate
  ↓
1:00 PM - Testing
  ↓
3:30 PM - Final polish
```

**If Person 1 models take longer:**
- Person 2 can mock the API responses locally
- Not blocked, just uses fake data

---

## **Success Criteria by 5 PM**

✅ Can register & login  
✅ Can click castle  
✅ Castle progress increases  
✅ Resources display correctly  
✅ Can buy upgrades  
✅ Click power increases  
✅ Can buy buildings  
✅ Can complete castle (100M clicks)  
✅ "YOU WIN!" displays  
✅ Data persists on refresh  
✅ No console errors  
✅ Code pushed to GitHub  

---

## **Key Differences from Turn-Based**

| Turn-Based | Clicker |
|-----------|---------|
| ❌ Action points | ✅ Unlimited clicks |
| ❌ Turn system | ✅ Continuous play |
| ❌ Complex state | ✅ Simple state |
| ❌ Waiting for turns | ✅ Click anytime |
| ❌ 1-2 weeks to build | ✅ 1 day to build |

---

## **After MVP Works (Week 2+)**

Once clicker mechanics work:

**Phase 2 adds:**
- ✅ Passive income from buildings (workers)
- ✅ Wave/combat system
- ✅ Towers for auto-defense
- ✅ Achievements
- ✅ Better UI & animations

But those build ON TOP of what you build today!

---

## **If You Get Stuck**

| Issue | Solution |
|-------|----------|
| Person 1 stuck on models? | Review MongoDB documentation |
| Person 2 can't connect? | Check API endpoints are live in Postman |
| Click not increasing? | Add console.log() to trace the issue |
| Data not saving? | Verify MongoDB + Mongoose save() |
| UI not updating? | Check React state is being set |

---

## **Git Workflow**

```bash
# Morning
git checkout -b mvp-clicker

# Throughout day (each person)
git add .
git commit -m "Person 1: Backend models & endpoints"
git commit -m "Person 2: Frontend UI"
git push origin mvp-clicker

# End of day
git checkout main
git merge mvp-clicker
git push origin main
```

---

## **UI Layout**

Keep it **SIMPLE** - no fancy styling needed!

```
┌─────────────────────────────────────────────────────────────┐
│ 🏰 Castle Clicker                          [Logout Button]  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Castle Progress: 50M / 100M                                │
│  ████████░░░░░░░░░░░░░░░░░░ 50%                           │
│                                                              │
│  Resources: Gold: 500 | Wood: 200 | Stone: 150 | Wheat: 300│
│  Click Power: 2 | Total Clicks: 1000                       │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                   [ATTACK CASTLE!]  ← BIG RED BUTTON        │
│                  Click Count: [1]                           │
│                                                              │
├─────────────────────────┬──────────────────────────────────┤
│   🏢 BUILDINGS          │   ⚙️ UPGRADES                    │
│                         │                                  │
│ [Farm]                  │ [Sharper Sword]                 │
│ Cost: 10G 5W           │  Cost: 50G                       │
│ Owned: 2               │  Level: 1                        │
│ [Buy]                  │  [Buy]                           │
│                         │                                  │
│ [Mine]                  │ [Stronger Swing]                │
│ Cost: 10W 5S           │  Cost: 200G 50W                 │
│ Owned: 0               │  Level: 0                        │
│ [Buy]                  │  [Buy]                           │
│                         │                                  │
│ [Quarry]                │ [Magic Enchantment]             │
│ Cost: 15G 5W 5H        │  Cost: 500G 100W 100S 100H     │
│ Owned: 1               │  Level: 0                        │
│ [Buy]                  │  [Buy]                           │
│                         │                                  │
│ [Lumber Mill]           │                                  │
│ Cost: 5G 5S 5H         │                                  │
│ Owned: 0               │                                  │
│ [Buy]                  │                                  │
│                         │                                  │
├─────────────────────────┴──────────────────────────────────┤
│                                                              │
│  Status: Click castle 49,950,000 more times to win!        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## **That's It!**

You've got a **complete 1-day plan** for 2 people to build a working clicker game! 🚀

Push this file to GitHub and share with your teammate. 

**Good luck! You can do this!** 💪