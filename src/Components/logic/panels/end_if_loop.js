import React, { Component } from "react";
import renderPrgImage from "../../../source/programImg";

class EndIfLoop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
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
        <img
          style={{
            height: "15%",
            width: "10%",
            position: "absolute",
            left: "45%",
            top: "45%",
          }}
          src={renderPrgImage("stopActive")}
        ></img>
        <p
          style={{
            color: "#311B92",
            fontSize: "28px",
            fontWeight: "500",
            position: "absolute",
            left: "50%",
            top: "65%",

            transform: "translate(-54%,-50%)",
          }}
        >
          End of {this.props.current.substr("end_".length)}
        </p>
      </div>
    );
  }
}

export default EndIfLoop;

// var React = require('react');
// var PropTypes = React.PropTypes;

// var EndIfLoop = React.createClass({

//   render: function() {
//     return (
//       <div style={{
//           textAlign: 'center',
//           textTransform: 'uppercase',
//           fontWeight: 'bold',
//           paddingTop: '0.5em',
//         }}>
//         END OF {this.props.current.substr('end_'.length)}
//       </div>
//     );
//   }

// });

// module.exports = EndIfLoop;
