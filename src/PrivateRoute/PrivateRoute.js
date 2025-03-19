import React, { useState, useEffect } from 'react';
import useLocalStorage from '../util/useLocalStorage';
import { Navigate } from 'react-router-dom';
import ajax from '../Services/fetchService';

const PrivateRoute = ({ children }) => {
    const [jwt] = useLocalStorage("", "jwt");
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        const validateToken = async () => {
            if (!jwt) {
                setIsValid(false);
                return;
            }

            try {
                const response = await ajax(`api/auth/validate?token=${jwt}`, jwt, "GET");
                if (response.ok) {
                    const isValid = await response.json();
                    setIsValid(isValid);
                } else {
                    setIsValid(false);
                }
            } catch (error) {
                console.error("Error validating JWT", error);
                setIsValid(false);
            }
        };

        validateToken();
    }, [jwt]);

    if (isValid === null) {
        return <p>Loading...</p>;
    }

    return isValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;