import React from 'react';
import useLocalStorage from '../util/useLocalStorage';

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
        <div style={{ margin: "2em" }}>
            <button id='submit' type='submit' onClick={createAssignment}>Add New Assignment</button>
        </div>
    );
};

export default Dashboard;