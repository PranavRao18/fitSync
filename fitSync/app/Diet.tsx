import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Dish {
    dishname: string;
    cuisine: string;
    type: string;
    calories: number;
    proteins: number;
    fats: number;
}

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
    const [dietDishes, setDietDishes] = useState<Dish[]>([]);

    const fetchUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                Alert.alert("Error", "User is not authenticated. Please log in again.");
                return;
            }
            const response = await axios.get(
                "https://2762-2409-40f2-146-a541-e837-d35c-92f3-42d7.ngrok-free.app/api/get_diet/",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = response.data;

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
            Alert.alert("Error", "Unable to fetch user data. Please check your network or try again later.");
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
            const data = response.data;
            console.log(JSON.parse(data));
            setDietDishes(JSON.parse(data) || []); // Ensure `dietDishes` is always an array
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
            console.error(error);
            Alert.alert("Error", errorMessage);
        } finally {
            setLoading(false);
        }
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

            {/* Display Diet Dishes in Cards */}
            {dietDishes.length > 0 && (
                <View style={styles.dishesContainer}>
                    <Text style={styles.dishesTitle}>Recommended Dishes:</Text>
                    {dietDishes.map((dish, index) => (
                        <View key={index} style={styles.dishCard}>
                            <View style={styles.dishInfo}>
                                <Text style={styles.dishName}>{dish.dishname}</Text>
                                <Text style={styles.dishDetails}>{dish.cuisine} • {dish.type}</Text>
                                <Text style={styles.dishNutritional}>
                                    Calories: {dish.calories} kcal • Proteins: {dish.proteins}g • Fats: {dish.fats}g
                                </Text>
                            </View>
                        </View>
                    ))}
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
    dishesContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginTop: 20,
    },
    dishesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    dishCard: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    dishInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    dishName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    dishDetails: {
        fontSize: 14,
        color: '#777',
    },
    dishNutritional: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
});

export default DietSuggestionsScreen;
