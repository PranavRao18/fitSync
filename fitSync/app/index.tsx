// index.tsx

import 'react-native-gesture-handler'; // Ensure this is at the top
import React from 'react';
import { registerRootComponent } from 'expo';
import AppNavigator from '../components/navigation/AppNavigator';

const App = () => {
    return <AppNavigator />;
};

registerRootComponent(App);
