import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ActorSearchScreen from '../screens/ActorSearch';

export default function ActorSearchNavigator() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Actor Search" component={ActorSearchScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  ActorSearchNavigator: {
    /* Styles here */
  },
})