import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Profile from '../Profile';
import Requests from '../Requests';
import ActiveReq from './ActiveReq';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

// class MapScreen extends React.Component {
//     render() {
//       return (
//         // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         //   <Text>MAP!!!!!</Text>
//         // </View>
//         <ActiveReq/>
//       );
//     }
//   }
  
//   class ProfileScreen extends React.Component {
//     render() {
//       return (
//         // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         //   <Text>Profile!!!!!!</Text>
//         // </View>
//         <Profile/>
//       );
//     }
//   }

//   class RequestsScreen extends React.Component {
//     render() {
//       return (
//         // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         //   <Text>Requests!!!!!!</Text>
//         // </View>
//         <Requests/>
//       );
//     }
//   }


  const tab = createBottomTabNavigator({
      ActiveReq: { screen: ActiveReq },
      Requests: { screen: Requests },
      Profile: { screen: Profile },
  });

  const TutorsTab = createAppContainer(tab);

  export default class Tutors extends React.Component {

    render() {
      return (
        <TutorsTab></TutorsTab>
      );
    }
  }


    
  // export default createAppContainer(createBottomTabNavigator({
  //   ActiveReq: { screen: MapScreen },
  //   Requests: { screen: RequestsScreen },
  //   Profile: { screen: ProfileScreen },
  // }))

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });