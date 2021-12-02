
import React, { Component } from "react";
import {
  Container, Row
} from "react-bootstrap";
class Success extends Component {
  

  componentDidMount() {
  }

  render() {
    return (
        <Container>
          <Row>
              <h3>
                  Table is set for {this.props.location.state.name}, table of {this.props.location.state.diners} on {this.props.location.state.date} at {this.props.location.state.time}.
              </h3>
          </Row>
        </Container>
    );
  }
}
export default Success;
