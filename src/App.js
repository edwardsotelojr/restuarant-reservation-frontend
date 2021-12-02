import React from "react";
import "./index.css";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import { Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Component } from "react";
import history from "./history";
import setAuthToken from "./utils/setAuthToken";
import Header from "./components/Header"
import Success from "./components/Success";
import UserPage from "./components/UserPage"
import axios from "axios";
class App extends Component {
  constructor(props){
    super()
    this.state = {
      
    }
  }
  componentDidMount(){
    this.log()
  }
log(){
// Check for token to keep user logged in
if (localStorage.jwtToken !== undefined) {
  console.log("token founded: ", localStorage.jwtToken);
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  console.log('decoded ', decoded)
  // Set user and isAuthenticated
  //store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  console.log(decoded.exp);
  if(decoded.email != ""){
  axios.get("http://localhost:8000/getUser", {params: {email: decoded.email}})
  .then(res => {
      console.log(res)
      this.setState({name: res.data.user.name, email: res.data.user.email, phone: res.data.user.phone})
  })
  .catch(err => console.log(err))
  }
  //const currentTime = Date.now() / 1000; // to get in milliseconds
  //if (decoded.exp < currentTime) {
    // Logout user
    //store.dispatch(logoutUser());
    // Redirect to login
    //window.location.href = "./login";
  //}
}
}

  render() {
    return (
      <Router history={history}>
        <Header/>
        <div style={{marginTop: '52px'}}>
        <Switch>
          <Route exact path="/" render={(props) => (<HomePage user={this.state}/>)}/>
          <Route path="/signup" component={Signup} />
          <Route path="/success" component={Success}/>
          <Route path="/user" component={UserPage}  />
        </Switch>
        
        </div>
   {/*      <footer style={{marginTop: "-15px", marginBottom: "", backgroundColor: "rgb(255, 255, 240)"}}>
          <hr></hr>
          <center style={{height: "40px"}}>
            <Link to="/" style={{color: "black"}}>home</Link>
          </center> //testing commit
        </footer> */}
      </Router>
    );
  }
}
export default App;
