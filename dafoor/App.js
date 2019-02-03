import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Logs from './components/Logs';
import Profile from './components/Profile';
import firebase from 'firebase';

const config = require('./components/firebase/config');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false, // check if the user loged in ot not 
      activePage: '', // check the state to render compnent
      userInfo: undefined  // get user infomation 
    }
  }

  // check if the user logged in or out
  componentWillMount() {

    setIsLoggedIn = () => {
      this.setState({
        isLoggedIn: true
      })
      console.log ("@@@@@@@@@@@@", this.state.isLoggedIn)
    }

    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setIsLoggedIn();
        // console.log(user);
      } else {
        console.log('no user');
      }
    });
    
  }
 
  handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('sign out!!!')
      this.setState({isLoggedIn: false})
    });
  }

  handleSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      console.log("User sign in!!!!");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      // ...
    });

  }
  
  // renderActivePage = () => {
  //   if (this.state.isLoggedIn){
  //     console.log('@@ profile @@');
  //     <Profile /> 
  //   } else { 
  //   }
  // }
  
  render() {
    return (
      <View style={styles.container}>
      {(this.state.isLoggedIn)?  <Profile /> : null}
      <Button title="Sign Out" onPress={this.handleSignOut} />
      {/* {this.renderActivePage()} */}
        <TextInput
        placeholder="Email"
        autoCapitalize="none"
        // style={styles.textInput}
        onChangeText={email => this.setState({ email })}
        value={this.state.email}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        // style={styles.textInput}
        onChangeText={password => this.setState({ password })}
        value={this.state.password}
      />
      <Button title="Sign in" onPress={this.handleSignIn}/>

     
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
