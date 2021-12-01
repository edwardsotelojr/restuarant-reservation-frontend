import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Form
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
    this.state = {
      tables: [],
      date: "",
      time: "",
      selectedTables: [],
    };
    this.setTables = this.setTables.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }


  getTableList = (d, t) => {
    this.setState({timee: t.value, datee: d.value})
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
    this.setState({
      [e.target.name]: e.target.value,
    });

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

  setTables(res) {
    var tablesAvailable = arrayOfTables;
    var tablesTaken = res;
    console.log("tables available: ", tablesAvailable)
    console.log("tables taken: ", tablesTaken)
    for (var i = 0; i < tablesTaken.length; i++) {
      // go through array of tables and remove taken tables
      tablesAvailable = tablesAvailable.filter((ta) => ta !== tablesTaken[i]);
    }
    console.log(tablesAvailable);
    //var lis = tablesAvailable.map((t,index) =>
    //  <li key={index}>{t}</li>
    //);
    this.setState({ tables: tablesAvailable });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      diners,
      selectedTables,
      timee,
      datee
    } = this.state;
    const reservation = {
        name,
        diners: parseInt(diners),
        tables: selectedTables,
        time: timee,
        date: datee
    }
    axios
    .post("http://localhost:8000/setReservation", reservation)
    .then(res => {
        console.log(res)
        if(res.status == 200){
          history.push("/success")
        }
        
    }) //
    .catch(err =>
      console.log(err)
    );
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Select Date"
                value={this.state.date}
                onChange={(newValue) => {
                  this.setState({ date: newValue });
                  this.getTableList(
                    document.getElementsByName("dateValue")[0],
                    document.getElementsByName("timeValue")[0]
                  );
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
                  this.setState({ time: newValue });
                  this.getTableList(
                    document.getElementsByName("dateValue")[0],
                    document.getElementsByName("timeValue")[0]
                  );
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
            {this.state.selectedTables.length > 0 ? (
              <>
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
                    <Form.Label>Diners</Form.Label>
                    <Form.Control
                      autoFocus
                      type="number"
                      name="diners"
                      onChange={this.handleChange}
                      placeholder="Enter Amount of Diners"
                    />
                  </Form.Group>
                  <Button type="submit">Set Reservation</Button>
                </Form>
              </>
            ) : (
              <p>d</p>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

/*



function convertResponse(tablesTaken) {
  var stringArray = [];
  var str = "";
  for (var i = 0; i < tablesTaken.length; i++) {
    str = "t";
    str = str + tablesTaken[i].toString();
    stringArray.push(str);
  }
  return stringArray;
}

function HomePage() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [ta, setTa] = useState(null)

   async function getTableList(d, t){
    var tablesAvailable = []
    const parameters = {
      params: {
        date: d.value,
        time: t.value,
      },
    }; 
    if(t.value.length != 0){
      console.log(parameters)
    const test = await axios
      .get("http://localhost:8000/getAvailableTables", parameters)
      .then((res) => {
        //setTables(res.data.reservation)
        console.log("res ",res)
      })
      .catch((err) => {
        console.log(err)
      });
      return test
    }
  }

  


  return (
    <Container>
      <Row>
        <Col>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Select Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
                //setSelectedDate(getDate(date))
              }}
              renderInput={(params) => <TextField name={"dateValue"} {...params} />}
            />
          </LocalizationProvider>
        </Col>
        <Col>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Select Time"
              value={time}
              minutesStep={15}
              onChange={(newValue) => {
                setTime(newValue);
              }}
              renderInput={(params) => <TextField name={'timeValue'} {...params} />}
            />
          </LocalizationProvider>
        </Col>
      </Row>
      <Row>
        <Col>
        Table of Available Tables
              <ul>{date != null && time != null ? getTableList(document.getElementsByName("dateValue")[0], 
              document.getElementsByName("timeValue")[0]) : <li>none</li>}</ul>
        </Col>
      </Row>
      <Row>
        <ul>
          {ta}
        </ul>
      </Row>
    </Container>
  );
}
*/
export default HomePage;
