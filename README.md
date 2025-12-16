# 🏰 Castle Clicker - Click-Based Incremental Game

A **simple clicker game** where you earn resources by clicking, buy upgrades to boost your click power, and progress through different castle stages!

---

## **Quick Start**

### 1️⃣ **Clone & Install**
```bash
git clone <repo-url>
cd Proiect_Aplikatii_Web

# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 2️⃣ **Environment Setup**
The `.env` file should already be in the `backend` folder with:
```
MONGO_URI=mongodb+srv://Proiect:Proiect1234@clickergame-cluster.smy24sp.mongodb.net/clickergame?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
```
(MongoDB Atlas is already configured)

### 3️⃣ **Start Everything**
You need **2 terminals** running:

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Then open: **http://localhost:3000**

---

## **How to Play**

1. **Register** - Create an account
2. **Login** - Log in with your credentials
3. **Click the Castle** - Each click earns resources
4. **Earn Resources** - Gain gold, wood, stone, and wheat by clicking
5. **Buy Upgrades** - Purchase upgrades to increase click power
6. **Progress Through Stages** - Unlock new castle stages as you progress
7. **Repeat** - Click, earn, upgrade, progress!

---

## **Game Features**

✅ User Registration & Login with JWT Authentication  
✅ Click System (Click → Earn Resources)  
✅ Click Power Upgrades (Boost your click power)  
✅ Multi-Resource System (Gold, Wood, Stone, Wheat)  
✅ Castle Progress Tracking (0-100%)  
✅ Castle Stages (Unlock as you progress)  
✅ Building Display (Visual metadata for game feel)  
✅ Data Persistence (Progress saved in MongoDB)  
✅ Responsive UI with Real-time Updates  

---

## **Implementation Status**

✅ **Completed:**
- Backend restructuring with organized controllers, routes, utilities
- User authentication system (registration, login, JWT tokens)
- Click system with resource earning
- Upgrade system with click power boost
- Multi-resource management
- Frontend/Backend integration
- Game UI fully functional

🔄 **Optional Next Steps:**
- Passive income from buildings
- Castle completion mechanics
- Multiple upgrade effects
- Achievements and statistics
- Leaderboards

---

## **Tech Stack**

- **Frontend:** React, Axios, CSS
- **Backend:** Node.js, Express, JWT
- **Database:** MongoDB + Mongoose (Atlas)
- **Authentication:** JWT Tokens
- **Code Organization:** Feature-based folder structure

---

## **Database Collections**

- **User** - User accounts with hashed passwords and authentication
- **Progress** - Player game state (castle progress %, resources, upgrades owned, click power)
- **Building** - Display metadata (castle, quarry, lumber_yard, wheat_field) - display only
- **Upgrade** - Game content (purchasable upgrades that boost click power)
- **PlayerStats** - Optional statistics tracking (total clicks, achievements)

---

## **Game Progression**

```
Start: Click Power 1, 0 Resources
  ↓
Click castle → Earn gold
  ↓
Accumulate resources (gold, wood, stone, wheat)
  ↓
Buy upgrades → Increase click power (1 → 2 → 3...)
  ↓
Continue clicking with boosted power
  ↓
Progress through castle stages (0% → 25% → 50% → 75% → 100%)
  ↓
Unlock higher-tier upgrades and progress further!
```

---

## **Project Structure**

```
Proiect_Aplicatii_Web/
├── backend/
│   ├── models/
│   │   ├── auth/
│   │   │   └── User.js
│   │   ├── game/
│   │   │   ├── Progress.js
│   │   │   └── PlayerStats.js
│   │   └── content/
│   │       ├── Building.js
│   │       └── Upgrade.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── progressController.js
│   │   ├── upgradeController.js
│   │   ├── resourceController.js
│   │   └── shopController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── castleRoutes.js
│   │   ├── upgradeRoutes.js
│   │   ├── resourceRoutes.js
│   │   └── shopRoutes.js
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── responses.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── data/
│   │   ├── buildings.js
│   │   └── upgrades.js
│   │
│   ├── scripts/
│   │   └── seedData.js
│   │
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── GameUI.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── RegisterForm.jsx
│   │   │   ├── game/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── ResourcesDisplay.jsx
│   │   │   │   ├── ProgressBar.jsx
│   │   │   │   ├── BuildingClickerButtons.jsx
│   │   │   │   └── UpgradesShop.jsx
│   │   │   └── common/
│   │   │       └── LoadingSpinner.jsx
│   │   │
│   │   ├── api/
│   │   │   ├── playerAPI.js
│   │   │   └── upgradeAPI.js
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── gameService.js
│   │   │   └── storageService.js
│   │   │
│   │   ├── hooks/
│   │   │   └── useGameData.js
│   │   │
│   │   ├── App.jsx
│   │   └── index.js
│   │
│   └── package.json
│
├── CHANGES.md
├── SETUP.md
├── DATABASESCHEMA.md
├── README.md (this file)
└── .gitignore
```

---

## **API Endpoints**

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create new account with auto-Progress creation
- `POST /api/auth/login` - Login user and receive JWT token

### Game (`/api/castle` - requires JWT)
- `GET /api/castle` - Get player progress and resources
- `POST /api/castle/click` - Click castle and earn resources
- `POST /api/castle/buy-upgrade` - Purchase upgrade and apply effect

### Upgrades (`/api/upgrades` - requires JWT)
- `GET /api/upgrades` - Get all available upgrades
- `POST /api/upgrades/buy` - Purchase upgrade

### Resources (`/api/resources` - requires JWT)
- `POST /api/resources/collect` - Collect resource from specific source

### Shop (`/api/shop` - backward compatibility)
- `GET /api/shop/upgrades` - Get all upgrades

---

## **Key Game Numbers**

| Item | Value |
|------|-------|
| Starting Click Power | 1 resource per click |
| Max Click Power | Unlimited (scales with upgrades) |
| Castle Progress Scale | 0-100% |
| Resource Types | 4 (gold, wood, stone, wheat) |
| Building Types | 4 (castle, quarry, lumber_yard, wheat_field) - display only |
| Initial Upgrades | 2 unlocked (sharper_sword, stronger_swing) |
| Upgrade Effect | Click power boost (+1 per level) |

---

## **Development Phases**

### Phase 1: MVP ✅ COMPLETE
✅ User authentication system  
✅ Click system with resource earning  
✅ Upgrades with click power boost  
✅ Multi-resource management  
✅ Game UI fully functional  
✅ Backend/Frontend integration  

### Phase 2: Enhancement (Optional)
- Passive income from buildings
- Castle stage progression system
- Multiple upgrade effects
- Achievement system
- Statistics/Leaderboards
- Sound effects and animations

### Phase 3: Advanced (Future)
- Auto-clicker helpers
- Special events and limited-time upgrades
- Prestige/Reset mechanics with bonuses
- PvP or cooperative features
- Mobile app version

---

## **Code Organization**

The project is organized by layers:

**Backend Structure:**
- `models/` - Database schemas organized by category (auth/, game/, content/)
- `controllers/` - Business logic for each feature
- `routes/` - API endpoint definitions
- `middleware/` - Shared logic (authentication, validation)
- `utils/` - Helper functions and constants
- `config/` - Configuration (database connection)
- `data/` - Seed data for games content
- `scripts/` - Database seeding scripts

**Frontend Structure:**
- `pages/` - Full page components
- `components/` - Reusable UI components
- `api/` - API client functions
- `services/` - Business logic layer
- `hooks/` - Custom React hooks

This organization makes the code maintainable and scalable.

---

## **Git Workflow**

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes, then commit
git add .
git commit -m "Clear description of what changed"

# Push to remote
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
# After review and approval, merge to main
```

For more details, see the git commands in your project.

---

## **Currently Working Features**

✅ User registration and login  
✅ JWT authentication with token storage  
✅ Click castle to earn resources  
✅ Multiple resource types (gold, wood, stone, wheat)  
✅ Purchase and apply upgrades  
✅ Click power boost from upgrades  
✅ Real-time progress display  
✅ Building display (castle, quarry, lumber_yard, wheat_field)  
✅ Data persistence in MongoDB  
✅ Responsive and functional UI  
✅ Clean code organization  
✅ Debug logging in console  

---

## **Quick Reference**

### To Run Locally:
```bash
# Terminal 1: Backend (from project root)
cd backend
node server.js

# Terminal 2: Frontend (from project root)
cd frontend
npm start

# Then visit http://localhost:3000
# Backend runs on http://localhost:5000
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

## **What's Next?**

The core game is working! You can now:

1. **Test the game fully** - Play through multiple upgrades
2. **Add new features** - Passive income, achievements, etc.
3. **Polish the UI** - Animations, sound effects, better styling
4. **Deploy** - Push to production with a hosting service
5. **Share** - Let others play your clicker game!

**Happy clicking!** 🎮
