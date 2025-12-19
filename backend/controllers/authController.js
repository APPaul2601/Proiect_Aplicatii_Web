const User = require("../models/auth/User");
const Progress = require("../models/game/Progress");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.register = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    const userExists = await User.findOne({ username }).session(session);
    if (userExists) {
      await session.abortTransaction();
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save({ session });

    const progress = new Progress({
      user: user._id,
      castleProgress: 0,
      castleStage: 1,
      castleCompleted: false,
      clickPower: 1,
      resources: {
        gold: 0,
        wood: 0,
        stone: 0,
        wheat: 0,
      },
      buildings: [],
      upgrades: [],
      unlockedUpgrades: ["sharper_sword", "stronger_swing"],
      totalClicks: 0,
    });
    await progress.save({ session });

    await session.commitTransaction();

    res.json({
      message: "User registered successfully",
      user: { id: user._id, username },
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Register error:", error.message);
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
