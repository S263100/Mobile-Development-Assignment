import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import ShowScreen from './src/screens/ShowSearch';
import ActorScreen from './src/screens/ActorSearch';
import ScheduleScreen from './src/screens/Schedule';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TvSearch' }}/>
        <Stack.Screen name="Show Search" component={ShowScreen} options={{ title: 'Show Search' }}/>
        <Stack.Screen name="Actor Search" component={ActorScreen} options={{ title: 'Actor Search' }}/>
        <Stack.Screen name="Tv Schedule" component={ScheduleScreen} options={{ title: 'Show Schedule' }}/>
      </Stack.Navigator>
      <StatusBar style="auto" hidden={true}/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
