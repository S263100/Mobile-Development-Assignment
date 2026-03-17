import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import ScheduleScreen from '../screens/Schedule';
import ActorSearchScreen from '../screens/ActorSearch';
import ShowSearchScreen  from '../screens/ShowSearch';
import ShowDetailsScreen from '../screens/ShowDetails';
import ActorDetailsScreen from '../screens/ActorDetails';

function HomeStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="ShowDetails" component={ShowDetailsScreen} options={{ title: 'Show Details' }} />
        <Stack.Screen name="ActorDetails" component={ActorDetailsScreen} options={{ title: 'Actor Details' }} />
        </Stack.Navigator>
      );
    }

export default function TabNavigator() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
            headerShown: true,
            tabBarStyle: { backgroundColor: '#111' },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#888',
            tabBarShowLabel: true,
            tabBarIcon: () => null
        }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Actors" component={ActorSearchScreen} />
      <Tab.Screen name="Shows" component={ShowSearchScreen} />
    </Tab.Navigator>
  );
}