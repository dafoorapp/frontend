import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import firebase from 'firebase';

export default class Auth extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    
    componentWillMount() {
      // To Configure react native app with cloud of Google Firebase database !
      var config = {
        apiKey: "AIzaSyCoMq1U6oZXK4s2eBSjlS482XzANamrpOg",
        authDomain: "dafoor-7084a.firebaseapp.com",
        databaseURL: "https://dafoor-7084a.firebaseio.com",
        projectId: "dafoor-7084a",
        storageBucket: "dafoor-7084a.appspot.com",
        messagingSenderId: "1017463761509"
      };
      firebase.initializeApp(config);
  
    }
  
    componentDidMount(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(user);
        } else {
          console.log('no user')
        }
      });
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
  
    handleSignOut = () => {
        firebase.auth().signOut().then(() => {
          console.log('sign out!!!')
        });
    }
  
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
      <Button title="Sign Out" onPress={this.handleSignOut} />
    </View>
    )
  }
  
  }