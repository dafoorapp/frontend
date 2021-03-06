import React from 'react';
import { StyleSheet, Text, View , TextInput, Picker , Alert} from 'react-native';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { Button, ThemeProvider} from 'react-native-elements';
import { Input , CheckBox } from 'react-native-elements';
import firebase from 'firebase';
import { Header, Container } from 'native-base';


const API_URL = 'https://pure-journey-39294.herokuapp.com';

export default class Profile extends React.Component {
    constructor(props){
      super(props);
      // console.log('hiiiiiii', props.screenProps.userData.name)
      this.state = {
        name: '',
        // gender:'',
        phone_number:'',
        latitude:null,
        longitude:null,
        location : null,
        subject:[],
        price: '',
        // user_id: '',
        
        error:'',
        gender: undefined,
            items: [
                {
                    label: 'Male',
                    value: 'M',
                },
                {
                    label: 'Female',
                    value: 'F',
                },
            ],

            topics : {
              math:false,
              physics:false,
              computer:false,
            },
            state: true
            
      }
      
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          },() => {

            console.log("lat *********",this.state.latitude)
            console.log("long *********",this.state.longitude)
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
      
      (this.props.screenProps !== undefined) ?
      this.setUserData()
      :
      ''; 

    }

    setUserData(){
      this.setState({
        name: this.props.screenProps.userData.name,
        phone_number: this.props.screenProps.userData.phone_number,
        subject: this.props.screenProps.userData.subject,
        price: this.props.screenProps.userData.cost,
      })
    }

    createProfile = () => {
      console.log("Ana USERINFOO ",this.props.userInfo)
      const url = API_URL + '/' + this.props.userInfo.type + 's';
      console.log(url);
      let userData ;
      const location = `${this.state.latitude} ${this.state.longitude}`;
      console.log("%%%%",location);
      if(this.props.userInfo.type === 'student'){
        userData = {
          name: this.state.name,
          phone_number: this.state.phone_number,
          gender: this.state.gender,
          location: location,
          user_id: this.props.userInfo.id
        }
      }else if(this.props.userInfo.type === 'tutor'){

        const subject = Object.keys(this.state.topics).filter(el => {
          if (this.state.topics[el] === true) {
            return el;
          }
          // return this.state.topics[el] === true ? el : null
        })
        console.log("Ana subject" , subject);
        userData = {
          name: this.state.name,
          phone_number: this.state.phone_number,
          gender: this.state.gender,
          location: location,
          subject: subject,
          price: this.state.price,
          user_id: this.props.userInfo.id
        }
      }

      console.log("*****",userData)
       if(this.props.userInfo.type === 'student'){
        userData = {
          name: this.state.name,
          phone_number: this.state.phone_number,
          gender: this.state.gender,
          location: location,
          user_id: this.props.userInfo.id
        }
      }else if(this.props.userInfo.type === 'tutor'){

        const subject = Object.keys(this.state.topics).filter(el => {
          if (this.state.topics[el] === true) {
            return el;
          }
          // return this.state.topics[el] === true ? el : null
        })
        console.log("Ana subject" , subject);
        userData = {
          name: this.state.name,
          phone_number: this.state.phone_number,
          gender: this.state.gender,
          location: location,
          subject: subject,
          price: this.state.price,
          user_id: this.props.userInfo.id
        }
      }
      fetch(url,{
        method:'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.props.setActivePage(this.props.userInfo.type);

      })
      .catch(error => console.log(error))
    }
    

    editProfile = () => {

      console.log("ANA EDIT" , this.props.screenProps.userInfo.type);
      let userData;
      const location = `${this.state.latitude} ${this.state.longitude}`;
      if(this.props.screenProps.userInfo.type === 'student'){
        userData = {
          name: this.state.name,
          phone_number: this.state.phone_number,
          gender: this.props.screenProps.userData.gender,
          location: location,
          user_id: this.props.screenProps.userInfo.id
        }
      }else if(this.props.screenProps.userInfo.type === 'tutor'){

        const subject = Object.keys(this.state.topics).filter(el => {
          if (this.state.topics[el] === true) {
            return el;
          }
          // return this.state.topics[el] === true ? el : null
        })
        console.log("Ana subject" , subject);
        userData = {
          name: this.state.name,
          phone_number: this.state.phone_number,
          gender: this.props.screenProps.userData.gender,
          location: location,
          rating: "4",
          subject: subject,
          price: this.state.price,
          state: this.state.state,
          user_id: this.props.screenProps.userInfo.id
        }
      }
      
      console.log("ANA GENDER : " , this.props.screenProps.userData.gender)
      url = API_URL + '/' + this.props.screenProps.userInfo.type + 's/' + this.props.screenProps.userInfo.id
      fetch(url,{
        method: 'PUT',
        headers:{
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(data => {
        console.log("Ana Editied DATA ",data)
        Alert.alert(
          'Edited',
          'you have updated your profile',
        )
      })
      .catch(error => console.log(error));
    }

    handleSignOut = () => {
      firebase.auth().signOut().then(() => {
        console.log('sign out!!!')
        this.props.screenProps.setIsLoggedIn(false);
        // this.setState({isLoggedIn: false})
        // this.props.screenProps.setActivePage('');
      });
    }

    studentForm = () => {

        return( 
          <View> 
          <Input style = {styles.input}
          name="name"
          value={this.state.name}
          onChangeText={(value) => {
            this.setState({
                name: value,
            } , () => console.log( "Ana name" ,this.state.name));
        }}
          placeholder='name'
          leftIcon={{ type: 'font-awesome', name: 'user', marginRight: 20}}
          errorMessage='Enter your name here' 
          />
                    <RNPickerSelect
                    value={this.state.gender}
                    style= {styles.input}
                    placeholder={{
                        label: 'Select a Gender...',
                        value: "M",
                        color: '#9EA0A4',
                    }}
                    // name="gender"
                    items={this.state.items}
                    onValueChange={(value) => {
                        this.setState({
                            gender: value,
                        } , () => console.log( "Ana gender" ,this.state.gender));
                    }}
                    />

         <Input style = {styles.input}
         value={this.state.phone_number}
         keyboardType = 'numeric'
          name="phone_number"
          onChangeText={(value) => {
            this.setState({
                phone_number: value,
            } , () => console.log( "Ana phone_number" ,this.state.phone_number));
        }}
          placeholder='####'
          leftIcon={{ type: 'font-awesome', name: 'phone',marginRight: 20 }}
          errorMessage='Enter your phone here' 
          />

          <Button title="Edit!" onPress = {() => this.editProfile()}/>    

          </View>
         )
    }

    toggleTopics = (topic) => {
      this.setState({
        topics: {
          ...this.state.topics,
          [topic]: !this.state.topics[topic]
        }
      }, function(){
        console.log('in toggleTopics:')
        console.log(this.state.topics)
      })
    }

    tutorForm = () => {

      return(
        <View>
        <Input style = {styles.input}
        value={this.state.name}
        name="name"
        onChangeText={(value) => {
          this.setState({
              name: value,
          } , () => console.log( "Ana name" ,this.state.name));
      }}
        placeholder='name'
        leftIcon={{ type: 'font-awesome', name: 'user', marginRight: 20}}
        errorMessage='Enter your name here' 
        />

                  <RNPickerSelect
                  value={this.state.gender}
                  style= {styles.input}
                  placeholder={{
                      label: 'Select a Gender...',
                      value: "M",
                      color: '#9EA0A4',
                  }}
                  // name="gender"
                  items={this.state.items}
                  onValueChange={(value) => {
                      this.setState({
                          gender: value,
                      } , () => console.log( "Ana gender" ,this.state.gender));
                  }}
                  />

       <Input style = {styles.input}
       value={this.state.phone_number}
       keyboardType = 'numeric'
        name="phone_number"
        onChangeText={(value) => {
          this.setState({
              phone_number: value,
          } , () => console.log( "Ana phone_number" ,this.state.phone_number));
      }}
        placeholder='####'
        leftIcon={{ type: 'font-awesome', name: 'phone',marginRight: 20 }}
        errorMessage='Enter your phone here' 
        />

      <CheckBox
      value={this.state.topics.math}
      center
      title="Math"
      checked={this.state.topics.math}
      onPress = {() => {
        this.toggleTopics('math')
        console.log(this.state.math);
      }   
      }/>

      <CheckBox
      value={this.state.topics.physics}
      center
      title="Physics"
      checked={this.state.topics.physics}
      onPress = {() => {
        this.toggleTopics('physics')
        console.log(this.state.physics);
      }   
      }/>

      <CheckBox
      value={this.state.topics.computer}
      center
      title="Computer"
      checked={this.state.topics.computer}
      onPress = {() => {
        this.toggleTopics('computer')
        console.log(this.state.computer);
      }   
      }/>

      <Input style = {styles.input}
       keyboardType = 'numeric'
       value= {this.state.price}
        onChangeText={(value) => {
          this.setState({
            price: value,
          } , () => console.log( "Ana price" ,this.state.price));
        }}
        placeholder='####'
        leftIcon={{ type: 'font-awesome', name: 'money',marginRight: 20 }}
        errorMessage='Cost per Hour' 
        />

    <Button title="Edit!" onPress = {() => this.editProfile()}/>    

        </View>

      )
      
    }
    
    render() {
      // console.log(this.props.isLoggedIn);
      return (
        <Container>
            <Header>
            <Text>DAFOOR</Text>
            </Header>
            {
              (!this.props.newUser) ?
              

                 ( (this.props.screenProps.userInfo.type === 'student') ?
                  this.studentForm()
                :
                  this.tutorForm())
                :
              (this.props.userInfo.type === 'student') ?
              this.studentForm()
                :
                this.tutorForm()
          
                
           }
      
          {/* the buttons gonna be displayed based on a conditional */}
          <Button style = {styles.button}title="Submit!" onPress = {() => this.createProfile()} /> 

          <Button title = "sign out" onPress = {() => {this.handleSignOut()}}  />    
        </Container>
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
    form: {
      height:30,
      width: 150,
      borderColor: 'black',
      borderWidth: 1.0,
    },

    input: {  
      width: 100
    }
   

  });