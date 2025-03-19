import React, { useEffect, useState } from "react";
import fetchService from "../Services/fetchService";
import './AssignmentView.css';

const AssignmentView = () => {
    const assignmentId = window.location.pathname.split("/")[2];
    let jwt = localStorage.getItem("jwt");
    const [assignment, setAssignment] = useState(null);
    const [error, setError] = useState(null);

    // Remove quotes from the JWT token if present
    if (jwt) {
        jwt = jwt.replace(/^"|"$/g, '');
    }

    function updateAssignment(field, value) {
        setAssignment({
            ...assignment,
            [field]: value  
        });
    }

    async function submitAssignment() {
        try {
            const response = await fetchService(`/api/assignments/${assignmentId}`, jwt, "PUT", assignment);
            const updatedAssignment = await response.json();
            setAssignment(updatedAssignment);
        } catch (error) {
            setError(`Error submitting assignment: ${error.message}`);
        }
    }

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await fetchService(`/api/assignments/${assignmentId}`, jwt);
                const assignment = await response.json();
                setAssignment(assignment);
            } catch (error) {
                setError(`Error fetching assignment: ${error.message}`);
            }
        };

        fetchAssignment();
    }, [assignmentId, jwt]);

    return (
        <div className="assignment-view-container">
            <h1>Assignment {assignmentId}</h1>
            {error ? (
                <p className="error-message">{error}</p>
            ) : assignment ? (
                <div className="assignment-details">
                    <h3>Status: {assignment.status}</h3>
                    <div className="form-group">
                        <label htmlFor="gitHubUrl">Github URL:</label>
                        <input
                            type="url"
                            id="gitHubUrl"
                            value={assignment.githubUrl || ''}
                            onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branch">Branch:</label>
                        <input
                            type="text"
                            id="branch"
                            value={assignment.branch || ''}
                            onChange={(e) => updateAssignment("branch", e.target.value)}
                        />
                    </div>
                    <button className="submit-button" onClick={submitAssignment}>Submit Assignment</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AssignmentView;