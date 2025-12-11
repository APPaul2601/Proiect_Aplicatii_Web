# 🏰 Castle Clicker - Incremental Game

A **simple clicker game** where you progress by clicking, unlock upgrades, and build structures to help you reach the ultimate goal: completing your castle with 100 million clicks!

---

## **Quick Start**

### 1️⃣ **Clone & Install**
```bash
git clone <repo-url>
cd Proiect_Aplicatii_Web

# Backend
cd backend
npm install

# Frontend (in new terminal)
cd forntend
npm install
```

### 2️⃣ **Create .env file**
In the `backend` folder, create a `.env` file:
```
MONGO_URI=mongodb://localhost:27017/castleclicker
PORT=5000
JWT_SECRET=your-secret-key-here
```

### 3️⃣ **Start Everything**
You need **3 terminals** running:

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Backend:**
```bash
cd backend
npm start
```

**Terminal 3 - Frontend:**
```bash
cd forntend
npm start
```

Then open: **http://localhost:3000**

---

## **How to Play**

1. **Register** - Create an account
2. **Login** - Log in with your credentials
3. **Click the Castle** - Each click deals damage (upgradeable)
4. **Earn Resources** - Gain gold by clicking
5. **Buy Upgrades** - Increase click power with upgrades
6. **Buy Buildings** - Unlock buildings for passive income
7. **Reach 100M** - Complete your castle to win! 🎉

---

## **Game Features**

✅ User Registration & Login  
✅ Click System (Click → Deal Damage → Earn Resources)  
✅ Click Power Upgrades (Boost your damage per click)  
✅ Building System (Generate passive resources)  
✅ Resource Management (Gold, Wood, Stone, Wheat)  
✅ Castle Completion Goal (100,000,000 clicks to win)  
✅ Data Persistence (Progress saved in MongoDB)  
✅ Responsive UI  

---

## **Team Assignments (4 People)**

| Person | Role | Responsibility |
|--------|------|-----------------|
| **Person 1** | Backend - Click System | Click endpoint, damage calculation, resource gain |
| **Person 2** | Backend - Shop System | Building & upgrade models, buy endpoints, validation |
| **Person 3** | Frontend - Game UI | Game page layout, click button, progress bar, shop UI |
| **Person 4** | Backend/Testing | Seed data, route setup, final testing, polish |

👉 **See MVP_CLICKER_2PERSON_PLAN.md for detailed 1-day sprint breakdown**

---

## **Game Progression**

```
Start: Castle 0 / 100,000,000 clicks
  ↓
Click continuously → Gain gold
  ↓
Buy Upgrades → Increase click power (1 → 2 → 3...)
  ↓
Buy Buildings → Generate passive resources
  ↓
Keep clicking with increased power
  ↓
Reach 100M clicks → CASTLE COMPLETED! YOU WIN! 🎉
```

---

## **Tech Stack**

- **Frontend:** React, Axios, CSS
- **Backend:** Node.js, Express, JWT
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT Tokens

---

## **Database Collections**

- **User** - User accounts with credentials
- **Progress** - Player game state (castle completion, resources, upgrades)
- **Building** - Game content (farm, mine, quarry, lumbermill)
- **Upgrade** - Game content (sharper sword, stronger swing, magic enchantment)

---

## **Project Structure**

```
Proiect_Aplicatii_Web/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Progress.js (NEW)
│   │   ├── Building.js (NEW)
│   │   └── Upgrade.js (NEW)
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── progressController.js (NEW)
│   │   └── shopController.js (NEW)
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── progressRoutes.js (NEW)
│   │   └── shopRoutes.js (NEW)
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── server.js
│   └── .env (create this)
│
├── forntend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── GameUI.jsx (UPDATED)
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── index.js
│   │
│   └── package.json
│
├── SETUP.md
├── DATABASESCHEMA.md
├── MVP_CLICKER_2PERSON_PLAN.md
├── GIT_COMMANDS.md
├── TASKS.md
└── README.md (this file)
```

---

## **API Endpoints**

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user

### Player Progress
- `GET /api/player` - Get player state
- `POST /api/player/click` - Click castle, increase progress
- `POST /api/player/buy-upgrade` - Purchase upgrade
- `POST /api/player/buy-building` - Purchase building

### Shop
- `GET /api/buildings` - Get all building types
- `GET /api/upgrades` - Get all upgrade types

---

## **Key Game Numbers**

| Item | Value |
|------|-------|
| Castle Goal | 100,000,000 clicks |
| Starting Click Power | 1 damage per click |
| Max Click Power | Unlimited (scales with upgrades) |
| Building Types | 4 (farm, mine, quarry, lumbermill) |
| Upgrade Types | 3 (sharper sword, stronger swing, magic enchantment) |

---

## **Development Phases**

### Phase 1: MVP (1 Day)
✅ Click system working  
✅ Upgrades functional  
✅ Buildings system  
✅ Win condition (100M clicks)  

### Phase 2: Polish (Week 2)
- Passive income from buildings
- Better UI animations
- Sound effects
- Achievements
- Leaderboards

### Phase 3: Advanced (Week 3+)
- Workers (automatic resource gathering)
- Towers (auto-defense system)
- Waves/Combat system
- Prestige/Reset mechanics

---

## **Getting Started with Development**

### 1. Read the Documents
1. `SETUP.md` - Detailed setup guide
2. `DATABASESCHEMA.md` - Database structure
3. `MVP_CLICKER_2PERSON_PLAN.md` - 1-day sprint plan
4. `GIT_COMMANDS.md` - Git workflow reference

### 2. Follow the 1-Day Sprint
- See `MVP_CLICKER_2PERSON_PLAN.md`
- Covers timing, responsibilities, and testing

### 3. Commit and Push Often
- See `GIT_COMMANDS.md` for git workflow
- Commit every 30 minutes of work
- Push before end of day

### 4. Test Continuously
- Test endpoints with Postman
- Test UI in browser
- Test full game loop

---

## **Team Communication**

During the 1-day sprint:

| Time | Activity |
|------|----------|
| 9:00 AM | Team sync (15 min) - Review plan together |
| 10:00 AM | Start coding |
| 12:00 PM | Lunch |
| 1:00 PM | Integration & testing |
| 3:00 PM | Bug fixes |
| 5:00 PM | Final testing & push to GitHub |

---

## **Success Criteria**

By end of day:

✅ Can register and login  
✅ Can click castle  
✅ Can see progress bar  
✅ Can buy upgrades  
✅ Can buy buildings  
✅ Resources display correctly  
✅ Can reach 100M and win  
✅ Data persists on refresh  
✅ No console errors  
✅ Code committed to GitHub  

---

## **If You Get Stuck**

1. **Can't run the project?** → Check `SETUP.md`
2. **Don't know what to build?** → Check `MVP_CLICKER_2PERSON_PLAN.md`
3. **Git issues?** → Check `GIT_COMMANDS.md`
4. **Database questions?** → Check `DATABASESCHEMA.md`
5. **Still stuck?** → Add a comment in the code or ask the team

---

## **Quick Reference**

### To Run Locally:
```bash
# Terminal 1: MongoDB
mongod

# Terminal 2: Backend
cd backend && npm start

# Terminal 3: Frontend
cd forntend && npm start

# Then visit http://localhost:3000
```

### To Push Code:
```bash
git add .
git commit -m "Your message here"
git push origin your-branch
```

### To Merge to Main:
```bash
git checkout main
git pull origin main
git merge your-branch
git push origin main
```

---

## **Let's Build This! 🚀**

This is a fun, achievable 1-day project. By 5 PM today, you'll have:
- ✅ A playable clicker game
- ✅ Working click system
- ✅ Upgrade & building shops
- ✅ A working MVP

**Let's go!** 💪