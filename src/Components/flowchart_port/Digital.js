import React from "react";
import { useHistory } from "react-router-dom";
import strokeImg from "../../Assets/img/button 52x52 - stroke.png";
import digitalImg from "../../Assets/img/code bar@2x.png";
import secondaryImg from "../../Assets/img/save - secondary.png";
import Pcinternal4in1Active from "../../Assets/internalAccessories/4 in 1 - active.svg";
import Pcinternal4in1InActive from "../../Assets/internalAccessories/4 in 1 - inactive.svg";
import PcinternalBuzzerActive from "../../Assets/internalAccessories/buzzer - active.svg";
import PcinternalBuzzerInActive from "../../Assets/internalAccessories/buzzer - inactive.svg";
import PcinternalEYEActive from "../../Assets/internalAccessories/eye - active.svg";
import PcinternalEYEInActive from "../../Assets/internalAccessories/eye - inactive.svg";
import PcinternalMicInActive from "../../Assets/internalAccessories/internal mic - active.svg";
import PcinternalMicActive from "../../Assets/internalAccessories/internal mic - inactive.svg";
import pcImg from "../../Assets/internalAccessories/PC_image@3x.png";
import PcinternalTeethActive from "../../Assets/internalAccessories/teeth - active.svg";
import PcinternalTeethInActive from "../../Assets/internalAccessories/teeth - inactive.svg";
import PcinternalTouchpadsActive from "../../Assets/internalAccessories/touch pads - active.svg";
import PcinternalTouchpadsInActive from "../../Assets/internalAccessories/touch pads - inactive.svg";
import connectionImg from "../../Assets/usb - off@2x.png";
import renderPrgImage from "../../source/programImg";
import useLocalStorage from "../LocalStorage/LocalStorage";
import "./buttonDig.scss";
import "./Navbar.css";
import "./pcimage.css";
import "./style.css";

function Digital() {
  const history = useHistory();

  const next = () => {
    history.push("/flow/flowchart");
  };
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

  const toggleA1 = (value) => {
    if (JSON.parse(sessionStorage.getItem("a1-I/O")) === true) {
      setPwmA1(!pwmA1);
    }
    setA1Digi(value);

    if (value === "digital") {
      setA1Digi(false);
      document.getElementById("ind1").style.cssText = "  color: #fcfcfc;";
      document.getElementById("ina1").style.cssText = "color: #717171; ";
      document.getElementById("ins1").style.cssText = "color: #717171; ";
      document.getElementById("s1").style.cssText = "color: #717171;";
      document.getElementById("digital-slider-A1").style.cssText =
        "transform: translateX(0px);";
    }
    if (value === "analog") {
      setA1Digi(true);
      document.getElementById("ina1").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ind1").style.cssText = "  color: #717171;";
      document.getElementById("ins1").style.cssText = "color: #717171; ";
      document.getElementById("s1").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-A1").style.cssText =
        "transform: translateX(75px);";
    }
    if (value === "servo") {
      document.getElementById("ins1").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ina1").style.cssText = "color: #717171; ";
      document.getElementById("ind1").style.cssText = "  color: #717171;";
      document.getElementById("s1").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-A1").style.cssText =
        "transform: translateX(150px);";
    }
  };
  const toggleA2 = (value) => {
    setA2Digi(value);

    if (value === "digital") {
      setA2Digi(false);
      document.getElementById("ind2").style.cssText = "  color: #fcfcfc;";
      document.getElementById("ina2").style.cssText = "color: #717171; ";
      document.getElementById("ins2").style.cssText = "color: #717171; ";
      document.getElementById("s2").style.cssText = "color: #717171;";
      document.getElementById("digital-slider-A2").style.cssText =
        "transform: translateX(0px);";
    }
    if (value === "analog") {
      setA2Digi(true);
      document.getElementById("ina2").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ind2").style.cssText = "  color: #717171;";
      document.getElementById("ins2").style.cssText = "color: #717171; ";
      document.getElementById("s2").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-A2").style.cssText =
        "transform: translateX(75px);";
    }
    if (value === "servo") {
      document.getElementById("ins2").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ina2").style.cssText = "color: #717171; ";
      document.getElementById("ind2").style.cssText = "  color: #717171;";
      document.getElementById("s2").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-A2").style.cssText =
        "transform: translateX(150px);";
    }
  };
  const toggleB1 = (value) => {
    setB1Digi(value);
    if (value === "digital") {
      setB1Digi(false);
      document.getElementById("ind3").style.cssText = "  color: #fcfcfc;";
      document.getElementById("ina3").style.cssText = "color: #717171; ";
      document.getElementById("ins3").style.cssText = "color: #717171; ";
      document.getElementById("s3").style.cssText = "color: #717171;";
      document.getElementById("digital-slider-B1").style.cssText =
        "transform: translateX(0px);";
    }
    if (value === "analog") {
      setB1Digi(true);
      document.getElementById("ina3").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ind3").style.cssText = "  color: #717171;";
      document.getElementById("ins3").style.cssText = "color: #717171; ";
      document.getElementById("s3").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-B1").style.cssText =
        "transform: translateX(75px);";
    }
    if (value === "servo") {
      document.getElementById("ins3").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ina3").style.cssText = "color: #717171; ";
      document.getElementById("ind3").style.cssText = "  color: #717171;";
      document.getElementById("s3").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-B1").style.cssText =
        "transform: translateX(150px);";
    }
  };
  const toggleB2 = (value) => {
    setB2Digi(value);
    if (value === "digital") {
      setB2Digi(false);
      document.getElementById("ind4").style.cssText = "  color: #fcfcfc;";
      document.getElementById("ina4").style.cssText = "color: #717171; ";
      document.getElementById("ins4").style.cssText = "color: #717171; ";
      document.getElementById("s4").style.cssText = "color: #717171;";
      document.getElementById("digital-slider-B2").style.cssText =
        "transform: translateX(0px);";
    }
    if (value === "analog") {
      setB2Digi(true);
      document.getElementById("ina4").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ind4").style.cssText = "  color: #717171;";
      document.getElementById("ins4").style.cssText = "color: #717171; ";
      document.getElementById("s4").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-B2").style.cssText =
        "transform: translateX(75px);";
    }
    if (value === "servo") {
      document.getElementById("ins4").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ina4").style.cssText = "color: #717171; ";
      document.getElementById("ind4").style.cssText = "  color: #717171;";
      document.getElementById("s4").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-B2").style.cssText =
        "transform: translateX(150px);";
    }
  };
  const toggleC1 = (value) => {
    setC1Digi(value);
    if (value === "digital") {
      setC1Digi(false);
      document.getElementById("ind5").style.cssText = "  color: #fcfcfc;";
      document.getElementById("ina5").style.cssText = "color: #717171; ";
      document.getElementById("ins5").style.cssText = "color: #717171; ";
      document.getElementById("s5").style.cssText = "color: #717171;";
      document.getElementById("digital-slider-C1").style.cssText =
        "transform: translateX(0px);";
    }
    if (value === "analog") {
      setC1Digi(true);
      document.getElementById("ina5").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ind5").style.cssText = "  color: #717171;";
      document.getElementById("ins5").style.cssText = "color: #717171; ";
      document.getElementById("s5").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-C1").style.cssText =
        "transform: translateX(75px);";
    }
    if (value === "servo") {
      document.getElementById("ins5").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ina5").style.cssText = "color: #717171; ";
      document.getElementById("ind5").style.cssText = "  color: #717171;";
      document.getElementById("s5").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-C1").style.cssText =
        "transform: translateX(150px);";
    }
  };
  const toggleC2 = (value) => {
    setC2Digi(value);
    if (value === "digital") {
      setC2Digi(false);
      document.getElementById("ind6").style.cssText = "  color: #fcfcfc;";
      document.getElementById("ina6").style.cssText = "color: #717171; ";
      document.getElementById("ins6").style.cssText = "color: #717171; ";
      document.getElementById("s6").style.cssText = "color: #717171;";
      document.getElementById("digital-slider-C2").style.cssText =
        "transform: translateX(0px);";
    }
    if (value === "analog") {
      setC2Digi(true);
      document.getElementById("ina6").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ind6").style.cssText = "  color: #717171;";
      document.getElementById("ins6").style.cssText = "color: #717171; ";
      document.getElementById("s6").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-C2").style.cssText =
        "transform: translateX(75px);";
    }
    if (value === "servo") {
      document.getElementById("ins6").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ina6").style.cssText = "color: #717171; ";
      document.getElementById("ind6").style.cssText = "  color: #717171;";
      document.getElementById("s6").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-C2").style.cssText =
        "transform: translateX(150px);";
    }
  };

  const toggleD1 = (value) => {
    if (JSON.parse(sessionStorage.getItem("d1-I/O")) === true) {
      setPwmD1(!pwmD1);
    }
    setD1Digi(value);
    if (value === "digital") {
      setD1Digi(false);
      document.getElementById("ind7").style.cssText = "  color: #fcfcfc;";
      document.getElementById("ina7").style.cssText = "color: #717171; ";
      document.getElementById("ins7").style.cssText = "color: #717171; ";
      document.getElementById("s7").style.cssText = "color: #717171;";
      document.getElementById("digital-slider-D1").style.cssText =
        "transform: translateX(0px);";
    }
    if (value === "analog") {
      setD1Digi(true);
      document.getElementById("ina7").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ind7").style.cssText = "  color: #717171;";
      document.getElementById("ins7").style.cssText = "color: #717171; ";
      document.getElementById("s7").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-D1").style.cssText =
        "transform: translateX(75px);";
    }
    if (value === "servo") {
      document.getElementById("ins7").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ina7").style.cssText = "color: #717171; ";
      document.getElementById("ind7").style.cssText = "  color: #717171;";
      document.getElementById("s7").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-D1").style.cssText =
        "transform: translateX(150px);";
    }
  };
  const toggleD2 = (value) => {
    setD2Digi(value);
    if (value === "digital") {
      setD2Digi(false);
      document.getElementById("ind8").style.cssText = "  color: #fcfcfc;";
      document.getElementById("ina8").style.cssText = "color: #717171; ";
      document.getElementById("ins8").style.cssText = "color: #717171; ";
      document.getElementById("s8").style.cssText = "color: #717171;";
      document.getElementById("digital-slider-D2").style.cssText =
        "transform: translateX(0px);";
    }
    if (value === "analog") {
      setD2Digi(true);
      document.getElementById("ina8").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ind8").style.cssText = "  color: #717171;";
      document.getElementById("ins8").style.cssText = "color: #717171; ";
      document.getElementById("s8").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-D2").style.cssText =
        "transform: translateX(75px);";
    }
    if (value === "servo") {
      document.getElementById("ins8").style.cssText = "color: #fcfcfc; ";
      document.getElementById("ina8").style.cssText = "color: #717171; ";
      document.getElementById("ind8").style.cssText = "  color: #717171;";
      document.getElementById("s8").style.cssText = "  color: #717171;";
      document.getElementById("digital-slider-D2").style.cssText =
        "transform: translateX(150px);";
    }
  };

  const toggleF1 = () => {
    setF1Digi(!f1Digi);
    if (f1Digi) {
      document.getElementById("in9").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s9").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in9").style.cssText = "color: #717171; ";
      document.getElementById("s9").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleF2 = () => {
    setF2Digi(!f2Digi);
    if (f2Digi) {
      document.getElementById("in10").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s10").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in10").style.cssText = "color: #717171; ";
      document.getElementById("s10").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleE1 = () => {
    setE1Digi(!e1Digi);
    if (e1Digi) {
      document.getElementById("in11").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s11").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in11").style.cssText = "color: #717171; ";
      document.getElementById("s11").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleE2 = () => {
    setE2Digi(!e2Digi);
    if (e2Digi) {
      document.getElementById("in12").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s12").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in12").style.cssText = "color: #717171; ";
      document.getElementById("s12").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleM1 = () => {
    setM1Digi(!m1Digi);
    if (m1Digi) {
      document.getElementById("in13").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s13").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in13").style.cssText = "color: #717171; ";
      document.getElementById("s13").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleM2 = () => {
    setM2Digi(!m2Digi);
    if (m2Digi) {
      document.getElementById("in14").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s14").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in14").style.cssText = "color: #717171; ";
      document.getElementById("s14").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleM3 = () => {
    setM3Digi(!m3Digi);
    if (m3Digi) {
      document.getElementById("in15").style.cssText = "  color: #fcfcfc;";
      document.getElementById("s15").style.cssText = "color: #717171;";
    } else {
      document.getElementById("in15").style.cssText = "color: #717171; ";
      document.getElementById("s15").style.cssText = "  color: #fcfcfc;";
    }
  };
  const toggleM4 = () => {
    setM4Digi(!m4Digi);
    if (m4Digi) {
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
              <img style={{ marginRight: "0px" }} src={connectionImg}></img>
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
          <div className="Digital-properties-Container">
            <div className="Digital-properties-b">
              <div className="Digital-properties-bDi">
                <span className="Digital-properties-DigitalLabel">
                  <input
                    className="Digital-properties-DigitalCheckBox"
                    type="checkbox"
                    // checked={a1}
                    // onClick={() => myFunction1()}
                    // onChange={() => onA1ValueChange()}
                  />
                  <span disabled="disabled" className="A1">
                    A1
                  </span>
                </span>
                <span className="Digital-properties-DigitalLabel">
                  <input
                    className="Inputs-properties-InputCheckBox"
                    type="checkbox"
                    // checked={a2}
                    // onClick={() => myFunction2()}
                    // onChange={() => onA2ValueChange()}
                  />
                  <span disabled="disabled" className="A1">
                    A2
                  </span>
                </span>
                <span className="Digital-properties-DigitalLabel">
                  <input
                    className="Inputs-properties-InputCheckBox"
                    type="checkbox"
                    // checked={a2}
                    // onClick={() => myFunction2()}
                    // onChange={() => onA2ValueChange()}
                  />
                  <span disabled="disabled" className="A1">
                    A2
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="digital-ButtonDivInput">
            <div className="digital-flow-left-upper">
              <div className="digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span
                    className={
                      (A1DIGI || false) + "-span textsp digital-textsp"
                    }
                  >
                    A1
                  </span>
                  <div
                    class={"flowchart-switch-button-" + (A1DIGI || false)}
                    id="s1"
                  >
                    <div
                      id="digital-slider-A1"
                      className={"slide-A1-" + a1Digi}
                    ></div>
                    <input
                      disabled={!A1DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleA1("digital")}
                      checked={a1Digi === "digital"}
                      id="A1-Digital"
                      name="A1"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="A1-Digital"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ind1"
                      >
                        Digital
                      </span>
                    </label>
                    <input
                      disabled={!A1DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleA1("analog")}
                      checked={a1Digi === "analog"}
                      id="A1-Analog"
                      name="A1"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="A1-Analog"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ina1"
                      >
                        Analog
                      </span>
                    </label>
                    <input
                      disabled={!A1DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleA1("servo")}
                      checked={a1Digi === "servo"}
                      id="A1-Servo"
                      name="A1"
                    ></input>
                    <label class="flowchart-switch-button-label" for="A1-Servo">
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ins1"
                      >
                        Servo
                      </span>
                    </label>
                  </div>
                </label>
                <br />
                <label className={"input upper-label-input"}>
                  <span
                    className={
                      (A2DIGI || false) + "-span textsp digital-textsp"
                    }
                  >
                    A2
                  </span>
                  <div
                    class={"flowchart-switch-button-" + (A2DIGI || false)}
                    id="s2"
                  >
                    <div
                      id="digital-slider-A2"
                      className={"slide-A2-" + a2Digi}
                    ></div>
                    <input
                      disabled={!A2DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleA2("digital")}
                      checked={a2Digi === "digital"}
                      id="A2-Digital"
                      name="A2"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="A2-Digital"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ind2"
                      >
                        Digital
                      </span>
                    </label>
                    <input
                      disabled={!A2DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleA2("analog")}
                      checked={a2Digi === "analog"}
                      id="A2-Analog"
                      name="A2"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="A2-Analog"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ina2"
                      >
                        Analog
                      </span>
                    </label>
                    <input
                      disabled={!A2DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleA2("servo")}
                      checked={a2Digi === "servo"}
                      id="A2-Servo"
                      name="A2"
                    ></input>
                    <label class="flowchart-switch-button-label" for="A2-Servo">
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ins2"
                      >
                        Servo
                      </span>
                    </label>
                  </div>
                </label>
              </div>
            </div>
            <div className="digital-flow-left-upper">
              <div className="digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span
                    className={
                      (B1DIGI || false) + "-span textsp digital-textsp"
                    }
                  >
                    B1
                  </span>
                  <div
                    class={"flowchart-switch-button-" + (B1DIGI || false)}
                    id="s3"
                  >
                    <div
                      id="digital-slider-B1"
                      className={"slide-B1-" + b1Digi}
                    ></div>
                    <input
                      disabled={!B1DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleB1("digital")}
                      checked={b1Digi === "digital"}
                      id="B1-Digital"
                      name="B1"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="B1-Digital"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ind3"
                      >
                        Digital
                      </span>
                    </label>
                    <input
                      disabled={!B1DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleB1("analog")}
                      checked={b1Digi === "analog"}
                      id="B1-Analog"
                      name="B1"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="B1-Analog"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ina3"
                      >
                        Analog
                      </span>
                    </label>
                    <input
                      disabled={!B1DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleB1("servo")}
                      checked={b1Digi === "servo"}
                      id="B1-Servo"
                      name="B1"
                    ></input>
                    <label class="flowchart-switch-button-label" for="B1-Servo">
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ins3"
                      >
                        Servo
                      </span>
                    </label>
                  </div>
                </label>
                <br />
                <label className={"input upper-label-input"}>
                  <span
                    className={
                      (B2DIGI || false) + "-span textsp digital-textsp"
                    }
                  >
                    B2
                  </span>
                  <div
                    class={"flowchart-switch-button-" + (B2DIGI || false)}
                    id="s4"
                  >
                    <div
                      id="digital-slider-B2"
                      className={"slide-B2-" + b2Digi}
                    ></div>
                    <input
                      disabled={!B2DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleB2("digital")}
                      checked={b2Digi === "digital"}
                      id="B2-Digital"
                      name="B2"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="B2-Digital"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ind4"
                      >
                        Digital
                      </span>
                    </label>
                    <input
                      disabled={!B2DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleB2("analog")}
                      checked={b2Digi === "analog"}
                      id="B2-Analog"
                      name="B2"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="B2-Analog"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ina4"
                      >
                        Analog
                      </span>
                    </label>
                    <input
                      disabled={!B2DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleB2("servo")}
                      checked={b2Digi === "servo"}
                      id="B2-Servo"
                      name="B2"
                    ></input>
                    <label class="flowchart-switch-button-label" for="B2-Servo">
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ins4"
                      >
                        Servo
                      </span>
                    </label>
                  </div>
                </label>
              </div>
            </div>
            <div className="Digital-flow-left-upper">
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(F1DIGI || false) + "-span textsp"}>F1</span>
                  <div class={"switch-button-" + (F1DIGI || false)} id="s9">
                    <input
                      active={f1Digi}
                      disabled={!F1DIGI || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleF1}
                      checked={f1Digi}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span class="switch-button-label-span" id="in9">
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(F2DIGI || false) + "-span textsp"}>F2</span>
                  <div class={"switch-button-" + (F2DIGI || false)} id="s10">
                    <input
                      active={f2Digi}
                      disabled={!F2DIGI || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleF2}
                      checked={f2Digi}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span class="switch-button-label-span" id="in10">
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
                  <span className={(E1DIGI || false) + "-span textsp"}>E1</span>
                  <div class={"switch-button-" + (E1DIGI || false)} id="s11">
                    <input
                      active={e1Digi}
                      disabled={!E1DIGI || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleE1}
                      checked={e1Digi}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span class="switch-button-label-span" id="in11">
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(E2DIGI || false) + "-span textsp"}>E2</span>
                  <div class={"switch-button-" + (E2DIGI || false)} id="s12">
                    <input
                      active={e2Digi}
                      disabled={!E2DIGI || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleE2}
                      checked={e2Digi}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span class="switch-button-label-span" id="in12">
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
                  <span
                    className={
                      (C1DIGI || false) + "-span textsp digital-textsp"
                    }
                  >
                    C1
                  </span>
                  <div
                    class={"flowchart-switch-button-" + (C1DIGI || false)}
                    id="s5"
                  >
                    <div
                      id="digital-slider-C1"
                      className={"slide-C1-" + c1Digi}
                    ></div>
                    <input
                      disabled={!C1DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleC1("digital")}
                      checked={c1Digi === "digital"}
                      id="C1-Digital"
                      name="C1"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="C1-Digital"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ind5"
                      >
                        Digital
                      </span>
                    </label>
                    <input
                      disabled={!C1DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleC1("analog")}
                      checked={c1Digi === "analog"}
                      id="C1-Analog"
                      name="C1"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="C1-Analog"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ina5"
                      >
                        Analog
                      </span>
                    </label>
                    <input
                      disabled={!C1DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleC1("servo")}
                      checked={c1Digi === "servo"}
                      id="C1-Servo"
                      name="C1"
                    ></input>
                    <label class="flowchart-switch-button-label" for="C1-Servo">
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ins5"
                      >
                        Servo
                      </span>
                    </label>
                  </div>
                </label>
                <br />
                <label className={"input upper-label-input"}>
                  <span
                    className={
                      (C2DIGI || false) + "-span textsp digital-textsp"
                    }
                  >
                    C2
                  </span>
                  <div
                    class={"flowchart-switch-button-" + (C2DIGI || false)}
                    id="s6"
                  >
                    <div
                      id="digital-slider-C2"
                      className={"slide-C2-" + c2Digi}
                    ></div>
                    <input
                      disabled={!C2DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleC2("digital")}
                      checked={c2Digi === "digital"}
                      id="C2-Digital"
                      name="C2"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="C2-Digital"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ind6"
                      >
                        Digital
                      </span>
                    </label>
                    <input
                      disabled={!C2DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleC2("analog")}
                      checked={c2Digi === "analog"}
                      id="C2-Analog"
                      name="C2"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="C2-Analog"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ina6"
                      >
                        Analog
                      </span>
                    </label>
                    <input
                      disabled={!C2DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleC2("servo")}
                      checked={c2Digi === "servo"}
                      id="C2-Servo"
                      name="C2"
                    ></input>
                    <label class="flowchart-switch-button-label" for="C2-Servo">
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ins6"
                      >
                        Servo
                      </span>
                    </label>
                  </div>
                </label>
              </div>
            </div>
            <div className="digital-flow-left-upper">
              <div className="digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span
                    className={
                      (D1DIGI || false) + "-span textsp digital-textsp"
                    }
                  >
                    D1
                  </span>
                  <div
                    class={"flowchart-switch-button-" + (D1DIGI || false)}
                    id="s7"
                  >
                    <div
                      id="digital-slider-D1"
                      className={"slide-D1-" + d1Digi}
                    ></div>
                    <input
                      disabled={!D1DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleD1("digital")}
                      checked={d1Digi === "digital"}
                      id="D1-Digital"
                      name="D1"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="D1-Digital"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ind7"
                      >
                        Digital
                      </span>
                    </label>
                    <input
                      disabled={!D1DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleD1("analog")}
                      checked={d1Digi === "analog"}
                      id="D1-Analog"
                      name="D1"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="D1-Analog"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ina7"
                      >
                        Analog
                      </span>
                    </label>
                    <input
                      disabled={!D1DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleD1("servo")}
                      checked={d1Digi === "servo"}
                      id="D1-Servo"
                      name="D1"
                    ></input>
                    <label class="flowchart-switch-button-label" for="D1-Servo">
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ins7"
                      >
                        Servo
                      </span>
                    </label>
                  </div>
                  <br />
                  <span
                    className={
                      (D2DIGI || false) + "-span textsp digital-textsp"
                    }
                  >
                    D2
                  </span>
                  <div
                    class={"flowchart-switch-button-" + (D2DIGI || false)}
                    id="s8"
                  >
                    <div
                      id="digital-slider-D2"
                      className={"slide-D2-" + d2Digi}
                    ></div>
                    <input
                      disabled={!D2DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleD2("digital")}
                      checked={d2Digi === "digital"}
                      id="D2-Digital"
                      name="D2"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="D2-Digital"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ind8"
                      >
                        Digital
                      </span>
                    </label>
                    <input
                      disabled={!D2DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleD2("analog")}
                      checked={d2Digi === "analog"}
                      id="D2-Analog"
                      name="D2"
                    ></input>
                    <label
                      class="flowchart-switch-button-label"
                      for="D2-Analog"
                    >
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ina8"
                      >
                        Analog
                      </span>
                    </label>
                    <input
                      disabled={!D2DIGI || false}
                      class="flowchart-switch-button-checkbox"
                      type="radio"
                      onChange={() => toggleD2("servo")}
                      checked={d2Digi === "servo"}
                      id="D2-Servo"
                      name="D2"
                    ></input>
                    <label class="flowchart-switch-button-label" for="D2-Servo">
                      <span
                        class="flowchart-switch-button-label-span"
                        id="ins8"
                      >
                        Servo
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
                  <div class={"switch-button-" + (M1DIGI || false)} id="s13">
                    <input
                      active={m1Digi}
                      disabled={!M1DIGI || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleM1}
                      checked={m1Digi}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span class="switch-button-label-span" id="in13">
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(M2DIGI || false) + "-span textsp"}>M2</span>
                  <div class={"switch-button-" + (M2DIGI || false)} id="s14">
                    <input
                      active={m2Digi}
                      disabled={!M2DIGI || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleM2}
                      checked={m2Digi}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span class="switch-button-label-span" id="in14">
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
                  <div class={"switch-button-" + (M3DIGI || false)} id="s15">
                    <input
                      active={m3Digi}
                      disabled={!M3DIGI || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleM3}
                      checked={m3Digi}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span class="switch-button-label-span" id="in15">
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <div className="Digital-flow-left-upper-grp">
                <label className={"input upper-label-input"}>
                  <span className={(M4DIGI || false) + "-span textsp"}>M4</span>
                  <div class={"switch-button-" + (M4DIGI || false)} id="s16">
                    <input
                      active={m4Digi}
                      disabled={!M4DIGI || false}
                      class="switch-button-checkbox"
                      type="checkbox"
                      onChange={toggleM4}
                      checked={m4Digi}
                    ></input>
                    <label class=" switch-button-label" for="">
                      <span class="switch-button-label-span" id="in16">
                        Digital
                      </span>
                    </label>
                  </div>
                </label>
              </div>
            </div>
          </div>
          1
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

export default Digital;
