import React, { useState } from 'react';
import '../index.css'; 

const LoginForm = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="form-input"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
