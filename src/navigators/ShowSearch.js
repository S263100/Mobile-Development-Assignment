import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-native/stack';
import ShowSearchScreen from '../screens/ActorSearch';

export default function ActorSearchNavigator() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Show Search" component={ShowSearchScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  ShowSearchNavigator: {
    /* Styles here */
  },
})