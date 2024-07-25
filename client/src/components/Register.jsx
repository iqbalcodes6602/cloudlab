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
        <>
            <form onSubmit={handleRegister}>
            <h2>Sign Up</h2> <br />
                <div className="wrapper-flex">
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    <span>Register</span>
                    <ion-icon name="paper-plane-outline" />
                </button>
                <br />
                {message && <p style={{ color: 'hsl(212, 17%, 61%)' }}>{message}</p>}
            </form>

        </>
    );
};

export default Register;