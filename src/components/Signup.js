import React, { Component } from "react";
import {
    Button,
  Container,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import axios from "axios"
import history from "../history";
import setAuthToken from "../utils/setAuthToken";
import Userfront from "@userfront/core";
Userfront.init("demo1234");

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
      preferredAmountOfDiners: "",
      alertMessage: ""

    };
    this.handleChange = this.handleChange.bind(this);

    this.setAlertMessage = this.setAlertMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSubmit = () => {
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
        axios.post("http://localhost:8000/login", {email, password})
        .then(((res) => {
          console.log(res);
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          // Set token to Auth header
          setAuthToken(token);
          history.push("/user")
        }))
    }) //
    .catch(err =>{
      this.setAlertMessage(err.message);
      console.log(err)
    }
    );
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });

  }

  handleSubmit(event) {
    event.preventDefault();
    // Reset the alert to empty
    this.setAlertMessage();
    
    let nameError = '';
    let passError = '';
    let emailError = '';
    let mailError = '';
    let billError = '';
    let phoneError = '';
    let emailinvalidError ='';
    let phoneinvalidError = '';
    let dineError = '';
    let array = [];
    let hi = false;
    
    if (this.state.name == "") {
      nameError = 'Name cannot be blank!';
      hi=true;
    }else{
      hi = false
    }
    if (this.state.password == "") {
      passError = 'Password cannot be blank!';
      hi=true;
    }else{
      hi = false
    }
    if (this.state.email == "") {
      emailError = 'Mail cannot be blank!';
      hi=true;
    }else{
      hi = false
    }
    if (this.state.phone == "") {
      phoneError = 'Phone numbercannot be blank!';
      hi=true;
    }else{
      hi = false
    }
    if (this.state.email == "") {
      emailError = 'Email cannot be blank!';

      var emailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!emailformat.test(this.state.email)) {
        emailinvalidError = 'Incorrect email format!';
      }
      hi=true;
    }else{
      hi = false
    }
    if (this.state.phone !== 'undefined'){
      var phoneformat = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
      if (!phoneformat.test(this.state.phone)) {
        phoneinvalidError = 'Incorrect phone format!';
      }
      hi = true;
    }else{
      hi = false
    }
    if (this.state.billingAddress == "") {
      billError = 'Billing address cannot be blank!';
      hi=true;
    }else{
      hi = false
    }
    if (this.state.preferredAmountOfDiners == "" ||  this.state.preferredAmountOfDiners <= 0) {
      dineError = 'Preferred Amount Of Diners neannot be blank!';
      if (this.state.preferredAmountOfDiners <= 0) {
        dineError = 'Incorrect amount of diners!'
      }
      hi=true;
    }else{
      hi = false
    }

    if (hi == true) {
      return this.setAlertMessage("ALERT:" + " " + nameError + " "+ emailError + " " + emailinvalidError+" "+ passError + " "+ phoneError + " " + phoneinvalidError+" " + mailError+ " "+ billError + " "+ dineError);
      hi = false;
      this.setAlertMessage();
    }
      this.setAlertMessage();
      this.onSubmit();

  }

  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }

  render() {
      return(
    <Container>
      <Row>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: "10px" }}>
          <Alert message={this.state.alertMessage}/>

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
class Alert extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.message) return "";
    return <div id="alert">{this.props.message}</div>;
  }
}
export default Signup;
