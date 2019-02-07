import React from 'react';
// import { StyleSheet, Text, View, Alert} from 'react-native';
// import { Button } from 'react-native-elements';
import { Container, Header, Content, Form, Item, Input, Text } from 'native-base';

const API_URL = 'http://localhost:3000';


class ListOfTutors extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tutors: props.requests,
      subject: props.subject,
      duration: props.duration,
      userData: props.userData,
      activeReq: false,
      currentReq: undefined
    }
  }

  // componentDidMount(){
  //   console.log('componentDidMount');
  //   const student_location = '0101000020E6100000D2A00D654DA938403CD1BF6E22574740';
  //   fetch(`http://localhost:3000/tutors/students/1?student_location=${student_location}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     this.setState({
  //       requests: data
  //     })
  //   })
  //   .catch(error => console.log(error))
  // }

  setActiveReq(){
    this.setState({
      activeReq: !this.state.activeReq
    })
  }

  handleRequest(tutorData){


    const cost = tutorData.price * this.state.duration;

    console.log(cost);
    const reqInfo = {
      subject: this.state.subject,
      duration: this.state.duration,
      cost: cost,
      status: 'pending',
      tutor_id: tutorData.user_id,
      student_id: this.state.userData.user_id
    };

    const url = `${API_URL}/requests`;

    fetch(url , {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqInfo)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({
        currentReq: data
      })
      this.setActiveReq();
    })
    .catch(error => console.log(error))
  }

  handleCancelRequest(currentReq){
    // console.log("rrrrreeeeeqqqqquest", request);
    const url = `${API_URL}/requests/${currentReq.id}`;
    const setStatus = { status: 'reject'  }

    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(setStatus)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
        const updateReq = this.state.tutors.filter(el => {
          return el.user_id !== data.tutor_id
      })
      console.log("updateReq", updateReq);
        this.setState({
          tutors: updateReq,
          currentReq: undefined,
        },() => {
          console.log(this.state.tutors);
          this.setActiveReq();
        })
      })
    .catch(error => {
      console.log(error)
    })
  }

  
  rendeTutors(){
    const currentReq = this.state.currentReq;
    return this.state.tutors.map((el, index) => {
      return (
        <Content key={index}>
          <Text>Name: {el.name}</Text>
          <Text>Rating: {el.rating}</Text>
          <Text>Gender: {el.gender}</Text>
          <Text>Price per hour: {el.price}</Text>
          { (!this.state.activeReq) ? 
          // <Button title="Make Request" onPress={() => this.handleRequest(el)}/>
          <Button bordered warning onPress={() => this.handleRequest(el)}>
          <Text>Make Request</Text>
          </Button>
          : 
          ((currentReq !== undefined) && (currentReq.tutor_id === el.user_id)) ? 
          // <Button title="Cancel" onPress={() => this.handleCancelRequest(this.state.currentReq)}/>
          <Button bordered warning onPress={() => this.handleCancelRequest(this.state.currentReq)}>
          <Text>Cancel</Text>
          </Button>
          :
          <Text></Text>
          }
        </Content>
      )
    }
    )
  }
    render(){
      // console.log("propspropspropspropsprops",this.state.requests);
      return (
        <Container>
          {this.rendeTutors()}
          <Button title="Reset" onPress={() => this.props.makeRequest()} />
        </Container>
      );
    }
  };

  export default ListOfTutors;

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  //   cancelButton: {
  //     margin: 5
  //   }
  // });