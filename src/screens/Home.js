import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, FlatList, Image, ActivityIndicator, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {

  const [shows, setShows] = useState(null);
  const genres = ['Adventure', 'Romance', 'Thriller', 'Comedy', 'Drama', 'Family', 'Horror', 'Supernatural', 'Mystery', 'Medical']
  const [showsByGenre, setShowsByGenre] = useState({});

  const fetchShow = async () => {
    console.log("Make a call to he API using the search query: ");
    fetch(`https://api.tvmaze.com/show?page=5`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setShows(json.slice(0, 10));
    })
    .catch((error) => {
      console.error(error);
    })
  };

  const fetchShowsForGenre = async () => {
    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${genre}`);
      const data = await res.json();
      
      return data.map((item) => item.show);
    }
      catch(error) {
        console.error(error);
        return [];
      }
  };

  const fetchAllGenres = async () => {
    try {
    const res = await fetch(`https://api.tvmaze.com/shows`);
    const data = await res.json();
    const result = {};
    for (const genre of genres) {
      result[genre] = data.filter(show => show.genres.includes(genre))
    }
    setShowsByGenre(result);
    }
    catch(error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchShow();
    fetchAllGenres();
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
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
          <Pressable style={styles.topResultsImageTouchable} onPress={() => navigation.navigate('Show Details', { showId: item.id })}>
            <Image style={styles.topResultImage} source={{ uri: item.image?.medium }}/>
          </Pressable>
          )}/>
        </View>
      ) : (<View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff"/>
      </View>)}
      </View>

        {genres.map((genres) => {
          const shows = showsByGenre[genres];
          return (
        <View key={genres} style={styles.rowContainer}>
      <Text style={styles.genreTitle}>{genres}</Text>
      {shows && shows.length > 0 ? (
        <View style={styles.resultsContainer}>
         <FlatList
          contentContainerStyle={{alignSelf: 'flex-start'}}
          horizontal={true}
          data={shows}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
          <Pressable style={styles.resultsImageTouchable} onPress={() => navigation.navigate('Show Details', { showId: item.id })}>
            <Image style={styles.resultImage} source={{ uri: item.image?.medium }}/>
          </Pressable>
          )}/>
        </View>
      ) : (<View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff"/>
      </View>)}
      </View>
          )
      })}
  </ScrollView> 
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  HomeScreen: {
    padding: 20,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  topResultImage: {
    width: 285,
    height: 400,
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff'
  },
  resultImage: {
    width: 115,
    height: 200,
    margin: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc'
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
    backgroundColor: '#000',
    padding: 10
  },
  genreTitle: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 2.5,
    fontWeight: 'bold'
  },
  rowContainer: {
    marginBottom: 20
  }
});