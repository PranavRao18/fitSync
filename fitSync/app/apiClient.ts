import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://10.80.5.211:8000', // Replace with your local IP address
    timeout: 10000,
});

export default apiClient;
