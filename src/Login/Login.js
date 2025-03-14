import React, { useState } from 'react';
import useLocalStorage from '../util/useLocalStorage';
import './Login.css';

const Login = () => {
    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const sendLoginRequest = async () => {
        const data = { username, password };

        try {
            const response = await fetch("api/auth/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            });

            if (response.ok) {
                const authorization = response.headers.get("authorization");
                setJwt(authorization);
                window.location.href = "dashboard";
            } else {
                throw new Error("Invalid login attempt");
            }
        } catch (error) {
            console.error(error);
        }
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
            </div>
        </div>
    );
};

export default Login;