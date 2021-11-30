import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import axios from "axios";
import React, { useState } from "react";
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

  const [tables, setTables] = useState(null);

   function getTableList(d, t){
    var tablesAvailable = []
    const parameters = {
      params: {
        date: d.value,
        time: t.value,
      },
    }; 
    const lis = <li>called</li>
    if(t.value.length != 0){
      console.log(parameters)
    axios
      .get("http://localhost:8000/getAvailableTables", parameters)
      .then((res) => {
        tablesAvailable = arrayOfTables;
        console.log(res.data.reservation)
        tablesTaken = res.data.reservation;
        var tablesTaken = convertResponse(tablesTaken);
        for (var i = 0; i < tablesTaken.length; i++) {
          // go through array of tables and remove taken tables
          tablesAvailable = tablesAvailable.filter((ta) => ta !== tablesTaken[i]);
        }
        console.log(tablesAvailable)
        lis = tablesAvailable.map((t,index) => 
          <li key={index}>{t}</li>
        );
      })
      .catch((err) => {
        console.log(err)
      });
    }
    return lis
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
    </Container>
  );
}

export default HomePage;
