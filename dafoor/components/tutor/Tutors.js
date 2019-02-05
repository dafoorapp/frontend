import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Profile from '../Profile';
import Requests from '../Requests';
import ActiveReq from './ActiveReq';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';


class ActiveReqScreen extends React.Component {
    render() {
      return (
        <ActiveReq />
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <Text>MAP!!!!!</Text>
        // </View>
      );
    }
  }
  
  class ProfileScreen extends React.Component {
    render() {
      return (
        // <Profile userInfo={this.props.userInfo} userData={this.props.userData}/>
        <Profile/>
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <Text>Profile!!!!!!</Text>
        // </View>
      );
    }
  }

  class RequestsScreen extends React.Component {
    render() {
      return (
        <Requests/>
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <Text>Requests!!!!!!</Text>
        // </View>
      );
    }
  }


  const tab = createBottomTabNavigator({
    ActiveReq: { screen: ActiveReqScreen },
    Requests: { screen: RequestsScreen },
    Profile: { screen: ProfileScreen },
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