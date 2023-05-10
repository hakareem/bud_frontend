import "./App.css";
import { useEffect, useState } from "react";
import useLocalStorage from "./util/useLocalStorage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Homepage from "./Homepage/Homepage";
import Login from "./Login/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {

  const [jwt, setJwt] = useLocalStorage("", "jwt")

  // useEffect(() => {
  //   if (!jwt) {
  //     const data = {
  //       username: "mike",
  //       password: "asdfasdf",
  //     };
      
  //     fetch("api/auth/login", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: new Headers({
  //         "Content-Type": "application/json; charset=UTF-8",
  //       }),
  //     })
  //     .then((res) => {
  //       return Promise.all([res.json(), res.headers]);
  //     })
  //     .then(([data, headers]) => {
  //       setJwt(headers.get("authorization"))
  //       console.log(jwt)
  //     });
  //   }
  //   }, [jwt])

  return (
    <Routes>
      <Route path="dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
      />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
    )
}

export default App;
