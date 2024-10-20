import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('access_token', token);
    } catch (error) {
        console.error('Failed to save token:', error);
    }
};

// Example function to register a new user
export const registerUser = async (payload: any) => {
    try {
        const response = await apiClient.post('/patient/create-patient', payload);
        const token = response.data.access; // Make sure your backend returns the token
        await saveToken(token); // Save the token in AsyncStorage
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Example function to log in a user
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await apiClient.post('/api/login/', { email, password });
        const token = response.data.access; // Make sure your backend returns the token
        await saveToken(token); // Save the token in AsyncStorage
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
