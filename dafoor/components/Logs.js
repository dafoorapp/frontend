import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
// import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

export default class logs extends React.Component {
    constructor(){
      super();
      this.state = {
        typeOfLog: '',
        userType: '',
        activePage: ''
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