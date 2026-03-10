import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-native/stack';
import ScheduleScreen from '../screens/ActorSearch';

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