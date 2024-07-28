// frontend/src/components/Login.js

import { useState } from 'react';
import axios from 'axios';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"

import {
    Tabs,
    TabsContent,
} from "./ui/tabs"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from './ui/button';

const Login = ({ setUser, user }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/login', { username, password })
                .then((response) => {
                    console.log(response.data);
                    setUser(response.data);
                    localStorage.setItem('token', response.data);
                })
        } catch (error) {
            console.error(error);
            setMessage('Failed to log in.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <Tabs defaultValue="signin" className="w-[375px]">
                <TabsContent value="signin">
                    <Card>
                        <CardHeader>
                            <CardTitle>Continue with your account</CardTitle>
                            <CardDescription>
                                Log in to your account to continue using the services.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Username</Label>
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    id="name"
                                    defaultValue="John Doe"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    defaultValue="@peduarte"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type='submit'>Log In</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Login;
