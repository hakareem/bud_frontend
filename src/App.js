import "./App.css";
import { useEffect, useState } from "react";
import useLocalStorage from "./util/useLocalStorage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Homepage from "./Homepage/Homepage";
import Login from "./Login/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {

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
