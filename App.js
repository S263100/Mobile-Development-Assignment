import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './src/navigators/Home';
import ActorSearchNavigator from './src/navigators/ActorSearch';
import ScheduleNavigator from './src/navigators/Schedule';
import ShowSearchNavigator from './src/navigators/ShowSearch';

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer style={styles.container}>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeNavigator} options={{ title: 'TvSearch' }}/>
        <Drawer.Screen name="Show Search" component={ShowSearchNavigator} options={{ title: 'Show Search' }}/>
        <Drawer.Screen name="Actor Search" component={ActorSearchNavigator} options={{ title: 'Actor Search' }}/>
        <Drawer.Screen name="Tv Schedule" component={ScheduleNavigator} options={{ title: 'Show Schedule' }}/>
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
