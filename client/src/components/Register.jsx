// frontend/src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"


const Register = () => {
    const { toast } = useToast()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', { username, password });
            setMessage('Registration successful. You can now log in.');
            toast({
                variant: "success",
                title: "Registration successful.",
                description: "You can now log in.",
            })
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.response.data.message,
            })
        }
    };

    return (
        <>
            <form onSubmit={handleRegister}>
                <Card>
                    <CardHeader>
                        <CardTitle>Create a new account</CardTitle>
                        <CardDescription>
                            Create an account to use the workspaces and access all the services.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Register</Button>
                    </CardFooter>
                    {message && <p style={{ color: 'hsl(212, 17%, 61%)' }}>{message}</p>}
                </Card>
            </form>

        </>
    );
};

export default Register;