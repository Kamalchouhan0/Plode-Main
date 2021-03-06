import React, { Component } from "react";
import HexTypes from "../HexTypes";
import Select from "./helpers/Select";
import Slider from "./helpers/Slider";
// import componentProps from '../../../componentProps'
import IOComponents from "../IOComponents";
import logicVariables from "../logicVariables";
import socketIOClient from "socket.io-client";
import PortValuesRangeMapping from "../PortValuesRangeMapping";
import unicodeToChar from "../../../utils/unicodeToChar";
import { connect } from "react-redux";
import { webSerialAction } from "../../../redux/actions/index";
import PortConnections from "../../Assembly/PortConnections";
import { Link } from "react-router-dom";
import {
  componentDidMount,
  componentWillUnmount,
} from "react-addons-pure-render-mixin";

import {
  greaterthanInActive,
  greaterthanActive,
  lessthanActive,
  lessthanInActive,
  inbetweenActive,
  inbetweenInActive,
  equaltoActive,
  equaltoInActive,
  notequaltoActive,
  notequaltoInActive,
} from "../../../source/index";

import { rangeStoreVal } from "../../Assembly/CheckboxData";
import Conditions from "./condition";
import renderPrgImage from "../../../source/programImg";

// var componentType = localStorage.getItem("biboxTypes");
// setInterval(() => {
//     componentType = localStorage.getItem("biboxTypes");
// } 100);
const hours = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
  21: 21,
  22: 22,
  23: 23,
};
const minutes = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
  21: 21,
  22: 22,
  23: 23,
  24: 24,
  25: 25,
  26: 26,
  27: 27,
  28: 28,
  29: 29,
  30: 30,
  31: 31,
  32: 32,
  33: 33,
  34: 34,
  35: 35,
  36: 36,
  37: 37,
  38: 38,
  39: 39,
  40: 40,
  41: 41,
  42: 42,
  43: 43,
  44: 44,
  45: 45,
  46: 46,
  47: 47,
  48: 48,
  49: 49,
  50: 50,
  51: 51,
  52: 52,
  53: 53,
  54: 54,
  55: 55,
  56: 56,
  57: 57,
  58: 58,
  59: 59,
};

var reader;

class IfPanel extends Component {
  constructor(props) {
    super(props);
    const { state, onChange } = this.props;
    if (Object.keys(state).length <= 0) {
      state["source"] = "battery";
      state["value"] = 0;
      state["value2"] = 0;
      state["hour"] = 0;
      state["hour2"] = 0;
      state["minute"] = 0;
      state["minute2"] = 0;
    }
    onChange(state, "sensor");

    this.state = {
      state,
      k: false,
      isGraterThan: false,
      isLessThan: false,
      isNotequalTo: false,
      isEqualTo: false,
      isInBtween: false,
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
      temprature: "",
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

  hexTypeCheck = () => {
    this.props.hexTypeCheck("sensor");
  };
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
    // try {
    //   const reader = port.readable.getReader();
    //   var i = 1;
    //   var combiBytes = [];
    //   // Listen to data coming from the serial device.
    //   while (true) {
    //     const { value, done } = await reader.read();
    //     combiBytes = [...combiBytes, ...value];
    //     i++;
    //     if (this.state.k === true) {
    //       console.log("MAI CHAL GAYA");
    //       reader.releaseLock();
    //       break;
    //     }
    //     if (i == 2) {
    //       console.log("PABYTES", unicodeToChar(combiBytes));
    //       reader.releaseLock();
    //       this.state.Bytes = unicodeToChar(combiBytes);
    //       break;
    //     }
    //     // value is a string.
    //     if (value.length == 32) {
    //       var v = unicodeToChar(value);
    //       console.log(v);
    //     }
    //     if (value.length == 7) {
    //       var vi = unicodeToChar(value);
    //       console.log(vi);
    //     }
    //     if (value.length == 9) {
    //       var vi = unicodeToChar(value);
    //       console.log(vi);
    //     }
    //     if (value.length == 14) {
    //       var vi = unicodeToChar(value);
    //       console.log(vi);
    //     }
    //     if (value.length == 17) {
    //       var vi = unicodeToChar(value);
    //       console.log(vi);
    //     }
    //     if (value.length == 12) {
    //       var vi = unicodeToChar(value);
    //       console.log(vi);
    //     }
    //     if ((value.lenght == 32 && value.lenght == 12) || value.lenght == 11) {
    //       var vae = v + " " + vi;
    //       console.log(vae, "ORRRR");
    //     }
    //     var vae = v + vi;

    //     console.log("ADDED I", vae);
    //     // this.state.Bytes = vae;
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
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
      // console.log(e);
    }
  }

  async componentDidUpdate() {
    let no_port = this.props.webserialPort;

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

      let sessionData = JSON.parse(sessionStorage.getItem("concept"));
      console.log(sessionData);
      console.log(sessionData.internalaccessories, "Internal data");

      let portdata = JSON.parse(sessionStorage.getItem("assembly"));
      console.log(
        portdata.PortConnections,
        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DATA>>>>>>>>>>>>>>>>>"
      );
      console.log(portdata.PortConnections, ">>???>>>>????<<<<");
      // console.log("TYPE:-", portdata.PortConnections);
      // Obect.keys and Object.values n

      Object.keys(portdata.PortConnections).map((port) => {
        if (portdata.PortConnections[port] != null) {
          // console.log(portdata.PortConnections[port], "kmkmkmkmkmkmkmkmkmkmkm");
          switch (port) {
            case "A1": {
              let signalType = portdata.PortConnections[port].signalType;

              let Type = portdata.PortConnections[port].type;

              if (Type == "ultrasonic_sensor") {
                bytesData[2] = "U".charCodeAt();
                // bytesData[3] = "I".charCodeAt();
              } else if (
                Type == "tact_switch" ||
                Type == "dual_switch" ||
                Type == "touch_sensor" ||
                Type == "dip_switch"
              ) {
                bytesData[2] = "I".charCodeAt();
                bytesData[3] = "I".charCodeAt();
              } else if (
                Type == "distance_sensor" ||
                Type == "temperature_sensor" ||
                Type == "gas" ||
                Type == "light_sensor" ||
                Type == "linear_pot" ||
                Type == "pot" ||
                Type == "rain_sensor" ||
                Type == "humidity"
              ) {
                bytesData[2] = "A".charCodeAt();
                // bytesData[3] = "A".charCodeAt();
                console.log("LIGHT 0000000000");
              } else if (
                Type == "rotatory" ||
                Type == "joystick" ||
                Type == "metal_detector" ||
                Type == "extender"
              ) {
                bytesData[2] = "A".charCodeAt();
                bytesData[3] = "A".charCodeAt();
              }

              console.log(signalType, "signlay type");
              console.log("TYPE:-", Type);
              break;
            }

            case "B1": {
              let signalType = portdata.PortConnections[port].signalType;

              let Type = portdata.PortConnections[port].type;

              if (
                Type == "rotatory" ||
                Type == "joystick" ||
                Type == "extender" ||
                Type == "metal_detector"
              ) {
                bytesData[4] = "A".charCodeAt();
                bytesData[5] = "A".charCodeAt();
              } else if (
                Type == "distance_sensor" ||
                Type == "temperature_sensor" ||
                Type == "gas" ||
                Type == "light_sensor" ||
                Type == "linear_pot" ||
                Type == "pot" ||
                Type == "rain_sensor" ||
                Type == "humidity"
              ) {
                bytesData[4] = "A".charCodeAt();
                // bytesData[3] = "A".charCodeAt();
                console.log("LIGHT 0000000000");
              } else if (
                Type == "tact_switch" ||
                Type == "touch_sensor" ||
                Type == "dual_switch" ||
                Type == "dip_switch"
              ) {
                bytesData[4] = "I".charCodeAt();
                bytesData[5] = "I".charCodeAt();
              }

              console.log(signalType, "signlay type");
              break;
            }

            case "C1": {
              let signalType = portdata.PortConnections[port].signalType;

              let Type = portdata.PortConnections[port].type;

              if (Type == "ultrasonic_sensor") {
                bytesData[6] = "U".charCodeAt();
                // bytesData[7] = "A".charCodeAt();
              } else if (
                Type == "tact_switch" ||
                Type == "touch_sensor" ||
                Type == "dual_switch" ||
                Type == "dip_switch"
              ) {
                bytesData[6] = "I".charCodeAt();
                bytesData[7] = "I".charCodeAt();
              } else if (
                Type == "distance_sensor" ||
                Type == "temperature_sensor" ||
                Type == "gas" ||
                Type == "light_sensor" ||
                Type == "linear_pot" ||
                Type == "pot" ||
                Type == "rain_sensor" ||
                Type == "humidity"
              ) {
                bytesData[6] = "A".charCodeAt();
                // bytesData[3] = "A".charCodeAt();
                console.log("LIGHT 0000000000");
              } else if (
                Type == "rotatory" ||
                Type == "joystick" ||
                Type == "metal_detector" ||
                Type == "extender"
              ) {
                bytesData[6] = "A".charCodeAt();
                bytesData[7] = "A".charCodeAt();
              }
              console.log(signalType, "signlay type");
              break;
            }
          }
        }
      });

      if (sessionData.internalaccessories.isMic) {
        bytesData[9] = "M".charCodeAt();
      }
      if (sessionData.internalaccessories.isTemperature) {
        bytesData[10] = "T".charCodeAt();
      }
      if (sessionData.internalaccessories.isTouchZero) {
        bytesData[2] = "T".charCodeAt();
        // bytesData[3] = "T".charCodeAt();
      }
      if (sessionData.internalaccessories.isTouchOne) {
        bytesData[4] = "T".charCodeAt();
        // bytesData[5] = "T".charCodeAt();
      }
      if (sessionData.internalaccessories.isTouchTwo) {
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
      if (
        sessionData.internalaccessories.Four_in_one_sensor.isDistanceSensors
      ) {
        bytesData[8] = "D".charCodeAt();
      }
      if (sessionData.internalaccessories.Four_in_one_sensor.isGestureSensor) {
        bytesData[8] = "G".charCodeAt();
      }
      if (sessionData.internalaccessories.Four_in_one_sensor.isColorSensor) {
        bytesData[8] = "C".charCodeAt();
      }
      if (sessionData.internalaccessories.Four_in_one_sensor.isLightSensor) {
        // bytesData[8] = "L".charCodeAt();
        bytesData[8] = "L".charCodeAt();
      }

      console.log(bytesData);
      this.writePort(bytesData);
      var v = BAR.split(" ");
      if (v[0] == "") {
        v.shift();
      }
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

        if (sessionData.internalaccessories.Four_in_one_sensor.isLightSensor) {
          if (v[12] <= "255") {
            var data = v[12];

            vallight = data;
            console.log(" 23 DISTANCE SENSOR:--", valdis);
          }
        }
        if (
          sessionData.internalaccessories.Four_in_one_sensor.isDistanceSensors
        ) {
          if (v[13] <= "255") {
            var data = v[13];

            valdis = data;
            console.log(" 23 DISTANCE SENSOR:--", valdis);
          }
        }
        if (
          sessionData.internalaccessories.Four_in_one_sensor.isGestureSensor
        ) {
          if (v[14] <= "255") {
            var data = v[14];

            valges = data;
            console.log(" 23 DISTANCE SENSOR:--", valdis);
          }
        }
        if (sessionData.internalaccessories.isMic) {
          if (v[15] != "0" || v[16] != "0") {
            var byte_val1 = v[15] & 0xff;
            var byte_val2 = v[16] & 0xff;
            var valOfSensor = (byte_val2 << 8) + byte_val1;
            console.log("LSB+MSB:-", valOfSensor);
            valmic = valOfSensor;
          }
        }
        if (sessionData.internalaccessories.Four_in_one_sensor.isColorSensor) {
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
        if (sessionData.internalaccessories.isTemperature) {
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
        if (sessionData.internalaccessories.isTouchZero) {
          var byte_val1 = v[0] & 0xff;
          var byte_val2 = v[1] & 0xff;
          var valOfSensor = (byte_val2 << 8) + byte_val1;
          console.log("LSB+MSB:-", valOfSensor);
          valrangeA1 = valOfSensor;
        }
        if (sessionData.internalaccessories.isTouchOne) {
          var byte_val1 = v[4] & 0xff;
          var byte_val2 = v[5] & 0xff;
          var valOfSensor = (byte_val2 << 8) + byte_val1;
          console.log("LSB+MSB:-", valOfSensor);
          valtemp = valOfSensor;
        }
        if (sessionData.internalaccessories.isTouchTwo) {
          var byte_val1 = v[8] & 0xff;
          var byte_val2 = v[9] & 0xff;
          var valOfSensor = (byte_val2 << 8) + byte_val1;
          console.log("LSB+MSB:-", valOfSensor);
          valone = valOfSensor;
        }
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
          activePort: "A1",
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

  componentDidMount() {
    // console.log("CALLING componentDidMount :");
  }

  // call just after components updates
  // STORING RANGE/SEEK bar value with this method
  static getDerivedStateFromProps(props, state) {
    console.log("propsIF", props);

    let mainProps = props.state;

    let data = props.state.source;

    if (typeof data != "undefined") {
      // OLD UI DATA for 4-in-1-sensor
      if (data.split(" ")[0] == "4-IN-1") {
        let myObj = rangeStoreVal["FOUR_in_ONE_Sensor"][`${data}`];
        myObj.condition = mainProps.condition;
        myObj.value = mainProps.value;
      }

      // NEW UI DATA BELOW
      if (data.split(" ")[0] == "MICROPHONE") {
        let myObj = rangeStoreVal["MICROPHONE"];
        myObj.condition = mainProps.condition;
        myObj.value = mainProps.value;
      }
      if (data.split(" ")[0] == "TEMPERATURE") {
        let myObj = rangeStoreVal["TEMPERATURE"];
        myObj.condition = mainProps.condition;
        myObj.value = mainProps.value;
      }
      if (data.split(" ")[0] == "TOUCH ZERO") {
        let myObj = rangeStoreVal["TOUCH ZERO"];
        myObj.condition = mainProps.condition;
        myObj.value = mainProps.value;
      }
      if (data.split(" ")[0] == "TOUCH ONE") {
        let myObj = rangeStoreVal["TOUCH ONE"];
        myObj.condition = mainProps.condition;
        myObj.value = mainProps.value;
      }
      if (data.split(" ")[0] == "TOUCH TWO") {
        let myObj = rangeStoreVal["TOUCH TWO"];
        myObj.condition = mainProps.condition;
        myObj.value = mainProps.value;
      }
      if (data.split(" ")[0] == "4-IN-1 SENSOR  ???  DIST") {
        let myObj = rangeStoreVal["4-IN-1 SENSOR  ???  DIST"];
        myObj.condition = mainProps.condition;
        myObj.value = mainProps.value;
      }
      if (data.split(" ")[0] == "4-IN-1 SENSOR  ???  GESTURE") {
        let myObj = rangeStoreVal["4-IN-1 SENSOR  ???  GESTURE"];
        myObj.condition = mainProps.condition;
        myObj.value = mainProps.value;
      }

      if (data.split(" ")[0] == "4-IN-1 SENSOR  ???  LIGHT") {
        let myObj = rangeStoreVal["4-IN-1 SENSOR  ???  LIGHT"];
        myObj.condition = mainProps.condition;
        myObj.value = mainProps.value;
      }
      if (data.split(" ")[0] == "4-IN-1 SENSOR  ???  RED") {
        let myObj = rangeStoreVal["4-IN-1 SENSOR  ???  RED"];
        myObj.condition = mainProps.condition;
        myObj.value = mainProps.value;
      }
      if (data.split(" ")[0] == "4-IN-1 SENSOR  ???  BLUE") {
        let myObj = rangeStoreVal["4-IN-1 SENSOR  ???  BLUE"];
        myObj.condition = mainProps.condition;
        myObj.value = mainProps.value;
      }
      if (data.split(" ")[0] == "4-IN-1 SENSOR  ???  GREEN") {
        let myObj = rangeStoreVal["4-IN-1 SENSOR  ???  GREEN"];
        myObj.condition = mainProps.condition;
        myObj.value = mainProps.value;
      }
    }
  }

  onChange = (key, value) => {
    // alert(value, "---- ", value);
    const { state, onChange } = this.props;
    state[key] = value;

    if (key == "source") {
      state["condition"] = "gt";
    }
    onChange(state, "sensor");
  };

  onChangeRead = (key, value) => {
    console.log("value=====>", value);
    this.setState({ readToggel: value.trim() });

    // state[key] = value;
  };

  handleOperators = (name) => {
    switch (name) {
      case "greaterThan": {
        if (this.state.isGraterThan) {
          this.setState(
            {
              isGraterThan: false,
            },
            () => {
              this.onChange("condition", "gt");
            }
          );
        } else {
          this.setState(
            {
              isGraterThan: true,
              isLessThan: false,
              isEqualTo: false,
              isNotequalTo: false,
              isInBtween: false,
            },
            () => {
              this.onChange("condition", "gt");
            }
          );
        }
        break;
      }
      case "lessThan": {
        if (this.state.isLessThan) {
          // this.onChange("condition", "lt");

          this.setState(
            {
              isLessThan: false,
            },
            () => {
              this.onChange("condition", "lt");
            }
          );
        } else {
          this.setState(
            {
              isGraterThan: false,
              isLessThan: true,
              isEqualTo: false,
              isNotequalTo: false,
              isInBtween: false,
            },
            () => {
              this.onChange("condition", "lt");
            }
          );
        }
        break;
      }
      case "equalTo": {
        if (this.state.isEqualTo) {
          // this.onChange("condition", "eq");

          this.setState(
            {
              isEqualTo: false,
            },
            () => {
              this.onChange("condition", "eq");
            }
          );
        } else {
          this.setState(
            {
              isGraterThan: false,
              isLessThan: false,
              isEqualTo: true,
              isNotequalTo: false,
              isInBtween: false,
            },
            () => {
              this.onChange("condition", "eq");
            }
          );
        }
        break;
      }
      case "notEqualTo": {
        if (this.state.isNotequalTo) {
          // this.onChange("condition", "ne");

          this.setState(
            {
              isNotequalTo: false,
            },
            () => {
              this.onChange("condition", "ne");
            }
          );
        } else {
          this.setState(
            {
              isGraterThan: false,
              isLessThan: false,
              isEqualTo: false,
              isNotequalTo: true,
              isInBtween: false,
            },
            () => {
              this.onChange("condition", "ne");
            }
          );
        }
        break;
      }
      case "inBetween": {
        if (this.state.isInBtween) {
          // this.onChange("condition", "bw");

          this.setState(
            {
              isInBtween: false,
            },
            () => {
              this.onChange("condition", "bw");
            }
          );
        } else {
          this.setState(
            {
              isGraterThan: false,
              isLessThan: false,
              isEqualTo: false,
              isNotequalTo: false,
              isInBtween: true,
            },
            () => {
              this.onChange("condition", "bw");
            }
          );
        }
        break;
      }
    }
  };

  handleRead = (e) => {
    this.setState({ isRead: !this.state.isRead });
    console.log("READ FRAUD", this.state.isRead);

    if (this.state.isRead) {
      console.log("READER CANCELED");
      reader.cancel();
    } else {
      this.readdata();
    }
  };

  render() {
    console.log("IF CONDITION PROPS", this.state);
    const { state, startState, PortConnections, componentProps } = this.props;
    var portsConnectedArray = [];
    for (var eachConnection in PortConnections) {
      portsConnectedArray.push(eachConnection);
    }

    for (var n = 0; n < portsConnectedArray.length; n++) {
      if (
        portsConnectedArray[n].length == 1 &&
        PortConnections[portsConnectedArray[n]]
      ) {
        if (PortConnections[portsConnectedArray[n]].type != "dual_splitter") {
          if (
            PortConnections[portsConnectedArray[n]].type ==
              "ultrasonic_sensor" ||
            PortConnections[portsConnectedArray[n]].type == "rotatory"
          ) {
            PortConnections[portsConnectedArray[n] + "1"] =
              PortConnections[portsConnectedArray[n]];
          }
          PortConnections[portsConnectedArray[n]] = null;
        }
      }
    }

    var sourceOptionsOrder = [],
      sourceOptions = {};
    sourceOptionsOrder.push("battery");
    sourceOptions.battery = "Select Items";
    // if (this.props.state.source != "battery") {
    //   sourceOptionsOrder.pop("battery");
    // }
    Object.keys(PortConnections).forEach((port) => {
      if (port != "undefined" && PortConnections[port]) {
        if (!PortConnections[port]) return;
        var type = PortConnections[port].type;

        // if (type == "4_in_1_sensor") {
        //   console.log("4_in_1_sensor");

        //   var positionPorts = [
        //     "4-IN-1 SENSOR  \u2192  RED",
        //     "4-IN-1 SENSOR  \u2192  GREEN",
        //     "4-IN-1 SENSOR  \u2192  BLUE",
        //     "4-IN-1 SENSOR  \u2192  DIST",
        //     "4-IN-1 SENSOR  \u2192  LIGHT",
        //     "4-IN-1 SENSOR  \u2192  MOTION",
        //   ];
        //   for (var i = 0; i < positionPorts.length; i++) {
        //     sourceOptionsOrder.push(positionPorts[i]);

        //     console.log(sourceOptionsOrder, "sourceOptionsOrder");
        //     console.log(sourceOptions, "sourceOptions");

        //     // sourceOptions[positionPorts[i]] =
        //     //   componentProps[type].name + " \u2192 " + positionPorts[i];
        //   }
        // } else if (type == "microphone") {
        //   console.log("microphone");

        //   var positionPorts = ["MICROPHONE"];
        //   for (var i = 0; i < positionPorts.length; i++) {
        //     sourceOptionsOrder.push(positionPorts[i]);

        //     console.log(sourceOptionsOrder, "sourceOptionsOrder");
        //     console.log(sourceOptions, "sourceOptions");

        //     // sourceOptions[positionPorts[i]] =
        //     //   componentProps[type].name + " \u2192 " + positionPorts[i];
        //   }
        // }

        if (IOComponents[type].input) {
          console.log("111", port);
          console.log("111", componentProps[type].name);

          if (type == "temp_dew") {
            sourceOptionsOrder.push(port);
            if (port == "A1" || port == "B1" || port == "C1") {
              sourceOptions[port] = "TEMP" + " \u2192 " + port;
            } else if (port == "A2" || port == "B2" || port == "C2") {
              sourceOptions[port] = "DEW" + " \u2192 " + port;
            } else {
              sourceOptionsOrder.push(port);
              sourceOptions[port] =
                componentProps[type].name + " \u2192 " + port;
            }
          } else if (type == "temp_gas") {
            sourceOptionsOrder.push(port);
            if (port == "A1" || port == "B1" || port == "C1") {
              sourceOptions[port] = "TEMP" + " \u2192 " + port;
            } else if (port == "A2" || port == "B2" || port == "C2") {
              sourceOptions[port] = "GAS" + " \u2192 " + port;
            }
          } else {
            sourceOptionsOrder.push(port);
            sourceOptions[port] = componentProps[type].name + " \u2192 " + port;
          }
        }
      }
    });

    let sessiondataassemblyCheckbox = JSON.parse(
      sessionStorage.getItem("assemblyCheckbox")
    );
    let sessiondataLogic = JSON.parse(sessionStorage.getItem("logic"));

    if (sessiondataLogic.bottomPanel == "border" && this.state.isRead == true) {
      console.log("read", this.state.isRead);
      this.setState({ isRead: !this.state.isRead });
      reader.cancel();
    }
    // NEW UI DATA
    let internalaccessoriesData = JSON.parse(
      sessionStorage.getItem("concept")
    ).internalaccessories;

    //NEW UI 4-in-1-sensor
    let internalaccessoriesData_Four_in_One_sensor = JSON.parse(
      sessionStorage.getItem("concept")
    ).internalaccessories.Four_in_one_sensor;

    // OLD UI DATA 4in1sensore
    if (sessiondataassemblyCheckbox != null) {
      Object.keys(sessiondataassemblyCheckbox).map((val, index) => {
        if (val == "FOUR_in_ONE_Sensor") {
          let isChecked = sessiondataassemblyCheckbox[val];

          if (isChecked == true) {
            var positionPorts = [
              "4-IN-1 SENSOR  \u2192  RED",
              "4-IN-1 SENSOR  \u2192  GREEN",
              "4-IN-1 SENSOR  \u2192  BLUE",
              "4-IN-1 SENSOR  \u2192  DIST",
              "4-IN-1 SENSOR  \u2192  LIGHT",
              "4-IN-1 SENSOR  \u2192  MOTION",
            ];
            for (var i = 0; i < positionPorts.length; i++) {
              sourceOptionsOrder.push(positionPorts[i]);

              // sourceOptions[positionPorts[i]] =
              //   componentProps[type].name + " \u2192 " + positionPorts[i];
            }
          }
        }
      });
    }

    // NEW UI MENU DISPLAY
    Object.keys(internalaccessoriesData).map((val, index) => {
      if (val == "isTouchZero") {
        if (internalaccessoriesData[val]) {
          var positionPorts = ["TouchZero"];
          for (var i = 0; i < positionPorts.length; i++) {
            console.log(positionPorts, "positionPorts");
            console.log("i", i);
            sourceOptionsOrder.push(positionPorts[i]);
          }
        }
      }
      if (val == "isTouchOne") {
        if (internalaccessoriesData[val]) {
          var positionPorts = ["TouchOne"];
          for (var i = 0; i < positionPorts.length; i++) {
            sourceOptionsOrder.push(positionPorts[i]);
          }
        }
      }
      if (val == "isTouchTwo") {
        if (internalaccessoriesData[val]) {
          var positionPorts = ["TouchTwo"];
          for (var i = 0; i < positionPorts.length; i++) {
            sourceOptionsOrder.push(positionPorts[i]);
          }
        }
      }
      if (val == "isMic") {
        if (internalaccessoriesData[val]) {
          var positionPorts = ["MICROPHONE"];
          for (var i = 0; i < positionPorts.length; i++) {
            sourceOptionsOrder.push(positionPorts[i]);
          }
        }
      }

      if (val == "isTemperature") {
        if (internalaccessoriesData[val]) {
          var positionPorts = ["TEMPERATURE"];
          for (var i = 0; i < positionPorts.length; i++) {
            sourceOptionsOrder.push(positionPorts[i]);
          }
        }
      }
    });

    Object.keys(internalaccessoriesData_Four_in_One_sensor).map(
      (val, index) => {
        if (val == "isDistanceSensors") {
          if (internalaccessoriesData_Four_in_One_sensor[val]) {
            var positionPorts = ["4-IN-1 SENSOR  \u2192  DIST"];
            for (var i = 0; i < positionPorts.length; i++) {
              sourceOptionsOrder.push(positionPorts[i]);
            }
          }
        }
        if (val == "isGestureSensor") {
          if (internalaccessoriesData_Four_in_One_sensor[val]) {
            var positionPorts = ["4-IN-1 SENSOR  \u2192  GESTURE"];
            for (var i = 0; i < positionPorts.length; i++) {
              sourceOptionsOrder.push(positionPorts[i]);
            }
          }
        }
        if (val == "isLightSensor") {
          if (internalaccessoriesData_Four_in_One_sensor[val]) {
            var positionPorts = ["4-IN-1 SENSOR  \u2192  LIGHT"];
            for (var i = 0; i < positionPorts.length; i++) {
              sourceOptionsOrder.push(positionPorts[i]);
            }
          }
        }

        if (val == "isColorSensor") {
          if (internalaccessoriesData_Four_in_One_sensor[val]) {
            var positionPorts = [
              "4-IN-1 SENSOR  \u2192  RED",
              "4-IN-1 SENSOR  \u2192  BLUE",
              "4-IN-1 SENSOR  \u2192  GREEN",
            ];
            for (var i = 0; i < positionPorts.length; i++) {
              sourceOptionsOrder.push(positionPorts[i]);
            }
          }
        }
      }
    );

    //sourceOptionsOrder.push('irr');
    //sourceOptions.irr = 'IR Remote \u2192 IR';
    Object.keys(startState).forEach((name) => {
      if (name == "usbrx") {
        if (startState[name]) {
          var positionPorts = ["USB RX"];
          for (var i = 0; i < positionPorts.length; i++) {
            sourceOptionsOrder.push(positionPorts[i]);
          }
        }
      }
      if (name == "btRx") {
        if (startState[name]) {
          var positionPorts = ["BT RX1"];
          for (var i = 0; i < positionPorts.length; i++) {
            sourceOptionsOrder.push(positionPorts[i]);
          }
        }
        if (startState[name]) {
          var positionPorts = ["BT RX2"];
          for (var i = 0; i < positionPorts.length; i++) {
            sourceOptionsOrder.push(positionPorts[i]);
          }
        }
        if (startState[name]) {
          var positionPorts = ["BT RX3"];
          for (var i = 0; i < positionPorts.length; i++) {
            sourceOptionsOrder.push(positionPorts[i]);
          }
        }
        if (startState[name]) {
          var positionPorts = ["BT RX4"];
          for (var i = 0; i < positionPorts.length; i++) {
            sourceOptionsOrder.push(positionPorts[i]);
          }
        }
        if (startState[name]) {
          var positionPorts = ["BT RX5"];
          for (var i = 0; i < positionPorts.length; i++) {
            sourceOptionsOrder.push(positionPorts[i]);
          }
        }
      }
    });

    if (this.props.startState && this.props.startState.slider) {
      sourceOptions.slider = "BT Slider";
    }

    if (this.props.startState && this.props.startState.bts) {
      sourceOptionsOrder.push("remote");
      sourceOptions.remote = "BT Speech";
    }
    if (this.props.startState && this.props.startState.btr) {
      sourceOptionsOrder.push("remote");
      sourceOptions.remote = "BT Remote";
    }

    // sourceOptionsOrder.push("battery");
    // sourceOptions.battery = "Select Items";
    // if (this.props.state.source != "battery") {
    //   sourceOptionsOrder.pop("battery");
    // }

    // sourceOptionsOrder.push('timeElapsed');
    // sourceOptions.timeElapsed = 'Time elapsed(sec)';
    // sourceOptionsOrder.push('time');
    // sourceOptions.time = 'Time';

    if (this.props.startState && this.props.startState.iot) {
      for (var i = 1; i <= 10; i++) {
        // sourceOptionsOrder.push('IOT' + i);
        sourceOptions["IOT" + i] = "IOT" + i;
      }
    }
    var conditions,
      max,
      min = 0,
      source = state.source || "battery";

    conditions = {
      lt: "Less than",
      gt: "Greater than",
      eq: "Equal to",
      ne: "Not equal to",
    };

    if (source != "timeElapsed") {
      conditions["bw"] = "In between";
      //conditions['nbw']='Not in between';
    }
    // if (sourceOptionsOrder.indexOf(source) < 0) source = "slider";
    if (
      source === "irr" ||
      source.startsWith("bic") ||
      source.startsWith("bid") ||
      source.startsWith("IOT")
    )
      max = 65535;
    else if (source === "slider" || source === "remote" || source === "time")
      max = 255;
    else if (source === "timeElapsed") max = 2147483;
    else if (source === "battery") max = 0;
    else if (source.startsWith("bif")) max = 1;
    else {
      var componentType = localStorage.getItem("biboxTypes");

      // console.log(componentType, "khushboo LOCAL STORAGE");

      var Originalport;
      var compName;

      //change it to R again
      if (
        source == "R" ||
        source == "G" ||
        source == "B" ||
        source == "D" ||
        source == "M" ||
        source == "L"
      ) {
        Originalport = "G1";
      } else Originalport = source;

      var range;
      if (Originalport != undefined) {
        // OLD UI DATA 4-in1-Sensor
        if (
          // Originalport == "4-IN-1 SENSOR  ???  RED" ||
          // Originalport == "4-IN-1 SENSOR  ???  GREEN" ||
          // Originalport == "4-IN-1 SENSOR  ???  BLUE" ||
          Originalport == "4-IN-1 SENSOR  ???  MOTION"
        ) {
          let data = "FOUR_in_ONE_Sensor";

          const str = Originalport;
          const words = str.split(" ");
          const ports = words[words.length - 1];

          let activePort = `FOUR_in_ONE_Sensor_${ports}`;

          range = PortValuesRangeMapping[data][activePort]();

          // let obj = (range = PortValuesRangeMapping[FOUR_in_ONE_Sensor][
          //   Originalport
          // ]());
          // console.log(range);
          // let comp = PortConnections[Originalport].type;
        }
        // NEW UI 4-in-1Sensor data
        else if (Originalport == "MICROPHONE") {
          range = PortValuesRangeMapping[Originalport]();
        } else if (Originalport == "TEMPERATURE") {
          range = PortValuesRangeMapping[Originalport]();
        } else if (Originalport == "TouchZero") {
          range = PortValuesRangeMapping["TOUCHZERO"]();
        } else if (Originalport == "TouchOne") {
          range = PortValuesRangeMapping["TOUCHONE"]();
        } else if (Originalport == "TouchTwo") {
          range = PortValuesRangeMapping["TOUCHTWO"]();
        } else if (Originalport == "4-IN-1 SENSOR  ???  DIST") {
          range = PortValuesRangeMapping["FOUR_in_ONE_Sensor_DIST_"]();
        } else if (Originalport == "4-IN-1 SENSOR  ???  GESTURE") {
          range = PortValuesRangeMapping["FOUR_in_ONE_Sensor_GESTURE_"]();
        } else if (Originalport == "4-IN-1 SENSOR  ???  LIGHT") {
          range = PortValuesRangeMapping["FOUR_in_ONE_Sensor_LIGHT_"]();
        } else if (Originalport == "4-IN-1 SENSOR  ???  RED") {
          range = PortValuesRangeMapping["FOUR_in_ONE_Sensor_RED_"]();
        } else if (Originalport == "4-IN-1 SENSOR  ???  BLUE") {
          range = PortValuesRangeMapping["FOUR_in_ONE_Sensor_BLUE_"]();
        } else if (Originalport == "4-IN-1 SENSOR  ???  GREEN") {
          range = PortValuesRangeMapping["FOUR_in_ONE_Sensor_GREEN_"]();
        } else if (Originalport == "USB RX") {
          range = PortValuesRangeMapping["USBRX"]();
        } else if (Originalport == "BT RX1") {
          range = PortValuesRangeMapping["BTRX1"]();
        } else if (Originalport == "BT RX2") {
          range = PortValuesRangeMapping["BTRX2"]();
        } else if (Originalport == "BT RX3") {
          range = PortValuesRangeMapping["BTRX3"]();
        } else if (Originalport == "BT RX4") {
          range = PortValuesRangeMapping["BTRX4"]();
        } else if (Originalport == "BT RX5") {
          range = PortValuesRangeMapping["BTRX5"]();
        } else {
          var comp = PortConnections[Originalport].type;

          var compName = comp.toLowerCase();

          range = PortValuesRangeMapping[Originalport][compName](Originalport);
        }
      } else {
        var comp = PortConnections[source].type;
        var compName = comp.toLowerCase();
        var range = PortValuesRangeMapping[source][compName](source);
      }
      min = range.min;
      max = range.max;

      // commented for tern+
      // if (source == "D" || source == "M" || source == "L") {
      //   min = 0;
      //   max = 4;
      // }

      // if (source == "B2" || source == "B3" || source == "B4") {
      //     if (PortConnections[source]) {
      //         if (PortConnections[source].type == "tact_switch" || PortConnections[source].type == "tact_switch" || PortConnections[source].type == "tact_switch") {
      //             min = 0;
      //             max = 1;
      //         }
      //     }

      // }
    }

    if (state.value > max) state.value = max;

    var ifOutputRow1 = (
        <div
          style={{
            height: "75px",
            width: "95%",
            position: "relative",
          }}
        >
          <Slider
            value={state.value || 0}
            onChange={(value) => this.onChange("value", value)}
            max={max}
            min={min}
            renderIn="conditionPropertyPanel"
          />

          <p style={{ position: "absolute", top: "80%", left: "18%" }}>{min}</p>

          <p style={{ position: "absolute", top: "80%", right: "8%" }}>{max}</p>
        </div>
      ),
      ifOutputRow2 = "",
      display = "inline-block";
    var defaultCssStyle = {
      height: "50px",
      width: "90%",
      marginLeft: "20%",
    };
    if (state.condition == "bw" || state.condition == "nbw") {
      ifOutputRow2 = (
        <>
          <h5
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "16px",
            }}
          >
            and
          </h5>
          <div style={{ height: "5px", width: "90%" }}>
            <Slider
              value={state.value2 || 0}
              onChange={(value) => this.onChange("value2", value)}
              max={max}
              min={min}
              renderIn="conditionPropertyPanel"
            />
          </div>
        </>
      );
    } else {
      ifOutputRow2 = "";
    }
    if (source == "time") {
      if (state.condition == "bw" || state.condition == "nbw") {
        ifOutputRow2 = "";
      } else {
        display = "none";
        defaultCssStyle = {
          height: "50px",
          width: "90%",
          marginLeft: "40%",
        };
      }
      ifOutputRow1 = (
        <div style={defaultCssStyle}>
          <span
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            {"Hours"}
          </span>
          <Select
            onChange={(value) => this.onChange("hour", value)}
            color={HexTypes["if"].color}
            options={hours}
            selected={state.hour}
          />
          <span
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            {"Min"}
          </span>
          <Select
            onChange={(value) => this.onChange("minute", value)}
            color={HexTypes["if"].color}
            options={minutes}
            selected={state.minute}
          />

          <span
            style={{
              marginLeft: "20%",
              color: "white",
              fontWeight: "bold",
              display: display,
            }}
          >
            {"Hours"}
          </span>
          <Select
            style={{ display: display }}
            onChange={(value) => this.onChange("hour2", value)}
            color={HexTypes["if"].color}
            options={hours}
            selected={state.hour2}
          />
          <span
            style={{
              color: "white",
              fontWeight: "bold",
              display: display,
            }}
          >
            {"Min"}
          </span>
          <Select
            style={{ display: display }}
            onChange={(value) => this.onChange("minute2", value)}
            color={HexTypes["if"].color}
            options={minutes}
            selected={state.minute2}
          />
        </div>
      );
    }

    var defaultsourceOptions = ({} = sourceOptions);
    // console.log("KML@@@+++", this.state.readToggel);

    if (this.state.readToggel == false || this.state.readToggel == "battery") {
      if (this.state.readToggel == "battery" && this.state.isRead == true) {
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
      setTimeout(() => {
        try {
          document.getElementById("ID").style.pointerEvents = "auto";
        } catch (e) {}
      }, 100);
    }

    return (
      <div className="outertabDiv-Condation">
        <div className="select-sensor margin-section">
          <span className="sensor-txt">
            If the value of
            <Select
              onChange={(value) => {
                this.onChange("source", value);
                // console.log(value, "gsk+++@@@@@");
              }}
              color={HexTypes["if"].color}
              options={sourceOptions}
              order={sourceOptionsOrder}
              selected={source}
            />
            is
          </span>
        </div>

        <div className="select-Condition margin-section">
          {state.condition == "gt" ? (
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

          {state.condition == "lt" ? (
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

          {state.condition == "bw" ? (
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

          {state.condition == "eq" ? (
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

          {state.condition == "ne" ? (
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
          {ifOutputRow1}
          {ifOutputRow2}
        </div>

        <div className="select-sensor-Read margin-section">
          <span>
            Read the
            <Select
              onChange={(value) => this.onChangeRead("source", value)}
              // color={HexTypes["if"].color}
              options={sourceOptions}
              order={sourceOptionsOrder}
              // selected={source}
              typeDropDown="read"
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
                  marginTop: "21%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => this.handleRead()}
              >
                {this.state.readToggel == "A1" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.rangeA1}</p>
                ) : this.state.readToggel == "A2" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.rangeA2}</p>
                ) : this.state.readToggel == "B1" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.temp}</p>
                ) : this.state.readToggel == "B2" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.gas}</p>
                ) : this.state.readToggel == "C1" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.one}</p>
                ) : this.state.readToggel == "C2" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.two}</p>
                ) : this.state.readToggel == "TouchZero" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.rangeA1}</p>
                ) : this.state.readToggel == "TouchOne" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.temp}</p>
                ) : this.state.readToggel == "TouchTwo" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.one}</p>
                ) : this.state.readToggel == "MICROPHONE" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.mic}</p>
                ) : this.state.readToggel == "TEMPERATURE" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.temprature}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  ???  BLUE" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.blue}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  ???  GREEN" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.green}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  ???  RED" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.red}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  ???  LIGHT" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.light}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  ???  GESTURE" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.gesture}</p>
                ) : this.state.readToggel == "4-IN-1 SENSOR  ???  DIST" ? (
                  <p style={{ marginTop: "20%" }}>{this.state.distance}</p>
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
                  marginTop: "21%",
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
const mapStateToProps = (state) => {
  console.log("ASSEMBLY LOG", state);
  return state;
  // return { state, webserialPort: state.webSerial };
};

const mapDispatchToProps = (dispatch) => {
  return {
    webSerialAction: (data) => {
      console.log("mapDispatchToProps", data);
      dispatch(webSerialAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IfPanel);

// <div className="outertabDiv">
// <div className="tabDiv">
//   <Link
//     className="tabActive"
//     onClick={() => this.props.hexChange("sensor")}
//   >
//     <div>Sensor</div>
//   </Link>
//   <Link
//     className="tabButton"
//     onClick={() => this.props.hexChange("variable")}
//   >
//     <div> Variable </div>
//   </Link>

//   {/* <Link onClick={() => this.change("start")}><div >Variable</div></Link> */}
// </div>
// <table width="100%" height="100%">
//   <tbody id="main">
//     <tr style={{ height: "72px", width: "68%" }}>
//       <td width="10%">
//         {/* DETAILS  */}
//         <Select
//           onChange={(value) => this.onChange("source", value)}
//           color={HexTypes["if"].color}
//           options={sourceOptions}
//           order={sourceOptionsOrder}
//           selected={source}
//         />
//       </td>
//       <td width="10%">
//         {/* OPERATOR */}
//         <Select
//           onChange={(value) => this.onChange("condition", value)}
//           color={HexTypes["if"].color}
//           options={conditions}
//           selected={state.condition || "gt"}
//         />
//       </td>
//       <td>
//         {ifOutputRow1}
//         {ifOutputRow2}
//       </td>
//     </tr>
//   </tbody>
// </table>
// {/* <button onClick={this.hexTypeCheck}>OK</button> */}
// </div>
