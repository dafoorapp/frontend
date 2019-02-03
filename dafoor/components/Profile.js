import React from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';

export default class Profile extends React.Component {
    constructor(){
      super();
      this.state = {
      }
    }


    render() {
      return (
        <View style={styles.container}>
          <Text>Profile Page !</Text>
          {Alert.alert('not user')}
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