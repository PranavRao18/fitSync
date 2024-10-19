from rest_framework import serializers
from .models import Medication, Patient, PersonalDetails, Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street', 'city', 'state', 'postal_code', 'country']

class PersonalDetailsSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = PersonalDetails
        fields = ['first_name', 'last_name', 'date_of_birth', 'gender', 'contact_number', 'email', 'address']

class PatientSerializer(serializers.ModelSerializer):
    personal_details = PersonalDetailsSerializer()

    class Meta:
        model = Patient
        fields = ['patient_id', 'personal_details', 'height']

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = [
            'medication_name', 'dosage', 'frequency','before_meal','reminder_time','reminder', 'start_date',
            'end_date', 'prescribing_doctor', 'notes'
        ]
