import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import '../index.css';

const ProfessorLoginPage = ({ type }) => {
    const [message, setMessage] = useState('');

    const handleLogin = async (email, password) => {
        try {
            console.log('Type:', type); 
            const endpoint =
            type === 'professor'
                ? 'http://localhost:3000/api/login'
                : 'http://localhost:3000/api/students/loginS';
                
            const response = await axios.post(endpoint, { email, password });

            localStorage.setItem('token', response.data.token);
            window.location.href = `/${type}-dashboard`;  

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

export default ProfessorLoginPage;

