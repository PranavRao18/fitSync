import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        // Check if passwords match
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match. Please try again.');
            return;
        }

        // Add further sign-up logic here, e.g., call an API
        router.push('/SignIn'); // Navigate to SignIn screen after successful sign-up
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <View style={styles.labelContainer}>
                <Text style={styles.label}>Email Address</Text>
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Email Address"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.labelContainer}>
                <Text style={styles.label}>Password</Text>
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <View style={styles.labelContainer}>
                <Text style={styles.label}>Confirm Password</Text>
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push('/SignIn')}
            >
                <Text style={styles.secondaryButtonText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f2f5',
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    labelContainer: {
        width: '100%',
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderRadius: 8,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#15B9A6',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 12,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#15B9A6',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SignUpScreen;
