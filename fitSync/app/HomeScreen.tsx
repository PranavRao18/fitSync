import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import chatbotImg from '../assets/images/chatbot.png';
import medicationImg from '../assets/images/medications.png';
import { useRouter, Link } from 'expo-router';

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
    return (
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
            {/* Greeting */}
            <Text style={styles.greeting}>Hi, {userName}</Text>

            {/* Sync Score Box */}
            <TouchableOpacity style={styles.syncScore}>
                <Text style={styles.syncTitle}>80.2</Text>
                <Text style={styles.syncDescription}>
                    You are fit and healthy, keep going!
                </Text>
            </TouchableOpacity>

            {/* Horizontal Scrollable Health Metrics */}
            <FlatList
                data={healthMetrics}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.metricBox}>
                        <Icon name={item.icon} size={30} color="#fff" />
                        <Text style={styles.metricValue}>{item.value}</Text>
                        <Text style={styles.metricTitle}>{item.title}</Text>
                    </View>
                )}
                contentContainerStyle={styles.metricsContainer}
            />

            {/* Dr. Ayu Chatbot Box */}
            <TouchableOpacity
                style={styles.chatbotBox}
                // onPress={() => router.navigate('/Chatbot')}
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
                // onPress={() => navigation.navigate('Medications')}
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

            {/* Medications Box */}
            <TouchableOpacity
                style={styles.medicationBox}
                // onPress={() => navigation.navigate('Medications')}
            >
                <Icon name="pill" size={24} color="#fff" />
                <Text style={styles.boxTitle}>Medications</Text>
                <Text style={styles.boxDescription}>
                    View and manage your medications.
                </Text>
            </TouchableOpacity>

            {/* Additional Boxes */}
            <TouchableOpacity style={styles.medicationBox}>
                <Icon name="food-apple" size={24} color="#fff" />
                <Text style={styles.boxTitle}>Diet Suggestions</Text>
                <Text style={styles.boxDescription}>
                    View diet tips recommended by Dr. Ayu
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.medicationBox}>
                <Icon name="run" size={24} color="#fff" />
                <Text style={styles.boxTitle}>Exercises</Text>
                <Text style={styles.boxDescription}>
                    View exercises recommended by Dr. Ayu
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Ensure content can grow and be scrollable
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    metricsContainer: {
        height: 170,
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
        opacity: 0.8, // Darken for text readability
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Enhance text visibility
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
    medicationBox: {
        backgroundColor: '#15b9a6',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 10,
        alignItems: 'center',
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
});

export default HomeScreen;
