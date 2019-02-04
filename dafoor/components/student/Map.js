import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
// import MapView from 'react-native-maps';
import { Constants, MapView, Location, Permissions, Marker } from 'expo';

export default class Map extends React.Component {
    constructor(){
      super();
      this.state = {
      }
    }

    renderMap(){
      const myLatLng = {lat: -25.363, lng: 131.044};
      return (
        <View>
          <Text>ksnda</Text>
          <MapView  style={{ alignSelf: 'stretch', height: 300, width: 300 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        <MapView.Marker
          coordinate={{latitude: -25.363, longitude: 131.044}}
        />
        </MapView>
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