// backend/routes/services.js

const express = require('express');
const router = express.Router();
const dockerService = require('../services/dockerService');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Service = require('../models/Service');

// List of available services
const availableServices = [
    { name: 'ubuntu', image: 'kasmweb/ubuntu-bionic-desktop:1.10.0-rolling' },
    { name: 'chrome', image: 'kasmweb/chrome:1.14.0' }
];

const ifRunning = async (userId) => {
    const user = await User.findById(userId);
    if (user.running) {
        return true;
    } else {
        return false;
    }
}

// Endpoint to get available services
router.get('/', (req, res) => {
    res.json(availableServices);
});

router.post('/start', async (req, res) => {
    const { image, user } = req.body;
    const userId = jwt.decode(user).userId
    
    if (await ifRunning(userId)) {
        return res.status(400).json({ message: 'Service already running.' });
    }
    
    try {
        try {
            await User.findByIdAndUpdate(
                userId,
                { $set: { running: true } },
                { new: true }
            ).exec();

        } catch (err) {
            // Handle error
            console.error(err);
        }
        const container = await dockerService.startContainer(image, userId);
        res.status(200).json(container);
    } catch (error) {
        try {
            await User.findByIdAndUpdate(
                userId,
                { $set: { running: false, serviceId: 'N/A' }, },
                { new: true }
            ).exec();

        } catch (err) {
            // Handle error
            console.error(err);
        }
        res.status(500).json({ message: 'Failed to start service.', error });
    }
});

router.post('/stop', async (req, res) => {
    const { userId } = req.body;
    const ownerId = jwt.decode(userId).userId
    try {
        // Find the user by userId
        const user = await User.findById(ownerId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the user has a serviceId
        if (user.serviceId === 'N/A') {
            return res.status(400).json({ message: 'No service to stop for this user.' });
        }

        // Find the service by serviceId from the user schema
        const service = await Service.findById(user.serviceId);
        if (!service) {
            // If service not found, set user's serviceId to 'N/A'
            user.running = true;
            user.serviceId = 'N/A';
            await user.save();
            return res.status(404).json({ message: 'Service not found.' });
        }

        // Stop the container using the containerId from the service schema
        await dockerService.stopContainer(service.containerId);

        // Delete the service record
        await Service.findByIdAndDelete(service._id);

        // Set the user's serviceId to 'N/A'
        user.running = false;
        user.serviceId = 'N/A';
        await user.save();

        res.status(200).json({ message: 'Service stopped and record deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to stop service.', error });
    }
});

module.exports = router;
