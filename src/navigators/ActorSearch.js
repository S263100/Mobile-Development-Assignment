import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ActorSearchScreen from '../screens/ActorSearch';
import ActorDetailScreen from '../screens/ActorDetails';

export default function ActorSearchNavigator() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Actor Search" component={ActorSearchScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Actor Details" component={ActorDetailScreen}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  ActorSearchNavigator: {
  },
})