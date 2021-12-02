
import React, { Component } from "react";
import Login from "./Login";
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
class Header extends Component {
  

  componentDidMount() {
  }

  render() {
    let title;
    //console.log("user ", this.state.user.user)
    //if (this.props.auth.isAuthenticated) {
      //logged in
      title = "user";
     
    //} else {
      title = "Sign in";
      //dropdown = <Login login={this.props.login} error={this.props.error} />;
    //}
    //const { navCollapsed } = this.state;
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Reservation</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
export default Header;
