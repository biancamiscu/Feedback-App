import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
    const [courseCode, setCourseCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:3000/api/students/activities?code=${courseCode}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data && response.data.id) {
             
                navigate(`/feedback/${response.data.id}`);
            } else {
                setErrorMessage('Invalid course code. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching activity:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="student-dashboard-form-container">
            <form className="student-dashboard-form" onSubmit={handleSubmit}>
                <h2 className="student-dashboard-form-title">Enter Course Code</h2>
                <div className="student-dashboard-form-group">
                    <label htmlFor="courseCode">Course Code:</label>
                    <input
                        type="text"
                        id="courseCode"
                        className="student-dashboard-form-input"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="student-dashboard-submit-button">Submit</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default StudentDashboard;
