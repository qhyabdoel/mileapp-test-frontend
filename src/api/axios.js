import axios from 'axios';
axios.defaults.baseURL =
    import.meta.env.API_URL || 'https://mileapp-test-mock-api-production.up.railway.app/';
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default axios;
