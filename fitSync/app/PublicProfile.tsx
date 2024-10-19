import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

const PublicProfileScreen = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [medicationHistory, setMedicationHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const { userId } = useLocalSearchParams(); // Retrieve userId from the QR code or URL

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`https://your-backend-url.com/api/user/${userId}`);
                const medicationResponse = await axios.get(`https://your-backend-url.com/api/user/${userId}/medications`);

                setUserInfo(userResponse.data);
                setMedicationHistory(medicationResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#15B9A6" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Patient Profile</Text>
            {userInfo && (
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Name: {userInfo.name}</Text>
                    <Text style={styles.infoText}>Gender: {userInfo.gender}</Text>
                    <Text style={styles.infoText}>Date of Birth: {userInfo.dob}</Text>
                    <Text style={styles.infoText}>Height: {userInfo.height} cm</Text>
                    <Text style={styles.infoText}>Weight: {userInfo.weight} kg</Text>
                </View>
            )}

            <Text style={styles.subTitle}>Medication History</Text>
            <FlatList
                data={medicationHistory}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.medicationItem}>
                        <Text style={styles.medicationText}>Medicine: {item.name}</Text>
                        <Text style={styles.medicationText}>Dosage: {item.dosage}</Text>
                        <Text style={styles.medicationText}>Frequency: {item.frequency}</Text>
                        <Text style={styles.medicationText}>Start Date: {item.startDate}</Text>
                        <Text style={styles.medicationText}>End Date: {item.endDate}</Text>
                    </View>
                )}
            />
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
