import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from 'firebase';
import Profile from './Profile';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
// import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
const API_URL = 'http://localhost:3000';

const config = require('./firebase/config');

export default class Logs extends React.Component {
  constructor() {
    super();
    this.state = {
      typeOfLog: '',
      // userType: '',
      activePage: '',
      email: '',
      password: '',
      errorMessage: null,
      userType: undefined,
      items: [
        {
          label: 'Student',
          value: 'student',
        },
        {
          label: 'Tutor',
          value: 'tutor',
        },
      ],
      test: undefined,
    }
  }
    
    sendData = (data) => {
      
      // this.props.setActivePage('profile'); 
    }


    componentDidMount(){
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n rendering logs")
    }
    createUser = () => {
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');

      const userData = {
        email: this.state.email,
        type: this.state.userType
      }

      const url = API_URL + '/users';
      axios.post(url, userData)
        .then(data => {
          console.log("DAATAAA", Object.keys(data.data).join(", "))
          
            // console.log("dncknscknsdkcnskdn",this.state.test);
            console.log(data.data);
            this.props.signedUpUser(data.data);
          
          console.log('state set')
        })
        .catch(console.log)
      
      // fetch(url,{
      //   method:'POST',
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(userData)
      // })
      // .then(response => response.json())
      // .then((data) => {
      //   console.log("ANA DATA :");
      //   console.log(data);
      //   // this.props.signedUpUser(data);
      //   // console.log("*&*&*&*&", oldThis == this);
      //   oldThis.setState({test: data})
      //   console.log("after")

      // })
      // .catch(error => console.log(error));
    }
    
    handleSignUp = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('User sign up!!!!');
          this.createUser();
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
      return(
        <View>
          <Button title="Sign In" onPress={() => this.handlelogs('sign-in')} />
          <Button title="Sign Up" onPress={() => this.handlelogs('sign-up')} />
        </View>
      )
    }

    renderLogForm = () => {
      console.log('prrrroooofile ',this.state.activePage);
      return(
        <View>
          {
            // this.state.activePage === 'profile' ? <Profile/> : 
           this.state.typeOfLog === 'sign-up' ? <Text>Sign Up</Text>: <Text>Sign In</Text> }
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          {this.state.typeOfLog === 'sign-up' ? 
          <View style={{marginTop : 15}}> 
            {/* <TextInput 
            placeholder="Student or Tutor" 
            autoCapitalize="none"
            onChangeText={userType => this.setState({ userType })}
            value={this.state.userType}
            /> */}
            <Text>Account type</Text>
            <RNPickerSelect
                    
                    placeholder={{
                        
                    }}
                    name="type"
                    items={this.state.items}
                    onValueChange={(value) => {
                        this.setState({
                            userType: value,
                        } , () => console.log(this.state.userType));
                    }}
                    />
          
            <Button style= {{marginTop:15}} title="Sign Up" onPress={this.handleSignUp} />
          </View>
            :
            <Button  title="Sign in" onPress={this.handleSignIn} />
          }
        </View>
      )
    }

    render() {
      return (
        <View style={styles.container}>
        <Text>LOGS</Text>
        { this.state.typeOfLog === '' ? this.renderLogs() : this.renderLogForm() }
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