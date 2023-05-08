import "./App.css";
import { useEffect, useState } from "react";
import useLocalStorage from "./util/useLocalStorage";

function App() {

  const [jwt, setJwt] = useLocalStorage("", "jwt")

  useEffect(() => {
    if (!jwt) {
      const data = {
        username: "mike",
        password: "asdfasdf",
      };
      
      fetch("api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
        }),
      })
      .then((res) => {
        return Promise.all([res.json(), res.headers]);
      })
      .then(([data, headers]) => {
        setJwt(headers.get("authorization"))
        console.log(jwt)
      });
    }
    }, [jwt])

  return (
    <div className='App'>
      <p>JWT VALUE IS: {jwt}</p>
    </div>
     )
}

export default App;
