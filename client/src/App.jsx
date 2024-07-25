// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Landing from './Landing';

const App = () => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [serviceStates, setServiceStates] = useState({}); // Initialize serviceStates as an object

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUser(token)
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
        const initialStates = response.data.reduce((acc, service) => {
          acc[service.image] = { buttonShow: false, port: 0 };
          return acc;
        }, {});
        setServiceStates(initialStates);
      } catch (error) {
        setMessage('Failed to load services.');
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const isRunning = async () => {
      try {
        console.log(user);
        const response = await axios.post('http://localhost:5000/api/services/running', { user });

        if (response.status === 200) {
          // Update state for the specific service
          setServiceStates(prev => ({
            ...prev,
            [response.data.image]: { buttonShow: true, port: response.data.hostPort },
          }));
          setMessage(`Service already running.`);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    if (user) isRunning();
  }, [user]);


  const startService = async (serviceName, image) => {
    try {
      console.log(serviceName, image)
      const response = await axios.post('http://localhost:5000/api/services/start', { image, user });
      // Update state for the specific service
      setServiceStates(prev => ({
        ...prev,
        [image]: { buttonShow: true, port: response.data.hostPort },
      }));
      setMessage(`Service ${serviceName} started.`);
    } catch (error) {
      setMessage(`Failed to start service: ${error.response.data.message}`);
    }
  };

  const stopService = async (serviceName, image) => {
    try {
      await axios.post('http://localhost:5000/api/services/stop', { userId: user });
      // Update state to hide the button for the specific service
      setServiceStates(prev => ({
        ...prev,
        [image]: { ...prev[image], buttonShow: false },
      }));
      setMessage('Service stopped successfully.');
    } catch (error) {
      setMessage(`Failed to stop service: ${error.response.data.message}`);
    }
  };

  return (
    <div>
      <h1>Service Dashboard</h1>
      <div>
        {user ? (
          <div>
            <h2>Welcome, {user.username}</h2>
            <button onClick={() => { console.log(user) }}>check user</button>
            <div>
              <button onClick={() => {
                localStorage.removeItem('token')
                setUser(null)
              }
              }>Logout</button>
            </div>
            <div>
              <h3>Available Services</h3>
              {services.map(service => (
                <div key={service.name}>
                  <button onClick={() => startService(service.name, service.image)}>
                    Start {service.name}
                  </button>
                  <button onClick={() => stopService(service.name, service.image)}>
                    Stop {service.name}
                  </button>
                  {serviceStates[service.image]?.buttonShow && (
                    <a href={`https://localhost:${serviceStates[service.image].port}`} target="_blank" rel="noopener noreferrer">
                      Access Service
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Landing user={user} setUser={setUser} />
        )}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
