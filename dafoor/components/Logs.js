import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from 'firebase';
import Profile from './Profile';
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

    handlelogs = (log) => {
      console.log('handlelogs');
      this.setState({
        typeOfLog: log
      })
    }

    renderLogs = () => {
      // if (this.state.typeOfLog === ''){
      //   console.log('loogs');
      //   <View style={styles.container}>
      //     <Button title="Sign In" onPress={this.handlelogs} />
      //     <Button title="Sign Up" onPress={this.handlelogs} />
      //   </View>
      // } 
      
      // else if (this.state.typeOfLog === 'signup') {
      //   if (this.state.activePage === 'profile') {
      //     console.log('profile');
      //     return (
            
      //       <Profile/>
      //       // <View>

      //       // </View>
      //     )
      //   } else {
      //     console.log('sign up')
      //     return (
      //       <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
      //         <Text>
      //         SIGN UP
      //         </Text>
      //         <TextInput
      //           placeholder="Email"
      //           autoCapitalize="none"
      //           // style={styles.textInput}
      //           onChangeText={email => this.setState({ email })}
      //           value={this.state.email}
      //         />
      //         <TextInput
      //           secureTextEntry
      //           placeholder="Password"
      //           autoCapitalize="none"
      //           // style={styles.textInput}
      //           onChangeText={password => this.setState({ password })}
      //           value={this.state.password}
      //         />
      //         <Button title="Sign Up" onPress={this.handleSignUp} />
      //       </View>
      //     )
      //   }
      // } else {
      //   return (
      //     <View>
      //       <Text>Sign in!</Text>
      //       <TextInput
      //         placeholder="Email"
      //         autoCapitalize="none"
      //         // style={styles.textInput}
      //         onChangeText={email => this.setState({ email })}
      //         value={this.state.email}
      //       />
      //       <TextInput
      //         secureTextEntry
      //         placeholder="Password"
      //         autoCapitalize="none"
      //         // style={styles.textInput}
      //         onChangeText={password => this.setState({ password })}
      //         value={this.state.password}
      //       />
      //       <Button title="Sign in" onPress={this.handleSignIn} />
      //     </View>
      //   )
      // }
    }

    renderSignin = () => {
      return (

      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
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
    }

    render() {
      return (
        <View style={styles.container}>
          <Text>LOGS</Text>
            { (this.state.typeOfLog === '') ? 
                <View style={styles.container}>
                  <Button title="Sign In" onPress={() => this.handlelogs('signin')} />
                  <Button title="Sign Up" onPress={() => this.handlelogs('signup')} />
                </View> 
            : (this.state.typeOfLog === 'signup') ? 
            (this.state.activePage === 'profile') ?
            <Profile/>
            :
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
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
            : 
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
            }
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

  // (this.state.activePage === '') ? 
  // <Logs/>
  // : 
  // (this.state.activePage === 'student') ? 
  // <Student/>
  // :
  // <Tutors/>