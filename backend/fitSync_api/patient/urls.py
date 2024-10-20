from django.urls import path
from .views import (
    add_emergency_contact, add_medication, add_blood_pressure,
    add_heart_rate, add_glucose_level, add_oxygen_saturation,
    add_body_temperature, add_weight, create_patient, get_medications, get_patient_data
)
from chatbot.views import diet, get_diet_data, webhook
urlpatterns = [
    path('patient/emergency-contact/', add_emergency_contact, name='add_emergency_contact'),
    path('patient/medication/', add_medication, name='add_medication'),
    path('patient/medications/', get_medications, name='get_medications'),
    path('patient/blood-pressure/', add_blood_pressure, name='add_blood_pressure'),
    path('patient/heart-rate/', add_heart_rate, name='add_heart_rate'),
    path('patient/glucose-level/', add_glucose_level, name='add_glucose_level'),
    path('patient/oxygen-saturation/', add_oxygen_saturation, name='add_oxygen_saturation'),
    path('patient/body-temperature/', add_body_temperature, name='add_body_temperature'),
    path('patient/weight/', add_weight, name='add_weight'),
    path('patient/create/',create_patient, name='add_patient'),
    path('patient/data/', get_patient_data, name='get_patient_data'),
    path('diet/',diet, name='diet_suggest'),
    path('get_diet/',get_diet_data,name="diet_data"),
    path('chat/',webhook,name='chat'),
]