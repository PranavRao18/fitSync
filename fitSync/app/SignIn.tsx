import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:8000/api/token/'; // Replace with your actual backend URL

const SignInScreen = () => {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            const response = await axios.post(
                'http://2762-2409-40f2-146-a541-e837-d35c-92f3-42d7.ngrok-free.app/api/token/',  // Update to correct API URL
                {
                    username,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            const { access, refresh } = response.data;
    
            await AsyncStorage.setItem('access_token', access);
            await AsyncStorage.setItem('refresh_token', refresh);
    
            router.push('/HomeScreen');
        } catch (error) {
            console.error(error);
            Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Let's Sign In to fitSync</Text>
            
            <View style={styles.labelContainer}>
                <Text style={styles.label}>Email Address</Text>
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Email Address"
                    style={styles.input}
                    value={username}
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

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push('/SignUp')}
            >
                <Text style={styles.secondaryButtonText}>Don't have an account? Sign Up</Text>
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
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
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

export default SignInScreen;
