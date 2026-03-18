import React from 'react';
import { StatusBar, StyleSheet, View, Text } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import ShowDetailsScreen from './src/screens/ShowDetails';
import ActorDetailsScreen from './src/screens/ActorDetails';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Back" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Show Details" component={ShowDetailsScreen} options={{ title: 'Show Details' }} />
        <Stack.Screen name="Actor Details" component={ActorDetailsScreen} options={{ title: 'Actor Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


