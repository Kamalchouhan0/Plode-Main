import React, { Component } from "react";
import Bottom from "./Bottom";
import { Nav } from "react-bootstrap";
import Myflowchart from "./FlowchartConnections/Myflowchart/Myflowchart";
import flowchartImg from "../../Assets/img/simulate bar@2x.png";
import secondaryImg from "../../Assets/img/save - secondary.png";
import strokeImg from "../../Assets/img/button 52x52 - stroke.png";
import connectionImg from "../../Assets/usb - off@2x.png";
import "./Navbar.css";
import "./style.css";
import renderPrgImage from "../../source/programImg";
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
