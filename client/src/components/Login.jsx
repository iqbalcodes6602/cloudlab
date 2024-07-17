// frontend/src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser, user }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { username, password })
                .then((response) => {
                    setUser(response.data);
                    localStorage.setItem('token', response.data.token);
                    console.log(response.data)
                    console.log(user)
                })
        } catch (error) {
            setMessage('Failed to log in.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h3>Login</h3>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Login;
