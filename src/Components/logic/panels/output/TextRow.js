import React, { Component } from "react";

import Checkbox from "../helpers/Checkbox";
import InputText from "../helpers/InputText";

class TextRow extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    const { assign, name, port, state, onChange, handlecheckbox } = this.props;
    console.log("Textrow props", this.props);
    return (
      <div className={`hardwareInfo-section`}>
        <div className="portDetails-hw" style={{}}>
          <Checkbox
            checked={assign || false}
            onChange={() => {
              handlecheckbox();
            }}
            label={this.props.label}
            activePort={port}
          />
        </div>
        <div
          className={`portSlider-hw  isActivehardwareInfo${assign}`}
          style={{ position: "relative" }}
        >
          <input
            type="text"
            id={this.props.label}
            autocomplete="off"
            style={{
              height: "100%",
              width: "100%",
              textAlign: "center",
              borderStyle: "dotted",
              borderColor: "#e0dede",
              background: "#ebf6fa",
              fontSize: "18px",
            }}
            placeholder="Enter Text Here..."
            disabled={!assign}
            maxlength="16"
            value={this.props.textValue}
            onChange={(e) => {
              this.props.handleTextChange(e);
            }}
          />
          <p
            style={{
              position: "absolute",
              right: "2%",
              top: "5%",
              fontSize: "10px",
              color: "grey",
            }}
          >
            {this.props.textValue == undefined
              ? 0
              : this.props.textValue.length}
            /16
          </p>
          {/* <Slider
              title="Intensity"
              disabled={!assign}
              value={value || 0}
              min={min}
              max={max}
              onChange={(value, name) => {
                console.log("RANGE CLCIK");

                getRangeVal(this.props.title, port, value);
              }}
              renderIn="hardwarePropertyPanel"
            /> */}
          {/* <p style={{ position: "absolute", left: "27%", bottom: "10%" }}>
              {min}
            </p>
            <p style={{ position: "absolute", right: "12%", bottom: "10%" }}>
              {max}
            </p> */}
        </div>
      </div>
    );

    // return (

    //   <tr
    //     style={{
    //       verticalAlign: "middle",
    //       color: "#FFF",
    //       borderBottom: "2px solid grey",
    //       height: "72px",
    //     }}
    //   >
    //     <td style={{ padding: "0.5em 0", fontWeight: "bold" }}>
    //       <Checkbox
    //         checked={assign || false}
    //         onChange={(value) => onChange("assign" + port, value)}
    //         label={name}
    //       />
    //     </td>
    //     <td>
    //       <span
    //         style={{
    //           fontWeight: "bold",
    //           fontSize: "0.9em",
    //         }}
    //       >
    //         -{port}
    //       </span>
    //     </td>
    //     <td
    //       style={{
    //         width: "70%",
    //       }}
    //     >
    //       {[1, 2, 3, 4, 5].map((char) => {
    //         return (
    //           <span key={char}>
    //             {[1].map((index) => {
    //               return (
    //                 <InputText
    //                   port={"dot_matrix" + char}
    //                   index={index}
    //                   value={state[`dot_matrix${char}`]}
    //                   on={state[`value${char + index}`]}
    //                   disabled={!assign}
    //                   onChange={onChange}
    //                   key={index}
    //                 />
    //               );
    //             })}
    //           </span>
    //         );
    //       })}
    //     </td>
    //   </tr>
    // );
  }
}

// module.exports = TextRSow;
export default TextRow;
