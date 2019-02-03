import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class ActiveReq extends React.Component {
    constructor(){
      super();
      this.state = {
      }
    }


    render() {
      return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Button title='Accept'/>
          <Button title='Decline'/>
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