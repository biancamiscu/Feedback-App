import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import '../index.css';

const StudentLoginPage =  ({ type }) => {
    const [message, setMessage] = useState('');

    const handleLogin = async (email, password) => {
        try {
            const endpoint =type === 'student'
                ? 'http://localhost:3000/api/students/loginS'
                : 'http://localhost:3000/api/login';
            const response = await axios.post(endpoint, { email, password });

            localStorage.setItem('token', response.data.token);
            window.location.href = '/student-dashboard'; 
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Login failed. Please check your email and password.');
        }
    };

    return (
        <div className="login-page">
            <LoginForm handleLogin={handleLogin} />
            {message && <p className="login-error">{message}</p>}
        </div>
    );
};

export default StudentLoginPage;
