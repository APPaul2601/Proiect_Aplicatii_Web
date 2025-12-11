# 🏰 Castle Defense Game

A **clicker incremental RPG** where you defend your castle from waves of monsters, manage resources, and build stronger defenses!

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
MONGO_URI=mongodb://localhost:27017/game
PORT=5000
JWT_SECRET=unsecretfoartebun
```

### 3️⃣ **Start Everything**
You need **3 terminals** running:

**Terminal 1 - MongoDB:**
```bash
C:\Program Files\MongoDB\Server\8.2\bin\mongod
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
3. **Click to Attack** - Use action points to damage monsters
4. **Defend Waves** - Battle waves of increasing difficulty
5. **Earn Resources** - Get wood, stone, food, and gold
6. **Build & Upgrade** - Use resources to build towers and improve your castle

---

## **Team Assignments**

| Person | Role | Responsibility |
|--------|------|-----------------|
| **Person 1** | Backend - Action Points | AP system, regeneration, consumption |
| **Person 2** | Backend - Waves & Monsters | Wave progression, monster spawning, combat |
| **Person 3** | Frontend - UI/UX | Components, styling, animations, responsiveness |
| **Person 4** | Backend - Buildings/Shop | Building system, shop, upgrades, cost scaling |

👉 **See TASKS.md for detailed tasks and checkboxes**

---

## **Game Features**

✅ User Registration & Login  
✅ Action Points System (regenerating resource for clicks)  
✅ Wave-based Monster Combat  
✅ Resource Management (Wood, Stone, Food, Gold)  
✅ Building/Shop System (Towers, Farms, Mines)  
✅ Castle Progression  
✅ Responsive UI  

---

## **Tech Stack**

- **Frontend:** React, Axios, CSS
- **Backend:** Node.js, Express, JWT
- **Database:** MongoDB
- **Authentication:** JWT Tokens

---

## **Documentation**

📖 **Setup Instructions:** See `SETUP.md`  
📋 **Task Assignments:** See `TASKS.md`

---

## **Getting Help**

1. Check `SETUP.md` if you can't run the project
2. Check `TASKS.md` for your assigned work
3. Ask in Discord/Slack if you're stuck
4. Leave comments in code for unclear sections

---

## **Project Structure**

```
Proiect_Aplicatii_Web/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── .env (create this)
│
├── forntend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
│
├── SETUP.md (detailed setup guide)
├── TASKS.md (task assignments)
└── README.md (this file)
```

---

**Let's build something awesome! 🚀**
