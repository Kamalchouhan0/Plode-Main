import React, { useLayoutEffect } from "react";
import Bottom from "./Bottom";
import { Nav } from "react-bootstrap";
import { useLocalStorage } from "../LocalStorage/LocalStorage";
import pcImg from "../../Assets/internalAccessories/PC_image@3x.png";
import selectImg from "../../Assets/img/select bar@2x.png";
import secondaryImg from "../../Assets/img/save - secondary.png";
import strokeImg from "../../Assets/img/button 52x52 - stroke.png";
import Pcinternal4in1Active from "../../Assets/internalAccessories/4 in 1 - active.svg";
import Pcinternal4in1InActive from "../../Assets/internalAccessories/4 in 1 - inactive.svg";
import PcinternalBuzzerActive from "../../Assets/internalAccessories/buzzer - active.svg";
import PcinternalBuzzerInActive from "../../Assets/internalAccessories/buzzer - inactive.svg";
import PcinternalEYEActive from "../../Assets/internalAccessories/eye - active.svg";
import PcinternalEYEInActive from "../../Assets/internalAccessories/eye - inactive.svg";
import PcinternalMicInActive from "../../Assets/internalAccessories/internal mic - active.svg";
import PcinternalMicActive from "../../Assets/internalAccessories/internal mic - inactive.svg";
import PcinternalTeethActive from "../../Assets/internalAccessories/teeth - active.svg";
import PcinternalTeethInActive from "../../Assets/internalAccessories/teeth - inactive.svg";
import PcinternalTouchpadsActive from "../../Assets/internalAccessories/touch pads - active.svg";
import PcinternalTouchpadsInActive from "../../Assets/internalAccessories/touch pads - inactive.svg";
import connectionImg from "../../Assets/usb - off@2x.png";
import renderPrgImage from "../../source/programImg";
import { useHistory } from "react-router";
import "./Navbar.css";
import "./pcimage.css";
import "./style.css";

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
const Port = () => {
  const history = useHistory();

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

  const myFunction1 = async () => {
    await JSON.parse(sessionStorage.getItem("A1"));
    if (await JSON.parse(sessionStorage.getItem("A1"))) {
      document.getElementById("foo1").style.cssText = "color: white; ";

      //  a1color="white"
    } else {
      document.getElementById("foo1").style.cssText = "color: black; ";
      //  a1color="black"
      setAUltra(false);
      setA1Servo(false);
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
  };
  const myFunction3 = async () => {
    await JSON.parse(sessionStorage.getItem("B1"));
    if (await JSON.parse(sessionStorage.getItem("B1"))) {
      document.getElementById("foo3").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo3").style.cssText = "color: black; ";
      setAUltra(false);
      setB1Servo(false);
    }
  };
  const myFunction4 = async () => {
    await JSON.parse(sessionStorage.getItem("B2"));
    if (await JSON.parse(sessionStorage.getItem("B2"))) {
      document.getElementById("foo4").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo4").style.cssText = "color: black; ";
      setB2Servo(false);
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
  };
  const myFunction7 = async () => {
    await JSON.parse(sessionStorage.getItem("D1"));
    if (await JSON.parse(sessionStorage.getItem("D1"))) {
      document.getElementById("foo7").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo7").style.cssText = "color: black; ";
      setD1Servo(false);
    }
  };
  const myFunction8 = async () => {
    await JSON.parse(sessionStorage.getItem("D2"));
    if (await JSON.parse(sessionStorage.getItem("D2"))) {
      document.getElementById("foo8").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo8").style.cssText = "color: black; ";
      setD2Servo(false);
    }
  };
  const myFunction9 = async () => {
    await JSON.parse(sessionStorage.getItem("E1"));
    if (await JSON.parse(sessionStorage.getItem("E1"))) {
      document.getElementById("foo9").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo9").style.cssText = "color: black; ";
    }
  };
  const myFunction10 = async () => {
    await JSON.parse(sessionStorage.getItem("E2"));
    if (await JSON.parse(sessionStorage.getItem("E2"))) {
      document.getElementById("foo10").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo10").style.cssText = "color: black; ";
    }
  };
  const myFunction11 = async () => {
    await JSON.parse(sessionStorage.getItem("F1"));
    if (await JSON.parse(sessionStorage.getItem("F1"))) {
      document.getElementById("foo11").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo11").style.cssText = "color: black; ";
    }
  };
  const myFunction12 = async () => {
    await JSON.parse(sessionStorage.getItem("F2"));
    if (await JSON.parse(sessionStorage.getItem("F2"))) {
      document.getElementById("foo12").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo12").style.cssText = "color: black; ";
    }
  };
  const myFunction13 = async () => {
    await JSON.parse(sessionStorage.getItem("M1"));
    if (await JSON.parse(sessionStorage.getItem("M1"))) {
      document.getElementById("foo13").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo13").style.cssText = "color: black; ";
    }
  };
  const myFunction14 = async () => {
    await JSON.parse(sessionStorage.getItem("M2"));
    if (await JSON.parse(sessionStorage.getItem("M2"))) {
      document.getElementById("foo14").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo14").style.cssText = "color: black; ";
    }
  };
  const myFunction15 = async () => {
    await JSON.parse(sessionStorage.getItem("M3"));
    if (await JSON.parse(sessionStorage.getItem("M3"))) {
      document.getElementById("foo15").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo15").style.cssText = "color: black; ";
    }
  };
  const myFunction16 = async () => {
    await JSON.parse(sessionStorage.getItem("M4"));
    if (await JSON.parse(sessionStorage.getItem("M4"))) {
      document.getElementById("foo16").style.cssText = "color: white; ";
    } else {
      document.getElementById("foo16").style.cssText = "color: black; ";
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
            <img style={{ marginRight: "0px" }} src={connectionImg}></img>
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
          <div className="properties-Container">
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
                  <span disabled="disabled" className="A1">
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
                  <span disabled="disabled" className="A1">
                    A2
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="ButtonDiv">
            {/* A PORT */}
            <div className="tlb">
              <div className="tlbIn ">
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={a1}
                    onClick={() => myFunction1()}
                    onChange={() => onA1ValueChange()}
                  />
                  <span disabled="disabled" className="A1" id="foo1">
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
                  <span disabled="disabled" className="A1" id="foo2">
                    A2
                  </span>
                </span>
              </div>
            </div>
            {/* B PORT */}
            <div className="tlb">
              <div className="tlbIn ">
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={b1}
                    onClick={() => myFunction3()}
                    onChange={() => onB1ValueChange()}
                  />
                  <span disabled="disabled" className="A1" id="foo3">
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
                  <span disabled="disabled" className="A1" id="foo4">
                    B2
                  </span>
                </span>
              </div>
            </div>
            <div className="tlb">
              <div className="tlbIn ">
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={e1}
                    onClick={() => myFunction9()}
                    onChange={() => onE1ValueChange()}
                  />
                  <span disabled="disabled" className="A1" id="foo9">
                    E1
                  </span>
                </span>
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={e2}
                    onClick={() => myFunction10()}
                    onChange={() => onE2ValueChange()}
                  />
                  <span disabled="disabled" className="A1" id="foo10">
                    E2
                  </span>
                </span>
              </div>
            </div>
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
                  <span disabled="disabled" className="A1" id="foo11">
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
                  <span disabled="disabled" className="A1" id="foo12">
                    F2
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="ButtonRightDiv">
            <div className="tlb">
              <div className="tlbIn ">
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={c1}
                    onClick={() => myFunction5()}
                    onChange={() => onC1ValueChange()}
                  />
                  <span disabled="disabled" className="A1" id="foo5">
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
                  <span disabled="disabled" className="A1" id="foo6">
                    C2
                  </span>
                </span>
              </div>
            </div>
            <div className="tlb">
              <div className="tlbIn ">
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={d1}
                    onClick={() => myFunction7()}
                    onChange={() => onD1ValueChange()}
                  />
                  <span disabled="disabled" className="A1" id="foo7">
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
                  <span disabled="disabled" className="A1" id="foo8">
                    D2
                  </span>
                </span>
              </div>
            </div>
            <div className="tlb">
              <div className="tlbIn ">
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={m1}
                    onClick={() => myFunction13()}
                    onChange={() => onM1ValueChange()}
                  />
                  <span disabled="disabled" className="A1" id="foo13">
                    M1
                  </span>
                </span>
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={m2}
                    onClick={() => myFunction14()}
                    onChange={() => onM2ValueChange()}
                  />
                  <span disabled="disabled" className="A1" id="foo14">
                    M2
                  </span>
                </span>
              </div>
            </div>
            <div className="tlb">
              <div className="tlbIn ">
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={m3}
                    onClick={() => myFunction15()}
                    onChange={() => onM3ValueChange()}
                  />
                  <span disabled="disabled" className="A1" id="foo15">
                    M3
                  </span>
                </span>
                <span className="InputLabel">
                  <input
                    className="InputCheckBox"
                    type="checkbox"
                    checked={m4}
                    onClick={() => myFunction16()}
                    onChange={() => onM4ValueChange()}
                  />
                  <span disabled="disabled" className="A1" id="foo16">
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

export default Port;
