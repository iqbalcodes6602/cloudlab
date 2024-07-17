// backend/routes/services.js

const express = require('express');
const router = express.Router();
const dockerService = require('../services/dockerService');

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
    const { image } = req.body;
    try {
        console.log(image);
        const container = await dockerService.startContainer(image);
        res.status(200).json(container);
    } catch (error) {
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
