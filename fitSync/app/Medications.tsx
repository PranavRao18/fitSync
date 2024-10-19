import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import medicationImg from '../assets/images/medicationImage.jpg';

const MedicationsScreen = () => {
    const router = useRouter();

    const handleAddMedication = () => {
        // Navigate to add medication form or relevant screen
        router.push('/AddMedication');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            {/* Medication Image with "Multiply" Effect */}
            <View style={styles.imageContainer}>
                <ImageBackground source={medicationImg} style={styles.medicationImage}>
                    <View style={styles.overlay} />
                </ImageBackground>
            </View>

            {/* Text Section */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>No Medications!</Text>
                <Text style={styles.description}>
                    You have 0 medications set up. Kindly set up a new one!
                </Text>
            </View>

            {/* Add New Medication Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
                <Text style={styles.addButtonText}>Add New Medication</Text>
                <Ionicons name="add-circle-outline" size={20} color="#fff" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
        paddingTop: 20,
    },
    imageContainer: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    medicationImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(245, 245, 245, 0.2)', // Dark overlay to mimic "multiply"
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        paddingHorizontal: 15,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15B9A6',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default MedicationsScreen;
