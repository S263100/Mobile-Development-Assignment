import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import ScheduleScreen from '../screens/Schedule';
import ActorSearchScreen from '../screens/ActorSearch';
import ShowSearchScreen  from '../screens/ShowSearch';
import ShowDetailsScreen from '../screens/ShowDetails';
import ActorDetailsScreen from '../screens/ActorDetails';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({color}) => <AntDesign name="home" size={24} color="white" /> }} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ tabBarIcon: ({color}) => <FontAwesome5 name="list-alt" size={24} color="white" />}} />
      <Tab.Screen name="Actor Search" component={ActorSearchScreen} options={{ tabBarIcon: ({color}) => <Ionicons name="person" size={24} color="white" />}}/>
      <Tab.Screen name="Show Search" component={ShowSearchScreen} options={{ tabBarIcon: ({color}) => <MaterialIcons name="live-tv" size={24} color="white" /> }}/>
    </Tab.Navigator>
  );
}

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
