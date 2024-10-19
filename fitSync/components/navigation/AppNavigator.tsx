// app/navigation/AppNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
// import PregnancyCare from '../screens/PregnancyCare';
// import ElderlyCare from '../screens/ElderlyCare';
// import HealthCheckup from '../screens/HealthCheckup';
// import HealthTips from '../screens/HealthTips';
// import Profile from '../screens/Profile';

// Define your stack's parameter list
export type RootStackParamList = {
    Home: undefined;
    PregnancyCare: undefined;
    ElderlyCare: undefined;
    HealthCheckup: undefined;
    HealthTips: undefined;
    Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                {/* <Stack.Screen name="PregnancyCare" component={PregnancyCare} />
                <Stack.Screen name="ElderlyCare" component={ElderlyCare} />
                <Stack.Screen name="HealthCheckup" component={HealthCheckup} />
                <Stack.Screen name="HealthTips" component={HealthTips} />
                <Stack.Screen name="Profile" component={Profile} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
