import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import axios from "axios";
import React, { Component } from "react";
import TimePicker from "@mui/lab/TimePicker";
import { getDate } from "date-fns";

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
  "t1",
  "t2",
  "t3",
  "t4",
  "t5",
  "t6",
  "t7",
  "t8",
  "t9",
  "t10",
  "t11",
  "t12",
  "t13",
  "t14",
  "t15",
  "t16",
  "t17",
  "t18",
  "t19",
  "t20",
];

class HomePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      tables: [],
      date: "",
      time: ""
    }
    this.setTables = this.setTables.bind(this)
  }

  getTableList = (d, t) => {
    var tablesAvailable = []
    //console.log(d.value)
    //console.log(t.value)
    const parameters = {
      params: {
        date: d.value,
        time: t.value,
      },
    }; 
    if(t.value.length != 0){
      console.log(parameters)
     axios
      .get("http://localhost:8000/getAvailableTables", parameters)
      .then((res) => {
        this.setTables(res.data.reservation)
        //console.log("res ",res)
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }

   convertResponse(tablesTaken) {
    var stringArray = [];
    var str = "";
    for (var i = 0; i < tablesTaken.length; i++) {
      str = "t";
      str = str + tablesTaken[i].toString();
      stringArray.push(str);
    }
    return stringArray;
  }

   setTables(res){
    var tablesAvailable = arrayOfTables;
    tablesTaken = res;
    var tablesTaken = this.convertResponse(tablesTaken);
    for (var i = 0; i < tablesTaken.length; i++) {
      // go through array of tables and remove taken tables
      tablesAvailable = tablesAvailable.filter((ta) => ta !== tablesTaken[i]);
    }
    console.log(tablesAvailable)
    //var lis = tablesAvailable.map((t,index) => 
    //  <li key={index}>{t}</li>
    //);
    this.setState({tables: tablesAvailable})
  }
  
  render(){
    
      

    
    return (
      <Container>
      <Row>
        <Col>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Select Date"
              value={this.state.date}
              onChange={(newValue) => {
                this.setState({date: newValue});
                this.getTableList(document.getElementsByName("dateValue")[0], 
              document.getElementsByName("timeValue")[0])
              }}
              renderInput={(params) => <TextField name={"dateValue"} {...params} />}
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
                this.setState({time: newValue});
                this.getTableList(document.getElementsByName("dateValue")[0], 
              document.getElementsByName("timeValue")[0])
              }}
              renderInput={(params) => <TextField name={'timeValue'} {...params} />}
            />
          </LocalizationProvider>
        </Col>
      </Row>
      <Row>
        <Col>
        Table of Available Tables
        </Col>
      </Row>
      <Row>
        <ul>
          {this.state.tables.map((t, index) => 
            <li key={index}>{t}</li>
          )}
        </ul>
      </Row>
    </Container>
    )
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
