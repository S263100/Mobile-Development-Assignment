import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/Home';
import ShowScreen from './src/screens/ShowSearch';
import ActorScreen from './src/screens/ActorSearch';
import ScheduleScreen from './src/screens/Schedule';

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer style={styles.container}>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'TvSearch' }}/>
        <Drawer.Screen name="Show Search" component={ShowScreen} options={{ title: 'Show Search' }}/>
        <Drawer.Screen name="Actor Search" component={ActorScreen} options={{ title: 'Actor Search' }}/>
        <Drawer.Screen name="Tv Schedule" component={ScheduleScreen} options={{ title: 'Show Schedule' }}/>
      </Drawer.Navigator>
      <StatusBar style="auto" hidden={true}/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3cf842',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
