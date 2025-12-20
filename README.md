# Castle Clicker

A click-based incremental game where you earn resources by clicking, purchase upgrades to boost your click power, and progress through different castle stages.

## Features

- User authentication with JWT
- Click system to earn resources (gold, wood, stone, wheat)
- Upgrade system to increase click power
- Multi-resource management
- Real-time progress tracking
- Data persistence with MongoDB
- Responsive user interface

## Tech Stack

Backend: Node.js, Express, MongoDB, Mongoose, JWT
Frontend: React, Axios, CSS
Database: MongoDB Atlas
Authentication: JWT Tokens

## Prerequisites

- Node.js (v14 or higher)
- npm
- MongoDB Atlas account (or local MongoDB)

## Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd Proiect_Aplicatii_Web
```

2. Backend setup:

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
MONGO_URI=mongodb+srv://<username>:<password>@clickergame-cluster.mongodb.net/clickergame
JWT_SECRET=your_secret_key_here
```

3. Frontend setup:

```bash
cd ../frontend
npm install
```

## Running the Application

Start the backend (from backend folder):

```bash
npm start
```

Start the frontend (from frontend folder, in a new terminal):

```bash
npm start
```

Open http://localhost:3000 in your browser.

## How to Play

1. Register and login
2. Click the castle to earn resources
3. Buy upgrades to increase click power
4. Progress through castle stages
5. Continue clicking and upgrading

## API Endpoints

Authentication:

- POST /api/auth/register - Create account
- POST /api/auth/login - Login user

Game:

- GET /api/castle - Get player progress
- POST /api/castle/click - Click castle
- POST /api/castle/buy-upgrade - Purchase upgrade

Upgrades:

- GET /api/upgrades - Get all upgrades

## Project Structure

```
Proiect_Aplicatii_Web/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── data/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── api/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── public/
│
└── README.md
```

## Troubleshooting

MongoDB Connection Error: Verify MONGODB_URI is correct
Port Already in Use: Change PORT in backend .env
Frontend Can't Connect: Ensure backend is running on http://localhost:5000
