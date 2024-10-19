from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from patient.models import (GlucoseLevel,BloodPressure,HeartRate,Weight,Patient)
import os
import re
import json
from groq import Groq


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
                f"Provide responses of multiple conditions they could be suffering from, with confidence scores. "
                f"Provide just that in response in JSON. Here's the medical background of the user: {response_message}"
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
        json_match = re.search(r'\[.*\]', response, re.DOTALL)
        if json_match:
            json_data = json_match.group()
            json_object = json.loads(json_data)

            # Save the JSON data or process it further
            return Response(json_object, status=200)
        else:
            return Response({"error": "No JSON data found in the response."}, status=400)
        
    except Exception as e: 
        return Response({"error": str(e)}, status=500)


