import React, { useState } from 'react';
import useLocalStorage from '../util/useLocalStorage';

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
        <>
            <div>
                <label htmlFor='username'>Username</label>
                <input
                    type="email"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button id='submit' type='button' onClick={sendLoginRequest}>Send</button>
            </div>
        </>
    );
};

export default Login;