import React, {useState, useEffect} from "react";
import { ActivityIndicator, StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

export default function ShowDetailsScreen({ route, navigation }) {
  
  const [showData, setShowData] = useState();
  
  const [castData, setCastData] = useState([]);
  
  const [episodeData, setEpisodeData] = useState([]);
  
  const [episodesVisible, setEpisodesVisible] = useState(false);
  const [castVisible, setCastVisible] = useState(false);

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
    });
  };

  const getCastData = () => {
    fetch(`https://api.tvmaze.com/shows/${showId}/cast`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setCastData(json);
  })
  .catch((error) => {
    console.error(error);
  });
};

  const getEpisodeData = () => {
    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setEpisodeData(json);
  })
  .catch((error) => {
    console.error(error);
  });
};

  useEffect(() => {
    getShowData();
    getCastData();
    getEpisodeData();
  }, [showId]);

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

      <Text style={styles.showInfo}>
        Language: {showData.language}
      </Text>

      <Text style={styles.showInfo}>
        Rating: {showData.rating?.average}
      </Text>

      <Text style={styles.showInfo}>
        Status: {showData.status}
      </Text>

      <Text style={styles.showSummary}>{showData.summary?.replace(/<[^>]+>/g, '')}</Text>
      
      <TouchableOpacity style={styles.itemBox} onPress={() => setCastVisible(!castVisible)}>
      <Text style={styles.boxTitle}>Cast</Text>  
      <Text style={styles.toggleIcon}>{castVisible ? '-' : '+'}</Text> 
      </TouchableOpacity>
      
      {castVisible && (
        <View style={styles.itemList}>
      {castData.map((c, index) => ( 
        <View key={index} style={{ marginBottom: 10 }}>
        <Pressable style={styles.resultImageTouchable} onPress={() => navigation.navigate('Actor Details', {actorId: c.person.id})}>
      <Text style={styles.showCast}>{c.person.name} as {c.character.name}</Text>
      <Image source={{ uri: c.person.image?.medium || 'https://placehold.net/avatar.png'}} style={styles.castImage}/>
      </Pressable>
      </View>
          ))}
      </View>
      )}
      
      <TouchableOpacity style={styles.itemBox} onPress={() => setEpisodesVisible(!episodesVisible)}>
        <Text style={styles.boxTitle}>Episodes</Text>
        <Text style={styles.toggleIcon}>{episodesVisible ? '-' : '+'}</Text>
      </TouchableOpacity>

      {episodesVisible && (
        <View style={styles.itemList}>
      {episodeData.map(episodes => (
        <View key={episodes.id} style={styles.episodesContainer}>
          <Text style={styles.episodesName}>
            S{episodes.season} E{episodes.number}: {episodes.name}
          </Text>
          <Text style={styles.airdate}>{episodes.airdate}</Text>
          <Image source={{ uri: episodes.image?.medium || 'https://placehold.net/400x400.png'}} style={styles.episodeImage}/>
          <Text style={styles.episodeSummary}>{episodes.summary?.replace(/<[^>]+>/g, '')}
          </Text>
        </View>
      ))}
      </View>
    )}
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
    color: "#aaa",
    fontSize: 16,
    marginBottom: 6
  },
  showSummary: {
    color: "#eee",
    fontSize: 16,
    marginTop: 15,
    lineHeight: 24
  },
  showCast: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 6,
  },
  castImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#122',
    padding: 12,
    borderRadius: 12,
    marginVertical: 10
  },
  boxTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold'
  },
  toggleIcon: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold'
  },
  episodeList: {
    marginTop: 8,
    paddingHorizontal: 10
  },
  episodesContainer: {
    marginBottom: 10
  },
  episodesName: {
    color: '#fff',
    fontWeight: 'bold'
  },
  airdate: {
    color: '#aaa'
  },
  episodeSummary: {
    color: '#aaa',
    fontSize: 15,
    marginTop: 4,
    lineHeight: 20
  },
  episodeImage: {
    width: 100,
    height: 60,
    marginRight: 10,
    borderRadius: 8
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
  },
})