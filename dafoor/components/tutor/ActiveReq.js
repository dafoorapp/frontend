import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';

export default class ActiveReq extends React.Component {
    constructor(){
      super();
      this.state = {
      }
    }

    accept() {
      Alert.alert('request accepted')
    }

    decline() {
      Alert.alert('request decline')
    }


    render() {
      return (
        <View style={styles.container}>
          <Text>New Request</Text>
          <Text>Name: </Text>
          <Text>Gender: </Text>
          <Text>Duration: </Text>

          <Text></Text>
          <Button title='Accept' onPress={this.accept}/>
          <Button title='Decline' onPress={this.decline}/>
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