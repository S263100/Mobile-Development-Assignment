import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Pressable, FlatList} from 'react-native';
import SearchForm from '../components/SearchForm';

export default function ActorSearchScreen({ navigation }) {
  
  const [searchQuery, setSearchQuery] = useState([]);

  const [actor, setActors] = useState([]);

  const searchActor = () => {
    console.log("Make a call to the API using the search query: " + searchQuery);
    fetch(`https://api.tvmaze.com/search/people?q=${searchQuery}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setActors(json);
    })
    .catch((error) => {
      console.error(error);
    })
  };

  useEffect(() => {
    searchActor();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <SearchForm setSearchQuery={setSearchQuery}/>
      {actor && actor.length > 0 ? (
        <FlatList
        numColumns={2}
        style={{ flex: 1, margin: 10}}
        data={actor}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
        <Pressable onPress={() => navigation.navigate('Actor Details', { actorId: item.person.id })}>
          <Image style={styles.resultImage} source={{ uri: item.person.image?.original || 'https://dummyimage.com/400x800/fff/000.png&text=Image+Not+Found'}}/>
          <Text style={styles.actorName}>{item.person.name}</Text>
        </Pressable>
        )}
        />
        ) : (<View style={styles.loadingContainer}> 
        <Text style={styles.placeholderText}>Search for your favourite actors here!</Text>
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
    alignItems: 'center',
  },
  resultImage: {
    flex: 1,
    height: 300,
    width: 175,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#333',
    margin: 15
  },
  actorName: {
    marginTop: 2.5,
    marginBottom: 5,
    alignSelf: 'center',
    fontSize: 14,
    color: "#fff",
    fontWeight: 'bold',
  },
  placeholderText: {
    color: '#666',
    alignSelf: 'center',
    paddingBottom: 100
  }
});