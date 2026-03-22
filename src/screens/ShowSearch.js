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
      {show && show.length > 0 ? (
        <FlatList
        numColumns={2}
        style={{margin: 10}}
        data={show}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10}}
        renderItem={({item}) => (          
          <Pressable style={styles.resultsImageTouchable} onPress={() => navigation.navigate('Show Details', { showId: item.show.id })}>
            <Image style={styles.resultImage} source={{ uri: item.show.image?.original || 'https://dummyimage.com/400x800/fff/000.png&text=Image+Not+Found'}}/>
          </Pressable>
        )}
        />
      ) : (<View style={styles.loadingContainer}>
        <Text style={styles.placeholderText}>Search your favourite shows here!</Text>
      </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#0C0016'
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultImage: {
    flex: 1,
    height: 300,
    width: 175,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#333',
    margin: 10
  },
  placeholderText: {
    color: '#666',
    alignSelf: 'center',
    paddingBottom: 100
  }
});