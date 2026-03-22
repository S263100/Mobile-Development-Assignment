import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import ScheduleScreen from '../screens/Schedule';
import ActorSearchScreen from '../screens/ActorSearch';
import ShowSearchScreen  from '../screens/ShowSearch';
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
            tabBarStyle: { backgroundColor: '#222' },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#888',
            tabBarShowLabel: true,
            tabBarIcon: () => null
        }}>
          
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <AntDesign name="home" size={24} color="white" /> }} />
      <Tab.Screen name="Show Search" component={ShowSearchScreen} options={{ tabBarIcon: () => <MaterialIcons name="live-tv" size={24} color="white" /> }}/>
      <Tab.Screen name="Actor Search" component={ActorSearchScreen} options={{ tabBarIcon: () => <Ionicons name="person" size={24} color="white" />}}/>
      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ tabBarIcon: () => <FontAwesome5 name="list-alt" size={24} color="white" />}} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
})