import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('access');
        if (token) {
          // Token exists, navigate to dashboard
          router.replace('/Chatbot');
        } else {
          // No token found, navigate to login
          router.replace('/SignUp');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // If there’s an error, you may want to navigate to login page as a fallback
        // router.replace('/login');
      }
    };

    checkAuthStatus();
  }, []);

  // Display a loading spinner while checking the auth status
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0E0E0' }}>
      <ActivityIndicator size="large" color="#f7b83c" />
    </View>
  );
}