import React, { Component } from "react";
import Logic from "..";

import LogicSwitchComp from "./helpers/SwitchComp/LogicSwitchComp";
import renderPrgImage from "../../../source/programImg";

import SwitchComp from "../../humanoidFlowChart/ReusableComp/SwitchComp/SwitchComp";
import SwitchCompThree from "../../humanoidFlowChart/ReusableComp/SwitchCompThree/SwitchCompThree";
import SwitchCompTwo from "../../humanoidFlowChart/ReusableComp/SwitchCompTwo/SwitchCompTwo";
import Colors from "../Colors";

class End extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Repeat",
      isrepeat: true,
      isend: false,
    };
  }

  selectRepeat = () => {
    sessionStorage.setItem("SelectedStatus", "rep");
  };
  selectEnd = () => {
    sessionStorage.setItem("SelectedStatus", "end");
  };

  switchActionHandler = (e) => {
    sessionStorage.setItem("SelectedStatus", "end");

    this.setState({
      name: "Stop",
    });
    console.log(this.props, "PROPS");

    this.props.onChange("end");
  };
  switchActionHandler1 = (e) => {
    this.setState({
      name: "Repeat",
    });
    console.log(this.props, "PROPS");

    sessionStorage.setItem("SelectedStatus", "rep");
    this.props.onChange("repeat");
  };

  RepeatHandler = (e) => {
    this.setState({ isrepeat: !this.state.isrepeat });
    this.setState({
      isend: false,
    });
  };
  EndHandler = (e) => {
    this.setState({ isend: !this.state.isend });
    this.setState({
      isrepeat: false,
    });
  };

  componentDidMount = () => {
    if (this.props.value == "repeat") {
      this.setState({
        isrepeat: true,
      });

      console.log("TRUUE");
    }
    if (this.props.value == "end") {
      this.setState({
        isend: true,
      });
      console.log("FALLLSE");
    }
  };

  // ClickHandle = (e) => {
  //   if (this.state.isrepeat == true) {
  //     this.setState({
  //       isend: false,
  //     });
  //   }
  //   if (this.state.isend == true) {
  //     this.setState({
  //       isrepeat: false,
  //     });
  //   }
  // };

  render() {
    const { state, onChange } = this.props;

    return (
      <div
        style={{
          textAlign: "center",
          color: "black",
          width: "80%",
          height: "100%",
          marginTop: "-5%",
          position: "relative",
          left: "50%",
          top: "50%",
          // border: "2px solid red",
          transform: "translate(-50%,-50%)",
        }}
      >
        {this.state.isrepeat ? (
          <img
            style={{
              height: "15%",
              width: "10%",
              position: "absolute",
              left: "56%",
              top: "35%",
            }}
            src={renderPrgImage("repeatActive")}
            onClick={(e) => {
              this.RepeatHandler();
            }}
          ></img>
        ) : (
          <img
            style={{
              height: "15%",
              width: "10%",
              position: "absolute",
              left: "56%",
              top: "35%",
            }}
            src={renderPrgImage("repeatInactive")}
            onClick={(e) => {
              this.switchActionHandler1();
              this.RepeatHandler();
              // this.ClickHandle();
            }}
          ></img>
        )}
        <p
          style={{
            color: "#311B92",
            fontSize: "20px",
            fontWeight: "500",
            position: "absolute",
            left: "61%",
            top: "52%",

            transform: "translate(-54%,-50%)",
          }}
        >
          Loop
        </p>

        {this.state.isend ? (
          <img
            style={{
              height: "15%",
              width: "10%",
              position: "absolute",
              left: "36%",
              top: "35%",
            }}
            src={renderPrgImage("stopActive")}
            onClick={(e) => {
              this.EndHandler();
            }}
          ></img>
        ) : (
          <img
            style={{
              height: "15%",
              width: "10%",
              position: "absolute",
              left: "36%",
              top: "35%",
            }}
            src={renderPrgImage("stopInactive")}
            onClick={(e) => {
              this.switchActionHandler();
              this.EndHandler();
              // this.ClickHandle();
            }}
          ></img>
        )}
        <p
          style={{
            color: "#311B92",
            fontSize: "20px",
            fontWeight: "500",
            position: "absolute",
            left: "41%",
            top: "52%",

            transform: "translate(-54%,-50%)",
          }}
        >
          Stop
        </p>
        {/* <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            border: "2px solid red",
            transform: "translate(-50%,-50%)",
          }}
        >
          <LogicSwitchComp
            ComponentName="END/Loop"
            switchActionHandler={this.switchActionHandler}
          />
        </div> */}

        {/* <p
          style={{
            color: "#311B92",
            fontSize: "20px",
            fontWeight: "500",
            position: "absolute",
            left: "54%",
            top: "50%",
            

            transform: "translate(-54%,-50%)",
          }}
        >
          {this.state.name}
        </p> */}
      </div>
    );
  }
}

export default End;

//var React = require('react');
// var PropTypes = React.PropTypes;

// var End = React.createClass({

//   selectRepeat:function(){
//     sessionStorage.setItem('SelectedStatus',"rep");
//   },
//   selectEnd:function(){
//     sessionStorage.setItem('SelectedStatus','end');
//   },
//   render: function() {
//     const { state, onChange } = this.props;
//     return (
//       <div style={{
//           textAlign: 'center'
//         }}>
//         <label><input type='radio' onClick={this.selectRepeat} onChange={()=>onChange('repeat')} name='logicEndPanelRadio' checked={state === 'repeat'}/> Repeat</label>&nbsp;
//         <label><input type='radio' onClick={this.selectEnd} onChange={()=>onChange('end')} name='logicEndPanelRadio' checked={state === 'end'}/> End</label>
//       </div>
//     );
//   }

// });

// module.exports = End;
