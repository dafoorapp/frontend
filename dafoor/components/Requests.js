import React from 'react';
import { StyleSheet, Text, View, ListView, FlatList, List} from 'react-native';
import { ListItem } from 'react-native-elements';
import Map from './student/Map';

export default class Requests extends React.Component {
    constructor(){
      super();
      this.state = {
        requests : [
          {
            name: 'Amy Farha',
            subject: 'math',
            cost: '200',
            date: '2019/1/1'

          },
          {
            name: 'Chris Jackson',
            subject: 'computer',
            cost: '150',
            date: '2019/1/4'
          },
        ],
      }
    }  

    // renderItem = ({ item }) => (
    //     <ListItem
    //       title={item.name}
    //       subtitle={item.subtitle}
    //       leftAvatar={{ source: { uri: item.avatar_url } }}
    //     />
    //   )
    
    // renderMap(list) {
    //   const listMap =  list.map( l => {
    //     console.log(l.name);
    //     return l.name;
    //   });

    //   // console.log(listMap);
    // }

    renderAlbums() {
      return this.state.requests.map((el,index) => {
           return (
             <View key={index}>
               <Text>Name: {el.name}</Text>
               <Text>Date: {el.date}</Text>
               <Text>Cost: {el.cost}</Text>
               <Text>Subject: {el.subject}</Text>
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