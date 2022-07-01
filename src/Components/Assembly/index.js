import { createBrowserHistory } from "history";
import html2canvas from "html2canvas";
import $ from "jquery";
import React, { Component } from "react";
import Sidebar from "./sidebar";
import { withRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend-old";
import Modal from "react-modal";
import { DragDropContext } from "react-dnd-old";
import WorkSpace from "./workspace";
import { connect } from "react-redux";
import "../../css/assembly.css";
import "../../css/pure-grids.min.css";
import Sizes from "../../helpers/Sizes";
import { webSerialAction } from "../../redux/actions/index";
import renderPrgImage from "../../source/programImg";
import unicodeToChar from "../../utils/unicodeToChar";
import AssemblyPrgm from "../ReusableComponents/PrgmSlider/AssemblyPrgm/AssemblyPrgm";
import { activeCheckBox } from "./CheckboxData";
import CustomDragLayer from "./CustomDragLayer";
import * as atatus from "atatus-spa";
var zooming;
var oldDeltaX, oldDeltaY, panning;
const history = createBrowserHistory();

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    height: " 40%",
    width: " 50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    zIndex: 1000000,
    transform: "translate(-50%, -50%)",
    // border: "2px solid red",
  },
};
var nextVisbilityButton;
var reader;

class Assembly extends Component {
  constructor(props) {
    super(props);
    // var props1 = props;
    var selectionType = localStorage.getItem("programMode");
    if (selectionType === "learn") {
      nextVisbilityButton = "hidden";
    } else {
      nextVisbilityButton = "visible";
    }

    Modal.setAppElement("body");
    this.state = {
      height: 0,
      width: 0,
      readbytes: false,
      modalIsOpen: false,
      props1: props,
      detected: false,
      usbOpen: false,
      isusb: false,
      isHelp: false,
      visible: nextVisbilityButton,
      isClickFourInOneSensor: false,
      isClickTempratureSensor: false,
      p1: {
        selected: false,
        port: {},
      },
      refresh: false,
      reConnecting: false,
      flag: false,
      k: false,
      keepReading: true,
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
    };

    window.addEventListener("load", async (e) => {
      console.log("HEY_CALIIN", this.props.state);
      navigator.serial.addEventListener("connect", (e) => {
        var user = 1;
        sessionStorage.setItem("user", JSON.stringify(user));
        this.handleUsb();
        window.location.reload(false);
      });
      navigator.serial.addEventListener("disconnect", async (e) => {
        var user = 0;
        sessionStorage.setItem("user", JSON.stringify(user));
        this.handleUsb();
        const p_Port = this.props.webSerial;
        try {
          await p_Port.close();
        } catch (e) {}
      });

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

      const height = document.body.clientHeight;

      const width = document.body.clientWidth;
      Sizes._update(width, height);
      this.setState({
        height: height,
        width: width,
      });
    });

    Sizes._update(document.body.clientWidth, document.body.clientHeight);
  }

  OpenReadComPort = async () => {
    const port = this.props.webSerial;
    console.log("PORTLIST", port);

    try {
      await port.open({ baudRate: 120000 });
    } catch (e) {
      console.log(e);
    }

    await this.writePort("notWrite");

    // await this.readLoop();
  };
  async readLoop() {
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
    // Listen to data coming from the serial device.
    while (true) {
      const { value, done } = await reader.read();
      // console.log("VALUES", value, value.length);

      try {
        combiBytes = [...combiBytes, ...value];
      } catch (e) {}

      if (combiBytes.includes(`\n`)) {
        this.state.flag = combiBytes.join("");
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
      // this.state.flag = value;
      // if (i == 2) {
      //   console.log("PABYTES", combiBytes);
      //   this.state.flag = combiBytes;
      //   combiBytes = "";
      // }
      //   reader.releaseLock();}
      // if (value != undefined) {
      //   if (value.length == 32) {
      //     var v = value;
      //     console.log(v);
      //   }

      //   if (value.length == 7) {
      //     var vi = value;
      //     console.log(vi);
      //   }
      //   if (value.length == 9) {
      //     var vi = value;
      //     console.log(vi);
      //   }
      //   if (value.length == 14) {
      //     var vi = value;
      //     console.log(vi);
      //   }
      //   if (value.length == 17) {
      //     var vi = value;
      //     console.log(vi);
      //   }
      //   if (value.length == 12) {
      //     var vi = value;
      //     console.log(vi);
      //   }

      //   if ((value.length == 32 && value.length == 12) || value.length == 11) {
      //     var vae = v + " " + vi;
      //     console.log(vae, "ORRRR");
      //   }
      //   var vae = v + vi;
      //   console.log("ADDED", vae);

      //   this.state.flag = vae;
      // }

      // this.state.flag = combiBytes;
      //   break;
      // }
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
    // console.log("lxlxl", combiBytes);
    // console.log("lxlxl", combiBytes.toString());
    // if (this.state.k === true) {
    //   console.log("MAI CHAL GAYA");
    //   reader.releaseLock();
    //   break;
    // }
    // if (i == 2) {
    //   console.log("PABYTES", unicodeToChar(combiBytes));
    //   reader.releaseLock();
    //   this.state.flag = unicodeToChar(combiBytes);
    //   break;
    // }
    //     // console.log("PABYTES", unicodeToChar(value));
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
    //     console.log("ADDED", vae);
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

      const writer = ports[0].writable.getWriter();

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
    navigator.serial.addEventListener("connect", (e) => {
      console.log("CONNected");
      window.location.reload(false);
      var user = 1;
      sessionStorage.setItem("user", JSON.stringify(user));
      this.handleUsb();
    });

    navigator.serial.addEventListener("disconnect", async (e) => {
      console.log("DISconnected");
      var user = 0;
      sessionStorage.setItem("user", JSON.stringify(user));
      this.handleUsb();
    });

    console.log(this.props.webSerial, "MMMMLLLL");

    console.log(this.state.p1, "KKK");
    let no_port = this.props.webserialPort;
    if (typeof no_port !== undefined) {
      console.log("WORKING>>>>>>>>");
      this.OpenReadComPort();
    } else {
      console.log(JSON.parse(sessionStorage.getItem("webSerialPortList")));
      console.log("SERIAL PORT NOT CONNECTED");
    }
    console.log("FLAG", this.state.flag);
    if (this.state.flag != undefined) {
      var BAR = this.state.flag.toString();
    } else {
      var BAR = "176 1 0 0 210 1 0 0 189 1 0 0 0 0 0 0 0 0 0";
    }

    console.log(BAR, "VAlies");
    console.log("componentDidUpdate");
    if (this.state.readbytes) {
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
    if (this.state.readbytes) {
      let bytesData = Array(9).fill("O".charCodeAt());

      bytesData.unshift("A".charCodeAt());
      bytesData.unshift("P".charCodeAt());

      let sessionData = JSON.parse(sessionStorage.getItem("concept"));
      console.log(sessionData);
      console.log(sessionData.internalaccessories, "Internal data");

      let Tp0 = sessionData.internalaccessories.isTouchOne;
      console.log("TOUCH 0", Tp0);

      let portdata = JSON.parse(sessionStorage.getItem("assembly"));
      console.log(
        portdata.PortConnections,
        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DATA>>>>>>>>>>>>>>>>>"
      );
      console.log(portdata.PortConnections, ">>???>>>>????<<<<");

      Object.keys(portdata.PortConnections).map((port) => {
        if (portdata.PortConnections[port] != null) {
          switch (port) {
            case "A": {
              let signalType = portdata.PortConnections[port].signalType;

              let Type = portdata.PortConnections[port].type;

              if (Type == "ultrasonic_sensor") {
                bytesData[2] = "U".charCodeAt();
                // bytesData[3] = "I".charCodeAt();
              } else if (
                Type == "tact_switch" ||
                Type == "touch_sensor" ||
                Type == "dual_switch" ||
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

                console.log("LIGHT 0000000000");
              } else if (
                Type == "rotatory" ||
                Type == "joystick" ||
                Type == "metal_detector" ||
                Type == "extender"
              ) {
                bytesData[2] = "A".charCodeAt();
                bytesData[3] = "A".charCodeAt();
                console.log("TOUCH 0000000000");
              }

              console.log(signalType, "signlay type");
              console.log("TOUCH 0", Tp0);
              break;
            }

            case "B": {
              let signalType = portdata.PortConnections[port].signalType;
              let Type = portdata.PortConnections[port].type;

              if (
                Type == "rotatory" ||
                Type == "joystick" ||
                Type == "metal_detector" ||
                Type == "extender"
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

            case "C": {
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
      }
      if (sessionData.internalaccessories.isTouchOne) {
        bytesData[4] = "T".charCodeAt();
      }
      if (sessionData.internalaccessories.isTouchTwo) {
        bytesData[6] = "T".charCodeAt();
      }

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
        bytesData[8] = "L".charCodeAt();
      }

      console.log(bytesData);
      this.writePort(bytesData);

      var v = BAR.split(" ");

      // if (v[13] > 255 || v[17] === 0) {
      //   v[14] = v[13].slice(-2, 4);
      //   v[13] = v[13].slice(0, 2);

      //   v[18] = "0";
      // }
      if (v[0] == "") {
        v.shift();
      }
      console.log(v, "JJ");
      try {
        if (v.length == "19" && v[0] != "") {
          if (v[0] != null || v[2] != null) {
            if (v[0] != null) {
              var byte_val1 = v[0] & 0xff;
              var byte_val2 = v[1] & 0xff;
              console.log(byte_val1, byte_val2, "A1");
              var valOfSensor = (byte_val2 << 8) + byte_val1;
              console.log("A1 LSB+MSB:-", valOfSensor);
              if (valOfSensor <= 1024) {
                valrangeA1 = valOfSensor;
              }
            }
            if (v[2] != null) {
              var byte_val1 = v[2] & 0xff;
              var byte_val2 = v[3] & 0xff;
              var valOfSensor = (byte_val2 << 8) + byte_val1;
              console.log("A2 LSB+MSB:-", valOfSensor);
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

          if (
            sessionData.internalaccessories.Four_in_one_sensor.isLightSensor
          ) {
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
            if (v[14] != "0") {
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
              console.log("LSB+MSB MIC:-", valOfSensor);
              valmic = valOfSensor;
            }
          }
          if (
            sessionData.internalaccessories.Four_in_one_sensor.isColorSensor
          ) {
            if (v[12] != "0") {
              var data = v[12];

              valred = data;
              console.log(" 23 DISTANCE SENSOR:--", valdis);
            }
            if (v[13] != "0" && v[13] < 256) {
              var data = v[13];

              valgreen = data;
              console.log(" 23 DISTANCE SENSOR:--", valdis);
            }
            if (v[14] != "0" && v[14] < 256) {
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
            if (valOfSensor == null) valone = valOfSensor;
          }
        }
      } catch (e) {}

      setTimeout(() => {
        if (!this.state.readbytes) {
          valresponceTp0 = "";
          valresponceTp1 = "";
          valresponceTp2 = "";
          valtouch_pad = "";
          valtouch_pad2 = "";
          valtactswitch = "";
          valtemp = " ";
          valone = " ";
          valmic = "";
          valrangeA1 = "";
          valrangeA2 = "";
          valgas = "";
          valtwo = "";
          console.log("going---------------->");
        }
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
          temprature: valtemprature,
          red: valred,
          green: valgreen,
          blue: valblue,
          light: vallight,
          gesture: valges,
          distance: valdis,
        });
      }, 100);
    }
    // if (!this.state.readbytes) {
    //   valresponceTp0 = "";
    //   valresponceTp1 = "";
    //   valresponceTp2 = "";
    //   valtouch_pad = "";
    //   valtouch_pad2 = "";
    //   valtactswitch = "";
    //   valtemp = " ";
    //   valone = " ";
    //   valrangeA1 = " ";
    //   valrangeA2 = " ";
    //   valgas = "";
    //   valtwo = "";
    //   console.log("going---------------->");
    // }
    console.log("valrespnse", valresponceTp0);
  }

  handleUsb = (e) => {
    if (this.state.isusb) {
      this.setState({
        isusb: false,
      });
    } else {
      this.setState({
        isusb: true,
      });
    }
  };
  helpBtn = (e) => {
    this.setState({ isHelp: !this.state.isHelp });
  };

  async componentDidMount() {
    atatus.beginTransaction("Assembly Screen");
    let sessionDataCheckbox = JSON.parse(
      sessionStorage.getItem("assemblyCheckbox")
    );

    if (sessionStorage.getItem("Ace")) {
      Object.keys(sessionDataCheckbox).map((val, indx) => {
        document.getElementById(`${val}`).checked = sessionDataCheckbox[val];
      });
    }
    // sessionStorage.setItem("shield", "false");

    let data = JSON.parse(sessionStorage.getItem("user"));

    if (data === 1) {
      this.handleUsb();
    }
    if (data === 0) {
      this.handleUsb();
    }
    Sizes._update(document.body.clientWidth, document.body.clientHeight);
    window.addEventListener("resize", (e) => {
      const height = document.body.clientHeight;
      const width = document.body.clientWidth;
      Sizes._update(width, height);
      this.setState({
        height: height,
        width: width,
      });
    });

    Sizes._update(document.body.clientWidth, document.body.clientHeight);
    // Reset panning and pinching variables
    this.panEnd();
    this.pinchEnd();
    let hhh = JSON.parse(localStorage.getItem("SavedData"));
    let name = sessionStorage.getItem("name");
    console.log(name, "kkklmo");
    if (name != "null" && name != undefined && name != null) {
      for (let i = 0; i < hhh.length; i++) {
        if (name == hhh[i].name) {
          this.props.assemblyComponent(hhh[i].assembly.workspace);
          this.props.PortConnections(hhh[i].assembly.PortConnections);
        }
      }
    }
  }

  /**
   * Remove a component from workspace
   * @param  {WorkspaceComponent} item
   */
  ParseNodeList = (node, port, type) => {
    for (var nodeKey in node) {
      var obj = node[nodeKey].state;
      if (obj["source"] == port) {
        delete node[nodeKey].state["source"];
        delete node[nodeKey].state["value"];
        delete node[nodeKey].state["value2"];
        delete node[nodeKey].state["condition"];
        delete node[nodeKey].state["hour"];
        delete node[nodeKey].state["hour2"];
        delete node[nodeKey].state["minute"];
        delete node[nodeKey].state["minute2"];
      }
      if (
        node[nodeKey].type == "variable_output" ||
        node[nodeKey].type == "hardware"
      ) {
        //  for tern+
        try {
          var l = port.length;
        } catch (e) {}
        if (l == 1) {
          if (obj["assign" + port + "1"]) {
            delete node[nodeKey].state["assign" + port + "1"];
            delete node[nodeKey].state["assign" + port + "2"];
          }
          if (obj["value" + port + "1"]) {
            delete node[nodeKey].state["value" + port + "1"];
            delete node[nodeKey].state["value" + port + "2"];
          }
          if (type == "dot_matrix") {
            for (var key in obj) {
              if (key.startsWith("dot_matrix")) {
                delete node[nodeKey].state[key];
              }
            }
          }
          if (type == "7segment_display") {
            for (var key in obj) {
              if (key.includes("valueB") || key.includes("valueC")) {
                delete node[nodeKey].state[key];
              }
            }
          }
          if (type == "OLED") {
            for (var key in obj) {
              if (key.includes("OLED")) {
                delete node[nodeKey].state[key];
              }
            }
          }
          if (type == "RGB") {
            for (var key in obj) {
              if (key.includes("RGBComp")) {
                delete node[nodeKey].state[key];
              }
            }
          }
        } else {
          if (obj["assign" + port]) {
            delete node[nodeKey].state["assign" + port];
          }
          if (obj["value" + port]) {
            delete node[nodeKey].state["value" + port];
          }
          if (type == "dot_matrix") {
            for (var key in obj) {
              if (key.startsWith("dot_matrix")) {
                delete node[nodeKey].state[key];
              }
            }
          }
          if (type == "7segment_display") {
            for (var key in obj) {
              if (key.includes("valueB") || key.includes("valueC")) {
                delete node[nodeKey].state[key];
              }
            }
          }
          if (
            type == "dc_motor" ||
            type == "mini_geared_motor" ||
            type == "geared_motor"
          ) {
            try {
              delete node[nodeKey].state["assign" + port + "1"];
              delete node[nodeKey].state["assign" + port + "2"];
              delete node[nodeKey].state["value" + port + "1"];
              delete node[nodeKey].state["value" + port + "2"];
            } catch (e) {}
          }
        }
      }
      if (node[nodeKey].subprogram) {
        this.ParseNodeList(node[nodeKey].subprogram, port, type);
      }
    }
    return node;
  };
  removeFromWorkspace = (item) => {
    console.log("workspace remove", item);
    // sessionStorage.setItem("name", null);

    var prev_data = this.props;
    var port = item.port;
    var updated_prog = this.ParseNodeList(
      prev_data.logic.program,
      port,
      item.type
    );
    // console.log("prev", prev_data);
    // var updated_flow_prog1 = this.ParseNodeList(prev_data.logicNew.cardConnections, port, item.type);
    // var updated_flow_prog2 = this.ParseNodeList(prev_data.logicNew.cards, port, item.type);
    prev_data.logic.program = updated_prog;
    // prev_data.logicNew.cardConnections = updated_flow_prog1;
    // prev_data.logicNew.cards = updated_flow_prog2;
    if (sessionStorage.getItem("connectedDevice") == "Ace") {
      // when we connect driver motor components, then add led to any ports when we remove the led from workspace
      // then driver motor show only one connected port(B) not both(BD) prots so add this checking

      let sdad = JSON.parse(sessionStorage.getItem("assembly")).workspace
        .components;

      // if (
      //   JSON.parse(sessionStorage.getItem("assembly")).workspace.components[
      //     "pc_motor_driver"
      //   ] !== undefined
      // ) {
      //   if (
      //     JSON.parse(sessionStorage.getItem("assembly")).workspace.components[
      //       "pc_motor_driver"
      //     ][0].connectedTo
      //   ) {
      //     var dataConnectTo = JSON.parse(sessionStorage.getItem("assembly"))
      //       .workspace.components["pc_motor_driver"][0].connectedTo;
      //     if (dataConnectTo == "A" || dataConnectTo == "C") {
      //       prev_data.assembly.PortConnections["C"] = null;
      //       prev_data.assembly.PortConnections["A"] = null;
      //     }

      //     if (dataConnectTo == "B" || dataConnectTo == "D") {
      //       prev_data.assembly.PortConnections["B"] = null;
      //       prev_data.assembly.PortConnections["D"] = null;
      //     }
      //   }
      // }

      if (item.type == "pc_motor_driver") {
        if (item.connectedTo == "A" || item.connectedTo == "C") {
          prev_data.assembly.PortConnections["C"] = null;
          prev_data.assembly.PortConnections["A"] = null;
        }

        if (item.connectedTo == "B" || item.connectedTo == "D") {
          prev_data.assembly.PortConnections["B"] = null;
          prev_data.assembly.PortConnections["D"] = null;
        }
      } else if (item.type == "stepper_motor") {
        if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B !==
          null
        ) {
          if (
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.B
              .type == "pc_motor_driver"
          ) {
            if (item.connectedTo == "STPM") {
              prev_data.assembly.PortConnections["B1"] = null;
              prev_data.assembly.PortConnections["B2"] = null;

              prev_data.assembly.PortConnections["D1"] = null;
              prev_data.assembly.PortConnections["D2"] = null;
            }
          }
        } else if (
          JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A !==
          null
        ) {
          if (
            JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A
              .type == "pc_motor_driver"
          ) {
            if (item.connectedTo == "STPM") {
              prev_data.assembly.PortConnections["A1"] = null;
              prev_data.assembly.PortConnections["A2"] = null;

              prev_data.assembly.PortConnections["C1"] = null;
              prev_data.assembly.PortConnections["C2"] = null;
            }
          }
        }
      } else if (item.type == "dual_splitter") {
        if (item.connectedTo == "A") {
          prev_data.assembly.PortConnections["A"] = null;
          prev_data.assembly.PortConnections["A1"] = null;
          prev_data.assembly.PortConnections["A2"] = null;
        }
        if (item.connectedTo == "B") {
          prev_data.assembly.PortConnections["B"] = null;
          prev_data.assembly.PortConnections["B1"] = null;
          prev_data.assembly.PortConnections["B2"] = null;
        }
        if (item.connectedTo == "C") {
          prev_data.assembly.PortConnections["C"] = null;
          prev_data.assembly.PortConnections["C1"] = null;
          prev_data.assembly.PortConnections["C2"] = null;
        }
        if (item.connectedTo == "D") {
          prev_data.assembly.PortConnections["D"] = null;
          prev_data.assembly.PortConnections["D1"] = null;
          prev_data.assembly.PortConnections["D2"] = null;
        }
      } else if (
        item.type == "dc_motor" ||
        item.type == "mini_geared_motor" ||
        item.type == "geared_motor"
      ) {
        try {
          prev_data.assembly.PortConnections[item.port[0] + "1"] = null;
          prev_data.assembly.PortConnections[item.port[0] + "2"] = null;
        } catch (e) {}
      } else {
        prev_data.assembly.PortConnections[item.port] = null;
      }
    } else {
      prev_data.assembly.PortConnections[item.port] = null;
    }

    // sessionStorage.setItem("AppDetails-new", JSON.stringify(prev_data));
    // AppState.PortConnections = prev_data.assembly.PortConnections;
    // AppState.logic = prev_data.logic;
    // AppState.logicNew = prev_data.logicNew;
    var { logic } = prev_data;
    this.props.logicComponent(logic);
    var { workspace } = this.props.assembly;
    workspace.components[item.type].splice(item.index, 1);
    this.props.assemblyComponent(workspace);
  };
  /**
   * Pan event handler with throttling
   */
  pan = (e) => {
    if (panning) return;
    panning = true;
    var { workspace } = this.props.assembly;
    workspace.offset.left += (e.deltaX - oldDeltaX) / workspace.scale;
    workspace.offset.top += (e.deltaY - oldDeltaY) / workspace.scale;
    oldDeltaX = e.deltaX;
    oldDeltaY = e.deltaY;
    this.props.assemblyComponent(workspace, () => {
      panning = false;
    });
  };
  /**
   * Reset pan variables
   */
  panEnd = () => {
    panning = false;
    oldDeltaX = 0;
    oldDeltaY = 0;
  };
  /**
   * Zoom function with throttling
   * @param  {number} scale   The new scale
   * @param  {number} clientX The clientX (center of pinch or cursor position on wheel)
   * @param  {number} clientY The clientY (center of pinch or cursor position on wheel)
   */
  zoom = (scale, clientX, clientY) => {
    if (zooming) return;
    var { workspace, height, width } = this.props.assembly;
    if (
      (workspace.scale < 0.25 && scale < 1) ||
      (workspace.scale > 2 && scale > 1)
    )
      return;
    zooming = true;
    clientX -= width * 0.2;
    clientY -= document.body.clientHeight - height;
    // client = (offset + x/y) * scale
    // client of oldx/y = client of newx/y (current mouse position)
    // oldx/y = client / scale - offset
    // (newoffset + oldx/y) * newscale = (oldOffset + oldx/y) * oldscale
    const oldX = clientX / workspace.scale - workspace.offset.left;
    const oldY = clientY / workspace.scale - workspace.offset.top;
    workspace.offset.left = (workspace.offset.left + oldX) / scale - oldX;
    workspace.offset.top = (workspace.offset.top + oldY) / scale - oldY;
    workspace.scale *= scale;
    this.props.assemblyComponent(workspace, () => {
      zooming = false;
    });
  };
  /**
   * Pinch Out event handler
   */
  pinchOut = (e) => {
    this.zoom(12 / 11, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  };
  /**
   * Pinch In event handler
   */
  pinchIn = (e) => {
    this.zoom(11 / 12, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  };
  /**
   * Reset pinch variables
   */
  pinchEnd = () => {
    zooming = false;
  };
  /**
   * Wheel event handler
   */
  wheel = (e) => {
    const { clientX, clientY, deltaY } = e;
    // if (deltaY > 0) this.zoom(5 / 6, clientX, clientY);
    // else this.zoom(6 / 5, clientX, clientY);
    //e.preventDefault();
    return false;
  };
  close = () => {
    var c = document.getElementById("assemblyConnections");
    var d = document.getElementById("biboxClass");
    var e = document.getElementById("connectPort");

    c.style.zIndex = 2;
    d.style.zIndex = 2;
    e.style.zIndex = 2;
    this.setState({ modalIsOpen: false });
  };

  check = () => {
    if (localStorage.getItem("programMode") == "learn") {
      var c = document.getElementById("assemblyConnections");
      var d = document.getElementById("biboxClass");
      var e = document.getElementById("connectPort");

      c.style.zIndex = 0;
      d.style.zIndex = 0;
      e.style.zIndex = 0;

      var PortConnections = JSON.parse(
        sessionStorage.getItem("assembly")
      ).PortConnections;
    } else {
      this.props.history.push("/logic");
    }
  };

  backBtn = () => {
    this.props.history.push("/selectScreen/ExternalAccessories");
  };

  nextVisbility = (value) => {
    this.setState({ visible: value });
  };

  componentWillUnmount() {
    atatus.endTransaction("Assembly Screen");
    this.screenshotInitiate();
  }
  screenshotInitiate = () => {
    try {
      var URL, BLOB;
      (function (exports) {
        function urlsToAbsolute(nodeList) {
          if (!nodeList.length) {
            return [];
          }
          var attrName = "href";
          if (
            nodeList[0].__proto__ === HTMLImageElement.prototype ||
            nodeList[0].__proto__ === HTMLScriptElement.prototype
          ) {
            attrName = "src";
          }
          nodeList = [].map.call(nodeList, function (el, i) {
            var attr = el.getAttribute(attrName);
            if (!attr) {
              return;
            }
            var absURL = /^(https?|data):/i.test(attr);
            if (absURL) {
              return el;
            } else {
              return el;
            }
          });
          return nodeList;
        }

        function screenshotPage() {
          if (JSON.parse(sessionStorage.getItem("Index"))) {
            urlsToAbsolute(document.images);
            urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));
            var screenshot = document
              .getElementById("assemblyscreenid")
              .cloneNode(true);
            try {
              screenshot.getElementsByClassName(
                "assemblySidebar"
              )[0].innerHTML = "";
            } catch (e) {}
            $(screenshot)
              .find(".assemblySidebar")
              .css("background-color", "transparent");
            $(screenshot).find(".assemblySidebar").css("border", "none");
            $(screenshot).find(".assemblySidebar").css("box-shadow", "none");

            $(screenshot).find(".nextButton").css("display", "none");
            $(screenshot).find(".navbarContainer_assem").css("display", "none");
            $(screenshot)
              .find(".navbarContainer_assembly")
              .css("display", "none");

            //screenshot.getElementsByClassName("assemblyScreen")[0].style.backgroundImage='';
            $(screenshot)
              .find(".assemblyScreen")
              .css("background-color", "black");
            $(screenshot)
              .find(".assemblyScreen")
              .css("background-image", "none");

            // var b = document.createElement('base');
            // b.href = document.location.protocol + '//' + location.host;
            var head = screenshot.querySelector("head");
            // head.insertBefore(b, head.firstChild);
            screenshot.style.pointerEvents = "none";
            screenshot.style.overflow = "hidden";
            screenshot.style.webkitUserSelect = "none";
            screenshot.style.mozUserSelect = "none";
            screenshot.style.msUserSelect = "none";
            screenshot.style.oUserSelect = "none";
            screenshot.style.userSelect = "none";
            screenshot.dataset.scrollX = window.scrollX;
            screenshot.dataset.scrollY = window.scrollY;
            var script = document.createElement("script");
            script.textContent = "(" + addOnPageLoad_.toString() + ")();";
            // screenshot.querySelector('body').appendChild(script);

            var blob = new Blob([screenshot.outerHTML], {
              type: "text/html",
            });
            //screenshot.getElementsByClassName("pure-u-1-5")[0].style.display='none';
            URL = screenshot.outerHTML;
            return blob;
          }
        }
        function addOnPageLoad_() {
          window.addEventListener("DOMContentLoaded", function (e) {
            var scrollX = document.documentElement.dataset.scrollX || 0;
            var scrollY = document.documentElement.dataset.scrollY || 0;
            window.scrollTo(scrollX, scrollY);
          });
        }

        (function () {
          window.URL = window.URL || window.webkitURL;
          BLOB = screenshotPage();
          // window.open(window.URL.createObjectURL(screenshotPage()));
        })();

        exports.screenshotPage = screenshotPage;
        // exports.generate = generate;
      })(window);
      // generate();
      var div = document.createElement("div");
      // you need to create an empty div element with some id and use that id here.
      var div = document.getElementById("assemblyShot");
      div.innerHTML = URL;
      sessionStorage.setItem("assempblyImageHTML", URL);
      html2canvas(div, {
        onrendered: function (canvas) {
          div.innerHTML = "";
          var img = canvas.toDataURL("image/png");

          sessionStorage.setItem("assempblyImageURI", img);
        },
      });

      html2canvas(div).then(function (canvas) {
        div.innerHTML = "";
        var img = canvas.toDataURL("image/png");
        sessionStorage.setItem("assempblyImageURI", img);
      });
    } catch (e) {}
  };
  handleAssemblyCheckbox = (e) => {
    let isCheckedValue = e.target.value;

    let isChecked = e.target.checked;

    // if (isCheckedValue == "FOUR_in_ONE_Sensor" && isChecked == true) {
    //
    //   this.props.assembly.PortConnections[isCheckedValue] = {
    //     type: "4_in_1_sensor",
    //     index: 0,
    //   };
    // } else if (isCheckedValue == "FOUR_in_ONE_Sensor" && isChecked == false) {
    //
    //   this.props.assembly.PortConnections[isCheckedValue] = null;
    // }

    // if (isCheckedValue == "MICROPHONE" && isChecked == true) {
    //
    //   this.props.assembly.PortConnections[isCheckedValue] = {
    //     type: "microphone",
    //     index: 0,
    //   };
    // } else if (isCheckedValue == "MICROPHONE" && isChecked == false) {
    //
    //   this.props.assembly.PortConnections[isCheckedValue] = null;
    // }

    activeCheckBox[isCheckedValue] = isChecked;

    sessionStorage.setItem("assemblyCheckbox", JSON.stringify(activeCheckBox));

    // var stored2 = JSON.parse(sessionStorage.getItem("assemblyCheckbox"));

    // var stored = JSON.parse(sessionStorage.getItem("assembly"));

    // // stored.push(stored2);

    // var obj = Object.assign({}, stored, stored2);

    // sessionStorage.setItem("assembly", JSON.stringify(obj));
  };
  HdleUsb = async (e) => {
    const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];

    // Prompt user to select an Arduino Uno device.
    const port = await navigator.serial.requestPort({ filters });
    console.log("Ye Mera Port hai", port);
    if (port.onconnect == null) {
      window.location.reload(false);
      // this.OpenReadComPort();
    }
  };

  handleFourInOneSensor = (e) => {
    if (this.state.isClickFourInOneSensor) {
      this.setState({
        isClickFourInOneSensor: false,
      });
    } else {
      this.setState({
        isClickFourInOneSensor: true,
      });
    }
  };
  handleTempratureSensor = (e) => {
    if (this.state.isClickTempratureSensor) {
      this.setState({
        isClickTempratureSensor: false,
      });
    } else {
      this.setState({
        isClickTempratureSensor: true,
      });
    }
  };

  handleReadByte = async () => {
    let sessionData = JSON.parse(sessionStorage.getItem("concept"));
    console.log(sessionData);
    console.log(sessionData.internalaccessories, "Internal data");

    this.setState({ readbytes: !this.state.readbytes }, () => {
      console.log(this.state.responceTp0, "------------------------->>");
    });
    if (this.state.readbytes) {
      // window.location.reload(false);
    }
    console.log("kamal", this.state.readbytes);
    if (this.state.readbytes == false) {
      console.log(
        "TRUE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
        this.state.readbytes
      );
      // try {
      //   await reader.releaseLock();
      // } catch (e) {}
      this.readLoop();
    } else {
      console.log(
        "FALSE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
        this.state.readbytes
      );
      // const port = this.props.webSerial;
      // reader.releaseLock();
      // const reader = port.readable.getReader();
      // reader.releaseLock();
      // console.log("LOCK RELEASED");
      reader.cancel();
      this.state.flag = [0];
      // this.readLoop(false);
    }
  };

  renderImg = (e) => {
    let fourInOneSensorName = null;
    let isFourInOneSensor = Object.keys(
      JSON.parse(sessionStorage.getItem("concept")).internalaccessories
        .Four_in_one_sensor
    ).some((val, inx) => {
      if (
        JSON.parse(sessionStorage.getItem("concept")).internalaccessories
          .Four_in_one_sensor[val] == true
      ) {
        fourInOneSensorName = val;
        return true;
      } else {
        return false;
      }
    });

    switch (fourInOneSensorName) {
      case "isGestureSensor": {
        return renderPrgImage("gesturesensorActive");
      }
      case "isDistanceSensors": {
        return renderPrgImage("distancesensorsActive");
      }
      case "isLightSensor": {
        return renderPrgImage("lightsensorActive");
      }
    }
  };

  render() {
    // let vv = JSON.parse(localStorage.getItem("SavedData"));
    // console.log(vv[4].assembly, "DATA OF PORTS");

    var selectionType = localStorage.getItem("programMode");

    if (selectionType == "program") {
      this.state.visible = "visible";
    }

    const propertyPanelStyle = {
      // backgroundImage: `url("${propertypanel}")`,
      // backgroundRepeat: "no-repeat",
      // backgroundSize: "100% 100%",
      // backgroundPosition: "center",
    };

    //
    let fourInOneSensorName = null;
    const isFourInOneSensor = Object.keys(
      JSON.parse(sessionStorage.getItem("concept")).internalaccessories
        .Four_in_one_sensor
    ).some((val, inx) => {
      if (
        JSON.parse(sessionStorage.getItem("concept")).internalaccessories
          .Four_in_one_sensor[val] == true
      ) {
        fourInOneSensorName = val;
        return true;
      } else {
        return false;
      }
    });
    const isTempratureSensor = JSON.parse(sessionStorage.getItem("concept"))
      .internalaccessories.isTemperature;

    console.log("GAYA", isTempratureSensor);
    return (
      <div div style={{ overflowY: "hidden" }}>
        {/* NAV BAR */}
        <div
          style={{
            height: "10%",
            width: "100%",
            // border: "1px solid red",
            // background: "red",

            position: "absolute",
            userSelect: "none",
          }}
        >
          <div className="navbarContainer" style={{ zIndex: "1000" }}>
            <div className="navbar_content">
              <div className="navbar_new ">Select</div>
              <div className="navbar_new isActive">Assemble</div>
              <div className="navbar_new">Code</div>
              <div className="navbar_new">Simulate</div>
            </div>

            {/* bar represent the selected section */}
            <img
              src={renderPrgImage("assemblebar")}
              style={{ height: "100%", width: "30%" }}
            />

            <div className="navbar-Action">
              {/* {this.state.readbytes ? (
                <img
                  src={renderPrgImage readPCActive}
                  className="iconBtnSize"
                  style={{ marginRight: "25px" }}
                  onClick={this.handleReadByte}
                />
              ) : (
                <img
                  src={renderPrgImage readPCInActive}
                  className="iconBtnSize"
                  style={{ marginRight: "25px" }}
                  onClick={this.handleReadByte}
                />
              )} */}

              {/* <img
                src={renderPrgImage("saveBtnInActive")}
                className="iconBtnSize"
                style={{ marginRight: "25px" }}
                onClick={() => this.setState({ reConnecting: true })}
              /> */}

              {/* <img
                className="iconBtnSize"
                src={renderPrgImage("helpBtnInActive")}
                style={{ marginRight: "25px" }}
              /> */}

              {this.state.isHelp ? (
                <div className="Ss_slide">
                  <AssemblyPrgm />
                </div>
              ) : (
                <img
                  className="iconBtnSize"
                  src={renderPrgImage("helpBtnInActive")}
                  onClick={this.helpBtn}
                ></img>
              )}

              {this.state.isHelp ? (
                <img
                  className="helpClo"
                  src={renderPrgImage("closBtn")}
                  onClick={this.helpBtn}
                ></img>
              ) : null}

              {this.state.isusb ? (
                <img src={renderPrgImage("usbON")} onClick={this.HdleUsb} />
              ) : (
                <img src={renderPrgImage("usbOFF")} onClick={this.HdleUsb} />
              )}
            </div>
          </div>
        </div>

        <div
          id="assemblyscreenid"
          className="pure-g assemblyScreen"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            // backgroundColor: "#FCFCFC",
            // background: "red",
          }}
        >
          {/* <button
            className="nextButton"
            style={{ visibility: this.state.visible }}
            onClick={this.check}
          >
            NEXT
          </button> */}

          <div className="pure-u-1-5 user-select" style={{ marginTop: "5%" }}>
            <Sidebar removeFromWorkspace={this.removeFromWorkspace} />
          </div>

          <div id="screenshotid" className="pure-u-4-5">
            <div
              id="assemblyConnections"
              style={{
                position: "absolute",
                width: "80%",
                height: "100%",
                zIndex: 1,
              }}
              onWheel={this.wheel}
            >
              {/* IMG of ACE and  Sensor Img */}
              <WorkSpace
                workspace={this.props.assembly.workspace}
                update={this.props.assemblyComponent}
                appState={this.props}
                height={this.props.height}
                width={this.props.width * 0.8}
                prop={this.props.assembly}
                updatePort={this.props.PortConnections}
                componentsData={this.props.assembly.components}
                removeFromWorkspace={this.removeFromWorkspace}
                nextVisbility={this.nextVisbility}
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
              />
            </div>
          </div>

          {/* WIRE ,WHITE DOTS POINT_ON ACE, SHOWS IMG at Draging Time   */}
          <CustomDragLayer
            style={{
              float: "right",
              width: "75%",
              height: "100%",
              position: "relative",
            }}
            height={this.props.height}
            width={this.props.width}
            workspace={this.props.assembly.workspace}
            PortConnections={this.props.assembly.PortConnections}
          />
          {this.state.readbytes ? (
            <img
              id="img"
              src={renderPrgImage("readPCActive")}
              // className="iconBtnSize1"
              style={{
                position: "absolute",
                cursor: "pointer",
                top: "50%",
                right: "2%",
                transform: "translateY(-50%)",
                height: "60px",
                width: "60px",
                zIndex: "10",
              }}
              onClick={this.handleReadByte}
            />
          ) : (
            <img
              id="img"
              src={renderPrgImage("readPCInActive")}
              // className="iconBtnSize1"
              style={{
                position: "absolute",
                cursor: "pointer",
                top: "50%",
                right: "2%",
                transform: "translateY(-50%)",
                height: "60px",
                width: "60px",
                zIndex: "9",
              }}
              onClick={this.handleReadByte}
            />
          )}
          {isFourInOneSensor ? (
            this.state.isClickFourInOneSensor == false ? (
              <img
                id="img"
                src={renderPrgImage("readPCInActive")}
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: "50%",
                  right: "2%",
                  transform: "translateY(-50%)",
                  height: "60px",
                  width: "60px",
                  zIndex: "10",
                }}
                onClick={() => {
                  this.handleFourInOneSensor();
                  this.handleReadByte();
                }}
              />
            ) : (
              <div className="propertyPanel">
                {JSON.parse(sessionStorage.getItem("concept"))
                  .internalaccessories.Four_in_one_sensor.isColorSensor ? (
                  <div>
                    {JSON.parse(sessionStorage.getItem("concept"))
                      .internalaccessories.isTemperature ? (
                      <div
                        className="propertyPanel-Details-colorSensor"
                        style={propertyPanelStyle}
                      >
                        <div className="colorSensor-container">
                          <div>
                            <img
                              src={renderPrgImage("colorsensorActive")}
                              style={{
                                height: "45px",
                                width: "45px",
                                marginTop: "5px",
                              }}
                            />
                            <p
                              style={{
                                color: "#707070",
                                fontSize: "12px",
                                marginTop: "5px",
                                transform: "translateX(20%)",
                              }}
                            ></p>
                          </div>
                          <div>
                            <p style={{ color: "#F16178" }}>
                              {" "}
                              R : {this.state.red}
                            </p>
                            <p style={{ color: "#3BB273" }}>
                              {" "}
                              G : {this.state.green}
                            </p>
                            <p style={{ color: "#30A8CE" }}>
                              {" "}
                              B : {this.state.blue}
                            </p>
                          </div>
                        </div>
                        <div className="colorSensor-container2">
                          <img
                            src={renderPrgImage("tempActive")}
                            style={{ height: "45px", width: "45px" }}
                          />

                          <p>{this.state.temprature}</p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="propertyPanel-Details-colorSensor-Temp"
                        style={propertyPanelStyle}
                      >
                        <div className="colorSensor-container">
                          <div>
                            <img
                              src={renderPrgImage("colorsensorActive")}
                              style={{
                                height: "45px",
                                width: "45px",
                                marginTop: "5px",
                              }}
                            />
                            <p
                              style={{
                                color: "#707070",
                                fontSize: "12px",
                                marginTop: "5px",
                                transform: "translateX(20%)",
                              }}
                            ></p>
                          </div>
                          <div>
                            <p style={{ color: "#F16178" }}>
                              {" "}
                              R : {this.state.red}
                            </p>
                            <p style={{ color: "#3BB273" }}>
                              {" "}
                              G : {this.state.green}
                            </p>
                            <p style={{ color: "#30A8CE" }}>
                              {" "}
                              B : {this.state.blue}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {JSON.parse(sessionStorage.getItem("concept"))
                      .internalaccessories.isTemperature == true ? (
                      <div
                        className="propertyPanel-Details"
                        style={propertyPanelStyle}
                      >
                        <div className="Item">
                          <img
                            src={this.renderImg()}
                            style={{ height: "45px", width: "45px" }}
                          />

                          <p>{this.state.light} </p>
                          <p>{this.state.distance} </p>
                          <p>{this.state.gesture} </p>
                        </div>

                        <div className="Item2">
                          <img
                            src={renderPrgImage("tempActive")}
                            style={{ height: "45px", width: "45px" }}
                          />

                          <p>{this.state.temprature} </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="propertyPanel-Details-FIO"
                        style={propertyPanelStyle}
                      >
                        <div className="Item3">
                          <img
                            src={this.renderImg()}
                            style={{ height: "45px", width: "45px" }}
                          />

                          <p>{this.state.light} </p>
                          <p>{this.state.distance} </p>
                          <p>{this.state.gesture} </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="propertyPanel-closeBtn">
                  <img
                    id="img"
                    src={renderPrgImage("readPCActive")}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "2%",
                      cursor: "pointer",
                      transform: "translateY(-50%)",
                      height: "60px",
                      width: "60px",
                      zIndex: "10",
                    }}
                    onClick={() => {
                      this.handleFourInOneSensor();
                      this.handleReadByte();
                    }}
                  />
                </div>
              </div>
            )
          ) : null}
          {isTempratureSensor ? (
            <div>
              {" "}
              {isFourInOneSensor ? null : this.state.isClickTempratureSensor ==
                true ? (
                <div>
                  <div className="propertyPanel">
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "7%",
                        transform: "translateY(-50%)",
                        height: "100px",
                        width: "65px",

                        borderRadius: "46px",
                        background: "#f4f4f4",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#707070",
                          margin: "10px",
                          textAlign: "center",
                        }}
                      >
                        <img
                          src={renderPrgImage("tempActive")}
                          style={{ height: "45px", width: "45px" }}
                        />

                        <p style={{ marginTop: "5px" }}>
                          {this.state.temprature}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="propertyPanel-closeBtn">
                    <img
                      id="img"
                      src={renderPrgImage("readPCActive")}
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        top: "50%",
                        right: "2%",
                        transform: "translateY(-50%)",
                        height: "60px",
                        width: "60px",
                        zIndex: "10",
                      }}
                      onClick={() => {
                        this.handleTempratureSensor();
                        this.handleReadByte();
                      }}
                    />
                  </div>
                </div>
              ) : (
                <img
                  id="img"
                  src={renderPrgImage("readPCInActive")}
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: "50%",
                    right: "2%",
                    transform: "translateY(-50%)",
                    height: "60px",
                    width: "60px",
                    zIndex: "10",
                  }}
                  onClick={() => {
                    this.handleTempratureSensor();
                    this.handleReadByte();
                  }}
                />
              )}
            </div>
          ) : null}

          {/* CHECK BOX OLD UI  */}
          {/* {sessionStorage.getItem("connectedDevice") == "Ace" ? (
            <div className="AssemblycheckBoxContainer">
              <CheckboxAssembly
                title="RGB"
                value="RGB"
                handleAssemblyCheckbox={this.handleAssemblyCheckbox}
              />
              <CheckboxAssembly
                title="4-in-1 Sensor"
                handleAssemblyCheckbox={this.handleAssemblyCheckbox}
                value="FOUR_in_ONE_Sensor"
              />
              <CheckboxAssembly
                title="Buzzer"
                handleAssemblyCheckbox={this.handleAssemblyCheckbox}
                value="Buzzer"
              />
              <CheckboxAssembly
                title="Microphone"
                handleAssemblyCheckbox={this.handleAssemblyCheckbox}
                value="MICROPHONE"
              />
            </div>
          ) : null} */}

          <div id="assemblyShot"></div>
        </div>

        {/* BOTTOM BACK,NEXT BTN and discription*/}
        <div
          className="SelectScreenBottom"
          style={{ width: "80%", marginLeft: "15%" }}
        >
          <div className="bottom-child">
            {/* <img
              className="iconBtnSize imgBackBtn"
              src={backBtn}
              onClick={this.backBtn}
              draggable="false"
              style={{ border: "1px solid red" }}
            /> */}

            <div className="decription">
              <p>Drag and drop components to make connection </p>
            </div>
            <img
              className="iconBtnSize imgNextBtn"
              src={renderPrgImage("nextBtn")}
              onClick={this.check}
            />
          </div>
        </div>
      </div>
    );
  }
}

// export default Assembly;

const mapStateToProps = (state) => {
  console.log("ASSEMBLY LOG", state);
  return state;
  // return { state, webserialPort: state.webSerial };
};
// const mapStateToProp = (state) => {
//   console.log("mapStateToProps", state);

//   return {
//     webserialPort: state.webSerial,
//   };
// };
const mapDispatchToProps = (dispatch) => {
  return {
    assemblyComponent: (data) => {
      dispatch({ type: "ASSEMBLY_SELECTION", payload: data });
      // console.log("=======================>", data);
      // let v = JSON.parse(localStorage.getItem("SavedData"));
      // let vn = sessionStorage.getItem("name");
      // if (v != null) {
      //   for (let i = 0; i < v.length; i++) {
      //     if (vn == v[i].name) {
      //       console.log("KEYS", v[i].assembly.workspace);
      //       data = v[i].assembly.workspace;
      //       dispatch({ type: "ASSEMBLY_SELECTION", payload: data });
      //     } else {
      //       dispatch({ type: "ASSEMBLY_SELECTION", payload: data });
      //     }
      //   }
      // }
    },
    logicComponent: (data) => {
      dispatch({ type: "LOGIC_SELECTION", payload: data });
    },
    PortConnections: (data) => {
      console.log("=======================>", data);
      // let v = JSON.parse(localStorage.getItem("SavedData"));
      // let vn = sessionStorage.getItem("name");
      // if (v != null) {
      //   for (let i = 0; i < v.length; i++) {
      //     if (vn == v[i].name) {
      //       console.log("KEYS", v[i].assembly.PortConnections);
      //       data = v[i].assembly.PortConnections;
      //       dispatch({ type: "PORT_CONNECTION", payload: data });
      //       // sessionStorage.setItem("name", null);
      //     } else {
      //       dispatch({ type: "PORT_CONNECTION", payload: data });
      //     }
      //   }
      // }

      // data = JSON.parse(localStorage.getItem("SavedData"));
      // // console.log(v[4].assembly, "DATA OF PORTS");
      // let v = data[4].assembly.PortConnections;
      dispatch({ type: "PORT_CONNECTION", payload: data });
    },
    webSerialAction: (data) => {
      console.log("mapDispatchToProps", data);
      dispatch(webSerialAction(data));
    },
  };
};

Assembly = withRouter(connect(mapStateToProps, mapDispatchToProps)(Assembly));
Assembly = withRouter(DragDropContext(HTML5Backend)(Assembly));
// Sidebar = DragSource('items', itemSource, collect)(Sidebar)

export default Assembly;
// export default connect(mapStateToProp)(Assembly);
