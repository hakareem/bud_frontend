import React, { useState } from 'react';
import useLocalStorage from '../util/useLocalStorage';

const Login = () => {
    const [jwt, setJwt] = useLocalStorage("", "jwt")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

      const data = {
        username: username,
        password: password,
      };
      
      fetch("api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
        }),
      })
      .then((res) => {
        if(res.status == 200) 
            return Promise.all([res.json(), res.headers]);
        else 
            return Promise.reject("Invalid login attempt")
      })
      .then(([data, headers]) => {
        setJwt(headers.get("authorization"))
        window.location.href = "dashboard"
      }).catch((err) => {
        console.log(err)
      })

    function sendLoginRequest() {
        console.log("HEY TESTING REQUEST")
    }

    return (
        <>
            <div>
                <label htmlFor='username'>Username</label>
                <input type="email" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button id='submit' type='button' onClick={() => sendLoginRequest()}>Send</button>
            </div>
        </>
    );
};

export default Login;