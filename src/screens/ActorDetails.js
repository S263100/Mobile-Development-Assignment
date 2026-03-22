import { LinearGradient } from "expo-linear-gradient";
import React, {useState, useEffect} from "react";
import { ActivityIndicator, StyleSheet, Text, View, ImageBackground, ScrollView, Image, Pressable } from 'react-native';

export default function ActorDetailsScreen({ route, navigation }) {
  
  const [actorData, setActorData] = useState();

  const [castCredits, setCastCredits] = useState([]);

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

  const getCastCredits = async () => {
    fetch(`https://api.tvmaze.com/people/${actorId}/castcredits?embed[]=show&embed[]=character`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setCastCredits(json);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  useEffect(() => {
    getActorData();
    getCastCredits();
  }, [actorId]);

  return (
    actorData ? (
      <ScrollView style={styles.container}>
        <ImageBackground style={styles.resultImage}
          source={{ uri: actorData.image?.original || 'https://dummyimage.com/400x800/fff/000.png&text=Image+Not+Found'}} resizeMode="cover">
      
      <LinearGradient colors={['transparent', 'rgba(16, 11, 18, 0.92)']} style={styles.gradient}>
        <Text style={styles.actorName}>{actorData.name}</Text>
      </LinearGradient>
        </ImageBackground>
      
    <View>      
      <Text style={styles.actorInfo}>
        Born: {actorData.birthday || 'Unknown'}
      </Text>     
      <Text style={styles.actorInfo}>
        Died: {actorData.deathday || 'N/A'}
      </Text>      
      <Text style={styles.actorInfo}>
        Gender: {actorData.gender || 'N/A'}
      </Text>
      <Text style={styles.actorInfo}>
        Country: {actorData.country?.name || 'N/A'}
        </Text>   
    </View>

      <View style={styles.creditsBox}>
      <Text style={styles.sectionTitle}>Featured In:</Text>
      {castCredits && castCredits.length > 0 && (
       <View style={styles.castList}>
        {castCredits.map((credit, index) => (
          <Pressable key={credit.id || index} style={styles.castBox} onPress={() => navigation.navigate('Show Details', { showId: credit._embedded.show.id })}>
            
            <Image style={styles.castImage} source={{ uri: credit._embedded.show.image?.medium || 'https://dummyimage.com/400x800/fff/000.png&text=Image+Not+Found' }}/>
          
          <View style={styles.castInfo}>
            <Text style={styles.actorCastName}>{credit._embedded.show.name}</Text>
            <Text style={styles.showCast}>{credit._embedded.character?.name}</Text>
          </View>
          </Pressable>
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
  container: {
    backgroundColor: '#101'
  },
  resultImage: {
    width: '100%',
    height: 600,
    borderRadius: 20,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 20
  },
  actorName: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
    fontStyle: 'italic'
  },
  actorInfo: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 6,
    paddingLeft: 7.5
  },
  creditsBox: {
    justifyContent: "center",
    backgroundColor: '#122',
    padding: 20,
    borderRadius: 45,
    marginVertical: 10,
    marginHorizontal: 20,
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ddd',
    marginBottom: 10
  },
  castList: {
    marginBottom: 20
  },
  castBox: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#111',
    borderRadius: 12,
    alignItems: "center",
    padding: 10
  },
  castImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 10
  },
  castInfo: {
    flexShrink: 1
  },
  actorCastName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  showCast: {
    color: '#aaa'
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center'
  },
})