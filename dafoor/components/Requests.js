import React from 'react';
import { StyleSheet, Text, View, ListView, FlatList, List} from 'react-native';
import { ListItem } from 'react-native-elements';
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
      fetch(`${API_URL}/requests/${this.state.userInfo.type}s/${this.state.userInfo.id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          requests: data
        })
      })
      .catch(error => console.log(error))
    }

    renderRequests(requests) {
      // console.log("requestsrequestsrequestsrequests",requests);
      return requests.map((el,index) => {
           return (
             <View key={index}>
               {/* <Text>Name: {el.name}</Text> */}
               <Text>Date: {el.date}</Text>
               <Text>Cost: {el.cost}</Text>
               <Text>Subject: {el.subject}</Text> 
               <Text>duration: {el.duration}</Text> 
               <Text>{this.state.userInfo.type} name: {el.name}</Text>
              </View>
              //  <Map/>
           );
       });
   }

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: 'black' }}>
          <Text>Requests</Text>
          {
            (this.state.requests) ?

            this.renderRequests(this.state.requests)
          :
          <Text></Text>}
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