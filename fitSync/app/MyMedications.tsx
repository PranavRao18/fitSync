import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useRouter } from 'expo-router';

type Medication = {
    id: string;
    name: string;
    dosage: string;
    time: string;
    beforeMeal: boolean;
    total: number;
};

const MyMedicationsScreen = () => {
    const router = useRouter();
    const [medications, setMedications] = useState<Medication[]>([
        { id: '1', name: 'Amoxiciline', dosage: '250mg', time: '8:00 AM', beforeMeal: true, total: 3 },
        { id: '2', name: 'Losartan', dosage: '25mg', time: '8:00 AM', beforeMeal: false, total: 3 },
        { id: '3', name: 'Albuterol', dosage: '50mg', time: '8:00 AM', beforeMeal: true, total: 3 },
        { id: '4', name: 'Losartan', dosage: '3x25mg', time: '9:00 AM', beforeMeal: false, total: 25 },
        { id: '5', name: 'Omeprazole', dosage: '2x25mg', time: '9:00 AM', beforeMeal: true, total: 25 },
    ]);

    const handleDelete = (medicationId: string) => {
        Alert.alert(
            "Delete Medication",
            "Are you sure you want to delete this medication?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => setMedications(medications.filter(item => item.id !== medicationId)),
                },
            ]
        );
    };

    const renderMedicationItem = ({ item }: { item: Medication }) => (
        <View style={styles.rowFront}>
            <View style={styles.medicationContainer}>
                <Text style={styles.timeLabel}>{item.time}</Text>
                <View style={styles.medicationInfo}>
                    <View>
                        <Text style={styles.medicationName}>{item.name}</Text>
                        <Text style={styles.dosageText}>
                            {item.beforeMeal ? 'Before Eating' : 'After Eating'} • {item.dosage}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderHiddenItem = (data: { item: Medication }) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                // onPress={() => router.push(`/EditMedication/${data.item.id}`)}
            >
                <Ionicons name="calendar-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => handleDelete(data.item.id)}
            >
                <Ionicons name="trash-outline" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.header}>My Medications</Text>

            {/* List of Medications */}
            <SwipeListView
                data={medications}
                renderItem={renderMedicationItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-150}
                keyExtractor={(item) => item.id}
            />

            {/* Add Medication Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/AddMedication')}>
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 40,
    },
    backButton: {
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    medicationContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 20,
        padding: 15,
        marginVertical: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
        // elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowFront: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 20,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        width: '20%',
    },
    medicationInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    medicationName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    dosageText: {
        fontSize: 14,
        color: '#777',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    backRightBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: '100%',
        borderRadius: 10,
    },
    backRightBtnLeft: {
        backgroundColor: '#eee',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    backRightBtnRight: {
        backgroundColor: '#FF3B30',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    addButton: {
        backgroundColor: '#15B9A6',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 20,
        elevation: 5,
    },
});

export default MyMedicationsScreen;
