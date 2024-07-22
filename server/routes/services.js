// backend/routes/services.js

const express = require('express');
const router = express.Router();
const dockerService = require('../services/dockerService');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// List of available services
const availableServices = [
    { name: 'ubuntu', image: 'kasmweb/ubuntu-bionic-desktop:1.10.0-rolling' },
    { name: 'chrome', image: 'kasmweb/chrome:1.14.0' }
];

// Endpoint to get available services
router.get('/', (req, res) => {
    res.json(availableServices);
});

router.post('/start', async (req, res) => {
    const { image, user } = req.body;
    console.log(req.body)
    const userId = jwt.decode(user).userId
    try {
        console.log(image, userId);
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: { running: image } },
                { new: true }
            ).exec(); 
        
            // Success, use updatedUser if needed
            console.log(updatedUser);
        } catch (err) {
            // Handle error
            console.error(err);
        }
        const container = await dockerService.startContainer(image, userId);
        res.status(200).json(container);
    } catch (error) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: { running: 'N/A' } },
                { new: true }
            ).exec();
        
            // Success, use updatedUser if needed
            console.log(updatedUser);
        } catch (err) {
            // Handle error
            console.error(err);
        }
        res.status(500).json({ message: 'Failed to start service.', error });
    }
});

router.post('/stop', async (req, res) => {
    const { containerId } = req.body;
    try {
        await dockerService.stopContainer(containerId);
        res.status(200).json({ message: 'Service stopped successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to stop service.', error });
    }
});

module.exports = router;
