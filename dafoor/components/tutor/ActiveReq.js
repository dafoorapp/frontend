import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Linking} from 'react-native';

const API_URL = 'http://localhost:3000';

export default class ActiveReq extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        requests: undefined,
        acceptesReq: undefined,
        userInfo: props.userInfo
      }
    }

    componentDidMount() {

        // Your code
        console.log(this.props.userInfo.id)
        // console.log(`${API_URL}/requests/tutors/${this.props.userInfo.id}`)
        const url = `${API_URL}/requests/tutors/${this.props.userInfo.id}`;
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
          this.setState({ acceptesReq: request,requests: updateReq});
          // this.renderRequestInfo();
        } else {
          const updateReq = this.state.requests.filter(el => {
            return el.id !== data.id
        })
          this.setState({
            requests: updateReq
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
        <Text>Phone number: 
        {/* {Linking.openURL(`tel:${this.state.acceptesReq.phone_number}`)} */}
        </Text>
        <Text>Location: </Text>
        <Button title='End Session' onPress={() => this.setRequestStatus(this.state.acceptesReq, 'endSession')}/>
      </View>
      )
    }

    renderActiveReqests() {
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$')
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
    }

    render() {
      return (
        <View style={styles.container}>
        {console.log("uuuuuseeer info",this.state.userInfo)}
        {this.state.requests ? 
          this.renderActiveReqests() : <Text>no request</Text>}

          {(this.state.acceptesReq) ? this.renderRequestInfo(): <Text></Text>}
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