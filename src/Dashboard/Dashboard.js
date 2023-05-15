import React from 'react';
import useLocalStorage from '../util/useLocalStorage';

const Dashboard = () => {
    const [jwt, setJwt] = useLocalStorage("", "jwt")

    function createAssignment() {
        fetch("api/assignments", {
            method: "POST",
            headers: new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${jwt}`
            }),
        }).then((res) => {
            if(res.status === 200) {
                return res.json()
            }
        }).then((assigment) => {
            window.location.href = `/assignments/${assigment.id}`
        })
    }
        return (
            <div style={{margin: "2em"}}>
                <button id='submit' type='submit' onClick={() => createAssignment()}>Add New Assigment</button>
            </div>
        );
};

export default Dashboard;