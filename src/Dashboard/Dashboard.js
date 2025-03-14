import React from 'react';
import useLocalStorage from '../util/useLocalStorage';
import './Dashboard.css';

const Dashboard = () => {
    const [jwt] = useLocalStorage("", "jwt");

    const createAssignment = async () => {
        try {
            const response = await fetch("api/assignments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${jwt}`
                },
            });

            if (response.ok) {
                const assignment = await response.json();
                window.location.href = `/assignments/${assignment.id}`;
            }
        } catch (error) {
            console.error("Error creating assignment:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome to your assignment management dashboard.</p>
            </header>
            <main className="dashboard-main">
                <button className="create-assignment-button" onClick={createAssignment}>Add New Assignment</button>
            </main>
        </div>
    );
};

export default Dashboard;