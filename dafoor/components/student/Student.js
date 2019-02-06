import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Map from './Map';
import ReqForm from './ReqForm';
import Profile from '../Profile';
import Requests from '../Requests';
import ListOfTutors from './ListOfTutors';

const API_URL = 'http://localhost:3000';

class MapTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      makeReq: true,
      markers: [],
      requests: undefined,
      subject: undefined,
      duration: undefined,
      userData : props.screenProps.userData,
      activeReq: undefined
    }
  }

  componentDidMount(){
    fetch(`${API_URL}/requests/students/${this.state.userData.user_id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const activeReq = data.filter(el => {
        return el.status === 'active'
      })
      console.log('activeReqactiveReqactiveReq', activeReq);
      this.setState({
        activeReq: activeReq
      })
    })
    .catch(error => console.log(error));



    (this.state.userData) ?
    this.getNearTutors(): 
    '';
  }

  setSubjectAndDuration(subject, duration){
    this.setState({
      subject,duration
    })
  }


  getNearTutors(){
    console.log('componentDidMount');
    // const student_location = '0101000020E6100000D2A00D654DA938403CD1BF6E22574740';
    fetch(`${API_URL}/tutors/students/${this.state.userData.user_id}?student_location=${this.state.userData.location}`)
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

  renderActiveReq(activeReq){
    return activeReq.map((el, index) => {
      return (
        <View key={index}>
          <Text>Tutor name: {el.name}</Text>
          <Text>Gender: {el.gender}</Text>
          <Text>Duration: {el.duration}</Text>
          <Text>Subject: {el.subject}</Text>
          <Text>Phone Number: {el.phone_number}</Text>
        </View>
      )
    }
    )
  }

    render() {
      // console.log('userDatauserDatauserDatauserDatauserData',this.state.userData);
      // console.log('userDatauserDatauserDatauserDatauserData',this.props.userData);
      return (

        (this.state.requests) ? 
        <ScrollView style={ styles.boxOne }>
        <View style={styles.container}>
          <Map requests={this.state.requests}/>
          {(this.state.activeReq)? 
           <View>
           <Text>Active Req</Text>
            {this.renderActiveReq(this.state.activeReq)}
         </View>
        :
          (this.state.userData) ?
          (this.state.makeReq) ? 
          <ReqForm makeRequest={this.handleReq.bind(this)} setSubjectAndDuration={this.setSubjectAndDuration.bind(this)}/> 
          :
          <ListOfTutors 
            makeRequest={this.handleReq.bind(this)} 
            requests={this.state.requests} 
            subject={this.state.subject} 
            duration={this.state.duration} 
            userData={this.state.userData}/> 
           :
          <Text></Text>
          
        }
        </View>
        </ScrollView>
        :
        <Text></Text>
      );
    }
  }

  class RequestsTab extends React.Component  {
    constructor(props){
      super(props);
      this.state = {
        requests: undefined,
        userData : props.userData
      }
    }

    componentDidMount(){
      fetch(`${API_URL}/requests/students/1`)
      .then(response => response.json())
      .then(data => {
        console.log('jknjsdjwdbjkwndjkwndjwn',data);
        this.setState({
          requests: data
        })
      })
      .catch(error => console.log(error))
    }

    render(){
      return (
        (this.state.requests && this.state.userData) ?
        <Requests requests={this.state.requests}/>
        :
        <Text></Text>
      )
    }
  }

  class ProfileTab extends React.Component  {
    render(){
      return (
        <Profile/>
      )
    }
  }

  const MyApp = createBottomTabNavigator({
    Map: { screen: MapTab },
    Requests: { screen: RequestsTab },
    Profile: { screen: ProfileTab },
  });

const StudentsTab = createAppContainer(MyApp)

export default class Student extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userData: props.userData
    }
  }

  render() {
// console.log("userData ",this.state.userData)
    return (
        <StudentsTab screenProps={{userData:this.props.userData}}/>
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