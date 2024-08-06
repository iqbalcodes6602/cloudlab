import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table';

function AllUsers() {
    const [allUser, setAllUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users/all-users')
            .then(response => {
                console.log(response.data);
                setAllUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the running services!', error);
            });
    }, []);
    return (
        <div className='py-10'>
            {
                allUser ?
                    <Table>
                        <TableCaption>A list of all users</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User ID</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Service Status</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Service ID</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allUser.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user._id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.running ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.serviceId}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={5}>End of Data</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    :
                    <div>No services running</div>
            }
        </div>
    )
}

export default AllUsers