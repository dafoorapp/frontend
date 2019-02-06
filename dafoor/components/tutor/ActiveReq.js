import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Linking, TouchableOpacity} from 'react-native';
import Communications from 'react-native-communications';
import openMap from 'react-native-open-maps';


const API_URL = 'http://localhost:3000';

export default class ActiveReq extends React.Component {

  
  constructor(props){
    super(props);
    this.state = {
      requests: undefined,
      acceptesReq: undefined
      // userInfo: props.userInfo
    }
  }
  
  _userLocation(lat, log) {
    openMap({ latitude: lat, longitude: log});
  }

    componentDidMount() {
      // console.log('&&&&&', this.propsscreenProps.userInfo)
        // Your code
        // console.log(this.props.userInfo.id)
        // console.log(`${API_URL}/requests/tutors/${this.props.userInfo.id}`)
        const url = `${API_URL}/requests/tutors/${this.props.screenProps.userData.user_id}`;
        // savedJob.user_id = this.state.userInfo.id;
    
        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            const allRequests = data.filter((elem, index) => {
              console.log('########', elem);
              return (elem.status === 'pending')
            });
            this.setState({ requests: allRequests })
            console.log('@@@@@@@@@@@@@@@@',allRequests)
          })
          .catch(error => {
            console.log(error);
          })

    }

    setRequestStatus(request, status) {
      console.log("rrrrreeeeeqqqqquest", request);
      const url = `${API_URL}/requests/${request.id}`;
      const setStatus = { status }

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
        if (status === 'active'){
          const updateReq = this.state.requests.filter(el => {
            return el.id !== data.id
        })
          // this.setState({
          //   requests: updateReq
          // })
          this.setState({ acceptesReq: request,requests: undefined});
          // this.renderRequestInfo();
        } else if(status === 'endSession') {
          const updateReq = this.state.requests.filter(el => {
            return el.id !== data.id
        })
          this.setState({
            requests: updateReq,
            acceptesReq: undefined,
          })
        }
        })
      .catch(error => {
        console.log(error)
      })
    }

    renderRequestInfo() {
  
      return (
      <View>
        <Text>Name: {this.state.acceptesReq.name}</Text>
        <Text>Duration: {this.state.acceptesReq.duration}</Text>
        <Text>Subject: {this.state.acceptesReq.subject}</Text>
        <Text>Gender: {this.state.acceptesReq.gender}</Text>
        <Text>Phone number: </Text>
        <TouchableOpacity onPress={() => Communications.phonecall(this.state.acceptesReq.phone_number, true)}>
          <View style={styles.holder}>
            <Text style={styles.text}>{this.state.acceptesReq.phone_number}</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => this._userLocation(this.state.acceptesReq.st_x , this.state.acceptesReq.st_y)}>
          <View style={styles.holder}>
            <Text color={'#bdc3c7'}>User Location</Text>
          </View>
        </TouchableOpacity>

        
        {/* <Text>Location: </Text> */}
        {/* <Button
        color={'#bdc3c7'}
        onPress={}
        title="Click To Open Maps" /> */}
        <Button title='End Session' onPress={() => this.setRequestStatus(this.state.acceptesReq, 'endSession')}/>
      </View>
      )
    }

    renderAllReqests() {
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$')
      // if (this.state.acceptesReq) {
      //   this.renderRequestInfo()
      // } else {
        return this.state.requests.map((req, index) => {
          return(
            <View key={index}>
              <Text>New Request</Text>
              <Text>Name: {req.name}</Text>
              <Text>Gender: {req.gender}</Text>
              <Text>Duration: {req.duration}</Text>
              <Text>Subject: {req.subject}</Text>
              <Button title='Accept' onPress={() => this.setRequestStatus(req, 'active')}/>
              <Button title='Decline' onPress={() => this.setRequestStatus(req, 'reject')}/>
            </View>
            )
        })
      // }
    }

    render() {
      return (
        <View style={styles.container}>
        {/* {console.log("uuuuuseeer info",this.state.userInfo)} */}
        {this.state.requests ? 
          this.renderAllReqests() : <Text>No Request</Text>}

        {this.state.acceptesReq ? this.renderRequestInfo(): <Text></Text>}
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