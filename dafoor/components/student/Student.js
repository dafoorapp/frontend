import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Map from './Map';
import ReqForm from './ReqForm';
import Profile from '../Profile';
import Requests from '../Requests';
import ListOfTutors from './ListOfTutors';

class MapScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      makeReq: true,
      markers: [],
      requests: undefined
    }
  }

  componentDidMount(){
    this.fetchReq();
  }


  fetchReq(){
    console.log('componentDidMount');
    const student_location = '0101000020E6100000D2A00D654DA938403CD1BF6E22574740';
    fetch(`http://localhost:3000/tutors/students/1?student_location=${student_location}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({
        requests: data
      })
    })
    .catch(error => console.log(error))
  }

  handleReq = () => {
    const makeRequest = this.state.makeReq;
    this.setState({
      makeReq: !makeRequest
    })
  }

    render() {
      
      return (
        
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <Text>MAP!!!!!</Text>
        // </View>
        // <View style={styles.container}>


        (this.state.requests) ? 
        <ScrollView style={ styles.boxOne }>
        <View style={styles.container}>
          <Map requests={this.state.requests}/>
          {(this.state.makeReq) ? 
          <ReqForm makeRequest={this.handleReq.bind(this)}/> 
          :
          <ListOfTutors makeRequest={this.handleReq.bind(this)} requests={this.state.requests}/>  
           }
        </View>
        </ScrollView>
        :
        <Text>hhhow</Text>

        //  {(this.state.requests) ? 
        //   <View> 
        //   <Map requests={this.state.requests}/>
        
        //   {(this.state.makeReq) ? 
        //   <ReqForm makeRequest={this.handleReq.bind(this)}/> 
        //   : <ListOfTutors makeRequest={this.handleReq.bind(this)} requests={this.state.requests}/>
        //   }
        //    : <Text></Text>
           
        //   </View>
        //  }
        // </View>
      );
    }
  }

  const MyApp = createBottomTabNavigator({
    Map: { screen: MapScreen },
    Requests: { screen: Requests },
    Profile: { screen: Profile },
  });

const StudentsTab = createAppContainer(MyApp)

export default class Student extends React.Component {

  render() {
    return (
      
        <StudentsTab></StudentsTab>
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