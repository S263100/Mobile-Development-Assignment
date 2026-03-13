import React, {useState, useEffect} from "react";
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';

export default function ShowDetailsScreen({ route, navigation }) {
  const [showData, setShowData] = useState();

  const { showId } = route.params;
  const getShowData = () => {
    fetch(`https://api.tvmaze.com/shows/${showId}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setShowData(json);
    })
    .catch((error) => {
      console.error(error);
    })
  };

  useEffect(() => {
    getShowData();
  }, [showId])

  return (
    showData ? (
      <View style={styles.detailsContainer}>
        <Image style={styles.resultImage}
          source={{ uri: showData.image?.original }}/>
      <Text style={styles.showTitle}>{showData.name}</Text>
      <Text style={styles.showSummary}>{showData.summary?.replace('<p>', '').replace('</p>', '').replace('<b>', '').replace('</b>', '')}</Text>
      </View>
    ) : (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000"/>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  ShowDetailsScreen: {
    /* Styles here */
  },
  resultImage: {
  width: '100%',
  height: 600,
  borderRadius: 8,
  resizeMode: 'cover',
  marginBottom: 10
},
showTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 5
},
showSummary: {

},
loadingContainer: {
  height: '100%',
  justifyContent: 'center'
}
})