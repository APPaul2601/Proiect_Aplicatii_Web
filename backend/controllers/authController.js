// ============================================
// AUTH CONTROLLER - User Registration & Login
// ============================================
// Handles user account creation and authentication
// Passwords are encrypted with bcrypt
// Returns JWT tokens for authenticated requests

const User = require("../models/User"); // User model
const Progress = require("../models/Progress"); // Player progress
const PlayerStats = require("../models/Building"); // Player stats
const bcrypt = require("bcryptjs"); // Password encryption
const jwt = require("jsonwebtoken"); // Token generation

// ===== REGISTER: Create new user account =====
// POST /api/auth/register
// Body: { username, password }
// Returns: { message, or error }
exports.register = async (req, res) => {
  const { username, password } = req.body; // Get username & password from request

  try {
    // STEP 1: Hash the password (encrypt it)
    // Never store plain text passwords!
    const salt = await bcrypt.genSalt(10); // Generate random salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password with salt

    // STEP 2: Create and save the User
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save(); // Save to database

    // STEP 3: Create Progress record automatically
    // When user registers, create empty game state
    const progress = new Progress({
      user: newUser._id, // Link to this user
      resources: { wood: 0, stone: 0, food: 0, gold: 0 }, // Start with 0 resources
      clicks: 0, // Start with 0 clicks
      castleHp: 100, // Start at full health
      castleLevel: 1, // Start at level 1
    });
    await progress.save();

    // STEP 4: Create PlayerStats record automatically
    const stats = new PlayerStats({
      user: newUser._id, // Link to this user
      damagePerClick: 1, // Start with 1 damage per click
    });
    await stats.save();

    // STEP 5: Return success message
    res
      .status(201) // 201 = Created
      .json({ message: "User created! Progress and stats initialized." });
  } catch (err) {
    // If username already exists or other error
    res.status(400).json({ error: err.message });
  }
};

// ===== LOGIN: Authenticate user and return token =====
// POST /api/auth/login
// Body: { username, password }
// Returns: { token } or { error }
exports.login = async (req, res) => {
  const { username, password } = req.body; // Get username & password from request

  try {
    // STEP 1: Find user in database
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User nu exista" }); // User not found

    // STEP 2: Check if password is correct
    // Compare plain text password with hashed password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Parola incorecta" }); // Wrong password

    // STEP 3: Create JWT token (lasts 1 hour)
    // Token includes user ID
    // Frontend will send this token with every request
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires after 1 hour
    });

    // STEP 4: Return token to user
    res.json({ token }); // Frontend stores this token
  } catch (err) {
    res.status(500).json({ error: err.message }); // Server error
  }
};
