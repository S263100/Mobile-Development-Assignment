import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ShowSearchScreen({ navigation }) {
  
  const [searchQuery, setSearchQuery] = useState('show');

  const [show, setShows] = useState();

  const searchShow = () => {
    console.log("Make a call to the API using the search query: " + searchQuery);
    fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setShows(json["results"]);
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
      <Text>Show Search Screen</Text>
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