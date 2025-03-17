import React, { useState, useEffect } from 'react';
import useLocalStorage from '../util/useLocalStorage';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import fetchService from '../Services/fetchService';

const Dashboard = () => {
    const [jwt] = useLocalStorage("", "jwt");
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetchService("api/assignments", jwt);
                const assignments = await response.json();
                setAssignments(assignments);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            }
        };

        fetchAssignments();
    }, [jwt]);

    const createAssignment = async () => {
        try {
            const response = await fetchService("api/assignments", jwt, "POST");
            const assignment = await response.json();
            window.location.href = `/assignments/${assignment.id}`;
        } catch (error) {
            console.error("Error creating assignment:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome to your assignment management dashboard.</p>
                {assignments.length > 0 ? assignments.map(assignment => (
                    <div key={assignment.id}>
                        <Link to={`/assignments/${assignment.id}`}>
                            <p>Assignment {assignment.id} : Status - {assignment.status}</p>
                        </Link>
                    </div>
                )) : <p>No assignments found.</p>}
            </header>
            <main className="dashboard-main">
                <button className="create-assignment-button" onClick={createAssignment}>Add New Assignment</button>
            </main>
        </div>
    );
};

export default Dashboard;