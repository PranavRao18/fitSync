import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, ImageBackground, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import chatbotImg from '../assets/images/chatbot.png';
import medicationImg from '../assets/images/medications.png';
import riskImg from  '../assets/images/riskImg.png'
import dietImg from '../assets/images/diet.png';
import exerciseImg from '../assets/images/exercise.png';
import HealthMetricScreen from './HealthMetric';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock user name and health metrics for demonstration
const userName = "John Doe"; // Replace with dynamic data if available
const healthMetrics = [
    { id: '1', title: 'Weight', value: '70 kg', icon: 'scale-bathroom' },
    { id: '2', title: 'Height', value: '175 cm', icon: 'human-male-height' },
    { id: '3', title: 'Blood Pressure', value: '120/80 mmHg', icon: 'heart-pulse' },
    { id: '4', title: 'Heart Rate', value: '72 bpm', icon: 'heart' },
];

const HomeScreen = () => {
    const router = useRouter();
    const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const rightArrowAnim = new Animated.Value(1);
    const handleChatBot = () => {
        // Add authentication logic here
        router.push('/Chatbot'); // Navigate to Home screen after sign in
    };

    const handleMedication = () => {
        // router.push('/Medications');
        //When there is some medications already kelgade route, illa andre melgade route
        router.push('/MyMedications');
    }

    const handleDiet = () => {
        router.push('/Diet');
    }

    const handleExercise = () => {
        router.push('/ExerciseSuggestion');
    }

    const handleRisk = () => {
        router.push('/RiskAssessment');
    }

    // Pulse animation for right arrow
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(rightArrowAnim, {
                    toValue: 1.2,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(rightArrowAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const handleScroll = (event: { nativeEvent: { layoutMeasurement: any; contentOffset: any; contentSize: any; }; }) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEnd = layoutMeasurement.width + contentOffset.x >= contentSize.width - 20;
        const isStart = contentOffset.x <= 0;

        setShowRightArrow(!isEnd);
        setShowLeftArrow(!isStart);
    };

    const handleMetricPress = (title: string) => {
        setSelectedMetric(title);
    };

    const handleBackToMetrics = () => {
        setSelectedMetric(null);
    };

    return (
        <View style={{ flex: 1 }}>
            {selectedMetric ? (
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={handleBackToMetrics} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#15b9a6" />
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <HealthMetricScreen metricName={selectedMetric} />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
                    {/* Greeting */}
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greeting}>Hi, {userName}</Text>
                        <TouchableOpacity onPress={() => router.push('/Profile')}>
                            <Ionicons name="person-circle-outline" size={60} color="#666" style={styles.avatarPlaceholder} />
                        </TouchableOpacity>
                    </View>

                    {/* Sync Score Box */}
                    <TouchableOpacity style={styles.syncScore}>
                        <Text style={styles.syncTitle}>80.2</Text>
                        <Text style={styles.syncDescription}>
                            You are fit and healthy, keep going!
                        </Text>
                    </TouchableOpacity>

                    {/* Horizontal Scrollable Health Metrics */}
                    <View style={styles.metricWrapper}>
                        <FlatList
                            data={healthMetrics}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.metricBox} onPress={() => handleMetricPress(item.title)}>
                                    <Icon name={item.icon} size={30} color="#fff" />
                                    <Text style={styles.metricValue}>{item.value}</Text>
                                    <Text style={styles.metricTitle}>{item.title}</Text>
                                </TouchableOpacity>

                            )}
                            contentContainerStyle={styles.metricsContainer}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                        />
                        {/* Left Arrow Button */}
                        {showLeftArrow && (
                            <TouchableOpacity style={styles.leftArrow}>
                                <Ionicons name="chevron-back-outline" size={24} color="#808080" />
                            </TouchableOpacity>
                        )}
                        {/* Right Arrow Button */}
                        {showRightArrow && (
                            <Animated.View style={[styles.rightArrow, { transform: [{ scale: rightArrowAnim }] }]}>
                                <Ionicons name="chevron-forward-outline" size={24} color="#808080" />
                            </Animated.View>
                        )}
                    </View>

                    {/* Dr. Ayu Chatbot Box */}
                    <TouchableOpacity
                        style={styles.chatbotBox}
                        onPress={handleChatBot}
                    >
                        <ImageBackground
                            source={chatbotImg}
                            style={styles.chatbotImageBackground}
                            imageStyle={styles.chatbotImage}
                        >
                            <View style={styles.overlay} />
                            <Text style={styles.boxTitle}>Talk to Dr. Ayu</Text>
                            <Text style={styles.boxDescription}>
                                Click here to chat with Dr. Ayu, your health assistant.
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* Medications Image Background Box */}
                    <TouchableOpacity
                        style={styles.chatbotBox}
                        onPress={handleMedication}
                    >
                        <ImageBackground
                            source={medicationImg}
                            style={styles.chatbotImageBackground}
                            imageStyle={styles.chatbotImage}
                        >
                            <View style={styles.overlay} />
                            <Text style={styles.boxTitle}>Medications</Text>
                            <Text style={styles.boxDescription}>
                                View and manage your medications.
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>

            <TouchableOpacity style={styles.chatbotBox}
            onPress={handleDiet}>
                <ImageBackground
                    source={dietImg}
                    style={styles.chatbotImageBackground}
                    imageStyle={styles.chatbotImage}
                >
                    <View style={styles.overlay} />
                    <Text style={styles.boxTitle}>Diet Suggestions</Text>
                    <Text style={styles.boxDescription}>
                        View diet tips recommended by Dr. Ayu
                    </Text>
                </ImageBackground>
            </TouchableOpacity>

                    <TouchableOpacity style={styles.chatbotBox}
                    onPress={handleExercise}>
                        <ImageBackground
                            source={exerciseImg}
                            style={styles.chatbotImageBackground}
                            imageStyle={styles.chatbotImage}
                        >
                            <View style={styles.overlay} />
                            <Text style={styles.boxTitle}>Exercises</Text>
                            <Text style={styles.boxDescription}>
                                View exercises recommended by Dr. Ayu
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chatbotBox}
                    onPress={handleRisk}>
                        <ImageBackground
                            source={riskImg}
                            style={styles.chatbotImageBackground}
                            imageStyle={styles.chatbotImage}
                        >
                            <View style={styles.overlay} />
                            <Text style={styles.boxTitle}>Risk Analysis</Text>
                            <Text style={styles.boxDescription}>
                                View risk predictions by Dr. Ayu
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    greetingContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    avatarPlaceholder: {
        // backgroundColor: '#999',
        width: 60,
        height: 60,
        borderRadius: 30, // Circular avatar
    },
    metricWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    metricsContainer: {
        paddingBottom: 15,
    },
    metricBox: {
        backgroundColor: '#15b9a6',
        borderRadius: 10,
        padding: 15,
        width: 150,
        height: 150,
        marginRight: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        justifyContent: 'center',
    },
    metricTitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
    },
    metricValue: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginTop: 5,
    },
    rightArrow: {
        position: 'absolute',
        right: -10,
        top: 60,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    leftArrow: {
        position: 'absolute',
        left: -10,
        top: 60,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    syncScore: {
        backgroundColor: '#15b9a6',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
    },
    syncTitle: {
        fontSize: 50,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    syncDescription: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff'
    },
    chatbotBox: {
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    chatbotImageBackground: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    chatbotImage: {
        borderRadius: 10,
        opacity: 0.8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    boxTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 5,
    },
    boxDescription: {
        fontSize: 16,
        color: '#eee',
        marginTop: 5,
        textAlign: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    backButtonText: {
        fontSize: 18,
        color: '#15b9a6',
        marginLeft: 5,
    },
});

export default HomeScreen;
