import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ShowSearchScreen from '../screens/ShowSearch';
import ShowDetailsScreen from '../screens/ShowDetails'

export default function ActorSearchNavigator() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Show Search" component={ShowSearchScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Show Details" component={ShowDetailsScreen}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  ShowSearchNavigator: {
    /* Styles here */
  },
})