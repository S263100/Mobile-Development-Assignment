import React from 'react';
import { StatusBar } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import ShowDetailsScreen from './src/screens/ShowDetails';
import ActorDetailsScreen from './src/screens/ActorDetails';

export default function App() {
  
  const stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer theme={DarkTheme}>
     <stack.Navigator screenOptions={{ headerShown: true }}>
      <stack.Screen name="Back" component={TabNavigator} options={{ headerShown: false }}/>
      <stack.Screen name="Show Details" component={ShowDetailsScreen} options={{ title: 'Show Details' }}/>
      <stack.Screen name="Actor Details" component={ActorDetailsScreen} options={{ title:'Actor Details' }}/>
     </stack.Navigator>
    </NavigationContainer>
  )
}

