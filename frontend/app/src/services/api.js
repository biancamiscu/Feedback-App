
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Asigură-te că backend-ul rulează pe acest port
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
