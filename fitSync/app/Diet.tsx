import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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

    // Fetch User Data from Database (Mock Function)
    const fetchUserData = async () => {
        try {
            // Assume fetching from backend or database
            const fetchedData = {
                age: 25,
                weight: 70,
                height: 1.75,
                gender: 'Male',
                BMI: 22.9,
                BMR: 1600,
                activityLevel: 'Moderate',
            };
            setUserData(fetchedData);
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const generateDietPlan = async () => {
        setLoading(true);
        try {
            // Placeholder for model prediction and LLM logic
            const calorieIntake = await predictCalorieIntake(userData); // Call your calorie prediction model here

            // Assume sending `calorieIntake` to an LLM for generating diet suggestions
            const dietSuggestion = await fetchDietPlanFromLLM(calorieIntake);
            setDietPlan(dietSuggestion);
        } catch (error) {
            Alert.alert("Error", "Failed to generate diet suggestions. Please try again.");
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
 