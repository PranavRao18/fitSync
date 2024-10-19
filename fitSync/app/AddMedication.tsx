import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AddMedicationScreen = () => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<'AI' | 'Manual' | null>(null);

    const handleContinue = () => {
        // Perform action based on selected option
        if (selectedOption === 'AI') {
            // Navigate to AI-based scan screen
            // router.push('/ScanWithAI');
        } else if (selectedOption === 'Manual') {
            // Navigate to manual input screen
            router.push('/ManualInput');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            {/* Title and Description */}
            <Text style={styles.title}>Add Medication</Text>
            <Text style={styles.description}>
                You can either manually add medication or let our AI decide based on your data.
            </Text>

            {/* Option Cards */}
            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={[
                        styles.optionCard,
                        selectedOption === 'AI' && styles.selectedOptionCard,
                    ]}
                    onPress={() => setSelectedOption('AI')}
                >
                    <Ionicons name="camera-outline" size={24} color="#333" />
                    <Text style={styles.optionTitle}>Scan with AI</Text>
                    <Text style={styles.optionDescription}>
                        Setup medication/supplements and scan it based on our LLM
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.optionCard,
                        selectedOption === 'Manual' && styles.selectedOptionCard,
                    ]}
                    onPress={() => setSelectedOption('Manual')}
                >
                    <Ionicons name="sync-outline" size={24} color="#333" />
                    <Text style={styles.optionTitle}>Manually Input</Text>
                    <Text style={styles.optionDescription}>
                        Manually add and input the new medication data by yourself.
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
                disabled={!selectedOption}
            >
                <Text style={styles.continueButtonText}>Continue</Text>
                <Ionicons name="arrow-forward-outline" size={20} color="#fff" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
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
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    optionsContainer: {
        width: '100%',
    },
    optionCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedOptionCard: {
        borderWidth: 2,
        borderColor: '#15B9A6',
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    optionDescription: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginTop: 5,
    },
    continueButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15B9A6',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default AddMedicationScreen;
