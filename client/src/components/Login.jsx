// frontend/src/components/Login.js

import { useState } from 'react';
import axios from 'axios';
import { useToast } from "./ui/use-toast"

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
import { jwtDecode } from 'jwt-decode';

const Login = ({ setUser, user, userDetails, setUserDetails }) => {
    const { toast } = useToast()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/login', { username, password })
                .then((response) => {
                    console.log(response.data);
                    setUser(response.data);
                    setUserDetails(jwtDecode(response.data));
                    localStorage.setItem('token', response.data);
                })
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Login failed",
                description: error.response.data.message,
            })
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
                            <Button type='submit'>Log In</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </form>
    );
};

export default Login;
