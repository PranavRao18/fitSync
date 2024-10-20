import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

const PublicProfileScreen = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [medicationHistory, setMedicationHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const { userId } = useLocalSearchParams(); // Retrieve userId from the QR code or URL

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchUserData();
    // }, [userId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#15B9A6" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Patient Profile</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Name: Sanath Naik</Text>
                <Text style={styles.infoText}>Gender: Male</Text>
                <Text style={styles.infoText}>Date of Birth: 07/03/2004</Text>
                <Text style={styles.infoText}>Height: 175 cm</Text>
                <Text style={styles.infoText}>Weight: 55 kg</Text>
            </View>

            <Text style={styles.subTitle}>Medication History</Text>
            <View style={styles.medicationItem}>
                <Text style={styles.medicationText}>Medicine: Albendozol</Text>
                <Text style={styles.medicationText}>Dosage: 25mg</Text>
                <Text style={styles.medicationText}>Frequency: 3</Text>
                <Text style={styles.medicationText}>Start Date: 18/10/2024</Text>
                <Text style={styles.medicationText}>End Date: 23/10/2024</Text>
            </View>
            <View style={styles.medicationItem}>
                <Text style={styles.medicationText}>Medicine: Ibuprofen</Text>
                <Text style={styles.medicationText}>Dosage: 50mg</Text>
                <Text style={styles.medicationText}>Frequency: 3</Text>
                <Text style={styles.medicationText}>Start Date: 18/10/2024</Text>
                <Text style={styles.medicationText}>End Date: 23/10/2024</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f2f5',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    medicationItem: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 15,
        borderRadius: 8,
        elevation: 2,
    },
    medicationText: {
        fontSize: 14,
        color: '#555',
    },
});

export default PublicProfileScreen;
