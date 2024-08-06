import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table';
import { formatDistanceToNow } from 'date-fns';
import { LoaderCircle } from 'lucide-react';

function AllServices() {
    const [allServices, setAllServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/services/running-services')
            .then(response => {
                console.log(response.data);
                setAllServices(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the running services!', error);
            });
    }, []);

    const stopService = async (user) => {
        setLoading(true);
        // alert(user);
        try {
            await axios.post('http://localhost:5000/api/services/stop', { userId: user });
        } catch (error) {
            console.error('Error stopping service:', error);
        }
        axios.get('http://localhost:5000/api/services/running-services')
            .then(response => {
                console.log(response.data);
                setAllServices(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the running services!', error);
            });
        setLoading(false);
    }

    return (
        <div className='py-10'>
            {
                allServices ?
                    <Table>
                        <TableCaption>A list of running services</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Service Name</TableHead>
                                <TableHead>Container Name</TableHead>
                                <TableHead>Container ID</TableHead>
                                <TableHead>Port</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Terminate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allServices.map((service) => (
                                <TableRow key={service._id}>
                                    <TableCell>{service._id}</TableCell>
                                    <TableCell>{service.owner}</TableCell>
                                    <TableCell>{service.image}</TableCell>
                                    <TableCell>{service.serviceName}</TableCell>
                                    <TableCell>{service.containerName}</TableCell>
                                    <TableCell>{service.containerId.substring(0, 12)}</TableCell>
                                    <TableCell>{service.port}</TableCell>
                                    <TableCell>{formatDistanceToNow(new Date(service.createdAt))} ago</TableCell>
                                    <TableCell>
                                        <button
                                            style={{
                                                backgroundColor: '#ff5858',
                                                color: 'white',
                                                padding: '5px 10px',
                                                borderRadius: '5px',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => stopService(service.owner)}
                                        >
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
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={9}>End of Data</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    :
                    <div>No services running</div>
            }
        </div>
    )
}

export default AllServices