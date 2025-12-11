# 📋 Development Tasks

## Game Overview
**Clicker Incremental RPG** - Defend your castle from waves of monsters using action points and resources.

---

## **Person 1: Action Points System**

### Tasks:
- [ ] Add `actionPoints` and `maxActionPoints` fields to `Progress` model
- [ ] Modify click handler to consume action points (costs 1 AP per click)
- [ ] Create endpoint `POST /api/player/regen-ap` to regenerate AP over time
- [ ] Implement AP regeneration timer (restore 1 AP every 5 seconds, max 10)
- [ ] Display current/max AP in GameUI component
- [ ] Disable attack button when AP = 0

### Files to modify:
- `backend/models/Progress.js`
- `backend/controllers/progressController.js`
- `forntend/src/pages/GameUI.jsx`

---

## **Person 2: Wave/Monster System**

### Tasks:
- [ ] Create `Wave.js` model (waveNumber, difficulty, monstersRemaining, isActive)
- [ ] Create `Monster.js` model (health, maxHealth, damageToPlayer, resourceReward)
- [ ] Create `waveController.js` with endpoints:
  - `POST /api/waves/start` - Start a new wave
  - `GET /api/waves/current` - Get current wave info
  - `POST /api/waves/attack-monster` - Attack current monster
- [ ] Implement wave progression (harder each wave)
- [ ] Monster drops resources when defeated

### Files to create:
- `backend/models/Wave.js`
- `backend/models/Monster.js`
- `backend/controllers/waveController.js`
- `backend/routes/waveRoutes.js`

---

## **Person 3: UI/UX Improvements**

### Tasks:
- [ ] Create `MonsterDisplay.jsx` component to show current monster
- [ ] Create `WaveInfo.jsx` component to show wave progress
- [ ] Add CSS/styling for better game appearance
- [ ] Create `ActionBar.jsx` for ability buttons
- [ ] Add responsive design for mobile
- [ ] Create sound effects (optional)

### Files to create:
- `forntend/src/components/MonsterDisplay.jsx`
- `forntend/src/components/WaveInfo.jsx`
- `forntend/src/components/ActionBar.jsx`
- `forntend/src/styles/game.css` (if needed)

---

## **Integration Checklist**

- [ ] All endpoints tested with Postman/Thunder Client
- [ ] No console errors in browser DevTools
- [ ] MongoDB storing data correctly
- [ ] Game loop works smoothly
- [ ] No memory leaks
- [ ] Code follows consistent naming conventions

---

## **Communication**

- Use Discord/Slack for real-time questions
- Comment your code with explanations
- Make small commits with clear messages
- Test your changes before pushing
