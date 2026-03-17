import React, {useState, useEffect} from "react";
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

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
      <ScrollView style={styles.detailsContainer}>
        <ImageBackground style={styles.resultImage}
          source={{ uri: showData.image?.original }}
          resizeMode="cover">
      
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.gradient}>
          <Text style={styles.showTitle}>{showData.name}</Text>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.detailsSection}>
      
      <Text style={styles.showInfo}>
        Premiered: {showData.premiered}
      </Text>
      <Text style={styles.showInfo}>
        Genres: {showData.genres.join(", ")}
      </Text>
      <Text style={styles.showSummary}>{showData.summary?.replace(/<[^>]+>/g, '')}</Text>
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
  detailsContainer: {
    flex: 1,
    backgroundColor: "#000"
  },
  resultImage: {
    width: "100%",
    height: 600,
    justifyContent: "flex-end" 
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 20
  },
showTitle: {
  color: "#fff",
  fontSize: 50,
  fontWeight: "bold"
  },
detailsSection: {
  padding: 20
  },
showInfo: {
  color: "#ccc",
  fontSize: 16,
  marginBottom: 6
  },
showSummary: {
  color: "#eee",
  fontSize: 16,
  marginTop: 15,
  lineHeight: 24
  },
loadingContainer: {
  height: '100%',
  justifyContent: 'center',
}
})