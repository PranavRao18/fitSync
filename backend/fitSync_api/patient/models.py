from django.db import models
from django.contrib.auth.models import User

class Address(models.Model):
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.street}, {self.city}, {self.state}, {self.country}"

class PersonalDetails(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.OneToOneField(Address, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class EmergencyContact(models.Model):
    patient = models.ForeignKey('Patient', related_name='emergency_contacts', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    relationship = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.name} ({self.relationship})"

class Medication(models.Model):
    patient = models.ForeignKey('Patient', related_name='medications', on_delete=models.CASCADE)
    medication_name = models.CharField(max_length=100)
    dosage = models.CharField(max_length=50)
    frequency = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    reminder = models.BooleanField(default=False)
    reminder_time = models.DateTimeField(null=True,blank=True)
    prescribing_doctor = models.CharField(max_length=100)
    before_meal = models.BooleanField(default=False)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.medication_name

class VitalSignMeasurement(models.Model):
    measurement_date = models.DateTimeField()
    
    class Meta:
        abstract = True

class BloodPressure(VitalSignMeasurement):
    patient = models.ForeignKey('Patient', related_name='blood_pressure', on_delete=models.CASCADE)
    systolic = models.IntegerField()
    diastolic = models.IntegerField()

class HeartRate(VitalSignMeasurement):
    patient = models.ForeignKey('Patient', related_name='heart_rate', on_delete=models.CASCADE)
    bpm = models.IntegerField()

class GlucoseLevel(VitalSignMeasurement):
    patient = models.ForeignKey('Patient', related_name='glucose_levels', on_delete=models.CASCADE)
    glucose = models.DecimalField(max_digits=5, decimal_places=2)
    meal_relation = models.CharField(max_length=20, choices=[('before_meal', 'Before Meal'), ('after_meal', 'After Meal')])

class OxygenSaturation(VitalSignMeasurement):
    patient = models.ForeignKey('Patient', related_name='oxygen_saturation', on_delete=models.CASCADE)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)

class BodyTemperature(VitalSignMeasurement):
    patient = models.ForeignKey('Patient', related_name='body_temperature', on_delete=models.CASCADE)
    temperature = models.DecimalField(max_digits=5, decimal_places=2)

class Weight(models.Model):
    patient = models.ForeignKey('Patient', related_name='weight', on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=5, decimal_places=2)
    measurement_date = models.DateField()

class Patient(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    patient_id = models.CharField(max_length=50, unique=True)
    personal_details = models.OneToOneField(PersonalDetails, on_delete=models.CASCADE)
    height = models.DecimalField(max_digits=5, decimal_places=2, help_text="Height in cm")

    def __str__(self):
        return self.patient_id
