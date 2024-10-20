import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:8000/'; // Replace with your backend URL

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/token/`, { email, password });
        const { access, refresh } = response.data;

        // Save tokens to AsyncStorage
        await AsyncStorage.setItem('access_token', access);
        await AsyncStorage.setItem('refresh_token', refresh);

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const refreshAccessToken = async () => {
    try {
        const refresh = await AsyncStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}/api/token/refresh/`, { refresh });

        // Update access token
        await AsyncStorage.setItem('access_token', response.data.access);
        return response.data.access;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
