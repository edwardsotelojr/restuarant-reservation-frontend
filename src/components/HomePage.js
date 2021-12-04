import {
  Alert,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import axios from "axios";
import React, { Component } from "react";
import TimePicker from "@mui/lab/TimePicker";
import { getDate } from "date-fns";
import history from "../history";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

const tables = {
  t1: 5,
  t2: 5,
  t3: 5,
  t4: 5,
  t5: 5,
  t6: 5,
  t7: 5,
  t8: 5,
  t9: 5,
  t10: 5,
  t11: 5,
  t12: 5,
  t13: 5,
  t14: 5,
  t15: 5,
  t16: 5,
  t17: 5,
  t18: 5,
  t19: 5,
  t20: 5,
};

let arrayOfTables = [
  "table 1",
  "table 2",
  "table 3",
  "table 4",
  "table 5",
  "table 6",
  "table 7",
  "table 8",
  "table 9",
  "table 10",
  "table 11",
  "table 12",
  "table 13",
  "table 14",
  "table 15",
  "table 16",
  "table 17",
  "table 18",
  "table 19",
  "table 20",
];

class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log("props", this.props.user);
    this.state = {
      user: {},
      tables: [],
      date: "",
      time: "",
      selectedTables: [],
      open: false,
      password: "",
      email: "",
      loginEmail: "",
      phone: null,
      name: "",
      BusyDay: false,
      sameDay: true,
      creditCardHold: null
    };
    this.login = this.login.bind(this);
    this.setTables = this.setTables.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setAlertMessage();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps){
    if (this.props.user !== prevProps.user) {
          this.setState({user: this.props.user})
    }
  }


  getTableList = (d, t) => {
    this.setState({ timee: t.value, datee: d.value });
    var tablesAvailable = [];
    //console.log(d.value)
    //console.log(t.value)
    const parameters = {
      params: {
        date: d.value,
        time: t.value,
      },
    };
    if (t.value.length != 0) {
      console.log(parameters);
      axios
        .get("http://localhost:8000/getAvailableTables", parameters)
        .then((res) => {
          this.setTables(res.data.reservation);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleChange(e) {
    e.preventDefault();
    const target = e.target;
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
   handleSubmit(event) {
    event.preventDefault();
    // Reset the alert to empty
    this.setAlertMessage();

    let nameError = '';
    let emailError = '';
    let phoneError = '';
    let emailinvalidError ='';
    let phoneinvalidError = '';
    let dineError = '';
    let hi = false;

    if (this.state.name == "") {
      nameError = 'Name cannot be blank!';
      hi=true;
    }
    if (this.state.email == "") {
      emailError = 'Email cannot be blank!';

      var emailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!emailformat.test(this.state.email)) {
        emailinvalidError = 'Incorrect email format!';
      }
      hi=true;
    }
    if (this.state.phone !== 'undefined'){
      var phoneformat = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
      if (!phoneformat.test(this.state.phone)) {
        phoneinvalidError = 'Incorrect phone format!';
      }
      hi = true;
    }
    /*if (this.state.preferredAmountOfDiners <= 0 || this.state.preferredAmountOfDiners !== 'undefined') {
      dineError = 'Preferred Amount Of Diners eannot be blank!';
      if (this.state.preferredAmountOfDiners <= 0) {
        dineError = 'Incorrect amount of diners!'
      }
      hi=true;
    }*/

    if (hi == true) {
      return this.setAlertMessage("ALERT:" + " " + nameError + " "+ emailError + " "+ emailinvalidError+ " "+phoneError + " "+ phoneinvalidError+" "+ dineError);
    }
    hi=false;
    this.setAlertMessage()
  }
  handleCheckboxChange = (event) => {
    let newArray = [...this.state.selectedTables, event.target.value];
    if (this.state.selectedTables.includes(event.target.value)) {
      newArray = newArray.filter((t) => t !== event.target.value);
    }
    this.setState({
      selectedTables: newArray,
    });
  };
  
  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }
  
  setTables(res) {
    var tablesAvailable = arrayOfTables;
    var tablesTaken = res;
    console.log("tables available: ", tablesAvailable);
    console.log("tables taken: ", tablesTaken);
    for (var i = 0; i < tablesTaken.length; i++) {
      // go through array of tables and remove taken tables
      tablesAvailable = tablesAvailable.filter((ta) => ta !== tablesTaken[i]);
    }
    console.log(tablesAvailable);
    //var lis = tablesAvailable.map((t,index) =>
    //  <li key={index}>{t}</li>
    //);
    this.setState({ tables: tablesAvailable });
    if(this.state.tables.length > 10){
      this.setState({ BusyDay: false });
    }
    else{
      this.setState({ BusyDay: true });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, diners, email, phone, selectedTables, timee, datee, sameDay,
    creditCardHold } =
      this.state;
    const reservation = {
      name,
      email,
      phone,
      diners: parseInt(diners),
      tables: selectedTables,
      time: timee,
      date: datee,
      sameDay,
      creditCardHold
    };
    axios
      .post("http://localhost:8000/setReservation", reservation)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          history.push({pathname: "/success", state: { tables: selectedTables, name: name, date: datee, time: timee, diners: diners }});
        }
      }) //
      .catch((err) => {console.log(err)
      this.setState({showError2: true, errMes: err.response.data.msg})
      this.setAlertMessage(err.message)
    });
  };

  login(e) {
    e.preventDefault();
    console.log("here");
    const user = {
      email: this.state.loginEmail,
      password: this.state.password,
    };
    axios
      .post("http://localhost:8000/login", user)
      .then((res) => {
        console.log(res.data.message.name);
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        console.log("decoded ", decoded);
        // Set current user
        //dispatch(setCurrentUser(decoded.user))
        this.setState({
          user: res.data.message,
          name: res.data.message.name,
          email: res.data.message.email,
          phone: res.data.message.phone
        })
        this.props.updateProp(this.state.user)
       
      })
      .catch((err) => {
        console.log("errrr", err.response);
        this.setState({showError: true, errMes: err.response.data.msg})
        this.setAlertMessage(err.message);
      });
  }


  logout() {
    console.log("logout")
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    this.setState({user: {}, name: "", email: "", phone: null})
  }

  render() {
    var today = new Date();
    //console.log(this.props)
    return (
      <Container>
        <Row>
          <Col>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Select Date"
                value={this.state.date}
                onChange={(newValue) => {
                  if (newValue != null) {
                  if ((newValue.getDate() >= today.getDate() && newValue.getMonth() >=  today.getMonth() && newValue.getFullYear() >= today.getFullYear())
                   || (newValue.getMonth() > today.getMonth() && newValue.getYear >= today.getYear())
                   || (newValue.getYear() > today.getYear())){
                    this.setState({time: ""})
                    this.setState({sameDay: true})
                    if ((newValue.getDate() != today.getDate() || newValue.getMonth() !=  today.getMonth() || newValue.getFullYear() != today.getFullYear())) {
                      this.setState({sameDay: false})
                    }

                  this.setState({ date: newValue });
                  this.getTableList(
                    document.getElementsByName("dateValue")[0],
                    document.getElementsByName("timeValue")[0]
                  );
                  }
                }
                }}
                renderInput={(params) => (
                  <TextField name={"dateValue"} {...params} />
                )}
              />
            </LocalizationProvider>
          </Col>
          <Col>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Select Time"
                value={this.state.time}
                minutesStep={15}
                onChange={(newValue) => {
                  if(newValue != null){
                  if((newValue.getHours() > 9 && newValue.getHours() < 21  && newValue.getHours() > today.getHours())
                  || (newValue.getHours() == 21  && newValue.getHours() > today.getHours() && newValue.getMinutes() == 0) 
                  || (newValue.getHours() == today.getHours() && newValue.getMinutes() > today.getMinutes())
                  || (newValue.getHours() > 9 && newValue.getHours() < 21 && !(this.state.sameDay))
                  || (newValue.getHours() == 21  && newValue.getMinutes() == 0 && !(this.state.sameDay))) {
                  this.setState({ time: newValue });
                  this.getTableList(
                    document.getElementsByName("dateValue")[0],
                    document.getElementsByName("timeValue")[0]
                  );
                  }
                }
                }}
                renderInput={(params) => (
                  <TextField name={"timeValue"} {...params} />
                )}
              />
            </LocalizationProvider>
          </Col>
        </Row>
        <Row>
          <Col>Table of Available Tables</Col>
        </Row>
        <Row>
          <Col xs={6}>
            <ul>
              {this.state.tables.map((t, index) => (
                <InputGroup key={index} className="mb-3">
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    value={t}
                    onChange={this.handleCheckboxChange}
                  />
                  <FormControl
                    aria-label="Text input with checkbox"
                    value={t}
                  ></FormControl>
                </InputGroup>
              ))}
            </ul>
          </Col>
          <Col>
                {Object.keys(this.state.user).length == 0 // if no user is logged in
                 ? [(!this.state.open ? 
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState((prevState) => ({ open: !prevState.open }));
                    }}
                  >
                    {" "}
                    Log in
                  </Button>
     :   <Form onSubmit={this.login}>
       {this.state.showError ? <Alert variant={"danger"}>{this.state.errMes}</Alert> : <></>}
     <Form.Group controlId="formBasicEmail">
       <Form.Label>Email address</Form.Label>
       <Form.Control
         value={this.state.loginEmail}
         onChange={(e) => {
           e.stopPropagation();
           this.setState({ loginEmail: e.target.value });
         }}
         type="email"
         placeholder="Enter email"
       />
     </Form.Group>
     <Form.Group
       controlId="formBasicPassword"
       style={{ marginBottom: "0.5rem" }}
     >
       <Form.Label>Password</Form.Label>
       <Form.Control
         value={this.state.password}
         onChange={(e) =>
           this.setState({ password: e.target.value })
         }
         type="password"
         placeholder="Password"
       />
     </Form.Group>
     <input
       type="submit"
       value="login"
       style={{
         borderRadius: "4px",
         padding: "7px",
         backgroundColor: "#9bd16e",
       }}
     />
   </Form>)] : (
                <Button
                onClick={(e) => {
                  e.preventDefault();
                  this.logout()
                }}
              >
                {" "}
                Log in
              </Button>
                )}
           
            <Form onSubmit={this.onSubmit, this.handleSubmit} style={{ marginTop: "10px" }}>
            {this.state.showError2 ? <Alert variant={"danger"}>{this.state.errMes}</Alert> : <></>}
              <Alert2 message={this.state.alertMessage}/>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  autoFocus
                  value={this.state.name|| ''}
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Enter name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={this.state.email|| ''}
                  name="email"
                  onChange={this.handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  autoFocus
                  type="phone"
                  value={this.state.phone|| ''}
                  name="phone"
                  onChange={this.handleChange}
                  placeholder="Enter name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Diners</Form.Label>
                <Form.Control
                  autoFocus
                  type="number"
                  name="diners"
                  onChange={this.handleChange}
                  placeholder="Enter Amount of Diners"
                />
              </Form.Group>
              {this.state.BusyDay ? (
                <Form.Group className="mb-3">
                <Form.Label>Credit Card</Form.Label>
                <Form.Control
                  autoFocus
                  type="number"
                  name="creditCardHold"
                  onChange={this.handleChange}
                  placeholder="Enter Credit Card Number"
                />
              </Form.Group>
              ) : <></>}
              

              <Button type="submit">Set Reservation</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

class Alert2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.message) return "";
    return <div id="alert">{this.props.message}</div>;
  }
}
export default HomePage;
