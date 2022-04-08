import React, { Component } from "react";

import Checkbox from "./helpers/Checkbox";
import InputNumber from "./helpers/InputNumber";
import Colors from "../Colors";

const cellstyle = {
  color: "black",
};
const padding = { padding: "0.5em", color: "black" };
const paddingNoRight = { padding: "0.5em", paddingRight: 0 };
const paddingNoLeft = { paddingLeft: 0 };
const blank = { height: "0.5em" };

class StartPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange = (key, value) => {
    const { state, onChange } = this.props;
    state[key] = value;
    if (!value) {
      var keys_arr = [];
      if (key.includes("bic")) {
        keys_arr.push("assignCount" + key);
        keys_arr.push("valueCount" + key);
        keys_arr.push("valueNumCount" + key);
      } else if (key.includes("bid") || key.includes("bif")) {
        keys_arr.push("assign" + key);
        keys_arr.push("value" + key);
        keys_arr.push("valuenum" + key);
      } else if (key.includes("iot")) {
        for (var i = 1; i <= 10; i++) {
          keys_arr.push("assignIOT" + i);
          keys_arr.push("valueIOT" + i);
          keys_arr.push("valuenumIOT" + i);
        }
        keys_arr.push("IOT_counter");
        keys_arr.push("IOTROW");
      }

      for (var deleteKey in keys_arr) {
        this.props.bottomPanelDeleteKey(keys_arr[deleteKey]);
      }
    }
    onChange(state);
  };
  hexTypeCheck = () => {
    this.props.hexTypeCheck("start");
  };
  render() {
    const { state } = this.props;
    return (
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            color: "#FFF",
            position: "absolute",
            top: "19%",
            left: "17%",
            fontWeight: "bold",
            width: "70%",
            height: "50vh",
          }}
        >
          <tbody>
            <tr>
              <td style={blank} colSpan={6} />
            </tr>

            <tr>
              <td style={cellstyle} colSpan={2}>
                {" "}
                <Checkbox
                  hexComponentType="start"
                  checked={state.bic1 || false}
                  onChange={(value) => this.onChange("bic1", value)}
                  label="Counter 1"
                />{" "}
              </td>

              <td style={cellstyle} colSpan={2}>
                {" "}
                <Checkbox
                  hexComponentType="start"
                  checked={state.bic2 || false}
                  onChange={(value) => this.onChange("bic2", value)}
                  label="Counter 2"
                />
              </td>

              <td
                style={{
                  color: "black",
                  width: "33%",
                }}
                colSpan={2}
              >
                {" "}
                <Checkbox
                  hexComponentType="start"
                  checked={state.btTx || false}
                  onChange={(value) => this.onChange("btTx", value)}
                  label="BT TX"
                />
              </td>
            </tr>

            <tr>
              <td style={cellstyle} colSpan={2}>
                <Checkbox
                  hexComponentType="start"
                  checked={state.bif1 || false}
                  onChange={(value) => this.onChange("bif1", value)}
                  label="Flag 1"
                />
              </td>

              <td style={cellstyle} colSpan={2}>
                <Checkbox
                  hexComponentType="start"
                  checked={state.bif2 || false}
                  onChange={(value) => this.onChange("bif2", value)}
                  label="Flag 2"
                />
              </td>

              <td style={cellstyle} colSpan={2}>
                {" "}
                <Checkbox
                  checked={state.btRx || false}
                  onChange={(value) => this.onChange("btRx", value)}
                  hexComponentType="start"
                  label="BT RX"
                />
              </td>
            </tr>

            <tr style={{}}>
              <td style={cellstyle} colSpan={2}>
                <Checkbox
                  hexComponentType="start"
                  checked={state.usbtx || false}
                  onChange={(value) => this.onChange("usbtx", value)}
                  label="USB TX"
                />
              </td>

              <td style={cellstyle} colSpan={2}>
                <Checkbox
                  hexComponentType="start"
                  checked={state.usbrx || false}
                  onChange={(value) => this.onChange("usbrx", value)}
                  label="USB RX"
                />
              </td>
            </tr>

            <tr></tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default StartPanel;
