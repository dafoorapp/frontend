import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Map from './Map';
import ReqForm from './ReqForm';
import Profile from '../Profile';
import Requests from '../Requests';

class MapScreen extends React.Component {
    render() {
      return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <Text>MAP!!!!!</Text>
        // </View>
        <View style={styles.container}>
          <Map/>
          <ReqForm/>
        </View>
      );
    }
  }
  
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

    
//   const TabNavigator = createBottomTabNavigator({
//     Map: { screen: MapScreen },
//     Requests: { screen: RequestsScreen },
//     Profile: { screen: ProfileScreen },
//   });
  
  // export default createAppContainer(createBottomTabNavigator({
  //   Map: { screen: MapScreen },
  //   Requests: { screen: RequestsScreen },
  //   Profile: { screen: ProfileScreen },
  // }))


  const MyApp = createBottomTabNavigator({
    Map: { screen: MapScreen },
    Requests: { screen: Requests },
    Profile: { screen: Profile },
  });

const StudentsTab = createAppContainer(MyApp)

export default class Student extends React.Component {

  render() {
    return (
        <StudentsTab></StudentsTab>
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