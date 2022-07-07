import React, { Component } from "react";
import { connect } from "react-redux";
import { webSerialAction } from "../../../../../../redux/actions";
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

var reader;

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
      Bytes: false,
      responceTp0: "",
      responceTp1: "",
      responceTp2: "",
      touch_pad: "",
      touch_pad2: "",
      rangeA1: "",
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
      readToggel: false,
      value: parseInt(sessionStorage.getItem(`ifValue${this.props.check}`)),
      value1: parseInt(sessionStorage.getItem(`ifValue2${this.props.check}`)),
      max: 1,
      selected: sessionStorage.getItem(`ifSelect${this.props.check}`) || "null",
      selectedTwo: selectedTwo[this.props.check],
    };

    window.addEventListener("load", async (e) => {
      console.log("HEY_CALIIN", this.props.state);

      try {
        const portList = await navigator.serial.getPorts();

        if (portList.length === 1) {
          console.log(portList, "Hardware connected");

          await props.webSerialAction({ port: portList[0] }); // dispatching function of redux

          this.setState.p1({
            selected: true,
            port: portList[0],
          });
        } else {
          console.log("No hardware");

          this.setState.p1(this.state.p1);
        }
      } catch (err) {
        console.log(err.message);
      }
    });
  }

  OpenReadComPort = async () => {
    const port = this.props.webSerial;
    console.log("PORTLIST", port);
    try {
      await port.open({ baudRate: 120000 });
    } catch (e) {
      // console.log(e);
    }
    await this.writePort("notWrite");
    // await this.readdata();

    // console.log("READABLE", port.readable.locked);
  };

  async readdata() {
    const port = this.props.webSerial;
    // eslint-disable-next-line no-undef
    const textDecoder = new TextDecoderStream();
    try {
      // eslint-disable-next-line no-undef
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    } catch {}

    // const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    reader = textDecoder.readable.getReader();
    var i = 1;
    var combiBytes = [];
    while (true) {
      const { value, done } = await reader.read();
      // console.log("VALUES", value, value.length);

      try {
        combiBytes = [...combiBytes, ...value];
      } catch (e) {}

      if (combiBytes.includes(`\n`)) {
        this.state.Bytes = combiBytes.join("");
        console.log(combiBytes.join(""), "comb");
        combiBytes = [];
      }
      // i++;
      // console.log("lxlxl", value);
      console.log("lxlxl", combiBytes);
      if (this.state.k == true) {
        console.log("MAI CHAL GAYA");
        reader.releaseLock();
        break;
      }

      if (done) {
        // Allow the serial port to be closed later.
        reader.releaseLock();
        break;
      }
      // value is a string.
      console.log(value);
    }
  }
  async writePort(data) {
    try {
      const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];
      const ports = await navigator.serial.getPorts({ filters });
      console.log("portsss", ports);

      console.log("portsss", ports[0].writable);
      // const outputStream = ports[0].writable,
      const writer = ports[0].writable.getWriter();
      // writer = outputStream.getWriter();
      const sata = data;
      const data1 = new Uint8Array(sata); // hello// 82, 76, 0, 0, 0, 82, 0, 0, 0, 66, 0, 0, 1, 0, 1,
      console.log("send data:+", data1);

      await writer.write(data1);

      writer.releaseLock();
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidUpdate() {
    let no_port = this.props.webSerial;
    // console.log("potf", no_port.readable.locked);

    if (typeof no_port !== undefined) {
      console.log("WORKING>>>>>>>>");
      this.OpenReadComPort();
    } else {
      // this.OpenReadComPort();
      console.log(JSON.parse(sessionStorage.getItem("webSerialPortList")));
      console.log("SERIAL PORT NOT CONNECTED");
    }

    console.log("BYTES KI VALUE:--", this.state.Bytes);
    if (this.state.Bytes != undefined) {
      var BAR = this.state.Bytes.toString();
    } else {
      var BAR = "176 1 0 0 210 1 0 0 189 1 0 0 0 0 0 0 0 0 0";
    }
    // let BAR = "153 1 142 2 237 2 122 1 233 1 0 0 100 100 124 20 10 0 0";
    console.log(BAR, "VAlies");
    if (this.state.isRead) {
      var valresponceTp0 = this.state.responceTp0;
      var valresponceTp1 = this.state.responceTp1;
      var valresponceTp2 = this.state.responceTp2;
      var valtouch_pad = this.state.touch_pad;
      var valtouch_pad2 = this.state.touch_pad2,
        valrangeA1 = this.state.rangeA1,
        valrangeA2 = this.state.rangeA2,
        valtactswitch = this.state.tactswitch,
        valtemp = this.state.temp,
        valgas = this.state.gas,
        valone = this.state.one,
        valtwo = this.state.two,
        valmic = this.state.mic,
        valtemprature = this.state.temprature,
        valred = this.state.red,
        valgreen = this.state.green,
        valblue = this.state.blue,
        vallight = this.state.light,
        valges = this.state.gesture,
        valdis = this.state.distance;
    } else {
      var valresponceTp0 = "";
      var valresponceTp1 = "";
      var valresponceTp2 = "";
      var valtouch_pad = "";
      var valtouch_pad2 = "",
        valrangeA1 = "",
        valrangeA2 = "",
        valtactswitch = "",
        valtemp = "",
        valgas = "",
        valone = "",
        valtwo = "",
        valmic = "",
        valtemprature = "",
        valred = "",
        valgreen = "",
        valblue = "",
        vallight = "",
        valges = "",
        valdis = "";
    }

    if (this.state.isRead) {
      // var socket = socketIOClient.connect("http://localhost:3008");
      let bytesData = Array(9).fill("O".charCodeAt());

      bytesData.unshift("A".charCodeAt());
      bytesData.unshift("P".charCodeAt());

      let A1 = JSON.parse(sessionStorage.getItem("A1"));
      let A2 = JSON.parse(sessionStorage.getItem("A2"));

      let A1DIGI = JSON.parse(sessionStorage.getItem("A1DIGI"));
      let A2DIGI = JSON.parse(sessionStorage.getItem("A2DIGI"));

      let AUltra = JSON.parse(sessionStorage.getItem("AUltra"));

      let B1 = JSON.parse(sessionStorage.getItem("B1"));
      let B2 = JSON.parse(sessionStorage.getItem("B2"));

      let B1DIGI = JSON.parse(sessionStorage.getItem("B1DIGI"));
      let B2DIGI = JSON.parse(sessionStorage.getItem("B2DIGI"));

      let BRGB = JSON.parse(sessionStorage.getItem("BRGB"));
      let BMP3 = JSON.parse(sessionStorage.getItem("BMP3"));

      let C1 = JSON.parse(sessionStorage.getItem("C1"));
      let C2 = JSON.parse(sessionStorage.getItem("C2"));

      let C1DIGI = JSON.parse(sessionStorage.getItem("C1DIGI"));
      let C2DIGI = JSON.parse(sessionStorage.getItem("C2DIGI"));

      let CUltra = JSON.parse(sessionStorage.getItem("CUltra"));

      if (JSON.parse(sessionStorage.getItem("A"))) {
        console.log("A1:", A1);
        console.log("A2:", A2);
        console.log("A1DIGI:", A1DIGI);
        console.log("A2DIGI:", A2DIGI);
        if (A1 == true && A2 == true) {
          bytesData[2] = "I".charCodeAt();
          bytesData[3] = "I".charCodeAt();
        }

        if (A1DIGI == true && A2DIGI == true) {
          bytesData[2] = "A".charCodeAt();
          bytesData[3] = "A".charCodeAt();
        }
      }
      if (A1 == true) {
        bytesData[2] = "I".charCodeAt();
        // bytesData[3] = "I".charCodeAt();
      }
      if (A1 == true && A1DIGI == true) {
        bytesData[2] = "A".charCodeAt();
      }

      if (A2 == true) {
        bytesData[3] = "I".charCodeAt();
        // bytesData[3] = "I".charCodeAt();
      }
      if (A2 == true && A2DIGI == true) {
        bytesData[3] = "A".charCodeAt();
      }
      if (A1 == true && AUltra == true) {
        bytesData[2] = "U".charCodeAt();
        bytesData[3] = "O".charCodeAt();
      }
      if (JSON.parse(sessionStorage.getItem("B"))) {
        if (B1 == true && B2 == true && BMP3 != true && BRGB != true) {
          bytesData[4] = "I".charCodeAt();
          bytesData[5] = "I".charCodeAt();
        }

        if (B1DIGI == true && B2DIGI == true && BMP3 != true && BRGB != true) {
          bytesData[4] = "A".charCodeAt();
          bytesData[5] = "A".charCodeAt();
        }
      }

      if (B1 == true) {
        bytesData[4] = "I".charCodeAt();
        // bytesData[3] = "I".charCodeAt();
      }
      if (B1 == true && B1DIGI == true) {
        bytesData[4] = "A".charCodeAt();
      }

      if (B2 == true) {
        bytesData[5] = "I".charCodeAt();
        // bytesData[3] = "I".charCodeAt();
      }
      if (B2 == true && B2DIGI == true) {
        bytesData[5] = "A".charCodeAt();
      }
      if (JSON.parse(sessionStorage.getItem("C"))) {
        if (C1 == true && C2 == true) {
          bytesData[6] = "I".charCodeAt();
          bytesData[7] = "I".charCodeAt();
        }

        if (C1DIGI == true && C2DIGI == true) {
          bytesData[6] = "A".charCodeAt();
          bytesData[7] = "A".charCodeAt();
        }
      }

      if (C1 == true) {
        bytesData[6] = "I".charCodeAt();
        // bytesData[3] = "I".charCodeAt();
      }
      if (C1 == true && C1DIGI == true) {
        bytesData[6] = "A".charCodeAt();
      }

      if (C2 == true) {
        bytesData[7] = "I".charCodeAt();
        // bytesData[3] = "I".charCodeAt();
      }
      if (C2 == true && C2DIGI == true) {
        bytesData[7] = "A".charCodeAt();
      }
      if (C1 == true && CUltra == true) {
        bytesData[6] = "U".charCodeAt();
        bytesData[7] = "O".charCodeAt();
      }
      if (JSON.parse(sessionStorage.getItem("isMic"))) {
        bytesData[9] = "M".charCodeAt();
      }
      if (JSON.parse(sessionStorage.getItem("isTemperature"))) {
        bytesData[10] = "T".charCodeAt();
      }
      if (JSON.parse(sessionStorage.getItem("isTouchZero"))) {
        bytesData[2] = "T".charCodeAt();
        // bytesData[3] = "T".charCodeAt();
      }
      if (JSON.parse(sessionStorage.getItem("isTouchOne"))) {
        bytesData[4] = "T".charCodeAt();
        // bytesData[5] = "T".charCodeAt();
      }
      if (JSON.parse(sessionStorage.getItem("isTouchTwo"))) {
        bytesData[6] = "T".charCodeAt();
        // bytesData[7] = "T".charCodeAt();
      }

      // if (sessionData.internalaccessories.isTouchZero) {
      //   bytesData[8] = "T".charCodeAt();
      // }
      // if (sessionData.internalaccessories.isTouchOne) {
      //   bytesData[9] = "T".charCodeAt();
      // }
      // if (sessionData.internalaccessories.isTouchTwo) {
      //   bytesData[10] = "T".charCodeAt();
      // }
      if (JSON.parse(sessionStorage.getItem("isDistanceSensors"))) {
        bytesData[8] = "D".charCodeAt();
      }
      if (JSON.parse(sessionStorage.getItem("isGestureSensor"))) {
        bytesData[8] = "G".charCodeAt();
      }
      if (JSON.parse(sessionStorage.getItem("isColorSensor"))) {
        bytesData[8] = "C".charCodeAt();
      }
      if (JSON.parse(sessionStorage.getItem("isLightSensor"))) {
        // bytesData[8] = "L".charCodeAt();
        bytesData[8] = "L".charCodeAt();
      }

      console.log(bytesData);
      this.writePort(bytesData);
      var v = BAR.split(" ");

      if (v[0] == "") {
        v.shift();
      }

      if (v.length == "16") {
        function insert(v, ...items) {
          v.unshift(...items);
        }

        insert(v, "0", "0", "0");
        console.log(v);
      }
      // if (v[6] == "installed") {
      //   v = v.filter((vw, idx) => idx >= 6);
      //   // console.log("VARR", vw);
      //   // v.shift();
      //   // v.shift();
      //   // v.shift();
      //   // v.shift();
      //   // v[4] = 0;
      //   // v[5] = 0;
      //   // v[6] = 0;

      //   function insert(v, ...items) {
      //     v.unshift(...items);
      //   }

      //   insert(v, 1, 2, 3);
      //   console.log(v);
      //   console.log("VARR", v);
      // }

      // if (v[13] > 255 || v[17] === 0) {
      //   v[14] = v[13].slice(-2, 4);
      //   v[13] = v[13].slice(0, 2);

      // v[18] = "0";
      // }
      console.log(v, "JJ");

      if (v.length == "19" && v[0] != "") {
        if (v[0] != null || v[2] != null) {
          if (v[0] != null) {
            var byte_val1 = v[0] & 0xff;
            var byte_val2 = v[1] & 0xff;
            console.log(byte_val1, byte_val2, "A1");
            var valOfSensor = (byte_val2 << 8) + byte_val1;
            console.log("LSB+MSB:-", valOfSensor);
            if (valOfSensor <= 1024) {
              valrangeA1 = valOfSensor;
            }
          }
          if (v[2] != null) {
            var byte_val1 = v[2] & 0xff;
            var byte_val2 = v[3] & 0xff;
            var valOfSensor = (byte_val2 << 8) + byte_val1;
            console.log("LSB+MSB:-", valOfSensor);
            valrangeA2 = valOfSensor;
          }
        }
        if (v[4] != null || v[6] != null) {
          if (v[4] != null) {
            var byte_val1 = v[4] & 0xff;
            var byte_val2 = v[5] & 0xff;
            var valOfSensor = (byte_val2 << 8) + byte_val1;
            console.log("LSB+MSB:-", valOfSensor);
            valtemp = valOfSensor;
          }
          if (v[6] != null) {
            var byte_val1 = v[6] & 0xff;
            var byte_val2 = v[7] & 0xff;
            var valOfSensor = (byte_val2 << 8) + byte_val1;
            console.log("LSB+MSB:-", valOfSensor);
            valgas = valOfSensor;
          }
        }
        if (v[8] != null || v[10] != null) {
          if (v[8] != null) {
            var byte_val1 = v[8] & 0xff;
            var byte_val2 = v[9] & 0xff;
            var valOfSensor = (byte_val2 << 8) + byte_val1;
            console.log("LSB+MSB:-", valOfSensor);
            valone = valOfSensor;
          }
          if (v[10] != null) {
            var byte_val1 = v[10] & 0xff;
            var byte_val2 = v[11] & 0xff;
            var valOfSensor = (byte_val2 << 8) + byte_val1;
            console.log("LSB+MSB:-", valOfSensor);
            valtwo = valOfSensor;
          } else {
            valtwo = 0;
          }
        }

        if (JSON.parse(sessionStorage.getItem("isLightSensor"))) {
          if (v[12] <= "255") {
            var data = v[12];

            vallight = data;
            console.log(" 23 DISTANCE SENSOR:--", valdis);
          }
        }
        if (JSON.parse(sessionStorage.getItem("isDistanceSensors"))) {
          if (v[13] <= "255") {
            var data = v[13];

            valdis = data;
            console.log(" 23 DISTANCE SENSOR:--", valdis);
          }
        }
        if (JSON.parse(sessionStorage.getItem("isGestureSensor"))) {
          if (v[14] <= "255") {
            var data = v[14];

            valges = data;
            console.log(" 23 DISTANCE SENSOR:--", valdis);
          }
        }
        if (JSON.parse(sessionStorage.getItem("isMic"))) {
          if (v[15] != "0" || v[16] != "0") {
            var byte_val1 = v[15] & 0xff;
            var byte_val2 = v[16] & 0xff;
            var valOfSensor = (byte_val2 << 8) + byte_val1;
            console.log("LSB+MSB:-", valOfSensor);
            valmic = valOfSensor;
          }
        }
        if (JSON.parse(sessionStorage.getItem("isColorSensor"))) {
          if (v[12] <= "255") {
            var data = v[12];

            valred = data;
            console.log(" 23 DISTANCE SENSOR:--", valdis);
          }
          if (v[13] < 256) {
            var data = v[13];

            valgreen = data;
            console.log(" 23 DISTANCE SENSOR:--", valdis);
          }
          if (v[14] < 256) {
            var data = v[14];

            valblue = data;
            console.log(" 23 DISTANCE SENSOR:--", valdis);
          }
        }
        if (JSON.parse(sessionStorage.getItem("isTemperature"))) {
          if (v[17] != 0) {
            var byte_val1 = v[17] & 0xff;
            var byte_val2 = v[18] & 0xff;
            var valOfSensor = (byte_val2 << 8) + byte_val1;
            console.log("LSB+MSB TEMP:-", valOfSensor);
            valtemprature = valOfSensor;
          } else {
            var byte_val2 = v[18];

            console.log("LSB+MSB TEMP:-", valOfSensor);
            valtemprature = byte_val2;
          }
        }
        // if (JSON.parse(sessionStorage.getItem("isTouchZero"))) {
        //   var byte_val1 = v[0] & 0xff;
        //   var byte_val2 = v[1] & 0xff;
        //   var valOfSensor = (byte_val2 << 8) + byte_val1;
        //   console.log("LSB+MSB:-", valOfSensor);
        //   valrangeA1 = valOfSensor;
        // }
        // if (JSON.parse(sessionStorage.getItem("isTouchOne"))) {
        //   var byte_val1 = v[4] & 0xff;
        //   var byte_val2 = v[5] & 0xff;
        //   var valOfSensor = (byte_val2 << 8) + byte_val1;
        //   console.log("LSB+MSB:-", valOfSensor);
        //   valtemp = valOfSensor;
        // }
        // if (JSON.parse(sessionStorage.getItem("isTouchTwo"))) {
        //   var byte_val1 = v[8] & 0xff;
        //   var byte_val2 = v[9] & 0xff;
        //   var valOfSensor = (byte_val2 << 8) + byte_val1;
        //   console.log("LSB+MSB:-", valOfSensor);
        //   valone = valOfSensor;
        // }
      }

      setTimeout(() => {
        console.log("valrespnse 22222222", valresponceTp0);

        this.setState({
          responceTp0: valresponceTp0,
          responceTp1: valresponceTp1,
          responceTp2: valresponceTp2,
          touch_pad: valtouch_pad,
          touch_pad2: valtouch_pad2,
          rangeA1: valrangeA1,
          rangeA2: valrangeA2,
          tactswitch: valtactswitch,
          temp: valtemp,
          gas: valgas,
          one: valone,
          two: valtwo,
          mic: valmic,
          red: valred,
          green: valgreen,
          blue: valblue,
          light: vallight,
          gesture: valges,
          distance: valdis,
          temprature: valtemprature,
        });
      }, 300);
    }
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
    let no_port = this.props.webSerial;
    console.log(no_port.readable);
    if (no_port.name != "Not Connected") {
      if (no_port.readable != null) {
        if (no_port.readable.locked != false) {
          reader.cancel();
        }
      }
    }

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

  onChangeRead = (key, value) => {
    console.log("value=====>", value);
    this.setState({ readToggel: value.trim() });

    // state[key] = value;
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
  handleRead = (e) => {
    this.setState({ isRead: !this.state.isRead });
    if (this.state.isRead) {
      console.log("READER CANCELED");
      reader.cancel();
    } else {
      this.readdata();
    }
  };

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

    let sessionFlowLogic = JSON.parse(sessionStorage.getItem("flow-logic"));
    console.log("KML@@@+++", this.state.readToggel);

    if (this.state.readToggel == false || this.state.readToggel == "null") {
      if (this.state.readToggel == "null" && this.state.isRead == true) {
        this.state.isRead = false;
        reader.cancel();
      }
      setTimeout(() => {
        try {
          document.getElementById("ID").style.pointerEvents = "none";
        } catch (e) {}
      }, 100);

      console.log("FALLLLSSSE");
    } else {
      console.log("TRUUUUUUUUUUUUUUUUUUUEEEEE");
      // setTimeout(() => {
      try {
        document.getElementById("ID").style.pointerEvents = "auto";
      } catch (e) {}
      // }, 100);
    }

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
          <p style={{ position: "absolute", marginTop: "3%", left: "18%" }}>
            {min}
          </p>

          <p style={{ position: "absolute", marginTop: "3%", right: "8%" }}>
            {this.state.max}
          </p>
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
            <p style={{ position: "absolute", marginTop: "3%", left: "18%" }}>
              {min}
            </p>

            <p style={{ position: "absolute", marginTop: "3%", right: "8%" }}>
              {this.state.max}
            </p>
          </div>
        ) : (
          <></>
        )}

        <div className="select-sensor-Read margin-section">
          <span>
            Read the
            <Select
              onChange={(value) => this.onChangeRead("sourceTwo", value)}
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
                onClick={() => this.handleRead()}
              >
                {this.state.readToggel == "port A1" ||
                this.state.readToggel == "ultra A" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.rangeA1}</p>
                ) : this.state.readToggel == "port A2" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.rangeA2}</p>
                ) : this.state.readToggel == "port B1" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.temp}</p>
                ) : this.state.readToggel == "port B2" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.gas}</p>
                ) : this.state.readToggel == "port C1" ||
                  this.state.readToggel == "ultra C" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.one}</p>
                ) : this.state.readToggel == "port C2" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.two}</p>
                ) : this.state.readToggel == "touchZero" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.rangeA1}</p>
                ) : this.state.readToggel == "touchOne" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.temp}</p>
                ) : this.state.readToggel == "touchTwo" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.one}</p>
                ) : this.state.readToggel == "microphone" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.mic}</p>
                ) : this.state.readToggel == "temperature" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.temprature}</p>
                ) : this.state.readToggel == "colorSensorBlue" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.blue}</p>
                ) : this.state.readToggel == "colorSensorGreen" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.green}</p>
                ) : this.state.readToggel == "colorSensorRed" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.red}</p>
                ) : this.state.readToggel == "lightSensor" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.light}</p>
                ) : this.state.readToggel == "gestureSensor" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.gesture}</p>
                ) : this.state.readToggel == "distanceSensor" ? (
                  <p style={{ marginTop: "18%" }}>{this.state.distance}</p>
                ) : null}
              </div>
            ) : (
              <div
                id="ID"
                style={{
                  width: "120px",
                  height: "45px",
                  background: "#30A8CE",
                  borderRadius: "15px",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => this.handleRead()}
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

// export default Condition;
const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    webSerialAction: (data) => {
      console.log("mapDispatchToProps", data);
      dispatch(webSerialAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Condition);
