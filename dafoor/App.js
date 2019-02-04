import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Logs from './components/Logs';
import Student from './components/student/Student';
import Tutors from './components/tutor/Tutors';
import Profile from './components/Profile';
import firebase from 'firebase';
import ListOfTutors from './components/student/ListOfTutors';

const config = require('./components/firebase/config');

const API_URL = 'http://localhost:3000';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false, // check if the user loged in ot not 
      activePage: '', // check the state to render compnent
      userInfo: undefined,  // get user infomation,
      name: 'test',
      email: ''
    }
  }

  // check if the user logged in or out
  componentDidMount() {


    setIsLoggedIn = () => {
      this.setState({
        isLoggedIn: true
      })
      console.log ("@@@@ user is Loged in", this.state.isLoggedIn)
    }

    getUser = () => {
      console.log(`${API_URL}/users/${this.state.email}`)
      fetch(`${API_URL}/users/${this.state.email}`)
      .then(response => response.json())
      .then(data => {
        console.log('fetch user data', data.type )
        if (data.type === 'student') {
          this.setActivePage('student');
        } else {
          this.setActivePage('tutor');
        }
      })
      .catch(error => console.log('@@@#####',error))
    }

    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setIsLoggedIn();
        // getUser();
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
  
  setActivePage = (activePage) => {
    this.setState({activePage})
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log('User sign up!!!!');
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }


  
  render() {
    return (
        
          (this.state.isLoggedIn) ? 
            ((this.state.activePage === 'student') ? 
            <Student/>
            :
            <Tutors/>)
          :
          <Logs/>
        //  <ListOfTutors name={this.state.name}/> 
        

      /* <Button title="Sign Out" onPress={this.handleSignOut} />
      <Text>Sign up!</Text>
  
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
      <Button title="Sign Up" onPress={this.handleSignUp} />
*/

      /* <Button title="Sign Out" onPress={this.handleSignOut} />

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
      
      <Button title="Sign in" onPress={this.handleSignIn}/>  */
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
