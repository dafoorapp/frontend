import React from 'react';
// import { StyleSheet, Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
// import { Button } from 'react-native-elements';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';

export default class ReqForm extends React.Component {
    constructor(){
      super();
      this.state = {
        subject: undefined,
            items: [
                {
                    label: 'Mathmatics',
                    value: 'Math',
                },
                {
                    label: 'Physics',
                    value: 'Physics',
                },
                {
                    label: 'Computer',
                    value: 'Computer',
                },
            ],
        duration: undefined,
            options: [
                {
                    label: '1 hour',
                    value: '1',
                },
                {
                    label: '2 hours',
                    value: '2',
                },
                {
                    label: '3 hours',
                    value: '3',
                },
                {
                    label: '4 hours',
                    value: '4',
                },
                {
                    label: '5 hours',
                    value: '5',
                },
            ],
      }
    }

    makeRequest(){
      this.props.setSubjectAndDuration(this.state.subject, this.state.duration);
      this.props.makeRequest();
    }

    render() {
      return (
        <Content>

        <Text>Select the subject you want : </Text>
        
        <Content>
           <RNPickerSelect
                   
                    placeholder={{
                        
                    }}
                    items={this.state.items}
                    onValueChange={(value) => {
                        this.setState({
                            subject: value,
                        } , () => console.log(this.state.subject));
                    }}
                    />
          </Content>

                      
                    <Text>Select the duration of your session :</Text>
                    <Content>
                    <RNPickerSelect
                    placeholder={{
                       
                    }}
                    items={this.state.options}
                    onValueChange={(value) => {
                        this.setState({
                            duration: value,
                        } , () => console.log(this.state.duration));
                    }}
                    />
                    </Content>
                    <Button block warning onPress={() => this.makeRequest()}>
                    <Text>Make Req</Text>
                    </Button>
                    
                    {/* <Button title="Make Req" onPress={() => this.makeRequest()} /> */}
        </Content>
      );
    }
  }

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  //   input: {
  //     marginTop:50,
  //     width: 130
  //   },
  //   text:{
  //     fontSize:15,
  //     width:220,
  //     // fontWeight:'bold',
  //     marginTop:10
  //   }
  // });