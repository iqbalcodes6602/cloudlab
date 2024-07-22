const Docker = require('dockerode');
const docker = new Docker();
const net = require('net');
const User = require('../models/User');
const Service = require('../models/Service'); // Import the Service model

// Function to check if a port is available
const checkPortAvailability = (port) => {
    return new Promise((resolve, reject) => {
        const server = net.createServer();

        server.listen(port, () => {
            server.close();
            resolve(true); // Port is available
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(false); // Port is in use
            } else {
                reject(err); // Other error
            }
        });
    });
};

// Function to find an available port starting from a base port
const findAvailablePort = async (startPort) => {
    let port = startPort;
    while (true) {
        const isAvailable = await checkPortAvailability(port);
        if (isAvailable) {
            return port;
        }
        port++;
    }
};

const startContainer = async (image, userId) => {
    // console.log(`Starting container for service: ${image}`);
    const basePort = 6901; // Starting port to check for availability
    const availablePort = await findAvailablePort(basePort);
    const containerName = 'chrome_' + Date.now().toString();

    const container = await docker.createContainer({
        Image: image,
        name: containerName,
        Tty: true,
        ExposedPorts: { '6901/tcp': {} },
        HostConfig: {
            ShmSize: 512 * 1024 * 1024,
            PortBindings: { '6901/tcp': [{ HostPort: `${availablePort}` }] }, // Use available port
        },
        Env: ['VNC_PW=password'],
    });
    await container.start();

    const containerInfo = await container.inspect();
    const hostPort = containerInfo.NetworkSettings.Ports['6901/tcp'][0].HostPort;
    // console.log(`Container started. Access it on https://localhost:${hostPort} with VNC_PW=password`);

    // Access container ID
    const containerId = container.id;

    // Create a new Service document
    const service = new Service({
        image: image,
        containerName: containerName,
        containerId: containerId,
        port: hostPort,
    });
    await service.save();

    // Update the User document
    try {
        await User.findByIdAndUpdate(userId, {
            $set: { running: true, serviceId: service._id },
        }, { new: true }).exec();
    } catch (err) {
        console.error(err);
        await User.findByIdAndUpdate(userId, {
            $set: { running: false, serviceId: 'N/A' },
        }, { new: true }).exec();
    }

    return { container, hostPort, containerName, containerId }; // Return container details
};

const stopContainer = async (containerId) => {
    const container = docker.getContainer(containerId);
    await container.stop();
    await container.remove();
};

module.exports = { startContainer, stopContainer };