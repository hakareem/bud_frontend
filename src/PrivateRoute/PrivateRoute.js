import React, { useState, useEffect } from 'react';
import useLocalStorage from '../util/useLocalStorage';
import { Navigate } from 'react-router-dom';
import ajax from '../Services/fetchService';

const PrivateRoute = ({ children }) => {
    const [jwt] = useLocalStorage("", "jwt");
    const [isValid, setIsValid] = useState(null);

    if(!jwt) {
        return <Navigate to="/login" />;
    } 

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await ajax("api/auth/validate", jwt, "GET");
                const isValid = await response.json();
                setIsValid(isValid);
            } catch (error) {
                console.error("Error validating JWT", error);
                setIsValid(false);
            }
        };

        validateToken();
    }, []);

    if (isValid === null) {
        return <p>Loading...</p>;
    }

    return isValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;