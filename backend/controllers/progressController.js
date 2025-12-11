const Progress = require('../models/Progress');
const PlayerStats = require('../models/PlayerStats');

// Get progres + stats pentru un user
exports.getPlayerData = async (req, res) => {
  try {
    const userId = req.user.id; // obținut din JWT în authMiddleware

    const progress = await Progress.findOne({ user: userId });
    const stats = await PlayerStats.findOne({ user: userId });

    res.json({ progress, stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update progres + stats pentru un user
exports.updatePlayerData = async (req, res) => {
  try {
    const userId = req.user.id;
    const { progressData, statsData } = req.body;

    // Update progres
    const progress = await Progress.findOneAndUpdate(
      { user: userId },
      progressData,
      { new: true, upsert: true } // creează dacă nu există
    );

    // Update stats
    const stats = await PlayerStats.findOneAndUpdate(
      { user: userId },
      statsData,
      { new: true, upsert: true }
    );

    res.json({ progress, stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
