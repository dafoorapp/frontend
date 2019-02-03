import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Auth from './components/firebase/Auth'
import Logs from './components/Logs';
import Student from './components/student/Student';
import Tutors from './components/tutor/Tutors';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false, // check if the user loged in ot not 
      activePage: 'jsdj', // check the state to render compnent
      userInfo: undefined  // get user infomation 
    }
  }
  
  render() {
    return (
      <View>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        {/* <Auth/> */}
        {/* <Logs/> */}
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
