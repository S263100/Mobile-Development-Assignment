import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, FlatList, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {

  const [shows, setShows] = useState([]);

  const fetchShow = async () => {
    console.log("Make a call to he API using the search query: ");
    fetch(`https://api.tvmaze.com/search/shows?q=0`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setShows(json);
    })
    .catch((error) => {
      console.error(error);
    })
  };

  useEffect(() => {
    fetchShow();
  }, []);


  return (
    <SafeAreaView style={styles.safeContainer}>
  <ScrollView>
    <View style={styles.container}>
      {shows && shows.length > 0 ? (
        <View style={styles.resultsContainer}>
         <FlatList
          contentContainerStyle={{alignSelf: 'flex-start'}}
          horizontal={true}
          data={shows}
          renderItem={({ item }) => (
          <Pressable style={styles.resultsImageTouchable} onPress={() => navigation.navigate('Show Details', { showId: item.show.id })}>
            <Image style={styles.resultImage} source={{ uri: item.show.image?.medium }}/>
          </Pressable>
          )}></FlatList>
        </View>
      ) : (<View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff"/>
      </View>)}
      </View>
  </ScrollView> 
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  HomeScreen: {
    padding: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  resultImage: {
    width: 150,
    height: 200,
    margin: 5
  },
  resultsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  safeContainer: {
    flex: 1,
  }
});