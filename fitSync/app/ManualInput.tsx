import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Switch, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ManuallyInputMedication = () => {
    const [medicationName, setMedicationName] = useState('');
    const [dosage, setDosage] = useState(30);
    const [frequency, setFrequency] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [prescribingDoctor, setPrescribingDoctor] = useState('');
    const [notes, setNotes] = useState('');
    const [reminder, setReminder] = useState(false);
    const [reminderTime, setReminderTime] = useState(new Date());
    const [showReminderTimePicker, setShowReminderTimePicker] = useState(false);
    const [beforeMeal, setBeforeMeal] = useState(false);
    const router = useRouter();

    const handleSave = () => {
        
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined, type: string) => {
        if (selectedDate) {
            if (type === 'start') {
                setShowStartDatePicker(Platform.OS === 'ios');
                setStartDate(selectedDate);
            } else if (type === 'end') {
                setShowEndDatePicker(Platform.OS === 'ios');
                setEndDate(selectedDate);
            } else if (type === 'reminder') {
                setShowReminderTimePicker(Platform.OS === 'ios');
                setReminderTime(selectedDate);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.header}>New Medication</Text>

            {/* Medication Name */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Medication Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Oxycodone"
                    value={medicationName}
                    onChangeText={setMedicationName}
                />
            </View>

            {/* Dosage Slider */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Medication Dosage</Text>
                <Slider
                    style={{ width: 320, height: 35 }}
                    minimumValue={10}
                    maximumValue={500}
                    value={dosage}
                    onValueChange={setDosage}
                    step={1}
                />
                <Text style={styles.dosageLabel}>{`${dosage} mg`}</Text>
            </View>

            {/* Frequency */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Medication Frequency</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., 3x per week"
                    value={frequency}
                    onChangeText={setFrequency}
                />
            </View>

            {/* Start & End Date */}
            <View style={styles.row}>
                <View style={[styles.datePickerContainer, { marginRight: 10 }]}>
                    <Text style={styles.label}>Start Date</Text>
                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.input}>
                        <Text>{startDate.toDateString()}</Text>
                    </TouchableOpacity>
                    {showStartDatePicker && (
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            display="default"
                            onChange={(event, date) => handleDateChange(event, date, 'start')}
                        />
                    )}
                </View>

                <View style={styles.datePickerContainer}>
                    <Text style={styles.label}>End Date</Text>
                    <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.input}>
                        <Text>{endDate.toDateString()}</Text>
                    </TouchableOpacity>
                    {showEndDatePicker && (
                        <DateTimePicker
                            value={endDate}
                            mode="date"
                            display="default"
                            onChange={(event, date) => handleDateChange(event, date, 'end')}
                        />
                    )}
                </View>
            </View>

            {/* Reminder Switch */}
            <View style={[styles.inputContainer, styles.reminderRow]}>
                <Text style={styles.label}>Enable Reminder?</Text>
                <Switch value={reminder} onValueChange={setReminder} />
            </View>

            {/* Reminder Time */}
            {reminder && (
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Reminder Time</Text>
                    <TouchableOpacity onPress={() => setShowReminderTimePicker(true)} style={styles.input}>
                        <Text>{reminderTime.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {showReminderTimePicker && (
                        <DateTimePicker
                            value={reminderTime}
                            mode="time"
                            display="default"
                            onChange={(event, date) => handleDateChange(event, date, 'reminder')}
                        />
                    )}
                </View>
            )}

            {/* Take with Meal */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Take with Meal?</Text>
                <View style={styles.toggleRow}>
                    <TouchableOpacity onPress={() => setBeforeMeal(true)} style={[styles.mealToggle, beforeMeal && styles.selected]}>
                        <Text style={styles.toggleText}>Before</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setBeforeMeal(false)} style={[styles.mealToggle, !beforeMeal && styles.selected]}>
                        <Text style={styles.toggleText}>After</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Prescribing Doctor */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Prescribing Doctor</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Dr. Manjunath"
                    value={prescribingDoctor}
                    onChangeText={setPrescribingDoctor}
                />
            </View>

            {/* Notes */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Custom Notes</Text>
                <TextInput
                    style={[styles.input, styles.notes]}
                    placeholder="Custom instructions or notes"
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    numberOfLines={4}
                />
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Add Medication</Text>
                <Ionicons name="add-circle-outline" size={20} color="#fff" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        paddingTop: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    notes: {
        height: 80,
        textAlignVertical: 'top',
    },
    dosageLabel: {
        textAlign: 'left',
        fontSize: 15,
        paddingLeft: 15,
    },
    datePickerContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reminderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15B9A6',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mealToggle: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    selected: {
        backgroundColor: '#15B9A6',
        borderColor: '#15B9A6',
    },
    toggleText: {
        color: '#000',
    },
});

export default ManuallyInputMedication;
