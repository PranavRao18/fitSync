# Retrieve the API key from an environment variable for better security
api_key = "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"
messages=[
            {"role":"system",
             "content":"You are a medical professional chatbot. you are given with a data of symptom user provides. Provide response of multiple conditions they could be suffering with confidence score. Provide just that in response in json."},
            {
                "role": "user",
                "content": "I am facing headache and sweating",
            },
            
        ]
import os
import re
import json
from groq import Groq


client = Groq(api_key=api_key)

# Generate chat completion response
try:
    chat_completion = client.chat.completions.create(
        messages=messages,
        model="llama3-8b-8192",
    )
    
    # Extract the response
    response = chat_completion.choices[0].message.content
    
    # Use regex to find the JSON data in the response
    json_match = re.search(r'\[.*\]', response, re.DOTALL)
    if json_match:
        json_data = json_match.group()
        # Load it as a JSON object to ensure it's valid
        json_object = json.loads(json_data)
        
        # Save the JSON data to a separate file
        with open("response.json", "w") as file:
            json.dump(json_object, file, indent=4)
        
        print("JSON data saved to response.json")
    else:
        print("No JSON data found in the response.")
    
except Exception as e:
    print(f"An error occurred: {e}")

import joblib

# Load the uploaded Random Forest model for calorie prediction
model_path = "fitSync\Models\calories_prediction_model.pkl"
import numpy as np

model = joblib.load(model_path)

# Define input data (example)
# Make sure the input follows the order of the features used during model training
input_data = np.array([[25, 70, 1.75, 1, 22.9, 1650, 3]])  # Example: [age, weight(kg), height(m), gender (1 for male, 0 for female), BMI, BMR, activity_level]

# Make prediction
predicted_calories = model.predict(input_data)

print(f"Predicted daily calorie intake: {predicted_calories[0]}")
calories_model = joblib.load(model_path)
