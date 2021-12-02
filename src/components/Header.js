
import React, { Component } from "react";
//import Login from "./Login";
import {
  Navbar,
  Nav,
  Container,
  Button
} from "react-bootstrap";
import history from "../history";
import setAuthToken from "../utils/setAuthToken";
class Header extends Component {
  constructor(props){
    super()
    this.state = {
      user: {}
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.user !== prevProps.user) {
          this.setState({user: this.props.user})
          console.log("here")
    }
  }

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

  logout() {
    console.log("logout")
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    this.setState({ user: {}, name: "", email: "", phone: null})
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

              {Object.keys(this.state.user).length != 0 ? 
              <>
              <Button onClick={(e) => {
                      e.preventDefault();
                      history.push("/user");
                      console.log(this.state.user.name);
                    }}>{this.state.user.name}
                </Button> <Button onClick={(e) => {
                      e.preventDefault();
                      this.logout()
                    }}>Logout
                </Button></>: <></>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
export default Header;