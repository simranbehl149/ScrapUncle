import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
  const isAdmin = config.url?.startsWith('/admin');
  const token = isAdmin ? localStorage.getItem('adminToken') : localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      if (err.config?.url?.startsWith('/admin')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    return Promise.reject(err);
  }
);

export default api;