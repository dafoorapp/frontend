import React from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import { Button } from 'react-native-elements';


class ListOfTutors extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      requests: props.requests
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
  
  rendeTutors(requests){
    return requests.map((el, index) => {
      return (
        <View style={styles.container} key={index}>
          <Text>Name: {el.name}</Text>
          <Text>Rating: {el.rating}</Text>
          <Text>Gender: {el.gender}</Text>
          <Text>Price per hour: {el.price}</Text>
          {/* <Button title='Make Request' onPress={console.log('thank for request')}/> */}
          <Button title="Cancel" onPress={() => this.props.makeRequest()} />
        </View>
      )
    }
    )
  }
    render(){
      console.log("propspropspropspropsprops",this.state.requests);
      return (
        this.rendeTutors(this.state.requests)
      // (this.state.requests) ? this.rendeTutors(this.state.requests) : <Text>no data</Text>
        // (props.requests) ? 
        // <View style={styles.container}>
        //   <Text>Name: {props.name}</Text>
        //   <Text>Rating: {props.rating}</Text>
        //   <Text>Gender: {props.gender}</Text>
        //   <Text>Price per hour: {props.price}</Text>
        //   {/* <Button title='Make Request' onPress={console.log('thank for request')}/> */}
        //   <Button title="Cancel" onPress={() => props.makeRequest()} />
        // </View>
        // :
        // <Text>no data</Text>
      );
    }
  };

  export default ListOfTutors;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });