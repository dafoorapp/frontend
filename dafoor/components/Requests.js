import React from 'react';
// import { StyleSheet, Text, View, ListView, FlatList, List} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, ListItem } from 'native-base';
import Map from './student/Map';
const API_URL = 'http://localhost:3000';

export default class Requests extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        requests : undefined,
        userData: props.screenProps.userData,
        userInfo: props.screenProps.userInfo
      }
    }  

    componentDidMount(){
      console.log(`${API_URL}/requests/${this.props.screenProps.userInfo.type}s/${this.props.screenProps.userInfo.id}`)
      fetch(`${API_URL}/requests/${this.props.screenProps.userInfo.type}s/${this.props.screenProps.userInfo.id}`)
      .then(response => response.json())
      .then(data => {
        console.log('reeeeeqqqquest %% DDDDAAAATTTTAAA', data);
        this.setState({
          requests: data
        })
      })
      .catch(error => console.log(error))
    }

    renderRequests(requests) {
      console.log("requestsrequestsrequestsrequests",requests);
      return requests.map((el,index) => {
           return (
             <Content key={index}>
               <Text>Date: {el.date}</Text>
               <Text>Cost: {el.cost}</Text>
               <Text>Subject: {el.subject}</Text> 
               <Text>duration: {el.duration}</Text> 
               <Text>{this.state.userInfo.type} name: {el.name}</Text>
               {/* <Text>Name: {el.name}</Text> */}
              </Content>
              //  <Map/>
           );
       });
   }

    render() {
      return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: 'black' }}>
        <Container>

            <Header>
            <Text>DAFOOR</Text>
            </Header>
          <Text>Requests</Text>
          {this.state.requests? 
            this.renderRequests(this.state.requests) : <Text>Empty</Text>}
            </Container>
        // </View>
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
  // });