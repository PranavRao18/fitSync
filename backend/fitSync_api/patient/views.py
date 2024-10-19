from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import (
    Patient, Address, PersonalDetails, EmergencyContact, Medication,
    BloodPressure, HeartRate, GlucoseLevel, OxygenSaturation, BodyTemperature, Weight
)
from rest_framework.permissions import IsAuthenticated
from .serializers import MedicationSerializer, PatientSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_patient(request):
    user = request.user  # Get the authenticated user
    height = request.data.get('height')

    # Personal Details
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    date_of_birth = request.data.get('date_of_birth')
    gender = request.data.get('gender')
    contact_number = request.data.get('contact_number')
    email = request.data.get('email')

    # Address
    street = request.data.get('street')
    city = request.data.get('city')
    state = request.data.get('state')
    postal_code = request.data.get('postal_code')
    country = request.data.get('country')

    # Create Address
    address = Address.objects.create(
        street=street, city=city, state=state, postal_code=postal_code, country=country
    )

    # Create Personal Details
    personal_details = PersonalDetails.objects.create(
        first_name=first_name, last_name=last_name, date_of_birth=date_of_birth,
        gender=gender, contact_number=contact_number, email=email, address=address
    )

    # Create Patient and associate it with the user
    patient = Patient.objects.create(
        user=user, personal_details=personal_details, height=height
    )

    return Response({"message": "Patient created successfully."}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_patient_data(request):
    user = request.user  # Get the authenticated user
    try:
        patient = Patient.objects.get(user=user)
        serializer = PatientSerializer(patient)
        return Response(serializer.data, status=200)
    except Patient.DoesNotExist:
        return Response({"error": "Patient data not found for this user."}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_emergency_contact(request):
    user = request.user
    patient = Patient.objects.get(user=user)
    name = request.data.get('name')
    relationship = request.data.get('relationship')
    contact_number = request.data.get('contact_number')

    EmergencyContact.objects.create(
        patient=patient, name=name, relationship=relationship, contact_number=contact_number
    )

    return Response({"message": "Emergency contact added successfully."}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_medication(request):
    user = request.user
    patient = Patient.objects.get(user=user)
    medication_name = request.data.get('medication_name')
    dosage = request.data.get('dosage')
    frequency = request.data.get('frequency')
    start_date = request.data.get('start_date')
    end_date = request.data.get('end_date')
    reminder = request.data.get('reminder')
    reminder_time = request.data.get('')
    prescribing_doctor = request.data.get('prescribing_doctor')
    notes = request.data.get('notes')

    Medication.objects.create(
        patient=patient, medication_name=medication_name, dosage=dosage,
        frequency=frequency, start_date=start_date, end_date=end_date,
        prescribing_doctor=prescribing_doctor, notes=notes
    )

    return Response({"message": "Medication added successfully."}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_medications(request):
    user = request.user 
    try:
        patient = Patient.objects.get(user=user)
        current_date = timezone.now().date()
        active_medications = Medication.objects.filter(
            patient=patient, 
            start_date__lte=current_date, 
            end_date__gte=current_date  
        ) | Medication.objects.filter(patient=patient, end_date__isnull=True)  
        serializer = MedicationSerializer(active_medications, many=True)
        return Response(serializer.data, status=200)
    except Patient.DoesNotExist:
        return Response({"error": "Patient data not found for this user."}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_blood_pressure(request):
    user = request.user
    patient = Patient.objects.get(user=user)
    systolic = request.data.get('systolic')
    diastolic = request.data.get('diastolic')
    measurement_date = request.data.get('measurement_date')

    BloodPressure.objects.create(
        patient=patient, systolic=systolic, diastolic=diastolic,
        measurement_date=measurement_date
    )

    return Response({"message": "Blood pressure recorded successfully."}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_heart_rate(request):
    user = request.user
    patient = Patient.objects.get(user=user)
    bpm = request.data.get('bpm')
    measurement_date = request.data.get('measurement_date')

    HeartRate.objects.create(
        patient=patient, bpm=bpm, measurement_date=measurement_date
    )

    return Response({"message": "Heart rate recorded successfully."}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_glucose_level(request):
    user = request.user
    patient = Patient.objects.get(user=user)
    glucose = request.data.get('glucose')
    measurement_date = request.data.get('measurement_date')
    meal_relation = request.data.get('meal_relation')

    GlucoseLevel.objects.create(
        patient=patient, glucose=glucose, measurement_date=measurement_date, meal_relation=meal_relation
    )

    return Response({"message": "Glucose level recorded successfully."}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_oxygen_saturation(request):
    user = request.user
    patient = Patient.objects.get(user=user)
    percentage = request.data.get('percentage')
    measurement_date = request.data.get('measurement_date')

    OxygenSaturation.objects.create(
        patient=patient, percentage=percentage, measurement_date=measurement_date
    )

    return Response({"message": "Oxygen saturation recorded successfully."}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_body_temperature(request):
    user = request.user
    patient = Patient.objects.get(user=user)
    temperature = request.data.get('temperature')
    measurement_date = request.data.get('measurement_date')

    BodyTemperature.objects.create(
        patient=patient, temperature=temperature, measurement_date=measurement_date
    )

    return Response({"message": "Body temperature recorded successfully."}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_weight(request):
    user = request.user
    patient = Patient.objects.get(user=user)
    value = request.data.get('value')
    measurement_date = request.data.get('measurement_date')

    Weight.objects.create(
        patient=patient, value=value, measurement_date=measurement_date
    )

    return Response({"message": "Weight recorded successfully."}, status=status.HTTP_201_CREATED)

