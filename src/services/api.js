import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth services
export const authService = {
    signup: (data) => api.post('/users', data),
    login: (data) => api.post('/users/login', data),
    logout: () => api.post('/users/logout'),
    getProfile: () => api.get('/users/me')
};

// Task services
export const taskService = {
    createTask: (data) => api.post('/tasks', data),
    getTasks: (params) => api.get('/tasks', { params }),
    updateTask: (id, data) => api.patch(`/tasks/${id}`, data),
    deleteTask: (id) => api.delete(`/tasks/${id}`)
};

export default api;
