import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../util/useLocalStorage';
import './Login.css';
import fetchService from '../Services/fetchService';

const Login = () => {
    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const sendLoginRequest = async () => {
        try {
            const response = await fetchService("api/auth/login", jwt, "POST", { username, password });
            const authorization = response.headers.get("authorization");
            if (authorization) {
                setJwt(authorization);
                window.location.href = "dashboard";
            } else {
                console.error("Authorization header is missing in the response");
            }
        } catch (error) {
            console.error("Invalid login attempt", error);
        }
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
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
                <button className="login-button" type='button' onClick={sendLoginRequest}>Send</button>
                <button className="register-button" type='button' onClick={goToRegister}>Register</button>
            </div>
        </div>
    );
};

export default Login;