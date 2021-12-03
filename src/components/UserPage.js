import axios from "axios";
import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    reservations: [],
    update: 0
  }
}

componentDidUpdate(){
  if(this.state.update == 0){
    console.log("here")
    this.setState({update: 2})
    this.getReservations()
  }
}

  getReservations(){
    const para = {email: this.props.user.email}
    console.log(para)
    axios.get("http://localhost:8000/getReservations", para)
    .then(res => this.setState({reservations: res.data.reservations}))
  }

  render() {
    return (
      <Container>
        <Row>
          <p>Name: {this.props.user.name}</p>
          <p>Email: {this.props.user.email}</p>
          <p>Phone Number: {this.props.user.phone}</p>
          
        </Row>
        <Row >
          Reservations:
          {this.state.reservations.map((rr, index) => 
            <div key={index} 
            style={{backgroundColor: "gray", margin: "2px", padding: "3px", width: "max-content"}}><p>date: {rr.date}</p>
            <p>time: {rr.time}</p>
            <p>Amount of Diners: {rr.diners}</p>
            <p>tables: {rr.tables}</p>
            </div>
          )}
        </Row>
      </Container>
    );
  }
}
export default UserPage;
