import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';  

const ProfessorFeedbackList = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/feedback/list', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setActivities(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching activities with feedbacks:', error);
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    if (loading) {
        return <div className="feedback-list-loading">Loading feedback...</div>;
    }

    return (
        <div className="feedback-list-container">
            <h2 className="feedback-list-header">Feedback for Your Activities</h2>
            {activities.length > 0 ? (
                activities.map((activity) => (
                    <div className="feedback-list-activity" key={activity.id}>
                        <h3>{activity.title}</h3>
                        {activity.feedbacks.length > 0 ? (
                            <ul className="feedback-list-feedback-list">
                                {activity.feedbacks.map((feedback) => (
                                    <li className="feedback-list-feedback-item" key={feedback.id}>
                                        <strong>{feedback.feedback}</strong>: {feedback.comment} <br />
                                        <small>{new Date(feedback.timestamp).toLocaleString()}</small>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="feedback-list-no-feedback">No feedback yet for this activity.</p>
                        )}
                    </div>
                ))
            ) : (
                <p className="feedback-list-no-feedback">No activities found.</p>
            )}
        </div>
    );
};

export default ProfessorFeedbackList;
