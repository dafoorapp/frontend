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
      activePage: 'tutor', // check the state to render compnent
      userInfo: undefined,  // get user infomation from users table
      userData: undefined, // get user infomation from userType table
      name: 'test',
      email: '',
      signUp: false,
    }
  }

  // check if the user logged in or out
  componentDidMount() {
    const setIsLoggedIn = this.setIsLoggedIn;
    const getUserInfo = this.getUserInfo;
    const setUserEmail = this.setUserEmail;
    
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log(user)
        // setIsLoggedIn();
        setUserEmail(user.email);
        getUserInfo();
        // console.log(user);
      } else {
        console.log('no user');
      }
    });



    // setIsLoggedIn = () => {
    //   this.setState({
    //     isLoggedIn: true
    //   })
    //   console.log ("@@@@ user is Loged in", this.state.isLoggedIn)
    // }

    // getUser = () => {
    //   console.log(`${API_URL}/users/${this.state.email}`)
    //   fetch(`${API_URL}/users/${this.state.email}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('fetch user data', data.type )
    //     if (data.type === 'student') {
    //       this.setActivePage('student');
    //     } else {
    //       this.setActivePage('tutor');
    //     }
    //   })
    //   .catch(error => console.log('@@@#####',error))
    // }
    
  }

  setUserEmail = (email) => {
    this.setState({email})
    console.log(this.state.email)
  }

  setIsLoggedIn = () => {
    this.setState({
      isLoggedIn: true
    })
    console.log ("@@@@ user is Loged in", this.state.isLoggedIn)
  }

  getUserInfo = () => {
    fetch(`${API_URL}/users/${this.state.email}`)
    .then(response => response.json())
    .then(data => {
      this.setState({ userInfo: data })
      console.log(data)
      console.log('fetch user data', data.type )
      this.getUserData();
      if (data.type === 'student') {
        this.setActivePage('student');
      } else {
        this.setActivePage('tutor');
      }
    })
    .catch(error => console.log(error))
  }

  getUserData = () => {
    const setIsLoggedIn = this.setIsLoggedIn;
    console.log(`${API_URL}/${this.state.userInfo.type}s/${this.state.userInfo.id}`)
    fetch(`${API_URL}/${this.state.userInfo.type}s/${this.state.userInfo.id}`)
    .then(response => response.json())
    .then(data => {
      setIsLoggedIn();
      this.setState({ userData : data})
      console.log('fetch user userdata', data )
    })
    .catch(error => console.log(error))
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
    this.setState({activePage}, () => {console.log("hi keefeek : " , this.state.activePage)})
    // console.log("hi keefeek : " , this.state.activePage);
  }

  // handleSignUp = () => {
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(this.state.email, this.state.password)
  //     .then(() => {
  //       console.log('User sign up!!!!');
  //     })
  //     .catch(error => this.setState({ errorMessage: error.message }))
  // }


// renderActivePage = () => {
//   if(this.state.activePage === 'profile'){
//     return <Profile userInfo = {this.state.userInfo} setActivePage = {this.setActivePage.bind(this)} userData = {this.state.userData} />
//   } else if (this.state.activePage === 'tutor'){
//        return <Tutors userInfo={this.state.userInfo} userData={this.state.userData}/>
//   } else if (this.state.activePage === 'student'){
//     return <Student userInfo={this.state.userInfo} userData={this.state.userData}/>
     
//   }
// }

renderActivePage = () => {
  if(this.state.activePage === 'profile'){
    return (
      (this.state.userData) ?
     <Profile userInfo = {this.state.userInfo} userData = {this.state.userData}/> : <Text></Text>
    )
  } else if (this.state.activePage === 'tutor'){
       return (
        (this.state.userData) ?
       <Tutors userInfo={this.state.userInfo} userData={this.state.userData} isLoggedIn= {this.state.isLoggedIn}/> : <Text></Text>
       )
  } else if (this.state.activePage === 'student'){
     return (
      (this.state.userData) ? <Student userInfo={this.state.userInfo} userData={this.state.userData} isLoggedIn= {this.state.isLoggedIn}/> : <Text></Text>

     )
  }
} 

signedUpUser = (userInfo) => {
  this.setState({userInfo});
  this.setActivePage('profile');
  console.log('&&&&&&&&& ^^^^^^^^ ',this.state.userInfo);
  this.setIsLoggedIn();
  // Object.keys(this.state.userInfo).forEach(el => {
  //   console.log(el + ':' + this.state.userInfo[el])
  // })
}
  render() {
    return (
        
            (this.state.isLoggedIn) ? 
            (this.renderActivePage()) : <Logs setIsLoggedIn={this.setIsLoggedIn.bind(this)} 
                                              setActivePage ={this.setActivePage.bind(this)}
                                              signedUpUser={this.signedUpUser.bind(this)}
                                            />
 
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

// 
