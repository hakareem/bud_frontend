import React, { useEffect, useState } from "react";

const AssignmentView = () => {
    const assignmentId = window.location.pathname.split("/")[2];
    let jwt = localStorage.getItem("jwt");
    const [assignment, setAssignment] = useState(null);
    const [error, setError] = useState(null);

    // rremove quotes from the JWT token if present
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
        if (!jwt) {
            setError("JWT token is missing. Please log in.");
            return;
        }

        console.log("JWT Token:", jwt);

        console.log(assignment)

        try {
            const response = await fetch(`/api/assignments/${assignmentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify(assignment)
            });

            if (response.ok) {
                const assignment = await response.json();
                setAssignment(assignment);
            } else {
                const errorMessage = await response.text();
                setError(`Error submitting assignment: ${errorMessage}`);
            }
        } catch (error) {
            setError(`Error submitting assignment: ${error.message}`);
        }
    }

    useEffect(() => {
        const fetchAssignment = async () => {
            if (!jwt) {
                setError("JWT token is missing. Please log in.");
                return;
            }

            console.log("JWT Token:", jwt);

            try {
                const response = await fetch(`/api/assignments/${assignmentId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    }
                });

                if (response.ok) {
                    const assignment = await response.json();
                    setAssignment(assignment);
                } else {
                    const errorMessage = await response.text();
                    setError(`Error fetching assignment: ${errorMessage}`);
                }
            } catch (error) {
                setError(`Error fetching assignment: ${error.message}`);
            }
        };

        fetchAssignment();
    }, [assignmentId, jwt]);

    return (
        <div>
            <h1>Assignment {assignmentId} View</h1>
            {error ? (
                <p>{error}</p>
            ) : assignment ? (
                <>
                    <p>Status - {assignment.status}</p>
                    <div>
                        Github URL: <input type="url" id="gitHubUrl" value={assignment.githubUrl} onChange={(e) => updateAssignment("githubUrl",e.target.value)}/>
                        Branch: <input type="text" id="branch" value={assignment.branch} onChange={(e) => updateAssignment("branch",e.target.value)} />
                    </div>
                    <button onClick={submitAssignment}>Submit Assignment</button>
                </> 
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AssignmentView;