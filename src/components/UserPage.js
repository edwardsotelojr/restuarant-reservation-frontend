
import React, { Component } from "react";
import {
  Container, Row
} from "react-bootstrap";
import axios from "axios"
import setAuthToken  from "../utils/setAuthToken";
import jwt_decode from "jwt-decode"
class UserPage extends Component {
  
constructor(props){
    super(props);
}
  componentDidMount() {
      this.log()
  }

  log(){
    // Check for token to keep user logged in
    if (localStorage.jwtToken !== undefined) {
      console.log("token founded: ", localStorage.jwtToken);
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken);
      console.log('decoded ', decoded)
      // Set user and isAuthenticated
      //store.dispatch(setCurrentUser(decoded));
      // Check for expired token
      console.log(decoded.exp);
      if(decoded.email != ""){
      axios.get("http://localhost:8000/getUser", {params: {email: decoded.email}})
      .then(res => {
          console.log(res)
          this.setState({name: res.data.user.name, email: res.data.user.email, phone: res.data.user.phone})
      })
      .catch(err => console.log(err))
      }
    }
    }

  render() {
    return (
        <Container>
          <Row>
              <p>
                  lol
              </p>
          </Row>
        </Container>
    );
  }
}
export default UserPage;
