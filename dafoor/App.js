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

const API_URL = 'https://pure-journey-39294.herokuapp.com';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false, // check if the user loged in ot not 
      activePage: '', // check the state to render compnent
      userInfo: undefined,  // get user infomation from users table
      userData: undefined, // get user infomation from userType table
      name: 'test',
      email: '',
      signUp: false,
      newUser: true
    }
  }

  // check if the user logged in or out
  componentDidMount() {
    const getUserInfo = this.getUserInfo;
    const setUserEmail = this.setUserEmail;
    
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUserEmail(user.email);
        getUserInfo();
        // console.log(user);
      } else {
        console.log('no user');
      }
    });
 
  }

  setUserEmail = (email) => {
    this.setState({email})
    console.log(this.state.email)
  }

  setIsLoggedIn = (isLoggedIn) => {

    console.log("\n\n\n\n\n\n\n\n\n\n\************************* siginout" ,  )
    this.setState({
      isLoggedIn
    })
    console.log ("@@@@ user is Loged in", this.state.isLoggedIn)
  }

  getUserInfo = () => {
    fetch(`${API_URL}/users/${this.state.email}`)
    .then(response => response.json())
    .then(data => {
      this.setState({ userInfo: data })
      console.log(data)
      console.log('fetch user info', data.type )
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
    // const setIsLoggedIn = this.setIsLoggedIn;
    console.log(`${API_URL}/${this.state.userInfo.type}s/${this.state.userInfo.id}`)
    fetch(`${API_URL}/${this.state.userInfo.type}s/${this.state.userInfo.id}`)
    .then(response => response.json())
    .then(data => {
      this.setState({ userData : data});
      this.setIsLoggedIn(true);
      console.log('fetch user data', data )
    })
    .catch(error => console.log(error))
  } 

 


  
  setActivePage = (activePage) => {
    this.setState({activePage}, () => {console.log("hi keefeek : " , this.state.activePage , this.state.isLoggedIn)})
    // console.log("hi keefeek : " , this.state.activePage);
  }

 




// renderActivePage = () => {
//   if(this.state.activePage === 'profile'){
//     return (
//       (this.state.userInfo) ?
//      <Profile setActivePage = {this.setActivePage.bind(this)} userInfo = {this.state.userInfo} userData = {this.state.userData} newUser = {this.state.newUser} /> : <Text></Text>
//     )
//   } else if (this.state.activePage === 'tutor'){
//        return (
//         (this.state.userData) ?
//        <Tutors userInfo={this.state.userInfo} userData={this.state.userData} isLoggedIn= {this.state.isLoggedIn } newUser = {false}/> : <Text>sdhxjdh</Text>
//        )
//   } else if (this.state.activePage === 'student'){
//      return (
//       (this.state.userData) ? <Student userInfo={this.state.userInfo} userData={this.state.userData} newUser = {false} setActivePage = {this.setActivePage.bind(this)} setIsLoggedIn = {this.setIsLoggedIn} />: <Text></Text>

//      )
//   }
// } 

signedUpUser = (userInfo) => {
  this.setState({userInfo});
  this.setActivePage('profile');
  console.log('&&&&&&&&& ^^^^^^^^ ',this.state.activePage);
  // this.getUserData()
  this.setIsLoggedIn(true);
  // Object.keys(this.state.userInfo).forEach(el => {
  //   console.log(el + ':' + this.state.userInfo[el])
  // })
}

  render() {
    return (
        
            (this.state.isLoggedIn) ? (

              this.state.activePage === 'profile' ? 
              ((this.state.userInfo) ? <Profile setActivePage = {this.setActivePage.bind(this)} userInfo = {this.state.userInfo} userData = {this.state.userData} newUser = {this.state.newUser}  /> : <Text></Text>):
              this.state.activePage === 'tutor' ? 
              ((this.state.userData) ? <Tutors userInfo={this.state.userInfo} userData={this.state.userData} isLoggedIn= {this.state.isLoggedIn } newUser = {false} setIsLoggedIn={this.setIsLoggedIn}/> : <Text>sdhxjdh</Text>) : 
              this.state.activePage === 'student'? 
              ((this.state.userData) ? <Student userInfo={this.state.userInfo} userData={this.state.userData} newUser = {false} setActivePage = {this.setActivePage.bind(this)} setIsLoggedIn={this.setIsLoggedIn}/> : <Text></Text>) 
              
              : <Text></Text>
            ) :  <Logs setIsLoggedIn={this.setIsLoggedIn} 
                                              setActivePage ={this.setActivePage.bind(this)}
                                              signedUpUser={this.signedUpUser.bind(this)}
                                            />
 



            // (this.renderActivePage()) : <Logs setIsLoggedIn={this.setIsLoggedIn.bind(this)} 
            //                                   setActivePage ={this.setActivePage.bind(this)}
            //                                   signedUpUser={this.signedUpUser.bind(this)}
            //                                 />
 
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
