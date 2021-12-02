
import React, { Component } from "react";
//import Login from "./Login";
import {
  Navbar,
  Nav,
  Container,
  Button
} from "react-bootstrap";
import setAuthToken from "../utils/setAuthToken";
class Header extends Component {
  

islogged(){
  // Check for token to keep user logged in
  if (localStorage.jwtToken !== undefined) {
    return(
      <Button id={"logoutButton"}onClick={(e) => { e.preventDefault() 
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
        this.islogged()}}>
        Logout
      </Button>
    )
    }else{
      if(document.getElementById("logoutButton"))
      document.getElementById("logoutButton").remove()
    }
  }

  componentDidMount() {
  }

  render() {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Reservation</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Signup">Sign Up</Nav.Link>
              {this.islogged()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
export default Header;
