import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';


const ListOfTutors = (props) => {
      return (
        <View style={styles.container}>
          <Text>Name: {props.name}</Text>
          <Text>Rating: {props.name}</Text>
          <Text>Gender: {props.name}</Text>
          <Text>Price per hour: {props.name}</Text>
          {/* <Button title='Make Request' onPress={console.log('thank for request')}/> */}
        </View>
      );
  };

  export default ListOfTutors;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });