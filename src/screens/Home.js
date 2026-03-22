import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, FlatList, Image, ActivityIndicator, Text} from 'react-native';

export default function HomeScreen({ navigation }) {

  const [shows, setShows] = useState(null);

  const genres = ['Adventure', 'Romance', 'Thriller', 'Comedy', 'Drama', 'Family', 'Horror', 'Supernatural', 'Mystery', 'Medical']

  const [showsByGenre, setShowsByGenre] = useState({});

  const getShow = async () => {
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

  const getShowsForGenre = async () => {
    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${genres}`);
      const data = await res.json();      
      return data.map((item) => item.show);
    }
      catch(error) {
        console.error(error);
        return [];
      }
  };

  const getGenres = async () => {
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
    getShow();
    getShowsForGenre();
    getGenres();
  }, []);


   return (
    <View style={styles.container}>
  <ScrollView>
    <View style={styles.maincontainer}>
      {shows && shows.length > 0 ? (
        <View style={styles.resultsContainer}>
         <FlatList
          contentContainerStyle={{alignSelf: 'flex-start'}}
          horizontal={true}
          data={shows}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('Show Details', { showId: item.id })}>
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
        <View>
         <FlatList
          contentContainerStyle={{alignSelf: 'flex-start'}}
          horizontal={true}
          data={shows}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('Show Details', { showId: item.id })}>
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
</View>
  );
}

const styles = StyleSheet.create({
  HomeScreen: {
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#101',
    padding: 10
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  resultsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  topResultImage: {
    width: 285,
    height: 400,
    margin: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#333'
  },
  rowContainer: {
    marginBottom: 15
  },
  genreTitle: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 2.5,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  resultImage: {
    width: 140,
    height: 200,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#333'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});