import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ShowSearchScreen from '../screens/ShowSearch';
import ShowDetailsScreen from '../screens/ShowDetails'
import ActorDetailsScreen from '../screens/ActorDetails';

export default function ShowSearchNavigator() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Show Search" component={ShowSearchScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Show Details" component={ShowDetailsScreen}/>
      <Stack.Screen name="Actor Details" component={ActorDetailsScreen}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  ShowSearchNavigator: {
    /* Styles here */
  },
})