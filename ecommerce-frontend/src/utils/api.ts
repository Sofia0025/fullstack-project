import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia esto si deployas el backend
});

// Interceptor para adjuntar token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api; 