import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import loginBackground from '../assets/login.jpeg';

const FeedbackPage = () => {
    const { id } = useParams(); 
    const [courseDetails, setCourseDetails] = useState(null);
    const [feedback, setFeedback] = useState(''); 
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:3000/api/courses/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data) {
                    setCourseDetails(response.data);
                } else {
                    setErrorMessage('Course details not found.');
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
                setErrorMessage('An error occurred while fetching course details.');
            }
        };

        fetchCourseDetails();
    }, [id]);

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();

        if (!feedback) {
            setErrorMessage('Please select a feedback type.');
            return;
        }

        const feedbackData = {
            activityId: id, 
            feedback,       
            comment,         
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/api/submit-feedback', feedbackData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.message) {
                setSuccessMessage(response.data.message); 
                setErrorMessage('');
            } else {
                setErrorMessage('Failed to submit feedback.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setErrorMessage('An error occurred while submitting feedback.');
        }
    };

    return (
        <div className="feedback-page" style={styles.page}>
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}

            {courseDetails ? (
                <div className="course-details" style={styles.courseDetails}>
                    <h2 style={styles.title}>{courseDetails.title}</h2>
                    <p style={styles.description}>{courseDetails.description}</p>
                    <p style={styles.date}>Date: {new Date(courseDetails.date).toLocaleDateString()}</p>

                    {/* Feedback Form */}
                    <form onSubmit={handleFeedbackSubmit} style={styles.form}>
                        <h3 style={styles.heading}>How did you feel about this course?</h3>
                        <div className="feedback-quadrants" style={styles.feedbackQuadrants}>
                            {[ 
                                { type: 'smiley', label: '😊 Smiley' },
                                { type: 'frowny', label: '😢 Frowny' },
                                { type: 'surprised', label: '😲 Surprised' },
                                { type: 'confused', label: '😕 Confused' },
                            ].map((emoji) => (
                                <div key={emoji.type} className="feedback-option" style={styles.feedbackOption}>
                                    <input
                                        type="radio"
                                        id={emoji.type}
                                        name="feedback"
                                        value={emoji.type}
                                        checked={feedback === emoji.type}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        style={styles.radio}
                                    />
                                    <label htmlFor={emoji.type} style={styles.label}>
                                        {emoji.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="comment" style={styles.label}>Your Comment:</label>
                            <textarea
                                id="comment"
                                rows="4"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your comment..."
                                style={styles.textarea}
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-button" style={styles.submitButton}>
                            Submit Feedback
                        </button>
                    </form>
                </div>
            ) : (
                <p style={styles.loading}>Loading course details...</p>
            )}
        </div>
    );
};

const styles = {
    page: {
        fontFamily: 'Arial, sans-serif',
        backgroundImage: `url(${loginBackground})`,
        backgroundColor: '#ccffff',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '100px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    courseDetails: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '700px',
    },
    title: {
        fontSize: '28px',
        marginBottom: '12px',
        color: '#333',
    },
    description: {
        color: '#666',
        marginBottom: '12px',
    },
    date: {
        color: '#777',
        fontStyle: 'italic',
        marginBottom: '20px',
    },
    heading: {
        fontSize: '20px',
        marginBottom: '18px',
        color: '#333',
    },
    feedbackQuadrants: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '30px',
    },
    feedbackOption: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    radio: {
        marginRight: '12px',
        accentColor: '#28a745',
    },
    label: {
        fontSize: '18px',
        color: '#333',
    },
    formGroup: {
        marginBottom: '20px',
    },
    textarea: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        resize: 'none',
    },
    submitButton: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.3s ease',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    success: {
        color: 'green',
        textAlign: 'center',
    },
    loading: {
        textAlign: 'center',
        fontSize: '20px',
        color: '#666',
    },
};

export default FeedbackPage;
