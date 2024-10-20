import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const ProfileScreen = () => {
    const userHealthDataURL = 'http://192.168.246.93:8081/PublicProfile?userId=hi'; // Replace with your actual URL

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your QR Code</Text>
            <QRCode
                value={userHealthDataURL}
                size={200}
            />
            <Text style={styles.infoText}>
                Show this QR code to your doctor to access your health data.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ProfileScreen;
