import React, { Component } from "react";
import {
    Button,
  Container,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import axios from "axios"

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bef22c9... add link/login format
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);

  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      password,
    } = this.state;
    const userData = {
      username,
      password,
    }
    axios
    .post("http://localhost:8000/login", userData)
    .then(res => {
        console.log(res)
        
    }) //
    .catch(err =>
      console.log(err)
    );
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });

  }

  render() {
      return(
    <Container>
      <Row>
          <Form onSubmit={this.onSubmit} style={{ marginTop: "10px" }}>
            <Form.Group className="mb-3">
<<<<<<< HEAD
              <Form.Label>Username</Form.Label>
=======
              <Form.Label>Name</Form.Label>
>>>>>>> bef22c9... add link/login format
              <Form.Control
                autoFocus
                type="text"
                name="name"
                onChange={this.handleChange}
<<<<<<< HEAD
                placeholder="Enter username"
=======
                placeholder="Enter name"
>>>>>>> bef22c9... add link/login format
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                onChange={this.handleChange}
<<<<<<< HEAD
                placeholder="Enter password"
              />
            </Form.Group>
            
      <Col xs="auto">
        <Form.Check
        type="checkbox"
        id="autoSizingCheck"
        className="mb-3"
        label="Remeber Me"
        />
      </Col>
=======
                placeholder="Enter Password"
              />
            </Form.Group>

>>>>>>> bef22c9... add link/login format
      <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
      </Row>
    </Container>
    )
  }
}
<<<<<<< HEAD
export default Login;
=======
>>>>>>> 8555b0c... update login
=======
export default Login;
>>>>>>> bef22c9... add link/login format
