import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class ListOfTutors extends React.Component {
    constructor(){
      super();
      this.state = {
      }
    }


    render() {
      return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });