import React, {useState, useEffect} from "react";
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';

export default function ActorDetailsScreen({ route, navigation }) {
  const [actorData, setActorData] = useState();

  const { actorId } = route.params;
  const getActorData = () => {
    fetch(`https://api.tvmaze.com/people/${actorId}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setActorData(json);
    })
    .catch((error) => {
      console.error(error);
    })
  };

  useEffect(() => {
    getActorData();
  }, [actorId])

  return (
    actorData ? (
      <View style={styles.detailsContainer}>
        <Image style={styles.resultImage}
          source={{ uri: actorData.image?.original }}/>
      <Text style={styles.actorName}>{actorData.name}</Text>
      <Text style={styles.actorGender}>Gender: {actorData.gender}</Text>
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
actorName: {
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