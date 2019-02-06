import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
// import MapView from 'react-native-maps';
import { Constants, MapView, Location, Permissions, Marker } from 'expo';

export default class Map extends React.Component {
    constructor(props){
      super(props);
      // console.log('proooooprs',props.requests);
      this.state = {
        marker : props.requests,
        mapRegion: { latitude: 24.7155904, longitude: 46.6548654, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
      };
      }

      _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
      };
  

    // componentDidMount(){
    //   this.setState({
    //     marker: this.props.requests
    //   })
    // }

    // componentDidMount(){
    //   console.log('componentDidMount');
    //   const student_location = '0101000020E6100000D2A00D654DA938403CD1BF6E22574740';
    //   fetch(`http://localhost:3000/tutors/students/1?student_location=${student_location}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({
    //       marker: data
    //     })
    //   })
    //   .catch(error => console.log(error))
    // }


    renderMarker(){
      // console.log('kdnsjsnjnsjfcnsdjcnfsdjnfjksdksmd djsnfjsdnfjs',this.props.requests);
      // const req = this.props.requests;
      // console.log("hhhiiiiii marker",this.state.marker);
      // console.log("this.state.marker",this.state.marker);
      // return (
      // <MapView.Marker 
      //   key={1}
      //   coordinate={[{latitude: this.state.marker[1].st_x, longitude:this.state.marker[1].st_y}]}
      // />
      // )
      const arr = this.state.marker.map((el) => {
        return {coordinates : {latitude: el.st_x, longitude: el.st_y, title: el.name,description: el.subject }}
      });
      // console.log("arr", arr);
      return arr.map((marker, index) => {
        return (<MapView.Marker 
          key={index}
          title={marker.coordinates.title}
          description={marker.coordinates.description.toString()}
          coordinate={{
            latitude: marker.coordinates.latitude,
            longitude: marker.coordinates.longitude
          }}
          // coordinate={marker.coordinates}
        />
        )
      })
      // return this.state.marker.map((el, index) => {
      //     return (<MapView.Marker 
      //       key={index}
      //       coordinate={arr}
      //     />
      //     )
      // }
      // )
    }



    renderMap(){
      // console.log('hhhhhooooo',this.props.requestss);
      // this.props.requestss
      const myLatLng = {lat: -25.363, lng: 131.044};
      // console.log('reeennnnder', this.state.marker);
      return (
        <View>
          <Text>ksnda</Text>
          <MapView style={{ alignSelf: 'stretch', height: 300, width: 300 }}
          region={this.state.mapRegion}
          // provider={MapView.PROVIDER_GOOGLE}
          onRegionChange={this._handleMapRegionChange}
        >
        {/* {this.state.marker.map((el) => {
        <MapView.Marker
          coordinate={{latitude: el.st_x, longitude: el.st_y}}
        />
        })} */}
        {/* {(this.state.marker) ? this.renderMarker() : <Text></Text>} */}
        {/* <MapView.Marker 
        key={0}
        coordinate={{latitude: this.state.marker[0].st_x, longitude:this.state.marker[0].st_y}}
      /> */}
        {this.renderMarker()}
        </MapView>
        </View>
      )
    }

    render() {
      console.log('reeennnnder', this.state.marker);
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* <Text>MAP!!!!!</Text> */}
          {/* {(this.state.marker) ? this.renderMap() : <Text>NO Data</Text>} */}
          {/* {this.setMarkers(this.props.requests)} */}
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