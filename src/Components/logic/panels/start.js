import React, { Component } from "react";

import Checkbox from "./helpers/Checkbox";
import InputNumber from "./helpers/InputNumber";
import Colors from "../Colors";

const cellstyle = {
  // borderRight: "0.125em solid " + Colors.bordergrey,
  // padding: "0.5em",

  color: "#00008B",
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
      // console.log('keys to delete', keys_arr);
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
            top: "12%",
            left: "15%",
            // padding: '0.5em',
            // border: "2px solid red",
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
                />{" "}
                <label style={{ position: "relative", top: "5%" }}>
                  COUNTER 1
                </label>{" "}
              </td>
              <tr>
                <td
                  style={{
                    width: "0.5%",
                    height: "12%",
                    backgroundColor: "#00008B",
                    left: "28%",
                    top: "15%",
                    position: "absolute",
                  }}
                  colSpan={1}
                />
              </tr>
              <td style={cellstyle} colSpan={1}>
                {" "}
                <Checkbox
                  hexComponentType="start"
                  checked={state.bic2 || false}
                  onChange={(value) => this.onChange("bic2", value)}
                />
                <label style={{ position: "relative", top: "5%" }}>
                  COUNTER 2
                </label>
              </td>

              <tr>
                <td
                  style={{
                    width: "0.5%",
                    height: "12%",
                    backgroundColor: "#00008B",
                    top: "15%",
                    left: "62%",
                    position: "absolute",
                  }}
                  colSpan={1}
                />
              </tr>
              <td
                style={{
                  color: "#00008B",
                  width: "35%",
                }}
                colSpan={1}
              >
                {" "}
                <Checkbox
                  hexComponentType="start"
                  checked={state.btTx || false}
                  onChange={(value) => this.onChange("btTx", value)}
                />
                <label style={{ position: "relative", left: "10%", top: "5%" }}>
                  BT TX
                </label>
              </td>
            </tr>
            <tr>
              <td style={blank} colSpan={6} />
            </tr>

            <tr>
              <td style={cellstyle} colSpan={2}>
                <Checkbox
                  hexComponentType="start"
                  checked={state.bif1 || false}
                  onChange={(value) => this.onChange("bif1", value)}
                />
                <label style={{ position: "relative", top: "5%" }}>
                  FLAG 1
                </label>
              </td>
              <tr>
                <td
                  style={{
                    width: "0.5%",
                    height: "12%",
                    backgroundColor: "#00008B",
                    top: "47%",
                    left: "28%",
                    position: "absolute",
                  }}
                  colSpan={1}
                />
              </tr>
              <td style={cellstyle} colSpan={1}>
                <Checkbox
                  hexComponentType="start"
                  checked={state.bif2 || false}
                  onChange={(value) => this.onChange("bif2", value)}
                />
                <label style={{ position: "relative", top: "5%" }}>
                  FLAG 2
                </label>
              </td>
              <tr>
                <td
                  style={{
                    width: "0.5%",
                    height: "12%",
                    backgroundColor: "#00008B",
                    top: "47%",
                    left: "62%",
                    position: "absolute",
                  }}
                  colSpan={1}
                />
              </tr>
              <td style={{ color: "#00008B" }} colSpan={1}>
                {" "}
                <Checkbox
                  checked={state.btRx || false}
                  onChange={(value) => this.onChange("btRx", value)}
                  hexComponentType="start"
                />
                <label style={{ position: "relative", left: "10%", top: "5%" }}>
                  BT RX{" "}
                </label>
              </td>
            </tr>
            {/* <tr>
            <td style={paddingNoRight}>
              <Checkbox
               hexComponentType="start" checked={state.bif1 || false} onChange={(value) => this.onChange('bif1', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox
               hexComponentType="start" checked={state.bif2 || false} onChange={(value) => this.onChange('bif2', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox
               hexComponentType="start" checked={state.bif3 || false} onChange={(value) => this.onChange('bif3', value)}/>
            </td>
            <td style={{...padding,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
          </tr> */}
            <tr>
              <td style={blank} colSpan={6} />
            </tr>
            <tr style={{}}>
              <td style={{ color: "#00008B" }} colSpan={2}>
                <Checkbox
                  hexComponentType="start"
                  checked={state.usbtx || false}
                  onChange={(value) => this.onChange("usbtx", value)}
                />
                <label style={{ position: "relative", top: "5%" }}>
                  USB TX
                </label>
              </td>
              <tr>
                <td
                  style={{
                    width: "0.5%",
                    height: "12%",
                    backgroundColor: "#00008B",
                    top: "80%",
                    left: "28%",
                    position: "absolute",
                  }}
                  colSpan={1}
                />
              </tr>
              <td style={cellstyle} colSpan={1}>
                <Checkbox
                  hexComponentType="start"
                  checked={state.usbrx || false}
                  onChange={(value) => this.onChange("usbrx", value)}
                />
                <label style={{ position: "relative", top: "5%" }}>
                  USB RX{" "}
                </label>
              </td>

              {/* <td style={{ color: "#00008B" }} colSpan={1}>
                <Checkbox
                  hexComponentType="start"
                  checked={state.usbtx || false}
                  onChange={(value) => this.onChange("usbtx", value)}
                />
                <label>USB TX</label>
              </td> */}
            </tr>

            {/* <tr>
            <td style={paddingNoRight}>
              <Checkbox
               hexComponentType="start" checked={state.bid1 || false} onChange={(value) => this.onChange('bid1', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox
               hexComponentType="start" checked={state.bid2 || false} onChange={(value) => this.onChange('bid2', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox
               hexComponentType="start" checked={state.bid3 || false} onChange={(value) => this.onChange('bid3', value)}/>
            </td>
            <td style={{...padding, ...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
          </tr> */}
            <tr>
              <td style={blank} colSpan={6} />
            </tr>
            {/* <tr><td  style={cellstyle} colSpan={2}><Checkbox
             hexComponentType="start" checked={state.bmp3 || false} onChange={(value) => this.onChange('bmp3', value)}/> Bluetooth MP3</td>
              <td  style={cellstyle} colSpan={2}><Checkbox
               hexComponentType="start" checked={state.btr || false} onChange={(value) => this.onChange('btr', value)}/>BT Remote</td>
              <td style={padding} colSpan={2}> <Checkbox
               hexComponentType="start" checked={state.iot || false} onChange={(value) => this.onChange('iot', value)}/>IOT</td>
          </tr> */}
            <tr>
              {/* <td style={paddingNoRight}>
              <Checkbox
               hexComponentType="start" checked={state.bmp3 || false} onChange={(value) => this.onChange('bmp3', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox
               hexComponentType="start" checked={state.btr || false} onChange={(value) => this.onChange('btr', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox
               hexComponentType="start" checked={state.iot || false} onChange={(value) => this.onChange('iot', value)}/>
            </td>
            <td style={{...padding,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default StartPanel;
