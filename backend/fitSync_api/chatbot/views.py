from datetime import date
from django.shortcuts import render
import numpy as np
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from patient.models import (GlucoseLevel,BloodPressure,HeartRate,Weight,Patient)
import os
import re
import json
from groq import Groq
import joblib


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def webhook(request):
    api_key = "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"

    user_message = request.data.get('message')
    user = request.user
    try:
        patient = Patient.objects.get(user=user)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=404)

    # Fetch health data
    glucose = GlucoseLevel.objects.filter(patient=patient).order_by('-measurement_date').first()
    blood_pressure = BloodPressure.objects.filter(patient=patient).order_by('-measurement_date').first()
    heart_rate = HeartRate.objects.filter(patient=patient).order_by('-measurement_date').first()
    weight = Weight.objects.filter(patient=patient).order_by('-measurement_date')[:5]

    # Generate prompts based on available data
    prompts = []
    if patient:
        prompts.append(f"The person is a {patient.personal_details.gender}")

    if glucose:
        glucose_prompt = f"Their latest glucose level is {glucose.glucose} mg/dL, meal relation is {glucose.meal_relation} measured on {glucose.measurement_date}."
        prompts.append(glucose_prompt)
    
    if blood_pressure:
        bp_prompt = f"Their latest blood pressure reading is {blood_pressure.systolic}/{blood_pressure.diastolic} mmHg, measured on {blood_pressure.measurement_date}."
        prompts.append(bp_prompt)
    
    if heart_rate:
        hr_prompt = f"Their latest heart rate is {heart_rate.bpm} bpm, recorded on {heart_rate.measurement_date}."
        prompts.append(hr_prompt)
    
    if weight.exists():
        weight_prompt = "Their recent weight measurements are: "
        weight_details = ", ".join([f"{record.weight} kg on {record.measurement_date}" for record in weight])
        prompts.append(weight_prompt + weight_details)
    
    # Combine the prompts into a response message
    response_message = " ".join(prompts) if prompts else "No recent health data available."

    # Prepare chatbot message
    client = Groq(api_key=api_key)
    messages = [
        {
            "role": "system",
            "content": (
                f"You are a medical professional chatbot. You are given with data of symptoms the user provides. "
                f"Provide responses of multiple conditions they could be suffering from and some preventive measures "
                f"Provide smaller response and just that response. Here's the medical background of the user: {response_message}"
            ),
        },
        {
            "role": "user",
            "content": user_message,
        },
    ]

    try:
        # Create chat completion request
        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama3-8b-8192",
        )
        
        response = chat_completion.choices[0].message.content

        # Extract JSON data from the response using regex
        # json_match = re.search(r'\[.*\]', response, re.DOTALL)
        # if json_match:
        #     json_data = json_match.group()
        #     json_object = json.loads(json_data)

            # Save the JSON data or process it further
        return Response(response, status=200)
        # else:
        #     return Response({"error": "No JSON data found in the response."}, status=400)
        
    except Exception as e: 
        return Response({"error": str(e)}, status=500)


def calculate_bmi(weight, height_cm):
    if weight is None or height_cm is None:
        return None
    height_m = height_cm / 100  # Convert cm to meters
    return round(weight / (height_m ** 2), 2)

def calculate_bmr(weight, height_cm, age, gender):
    if weight is None or height_cm is None or age is None or gender is None:
        return None
    if gender.lower() == "male":
        return round(10 * weight + 6.25 * height_cm - 5 * age + 5, 2)
    elif gender.lower() == "female":
        return round(10 * weight + 6.25 * height_cm - 5 * age - 161, 2)
    return None

def get_age(birth_date):
    today = date.today()
    return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def diet(request):
    user = request.user
    try:
        patient = Patient.objects.get(user=user)
        weight_entry = Weight.objects.filter(patient=patient).order_by('-measurement_date').first()
        weight = weight_entry.value if weight_entry else None

        height_cm = patient.height
        birth_date = patient.personal_details.date_of_birth
        gender = patient.personal_details.gender
        age = get_age(birth_date)

        bmi = calculate_bmi(weight, height_cm)
        bmr = calculate_bmr(weight, height_cm, age, gender)

        data = {
            "age": age,
            "gender": gender,
            "height": height_cm/100,
            "weight": weight,
            "bmi": bmi,
            "bmr": bmr
        }
        print(data)
        input = np.array([[age, weight, height_cm/100, 1 if gender == "male" else 0, bmi, bmr, 2]])
        model_path = "calories_prediction_model.pkl"
        model = joblib.load(model_path)
        predicted_calories = model.predict(input)

        api_key = "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"
        messages=[
                    {"role":"system",
                    "content":"Give the response in just the JSON. Suggest diet plans as response. JSON should contain dishname, cuisine, type, calories, proteins, fats. Suggest Indian foods"},
                    {
                        "role": "user",
                        "content": f"Suggest food with calories : {predicted_calories}",
                    },
                    
                ]
        client = Groq(api_key=api_key)

        try:
            chat_completion = client.chat.completions.create(
                messages=messages,
                model="llama3-8b-8192",
            )

            response = chat_completion.choices[0].message.content
            
            # json_match = re.search(r'\[.*\]', response, re.DOTALL)
            # if json_match:
            #     json_data = json_match.group()
            #     json_object = json.loads(json_data)
                
            return Response(response, status=200)
            # else:
            #     return Response("No JSON data found in the response.", status=404)
        except Exception as e:
            print(f"{e} Error")
            return Response(f"An error occurred: {e}",status=500)
    except Exception as e:
        print(e)
        return Response(f"An error occurred: {e}",status=500)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_diet_data(request):
    user = request.user
    try:
        patient = Patient.objects.get(user=user)
        weight_entry = Weight.objects.filter(patient=patient).order_by('-measurement_date').first()
        weight = weight_entry.value if weight_entry else None

        height_cm = patient.height
        birth_date = patient.personal_details.date_of_birth
        gender = patient.personal_details.gender
        age = get_age(birth_date)

        bmi = calculate_bmi(weight, height_cm)
        bmr = calculate_bmr(weight, height_cm, age, gender)

        data = {
            "age": age,
            "gender": gender,
            "height": height_cm/100,
            "weight": weight,
            "bmi": bmi,
            "bmr": bmr,
            "activityLevel":2
        }
        return Response(data,status=200)
    except Exception as e:
        return Response(f"An error occurred: {e}",status=500)