import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import db from './localdb';
import * as Speech from 'expo-speech';

console.log(db['the'].definition);

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isSearchedPressed: false,
      word: '',
      lexicalCategory: '',
      examples: '',
      definition: '',
    };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        //var responseObject = JSON.parse(response);
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        var lexicalCategory = response[0].meanings[0].partOfSpeech;
        var example = response[0].meanings[0].definitions[0].example;

        this.setState({
          word: word.trim(),
          definition: definition.trim(),
          lexicalCategory: lexicalCategory,
          examples: example,
        });
      });
  };

  render() {
    return (
      <View>
        <Text
          style={{
            color: 'black',
            padding: 20,
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {' '}
          Pocket Dictionary
        </Text>

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.textIn}> Search </Text>{' '}
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          WORD :{this.state.word}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
          DEFINITION :{this.state.definition}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
          TYPE :{this.state.lexicalCategory}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
          EXAMPLE :{this.state.examples}
        </Text>
        <TouchableOpacity
          style={{
            width: '60%',
            height: 50,
            alignSelf: 'center',
            padding: 10,
            margin: 10,
            borderWidth: 4,
            borderRadius: 20,
            borderColor: 'black',
            backgroundColor: 'white',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}
           onPress={() => Speech.speak(this.state.word)}>
          PRONUNCIATION
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: 'black',
  },
  searchButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  textIn: {
    textAlign: 'center',
    fontFamily: 'times',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
