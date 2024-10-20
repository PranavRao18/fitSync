import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DietSuggestionsScreen = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        age: 0,
        weight: 0,
        height: 0,
        gender: '',
        BMI: 0,
        BMR: 0,
        activityLevel: '',
    });
    const [loading, setLoading] = useState(false);
    const [dietPlan, setDietPlan] = useState<string | null>(null);
    const token = AsyncStorage.getItem('access_token');

    // Fetch User Data from Database (Mock Function)
    const fetchUserData = async () => {
        try {
            const token =await AsyncStorage.getItem('access_token');
            // Assume fetching from backend or database
            console.log(token)
            const response = await axios.get(
                "https://2762-2409-40f2-146-a541-e837-d35c-92f3-42d7.ngrok-free.app/api/get_diet/",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the Bearer token
                        'Content-Type': 'application/json', // Set Content-Type if needed
                    },
                }
            );
            const data = response.data;

            // Map response data to state, using defaults for null values
            setUserData({
                age: data.age || 0,
                weight: data.weight !== null ? data.weight : 0,
                height: data.height || 0,
                gender: data.gender || '',
                BMI: data.bmi !== null ? data.bmi : 0,
                BMR: data.bmr !== null ? data.bmr : 0,
                activityLevel: data.activityLevel !== null ? data.activityLevel : '',
            });
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const generateDietPlan = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('access_token');
        try {
            const response = await axios.get(
                "https://2762-2409-40f2-146-a541-e837-d35c-92f3-42d7.ngrok-free.app/api/diet/",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            // Extract error message
            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
            console.error(error);
            Alert.alert("Error", errorMessage); // Show the error in an alert
        } finally {
            setLoading(false);
        }
    };
    
    

    // Placeholder function for predicting calorie intake using the model
    const predictCalorieIntake = async (data: any) => {
        // Your model logic here
        return 2000; // Placeholder
    };

    // Placeholder function for fetching diet plan from LLM
    const fetchDietPlanFromLLM = async (calories: number) => {
        // Your LLM integration logic here
        return `Based on a daily calorie intake of ${calories} kcal, we suggest a balanced diet rich in proteins, vegetables, and healthy fats. Include lean meats, fish, nuts, seeds, and leafy greens in your meals.`;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.header}>Diet Suggestions</Text>

            {/* Display User Data */}
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Age: {userData.age}</Text>
                <Text style={styles.infoText}>Weight: {userData.weight} kg</Text>
                <Text style={styles.infoText}>Height: {userData.height} m</Text>
                <Text style={styles.infoText}>Gender: {userData.gender}</Text>
                <Text style={styles.infoText}>BMI: {userData.BMI}</Text>
                <Text style={styles.infoText}>BMR: {userData.BMR} kcal</Text>
                <Text style={styles.infoText}>Activity Level: {userData.activityLevel}</Text>
            </View>

            {/* Generate Diet Plan Button */}
            <TouchableOpacity style={styles.generateButton} onPress={generateDietPlan}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        <Text style={styles.buttonText}>Generate Diet Plan</Text>
                        <Ionicons name="nutrition-outline" size={20} color="#fff" />
                    </>
                )}
            </TouchableOpacity>

            {/* Display Diet Plan */}
            {dietPlan && (
                <View style={styles.dietPlanContainer}>
                    <Text style={styles.dietPlanText}>{dietPlan}</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    backButton: {
        alignSelf: 'flex-start',
        paddingVertical: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    infoContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    generateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15B9A6',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    dietPlanContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    dietPlanText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
});

export default DietSuggestionsScreen;
 