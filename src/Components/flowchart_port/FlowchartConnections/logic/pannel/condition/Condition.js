import React, { Component } from "react";

import renderPrgImage from "../../../../../../source/programImg";
import Select from "../helpers/Select";
import Slider from "../helpers/Slider";

import "./condition.css";

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
let e2Checked = JSON.parse(sessionStorage.getItem("e2-I/O"));
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
let min;
let count = [];
let count1 = [];
let isG = [];
let isL = [];
let isNe = [];
let isE = [];
let isIb = [];
let selected = [],
  selectedTwo = [];

for (let i = 0; i < 1000; i++)
  selected[i] = sessionStorage.getItem(`ifSelect${i}`) || "null";
class Condition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: false,
      isGraterThan: Boolean(
        sessionStorage.getItem(`gt${this.props.check}`) == "true"
      ),
      isLessThan: Boolean(
        sessionStorage.getItem(`lt${this.props.check}`) == "true"
      ),
      isNotequalTo: Boolean(
        sessionStorage.getItem(`ne${this.props.check}`) == "true"
      ),
      isEqualTo: Boolean(
        sessionStorage.getItem(`eq${this.props.check}`) == "true"
      ),
      isInBtween: Boolean(
        sessionStorage.getItem(`bw${this.props.check}`) == "true"
      ),
      isRead: false,

      responceTp0: "",
      responceTp1: "",
      responceTp2: "",
      touch_pad: "",
      touch_pad2: "",
      rangeA1: "252",
      rangeA2: "",
      tactswitch: "",
      mic: "",
      temp: "",
      gas: "",
      one: "",
      two: "",
      red: "",
      green: "",
      blue: "",
      light: "",
      gesture: "",
      distance: "",
      readToggel: "",
      value: parseInt(sessionStorage.getItem(`ifValue${this.props.check}`)),
      value1: parseInt(sessionStorage.getItem(`ifValue2${this.props.check}`)),
      max: 1,
      selected: sessionStorage.getItem(`ifSelect${this.props.check}`) || "null",
      selectedTwo: selectedTwo[this.props.check],
    };
  }
  componentWillMount() {
    a1Checked = JSON.parse(sessionStorage.getItem("a1-I/O"));
    a1Digi = JSON.parse(sessionStorage.getItem("A1DIGI"));
    a2Checked = JSON.parse(sessionStorage.getItem("a2-I/O"));
    a2Digi = JSON.parse(sessionStorage.getItem("A2DIGI"));
    b1Checked = JSON.parse(sessionStorage.getItem("b1-I/O"));
    b1Digi = JSON.parse(sessionStorage.getItem("B1DIGI"));
    b2Checked = JSON.parse(sessionStorage.getItem("b2-I/O"));
    b2Digi = JSON.parse(sessionStorage.getItem("B2DIGI"));
    c1Checked = JSON.parse(sessionStorage.getItem("c1-I/O"));
    c1Digi = JSON.parse(sessionStorage.getItem("C1DIGI"));
    c2Checked = JSON.parse(sessionStorage.getItem("c2-I/O"));
    c2Digi = JSON.parse(sessionStorage.getItem("C2DIGI"));
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
    if (selected[this.props.check] == "null") return;

    this.onChange("hi", selected[this.props.check]);
  }
  componentWillUnmount() {
    count[this.props.check] = this.state.value;
    selected[this.props.check] = this.state.selected;
    selectedTwo[this.props.check] = this.state.selectedTwo;
    isG[this.props.check] = this.state.isGraterThan;

    isL[this.props.check] = this.state.isLessThan;
    isNe[this.props.check] = this.state.isNotequalTo;
    isE[this.props.check] = this.state.isEqualTo;
    isIb[this.props.check] = this.state.isInBtween;
    count1[this.props.check] = this.state.value1;
    console.log("====>selected", selected[this.props.check]);
  }
  onChange = (name, val) => {
    console.log("value===>gsk===>", val, name, a1Digi);

    if (name == "value") {
      this.setState({ value: val });
      return;
    } else if (name == "value1") {
      this.setState({ value1: val });
      return;
    }
    if (name !== "sourceTwo") {
      console.log(
        "value JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ",
        val
      );

      if (
        val === "distanceSensor" ||
        val === "lightSensor" ||
        val === "colorSensor" ||
        val === "gestureSensor"
      ) {
        console.log("mic======>=====>", this.state.max);
        this.setState({ max: 255 });
      } else if (val === "microphone") {
        this.setState({ max: 65535 });
      } else if (val.search("touch") !== -1 || val === "temperature") {
        console.log(
          "valuefffff JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ"
        );

        this.setState({ max: 1024 });
      } else if (val === "port A1") {
        if (a1Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port A2") {
        if (a2Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port B1") {
        if (b1Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port B2") {
        if (b2Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port C1") {
        if (c1Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port C2") {
        if (c2Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port E1") {
        if (e1Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port E2") {
        if (e2Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port F1") {
        if (f1Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port F2") {
        if (f2Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port M1") {
        if (m1Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port M2") {
        if (m2Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port M3") {
        if (m3Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "port M4") {
        if (m4Digi) this.setState({ max: 1024 });
        else this.setState({ max: 1 });
      } else if (val == "ultra A" || val == "ultra C")
        this.setState({ max: 400 });
      else {
        if (!a1Checked) {
          this.onChange("hi", "port A1");
        } else if (!a2Checked) {
          this.onChange("hi", "port A2");
        } else if (!b1Checked) {
          this.onChange("hi", "port B1");
        } else if (!b2Checked) {
          this.onChange("hi", "port B2");
        } else if (!c1Checked) {
          this.onChange("hi", "port C1");
        } else if (!c2Checked) {
          this.onChange("hi", "port C2");
        } else if (!e1Checked) {
          this.onChange("hi", "port E1");
        } else if (!e2Checked) {
          this.onChange("hi", "port E2");
        } else if (!f1Checked) {
          this.onChange("hi", "port F1");
        } else if (!f2Checked) {
          this.onChange("hi", "port F2");
        } else if (!m1Checked) {
          this.onChange("hi", "port M1");
        } else if (!m2Checked) {
          this.onChange("hi", "port M2");
        } else if (!m3Checked) {
          this.onChange("hi", "port M3");
        } else if (!m4Checked) {
          this.onChange("hi", "port M4");
        }
      }
    }
    if (name === "source") this.setState({ selected: val });
    else if (name == "sourceTwo") this.setState({ selectedTwo: val });
    // if (this.state.value > this.state.max) this.setState({ value: 0 });
  };
  handleOperators(val) {
    if (val == "greaterThan")
      if (this.state.isGraterThan) this.setState({ isGraterThan: false });
      else {
        this.setState({ isGraterThan: true });
        this.setState({ isLessThan: false });
        this.setState({ isInBtween: false });
        this.setState({ isEqualTo: false });
        this.setState({ isNotequalTo: false });
      }
    else if (val == "lessThan")
      if (this.state.isLessThan) this.setState({ isLessThan: false });
      else {
        this.setState({ isLessThan: true });
        this.setState({ isGraterThan: false });
        this.setState({ isInBtween: false });
        this.setState({ isEqualTo: false });
        this.setState({ isNotequalTo: false });
      }
    else if (val == "inBetween")
      if (this.state.isInBtween) this.setState({ isInBtween: false });
      else {
        this.setState({ isInBtween: true });
        this.setState({ isGraterThan: false });
        this.setState({ isLessThan: false });
        this.setState({ isEqualTo: false });
        this.setState({ isNotequalTo: false });
      }
    else if (val == "equalTo")
      if (this.state.isEqualTo) this.setState({ isEqualTo: false });
      else {
        this.setState({ isEqualTo: true });
        this.setState({ isInBtween: false });
        this.setState({ isGraterThan: false });
        this.setState({ isLessThan: false });

        this.setState({ isNotequalTo: false });
      }
    else if (val == "notEqualTo")
      if (this.state.isNotequalTo) this.setState({ isNotequalTo: false });
      else {
        this.setState({ isNotequalTo: true });
        this.setState({ isInBtween: false });
        this.setState({ isGraterThan: false });
        this.setState({ isLessThan: false });
        this.setState({ isEqualTo: false });
      }
  }
  render() {
    min = 0;
    sessionStorage.setItem(`ifSelect${this.props.check}`, this.state.selected);

    sessionStorage.setItem(`ifValue${this.props.check}`, this.state.value);
    sessionStorage.setItem(`ifValue2${this.props.check}`, this.state.value1);

    sessionStorage.setItem(`gt${this.props.check}`, this.state.isGraterThan);
    sessionStorage.setItem(`lt${this.props.check}`, this.state.isLessThan);
    sessionStorage.setItem(`bw${this.props.check}`, this.state.isInBtween);
    sessionStorage.setItem(`eq${this.props.check}`, this.state.isEqualTo);
    sessionStorage.setItem(`ne${this.props.check}`, this.state.isNotequalTo);

    return (
      <div className="outertabDiv-Condition">
        <div className="select-sensor margin-section">
          <span className="sensor-txt">
            If the value of is{" "}
            <Select
              onChange={(value) => this.onChange("source", value)}
              componetName="flowchart"
              selected={this.state.selected}
            />
          </span>
        </div>

        <div className="select-Condition margin-section">
          {this.state.isGraterThan ? (
            <div className="item">
              <img
                src={renderPrgImage("greaterthanActive")}
                onClick={() => this.handleOperators("greaterThan")}
              />
              <p className="sensor-txt">Greater Than</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={renderPrgImage("greaterthanInActive")}
                onClick={() => this.handleOperators("greaterThan")}
              />
              <p className="sensor-txt">Greater Than</p>
            </div>
          )}

          {this.state.isLessThan ? (
            <div className="item">
              <img
                src={renderPrgImage("lessthanActive")}
                onClick={() => this.handleOperators("lessThan")}
              />
              <p className="sensor-txt">Less Than</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={renderPrgImage("lessthanInActive")}
                onClick={() => this.handleOperators("lessThan")}
              />
              <p className="sensor-txt">Less Than</p>
            </div>
          )}

          {this.state.isInBtween ? (
            <div className="item">
              <img
                src={renderPrgImage("inbetweenActive")}
                onClick={() => this.handleOperators("inBetween")}
              />
              <p className="sensor-txt">In Between</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={renderPrgImage("inbetweenInActive")}
                onClick={() => this.handleOperators("inBetween")}
              />
              <p className="sensor-txt">In Between</p>
            </div>
          )}

          {this.state.isEqualTo ? (
            <div className="item">
              <img
                src={renderPrgImage("equaltoActive")}
                onClick={() => this.handleOperators("equalTo")}
              />
              <p className="sensor-txt">Equals To</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={renderPrgImage("equaltoInActive")}
                onClick={() => this.handleOperators("equalTo")}
              />
              <p className="sensor-txt">Equals To</p>
            </div>
          )}

          {this.state.isNotequalTo ? (
            <div className="item">
              <img
                src={renderPrgImage("notequaltoActive")}
                onClick={() => this.handleOperators("notEqualTo")}
              />
              <p className="sensor-txt">Not Equals To</p>
            </div>
          ) : (
            <div className="item">
              <img
                src={renderPrgImage("notequaltoInActive")}
                onClick={() => this.handleOperators("notEqualTo")}
              />
              <p className="sensor-txt">Not Equals To</p>
            </div>
          )}

          {/* OPERATOR */}
        </div>

        <div className="select-slider margin-section">
          <span>{min}</span>
          <Slider
            value={this.state.value || 0}
            onChange={(value) => this.onChange("value", value)}
            max={this.state.max}
            min={min}
            renderIn="conditionPropertyPanel"
          />
          <span>{this.state.max}</span>
        </div>
        {this.state.isInBtween ? (
          <div className="select-slider margin-section">
            <span>{min}</span>
            <Slider
              value={this.state.value1 || 0}
              onChange={(value) => this.onChange("value1", value)}
              max={this.state.max}
              min={min}
              renderIn="conditionPropertyPanel"
            />
            <span>{this.state.max}</span>
          </div>
        ) : (
          <></>
        )}

        <div className="select-sensor-Read margin-section">
          <span>
            Read the
            <Select
              onChange={(value) => this.onChange("sourceTwo", value)}
              componetName="flowchart"
              selected={this.state.selectedTwo}
            />
          </span>

          <div>
            {this.state.isRead ? (
              <div
                style={{
                  width: "120px",
                  height: "45px",
                  background: "#fafafa",
                  borderRadius: "15px",
                  color: "#000",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                //   onClick={() => this.handleRead()}
              >
                {this.state.readToggel == "A1" ? (
                  <p>{this.state.rangeA1}</p>
                ) : this.state.readToggel == "A2" ? (
                  <p>{this.state.rangeA2}</p>
                ) : this.state.readToggel == "B1" ? (
                  <p>{this.state.temp}</p>
                ) : this.state.readToggel == "B2" ? (
                  <p>{this.state.gas}</p>
                ) : this.state.readToggel == "C1" ? (
                  <p>{this.state.one}</p>
                ) : this.state.readToggel == "C2" ? (
                  <p>{this.state.two}</p>
                ) : this.state.readToggel == "TOUCH PAD 0" ? (
                  <p>{this.state.rangeA1}</p>
                ) : this.state.readToggel == "TOUCH PAD 1" ? (
                  <p>{this.state.temp}</p>
                ) : this.state.readToggel == "TOUCH PAD 2" ? (
                  <p>{this.state.one}</p>
                ) : this.state.readToggel == "MICROPHONE" ? (
                  <p>{this.state.mic}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  →  BLUE" ? (
                  <p>{this.state.blue}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  →  GREEN" ? (
                  <p>{this.state.green}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  →  RED" ? (
                  <p>{this.state.red}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  →  LIGHT" ? (
                  <p>{this.state.light}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  →  GESTURE" ? (
                  <p>{this.state.gesture}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  →  DIST" ? (
                  <p>{this.state.distance}</p>
                ) : null}
              </div>
            ) : (
              <div
                style={{
                  width: "120px",
                  height: "45px",
                  background: "#25245E",
                  borderRadius: "15px",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                //   onClick={() => this.handleRead()}
              >
                Read
              </div>
            )}
          </div>

          {/* <Conditions
                      responceTp0={this.state.responceTp0}
                      responceTp1={this.state.responceTp1}
                      responceTp2={this.state.responceTp2}
                      touch_pad={this.state.touch_pad}
                      touch_pad2={this.state.touch_pad2}
                      rangeA1={this.state.rangeA1}
                      rangeA2={this.state.rangeA2}
                      tactswitch={this.state.tactswitch}
                      mic={this.state.mic}
                      temp={this.state.temp}
                      gas={this.state.gas}
                      one={this.state.one}
                      two={this.state.two}
                    /> */}
        </div>
      </div>
    );
  }
}

export default Condition;
