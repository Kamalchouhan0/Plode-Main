import React, { useLayoutEffect, useState, useEffect } from "react";
import Bottom from "./Bottom";
import { Nav } from "react-bootstrap";
import { useLocalStorage } from "../LocalStorage/LocalStorage";
import pcImg from "../../Assets/internalAccessories/PC_image@3x.png";
import selectImg from "../../Assets/img/select bar@2x.png";
import secondaryImg from "../../Assets/img/save - secondary.png";
import strokeImg from "../../Assets/img/button 52x52 - stroke.png";
import connectionImg from "../../Assets/usb - off@2x.png";
import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { webSerialAction } from "../../redux/actions";

import eyeInactiveImg from "../../Assets/internalAccessories/eye - inactive.484d85f3.svg";
import teethImg from "../../Assets/internalAccessories/teeth - inactive.ff84b1d3.svg";
import inImg from "../../Assets/internalAccessories/4 in 1 - inactive.ea3e994f.svg";
import internalmicImg from "../../Assets/internalAccessories/internal mic - inactive.d43d2f36.svg";
import buzzerImg from "../../Assets/internalAccessories/buzzer - inactive.872b79d8.svg";
import touchpadsImg from "../../Assets/internalAccessories/touch pads - inactive.748c6933.svg";

import PcinternalEYEActive from "../../Assets/internalAccessories/eye - active.svg";
import PcinternalEYEInActive from "../../Assets/internalAccessories/eye - inactive.svg";
import PcinternalTeethInActive from "../../Assets/internalAccessories/teeth - inactive.svg";
import PcinternalTeethActive from "../../Assets/internalAccessories/teeth - active.svg";

import Pcinternal4in1Active from "../../Assets/internalAccessories/4 in 1 - active.svg";
import Pcinternal4in1InActive from "../../Assets/internalAccessories/4 in 1 - inactive.svg";
import PcinternalMicActive from "../../Assets/internalAccessories/internal mic - inactive.svg";
import PcinternalMicInActive from "../../Assets/internalAccessories/internal mic - active.svg";
import PcinternalBuzzerInActive from "../../Assets/internalAccessories/buzzer - inactive.svg";
import PcinternalBuzzerActive from "../../Assets/internalAccessories/buzzer - active.svg";
import PcinternalTouchpadsInActive from "../../Assets/internalAccessories/touch pads - inactive.svg";
import PcinternalTouchpadsActive from "../../Assets/internalAccessories/touch pads - active.svg";

import "./pcimage.css";
import "./Navbar.css";
import "./style.css";
import renderPrgImage from "../../source/programImg";
let i = [];
let a1color = "black",
  a2color = "black";
let bttnColor = [];
let bttType = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "D1",
  "D2",
  "E1",
  "E2",
  "F1",
  "F2",
  "M1",
  "M2",
  "M3",
  "M4",
];
for (let i = 0; i < 16; i++) {
  bttnColor[i] = "black";
  if (JSON.parse(sessionStorage.getItem(bttType[i]))) bttnColor[i] = "white";
}

if (JSON.parse(sessionStorage.getItem("A1"))) a1color = "white";
if (JSON.parse(sessionStorage.getItem("A2"))) a2color = "white";

for (let j = 0; j < 8; j++) i[j] = 1;
let pa1 = false;
const Port = (props) => {
  const history = useHistory();

  const [isUsb, setUsb] = useState(false);
  const [p1, setP1] = useState({
    selected: false,
    port: {},
  });
  const HdleUsb = async (e) => {
    const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];
    const port = await navigator.serial.requestPort({ filters });
    if (port.onconnect == null) {
      setUsb(true);
    }
  };
  useEffect(() => {
    let no_port = props.webSerial;
    if (typeof no_port !== undefined) {
      console.log("WORKING>>>>>>>>");
      OpenReadComPort();
    }
    let data = JSON.parse(sessionStorage.getItem("user"));

    if (data === 1) {
      setUsb(true);
    }
    if (data === 0) {
      setUsb(false);
    }
  });
  useEffect(async () => {
    navigator.serial.addEventListener("connect", (e) => {
      setUsb(true);
      var user = 1;
      sessionStorage.setItem("user", JSON.stringify(user));
    });

    navigator.serial.addEventListener("disconnect", async (e) => {
      setUsb(false);
      var user = 0;
      sessionStorage.setItem("user", JSON.stringify(user));
      const p_Port = props.webSerial;
      try {
        await p_Port.close();
      } catch (e) {}
    });

    try {
      const portList = await navigator.serial.getPorts();

      if (portList.length === 1) {
        console.log(portList, "Hardware connected");

        await props.webSerialAction({ port: portList[0] }); // dispatching function of redux

        // setP1({
        //   selected: true,
        //   port: portList[0],
        // });
      } else {
        console.log("No hardware");

        // setP1({ p1 });
      }
    } catch (err) {
      console.log(err.message);
    }
  });

  const OpenReadComPort = async () => {
    const p_Port = props.webSerial;

    console.log(props, "p_Port");

    try {
      console.log("OPENED");
      await p_Port.open({ baudRate: 115200 });
    } catch (e) {
      console.log(e);
    }

    console.log(p_Port, "p_Port");
  };

  useLayoutEffect(() => {
    return () => {
      console.log(
        "GSK",
        JSON.parse(sessionStorage.getItem("A1")),
        typeof JSON.parse(sessionStorage.getItem("A1"))
      );
      // if(JSON.parse(sessionStorage.getItem("A1")))
      //   a1color="white"
      // else
      //   a1color="black"
      // if(JSON.parse(sessionStorage.getItem("A2")))
      //   a2color="white"
      // else
      //   a2color="black"
      for (let i = 0; i < 16; i++) {
        if (JSON.parse(sessionStorage.getItem(bttType[i])))
          bttnColor[i] = "white";
        else bttnColor[i] = "black";
      }

      //  myFunction1();
    };
  });
  const next = () => {
    history.push("/flow/input-output");
  };
  const backBtnAction = () => {
    history.push("/flow/InternalAccessories");
  };
  const [a1, setA1] = useLocalStorage("A1", false);
  const [a2, setA2] = useLocalStorage("A2", false);
  const [a, setA] = useLocalStorage("A", false);
  const [b1, setB1] = useLocalStorage("B1", false);
  const [b2, setB2] = useLocalStorage("B2", false);
  const [b, setB] = useLocalStorage("B", false);
  const [c1, setC1] = useLocalStorage("C1", false);
  const [c2, setC2] = useLocalStorage("C2", false);
  const [c, setC] = useLocalStorage("C", false);
  const [d1, setD1] = useLocalStorage("D1", false);
  const [d2, setD2] = useLocalStorage("D2", false);
  const [d, setD] = useLocalStorage("D", false);
  const [e1, setE1] = useLocalStorage("E1", false);
  const [e2, setE2] = useLocalStorage("E2", false);
  const [e, setE] = useLocalStorage("E", false);
  const [f1, setF1] = useLocalStorage("F1", false);
  const [f2, setF2] = useLocalStorage("F2", false);
  const [f, setF] = useLocalStorage("F", false);
  const [m1, setM1] = useLocalStorage("M1", false);
  const [m2, setM2] = useLocalStorage("M2", false);
  const [m, setM] = useLocalStorage("M", false);
  const [m3, setM3] = useLocalStorage("M3", false);
  const [m4, setM4] = useLocalStorage("M4", false);
  const [n, setN] = useLocalStorage("N", false);
  const [aUltra, setAUltra] = useLocalStorage(
    "AUltra",
    JSON.parse(sessionStorage.getItem("AUltra"))
  );
  const [bRGB, setBRGB] = useLocalStorage(
    "BRGB",
    JSON.parse(sessionStorage.getItem("BRGB"))
  );
  const [bMP3, setBMP3] = useLocalStorage(
    "BMP3",
    JSON.parse(sessionStorage.getItem("BMP3"))
  );
  const [dOLED, setDOLED] = useLocalStorage(
    "DOLED",
    JSON.parse(sessionStorage.getItem("DOLED"))
  );

  const [cUltra, setCUltra] = useLocalStorage(
    "CUltra",
    JSON.parse(sessionStorage.getItem("CUltra"))
  );
  const [a1Servo, setA1Servo] = useLocalStorage(
    "A1Servo",
    JSON.parse(sessionStorage.getItem("A1Servo"))
  );
  const [a2Servo, setA2Servo] = useLocalStorage(
    "A2Servo",
    JSON.parse(sessionStorage.getItem("A2Servo"))
  );
  const [b1Servo, setB1Servo] = useLocalStorage(
    "B1Servo",
    JSON.parse(sessionStorage.getItem("B1Servo"))
  );
  const [b2Servo, setB2Servo] = useLocalStorage(
    "B2Servo",
    JSON.parse(sessionStorage.getItem("B2Servo"))
  );
  const [c1Servo, setC1Servo] = useLocalStorage(
    "C1Servo",
    JSON.parse(sessionStorage.getItem("C1Servo"))
  );
  const [c2Servo, setC2Servo] = useLocalStorage(
    "C2Servo",
    JSON.parse(sessionStorage.getItem("C2Servo"))
  );
  const [d1Servo, setD1Servo] = useLocalStorage(
    "D1Servo",
    JSON.parse(sessionStorage.getItem("D1Servo"))
  );
  const [d2Servo, setD2Servo] = useLocalStorage(
    "D2Servo",
    JSON.parse(sessionStorage.getItem("D2Servo"))
  );

  const isDistanceSensors = JSON.parse(
    sessionStorage.getItem("isDistanceSensors")
  );
  const isGestureSensor = JSON.parse(sessionStorage.getItem("isGestureSensor"));
  const isLightSensor = JSON.parse(sessionStorage.getItem("isLightSensor"));
  const isColorSensor = JSON.parse(sessionStorage.getItem("isColorSensor"));
  const isTemperature = JSON.parse(sessionStorage.getItem("isTemperature"));
  const isMic = JSON.parse(sessionStorage.getItem("isMic"));
  const isTouchZero = JSON.parse(sessionStorage.getItem("isTouchZero"));
  const isTouchOne = JSON.parse(sessionStorage.getItem("isTouchOne"));
  const isTouchTwo = JSON.parse(sessionStorage.getItem("isTouchTwo"));
  const isTouchZeroOutput = JSON.parse(
    sessionStorage.getItem("isTouchZeroOutput")
  );
  const isTouchOneOutput = JSON.parse(
    sessionStorage.getItem("isTouchOneOutput")
  );
  const isTouchTwoOutput = JSON.parse(
    sessionStorage.getItem("isTouchTwoOutput")
  );
  const isEyeLeft = JSON.parse(sessionStorage.getItem("isEyeLeft"));
  const isEyeRight = JSON.parse(sessionStorage.getItem("isEyeRight"));
  const isbuzzer = JSON.parse(sessionStorage.getItem("isBuzzer"));
  const isSimeleOne = JSON.parse(sessionStorage.getItem("isSmileOne"));
  const isSimeleTwo = JSON.parse(sessionStorage.getItem("isSmileTwo"));
  const isSimeleThree = JSON.parse(sessionStorage.getItem("isSmileThree"));
  const isSimeleFour = JSON.parse(sessionStorage.getItem("isSmileFour"));

  const onA1ValueChange = async () => {
    setA1(!a1);
    if (a1 === false && a2 === true) {
      setA(true);
    } else {
      setA(false);
    }
  };

  const onA2ValueChange = () => {
    setA2(!a2);
    if (a1 === true && a2 === false) {
      setA(true);
    } else {
      setA(false);
    }
  };

  const onB1ValueChange = () => {
    setB1(!b1);
    if (b1 === false && b2 === true) {
      setB(true);
    } else {
      setB(false);
    }
  };
  const onB2ValueChange = () => {
    setB2(!b2);
    if (b1 === true && b2 === false) {
      setB(true);
    } else {
      setB(false);
    }
  };

  const onC1ValueChange = () => {
    setC1(!c1);
    if (c1 === false && c2 === true) {
      setC(true);
    } else {
      setC(false);
    }
  };
  const onC2ValueChange = () => {
    setC2(!c2);
    if (c1 === true && c2 === false) {
      setC(true);
    } else {
      setC(false);
    }
  };

  const onD1ValueChange = () => {
    setD1(!d1);
    if (d1 === false && d2 === true) {
      setD(true);
    } else {
      setD(false);
    }
  };
  const onD2ValueChange = () => {
    setD2(!d2);
    if (d1 === true && d2 === false) {
      setD(true);
    } else {
      setD(false);
    }
  };
  const onE1ValueChange = async () => {
    setE1(!e1);
    if (e1 === false && e2 === true) {
      setE(true);
    } else {
      setE(false);
    }
  };

  const onE2ValueChange = () => {
    setE2(!e2);
    if (e1 === true && e2 === false) {
      setE(true);
    } else {
      setE(false);
    }
  };

  const onF1ValueChange = () => {
    setF1(!f1);
    if (f1 === false && f2 === true) {
      setF(true);
    } else {
      setF(false);
    }
  };
  const onF2ValueChange = () => {
    setF2(!f2);
    if (f1 === true && f2 === false) {
      setF(true);
    } else {
      setF(false);
    }
  };

  const onM1ValueChange = () => {
    setM1(!m1);
    if (m1 === false && m2 === true) {
      setM(true);
    } else {
      setM(false);
    }
  };
  const onM2ValueChange = () => {
    setM2(!m2);
    if (m1 === true && m2 === false) {
      setM(true);
    } else {
      setM(false);
    }
  };

  const onM3ValueChange = () => {
    setM3(!m3);
    if (m3 === false && m4 === true) {
      setN(true);
    } else {
      setN(false);
    }
  };
  const onM4ValueChange = () => {
    setM4(!m4);
    if (m3 === true && m4 === false) {
      setN(true);
    } else {
      setN(false);
    }
  };
  function findIndex(array, string) {
    var index = [];
    for (var i = 0; i < array.length; i++) {
      if (
        array[i].indexOf(string) > -1 &&
        array[i].indexOf("rgb1") == -1 &&
        array[i].indexOf("rgb2") == -1 &&
        array[i].indexOf(`${string}-I/O`) == -1
      ) {
        index.push(i);
      }
    }
    return index;
  }
  function findIndex_new(array, string) {
    var index = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i].indexOf(string) > -1 && array[i].indexOf("countRGB") == -1) {
        index.push(i);
      }
    }
    return index;
  }
  const myFunction1 = async () => {
    await JSON.parse(sessionStorage.getItem("A1"));
    if (await JSON.parse(sessionStorage.getItem("A1"))) {
      document.getElementById("foo1").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo1").style.cssText = "color: black; ";
      //  a1color="black"
      setAUltra(false);
      setA1Servo(false);
    }
    let a = findIndex(Object.keys(sessionStorage), "a1");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
  };
  const myFunction2 = async () => {
    console.log("A!!!GSK", await JSON.parse(sessionStorage.getItem("A1")));

    if (await JSON.parse(sessionStorage.getItem("A2"))) {
      document.getElementById("foo2").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo2").style.cssText = "color: black; ";
      setAUltra(false);
      setA2Servo(false);
    }

    let a = findIndex(Object.keys(sessionStorage), "a2");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
  };
  const myFunction3 = async () => {
    await JSON.parse(sessionStorage.getItem("B1"));
    if (await JSON.parse(sessionStorage.getItem("B1"))) {
      document.getElementById("foo3").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo3").style.cssText = "color: black; ";
      // setAUltra(false)
      setBRGB(false);
      setBMP3(false);
      setB1Servo(false);
    }

    let a = findIndex(Object.keys(sessionStorage), "b1");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
    let b = [
      ...findIndex_new(Object.keys(sessionStorage), "mp3"),
      ...findIndex_new(Object.keys(sessionStorage), "rgb"),
      ...findIndex_new(Object.keys(sessionStorage), "RGB"),
    ];
    for (let i in b) {
      sessionStorage.setItem(Object.keys(sessionStorage)[b[i]], 0);
    }
  };
  const myFunction4 = async () => {
    await JSON.parse(sessionStorage.getItem("B2"));
    if (await JSON.parse(sessionStorage.getItem("B2"))) {
      document.getElementById("foo4").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo4").style.cssText = "color: black; ";
      setBRGB(false);
      setB2Servo(false);
    }

    let a = findIndex(Object.keys(sessionStorage), "b2");
    let b = [
      ...findIndex_new(Object.keys(sessionStorage), "mp3"),
      ...findIndex_new(Object.keys(sessionStorage), "rgb"),
      ...findIndex_new(Object.keys(sessionStorage), "RGB"),
    ];
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
    for (let i in b) {
      sessionStorage.setItem(Object.keys(sessionStorage)[b[i]], 0);
    }
  };
  const myFunction5 = async () => {
    await JSON.parse(sessionStorage.getItem("C1"));
    if (await JSON.parse(sessionStorage.getItem("C1"))) {
      document.getElementById("foo5").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo5").style.cssText = "color: black; ";
      setCUltra(false);
      setC1Servo(false);
    }

    let a = findIndex(Object.keys(sessionStorage), "c1");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
  };
  const myFunction6 = async () => {
    await JSON.parse(sessionStorage.getItem("C2"));
    if (await JSON.parse(sessionStorage.getItem("C2"))) {
      document.getElementById("foo6").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo6").style.cssText = "color: black; ";
      setCUltra(false);
      setC2Servo(false);
    }

    let a = findIndex(Object.keys(sessionStorage), "c2");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
  };
  const myFunction7 = async () => {
    await JSON.parse(sessionStorage.getItem("D1"));
    if (await JSON.parse(sessionStorage.getItem("D1"))) {
      document.getElementById("foo7").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo7").style.cssText = "color: black; ";
      setD1Servo(false);
      setDOLED(false);
    }

    let a = findIndex(Object.keys(sessionStorage), "d1");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
    let b = findIndex_new(Object.keys(sessionStorage), "oled");
    for (let i in b) {
      sessionStorage.setItem(Object.keys(sessionStorage)[b[i]], "");
    }
    b = findIndex_new(Object.keys(sessionStorage), "oledChk");
    for (let i in b) {
      sessionStorage.setItem(Object.keys(sessionStorage)[b[i]], 0);
    }
  };
  const myFunction8 = async () => {
    await JSON.parse(sessionStorage.getItem("D2"));
    if (await JSON.parse(sessionStorage.getItem("D2"))) {
      document.getElementById("foo8").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo8").style.cssText = "color: black; ";
      setD2Servo(false);
      setDOLED(false);
    }

    let a = findIndex(Object.keys(sessionStorage), "d2");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
    let b = findIndex_new(Object.keys(sessionStorage), "oled");
    for (let i in b) {
      sessionStorage.setItem(Object.keys(sessionStorage)[b[i]], 0);
    }
    b = findIndex_new(Object.keys(sessionStorage), "oledChk");
    for (let i in b) {
      sessionStorage.setItem(Object.keys(sessionStorage)[b[i]], 0);
    }
  };
  const myFunction9 = async () => {
    await JSON.parse(sessionStorage.getItem("E1"));
    if (await JSON.parse(sessionStorage.getItem("E1"))) {
      document.getElementById("foo9").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo9").style.cssText = "color: black; ";
    }

    let a = findIndex(Object.keys(sessionStorage), "e1");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
  };
  const myFunction10 = async () => {
    await JSON.parse(sessionStorage.getItem("E2"));
    if (await JSON.parse(sessionStorage.getItem("E2"))) {
      document.getElementById("foo10").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo10").style.cssText = "color: black; ";
    }

    let a = findIndex(Object.keys(sessionStorage), "e2");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
  };
  const myFunction11 = async () => {
    await JSON.parse(sessionStorage.getItem("F1"));
    if (await JSON.parse(sessionStorage.getItem("F1"))) {
      document.getElementById("foo11").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo11").style.cssText = "color: black; ";
    }

    let a = findIndex(Object.keys(sessionStorage), "f1");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
  };
  const myFunction12 = async () => {
    await JSON.parse(sessionStorage.getItem("F2"));
    if (await JSON.parse(sessionStorage.getItem("F2"))) {
      document.getElementById("foo12").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo12").style.cssText = "color: black; ";
    }

    let a = findIndex(Object.keys(sessionStorage), "f2");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
  };
  const myFunction13 = async () => {
    await JSON.parse(sessionStorage.getItem("M1"));
    if (await JSON.parse(sessionStorage.getItem("M1"))) {
      document.getElementById("foo13").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo13").style.cssText = "color: black; ";
    }

    let a = findIndex(Object.keys(sessionStorage), "m1");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
  };
  const myFunction14 = async () => {
    await JSON.parse(sessionStorage.getItem("M2"));
    if (await JSON.parse(sessionStorage.getItem("M2"))) {
      document.getElementById("foo14").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo14").style.cssText = "color: black; ";
    }

    let a = findIndex(Object.keys(sessionStorage), "m2");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
  };
  const myFunction15 = async () => {
    await JSON.parse(sessionStorage.getItem("M3"));
    if (await JSON.parse(sessionStorage.getItem("M3"))) {
      document.getElementById("foo15").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo15").style.cssText = "color: black; ";
    }

    let a = findIndex(Object.keys(sessionStorage), "m3");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
  };
  const myFunction16 = async () => {
    await JSON.parse(sessionStorage.getItem("M4"));
    if (await JSON.parse(sessionStorage.getItem("M4"))) {
      document.getElementById("foo16").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo16").style.cssText = "color: black; ";
    }

    let a = findIndex(Object.keys(sessionStorage), "m4");
    console.log("gsk", a);
    for (let i in a) {
      sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
    }
  };
  return (
    <>
      <div className="HeaderContainer">
        <div
          className="flowchart-navbarContainer navbarContainer"
          style={{ zIndex: "1000" }}
        >
          <div className="flowchart-navbar_content navbar_content">
            <div className="flowchart-navbar_new navbar_new isActive" href="/">
              Select Ports
            </div>
            <div
              className="flowchart-navbar_new navbar_new"
              href="/input-output"
              eventKey="link-1"
            >
              Input/Output
            </div>
            <div
              className="flowchart-navbar_new navbar_new "
              href="/digital-analog"
              eventKey="link-2"
            >
              Digital/Analog
            </div>
            <div
              className="flowchart-navbar_new navbar_new"
              href="/flowchart"
              eventKey="link-3"
            >
              Flowchart
            </div>
          </div>
          <img
            src={selectImg}
            style={{
              height: "100%",
              width: "17%",
              position: "relative",
              right: "43vw",
            }}
          />
          <div className="flowchart-navbar-Action navbar-Action">
            <img
              className="flowchart-iconBtnSize iconBtnSize"
              style={{ width: "61px", height: "61px", marginRight: "10px" }}
              src={secondaryImg}
            ></img>
            <img
              className="flowchart-iconBtnSize iconBtnSize"
              style={{ width: "61px", height: "61px", marginRight: "10px" }}
              src={strokeImg}
            ></img>
            {/* <img style={{ marginRight: "0px" }} src={connectionImg}></img> */}
            {isUsb ? (
              <img src={renderPrgImage("usbON")} onClick={HdleUsb} />
            ) : (
              <img src={renderPrgImage("usbOFF")} onClick={HdleUsb} />
            )}
          </div>
        </div>
        {/* <img
          className="last-item"
          src={process.env.PUBLIC_URL + "/img/button 52x52 - stroke.png"}
        ></img>
        <img
          className="last-item"
          src={process.env.PUBLIC_URL + "img/connection status - on.png"}
        ></img> */}
      </div>
      <div className="MainContainer">
        <div className="CenterImg">
          <img
            src={pcImg}
            style={{
              width: "85%",
              zIndex: "110",
              top: "7%",
              position: "relative",
            }}
          />
          <div className="deviceContainer">
            {isEyeLeft ? (
              <img src={PcinternalEYEActive} className="imgStyleEyeL" />
            ) : (
              <img src={PcinternalEYEInActive} className="imgStyleEyeL" />
            )}
            {isEyeRight ? (
              <img src={PcinternalEYEActive} className="imgStyleEyeR" />
            ) : (
              <img src={PcinternalEYEInActive} className="imgStyleEyeR" />
            )}
            {isSimeleOne ? (
              <img src={PcinternalTeethActive} className="imgStyleTeeth1" />
            ) : (
              <img src={PcinternalTeethInActive} className="imgStyleTeeth1" />
            )}

            {isSimeleTwo ? (
              <img src={PcinternalTeethActive} className="imgStyleTeeth2" />
            ) : (
              <img src={PcinternalTeethInActive} className="imgStyleTeeth2" />
            )}

            {isSimeleThree ? (
              <img src={PcinternalTeethActive} className="imgStyleTeeth3" />
            ) : (
              <img src={PcinternalTeethInActive} className="imgStyleTeeth3" />
            )}

            {isSimeleFour ? (
              <img src={PcinternalTeethActive} className="imgStyleTeeth4" />
            ) : (
              <img src={PcinternalTeethInActive} className="imgStyleTeeth4" />
            )}

            {isDistanceSensors ||
            isColorSensor ||
            isGestureSensor ||
            isLightSensor ? (
              <img src={Pcinternal4in1Active} className="imgStyle4in1" />
            ) : (
              <img src={Pcinternal4in1InActive} className="imgStyle4in1" />
            )}

            {isMic ? (
              <img src={PcinternalMicInActive} className="imgStyleMic" />
            ) : (
              <img src={PcinternalMicActive} className="imgStyleMic" />
            )}
            {isbuzzer ? (
              <img src={PcinternalBuzzerActive} className="imgStyleBuzzer" />
            ) : (
              <img src={PcinternalBuzzerInActive} className="imgStyleBuzzer" />
            )}

            {isTouchZero ? (
              <img
                src={PcinternalTouchpadsActive}
                className="imgStyleTouchpads1"
              />
            ) : (
              <img
                src={PcinternalTouchpadsInActive}
                className="imgStyleTouchpads1"
              />
            )}
            {isTouchOne ? (
              <img
                src={PcinternalTouchpadsActive}
                className="imgStyleTouchpads2"
              />
            ) : (
              <img
                src={PcinternalTouchpadsInActive}
                className="imgStyleTouchpads2"
              />
            )}

            {isTouchTwo ? (
              <img
                src={PcinternalTouchpadsActive}
                className="imgStyleTouchpads3"
              />
            ) : (
              <img
                src={PcinternalTouchpadsInActive}
                className="imgStyleTouchpads3"
              />
            )}
          </div>
        </div>
        <div className="ports-Container">
          {/* <div className="properties-Container">
              <div className="properties-b">
                  <div className="properties-bIn">
                    <span className="properties-InputLabel">
                      <input
                        className="properties-InputCheckBox"
                        type="checkbox"
                        checked={a1}
                        onClick={() => myFunction1()}
                        onChange={() => onA1ValueChange()}
                      />
                      <span disabled="disabled" className="A1" >
                        A1
                      </span>
                    </span>
                    <span className="properties-InputLabel">
                      <input
                        className="properties-InputCheckBox"
                        type="checkbox"
                        // checked={a2}
                        // onClick={() => myFunction2()}
                        // onChange={() => onA2ValueChange()}
                      />
                      <span disabled="disabled" className="A1">
                        A2
                      </span>
                    </span>
                    <span className="properties-InputLabel">
                      <input
                        className="properties-InputCheckBox"
                        type="checkbox"
                        // checked={a2}
                        // onClick={() => myFunction2()}
                        // onChange={() => onA2ValueChange()}
                      />
                      <span disabled="disabled" className="A1" >
                        A2
                      </span>
                    </span>
                  </div>
              </div>
            </div> */}
          <div className="ButtonDiv">
            {/* A PORT */}
            <div className="tlb">
              <div className="tlbIn ">
                <span
                  className={
                    "InputLabel " +
                    "InputLabel-" +
                    (JSON.parse(sessionStorage.getItem("isTouchZero")) ||
                      JSON.parse(sessionStorage.getItem("isTouchZeroOutput")))
                  }
                >
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={a1}
                    onClick={() => myFunction1()}
                    onChange={() => onA1ValueChange()}
                    disabled={
                      JSON.parse(sessionStorage.getItem("isTouchZero")) ||
                      JSON.parse(sessionStorage.getItem("isTouchZeroOutput"))
                    }
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo1"
                    style={{ color: bttnColor[0] }}
                  >
                    A1
                  </span>
                </span>
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={a2}
                    onClick={() => myFunction2()}
                    onChange={() => onA2ValueChange()}
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo2"
                    style={{ color: bttnColor[1] }}
                  >
                    A2
                  </span>
                </span>
              </div>
            </div>
            {/* B PORT */}
            <div className="tlb">
              <div className="tlbIn ">
                <span
                  className={
                    "InputLabel " +
                    " InputLabel-" +
                    (JSON.parse(sessionStorage.getItem("isTouchOne")) ||
                      JSON.parse(sessionStorage.getItem("isTouchOneOutput")))
                  }
                >
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={b1}
                    onClick={() => myFunction3()}
                    onChange={() => onB1ValueChange()}
                    disabled={
                      JSON.parse(sessionStorage.getItem("isTouchOne")) ||
                      JSON.parse(sessionStorage.getItem("isTouchOneOutput"))
                    }
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo3"
                    style={{ color: bttnColor[2] }}
                  >
                    B1
                  </span>
                </span>
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={b2}
                    onClick={() => myFunction4()}
                    onChange={() => onB2ValueChange()}
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo4"
                    style={{ color: bttnColor[3] }}
                  >
                    B2
                  </span>
                </span>
              </div>
            </div>
            {/* E PORT */}
            <div className="tlb">
              <div className="tlbIn ">
                <span className="InputLabel-true">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={e1}
                    onClick={() => myFunction9()}
                    onChange={() => onE1ValueChange()}
                    disabled={true}
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo9"
                    style={{ color: bttnColor[8] }}
                  >
                    E1
                  </span>
                </span>
                <span className="InputLabel-true">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={e2}
                    onClick={() => myFunction10()}
                    onChange={() => onE2ValueChange()}
                    disabled={true}
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo10"
                    style={{ color: bttnColor[9] }}
                  >
                    E2
                  </span>
                </span>
              </div>
            </div>
            {/* M1 PORT */}
            <div className="tlb">
              <div className="tlbIn ">
                <span
                  className={
                    "InputLabel" +
                    " InputLabel-" +
                    JSON.parse(sessionStorage.getItem("isSmileOne"))
                  }
                >
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={m1}
                    onClick={() => myFunction13()}
                    onChange={() => onM1ValueChange()}
                    disabled={JSON.parse(sessionStorage.getItem("isSmileOne"))}
                  />
                  <span
                    className="A1"
                    id="foo13"
                    style={{ color: bttnColor[12] }}
                  >
                    M1
                  </span>
                </span>
                <span
                  className={
                    "InputLabel" +
                    " InputLabel-" +
                    JSON.parse(sessionStorage.getItem("isSmileTwo"))
                  }
                >
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={m2}
                    onClick={() => myFunction14()}
                    onChange={() => onM2ValueChange()}
                    disabled={JSON.parse(sessionStorage.getItem("isSmileTwo"))}
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo14"
                    style={{ color: bttnColor[13] }}
                  >
                    M2
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="ButtonRightDiv">
            {/* C PORT */}
            <div className="tlb">
              <div className="tlbIn ">
                <span
                  className={
                    "InputLabel " +
                    " InputLabel-" +
                    (JSON.parse(sessionStorage.getItem("isTouchTwo")) ||
                      JSON.parse(sessionStorage.getItem("isTouchTwoOutput")))
                  }
                >
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={c1}
                    onClick={() => myFunction5()}
                    onChange={() => onC1ValueChange()}
                    disabled={
                      JSON.parse(sessionStorage.getItem("isTouchTwo")) ||
                      JSON.parse(sessionStorage.getItem("isTouchTwoOutput"))
                    }
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo5"
                    style={{ color: bttnColor[4] }}
                  >
                    C1
                  </span>
                </span>
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={c2}
                    onClick={() => myFunction6()}
                    onChange={() => onC2ValueChange()}
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo6"
                    style={{ color: bttnColor[5] }}
                  >
                    C2
                  </span>
                </span>
              </div>
            </div>
            {/* D PORT */}
            <div className="tlb">
              <div className="tlbIn ">
                <span
                  className={
                    "InputLabel" +
                    " InputLabel-" +
                    (JSON.parse(sessionStorage.getItem("isDistanceSensors")) ||
                      JSON.parse(sessionStorage.getItem("isGestureSensor")) ||
                      JSON.parse(sessionStorage.getItem("isLightSensor")) ||
                      JSON.parse(sessionStorage.getItem("isColorSensor")))
                  }
                >
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={d1}
                    onClick={() => myFunction7()}
                    onChange={() => onD1ValueChange()}
                    disabled={
                      JSON.parse(sessionStorage.getItem("isDistanceSensors")) ||
                      JSON.parse(sessionStorage.getItem("isGestureSensor")) ||
                      JSON.parse(sessionStorage.getItem("isLightSensor")) ||
                      JSON.parse(sessionStorage.getItem("isColorSensor"))
                    }
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo7"
                    style={{ color: bttnColor[6] }}
                  >
                    D1
                  </span>
                </span>
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={d2}
                    onClick={() => myFunction8()}
                    onChange={() => onD2ValueChange()}
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo8"
                    style={{ color: bttnColor[7] }}
                  >
                    D2
                  </span>
                </span>
              </div>
            </div>
            {/* F PORT */}
            <div className="tlb">
              <div className="tlbIn ">
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={f1}
                    onClick={() => myFunction11()}
                    onChange={() => onF1ValueChange()}
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo11"
                    style={{ color: bttnColor[10] }}
                  >
                    F1
                  </span>
                </span>
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={f2}
                    onClick={() => myFunction12()}
                    onChange={() => onF2ValueChange()}
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo12"
                    style={{ color: bttnColor[11] }}
                  >
                    F2
                  </span>
                </span>
              </div>
            </div>
            {/* M2 PORT */}
            <div className="tlb">
              <div className="tlbIn ">
                <span
                  className={
                    "InputLabel " +
                    " InputLabel-" +
                    JSON.parse(sessionStorage.getItem("isSmileThree"))
                  }
                >
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={m3}
                    onClick={() => myFunction15()}
                    onChange={() => onM3ValueChange()}
                    disabled={JSON.parse(
                      sessionStorage.getItem("isSmileThree")
                    )}
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo15"
                    style={{ color: bttnColor[14] }}
                  >
                    M3
                  </span>
                </span>
                <span
                  className={
                    "InputLabel " +
                    " InputLabel-" +
                    JSON.parse(sessionStorage.getItem("isSmileFour"))
                  }
                >
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={m4}
                    onClick={() => myFunction16()}
                    onChange={() => onM4ValueChange()}
                    disabled={JSON.parse(sessionStorage.getItem("isSmileFour"))}
                  />
                  <span
                    disabled="disabled"
                    className="A1"
                    id="foo16"
                    style={{ color: bttnColor[15] }}
                  >
                    M4
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="SelectScreenBottom">
        <div className="bottom-child">
          {/* <Link to="/programSelection"> */}
          <img
            className="iconBtnSize imgBackBtn"
            src={renderPrgImage("backBtn")}
            onClick={backBtnAction}
          />
          {/* </Link> */}
          <div
            className="decription"
            style={{ fontFamily: "Halcyon_SemiBold", zIndex: "999" }}
          >
            <p>Select the port you want to use</p>
          </div>

          <img
            className="iconBtnSize imgNextBtn"
            src={renderPrgImage("nextBtn")}
            onClick={next}
          />
        </div>
      </div>
    </>
  );
};

// export default Port;

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state);

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

export default connect(mapStateToProps, mapDispatchToProps)(Port);
