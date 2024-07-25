// frontend/src/components/Login.js

import { useState } from 'react';
import axios from 'axios';

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
            <h2>Sign In</h2><br />
            <div className="wrapper-flex">
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field"
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>

                    <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">
                <span>Login</span>
                <ion-icon name="paper-plane-outline" />
            </button>
            <br />
            {message && <p>{message}</p>}
        </form>
    );
};

export default Login;
