import React from 'react';
import { StyleSheet, Text, View , TextInput, Picker} from 'react-native';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { Button, ThemeProvider} from 'react-native-elements';
import { Input , ButtonGroup } from 'react-native-elements';

export default class Profile extends React.Component {
    constructor(){
      super();
      this.state = {
        name:'',
        // gender:'',
        phone_number:'',
        latitude:null,
        longitude:null,
        location : null,
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


    render() {
      return (
        
        <View style={styles.container}>
         
         <Input style = {styles.input}
          onChangeText = {(name) => console.log(name)}
          placeholder='name'
          leftIcon={{ type: 'font-awesome', name: 'user', marginRight: 20}}
          errorMessage='Enter your name here' 
          />
                    <RNPickerSelect
                    style= {styles.input}
                    placeholder={{
                        
                    }}
                    name="gender"
                    items={this.state.items}
                    onValueChange={(value) => {
                        this.setState({
                            gender: value,
                        } , () => console.log(this.state.gender));
                    }}
                    />

         {/* <Input style = {styles.input}
          onChangeText = {(gender) => console.log(gender)}
          placeholder='Gender'
          leftIcon={{ type: 'font-awesome', name: 'male' ,marginRight: 20}}
          errorMessage='Enter your Gender here' 
          /> */}

         <Input style = {styles.input}
         keyboardType = 'numeric'
          onChangeText = {(phone_number) => console.log(phone_number)}
          placeholder='####'
          leftIcon={{ type: 'font-awesome', name: 'phone',marginRight: 20 }}
          errorMessage='Enter your phone here' 
          />

          {/* the buttons gonna be displayed based on a conditional */}
          <Button style = {styles.button}title="Submit!" /> 
          <Button title="Edit!" />        
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


  