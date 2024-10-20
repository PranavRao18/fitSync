import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const DiabetesReportScreen = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [riskLevel, setRiskLevel] = useState(0);
    const [bloodSugarAnim] = useState(new Animated.Value(1));
    const riskDescription = getRiskDescription(riskLevel);

    useEffect(() => {
        // Simulate data fetching or processing with blood sugar drop animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(bloodSugarAnim, {
                    toValue: 1.2,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(bloodSugarAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        setTimeout(() => {
            setRiskLevel(64); // Set your calculated risk level here
            setLoading(false); // Stop loading after data is "fetched"
        }, 4000); // Simulated delay of 4 seconds
    }, []);

    function getRiskDescription(level: number) {
        if (level <= 30) {
            return "Your blood sugar levels are well-managed. Continue with your current lifestyle.";
        } else if (level <= 70) {
            return "Moderate risk of diabetes. Consider adjusting your diet and regular monitoring.";
        } else {
            return "High risk of diabetes detected. Immediate consultation with an endocrinologist is advised.";
        }
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Animated.View style={{ transform: [{ scale: bloodSugarAnim }] }}>
                    <Ionicons name="water" size={80} color="#FF3B30" />
                </Animated.View>
                <Text style={styles.loadingText}>Analyzing Report...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            {/* Page Title */}
            <Text style={styles.header}>Diabetes Report</Text>

            {/* Risk Level Meter */}
            <View style={styles.meterContainer}>
                <AnimatedCircularProgress
                    size={200}
                    width={15}
                    fill={riskLevel}
                    tintColor={riskLevel > 70 ? '#FF3B30' : riskLevel > 30 ? '#FFD700' : '#15B9A6'}
                    backgroundColor="#e0e0e0"
                    rotation={0}
                    lineCap="round"
                >
                    {(fill) => (
                        <Text style={styles.riskText}>{`${riskLevel}%`}</Text>
                    )}
                </AnimatedCircularProgress>
                <Text style={styles.riskLabel}>Diabetes Risk Level</Text>
            </View>

            {/* Description Section */}
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Risk Assessment</Text>
                <Text style={styles.descriptionText}>{riskDescription}</Text>
            </View>

            {/* Suggested Actions */}
            <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionTitle}>Recommendations:</Text>
                <Text style={styles.suggestionText}>
                    - Follow a balanced diet low in sugar and refined carbs.
                </Text>
                <Text style={styles.suggestionText}>
                    - Engage in regular physical activities, such as jogging, cycling, or yoga.
                </Text>
                <Text style={styles.suggestionText}>
                    - Regularly monitor your blood glucose levels.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    loadingText: {
        fontSize: 18,
        color: '#555',
        marginTop: 10,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    meterContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    riskText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
    },
    riskLabel: {
        fontSize: 18,
        color: '#777',
        marginTop: 10,
    },
    descriptionContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '100%',
        marginBottom: 20,
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 16,
        color: '#555',
    },
    suggestionsContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    suggestionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    suggestionText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
});

export default DiabetesReportScreen;
