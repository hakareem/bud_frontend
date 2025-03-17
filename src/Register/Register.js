import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../util/useLocalStorage';
import fetchService from '../Services/fetchService';

const Register = () => {
    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const sendRegisterRequest = async () => {
        try {
            const response = await fetchService("api/auth/register", jwt, "POST", { username, password });
            if (response.ok) {
                navigate('/login');
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("Invalid registration attempt", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor='username'>Username</label>
                    <input
                        type="email"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="login-button" type='button' onClick={sendRegisterRequest}>Register</button>
            </div>
        </div>
    );
};

export default Register;