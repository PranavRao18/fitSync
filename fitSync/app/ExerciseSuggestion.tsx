import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ExerciseSuggestionsScreen = () => {
    const router = useRouter();
    const [userPreferences, setUserPreferences] = useState({
        fitnessGoal: '',
        experienceLevel: '',
        sessionDuration: '',
        preferredExerciseType: '',
    });
    const [loading, setLoading] = useState(false);
    const [exercisePlan, setExercisePlan] = useState<string | null>(null);

    // Fetch User Exercise Preferences from Database (Mock Function)
    const fetchUserPreferences = async () => {
        try {
            // Assume fetching from backend or database
            const fetchedPreferences = {
                fitnessGoal: 'Weight Loss',
                experienceLevel: 'Beginner',
                sessionDuration: '30 minutes',
                preferredExerciseType: 'Cardio',
            };
            setUserPreferences(fetchedPreferences);
        } catch (error) {
            console.error("Failed to fetch user preferences", error);
        }
    };

    useEffect(() => {
        fetchUserPreferences();
    }, []);

    const generateExercisePlan = async () => {
        setLoading(true);
        try {
            // Placeholder for exercise plan generation logic
            const exerciseSuggestion = await fetchExercisePlan(userPreferences);
            setExercisePlan(exerciseSuggestion);
        } catch (error) {
            Alert.alert("Error", "Failed to generate exercise suggestions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Placeholder function for generating exercise suggestions
    const fetchExercisePlan = async (preferences: any) => {
        // Your model logic here
        return `
        Based on your profile:
        - Warm-up: 5 minutes light jogging or jumping jacks.
        - Main Workout:
          ${preferences.preferredExerciseType === 'Cardio' ? 
            '- 20 minutes HIIT cardio session (sprint intervals, jumping rope)\n' : 
            '- 20 minutes bodyweight strength training (push-ups, squats, lunges)\n'}
        - Cool Down: 5 minutes stretching exercises focusing on legs and arms.
        `;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.header}>Exercise Suggestions</Text>

            {/* Display User Preferences */}
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Fitness Goal: {userPreferences.fitnessGoal}</Text>
                <Text style={styles.infoText}>Experience Level: {userPreferences.experienceLevel}</Text>
                <Text style={styles.infoText}>Session Duration: {userPreferences.sessionDuration}</Text>
                <Text style={styles.infoText}>Preferred Exercise: {userPreferences.preferredExerciseType}</Text>
            </View>

            {/* Generate Exercise Plan Button */}
            <TouchableOpacity style={styles.generateButton} onPress={generateExercisePlan}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        <Text style={styles.buttonText}>Generate Exercise Plan</Text>
                        <Ionicons name="bicycle-outline" size={20} color="#fff" />
                    </>
                )}
            </TouchableOpacity>

            {/* Display Exercise Plan */}
            {exercisePlan && (
                <View style={styles.exercisePlanContainer}>
                    <Text style={styles.exercisePlanText}>{exercisePlan}</Text>
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
    exercisePlanContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    exercisePlanText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
});

export default ExerciseSuggestionsScreen;
