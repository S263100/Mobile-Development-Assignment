import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Keyboard } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function SearchForm({ setSearchQuery }) {

  const submitHandler = () => {
    setSearchQuery(text);
  }

  const [text, setText] = useState();

  const changeHandler = (val) => {
    setText(val);
  }

  return (
    <View style={styles.searchForm}>
      <TextInput style={styles.input} placeholder="Search..." onChangeText={changeHandler} onSubmitEditing={() => {submitHandler();}}/>
      <Pressable style={styles.searchButton} onPress={submitHandler}>
        <Feather style={styles.icon} name='search' size={24} color="#fff"/>
      </Pressable>
    </View>
  );
}

  const styles = StyleSheet.create({
    searchForm: {
      width: '100%',
      height: 40,
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginTop: 45
    },
    input: {
      flexGrow: 1,
      color: '#000',
      paddingHorizontal: 8,
      borderWidth: 2,
      borderColor: '#000'
    },
    searchButton: {
      width: 40,
      height: 40,
      padding: 2,
      backgroundColor: '#000'
    },
    icon: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      lineHeight: 32
    }
  })