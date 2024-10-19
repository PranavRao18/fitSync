// app/screens/HomeScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { HomeScreenProps } from '../navigation/types';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Welcome to fitSync</Text>
            <Text style={styles.subtitle}>Your Health Companion</Text>

            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('PregnancyCare')}
                >
                    <Text style={styles.cardTitle}>Pregnancy Care</Text>
                    <Text style={styles.cardDescription}>
                        Monitor your pregnancy journey with personalized care.
                    </Text>
                </TouchableOpacity>

                {/* Add other buttons similarly */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 50,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 30,
    },
    cardContainer: {
        width: '100%',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
    },
});

export default HomeScreen;
