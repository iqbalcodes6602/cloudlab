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
        description: 'A full Ubuntu desktop environment for development, testing, and general use. It includes a wide range of pre-installed tools and applications to facilitate software development and system administration tasks.',
        pic: 'https://ubuntu.com/wp-content/uploads/a9c1/Screenshot-from-2022-04-18-13-05-17-min.png'
    },
    {
        name: 'Chrome',
        image: 'kasmweb/chrome:1.14.0',
        description: 'Google Chrome browser for secure and efficient web browsing. It provides a fast, simple, and secure browsing experience with support for the latest web standards and technologies.',
        pic: 'https://www.google.com/chrome/static/images/intl/en_AU/homepage/fast/mobile-xp/fast-mobile_desktop.png',
    },
    {
        name: 'VS Code',
        image: 'kasmweb/vs-code:1.14.0',
        description: 'Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS, and Linux. It comes with built-in support for JavaScript, TypeScript, and Node.js and has a rich ecosystem of extensions for other languages and runtimes.',
        pic: 'https://education.launchcode.org/lchs/_images/vscode-welcome.png'
    },
    {
        name: 'Windows',
        image: 'dockurr/windows',
        description: 'A virtualized Windows 10 environment for development, testing, and general use. It includes a wide range of pre-installed tools and applications to facilitate software development and system administration tasks.',
        pic: 'https://i.ytimg.com/vi/OuNf9p2_nJ0/maxresdefault.jpg'
    },
    {
        name: 'Blender',
        image: 'kasmweb/blender:1.14.0',
        description: 'Blender is a free and open-source 3D creation suite. It supports the entirety of the 3D pipeline—modeling, rigging, animation, simulation, rendering, compositing, motion tracking, and video editing.',
        pic: 'https://blenderartists.org/uploads/default/original/4X/d/6/3/d6376346ec38ed339bf5a10411348f255793804b.jpg'
    },
    {
        name: 'Pinta',
        image: 'kasmweb/pinta:1.14.0',
        description: 'Pinta is a free, open-source drawing/editing program modeled after Paint.NET. Its goal is to provide a simplified alternative to GIMP for casual users.',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pinta-1-4-screenshot.png/220px-Pinta-1-4-screenshot.png'
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
    const userId = jwt.decode(user).userId;

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

        const { hostPort, containerName, containerId } = container;

        if (!container || !hostPort || !containerName || !containerId) {
            throw new Error('Problem starting service, missing container details.');
        }

        res.status(200).json(container);
    } catch (error) {
        try {
            await User.findByIdAndUpdate(
                userId,
                { $set: { running: false, serviceId: 'N/A' } },
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
    // const ownerId = jwt.decode(userId).userId
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
