import React from 'react';
import { StyleSheet, Text, View , TextInput, Picker} from 'react-native';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { Button, ThemeProvider} from 'react-native-elements';
import { Input , ButtonGroup } from 'react-native-elements';
import firebase from 'firebase';

const API_URL = 'http://localhost:3000';

export default class Profile extends React.Component {
    constructor(props){
      super(props);
      console.log('hiiiiiii', props.screenProps.userData.name)
      this.state = {
        name: props.screenProps.userData ? props.screenProps.userData.name : '',
        // gender:'',
        phone_number: props.screenProps.userData ? props.screenProps.userData.phone_number : '',
        latitude:null,
        longitude:null,
        location : null,
        subject:'',
        price: '',
        
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
          user_id: this.props.userInfo.user_id
        }
      }else if(this.props.userInfo.type === 'tutor'){
        userData = {
          name: this.state.name,
          phone_number: this.state.phone_number,
          gender: this.state.gender,
          location: location,
          subject: this.state.subject,
          price: this.state.price,
          user_id: this.props.userInfo.user_id
        }
      }
      console.log("*****",userData)
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

      })
      .catch(error => console.log(error))
    }
    
    // handleChange(event){
    //   const currentInput = event.target.name;
    //   const newValue = event.target.value;
    //   console.log('current input: ', currentInput);
    //   console.log('newValue: ', newValue);
    //   this.setState({
    //     [currentInput]: newValue
    //   }, function(){
    //     console.log(this.state);
    //   })
    // }

    handleSubmit(event) { //
      event.preventDefault();
      
    }

    handleSignOut = () => {
      firebase.auth().signOut().then(() => {
        console.log('sign out!!!')
        this.setState({isLoggedIn: false})
      });
    }


    render() {
      return (
        
        <View style={styles.container}>
         
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
                    style= {styles.input}
                    placeholder={{
                        
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

          {/* the buttons gonna be displayed based on a conditional */}
          <Button style = {styles.button}title="Submit!" onPress = {() => this.createProfile()} /> 
          <Button title="Edit!" />    

          <Button title = "sign out" onPress = {this.handleSignOut} />    
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


  