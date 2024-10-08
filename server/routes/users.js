// backend/routes/users.js

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists.' });
        }
        user = new User({ username, password });
        // console.log(user)
        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !user.validPassword(password)) {
            // console.log(user);
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        // const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role,
                password: user.password
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json(token);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.get('/all-users', async (req, res) => {
    try {
        const allUsers = await User.find({}).select('-password');
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve all users.', error });
    }
});

router.post('/login-as-admin', async (req, res) => {
    const adminUsername = 'admin';
    const adminPassword = 'admin';

    try {
        let adminUser = await User.findOne({ username: adminUsername });

        if (!adminUser) {
            adminUser = new User({ username: adminUsername, password: adminPassword, role: 'admin' });
            await adminUser.save();
        }

        const token = jwt.sign(
            {
                userId: adminUser._id,
                username: adminUser.username,
                role: adminUser.role,
                password: adminUser.password
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({ message: 'Failed to login as admin.', error });
    }
});

module.exports = router;
