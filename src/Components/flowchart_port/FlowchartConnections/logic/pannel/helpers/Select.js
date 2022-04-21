import React, { Component } from "react";
let A1 = JSON.parse(sessionStorage.getItem("A1"));
let A2 = JSON.parse(sessionStorage.getItem("A2"));
let B1 = JSON.parse(sessionStorage.getItem("B1"));
let B2 = JSON.parse(sessionStorage.getItem("B2"));
let C1 = JSON.parse(sessionStorage.getItem("C1"));
let C2 = JSON.parse(sessionStorage.getItem("C2"));
let D1 = JSON.parse(sessionStorage.getItem("D1"));
let D2 = JSON.parse(sessionStorage.getItem("D2"));
let E1 = JSON.parse(sessionStorage.getItem("E1"));
let E2 = JSON.parse(sessionStorage.getItem("E2"));
let F1 = JSON.parse(sessionStorage.getItem("F1"));
let F2 = JSON.parse(sessionStorage.getItem("F2"));
let M1 = JSON.parse(sessionStorage.getItem("M1"));
let M2 = JSON.parse(sessionStorage.getItem("M2"));
let M3 = JSON.parse(sessionStorage.getItem("M3"));
let M4 = JSON.parse(sessionStorage.getItem("M4"));

let a1Checked = JSON.parse(sessionStorage.getItem("a1-I/O"));
let a1Digi = JSON.parse(sessionStorage.getItem("A1DIGI"));
let a2Checked = JSON.parse(sessionStorage.getItem("a2-I/O"));
let a2Digi = JSON.parse(sessionStorage.getItem("A2DIGI"));
let b1Checked = JSON.parse(sessionStorage.getItem("b1-I/O"));
let b1Digi = JSON.parse(sessionStorage.getItem("B1DIGI"));
let b2Checked = JSON.parse(sessionStorage.getItem("b2-I/O"));
let b2Digi = JSON.parse(sessionStorage.getItem("B2DIGI"));
let c1Checked = JSON.parse(sessionStorage.getItem("c1-I/O"));
let c1Digi = JSON.parse(sessionStorage.getItem("C1DIGI"));
let c2Checked = JSON.parse(sessionStorage.getItem("c2-I/O"));
let c2Digi = JSON.parse(sessionStorage.getItem("C2DIGI"));
let d1Checked = JSON.parse(sessionStorage.getItem("D1"));
let d1Digi = JSON.parse(sessionStorage.getItem("D1DIGI"));
let d2Checked = JSON.parse(sessionStorage.getItem("D2"));
let d2Digi = JSON.parse(sessionStorage.getItem("D2DIGI"));
let e1Checked = JSON.parse(sessionStorage.getItem("e1-I/O"));
let e1Digi = JSON.parse(sessionStorage.getItem("E1DIGI"));
let e2Checked = JSON.parse(sessionStorage.getItem("E2"));
let e2Digi = JSON.parse(sessionStorage.getItem("E2DIGI"));
let f1Checked = JSON.parse(sessionStorage.getItem("f1-I/O"));
let f1Digi = JSON.parse(sessionStorage.getItem("F1DIGI"));
let f2Checked = JSON.parse(sessionStorage.getItem("f2-I/O"));
let f2Digi = JSON.parse(sessionStorage.getItem("F2DIGI"));
let m1Checked = JSON.parse(sessionStorage.getItem("m1-I/O"));
let m1Digi = JSON.parse(sessionStorage.getItem("M1DIGI"));
let m2Checked = JSON.parse(sessionStorage.getItem("m2-I/O"));
let m2Digi = JSON.parse(sessionStorage.getItem("M2DIGI"));
let m3Checked = JSON.parse(sessionStorage.getItem("m3-I/O"));
let m3Digi = JSON.parse(sessionStorage.getItem("M3DIGI"));
let m4Checked = JSON.parse(sessionStorage.getItem("m4-I/O"));
let m4Digi = JSON.parse(sessionStorage.getItem("M4DIGI"));
let isMic = JSON.parse(sessionStorage.getItem("isMic"));
let isDistanceSensors = JSON.parse(sessionStorage.getItem("isDistanceSensors"));
let isGestureSensor = JSON.parse(sessionStorage.getItem("isGestureSensor"));
let isLightSensor = JSON.parse(sessionStorage.getItem("isLightSensor"));
let isColorSensor = JSON.parse(sessionStorage.getItem("isColorSensor"));
let isTemperature = JSON.parse(sessionStorage.getItem("isTemperature"));
let isTouchOne = JSON.parse(sessionStorage.getItem("isTouchOne"));
let isTouchTwo = JSON.parse(sessionStorage.getItem("isTouchTwo"));
let isTouchZeroOutput = JSON.parse(sessionStorage.getItem("isTouchZeroOutput"));
let isTouchOneOutput = JSON.parse(sessionStorage.getItem("isTouchOneOutput"));
let isTouchTwoOutput = JSON.parse(sessionStorage.getItem("isTouchTwoOutput"));
let isTouchZero = JSON.parse(sessionStorage.getItem("isTouchZero"));
class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    A1 = JSON.parse(sessionStorage.getItem("A1"));
    A2 = JSON.parse(sessionStorage.getItem("A2"));
    a1Checked = JSON.parse(sessionStorage.getItem("a1-I/O"));
    a2Checked = JSON.parse(sessionStorage.getItem("a2-I/O"));
    B1 = JSON.parse(sessionStorage.getItem("B1"));
    B2 = JSON.parse(sessionStorage.getItem("B2"));
    b1Checked = JSON.parse(sessionStorage.getItem("b1-I/O"));
    b2Checked = JSON.parse(sessionStorage.getItem("b2-I/O"));
    C1 = JSON.parse(sessionStorage.getItem("C1"));
    C2 = JSON.parse(sessionStorage.getItem("C2"));
    c1Checked = JSON.parse(sessionStorage.getItem("c1-I/O"));
    c2Checked = JSON.parse(sessionStorage.getItem("c2-I/O"));
    e1Checked = JSON.parse(sessionStorage.getItem("e1-I/O"));
    e1Digi = JSON.parse(sessionStorage.getItem("E1DIGI"));
    e2Checked = JSON.parse(sessionStorage.getItem("e2-I/O"));
    e2Digi = JSON.parse(sessionStorage.getItem("E2DIGI"));
    f1Checked = JSON.parse(sessionStorage.getItem("f1-I/O"));
    f1Digi = JSON.parse(sessionStorage.getItem("F1DIGI"));
    f2Checked = JSON.parse(sessionStorage.getItem("f2-I/O"));
    f2Digi = JSON.parse(sessionStorage.getItem("F2DIGI"));
    m1Checked = JSON.parse(sessionStorage.getItem("m1-I/O"));
    m1Digi = JSON.parse(sessionStorage.getItem("M1DIGI"));
    m2Checked = JSON.parse(sessionStorage.getItem("m2-I/O"));
    m2Digi = JSON.parse(sessionStorage.getItem("M2DIGI"));
    m3Checked = JSON.parse(sessionStorage.getItem("m3-I/O"));
    m3Digi = JSON.parse(sessionStorage.getItem("M3DIGI"));
    m4Checked = JSON.parse(sessionStorage.getItem("m4-I/O"));
    m4Digi = JSON.parse(sessionStorage.getItem("M4DIGI"));
    isMic = JSON.parse(sessionStorage.getItem("isMic"));
    isDistanceSensors = JSON.parse(sessionStorage.getItem("isDistanceSensors"));
    isGestureSensor = JSON.parse(sessionStorage.getItem("isGestureSensor"));
    isLightSensor = JSON.parse(sessionStorage.getItem("isLightSensor"));
    isColorSensor = JSON.parse(sessionStorage.getItem("isColorSensor"));
    isTemperature = JSON.parse(sessionStorage.getItem("isTemperature"));
    isTouchOne = JSON.parse(sessionStorage.getItem("isTouchOne"));
    isTouchTwo = JSON.parse(sessionStorage.getItem("isTouchTwo"));
    isTouchZero = JSON.parse(sessionStorage.getItem("isTouchZero"));
    isTouchZeroOutput = JSON.parse(sessionStorage.getItem("isTouchZeroOutput"));
    isTouchOneOutput = JSON.parse(sessionStorage.getItem("isTouchOneOutput"));
    isTouchTwoOutput = JSON.parse(sessionStorage.getItem("isTouchTwoOutput"));
  }

  onChange = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    var style = {
      border: "2.1px solid #3C413E",
      borderRadius: "15px",
      color: "#000",
      background: "#FFF",
      height: "57px",
      width: "23em",
      margin: "1em",
      outline: "none",
      texAlign: "center",
      fontFamily: "Halcyon_Medium !important",
    };

    return (
      <>
        {console.log("===>>>>>>>===>>>====>>>>", this.props.selected)}
        <select
          onChange={this.onChange}
          style={style}
          value={this.props.selected}
        >
          <option value="null"></option>
          {!a1Checked && A1 ? (
            <>
              <option value="port A1">PORT A1</option>
            </>
          ) : (
            <></>
          )}
          {!a2Checked && A2 ? (
            <>
              <option value="port A2">PORT A2</option>
            </>
          ) : (
            <></>
          )}
          {!b1Checked && B1 ? (
            <>
              <option value="port B1">PORT B1</option>
            </>
          ) : (
            <></>
          )}
          {!b2Checked && B2 ? (
            <>
              <option value="port B2">PORT B2</option>
            </>
          ) : (
            <></>
          )}
          {!c1Checked && C1 ? (
            <>
              <option value="port C1">PORT C1</option>
            </>
          ) : (
            <></>
          )}
          {!c2Checked && C2 ? (
            <>
              <option value="port C2">PORT C2</option>
            </>
          ) : (
            <></>
          )}
          {!e1Checked && E1 ? (
            <>
              <option value="port E1">PORT E1</option>
            </>
          ) : (
            <></>
          )}
          {!e2Checked && E2 ? (
            <>
              <option value="port E2">PORT E2</option>
            </>
          ) : (
            <></>
          )}
          {!f1Checked && F1 ? (
            <>
              <option value="port F1">PORT F1</option>
            </>
          ) : (
            <></>
          )}
          {!f2Checked && F2 ? (
            <>
              <option value="port F2">PORT F2</option>
            </>
          ) : (
            <></>
          )}

          {isMic ? (
            <>
              <option value="microphone">Microphone</option>
            </>
          ) : (
            <></>
          )}
          {isDistanceSensors ? (
            <>
              <option value="distanceSensor">Distance Sensor</option>
            </>
          ) : (
            <></>
          )}
          {isGestureSensor ? (
            <>
              <option value="gestureSensor">Gesture Sensor</option>
            </>
          ) : (
            <></>
          )}
          {isLightSensor ? (
            <>
              <option value="lightSensor">Light Sensor</option>
            </>
          ) : (
            <></>
          )}
          {isColorSensor ? (
            <>
              <option value="colorSensorRed">4-IN-1 SENSOR → RED</option>
              <option value="colorSensorGreen">4-IN-1 SENSOR → GREEN</option>
              <option value="colorSensorBlue">4-IN-1 SENSOR → BLUE</option>
            </>
          ) : (
            <></>
          )}
          {isTemperature ? (
            <>
              <option value="temperature">Temperature</option>
            </>
          ) : (
            <></>
          )}
          {isTouchZero ? (
            <>
              <option value="touchZero">Touchpad Zero </option>
            </>
          ) : (
            <></>
          )}
          {isTouchOne ? (
            <>
              <option value="touchOne">Touchpad One </option>
            </>
          ) : (
            <></>
          )}
          {isTouchTwo ? (
            <>
              <option value="touchTwo">Touchpad Two </option>
            </>
          ) : (
            <></>
          )}
        </select>
      </>
    );
  }
}

export default Select;
