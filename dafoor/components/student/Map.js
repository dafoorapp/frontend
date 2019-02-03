import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class Map extends React.Component {
    constructor(){
      super();
      this.state = {
      }
    }


    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>MAP!!!!!</Text>
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