import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, Keyboard } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function SearchForm({setSearchQuery, type}) {

  const submitHandler = () => {
    Keyboard.dismiss();
    setSearchQuery(text);
  }

  const [text, setText] = useState();

  const changeHandler = (val) => {
    setText(val);
  }

  return (
    <View style={styles.searchForm}>
      <TextInput style={styles.input} placeholder={"Search..."} onChangeText={changeHandler} onSubmitEditing={() => {submitHandler();}}/>
    </View>
  );
}

  const styles = StyleSheet.create({
    searchForm: {
      width: '100%',
      height: 40,
      flexDirection: 'row',
      marginTop: 10,
    },
    input: {
      flexGrow: 1,
      color: '#fff',
      backgroundColor: '#333',
      paddingHorizontal: 8,
      borderWidth: 2,
      borderColor: '#000',
      borderRadius: 10
    },
    searchButton: {
      width: 40,
      height: 40,
      padding: 2,
      backgroundColor: '#101'
    },
    icon: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      lineHeight: 32
    }
  })