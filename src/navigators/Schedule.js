import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleScreen from '../screens/Schedule';
import ShowDetailsScreen from '../screens/ShowDetails';

export default function ScheduleSearchNavigator() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Show Details" component={ShowDetailsScreen}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  ScheduleNavigator: {
  },
})