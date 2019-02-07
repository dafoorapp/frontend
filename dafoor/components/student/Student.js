import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Map from './Map';
import ReqForm from './ReqForm';
import Profile from '../Profile';
import Requests from '../Requests';
import ListOfTutors from './ListOfTutors';
import { Container, Header, Content, Form, Item, Input } from 'native-base';


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
        <Content key={index}>
          <Text>Tutor name: {el.name}</Text>
          <Text>Gender: {el.gender}</Text>
          <Text>Duration: {el.duration}</Text>
          <Text>Subject: {el.subject}</Text>
          <Text>Phone Number: {el.phone_number}</Text>
        </Content>
      )
    }
    )
  }

    render() {
      // console.log('userDatauserDatauserDatauserDatauserData',this.state.userData);
      // console.log('userDatauserDatauserDatauserDatauserData',this.props.userData);
      return (

        (this.state.requests) ? 
        // <ScrollView style={ styles.boxOne }>
         <Container>
           <Header>
            <Text>DAFOOR</Text>
             </Header>
        {/* <View style={styles.container}> */}
          <Map requests={this.state.requests}/>
          {(this.state.activeReq)? 
           <Content>
           <Text>Active Req</Text>
            {this.renderActiveReq(this.state.activeReq)}
         </Content>
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
        </Container>
        :
        <Text></Text>
      );
    }
  }

  // class RequestsTab extends React.Component  {
  //   constructor(props){
  //     super(props);
  //     this.state = {
  //       requests: undefined,
  //       userData : props.screenProps.userData,
  //       userInfo: props.screenProps.userInfo
  //     }
  //   }

  //   componentDidMount(){
  //     fetch(`${API_URL}/requests/students/${this.state.userInfo.user_id}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('jknjsdjwdbjkwndjkwndjwn',data);
  //       this.setState({
  //         requests: data
  //       })
  //     })
  //     .catch(error => console.log(error))
  //   }

  //   render(){
  //     return (
  //       (this.state.requests) ?
  //       <Requests requests={this.state.requests} userData={this.state.userData} userInfo={this.state.userInfo}/>
  //       :
  //       <Text></Text>
  //     )
  //   }
  // }

  // class ProfileTab extends React.Component  {
  //   render(){
  //     return (
  //       <Profile userData={this.props.screenProps.userData} userInfo={this.props.screenProps.userInfo} isLoggedIn={this.props.screenProps.isLoggedIn}/>
  //     )
  //   }
  // }

  const MyApp = createBottomTabNavigator({
    Map: { screen: MapTab },
    Requests: { screen: Requests },
    Profile: { screen: Profile },
  });

const StudentsTab = createAppContainer(MyApp)

export default class Student extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userData: props.userData,
      userInfo: props.userInfo
    }
  }

  componentDidMount(){
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n Student ghadeer Debug")
  }

  render() {
// console.log("userData ",this.state.userData)
    return (
        <StudentsTab screenProps={{userData:this.state.userData, userInfo:this.state.userInfo, isLoggedIn:this.props.isLoggedIn , setActivePage: this.props.setActivePage , setIsLoggedIn : this.props.setIsLoggedIn}}/>
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