import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends React.Component {
    constructor(){
      super();
      this.state = {
      }
    }

    renderMap(){
      return (
        <View>
          <Text>ksnda</Text>
          <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        </View>
      )
    }

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* <Text>MAP!!!!!</Text> */}
          {this.renderMap()}
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