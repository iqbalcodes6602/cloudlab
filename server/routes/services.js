// backend/routes/services.js

const express = require('express');
const router = express.Router();
const dockerService = require('../services/dockerService');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Service = require('../models/Service');

// List of available services
const availableServices = [
    {
        name: 'Ubuntu',
        image: 'kasmweb/ubuntu-bionic-desktop:1.10.0-rolling',
        description: 'A full Ubuntu desktop environment for development, testing, and general use. It includes a wide range of pre-installed tools and applications to facilitate software development and system administration tasks.'
    },
    {
        name: 'Chrome',
        image: 'kasmweb/chrome:1.14.0',
        description: 'Google Chrome browser for secure and efficient web browsing. It provides a fast, simple, and secure browsing experience with support for the latest web standards and technologies.'
    },
    {
        name: 'VS Code',
        image: 'kasmweb/code:1.60.0',
        description: 'Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS, and Linux. It comes with built-in support for JavaScript, TypeScript, and Node.js and has a rich ecosystem of extensions for other languages and runtimes.'
    },
    {
        name: 'Brave',
        image: 'kasmweb/brave:1.29.0',
        description: 'Brave is a free and open-source web browser developed by Brave Software, Inc. based on the Chromium web browser. It blocks ads and website trackers by default and provides a way for users to send cryptocurrency contributions in the form of Basic Attention Tokens to websites and content creators.'
    },
    {
        name: 'Windows',
        image: 'kasmweb/windows10:1.0.0',
        description: 'A virtualized Windows 10 environment for development, testing, and general use. It includes a wide range of pre-installed tools and applications to facilitate software development and system administration tasks.'
    },
    {
        name: 'Postman',
        image: 'kasmweb/postman:8.0.7',
        description: 'Postman is a collaboration platform for API development. It simplifies each step of building an API and streamlines collaboration so you can create better APIs faster. It provides a powerful GUI for making HTTP requests and viewing responses.'
    }
];

const isRunning = async (userId) => {
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

router.post('/running', async (req, res) => {
    const { user } = req.body;
    // console.log(user)
    const userId = jwt.decode(user).userId;

    if (isRunning(userId)) {
        try {
            const service = await Service.findOne({ owner: userId });
            if (service) {
                return res.status(200).json({ message: 'Service already running.', image: service.image, hostPort: service.port });
            } else {
                return res.status(201).json({ message: 'Service not found.' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    } else {
        return res.status(400).json({ message: 'Service not running.' });
    }
});

router.post('/start', async (req, res) => {
    const { image, serviceName, user } = req.body;
    const userId = jwt.decode(user).userId

    if (await isRunning(userId)) {
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
        const container = await dockerService.startContainer(image, serviceName, userId);
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
    const ownerId = userId
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

router.get('/running-services', async (req, res) => {
    try {
        const allServices = await Service.find({});
        res.status(200).json(allServices);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve running services.', error });
    }
});


module.exports = router;
