import { LinearGradient } from "expo-linear-gradient";
import React, {useState, useEffect} from "react";
import { ActivityIndicator, StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';

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
      <ScrollView style={styles.detailsContainer}>
        <ImageBackground style={styles.resultImage}
          source={{ uri: actorData.image?.original || 'https://placehold.net/400x400.png'}} resizeMode="cover">
      
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.gradient}>
      <Text style={styles.actorName}>{actorData.name}</Text>
      </LinearGradient>
      </ImageBackground>

      <View style={styles.detailsSection}>


      <Text style={styles.actorGender}>Gender: {actorData.gender}</Text>
      </View>
      </ScrollView>
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
gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 20
  },
detailsSection: {

},
actorName: {
  color: "#fff",
  fontSize: 50,
  fontWeight: "bold"
},
showSummary: {

},
loadingContainer: {
  height: '100%',
  justifyContent: 'center'
}
})