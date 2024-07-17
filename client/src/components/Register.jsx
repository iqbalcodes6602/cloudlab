// frontend/src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', { username, password });
            setMessage('Registration successful. You can now log in.');
        } catch (error) {
            setMessage('Failed to register.');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h3>Register</h3>
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
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Register;