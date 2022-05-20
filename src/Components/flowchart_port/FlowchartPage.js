import React, { Component } from "react";
import Myflowchart from "./FlowchartConnections/Myflowchart/Myflowchart";
import "./Navbar.css";
import "./style.css";
import renderPrgImage from "../../source/programImg";
import { DndProvider } from "react-dnd-latest";
import { HTML5Backend } from "react-dnd-html5-backend-latest";
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
          <DndProvider backend={HTML5Backend}>
            <Myflowchart />
          </DndProvider>
        </div>
      </div>
    );
  }
}

export default FlowchartPage;
