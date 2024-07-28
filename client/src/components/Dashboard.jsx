import React, { useState, useEffect } from 'react';
import axios from 'axios';
import blogBanner1 from "../assets/blog-banner-1.png";

import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog"
import HowItWorks from './HowItWorks';

function Dashboard({ user, setUser }) {
    const [services, setServices] = useState([]);
    const [message, setMessage] = useState('');
    const [serviceStates, setServiceStates] = useState({}); // Initialize serviceStates as an object

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
                const response = await axios.post('http://localhost:5000/api/services/running', { user });

                if (response.status === 200) {
                    setServiceStates(prev => ({
                        ...prev,
                        [response.data.image]: { buttonShow: true, port: response.data.hostPort },
                    }));
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        };

        if (user) isRunning();
    }, [user]);

    const startService = async (serviceName, image) => {
        try {
            const response = await axios.post('http://localhost:5000/api/services/start', { image, user });
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
            <section className="blog" id="blog">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <h2 className="h2 section-title" style={{ marginBottom: '0' }}>Welcome to Service Dashboard</h2>
                        <div className='flex gap-5'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary">How It Works</Button>
                                </DialogTrigger>
                                <DialogContent className="w-[auto]">
                                    <HowItWorks />
                                </DialogContent>
                            </Dialog>

                            <button onClick={() => {
                                localStorage.removeItem('token');
                                setUser(null);
                            }}
                                style={{ backgroundColor: '#ff4545', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <p style={{ margin: '40px 0px', lineHeight: '1.4', color: 'hsl(212, 17%, 61%)' }}>
                        Dive into the comprehensive suite of virtual environment solutions offered by CloudLab, meticulously engineered accommodate a wide spectrum of needs and amplify productivity across diverse sectors.
                    </p>

                    {Object.values(serviceStates).some(state => state.buttonShow) && (
                        <div className="running-service" style={{ "display": "flex", "padding": "10px 10px", "border": "1px solid rgb(195 225 255)", "marginBottom": "20px", "borderRadius": "5px", "justifyContent": "space-between", alignItems: 'center', backgroundColor: 'hsl(212, 100%, 98%)' }}>
                            <p style={{ color: 'rgb(31 143 255)' }} >You have a service running.</p>
                            {services.map(service => (
                                serviceStates[service.image]?.buttonShow && (
                                    <div key={service.name} style={{ display: 'flex' }}>
                                        <a style={{ backgroundColor: '#2ac3b4', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginRight: '20px' }} href={`https://localhost:${serviceStates[service.image].port}`} target="_blank" rel="noopener noreferrer">
                                            Access {service.name}
                                        </a>
                                        <button style={{ backgroundColor: '#0077ff', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => stopService(service.name, service.image)}>
                                            Stop {service.name}
                                        </button>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                    <ul className="blog-list">
                        {services.map(service => (
                            <li key={service.name}>
                                <div className="blog-card">
                                    <figure className="blog-banner">
                                        <img src={blogBanner1} alt="Ubuntu Workspace" />
                                    </figure>
                                    <div style={{ padding: '0px 10px' }}>
                                        <span className="blog-link-btn" style={{ justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <h3 className="blog-title">{service.name}</h3>
                                            {serviceStates[service.image]?.buttonShow ? (
                                                <a href={`https://localhost:${serviceStates[service.image].port}`} target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', color: '#2ac3b4' }}>
                                                    Access Service
                                                </a>
                                            ) : (
                                                <span onClick={() => startService(service.name, service.image)} style={{ cursor: 'pointer' }}>Start</span>
                                            )}
                                        </span>
                                        <p className="blog-text">{service.description}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Dashboard;
