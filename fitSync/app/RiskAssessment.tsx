import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';

const RiskAnalysisScreen = () => {
    const router = useRouter();
    const [uploadedHeartReport, setUploadedHeartReport] = useState(null);
    const [uploadedDiabetesReport, setUploadedDiabetesReport] = useState(null);

    const handleUploadHeartReport = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
        if (result.type === 'success') {
            setUploadedHeartReport(result.uri);
            Alert.alert("Success", "Heart report uploaded successfully.");
        } else {
            Alert.alert("Success", "Heart report uploaded successfully.");
        }
    };

    const handleUploadDiabetesReport = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
        if (result.type === 'success') {
            setUploadedDiabetesReport(result.uri);
            Alert.alert("Success", "Diabetes report uploaded successfully.");
        } else {
            Alert.alert("Success", "Diabetes report uploaded successfully.");
        }
    };

    const handleSubmitHeartAnalysis = () => {
        if (uploadedHeartReport) {
            // Process the uploaded heart report and run the model
            Alert.alert("Success", "Heart report is being analyzed. Please wait for the results.");
        } else {
            router.push('/HeartReport');
            // Alert.alert("Error", "Please upload a heart report.");
        }
    };

    const handleSubmitDiabetesAnalysis = () => {
        if (uploadedDiabetesReport) {
            // Process the uploaded diabetes report and run the model
            Alert.alert("Success", "Diabetes report is being analyzed. Please wait for the results.");
        } else {
            router.push('/DiabetesReport');
            // Alert.alert("Error", "Please upload a diabetes report.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.header}>Risk Analysis</Text>
            <Text style={styles.description}>
                Upload your medical reports to get a detailed risk analysis for heart disease and diabetes.
            </Text>

            {/* Upload & Analyze Heart Report Section */}
            <View style={styles.analysisSection}>
                <Text style={styles.sectionHeader}>Heart Disease Analysis</Text>
                <Text style={styles.label}>Upload Angiography Report</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={handleUploadHeartReport}>
                    <Ionicons name="cloud-upload-outline" size={24} color="#15B9A6" />
                    <Text style={styles.uploadText}>
                        {uploadedHeartReport ? "Report Uploaded" : "Upload Heart Report"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitHeartAnalysis}>
                    <Text style={styles.submitButtonText}>Analyze Heart Report</Text>
                    <Ionicons name="arrow-forward-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Upload & Analyze Diabetes Report Section */}
            <View style={styles.analysisSection}>
                <Text style={styles.sectionHeader}>Diabetes Analysis</Text>
                <Text style={styles.label}>Upload OGTT Report</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={handleUploadDiabetesReport}>
                    <Ionicons name="cloud-upload-outline" size={24} color="#15B9A6" />
                    <Text style={styles.uploadText}>
                        {uploadedDiabetesReport ? "Report Uploaded" : "Upload Diabetes Report"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitDiabetesAnalysis}>
                    <Text style={styles.submitButtonText}>Analyze Diabetes Report</Text>
                    <Ionicons name="arrow-forward-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
        alignItems: 'center',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    analysisSection: {
        width: '100%',
        marginBottom: 40,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginBottom: 10,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderColor: '#15B9A6',
        borderWidth: 1,
        marginBottom: 15,
    },
    uploadText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#15B9A6',
        marginLeft: 10,
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15B9A6',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default RiskAnalysisScreen;
