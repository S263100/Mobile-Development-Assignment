import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.HomeScreen}>
      <TouchableOpacity onPress={() => navigation.navigate('Show Search')}>
      <Text>Show Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Tv Schedule')}>
      <Text>Tv Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Actor Search')}>
      <Text>Actor Searches</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  HomeScreen: {
    padding: 20,
  },
});