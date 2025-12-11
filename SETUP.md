# 🏰 Castle Defense Game - Setup Guide

## Prerequisites
- **Node.js** (v14 or higher) - Download from [nodejs.org](https://nodejs.org)
- **MongoDB** (v8.0+) - Download from [mongodb.com](https://www.mongodb.com/try/download/community)

---

## **Step 1: Install Dependencies**

### Backend:
```bash
cd backend
npm install
```

### Frontend:
```bash
cd forntend
npm install
```

---

## **Step 2: Set Up MongoDB**

### Create data folder:
1. Open File Explorer
2. Go to `C:\ drive`
3. Create folder `data`
4. Inside `data`, create folder `db`

Your path should be: `C:\data\db`

---

## **Step 3: Configure Environment Variables**

### Backend `.env` file:
Located at: `backend\.env`

```
MONGO_URI=mongodb://localhost:27017/game
PORT=5000
JWT_SECRET=unsecretfoartebun
```

---

## **Step 4: Start All 3 Services**

You need **3 separate Command Prompt windows**:

### Window 1 - MongoDB:
```bash
C:\Program Files\MongoDB\Server\8.2\bin\mongod
```
You should see: `"Waiting for connections on port 27017"`

### Window 2 - Backend:
```bash
cd C:\Users\Paul\Desktop\Proiect_Aplicatii_Web\backend
npm start
```
You should see: `"Server pornit pe http://localhost:5000"`

### Window 3 - Frontend:
```bash
cd C:\Users\Paul\Desktop\Proiect_Aplicatii_Web\forntend
npm start
```
Browser will open at `http://localhost:3000`

---

## **Testing**

1. Go to `http://localhost:3000/register`
2. Create a new account
3. Go to `http://localhost:3000/login`
4. Login with your credentials
5. You should see the game page with your player stats

---

## **Troubleshooting**

- **MongoDB connection error?** - Make sure `C:\data\db` folder exists
- **Port 5000 already in use?** - Change `PORT` in `.env` file
- **CORS error?** - Make sure backend is running before frontend
- **Can't connect to MongoDB?** - Check if `mongod` terminal is running
