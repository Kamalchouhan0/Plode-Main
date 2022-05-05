/* eslint-disable no-fallthrough */
/* eslint-disable no-loop-func */
/* eslint-disable no-use-before-define */
import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import CustomNodeFlow from "./DnD/Index";
import Modal from "react-modal";
import "../../css/simulate.css";
import CustomNodeFlowHumanoid from "./DnDHumanoid/Index";
import SimulateLogic from "./simulateLogic";
import $ from "jquery";
import { webSerialAction } from "../../redux/actions/index";
import unicodeToChar from "../../utils/unicodeToChar";
import socketIOClient from "socket.io-client";
import InputSlider from "./InputSliders";
import {
  assemblebar,
  readPC,
  saveBtnInActive,
  saveBtnActive,
  helpBtnActive,
  helpBtnInActive,
  bluetoothBtnInActive,
  bluetoothBtnActive,
  readPCInActive,
  backBtn,
  uploadBtn,
  nextBtn,
  OneXspeed,
  HW_SW_btn,
  SWbtn,
  HWbtn,
  oneXspeedInActive,
  playrunBtn,
  pauseBtn,
  usbOFF,
  usbON,
  PcinternalBuzzerActive,
} from "../../source/index";
import renderPrgImage from "../../source/programImg";
import SimulatePrgm from "../ReusableComponents/PrgmSlider/SimulatePrgm/SimulatePrgm";

let j = 0;

let jj = 0;
let jjj = 0;
let jjjj = 0;
let jjjjj = 0;
let j6 = 0;

let myImage;
let loopCount = [];

let myImage1,
  myImage2,
  myImage3,
  myImage4,
  myImage5,
  myImage6,
  myImage7 = null;
let mm = 0;
var loopProgram = "",
  loopcount = 0,
  loop = 0,
  //   ifResult = false,
  switchOff = false;
var sent = "",
  touch_tack_port = "",
  allLoopCount = 1;
var PortConnectionArr;
let k = 0;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    // height: "28%",
    // width: " 30%",
    height: "25%",
    width: "30%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor: "#9ecee8",
    // border: "2px solid #188dcc",
    border: "5px solid rgb(255, 140, 25)",
    background: "rgb(255, 255, 255)",
    borderRadius: "15px",
  },
};

const styleSimulate_ = {
  rangeStyle_: {
    width: "85%",
  },
  numberStyle: {
    width: "10%",
    height: "20px",
    border: "1px solid black",
    marginLeft: "5%",
  },
};
const timer = (ms) => new Promise((res) => setTimeout(res, ms));
var notflag = false;
async function decison(arg1, arg2, op) {
  //start inner switch
  var response;
  switch (op) {
    case ">": {
      if (arg1 > arg2) {
        console.log("TRUE");
        response = true;
      } else {
        console.log("FALSE");
        response = false;
      }
      break;
    }
    case "<": {
      if (arg1 < arg2) {
        console.log("TRUE");
        response = true;
      } else {
        console.log("FALSE");
        response = false;
      }
      break;
    }
    case "=": {
      if (!notflag) {
        if (arg1 == arg2) {
          console.log("TRUE");
          response = true;
        } else {
          console.log("FALSE");
          response = false;
        }
      } else {
        if (arg1 != arg2) {
          console.log("TRUE");
          response = true;
        } else {
          console.log("FALSE");
          response = false;
        }
      }
      break;
    }
  } ///end inner switch
  return response;
}
sessionStorage.setItem("play_btn", true);
class Simulate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: false,
      value: "0",
      componentClicked: "",
      compName: "",
      paly_pause_btn: true,
      clicked: false,
      number: 0,
      glowTime: 0,
      variable: 0,
      isConditionEnd: false,
      isusb: false,
      isHelp: false,
      compPort: "",
      rangeCountNumber_: 0,
      rangeValue_: 0,

      countClick: 0,
    };

    window.addEventListener("load", async (e) => {
      console.log("HEY_CALIIN", this.props.state);
      navigator.serial.addEventListener("connect", (e) => {
        window.location.reload(false);
        var user = 1;
        sessionStorage.setItem("user", JSON.stringify(user));
        this.handleUsb();
      });

      navigator.serial.addEventListener("disconnect", (e) => {
        var user = 0;
        sessionStorage.setItem("user", JSON.stringify(user));
        this.handleUsb();
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
    });
    this.myRef = React.createRef();
    this.handleLoad = this.handleLoad.bind(this);
  }
  OpenReadComPort = async () => {
    const port = this.props.webSerial;
    console.log("PORTLIST", port);
    // console.log(port, "pPort");
    try {
      await port.open({ baudRate: 115200 });
    } catch (e) {
      console.log(e);
    }
    this.writePort("notWrite");
    // let valresponceTp0 = "",
    //   valdis = "";
    // // setTimeout(async () => {
    // if (this.state.readbytes) {
    // this.readLoop();
    // }

    // }, 1000);
  };
  async readLoop() {
    const port = this.props.webSerial;

    try {
      const reader = port.readable.getReader();

      // Listen to data coming from the serial device.
      while (true) {
        const { value, done } = await reader.read();
        if (this.state.k === true) {
          // console.log("MAI CHAL GAYA");
          reader.releaseLock();
        }
        console.log(value);
        // value is a string.
        if (value.length == 32) {
          var v = unicodeToChar(value);
          // var v = value;
          console.log(v);
        }
        // if (value.length == 23) {
        //   var v = unicodeToChar(value);
        //   // var v = value;
        //   console.log(v);
        // }
        if (value.length == 7) {
          var vi = unicodeToChar(value);
          // var vi = value;
          console.log(vi);
        }
        if (value.length == 9) {
          var vi = unicodeToChar(value);
          // var vi = value;
          console.log(vi);
        }
        if (value.length == 14) {
          var vi = unicodeToChar(value);
          // var vi = value;
          console.log(vi);
        }
        if (value.length == 17) {
          var vi = unicodeToChar(value);
          // var vi = value;
          console.log(vi);
        }
        if (value.length == 12) {
          var vi = unicodeToChar(value);
          // var vi = value;
          console.log(vi);
        }
        // if (value.lenght != 1) {
        //   var vae = v + vi;
        // }
        if ((value.lenght == 32 && value.lenght == 12) || value.lenght == 11) {
          var vae = v + " " + vi;
          console.log(vae, "ORRRR");
        }
        var vae = v + vi;
        this.state.flag = vae;
        console.log("ADDED", vae);
      }
    } catch (e) {
      console.log(e);
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
  handleUsb = (e) => {
    this.setState({ isusb: !this.state.isusb });
  };
  HdleUsb = async (e) => {
    const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];

    // Prompt user to select an Arduino Uno device.
    const port = await navigator.serial.requestPort({ filters });
    console.log("Ye Mera Port hai", port);
    if (port.onconnect == null) {
      window.location.reload(false);
    }
  };
  helpBtn = (e) => {
    this.setState({ isHelp: !this.state.isHelp });
  };
  componentDidUpdate() {
    let no_port = this.props.webserialPort;
    if (typeof no_port !== undefined) {
      console.log("WORKING>>>>>>>>");
      this.OpenReadComPort();
    } else {
      // this.OpenReadComPort();
      console.log(JSON.parse(sessionStorage.getItem("webSerialPortList")));
      console.log("SERIAL PORT NOT CONNECTED");
    }
  }
  componentDidMount() {
    //var socket = io.connect("http://localhost:3008");
    //socket.emit("_usbDetection", "Hi");
    //socket.on("/usbDetection1", (data) => {
    // console.log("...............1", data);
    // // let kill = Array.from(data);
    // // console.log("...............5", kill);
    // if (data == 1) {
    //   this.handleUsb(true);
    //   console.log("LLLLLLLLLLLLLLL", data);
    // } else {
    //   this.handleUsb(false);
    // }
    //});
    var flatPrograms = [];
    async function flattenLogic(programs) {
      for (var i in programs) {
        if (
          programs[i].type == "condition" ||
          programs[i].type == "loop" ||
          programs[i].type == "sensor"
        ) {
          flatPrograms.push(programs[i]);
          flattenLogic(programs[i].subprogram);
        } else {
          flatPrograms.push(programs[i]);
        }
      }
    }
    flattenLogic(this.props.logic.program);
    sessionStorage.setItem("flatPrograms", JSON.stringify(flatPrograms));
    let data = JSON.parse(sessionStorage.getItem("user"));

    if (data === 1) {
      this.handleUsb();
    }
    if (data === 0) {
      this.handleUsb();
    }
    window.addEventListener("load", this.handleLoad);
    let byte = null;
    const logicData = JSON.parse(sessionStorage.getItem("logic"));
    const logicValues = Object.entries(logicData);
    logicValues[0][1].map((i) => {
      if (i.type === "hardware") {
        byte = `o${i}`;
        // console.log(i);
      }
    });

    var PortConnection = this.props.assembly.PortConnections;
    PortConnectionArr = Object.entries(PortConnection);
    var Compo = this.props.assembly.workspace.components;
    //sessionStorage.setItem("simulate", JSON.stringify([]));
    console.log("PROPS FROM SIMULATE..", Compo);
    Object.keys(Compo).map((keys) => {
      return Compo[keys].map((ind) => {
        var clone = [
          ...JSON.parse(sessionStorage.getItem("simulate")),
          { componentName: keys, port: ind.connectedTo },
        ];
        sessionStorage.setItem("simulate", JSON.stringify(clone));

        // console.log("The Value is", ind.connectedTo);
        var myImage = new Image(60, 66);
        // myImage.src = `images/Simulate/${keys}.png`;
        myImage.src =
          // process.env.PUBLIC_URL + `/images/oldImages/component_${keys}.png`;
          process.env.PUBLIC_URL +
          `/Bisoft_UI/Accessories/newComponents/component_${keys}.png`;
        myImage.setAttribute("id", `img_${ind.connectedTo}`);
        // document.getElementById(ind.connectedTo).style.visibility="visible"
        // myImage.style.filter="drop-shadow(0 0 10px blue)";
        myImage.style.position = "absolute";
        if (
          keys === "light_sensor" ||
          keys === "distance_sensor" ||
          keys === "temperature_sensor" ||
          keys === "sound_sensor" ||
          keys === "rain_sensor" ||
          keys === "gas_sensor" ||
          keys === "heartbeat_sensor" ||
          keys === "pir_sensor" ||
          keys === "bend_sensor" ||
          keys === "humidity_sensor" ||
          keys === "hall_sensor" ||
          keys === "metal_detector" ||
          keys === "ultrasonic_sensor" ||
          keys === "4_in_1_sensor"
        ) {
          //for the input component
          myImage.addEventListener("click", () => this.myFun(keys));
        }
        if (keys === "touch_sensor" || keys === "tact_switch") {
          myImage.addEventListener("mousedown", () => this.myFun2(keys));
          myImage.addEventListener("click", () => this.myFun(keys));
          touch_tack_port = ind.connectedTo;
        }
        if (ind.connectedTo === "A" || ind.connectedTo === "B") {
          if (keys === "dual_splitter")
            myImage.style.transform = "rotate(90deg)";
          else myImage.style.transform = "rotate(270deg)";
        } else if (ind.connectedTo === "F" || ind.connectedTo === "G") {
          myImage.style.transform = "rotate(90deg)";
        } else if (sessionStorage.getItem("connectedDevice") === "Ace") {
          if (ind.connectedTo === "C" || ind.connectedTo === "D") {
            if (keys === "dual_splitter")
              myImage.style.transform = "rotate(270deg)";
            else myImage.style.transform = "rotate(90deg)";
          }
        }
        return true;
      });
    });
  }
  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad);
  }

  handleLoad() {
    $(`#img_A1`);
    $(`#img_B1`);
    $(`#img_C1`);
    $(`#img_D1`);
  }

  async processbytes(bytes, inputopcodes, settingsbytes) {
    //console.log("iop:", inputopcodes);
    //var center = document.getElementById("centerStage");

    //var i = await initSliders(inputopcodes);
    var iterartions;
    var repartstart;
    var resetflag = false;
    var loopflag = false;
    var hexid = 0;
    var programs = JSON.parse(sessionStorage.getItem("flatPrograms"));
    for (var b = 0; b < bytes.length; b++) {
      //console.log("count:", b);
      if (loopflag) {
        hexidloopoffset++;
      }

      if (sessionStorage.getItem("play_btn") == "true") {
        console.log("breakin in");
        resetflag = true;
        break;
      }
      if (
        bytes[b] == "R".charCodeAt(0) &&
        bytes[b + 1] == "S".charCodeAt(0) &&
        bytes[b + 2] == "T".charCodeAt(0)
      ) {
        //forever condition
        await timer(10);
        console.log("RST");
        b = 0;
        hexid = 0;
      }

      //if condition
      if (bytes[b] == "d".charCodeAt(0)) {
        console.log("in decison");
        hexid++;

        b += 3;
        var ar1 = bytes[b + 1].toString(2);
        var ar2 = bytes[b + 2].toString(2);
        console.log(ar1);
        console.log(ar2);
        var op = String.fromCharCode(bytes[b + 3]);
        if (bytes[b + 4] == "33") {
          notflag = true;
        }
        var ar3 = ar1 + ar2;
        console.log(ar3);
        var arg2 = parseInt(ar3, 2);
        var condition;
        var simulation = JSON.parse(sessionStorage.getItem("simulate"));
        switch (parseInt(bytes[b])) {
          case 1: {
            for (var key in Object.entries(simulation)) {
              if (simulation[key].port == "A1") {
                var arg1 = simulation[key].value;
                if (arg1 == undefined) {
                  arg1 = 0;
                }
              }
            }
            //var arg1 = parseInt(document.getElementById("a1_s").value);

            condition = await decison(arg1, arg2, op);
            break;
          }
          case 2: {
            for (var key in Object.entries(simulation)) {
              if (simulation[key].port == "A2") {
                var arg1 = simulation[key].value;
                if (arg1 == undefined) {
                  arg1 = 0;
                }
              }
            }
            //var arg1 = parseInt(document.getElementById("a1_s").value);

            condition = await decison(arg1, arg2, op);
            break;
          }
          case 3: {
            for (var key in Object.entries(simulation)) {
              if (simulation[key].port == "B1") {
                var arg1 = simulation[key].value;
                if (arg1 == undefined) {
                  arg1 = 0;
                }
              }
            }
            //var arg1 = parseInt(document.getElementById("b1_s").value);

            condition = await decison(arg1, arg2, op);
            break;
          }
          case 4: {
            for (var key in Object.entries(simulation)) {
              if (simulation[key].port == "B2") {
                var arg1 = simulation[key].value;
                if (arg1 == undefined) {
                  arg1 = 0;
                }
              }
            }
            //var arg1 = parseInt(document.getElementById("b1_s").value);

            condition = await decison(arg1, arg2, op);
            break;
          }
          case 5: {
            for (var key in Object.entries(simulation)) {
              if (simulation[key].port == "C1") {
                var arg1 = simulation[key].value;
                if (arg1 == undefined) {
                  arg1 = 0;
                }
              }
            }
            // var arg1 = parseInt(document.getElementById("c1_s").value);

            condition = await decison(arg1, arg2, op);
            break;
          }
          case 6: {
            for (var key in Object.entries(simulation)) {
              if (simulation[key].port == "C2") {
                var arg1 = simulation[key].value;
                if (arg1 == undefined) {
                  arg1 = 0;
                }
              }
            }
            //var arg1 = parseInt(document.getElementById("c1_s").value);

            condition = await decison(arg1, arg2, op);
            break;
          }
          case 7: {
            for (var key in Object.entries(simulation)) {
              if (simulation[key].port == "D1") {
                var arg1 = simulation[key].value;
                if (arg1 == undefined) {
                  arg1 = 0;
                }
              }
            }
            // var arg1 = parseInt(document.getElementById("d1_s").value);

            condition = await decison(arg1, arg2, op);
            break;
          }
          case 8: {
            for (var key in Object.entries(simulation)) {
              if (simulation[key].port == "D2") {
                var arg1 = simulation[key].value;
                if (arg1 == undefined) {
                  arg1 = 0;
                }
              }
            }
            //var arg1 = parseInt(document.getElementById("d1_s").value);

            condition = await decison(arg1, arg2, op);
            break;
          }
          case 29: {
            // var arg1 = parseInt(document.getElementById("mic_s").value);
            for (var key in Object.entries(simulation)) {
              if (simulation[key].componentName == "Mic") {
                var arg1 = simulation[key].value;
                if (arg1 == undefined) {
                  arg1 = 0;
                }
              }
            }
            condition = await decison(arg1, arg2, op);
            break;
          }
          case 23: {
            //var arg1 = parseInt(document.getElementById("4in1_s").value);
            if (simulation[key].componentName == "Fourin1SensorCRed") {
              var arg1 = simulation[key].value;
              if (arg1 == undefined) {
                arg1 = 0;
              }
            }
            condition = await decison(arg1, arg2, op);
            break;
          }
          case 24: {
            //var arg1 = parseInt(document.getElementById("4in1_s").value);
            if (simulation[key].componentName == "Fourin1SensorCGreen") {
              var arg1 = simulation[key].value;
              if (arg1 == undefined) {
                arg1 = 0;
              }
            }
            condition = await decison(arg1, arg2, op);
            break;
          }
          case 25: {
            //var arg1 = parseInt(document.getElementById("4in1_s").value);
            if (simulation[key].componentName == "Fourin1SensorCBlue") {
              var arg1 = simulation[key].value;
              if (arg1 == undefined) {
                arg1 = 0;
              }
            }
            condition = await decison(arg1, arg2, op);
            break;
          }
          case 26: {
            //var arg1 = parseInt(document.getElementById("4in1_s").value);
            if (simulation[key].componentName == "Fourin1SensorD") {
              var arg1 = simulation[key].value;
              if (arg1 == undefined) {
                arg1 = 0;
              }
            }
            condition = await decison(arg1, arg2, op);
            break;
          }
          case 27: {
            //var arg1 = parseInt(document.getElementById("4in1_s").value);
            if (simulation[key].componentName == "Fourin1SensorL") {
              var arg1 = simulation[key].value;
              if (arg1 == undefined) {
                arg1 = 0;
              }
            }
            condition = await decison(arg1, arg2, op);
            break;
          }
          case 28: {
            //var arg1 = parseInt(document.getElementById("4in1_s").value);
            if (simulation[key].componentName == "Fourin1SensorG") {
              var arg1 = simulation[key].value;
              if (arg1 == undefined) {
                arg1 = 0;
              }
            }
            condition = await decison(arg1, arg2, op);
            break;
          }
          case 30: {
            // var arg1 = parseInt(document.getElementById("t0s").value);
            for (var key in Object.entries(simulation)) {
              if (simulation[key].componentName == "TouchZero") {
                var arg1 = simulation[key].value;
                if (arg1 == undefined) {
                  arg1 = 0;
                }
              }
            }
            console.log(arg1);
            console.log(arg2);
            condition = await decison(arg1, arg2, op);
            break;
          }
          case 31: {
            //var arg1 = parseInt(document.getElementById("t1s").value);
            for (var key in Object.entries(simulation)) {
              if (simulation[key].componentName == "TouchOne") {
                var arg1 = simulation[key].value;
                if (arg1 == undefined) {
                  arg1 = 0;
                }
              }
            }
            condition = await decison(arg1, arg2, op);
            break;
          }
          case 32: {
            // var arg1 = parseInt(document.getElementById("t2s").value);
            for (var key in Object.entries(simulation)) {
              if (simulation[key].componentName == "TouchTwo") {
                var arg1 = simulation[key].value;
                if (arg1 == undefined) {
                  arg1 = 0;
                }
              }
            }
            condition = await decison(arg1, arg2, op);
            break;
          }
        } ///end outer switch
        b = b + 3;
        if (condition == false) {
          console.log("in false");
          for (var k = b; k < bytes.length; k++) {
            if (
              bytes[k] == "E".charCodeAt(0) &&
              bytes[k + 1] == "D".charCodeAt(0)
            ) {
              b = k + 1;
              console.log("b after ED", b);
              break;
            }
            if (
              bytes[k] == "d".charCodeAt(0) ||
              bytes[k] == "w".charCodeAt(0) ||
              bytes[k] == "o".charCodeAt(0) ||
              bytes[k] == "l".charCodeAt(0)
            ) {
              // hexid++;
            }
          }
        }
      }

      ///repat conditon
      if (bytes[b] == "l".charCodeAt(0)) {
        loopflag = true;
        var hexidloopoffset = 0;
        hexid++;
        console.log("in repat");
        iterartions = parseInt(bytes[b + 3]);
        repartstart = b + 4;
        b += 4;
      }
      if (bytes[b] == "E".charCodeAt(0) && bytes[b + 1] == "L".charCodeAt(0)) {
        console.log("in EL");
        iterartions--;
        if (iterartions > 0) {
          b = repartstart;
          hexid = hexid - hexidloopoffset + 1;
          hexidloopoffset = 0;
          await timer(50);
        } else {
          loopflag = false;
        }
      }

      ///wait conditon
      if (bytes[b] == "w".charCodeAt(0)) {
        hexid++;
        console.log(programs[hexid], "hexid", hexid);
        var myImage = document.getElementById(`${programs[hexid].id}`);
        myImage.style.stroke = "#5ed649";
        console.log("inside wait conditon");
        var w1 = parseInt(bytes[b + 1]).toString(2);
        var w2 = parseInt(bytes[b + 2]).toString(2);
        var w3 = parseInt(bytes[b + 3]).toString(2);
        var w4 = parseInt(bytes[b + 4]).toString(2);
        var wait = w1 + w2 + w3 + w4;
        console.log(wait);
        wait = parseInt(wait, 2);
        console.log(wait);
        await timer(wait);
        myImage.style.stroke = "white";
        console.log("wait over");
        b = b + 4;
      }

      ///output condition
      if (bytes[b] == "o".charCodeAt(0)) {
        hexid++;
        console.log(programs[hexid], "hexid", hexid);
        var myImage = document.getElementById(`${programs[hexid].id}`);
        myImage.style.stroke = "#5ed649";
        console.log("inside output condition");
        var i = b + 2;
        while (bytes[i] != "}".charCodeAt(0)) {
          //console.log("byte:", bytes[i]);
          // console.log("on/off:", bytes[i + 2]);
          switch (parseInt(bytes[i])) {
            case 1: {
              ///a1
              if (parseInt(bytes[i + 2]) > 0) {
                console.log("PORT A IS ON");
                document.getElementById(`img_A1`).style.filter =
                  "drop-shadow(0 0 10px #07b03f)";
                //document.getElementById("a1").style.visibility = "visible";
              } else if (bytes[i + 2] == "0") {
                console.log("PORT A IS OFF");
                document.getElementById(`img_A1`).style.filter =
                  "drop-shadow(0 0 0)";
                //document.getElementById("a1").style.visibility = "hidden";
              }
              i = i + 2;
              break;
            }
            case 2: {
              ///a2
              if (parseInt(bytes[i + 2]) > 0) {
                //console.log("SMILE LED1 ON");
                document.getElementById(`img_A1`).style.filter =
                  "drop-shadow(0 0 10px #07b03f)";
              } else if (bytes[i + 2] == "0") {
                //console.log("SMILE LED1 OFF");
                document.getElementById(`img_A1`).style.filter =
                  "drop-shadow(0 0 0)";
              }
              i = i + 2;
              break;
            }
            case 3: {
              //b1
              if (parseInt(bytes[i + 2]) > 0) {
                //console.log("SMILE LED1 ON");
                document.getElementById(`img_B1`).style.filter =
                  "drop-shadow(0 0 10px #07b03f)";
              } else if (bytes[i + 2] == "0") {
                //console.log("SMILE LED1 OFF");
                document.getElementById(`img_B1`).style.filter =
                  "drop-shadow(0 0 0)";
              }
              i = i + 2;
              break;
            }
            case 4: {
              //b2
              if (parseInt(bytes[i + 2]) > 0) {
                //console.log("SMILE LED1 ON");
                document.getElementById(`img_B1`).style.filter =
                  "drop-shadow(0 0 10px #07b03f)";
              } else if (bytes[i + 2] == "0") {
                //console.log("SMILE LED1 OFF");
                document.getElementById(`img_B1`).style.filter =
                  "drop-shadow(0 0 0)";
              }
              i = i + 2;
              break;
            }
            case 5: {
              //c1
              if (parseInt(bytes[i + 2]) > 0) {
                //console.log("SMILE LED1 ON");
                document.getElementById(`img_C1`).style.filter =
                  "drop-shadow(0 0 10px #07b03f)";
              } else if (bytes[i + 2] == "0") {
                //console.log("SMILE LED1 OFF");
                document.getElementById(`img_C1`).style.filter =
                  "drop-shadow(0 0 0)";
              }
              i = i + 2;
              break;
            }
            case 6: {
              //c2
              if (parseInt(bytes[i + 2]) > 0) {
                //console.log("SMILE LED1 ON");
                document.getElementById(`img_C1`).style.filter =
                  "drop-shadow(0 0 10px #07b03f)";
              } else if (bytes[i + 2] == "0") {
                //console.log("SMILE LED1 OFF");
                document.getElementById(`img_C1`).style.filter =
                  "drop-shadow(0 0 0)";
              }
              i = i + 2;
              break;
            }
            case 7: {
              //d1
              if (parseInt(bytes[i + 2]) > 0) {
                //console.log("SMILE LED1 ON");
                document.getElementById(`img_D1`).style.filter =
                  "drop-shadow(0 0 10px #07b03f)";
              } else if (bytes[i + 2] == "0") {
                //console.log("SMILE LED1 OFF");
                document.getElementById(`img_D1`).style.filter =
                  "drop-shadow(0 0 0)";
              }
              i = i + 2;
              break;
            }
            case 8: {
              //d2
              if (parseInt(bytes[i + 2]) > 0) {
                //console.log("SMILE LED1 ON");
                document.getElementById(`img_D1`).style.filter =
                  "drop-shadow(0 0 10px #07b03f)";
              } else if (bytes[i + 2] == "0") {
                //console.log("SMILE LED1 OFF");
                document.getElementById(`img_D1`).style.filter =
                  "drop-shadow(0 0 0)";
              }
              i = i + 2;
              break;
            }
            case 19: {
              if (bytes[i + 2] == "1") {
                //console.log("SMILE LED1 ON");
                document.getElementById("PcSmLed1").src = renderPrgImage(
                  "PcinternalTeethActive"
                );
              } else if (bytes[i + 2] == "0") {
                //console.log("SMILE LED1 OFF");
                document.getElementById("PcSmLed1").src = renderPrgImage(
                  "PcinternalTeethInActive"
                );
              }
              i = i + 2;
              break;
            }
            case 20: {
              if (bytes[i + 2] == "1") {
                //console.log("SMILE LED2 ON");
                document.getElementById("PcSmLed2").src = renderPrgImage(
                  "PcinternalTeethActive"
                );
              } else if (bytes[i + 2] == "0") {
                // console.log("SMILE LED2 OFF");
                document.getElementById("PcSmLed2").src = renderPrgImage(
                  "PcinternalTeethInActive"
                );
              }
              i = i + 2;
              break;
            }
            case 21: {
              if (bytes[i + 2] == "1") {
                //console.log("SMILE LED3 ON");
                document.getElementById("PcSmLed3").src = renderPrgImage(
                  "PcinternalTeethActive"
                );
              } else if (bytes[i + 2] == "0") {
                // console.log("SMILE LED3 OFF");
                document.getElementById("PcSmLed3").src = renderPrgImage(
                  "PcinternalTeethInActive"
                );
              }
              i = i + 2;
              break;
            }
            case 22: {
              if (bytes[i + 2] == "1") {
                //console.log("SMILE LED4 ON");
                document.getElementById("PcSmLed4").src = renderPrgImage(
                  "PcinternalTeethActive"
                );
              } else if (bytes[i + 2] == "0") {
                //console.log("SMILE LED4 OFF");
                document.getElementById("PcSmLed4").src = renderPrgImage(
                  "PcinternalTeethInActive"
                );
              }
              i = i + 2;
              break;
            }
            case 23: {
              var bz1 = parseInt(bytes[i + 1]).toString(2);
              var bz2 = parseInt(bytes[i + 2]).toString(2);
              var bzval = parseInt(bz1 + bz2, 2);
              console.log("buzzer:", bzval);
              if (bzval > 0) {
                document.getElementById("PcInternalBuzzer").src =
                  renderPrgImage("PcinternalBuzzerActive");
                //document.getElementById("bz2").style.visibility = "visible";
              } else {
                document.getElementById("PcInternalBuzzer").src =
                  renderPrgImage("PcinternalBuzzerInActive"); //document.getElementById("bz2").style.visibility = "hidden";
              }
              break;
            }
            case 24 || 25 || 26: {
              console.log(parseInt(bytes[i + 2]), "left eye");
              if (parseInt(bytes[i + 2]) > 0) {
                console.log("Left EYE ON");
                document.getElementById("PcinternalLeftEYE").src =
                  renderPrgImage("PcinternalEYEActive");
              } else {
                console.log("Left EYE OFF");
                document.getElementById("PcinternalLeftEYE").src =
                  renderPrgImage("PcinternalEYEInActive");
              }
              i = i + 2;
              break;
            }
            case 27 || 28 || 29: {
              if (parseInt(bytes[i + 2]) > 0) {
                console.log("Right EYE ON");
                document.getElementById("PcinternalRightEYE").src =
                  renderPrgImage("PcinternalEYEActive");
              } else {
                console.log("Right EYE OFF");
                document.getElementById("PcinternalRightEYE").src =
                  renderPrgImage("PcinternalEYEInActive");
              }
              i = i + 2;
              break;
            }
            case 31: {
              //touchpad 0 output
              if (bytes[i + 2] > 0) {
                console.log("T0 ON");
                document.getElementById("PcInternalTouchpad0").src =
                  renderPrgImage("PcinternalTouchpadsActive");
              } else {
                console.log("T0 OFF");
                document.getElementById("PcInternalTouchpad0").src =
                  renderPrgImage("PcinternalTouchpadsInActive");
              }
              i = i + 2;
              break;
            }
            case 32: {
              //touchpad 1 output
              if (bytes[i + 2] > 0) {
                console.log("T1 ON");
                document.getElementById("PcInternalTouchpad1").src =
                  renderPrgImage("PcinternalTouchpadsActive");
              } else {
                console.log("T1 OFF");
                document.getElementById("PcInternalTouchpad1").src =
                  renderPrgImage("PcinternalTouchpadsInActive");
              }
              i = i + 2;
              break;
            }
            case 33: {
              //touchpad 1 output
              if (bytes[i + 2] > 0) {
                console.log("T2 ON");
                document.getElementById("PcInternalTouchpad2").src =
                  renderPrgImage("PcinternalTouchpadsActive");
              } else {
                console.log("T2 OFF");
                document.getElementById("PcInternalTouchpad2").src =
                  renderPrgImage("PcinternalTouchpadsInActive");
              }
              i = i + 2;
              break;
            }
          }
          i++;
          // console.log(bytes);
          //console.log("output loop count", i);
        }
        myImage.style.stroke = "white";

        b = i;
      }
      //console.log("byte:", bytes[b]);
    }
    // reset(resetflag);

    document.getElementById("paly_pause_btn").src =
      renderPrgImage("playrunBtn");
    //this.setState({ paly_pause_btn: !this.state.paly_pause_btn });
    setTimeout(() => {
      //timeout set to delay setting of sessionstaorage so that pause icon is rendered properly
      sessionStorage.setItem("play_btn", "true");
    }, 5);

    console.log("broken loop");
  }
  startsimulate = () => {
    let bytes = sessionStorage.getItem("convert_Bytes");
    var programBytes = bytes.split(",").slice(67);
    //console.log("heelloo", programBytes);
    let data = JSON.parse(sessionStorage.getItem("simulate"));
    // console.log("heelloo", data);
    this.processbytes(programBytes);
  };

  saveProgram = () => {
    this.props.history.push("/saveprogram");
  };

  uploadProgram = () => {
    let bytes = sessionStorage.getItem("convert_Bytes");
    var data = bytes.split(",");
    console.log(data, "KAMAL SIMULATE");
    this.myRef.current.upload();
    this.writePort(data);
    console.log("UPLOAD DATA", this.myRef.current.upload()); //it will call anyFun which is available at simulateLogic.js
  };

  indexChange = (t, component) => {
    if (component == "switchComponents") {
      switch (t) {
        // HW/SW
        case 0: {
          let index = document.querySelector(".animation");

          document.getElementById("hex-Board-Grid").style.display = "none";
          index.style.zIndex = "0";
          document.getElementById("HW/SW-Display").style.zIndex = "1";
          document.getElementById("HW/SW-Display").style.display = "block";

          this.setState({
            countClick: 1,
          });
          break;
        }
        // SW
        case 1: {
          let index = document.querySelector(".animation");
          index.style.zIndex = "-1";

          document.getElementById("hex-Board-Grid").style.display = "block";
          document.getElementById("HW/SW-Display").style.zIndex = "-1";
          this.setState({
            countClick: 2,
            clicked: true,
          });

          break;
        }

        // HW
        case 2: {
          let index = document.querySelector(".animation");
          index.style.zIndex = "10";

          document.getElementById("hex-Board-Grid").style.display = "block";

          document.getElementById("HW/SW-Display").style.zIndex = "-1";

          this.setState({
            countClick: 0,
          });
          break;
        }
      }
    } else {
      this.setState({ clicked: false });
      let index = document.querySelector(".animation");
      index.style.zIndex = "0";
    }

    // if (t === "clicked") {
    //   this.setState({ clicked: true });
    //   let index = document.querySelector(".animation");
    //   index.style.zIndex = "1000";
    // }
    //  else {
    //   this.setState({ clicked: false });
    //   let index = document.querySelector(".animation");
    //   index.style.zIndex = "-1";
    // }
  };

  closeModel = () => {
    let value = document.getElementById("inputValue").value;
    let data = JSON.parse(sessionStorage.getItem("simulate"));
    console.log("closeModel", this.state.compPort);
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].componentName === this.state.componentClicked &&
        data[i].port === this.state.compPort
      ) {
        data[i].value = value;
      }
    }
    console.log("close modal clicked");
    this.setState({
      model: false,
      rangeValue_: 0,
      rangeCountNumber_: 0,
    });
    //sessionStorage.setItem("simulate", JSON.stringify(data));
    // CHANGING THE FOCUS
    let index = document.querySelector(".animation");
    index.style.zIndex = "10";
  };

  updateState = (
    values,
    compName,

    realName,
    rangeValue,
    currvalueRange,
    compPort
  ) => {
    this.setState({
      model: values,
      componentClicked: realName,
      compName: compName,
      compPort: compPort,
      rangeValue_: rangeValue,
      rangeCountNumber_: currvalueRange,
    });

    this.indexChange();
  };
  rangeNumeberHandler = (e) => {
    this.setState({
      rangeCountNumber_: e.target.value,
    });
  };
  render() {
    //bytes code
    console.log("props", this.props);

    var takingInput = (
      <Modal
        isOpen={this.state.model}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* < img onClick={this.closeModel} className="closeconceptModal" src="images/login/button_exit@2x.png"></img> */}
        <div className="connectconceptMsg">
          <h3>
            {/* Give an input for the{" "} */}
            <span
              style={{
                textTransform: "uppercase",

                position: "absolute",
                position: "absolute",
                top: "15%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {this.state.compName}
            </span>
          </h3>
          {/* <input type="number" id="inputValue" min="0" />  */}

          <div style={{ display: "flex" }}>
            <input
              type="range"
              style={styleSimulate_.rangeStyle_}
              id="inputValue"
              min="0"
              max={this.state.rangeValue_}
              value={this.state.rangeCountNumber_}
              onChange={this.rangeNumeberHandler}
            />

            <div style={styleSimulate_.numberStyle}>
              {this.state.rangeCountNumber_}
            </div>
          </div>
          {/* <div style={{ width: " 90%" }}>
          <SliderRangeTwo />
        </div> */}
          <button
            className="BtnPopup"
            style={{ marginTop: "8%" }}
            onClick={this.closeModel}
          >
            OK
          </button>
        </div>
      </Modal>
    );
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          // backgroundColor: "rgb(166, 209, 225)",
          backgroundColor: "#fff",
          overflowY: "hidden",
        }}
      >
        <div className="navbarContainer">
          <div className="navbar_content">
            <div className="navbar_new ">Select</div>
            <div className="navbar_new ">Assemble</div>
            <div className="navbar_new">Code</div>
            <div className="navbar_new isActive">Simulate</div>
          </div>

          <img
            src={renderPrgImage("assemblebar")}
            style={{ height: "100%", width: "63%" }}
          />

          <div className="navbar-Action">
            {/* <img
              src={renderPrgImage("saveBtnInActive")}
              className="iconBtnSize"
              style={{ marginRight: "25px" }}
              onClick={this.saveProgram}
            /> */}

            {/* <img
              className="iconBtnSize"
              src={renderPrgImage("helpBtnInActive")}
              style={{ marginRight: "25px" }}
            /> */}
            {this.state.isHelp ? (
              <div className="Ss_slide">
                <SimulatePrgm />
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

        {/* BOTTOM BACK,NEXT BTN and discription*/}
        <div
          className="SelectScreenBottom"
          id="SelectScreenBottom"
          style={{ zIndex: "10" }}
        >
          <div className="bottom-child">
            {this.state.isHelp ? null : (
              <img
                className="iconBtnSize imgBackBtn"
                src={renderPrgImage("backBtn")}
                onClick={() => {
                  this.props.history.push("/logic");
                  window.location.reload(false);
                }}
              />
            )}

            {this.state.isHelp ? null : (
              <div className="simulateBtnBottom">
                {this.state.countClick == 0 ? (
                  <img
                    className="iconBtnSize simulateBtn"
                    src={renderPrgImage("HW_SW_btn")}
                    onClick={(e) =>
                      this.indexChange(
                        this.state.countClick,
                        "switchComponents"
                      )
                    }
                  />
                ) : this.state.countClick == 1 ? (
                  <img
                    className="iconBtnSize simulateBtn"
                    src={renderPrgImage("HWbtn")}
                    onClick={(e) =>
                      this.indexChange(
                        this.state.countClick,
                        "switchComponents"
                      )
                    }
                  />
                ) : (
                  <img
                    className="iconBtnSize simulateBtn"
                    src={renderPrgImage("SWbtn")}
                    onClick={(e) =>
                      this.indexChange(
                        this.state.countClick,
                        "switchComponents"
                      )
                    }
                  />
                )}{" "}
                <img
                  className="iconBtnSize simulateBtn"
                  src={renderPrgImage("oneXspeedInActive")}
                />{" "}
                {/* PLAY PAUSE */}
                <div
                  className="iconBtnSize simulateBtn"
                  onClick={() => {
                    // this.play(0, true);
                  }}
                >
                  <img
                    style={{ height: "100%", width: "100%" }}
                    id="paly_pause_btn"
                    src={
                      sessionStorage.getItem("play_btn") == "true"
                        ? renderPrgImage("playrunBtn")
                        : renderPrgImage("pauseBtn")
                    }
                    onClick={() => {
                      this.setState({
                        paly_pause_btn: !this.state.paly_pause_btn,
                      });
                      if (sessionStorage.getItem("play_btn") == "false") {
                        sessionStorage.setItem("play_btn", true);
                        console.log("play btn set");
                        //window.location.reload();
                      } else {
                        sessionStorage.setItem("play_btn", false);
                        this.startsimulate();
                        //this.myRef.current.anyFun();
                      }
                    }}
                    alt="save"
                  />
                </div>
              </div>
            )}

            {/* UPLOAD */}
            {this.state.isHelp == false ? (
              <img
                className="imgUploadBtn"
                src={renderPrgImage("uploadBtn")}
                style={{ height: "70px", width: "70px" }}
                onClick={this.uploadProgram}
              />
            ) : null}
          </div>
        </div>

        {/* <div className="CSD_simulate">
        // SAVE BTN
          <div
            onClick={this.saveProgram}
            style={{
              height: "100px",
              width: "100px",
              margin: "5px 0 0 6px",
              float: "left",
              position: "relative",
              top: "84vh",
            }}
          >
            <img
              src="images/Simulate/icon_save.png"
              style={{ height: "100%", width: "100%" }}
              alt="asddsad"
            />
          </div>
          // 
          <div upload btn
            onClick={this.uploadProgram}
            style={{
              cursor: "pointer",
              height: "100px",
              width: "100px",
              margin: "5px 0 0 6px",
              float: "left",
              position: "relative",
              top: "84vh",
            }}
          >
            <img
              src="images/Simulate/icon_upload.png"
              style={{ height: "100%", width: "100%" }}
              alt="imgasdf"
            />
          </div>
        </div> */}

        <div style={{ height: "100vh", position: "relative" }}>
          {takingInput}
          {/*HEX-BOARD Logic Screen for the simulation screen */}

          <div className="simulate_logic" id="hex-Board-Grid">
            <SimulateLogic ref={this.myRef} />
          </div>

          {/* HW/SW */}
          <div
            id="HW/SW-Display"
            style={{
              // top: "10vh",
              height: "100%",
              width: "100vw",
              position: "absolute",
              float: "left",
              display: "none",
            }}
          >
            {" "}
            <InputSlider props={this.props}></InputSlider>
          </div>

          {/* Assembly scrren for the simulation screen */}
          <div
            className="animation"
            style={{
              top: "10vh",
              height: "80%",
              width: "100vw",
              position: "absolute",
              float: "left",
            }}
          >
            {sessionStorage.getItem("connectedDevice") === "Humanoid" ? (
              <React.Fragment>
                <CustomNodeFlowHumanoid
                  compo={this.props.assembly.workspace.components}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <CustomNodeFlow
                  compo={this.props.assembly.workspace.components}
                  updateState={this.updateState}
                  indexChange={this.indexChange}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(Simulate);
