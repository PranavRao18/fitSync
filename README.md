# fitSync - Your Personal Health and Fitness Companion

fitSync is an all-encompassing health and fitness app designed to cater to your well-being. With fitSync, you can monitor your health metrics, manage your medications, and receive personalized fitness advice, all in one place. Whether you are managing chronic conditions, tracking your fitness goals, or simply wanting to live a healthier lifestyle, fitSync is here to support you.

## Table of Contents
- [About](#about)
  - [What is fitSync](#what-is-fitsync)
  - [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [TECH STACK used](#techstack---built-with)
- [Screenshots](#screenshots)
- [Team](#the-team)

## About
### What is fitSync?
In today's world, maintaining a healthy lifestyle can be a challenge. fitSync is designed to make it easier for everyone, including elderly users, pregnant women, and fitness enthusiasts, to stay on top of their health. By providing a comprehensive suite of features for monitoring health metrics, managing medications, and consulting with healthcare providers, fitSync becomes your ultimate health companion.

Developed with user-friendliness and accessibility in mind, fitSync is powered by a robust backend to ensure seamless functionality. It integrates machine learning for health risk analysis, chatbots for advice and assistance, and provides personalized diet and exercise suggestions, making it a one-stop solution for managing your health effectively.

### Features

- **Health Monitoring**
  - Track essential health metrics like blood pressure, heart rate, glucose levels, oxygen saturation, and body temperature.
  - Input and monitor your weight, height, and BMI over time.

- **Personalized Medication Management**
  - Add and manage your medications, set reminders, and keep track of your medication history.
  - Easily share your medication records with healthcare providers using a unique QR code.

- **Diet and Exercise Recommendations**
  - Get personalized diet suggestions and fitness routines tailored to your health metrics and goals.
  - Access a comprehensive list of exercises and nutritional tips.

- **AI-Powered Chatbots**
  - Consult with Dr. Ayu, your virtual assistant, for advice on health, medications, diet, and fitness.
  - AI-driven chatbots provide accurate and personalized responses to your health queries.

- **Risk Analysis**
  - Evaluate your risk for conditions like diabetes, heart disease, and kidney disease using machine learning models.
  - Proactive notifications to help you take preventive measures.

- **Doctor Interaction**
  - Seamlessly share your health data with doctors via QR code scans.
  - Ensure that doctors have the latest information on your health for better consultations.

- **User-Friendly Interface**
  - Intuitive design that is easy to navigate, catering to users of all ages.
  - Supports dark mode and accessibility features for enhanced user experience.


## Getting Started
## Prerequisites

Before you begin, ensure that you have the following prerequisites installed on your development environment:

1. **Python**: Required for backend scripts and microservices. Download from the official website [here](https://www.python.org/downloads/).

2. **Node.js with Expo**: To build and run the fitSync application, you need Node.js and Expo. Follow the installation instructions for your operating system:

   - [Node.js Installation Guide](https://nodejs.org/en/download/)
   - [Expo Installation Guide](https://docs.expo.dev/get-started/installation/)

3. **Android Studio or Xcode**: Required for building and running Android/iOS applications. Follow the respective guides:

   - [Android Studio Installation Guide](https://developer.android.com/studio)
   - [Xcode Installation Guide](https://developer.apple.com/xcode/)

Ensure all the required paths are added to PATH in the environment variables of your PC.

After installing Node.js and Expo, run the following command to ensure your environment is set up correctly:
```bash
expo doctor
```

## Installation
We are working on hosting the server for easier access. Until then, you can set up the server and compile the app yourself using the instructions provided.

**Feel free to reach out to us if you encounter any issues during setup. Contact details are available [here](#the-team).**

### Option 1: Run Server Locally and Compile the App

## Running the Server:

1. **Clone the Repository**: Clone the fitSync repository from GitHub to your local machine:
    ```bash
    git clone https://github.com/yourusername/fitSync.git
    ```
2. **Create a Virtual Environment**: Use Python's `venv` or `virtualenv` to create a virtual environment:
    ```bash
    python -m venv .venv
    ```
3. **Activate the Virtual Environment**:
    - On Windows:
      ```bash
      .venv\Scripts\activate
      ```
    - On macOS and Linux:
      ```bash
      source .venv/bin/activate
      ```
4. **Install Requirements**:
    ```bash
    pip install -r requirements.txt
    ```
5. **Database Migrations**:
    ```bash
    python manage.py migrate
    ```
6. **Create Superuser**:
    ```bash
    python manage.py createsuperuser
    ```
7. **Start the Server**:
    ```bash
    python manage.py runserver 0.0.0.0:8000
    ```

## Compiling the App:

1. **Navigate to App Directory**:
    ```bash
    cd fitSyncApp/
    ```
2. **Install Dependencies**:
    ```bash
    npm install
    ```
3. **Update Server Address**: Update the backend URL in `apiClient.ts` or any other config file pointing to your backend.

4. **Start Expo Server**:
    ```bash
    npx expo start
    ```
5. **Connect Device/Emulator**: Connect your Android/iOS device via USB with debugging enabled, or use an emulator.

6. **Launch the App**:
    ```bash
    npx expo run:android # or npx expo run:ios
    ```

## TECHSTACK - Built with

[![Tech](https://skillicons.dev/icons?i=react,typescript,python,django,expo)](https://skillicons.dev)

React Native, TypeScript, Python, Django, Expo

**React Native**:
A JavaScript framework for building native mobile apps.

**TypeScript**:
A strongly typed programming language that builds on JavaScript.

**Python**:
A versatile and easy-to-read programming language.

**Django**:
A high-level Python web framework.

**Expo**:
A framework and platform for universal React applications.


## Dataset Links

1. https://www.kaggle.com/datasets/saurabh00007/diabetescsv
2. https://www.kaggle.com/datasets/mansoordaku/ckdisease
3. https://archive.ics.uci.edu/dataset/45/heart+disease
4. https://www.kaggle.com/datasets/vechoo/diet-plan-recommendation/data


## Screenshots

<!-- Add screenshots of your app, similar to the `cli-Mate` README -->
<img src="https://github.com/user-attachments/assets/27fc8d31-5561-4ca8-89f0-8a85c41ed99b" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/d083e0f8-a875-4b7b-8471-569619c716c1" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/e3440cdd-c14e-439f-ac10-5df48f463e09" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/41f7c2a7-0407-4807-af1b-e2f676873f38" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/e98ee5cc-98e2-4e9a-bf2d-5b78b5c711be" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/d3f97f65-9ed4-493b-8c6e-322510c55293" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/a7f09326-3691-4f06-9c79-00ffde80ff42" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/0c033a4d-94a0-4a03-b36b-e01b1617a0c8" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/2d329490-212f-4f98-a0d8-fad6104680d8" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/5bfad06a-6a41-4ed2-9e8b-0255be829fd6" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/f82e639a-1d58-4761-9a26-a0c36f76b264" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/53677300-9cd5-4778-8c28-712c2ee7b4d0" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/d4789169-a33b-4a92-983c-f60cd39e02ae" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/e418f7c8-21c6-47a7-b847-28bd9d34dd41" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/fdcd7e83-ef0c-4141-b72b-e2833cc2c9a9" style="width: 200px;" />
<img src="https://github.com/user-attachments/assets/efda3b3f-703d-4391-817c-bd1c6d00544b" style="width: 200px;" />





## The Team:
**Pranav Anantha Rao**

[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat&logo=github)](https://github.com/PranavRao18)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/pranav-rao-b00926223/)

**Sanath Naik**

[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat&logo=github)](https://github.com/me-sanath)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/sanath-naik/)

**K L Gireesh**

[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat&logo=github)](https://github.com/Gireesh-KL)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/k-l-gireesh-b9b16027b/)

**Gunanka D**

[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat&logo=github)](https://github.com/gunanana)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/gunanka-d-6301992ab/)
