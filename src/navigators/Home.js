import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/Home';

export default function HomeNavigator() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  HomeNavigator: {
    /* Styles here */
  },
})