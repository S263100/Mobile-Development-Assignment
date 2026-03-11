import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScheduleScreen({ navigation }) {

  const [searchQuery, setSearchQuery] = useState('schedule');

  const [schedule, setSchedules] = useState();

  const showSchedule = () => {
    console.log("Make a call to the API using the search query: " + searchQuery);
    fetch(`https://api.tvmaze.com/schedule`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setSchedules(json["results"]);
    })
    .catch((error) => {
      console.error(error);
    })
  };

  useEffect(() => {
    showSchedule();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Text>Tv Schedule Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});