import React from 'react';
import useLocalStorage from '../util/useLocalStorage';

const Dashboard = () => {
    const [jwt, setJwt] = useLocalStorage("", "jwt")
        return (
            <div>
                <p>JWT VALUE IS {jwt}</p>
            </div>
        );
};

export default Dashboard;