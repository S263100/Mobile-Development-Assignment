import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, Pressable } from 'react-native';

export default function ScheduleScreen({ navigation }) {

  const [searchQuery, setSearchQuery] = useState('schedule');

  const [schedule, setSchedules] = useState([]);

  const showSchedule = () => {
    //Log results.
    console.log("Make a call to the API using the search query:");
    fetch(`https://api.tvmaze.com/schedule`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setSchedules(json);
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
      {schedule && schedule.length > 0 ? (<View style={styles.resultsContainer}>
        <FlatList
        data={schedule}
        renderItem={({item}) => (
          <View style={styles.scheduleResults}>
          
            <Text style={styles.showTitle}>{item.show.name}</Text>
            <Text style={styles.episodeTitle}>{item.name}</Text>
            <Text style={styles.showTime}>Airs at: {item.airtime}</Text>
            <Text style={styles.showSummary}>{item.show.summary?.replace('<p>', '').replace('</p>', '').replace('<b>', '').replace('</b>', '')}</Text>
          <Pressable style={styles.resultImageTouchable} onPress={() => navigation.navigate('Show Details', { showId: item.show.id })
            }
          >
          <Image
          style={styles.resultImage}
          source={{ uri: item.show.image?.medium }}
          />
          </Pressable>
          </View>
        )}
      /> 
      </View>) : (<View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000"/>
      </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center'
  },
  resultsContainer: {
    flex: 1,
    width: '100%',
  },
  scheduleResults: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  showTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  },
  episodeTitle: {
    fontSize: 16,
    color: '#fff'
  },
  showTime: {
    marginBottom: 5,
    color: 'gray',
  },
  showSummary: {
    fontSize: 14,
    color: 'gray'
  },
  resultImage: {
    width: '50%',
    height: 150,
    borderRadius: 8
  }
});