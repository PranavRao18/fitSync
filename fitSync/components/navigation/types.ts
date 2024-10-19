// app/navigation/types.ts

import { StackScreenProps } from '@react-navigation/stack';

// Define your stack's parameter list
export type RootStackParamList = {
    Home: undefined;
    PregnancyCare: undefined;
    ElderlyCare: undefined;
    HealthCheckup: undefined;
    HealthTips: undefined;
    Profile: undefined;
};

// Example type for HomeScreen props
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
