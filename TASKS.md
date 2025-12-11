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
- [ ] Create smooth animations

### Files to create:
- `forntend/src/components/MonsterDisplay.jsx`
- `forntend/src/components/WaveInfo.jsx`
- `forntend/src/components/ActionBar.jsx`
- `forntend/src/styles/game.css`

---

## **Person 4: Building/Shop System**

### Tasks:
- [ ] Create `Building.js` model (type, cost, effect, level)
- [ ] Create `buildingController.js` with endpoints:
  - `GET /api/buildings` - Get all available buildings
  - `POST /api/buildings/buy` - Buy/upgrade a building
  - `GET /api/player/buildings` - Get player's buildings
- [ ] Implement cost scaling (buildings get more expensive to upgrade)
- [ ] Buildings increase damage, AP regen, or resource generation
- [ ] Create `ShopUI.jsx` component to display buildings

### Files to create:
- `backend/models/Building.js`
- `backend/controllers/buildingController.js`
- `backend/routes/buildingRoutes.js`
- `forntend/src/components/ShopUI.jsx`

### Building Ideas:
- **Archer Tower:** +1 damage per click
- **Training Grounds:** +1 max action points
- **Farm:** +1 food/second
- **Mine:** +1 gold/second

---

## **Integration Checklist**

- [ ] All endpoints tested with Postman/Thunder Client
- [ ] No console errors in browser DevTools
- [ ] MongoDB storing data correctly
- [ ] Game loop works smoothly
- [ ] No memory leaks
- [ ] Code follows consistent naming conventions
- [ ] All 4 systems work together seamlessly

---

## **Git Workflow**

1. Create a **branch** for your feature:
   ```bash
   git checkout -b person1-action-points
   git checkout -b person2-waves
   git checkout -b person3-ui
   git checkout -b person4-buildings
   ```

2. **Commit regularly:**
   ```bash
   git add .
   git commit -m "Add action points regeneration"
   ```

3. **Push your branch:**
   ```bash
   git push origin person1-action-points
   ```

4. **Create Pull Request** on GitHub for review

---

## **Communication**

- Use Discord/Slack for real-time questions
- Comment your code with explanations
- Make small commits with clear messages
- Test your changes before pushing
- Do code reviews for other team members