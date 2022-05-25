import React, { useState, useEffect, useLayoutEffect } from "react";
import Bottom from "./Bottom";
import Digitalbutton from "./Digitalbutton";
import { connect } from "react-redux";
import { webSerialAction } from "../../redux/actions";

import { Nav, ButtonGroup, ToggleButton } from "react-bootstrap";
import SwitchButton from "./SwitchButton/SwitchButtonDigital";
import useLocalStorage from "../LocalStorage/LocalStorage";
import pcImg from "../../Assets/internalAccessories/PC_image@3x.png";
import { Link, useHistory } from "react-router-dom";
import renderPrgImage from "../../source/programImg";

import digitalImg from "../../Assets/img/code bar@2x.png";
import secondaryImg from "../../Assets/img/save - secondary.png";
import strokeImg from "../../Assets/img/button 52x52 - stroke.png";
import connectionImg from "../../Assets/usb - off@2x.png";

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
import "./buttonDig.scss";
let bttnColor = [];
let bttnColor2 = [];
let bttType = [
  "A1DIGI",
  "A2DIGI",
  "B1DIGI",
  "B2DIGI",
  "C1DIGI",
  "C2DIGI",
  "D1DIGI",
  "D2DIGI",
  "F1DIGI",
  "F2DIGI",
  "E1DIGI",
  "E2DIGI",
  "M1DIGI",
  "M2DIGI",
  "M3DIGI",
  "M4DIGI",
];
for (let i = 0; i < 16; i++) {
  bttnColor[i] = "#717171";
  bttnColor2[i] = "#fcfcfc";
  if (JSON.parse(sessionStorage.getItem(bttType[i]))) {
    bttnColor[i] = "#fcfcfc";
    bttnColor2[i] = "#717171";
  }
}
function Digital(props) {
  const history = useHistory();

  const next = () => {
    history.push("/flow/flowchart");
  };

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

    navigator.serial.addEventListener("disconnect", (e) => {
      setUsb(false);
      var user = 0;
      sessionStorage.setItem("user", JSON.stringify(user));
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
      await p_Port.open({ baudRate: 120000 });
    } catch (e) {
      console.log(e);
      // p_Port.close();
      // await p_Port.open({ baudRate: 120000 });
    }

    // writePort("notWrite");
    console.log(p_Port, "p_Port");
  };

  useLayoutEffect(() => {
    return () => {
      for (let i = 0; i < 16; i++) {
        if (JSON.parse(sessionStorage.getItem(bttType[i]))) {
          bttnColor[i] = "#fcfcfc";
          bttnColor2[i] = "#717171";
        } else {
          bttnColor[i] = "#717171";
          bttnColor2[i] = "#fcfcfc";
        }
      }
    };
  });
  const backBtnAction = () => {
    history.push("/flow/input-output");
  };
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

  const A1DIGI = JSON.parse(sessionStorage.getItem("A1"));
  const A2DIGI = JSON.parse(sessionStorage.getItem("A2"));
  const B1DIGI = JSON.parse(sessionStorage.getItem("B1"));
  const B2DIGI = JSON.parse(sessionStorage.getItem("B2"));
  const C1DIGI = JSON.parse(sessionStorage.getItem("C1"));
  const C2DIGI = JSON.parse(sessionStorage.getItem("C2"));
  const D1DIGI = JSON.parse(sessionStorage.getItem("D1"));
  const D2DIGI = JSON.parse(sessionStorage.getItem("D2"));
  const F1DIGI = JSON.parse(sessionStorage.getItem("F1"));
  const F2DIGI = JSON.parse(sessionStorage.getItem("F2"));
  const E1DIGI = JSON.parse(sessionStorage.getItem("E1"));
  const E2DIGI = JSON.parse(sessionStorage.getItem("E2"));
  const M1DIGI = JSON.parse(sessionStorage.getItem("M1"));
  const M2DIGI = JSON.parse(sessionStorage.getItem("M2"));
  const M3DIGI = JSON.parse(sessionStorage.getItem("M3"));
  const M4DIGI = JSON.parse(sessionStorage.getItem("M4"));
  const SPI = JSON.parse(sessionStorage.getItem("spi"));
  const I2C = JSON.parse(sessionStorage.getItem("i2c"));
  const UART = JSON.parse(sessionStorage.getItem("uart"));

  const [a1Digi, setA1Digi] = useLocalStorage("A1DIGI", false);
  const [b1Digi, setB1Digi] = useLocalStorage("B1DIGI", false);
  const [c1Digi, setC1Digi] = useLocalStorage("C1DIGI", false);
  const [d1Digi, setD1Digi] = useLocalStorage("D1DIGI", false);
  const [a2Digi, setA2Digi] = useLocalStorage("A2DIGI", false);
  const [b2Digi, setB2Digi] = useLocalStorage("B2DIGI", false);
  const [c2Digi, setC2Digi] = useLocalStorage("C2DIGI", false);
  const [d2Digi, setD2Digi] = useLocalStorage("D2DIGI", false);
  const [f1Digi, setF1Digi] = useLocalStorage("F1DIGI", false);
  const [f2Digi, setF2Digi] = useLocalStorage("F2DIGI", false);
  const [e1Digi, setE1Digi] = useLocalStorage("E1DIGI", false);
  const [e2Digi, setE2Digi] = useLocalStorage("E2DIGI", false);
  const [m1Digi, setM1Digi] = useLocalStorage("M1DIGI", false);
  const [m2Digi, setM2Digi] = useLocalStorage("M2DIGI", false);
  const [m3Digi, setM3Digi] = useLocalStorage("M3DIGI", false);
  const [m4Digi, setM4Digi] = useLocalStorage("M4DIGI", false);

  const [a1Servo, setA1Servo] = useLocalStorage("A1Servo", false);
  const [a2Servo, setA2Servo] = useLocalStorage("A2Servo", false);

  const [b1Servo, setB1Servo] = useLocalStorage("B1Servo", false);
  const [b2Servo, setB2Servo] = useLocalStorage("B2Servo", false);
  const [c1Servo, setC1Servo] = useLocalStorage("C1Servo", false);
  const [c2Servo, setC2Servo] = useLocalStorage("C2Servo", false);

  const [d1Servo, setD1Servo] = useLocalStorage("D1Servo", false);
  const [d2Servo, setD2Servo] = useLocalStorage("D2Servo", false);

  const [pwmA1, setPwmA1] = useLocalStorage(
    "PWMA1",
    JSON.parse(sessionStorage.getItem("a1-I/O")) &&
      JSON.parse(sessionStorage.getItem("A1"))
  );
  const [pwmD1, setPwmD1] = useLocalStorage(
    "PWMD1",
    JSON.parse(sessionStorage.getItem("d1-I/O")) &&
      JSON.parse(sessionStorage.getItem("D1"))
  );
  const toggleA1 = async () => {
    if (JSON.parse(sessionStorage.getItem("a1-I/O")) === true) {
      setPwmA1(!pwmA1);
    }
    setA1Digi(!a1Digi);
    await JSON.parse(sessionStorage.getItem("A1DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("A1DIGI")))) {
      document.getElementById("in1").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s1").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in1").style.cssText = "color: #717171; ";
      document.getElementById("s1").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleA2 = async () => {
    setA2Digi(!a2Digi);
    await JSON.parse(sessionStorage.getItem("A2DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("A2DIGI")))) {
      document.getElementById("in2").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s2").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in2").style.cssText = "color: #717171; ";
      document.getElementById("s2").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleB1 = async () => {
    setB1Digi(!b1Digi);
    await JSON.parse(sessionStorage.getItem("B1DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("B1DIGI")))) {
      document.getElementById("in3").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s3").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in3").style.cssText = "color: #717171; ";
      document.getElementById("s3").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleB2 = async () => {
    setB2Digi(!b2Digi);
    await JSON.parse(sessionStorage.getItem("B2DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("B2DIGI")))) {
      document.getElementById("in4").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s4").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in4").style.cssText = "color: #717171; ";
      document.getElementById("s4").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleC1 = async () => {
    setC1Digi(!c1Digi);
    await JSON.parse(sessionStorage.getItem("C1DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("C1DIGI")))) {
      document.getElementById("in5").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s5").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in5").style.cssText = "color: #717171; ";
      document.getElementById("s5").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleC2 = async () => {
    setC2Digi(!c2Digi);
    await JSON.parse(sessionStorage.getItem("C2DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("C2DIGI")))) {
      document.getElementById("in6").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s6").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in6").style.cssText = "color: #717171; ";
      document.getElementById("s6").style.cssText = "  color: #fcfcfc;";
    }
  };

  const toggleD1 = async () => {
    if (JSON.parse(sessionStorage.getItem("d1-I/O")) === true) {
      setPwmD1(!pwmD1);
    }
    setD1Digi(!d1Digi);
    await JSON.parse(sessionStorage.getItem("D1DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("D1DIGI")))) {
      document.getElementById("in7").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s7").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in7").style.cssText = "color: #717171; ";
      document.getElementById("s7").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleD2 = async () => {
    setD2Digi(!d2Digi);
    await JSON.parse(sessionStorage.getItem("D2DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("D2DIGI")))) {
      document.getElementById("in8").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s8").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in8").style.cssText = "color: #717171; ";
      document.getElementById("s8").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleF1 = async () => {
    setF1Digi(!f1Digi);
    await JSON.parse(sessionStorage.getItem("F1DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("F1DIGI")))) {
      document.getElementById("in9").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s9").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in9").style.cssText = "color: #717171; ";
      document.getElementById("s9").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleF2 = async () => {
    setF2Digi(!f2Digi);
    await JSON.parse(sessionStorage.getItem("F2DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("F2DIGI")))) {
      document.getElementById("in10").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s10").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in10").style.cssText = "color: #717171; ";
      document.getElementById("s10").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleE1 = async () => {
    setE1Digi(!e1Digi);
    await JSON.parse(sessionStorage.getItem("E1DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("E1DIGI")))) {
      document.getElementById("in11").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s11").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in11").style.cssText = "color: #717171; ";
      document.getElementById("s11").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleE2 = async () => {
    setE2Digi(!e2Digi);
    await JSON.parse(sessionStorage.getItem("E2DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("E2DIGI")))) {
      document.getElementById("in12").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s12").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in12").style.cssText = "color: #717171; ";
      document.getElementById("s12").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleM1 = async () => {
    setM1Digi(!m1Digi);
    await JSON.parse(sessionStorage.getItem("M1DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("M1DIGI")))) {
      document.getElementById("in13").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s13").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in13").style.cssText = "color: #717171; ";
      document.getElementById("s13").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleM2 = async () => {
    setM2Digi(!m2Digi);
    await JSON.parse(sessionStorage.getItem("M2DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("M2DIGI")))) {
      document.getElementById("in14").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s14").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in14").style.cssText = "color: #717171; ";
      document.getElementById("s14").style.cssText = "  color: #fcfcfc;";
    }
  };

  const toggleM3 = async () => {
    setM3Digi(!m3Digi);
    await JSON.parse(sessionStorage.getItem("M3DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("M3DIGI")))) {
      document.getElementById("in15").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s15").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in15").style.cssText = "color: #717171; ";
      document.getElementById("s15").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleM4 = async () => {
    setM4Digi(!m4Digi);
    await JSON.parse(sessionStorage.getItem("M4DIGI"));

    if (!(await JSON.parse(sessionStorage.getItem("M4DIGI")))) {
      document.getElementById("in16").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s16").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in16").style.cssText = "color: #717171; ";
      document.getElementById("s16").style.cssText = "  color: #fcfcfc;";
    }
  };

  const togglePWMA1 = () => {
    if (a1Digi === true) {
      setPwmA1(!pwmA1);
    }
  };
  const ServoA1 = () => {
    setA1Servo(!a1Servo);
  };
  const ServoA2 = () => {
    setA2Servo(!a2Servo);
  };
  const ServoB1 = () => {
    setB1Servo(!b1Servo);
  };
  const ServoB2 = () => {
    setB2Servo(!b2Servo);
  };
  const ServoC1 = () => {
    setC1Servo(!c1Servo);
  };
  const ServoC2 = () => {
    setC2Servo(!c2Servo);
  };
  const ServoD1 = () => {
    setD1Servo(!d1Servo);
  };
  const ServoD2 = () => {
    setD2Servo(!d2Servo);
  };
  return (
    <div className="Digital">
      <div className="HeaderContainer">
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
          <div
            className="flowchart-navbarContainer navbarContainer"
            style={{ zIndex: "1000" }}
          >
            <div className="flowchart-navbar_content navbar_content">
              <div className="flowchart-navbar_new navbar_new" href="/">
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
                className="flowchart-navbar_new navbar_new isActive"
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
              src={digitalImg}
              style={{
                height: "100%",
                width: "40%",
                position: "relative",
                right: "31vw",
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
        </div>
      </div>
      <div className="MainContainerInput">
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
        <div className="Digital-ports-Container">
          {/* <div className="Digital-properties-Container">
            
          </div> */}
          <div className="digital-ButtonDivInput">
            <div className="digital-flow-left-upper">
              <div className="digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className="textsp">A1</span>
                  <div
                    class={
                      "switch-button-" +
                      ((A1DIGI &&
                        !a1Servo &&
                        !JSON.parse(sessionStorage.getItem("AUltra"))) ||
                        false)
                    }
                    id={"s1"}
                    style={{ color: bttnColor[0] }}
                  >
                    <input
                      active={a1Digi}
                      disabled={
                        !A1DIGI ||
                        a1Servo ||
                        JSON.parse(sessionStorage.getItem("AUltra")) ||
                        false
                      }
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleA1}
                      checked={a1Digi}
                    ></input>
                    <label class="switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in1"
                        style={{ color: bttnColor2[0] }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
                <br />
                <label
                  className={"input upper-label-input upper-label-input-servo"}
                >
                  <div
                    className={
                      "switch-button-servo-" +
                      ((a1Servo &&
                        !JSON.parse(sessionStorage.getItem("AUltra"))) ||
                        false)
                    }
                    id="s2"
                  >
                    <input
                      className="switch-button-checkbox-servo"
                      type="checkbox"
                      disabled={
                        !JSON.parse(sessionStorage.getItem("A1")) ||
                        !JSON.parse(sessionStorage.getItem("a1-I/O")) ||
                        JSON.parse(sessionStorage.getItem("AUltra"))
                      }
                      checked={a1Servo}
                      onChange={ServoA1}
                    ></input>
                  </div>
                </label>
                <br />
                <label className={"input upper-label-input"}>
                  <span className="textsp">A2</span>
                  <div
                    class={
                      "switch-button-" +
                      ((A2DIGI &&
                        !a2Servo &&
                        !JSON.parse(sessionStorage.getItem("AUltra"))) ||
                        false)
                    }
                    id={"s2"}
                    style={{ color: bttnColor[1] }}
                  >
                    <input
                      active={a2Digi}
                      disabled={
                        !A2DIGI ||
                        a2Servo ||
                        JSON.parse(sessionStorage.getItem("AUltra")) ||
                        false
                      }
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleA2}
                      checked={a2Digi}
                    ></input>
                    <label class="switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in2"
                        style={{ color: bttnColor2[1] }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
                <br />
                <label
                  className={"input upper-label-input upper-label-input-servo"}
                >
                  <div
                    class={
                      "switch-button-servo-" +
                      ((a2Servo &&
                        !JSON.parse(sessionStorage.getItem("AUltra"))) ||
                        false)
                    }
                    id="s2"
                  >
                    <input
                      class="switch-button-checkbox-servo"
                      type="checkbox"
                      disabled={
                        !JSON.parse(sessionStorage.getItem("A2")) ||
                        !JSON.parse(sessionStorage.getItem("a2-I/O")) ||
                        JSON.parse(sessionStorage.getItem("AUltra"))
                      }
                      checked={a2Servo}
                      onChange={ServoA2}
                    ></input>
                  </div>
                </label>
              </div>
            </div>
            <div className="digital-flow-left-upper">
              <div className="digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className="textsp">B1</span>
                  <div
                    class={"switch-button-" + ((B1DIGI && !b1Servo) || false)}
                    id={"s3"}
                    style={{ color: bttnColor[2] }}
                  >
                    <input
                      active={b1Digi}
                      disabled={!B1DIGI || b1Servo || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleB1}
                      checked={b1Digi}
                    ></input>
                    <label class="switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in3"
                        style={{ color: bttnColor2[2] }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
                <br />
                <label
                  className={"input upper-label-input upper-label-input-servo"}
                >
                  <div
                    className={"switch-button-servo-" + (b1Servo || false)}
                    id="s2"
                  >
                    <input
                      className="switch-button-checkbox-servo"
                      type="checkbox"
                      disabled={
                        !JSON.parse(sessionStorage.getItem("B1")) ||
                        !JSON.parse(sessionStorage.getItem("b1-I/O"))
                      }
                      checked={b1Servo}
                      onChange={ServoB1}
                    ></input>
                  </div>
                </label>
                <br />
                <label className={"input upper-label-input"}>
                  <span className="textsp">B2</span>
                  <div
                    class={"switch-button-" + ((B2DIGI && !b2Servo) || false)}
                    id={"s4"}
                    style={{ color: bttnColor[3] }}
                  >
                    <input
                      active={b2Digi}
                      disabled={!B2DIGI || b2Servo || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleB2}
                      checked={b2Digi}
                    ></input>
                    <label class="switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in4"
                        style={{ color: bttnColor2[3] }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
                <br />
                <label
                  className={"input upper-label-input upper-label-input-servo"}
                >
                  <div
                    className={"switch-button-servo-" + (b2Servo || false)}
                    id="s2"
                  >
                    <input
                      className="switch-button-checkbox-servo"
                      type="checkbox"
                      disabled={
                        !JSON.parse(sessionStorage.getItem("B2")) ||
                        !JSON.parse(sessionStorage.getItem("b2-I/O"))
                      }
                      checked={b2Servo}
                      onChange={ServoB2}
                    ></input>
                  </div>
                </label>
              </div>
            </div>

            <div className="Digital-flow-left-upper">
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(E1DIGI || false) + "-span textsp"}>E1</span>
                  <div
                    class={"switch-button-" + (E1DIGI || false)}
                    id="s11"
                    style={{ color: "#717171" }}
                  >
                    <input
                      active={e1Digi}
                      disabled={!E1DIGI || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleE1}
                      checked={e1Digi}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in11"
                        style={{ color: "#fcfcfc" }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(E2DIGI || false) + "-span textsp"}>E2</span>
                  <div
                    class={"switch-button-" + (E2DIGI || false)}
                    id="s12"
                    style={{ color: "#717171" }}
                  >
                    <input
                      active={e2Digi}
                      disabled={!E2DIGI || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleE2}
                      checked={e2Digi}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in12"
                        style={{ color: "#fcfcfc" }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
              </div>
            </div>
            <div className="Digital-flow-left-upper">
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(M1DIGI || false) + "-span textsp"}>M1</span>
                  <div
                    class={"switch-button-" + (M1DIGI || false)}
                    id="s13"
                    style={{ color: bttnColor[12] }}
                  >
                    <input
                      active={m1Digi}
                      disabled={true}
                      checked={false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleM1}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in13"
                        style={{ color: bttnColor2[12] }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(M2DIGI || false) + "-span textsp"}>M2</span>
                  <div
                    class={"switch-button-" + (M2DIGI || false)}
                    id="s14"
                    style={{ color: bttnColor[13] }}
                  >
                    <input
                      active={m2Digi}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleM2}
                      disabled={true}
                      checked={false}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in14"
                        style={{ color: bttnColor2[13] }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="digital-ButtonRightDivInput">
            <div className="digital-flow-left-upper">
              <div className="digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className="textsp">C1</span>
                  <div
                    class={
                      "switch-button-" +
                      ((C1DIGI &&
                        !c1Servo &&
                        !JSON.parse(sessionStorage.getItem("CUltra"))) ||
                        false)
                    }
                    id={"s5"}
                    style={{ color: bttnColor[4] }}
                  >
                    <input
                      active={c1Digi}
                      disabled={
                        !C1DIGI ||
                        c1Servo ||
                        JSON.parse(sessionStorage.getItem("CUltra")) ||
                        false
                      }
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleC1}
                      checked={c1Digi}
                    ></input>
                    <label class="switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in5"
                        style={{ color: bttnColor2[4] }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
                <br />
                <label
                  className={"input upper-label-input upper-label-input-servo"}
                >
                  <div
                    className={
                      "switch-button-servo-" +
                      ((c1Servo &&
                        !JSON.parse(sessionStorage.getItem("CUltra"))) ||
                        false)
                    }
                    id="s2"
                  >
                    <input
                      className="switch-button-checkbox-servo"
                      type="checkbox"
                      disabled={
                        !JSON.parse(sessionStorage.getItem("C1")) ||
                        !JSON.parse(sessionStorage.getItem("c1-I/O")) ||
                        JSON.parse(sessionStorage.getItem("CUltra"))
                      }
                      checked={c1Servo}
                      onChange={ServoC1}
                    ></input>
                  </div>
                </label>
                <br />
                <label className={"input upper-label-input"}>
                  <span className="textsp">C2</span>
                  <div
                    class={
                      "switch-button-" +
                      ((C2DIGI &&
                        !c2Servo &&
                        !JSON.parse(sessionStorage.getItem("CUltra"))) ||
                        false)
                    }
                    id={"s6"}
                    style={{ color: bttnColor[5] }}
                  >
                    <input
                      active={c2Digi}
                      disabled={
                        !C2DIGI ||
                        c2Servo ||
                        JSON.parse(sessionStorage.getItem("CUltra")) ||
                        false
                      }
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleC2}
                      checked={c2Digi}
                    ></input>
                    <label class="switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in6"
                        style={{ color: bttnColor2[5] }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
                <br />
                <label
                  className={"input upper-label-input upper-label-input-servo"}
                >
                  <div
                    className={
                      "switch-button-servo-" +
                      ((c2Servo &&
                        !JSON.parse(sessionStorage.getItem("CUltra"))) ||
                        false)
                    }
                    id="s2"
                  >
                    <input
                      className="switch-button-checkbox-servo"
                      type="checkbox"
                      disabled={
                        !JSON.parse(sessionStorage.getItem("C2")) ||
                        !JSON.parse(sessionStorage.getItem("c2-I/O")) ||
                        JSON.parse(sessionStorage.getItem("CUltra"))
                      }
                      checked={c2Servo}
                      onChange={ServoC2}
                    ></input>
                  </div>
                </label>
              </div>
            </div>
            <div className="digital-flow-left-upper">
              <div className="digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <label className={"input upper-label-input"}>
                    <span className="textsp">D1</span>
                    <div
                      class={"switch-button-" + ((D1DIGI && !d1Servo) || false)}
                      id="s7"
                      style={{ color: bttnColor[6] }}
                    >
                      <input
                        onClick={toggleD1}
                        active={d1Digi}
                        disabled={
                          !JSON.parse(sessionStorage.getItem("D1")) ||
                          !JSON.parse(sessionStorage.getItem("d1-I/O"))
                        }
                        class="switch-button-checkbox"
                        type="checkbox"
                        checked={d1Digi}
                      ></input>
                      <label class="switch-button-label" for="">
                        <span
                          class="switch-button-label-span"
                          id="in7"
                          style={{ color: bttnColor2[6] }}
                        >
                          Digital
                        </span>
                      </label>
                    </div>
                  </label>
                  <br />
                  <label
                    className={
                      "input upper-label-input upper-label-input-servo"
                    }
                  >
                    <div
                      className={"switch-button-servo-" + (d1Servo || false)}
                      id="s2"
                    >
                      <input
                        className="switch-button-checkbox-servo"
                        type="checkbox"
                        disabled={!JSON.parse(sessionStorage.getItem("D1"))}
                        checked={d1Servo}
                        onChange={ServoD1}
                      ></input>
                    </div>
                  </label>
                  <br />

                  <label className={"input upper-label-input"}>
                    <span className="textsp">D2</span>
                    <div
                      class={"switch-button-" + ((D2DIGI && !d2Servo) || false)}
                      id="s8"
                      style={{ color: bttnColor[7] }}
                    >
                      <input
                        onClick={toggleD2}
                        active={d2Digi}
                        disabled={
                          !JSON.parse(sessionStorage.getItem("D2")) ||
                          !JSON.parse(sessionStorage.getItem("d2-I/O"))
                        }
                        class="switch-button-checkbox"
                        type="checkbox"
                        checked={d2Digi}
                      ></input>
                      <label class="switch-button-label" for="">
                        <span
                          class="switch-button-label-span"
                          id="in8"
                          style={{ color: bttnColor2[7] }}
                        >
                          Digital
                        </span>
                      </label>
                    </div>
                  </label>
                  <br />
                  <label
                    className={
                      "input upper-label-input upper-label-input-servo"
                    }
                  >
                    <div
                      className={"switch-button-servo-" + (d2Servo || false)}
                      id="s2"
                    >
                      <input
                        className="switch-button-checkbox-servo"
                        type="checkbox"
                        disabled={!JSON.parse(sessionStorage.getItem("D2"))}
                        checked={d2Servo}
                        onChange={ServoD2}
                      ></input>
                    </div>
                  </label>
                </label>
              </div>
            </div>
            <div className="Digital-flow-left-upper">
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(F1DIGI || false) + "-span textsp"}>F1</span>
                  <div
                    class={"switch-button-" + (F1DIGI || false)}
                    id="s9"
                    style={{ color: bttnColor[8] }}
                  >
                    <input
                      active={f1Digi}
                      disabled={!F1DIGI || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleF1}
                      checked={f1Digi}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in9"
                        style={{ color: bttnColor2[8] }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(F2DIGI || false) + "-span textsp"}>F2</span>
                  <div
                    class={"switch-button-" + (F2DIGI || false)}
                    id="s10"
                    style={{ color: bttnColor[9] }}
                  >
                    <input
                      active={f2Digi}
                      disabled={!F2DIGI || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleF2}
                      checked={f2Digi}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in10"
                        style={{ color: bttnColor2[9] }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
              </div>
            </div>

            <div className="Digital-flow-left-upper">
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(M3DIGI || false) + "-span textsp"}>M3</span>
                  <div
                    class={"switch-button-" + (M3DIGI || false)}
                    id="s15"
                    style={{ color: bttnColor[14] }}
                  >
                    <input
                      active={m3Digi}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleM3}
                      disabled={true}
                      checked={false}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in15"
                        style={{ color: bttnColor2[14] }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(M4DIGI || false) + "-span textsp"}>M4</span>
                  <div
                    class={"switch-button-" + (M4DIGI || false)}
                    id="s16"
                    style={{ color: bttnColor[15] }}
                  >
                    <input
                      active={m4Digi}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleM4}
                      disabled={true}
                      checked={false}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span
                        class="switch-button-label-span"
                        id="in16"
                        style={{ color: bttnColor2[15] }}
                      >
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
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

          <img
            className="iconBtnSize imgNextBtn"
            src={renderPrgImage("nextBtn")}
            onClick={next}
          />
        </div>
      </div>
    </div>
  );
}

// export default Digital;
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

export default connect(mapStateToProps, mapDispatchToProps)(Digital);
