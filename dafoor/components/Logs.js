import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from 'firebase';
// import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const config = require('./firebase/config');


export default class Logs extends React.Component {
    constructor(){
      super();
      this.state = {
        typeOfLog: '',
        userType: '',
        activePage: '',
        email: '',
        password: '',
        errorMessage: null
      }
    }

    componentWillMount(){
      firebase.initializeApp(config);
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

    renderLogs(){
      if (this.state.typeOfLog === 'signup') {
        if (this.state.activePage === 'profile') {
          return (
            <div>

            </div>
          )
        }
        return (
          <View>
            <Text>
            SIGN UP
            </Text>
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
          </View>
        )
      } else {
        return (
          <View>
            <Text>Sign in!</Text>
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
            <Button title="Sign in" onPress={this.handleSignIn} />
          </View>
        )
      }
    }
    render() {
      return (
        <View style={styles.container}>
          <Text>LOGS</Text>
            {this.renderLogs()}
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