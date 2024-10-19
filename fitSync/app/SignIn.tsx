import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSignIn = () => {
        // Add authentication logic here
        router.push('/HomeScreen'); // Navigate to Home screen after sign in
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
    rememberForgotContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberMeText: {
        marginLeft: 5,
        color: '#333',
    },
    forgotPasswordText: {
        color: '#15B9A6',
        fontWeight: '600',
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
