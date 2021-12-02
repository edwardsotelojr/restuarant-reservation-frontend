import React, { Component } from "react";
import {
    Button,
  Container,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import axios from "axios"

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      phone: "",
      mailingAddress: "",
      billingAddress: "",
      preferredAmountOfDiners: ""
    };
    this.handleChange = this.handleChange.bind(this);

  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      phone,
      mailingAddress,
      billingAddress,
      preferredAmountOfDiners
    } = this.state;
    const userData = {
        name,
        email,
        password,
        phone,
        mailingAddress,
        billingAddress,
        preferredAmountOfDiners,
    }
    axios
    .post("http://localhost:8000/signup", userData)
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                name="name"
                onChange={this.handleChange}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={this.handleChange}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                onChange={this.handleChange}
                placeholder="Enter Password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="text"
                name="confirmPassword"
                onChange={this.handleChange}
                placeholder="ReEnter Password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                onChange={this.handleChange}
                placeholder="Enter Phone Number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mailing Address</Form.Label>
              <Form.Control
                type="text"
                name="mailingAddress"
                onChange={this.handleChange}
                placeholder="Enter Mailing Address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Billing Address</Form.Label>
              <Form.Control
                type="text"
                name="billingAddress"
                onChange={this.handleChange}
                placeholder="Enter Billing Address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>preferred Amount Of Diners</Form.Label>
              <Form.Control
                type="number"
                name="preferredAmountOfDiners"
                onChange={this.handleChange}
                placeholder="Enter Preferred Amount of Diners"
              />
            </Form.Group>

      <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
      </Row>
    </Container>
    )
  }
}
export default Signup;
