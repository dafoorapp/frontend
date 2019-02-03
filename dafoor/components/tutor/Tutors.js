import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Profile from '../Profile';
import Requests from '../Requests';
import ActiveReq from './ActiveReq';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';


// export default class Tutors extends React.Component {
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
        <ActiveReq/>
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

    
  export default createAppContainer(createBottomTabNavigator({
    ActiveReq: { screen: MapScreen },
    Requests: { screen: RequestsScreen },
    Profile: { screen: ProfileScreen },
  }))

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });