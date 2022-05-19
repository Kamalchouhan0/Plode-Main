import React, { Component } from "react";
import Myflowchart from "./FlowchartConnections/Myflowchart/Myflowchart";
import "./Navbar.css";
import "./style.css";
class FlowchartPage extends Component {
  next = () => {
    // this.props.history.push("/flow/input-output");
  };
  backBtnAction = () => {
    this.props.history.push("/flow/digital-analog");
  };
  render() {
    return (
      <div>
        <div>
          <Myflowchart />
        </div>
      </div>
    );
  }
}

export default FlowchartPage;
