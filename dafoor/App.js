import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Auth from './components/firebase/Auth'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false, // check if the user loged in ot not 
      activePage: '', // check the state to render compnent
      userInfo: undefined  // get user infomation 
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        {/* <Auth/> */}
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
