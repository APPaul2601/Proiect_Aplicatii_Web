# 🔧 Git Commands Reference

**Keep this handy during development!**

---

## **FIRST TIME SETUP (Do This Once)**

### Clone the repository (first time only)
```bash
git clone <repository-url>
cd Proiect_Aplicatii_Web
```

### Configure your git (first time only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## **DAILY WORKFLOW**

### **Start of Day: Pull Latest Code**
```bash
# Make sure you're on main branch
git checkout main

# Get latest changes from GitHub
git pull origin main
```

### **Create Feature Branch (for each feature)**
```bash
# Create a new branch for your work
git checkout -b mvp-clicker

# Or shorter version
git checkout -b <branch-name>
```

**Branch naming examples:**
```
mvp-clicker
feature/click-system
fix/api-endpoint
person1-backend
person2-frontend
```

---

## **DURING DEVELOPMENT**

### **Check what files changed**
```bash
git status
```

### **See changes in detail**
```bash
git diff
```

### **Add files to staging**
```bash
# Add specific file
git add backend/controllers/progressController.js

# Add all changes
git add .

# Add all files of one type
git add backend/
git add forntend/
```

### **Commit your work (DO THIS OFTEN!)**
```bash
# Commit with message
git commit -m "Person 1: Create Progress model and click endpoint"

# Good commit messages:
git commit -m "Add castle click endpoint"
git commit -m "Create Building and Upgrade models"
git commit -m "Update GameUI with click button"
git commit -m "Fix: API not connecting to backend"
git commit -m "Polish: Add progress bar styling"
```

### **Push to GitHub**
```bash
# Push your branch
git push origin mvp-clicker

# Or if it's new
git push -u origin mvp-clicker
```

---

## **CHECKING YOUR WORK**

### **See commit history**
```bash
# See last 10 commits on current branch
git log --oneline

# See all branches and commits
git log --oneline --graph --all

# Exit log view
press q
```

### **See what's different between branches**
```bash
git diff main mvp-clicker
```

### **Check which branch you're on**
```bash
git branch

# Shows all branches with * on current
# Example output:
# main
# * mvp-clicker
# person1-backend
```

---

## **SWITCHING BRANCHES**

### **Switch to different branch**
```bash
git checkout main
git checkout mvp-clicker
```

### **Create AND switch in one command**
```bash
git checkout -b new-feature-name
```

---

## **MERGING (End of Sprint)**

### **Merge branch into main**
```bash
# 1. Switch to main
git checkout main

# 2. Make sure main is up to date
git pull origin main

# 3. Merge your branch
git merge mvp-clicker

# 4. Push merged code to GitHub
git push origin main
```

### **Delete a branch (after merging)**
```bash
# Delete locally
git branch -d mvp-clicker

# Delete on GitHub
git push origin --delete mvp-clicker
```

---

## **COMMON SCENARIOS**

### **Scenario 1: You forgot to push your work**
```bash
# Check what you have locally
git status

# Push it now
git push origin mvp-clicker
```

### **Scenario 2: Someone else pushed changes**
```bash
# Update your local code
git pull origin main
```

### **Scenario 3: You made a mistake in your last commit**
```bash
# Change the commit message
git commit --amend -m "New message"

# Add more files to last commit
git add .
git commit --amend --no-edit

# Then force push (careful!)
git push origin mvp-clicker --force
```

### **Scenario 4: You want to see what the other person did**
```bash
# See their commits
git log --oneline origin/person2-frontend

# See what they changed
git diff main origin/person2-frontend
```

### **Scenario 5: MERGE CONFLICT (Both edited same file)**
```bash
# Pull to see the conflict
git pull origin main

# Open the conflicting file and manually fix it
# Look for sections like:
# <<<<<<< HEAD
# your code
# =======
# their code
# >>>>>>> branch-name

# After fixing, add and commit
git add .
git commit -m "Fix: Resolve merge conflict"
git push origin mvp-clicker
```

---

## **TEAM WORKFLOW (2 PEOPLE)**

### **At Start of Day:**
```bash
# Both do this
git checkout main
git pull origin main
```

### **Person 1 starts backend:**
```bash
git checkout -b mvp-backend
# ... code ...
git add backend/
git commit -m "Person 1: Backend endpoints"
git push origin mvp-backend
```

### **Person 2 starts frontend (parallel):**
```bash
git checkout -b mvp-frontend
# ... code ...
git add forntend/
git commit -m "Person 2: Game UI"
git push origin mvp-frontend
```

### **At End of Day (Merge both):**
```bash
# Person 1
git checkout main
git pull origin main
git merge mvp-backend
git push origin main

# Person 2
git checkout main
git pull origin main  # Get Person 1's changes
git merge mvp-frontend
git push origin main
```

---

## **HELPFUL ALIASES (Optional)**

Add these to make commands faster:

```bash
# Add these to your .gitconfig or use them directly

# See status short version
git status -s

# Quick log
git log --oneline -10

# See all branches
git branch -a

# Quick checkout to main
git checkout main

# Pull and update
git pull origin main
```

---

## **EMERGENCY COMMANDS**

### **UNDO: Remove uncommitted changes**
```bash
# Discard changes in one file
git checkout -- backend/models/Progress.js

# Discard ALL changes
git reset --hard HEAD
# WARNING: This deletes all unsaved work!
```

### **UNDO: Remove a commit**
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (delete changes)
git reset --hard HEAD~1
# WARNING: This deletes the commit!
```

### **See deleted commits (last hope!)**
```bash
git reflog
```

---

## **IMPORTANT RULES**

✅ **DO:**
- Commit often (every 30 minutes of work)
- Push before end of day
- Pull before starting work
- Use clear commit messages
- Use feature branches (never push directly to main)

❌ **DON'T:**
- `git push --force` (unless you know what you're doing)
- Commit without testing
- Push broken code
- Edit main branch directly
- Ignore merge conflicts

---

## **Commit Message Examples**

**Good:**
```
git commit -m "Add click endpoint for castle"
git commit -m "Create Building and Upgrade models"
git commit -m "Connect frontend to API"
git commit -m "Fix: Castle completion not saving"
git commit -m "Add progress bar UI"
```

**Bad:**
```
git commit -m "stuff"
git commit -m "fix"
git commit -m "update"
git commit -m "asdfjkl"
```

**Format:** `[Action]: [What you did]`

---

## **QUICK REFERENCE CARD**

```
SETUP:
git clone <url>
git config --global user.name "Name"

DAILY:
git checkout main
git pull origin main
git checkout -b feature-name

WORKING:
git status
git add .
git commit -m "message"
git push origin feature-name

END OF DAY:
git checkout main
git pull origin main
git merge feature-name
git push origin main

EMERGENCY:
git log --oneline
git diff
git reset --hard HEAD
```

---

## **If You're Stuck**

| Problem | Command |
|---------|---------|
| Don't know what changed? | `git status` |
| See detailed changes? | `git diff` |
| See commit history? | `git log --oneline` |
| What branch am I on? | `git branch` |
| Someone else's changes? | `git pull origin main` |
| Want to undo? | `git reset --soft HEAD~1` |
| EVERYTHING is broken? | `git reset --hard origin/main` |

---

## **Ask These Questions:**

1. **What branch am I on?** → `git branch`
2. **What did I change?** → `git status`
3. **Is it on GitHub?** → `git log --oneline`
4. **Did they push changes?** → `git pull origin main`

---

**Save this file and refer to it anytime you need git help!** 📚

Print it out or keep it in a tab. **You've got this!** 💪