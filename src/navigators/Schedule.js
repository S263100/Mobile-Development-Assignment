import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleScreen from '../screens/Schedule';

export default function ActorSearchNavigator() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  ScheduleNavigator: {
    /* Styles here */
  },
})