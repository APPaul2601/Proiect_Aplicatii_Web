const User = require('../models/user');
const Progress = require('../models/Progress');
const PlayerStats = require('../models/PlayerStats');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Create user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // 2. Create Progress record automatically
        const progress = new Progress({
            user: newUser._id,
            resources: { wood: 0, stone: 0, food: 0, gold: 0 },
            clicks: 0,
            castleHp: 100,
            castleLevel: 1
        });
        await progress.save();

        // 3. Create PlayerStats record automatically
        const stats = new PlayerStats({
            user: newUser._id,
            damagePerClick: 1
        });
        await stats.save();

        res.status(201).json({ message: 'User created! Progress and stats initialized.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'User nu exista' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ error: 'Parola incorecta' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};