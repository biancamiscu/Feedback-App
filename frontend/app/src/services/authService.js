import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const loginProfessor = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Error logging in professor');
    }
};

export const loginStudent = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/loginS`, { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Error logging in student');
    }
};
