import React, { useState, useEffect } from 'react';
import axios from 'axios';
import blogBanner1 from "../assets/blog-banner-1.png";

import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog"

import { ToastAction } from "./ui/toast"
import { useToast } from "./ui/use-toast"

import HowItWorks from './HowItWorks';
import { LoaderCircle } from 'lucide-react';
import Footer from './Footer';

function Dashboard({ user, setUser, userDetails, setUserDetails }) {
    const { toast } = useToast()

    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [serviceStates, setServiceStates] = useState({});

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
                console.log('Failed to load services.');
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
                toast({
                    variant: "destructive",
                    title: 'Error fetching running service. Please Reload.',
                    description: error.response.data.message,
                })
            }
        };

        if (user) isRunning();
    }, [user]);

    const startService = async (serviceName, image) => {
        try {
            const response = await axios.post('http://localhost:5000/api/services/start', { image, serviceName, user, });
            setServiceStates(prev => ({
                ...prev,
                [image]: { buttonShow: true, port: response.data.hostPort },
            }));
            console.log(`Service ${serviceName} started.`);
            toast({
                variant: "success",
                title: serviceName + ' started successfully.',
                description: "Access the service by clicking on the 'Access Service' button.",
                action: <ToastAction altText="Access"><a className='' href={`https://localhost:${response.data.hostPort}`} target="_blank" rel="noopener noreferrer">Access Service</a></ToastAction>,
            })
        } catch (error) {
            console.log(`Failed to start service: ${error.response.data.message}`);
            toast({
                variant: "destructive",
                title: serviceName + ' failed to start.',
                description: error.response.data.message,
            })
        }
    };

    const stopService = async (serviceName, image) => {
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/services/stop', { userId: userDetails.userId });
            setServiceStates(prev => ({
                ...prev,
                [image]: { ...prev[image], buttonShow: false },
            }));
            console.log('Service stopped successfully.');
            toast({
                variant: "success",
                title: serviceName + ' stopped successfully.',
                description: 'You can start the service again by clicking on the "Start" button.',
            })
            setLoading(false);
        } catch (error) {
            console.log(`Failed to stop service: ${error.response.data.message}`);
            toast({
                variant: "destructive",
                title: serviceName + ' failed to stop.',
                description: error.response.data.message,
            })
            setLoading(false);
        }
    };

    const logOut = async () => {
        setServiceStates({});
        setUser(null);
        setUserDetails(null);
        localStorage.removeItem('token');

        try {
            await axios.post('http://localhost:5000/api/services/stop', { userId: user });
        } catch (error) {
            console.error('Error stopping service:', error);
        }
    }

    return (
        <div>
            <section className="blog" id="blog">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <h2 className="h2 section-title" style={{ marginBottom: '0' }}>
                            Welcome to Service Dashboard
                        </h2>
                        <div className='flex gap-5'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary">How It Works</Button>
                                </DialogTrigger>
                                <DialogContent className="w-[auto]">
                                    <HowItWorks />
                                </DialogContent>
                            </Dialog>

                            <Button onClick={() => {
                                logOut()
                            }}
                                variant="destructive"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                    <p style={{ margin: '40px 0px', lineHeight: '1.4', color: 'hsl(212, 20%, 61%)' }}>
                        Dive into the comprehensive suite of virtual environment solutions offered by CloudLab, meticulously engineered accommodate a wide spectrum of needs and amplify productivity across diverse sectors.
                        <br />
                        Use the these credentials to access the services:
                        <br />
                        <br />
                        Service Username: <strong className='text-gray-600'> kasm_user</strong>
                        <br />
                        Service Password: <strong className='text-gray-600 italic'> [your username]_[your password] </strong>
                        <br />
                        Example: If your username is 'john' and password is 'doe', then the service password will be 'john_doe'.
                    </p>

                    {Object.values(serviceStates).some(state => state.buttonShow) && (
                        <div className="running-service" style={{ "display": "flex", "padding": "10px 10px", "border": "1px solid rgb(195 225 255)", "marginBottom": "20px", "borderRadius": "5px", "justifyContent": "space-between", alignItems: 'center', backgroundColor: 'hsl(212, 100%, 98%)' }}>
                            <p style={{ color: 'rgb(31 143 255)' }} >You have a service running.</p>
                            {services.map(service => (
                                serviceStates[service.image]?.buttonShow && (
                                    <div key={service.name} style={{ display: 'flex' }}>
                                        <a className='bg-green-500' style={{ color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginRight: '20px' }} href={`https://localhost:${serviceStates[service.image].port}`} target="_blank" rel="noopener noreferrer">
                                            Access {service.name}
                                        </a>
                                        <button style={{ backgroundColor: '#0077ff', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => stopService(service.name, service.image)}>
                                            {loading ?
                                                <>
                                                    <LoaderCircle className='animate-spin' />
                                                </>
                                                :
                                                <>
                                                    Stop {service.name}
                                                </>
                                            }
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
                                        <img src={service.pic} alt="service" className="w-32 h-32 object-cover" />
                                    </figure>
                                    <div style={{ padding: '0px 10px' }}>
                                        <span className="blog-link-btn" style={{ justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <h3 className="blog-title">{service.name}</h3>
                                            {serviceStates[service.image]?.buttonShow ? (
                                                <a href={`https://localhost:${serviceStates[service.image].port}`} target="_blank" rel="noopener noreferrer" className='text-green-500 cursor-pointer'>
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

            <Footer />
        </div>
    );
}

export default Dashboard;
