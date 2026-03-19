import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Pressable, FlatList } from 'react-native';
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
      <SearchForm style={styles.searchBar} setSearchQuery={setSearchQuery}/>
      {actor && actor.length > 0 ? (
        <FlatList
        numColumns={2}
        style={{margin: 10}}
        data={actor}
        contentContainerStyle={styles.contentList}
        renderItem={({item}) => (
        <Pressable style={styles.resultsImageTouchable} onPress={() => navigation.navigate('Actor Details', { actorId: item.person.id })
          }
          >
          <Image
          style={styles.resultImage}
          source={{ uri: item.person.image?.medium || 'https://placehold.net/avatar.png'}}
          />
          <Text style={styles.actorName}>{item.person.name}</Text>
          </Pressable>
        )}
        />
        ) : (<View style={styles.loadingContainer}> 
        <ActivityIndicator size="large" color="#000"/>
        </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  searchBar: {
    margin: 10
  },
  contentList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: "stretch"
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center'
  },
  resultImage: {
    width: '100%',
    height: 150,
    resizeMode: 'center'
  },
  resultsImageTouchable: {
    flex: 1,
    margin: 10,
    alignItems: 'center'
  },
  actorName: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
    color: "#fff"
  },
});