import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, Pressable} from 'react-native';
import SearchForm from '../components/SearchForm';

export default function ShowSearchScreen({ navigation }) {
  
  const [searchQuery, setSearchQuery] = useState([]);

  const [show, setShows] = useState();

  const searchShow = () => {
    console.log("Make a call to the API using the search query: " + searchQuery);
    fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`)
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
    searchShow();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <SearchForm setSearchQuery={setSearchQuery}/>
      {show && show.length > 0 ? (<View style={styles.resultsContainer}>
        <FlatList
        numColumns={2}
        style={{margin: 10}}
        data={show}
        renderItem={({item}) => (
          <Pressable style={styles.resultsImageTouchable} onPress={() => navigation.navigate('Show Details', { showId: item.show.id })
          }
          >
          <Image
          style={styles.resultImage}
          source={{ uri: item.show.image?.medium }}
          />
          </Pressable>
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
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center'
  },
  resultImage: {
    flex: 1,
    height: 300
  },
  resultsImageTouchable: {
    flex: 1,
    margin: 10,
    height: 200
  }
});