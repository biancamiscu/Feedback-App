import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfessorLoginPage from './pages/ProfessorLoginPage';
import ProfessorDashboard from './pages/ProfessorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import FeedbackPage from './pages/FeedbackPage';
import ProfessorFeedbackList from './pages/ProfessorFeedbackList'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/professor-login" element={<ProfessorLoginPage type="professor" />} />
                <Route path="/student-login" element={<ProfessorLoginPage type="student" />} />
                <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/feedback/:id" element={<FeedbackPage />} />
                <Route path="/empty" element={< ProfessorFeedbackList/>} />
            </Routes>
        </Router>
    );
};

export default App;
