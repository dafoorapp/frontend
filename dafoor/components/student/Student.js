import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Map from './Map';
import Profile from '../Profile';
import Requests from '../Requests';


// export default class Student extends React.Component {
//     constructor(){
//       super();
//       this.state = {
//       }
//     }


//     render() {
//       return (
//         <View style={styles.container}>
//           <Text>Open up App.js to start working on your app!</Text>
//         </View>
//       );
//     }
//   }

class MapScreen extends React.Component {
    render() {
      return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <Text>MAP!!!!!</Text>
        // </View>
        <Map/>
      );
    }
  }
  
  class ProfileScreen extends React.Component {
    render() {
      return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <Text>Profile!!!!!!</Text>
        // </View>
        <Profile/>
      );
    }
  }

  class RequestsScreen extends React.Component {
    render() {
      return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <Text>Requests!!!!!!</Text>
        // </View>
        <Requests/>
      );
    }
  }

    
//   const TabNavigator = createBottomTabNavigator({
//     Map: { screen: MapScreen },
//     Requests: { screen: RequestsScreen },
//     Profile: { screen: ProfileScreen },
//   });
  
  export default createAppContainer(createBottomTabNavigator({
    Map: { screen: MapScreen },
    Requests: { screen: RequestsScreen },
    Profile: { screen: ProfileScreen },
  }))

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });