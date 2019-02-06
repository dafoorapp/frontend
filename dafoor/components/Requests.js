import React from 'react';
import { StyleSheet, Text, View, ListView, FlatList, List} from 'react-native';
import { ListItem } from 'react-native-elements';
import Map from './student/Map';

const API_URL = 'http://localhost:3000';

export default class Requests extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        requests : props.requests,
      }
    }  

    componentDidMount(){
      fetch(`${API_URL}/requests/${this.props.screenProps.userInfo.type}s/${this.props.screenProps.userInfo.id}`)
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
               <Text>tutor name: {el.name}</Text>
              </View>
              //  <Map/>
           );
       });
   }

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: 'black' }}>
          <Text>Requests</Text>
          {this.renderRequests(this.state.requests)}
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