import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <h1>Welcome to the Feedback App</h1>
            <div className="button-container">
                <button 
                    className="btn" 
                    onClick={() => navigate('/professor-login')}
                >
                    Login as Professor
                </button>
                <button 
                    className="btn" 
                    onClick={() => navigate('/student-login')}
                >
                    Login as Student
                </button>
            </div>
        </div>
    );
};

export default HomePage;
