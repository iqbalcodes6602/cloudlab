// backend/services/dockerService.js

const Docker = require('dockerode');
const docker = new Docker();

const net = require('net');

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

const startContainer = async (image) => {
    console.log(`Starting container for service: ${image}`);
    const basePort = 6901; // Starting port to check for availability
    const availablePort = await findAvailablePort(basePort);

    const container = await docker.createContainer({
        Image: image,
        name: 'chrome_' + Date.now().toString(),
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
    console.log(`Container started. Access it on https://localhost:${hostPort} with VNC_PW=password`);

    return {container, hostPort};
};

const stopContainer = async (containerId) => {
    const container = docker.getContainer(containerId);
    await container.stop();
    await container.remove();
};

module.exports = { startContainer, stopContainer };
