import React from 'react';
import { StyleSheet, Text, View, ListView, FlatList, List} from 'react-native';
import { ListItem } from 'react-native-elements';
import Map from './student/Map';

export default class Requests extends React.Component {
    constructor(){
      super();
      this.state = {
        requests : [],
      }
    }  

    // componentDidMount(){
      
    //   fetch('http://localhost:3000/requests/students/1')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({
    //       requests: data
    //     })
    //   })
    //   .catch(error => console.log(error))
    // }

    renderAlbums() {
      return this.state.requests.map((el,index) => {
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
          {this.renderAlbums()}
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