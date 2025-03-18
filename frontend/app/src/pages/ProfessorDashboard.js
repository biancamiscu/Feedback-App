
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginBackground from '../assets/login.jpeg';

const ProfessorDashboard = () => {
    const [activities, setActivities] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        id: '', 
    });
    const [setGeneratedCode] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivities = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/api/activities', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };
        fetchActivities();
    }, [activities]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (formData.id) {
            
            try {
                const response = await axios.put(
                    `http://localhost:3000/api/activities/${formData.id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const updatedActivities = activities.map(activity =>
                    activity.id === response.data.id ? response.data : activity
                
                );
                setActivities(updatedActivities);
                window.location.reload();

        
                setFormData({ title: '', description: '', date: '', id: '' });
            } catch (error) {
                console.error('Error updating activity:', error);
            }
        } else {
           
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/activities',
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setActivities([...activities, response.data]);
                setGeneratedCode(response.data.code);
                setFormData({ title: '', description: '', date: '', id: '' });
            } catch (error) {
                console.error('Error creating activity:', error);
            }
        }
    };

    const handleEdit = (activity) => {
        setFormData({
            title: activity.title,
            description: activity.description,
            date: activity.date,
            id: activity.id, 
        });
        
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:3000/api/activities/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

    
            setActivities(activities.filter(activity => activity.id !== id));
        } catch (error) {
            console.error('Error deleting activity:', error);
        }
    };

    const handleOpenEmptyPage = () => {
        navigate('/empty');
    };

    return (
        <div
            style={{
                backgroundImage: `url(${loginBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    width: '80%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {/*  */}
                <div style={{ width: '45%' }}>
                    <h2 style={{ marginBottom: '20px', color: '#333' }}>Professor Dashboard</h2>

                    <button
                        onClick={handleOpenEmptyPage}
                        style={{
                            marginBottom: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Open feedbacks
                    </button>

                    {/*  */}
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Description:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    resize: 'none',
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Date and Time:</label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                backgroundColor: formData.id ? '#007bff' : '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            {formData.id ? 'Update Activity' : 'Save Activity'}
                        </button>
                    </form>
                </div>

                {/* Lista activitati */}
                <div style={{ width: '45%' }}>
                    <h3 style={{ marginTop: '20px', textAlign: 'center', color: '#333' }}>Activities</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {activities.map((activity) => (
                            <li
                                key={activity.id}
                                style={{
                                    marginBottom: '10px',
                                    padding: '10px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '5px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <strong>{activity.title}</strong> - {activity.date} - Code: {activity.code}
                                <div style={{ marginTop: '10px' }}>
                                    <button
                                        onClick={() => handleEdit(activity)}
                                        style={{
                                            marginRight: '10px',
                                            padding: '5px 10px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(activity.id)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfessorDashboard;
