import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, Pressable } from 'react-native';

export default function ScheduleScreen({ navigation }) {

  const [searchQuery, setSearchQuery] = useState('schedule');

  const [schedule, setSchedules] = useState([]);

  const showSchedule = () => {
    console.log("Make a call to the API using the search query:");
    fetch(`https://api.tvmaze.com/schedule?country=GB`)
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
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.scheduleResults}>
            <Text style={styles.showTitle}>
              {item.show.name}
            </Text>
            <Text style={styles.episodeTitle}>
              "{item.name}"
            </Text>
            <Text style={styles.showTime}>
              Airs at: {item.airtime}
            </Text>
          <Pressable onPress={() => navigation.navigate('Show Details', { showId: item.show.id })}>
          <Image style={styles.resultImage} source={{ uri: item.show.image?.medium || 'https://dummyimage.com/400x800/fff/000.png&text=Image+Not+Found'}}/>
          </Pressable>
          
          <Text style={styles.showSummary}>{item.show.summary?.replace(/<[^>]+>/g, '')}</Text>
          </View>
        )}
      /> 
      </View>) : (<View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff"/>
      </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C0016'
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
    fontSize: 25,
    color: '#fff',
    fontStyle: 'italic'
  },
  episodeTitle: {
    fontSize: 16,
    color: '#fff'
  },
  showTime: {
    marginBottom: 5,
    color: '#aaa',
  },
  resultImage: {
    width: 250,
    height: 350,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#333'
  },
  showSummary: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 15
  },
    loadingContainer: {
    height: '100%',
    justifyContent: 'center'
  },
});