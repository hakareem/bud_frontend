import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Welcome to BudAssignments</h1>
                <p>Your one-stop solution for managing assignments efficiently.</p>
            </header>
            <main className="homepage-main">
                <section className="features">
                    <h2>Features</h2>
                    <ul>
                        <li>Create and manage assignments</li>
                        <li>Track progress and deadlines</li>
                        <li>Collaborate with team members</li>
                    </ul>
                </section>
                <section className="cta">
                    <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
                </section>
            </main>
            <footer className="homepage-footer">
                <p>&copy; 2025 BudAssignments. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;