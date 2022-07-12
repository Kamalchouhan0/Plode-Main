import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Panel1 from "./FlowchartConnections/logic/pannel";

import Bottom from "./Bottom";
import selectImg from "../../Assets/img/select bar@2x.png";
import secondaryImg from "../../Assets/img/save - secondary.png";
import strokeImg from "../../Assets/img/button 52x52 - stroke.png";
import connectionImg from "../../Assets/usb - off@2x.png";
import "./InternalAccessories.css";
import "./style.css";

import { connect } from "react-redux";
import { webSerialAction } from "../../redux/actions";

import popupcardImg from "../../Assets/internalAccessories/popupcard@2x.png";
import pcImg from "../../Assets/internalAccessories/PC_image@3x.png";

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

import mic from "../../Assets/internalAccessories/inputsandoutputs/mic.png";
import micEnabled from "../../Assets/internalAccessories/inputsandoutputs/mic-enabled.png";
import temperature from "../../Assets/internalAccessories/inputsandoutputs/temperature.png";
import temperatureEnabled from "../../Assets/internalAccessories/inputsandoutputs/temperature-enabled.png";
import touchzero from "../../Assets/internalAccessories/inputsandoutputs/touchpad0.png";
import touchzeroEnabled from "../../Assets/internalAccessories/inputsandoutputs/touchpad0-enabled.png";
import touchone from "../../Assets/internalAccessories/inputsandoutputs/touchpad1.png";
import touchoneEnabled from "../../Assets/internalAccessories/inputsandoutputs/touchpad1-enabled.png";
import touchtwo from "../../Assets/internalAccessories/inputsandoutputs/touchpad2.png";
import touchtwoEnabled from "../../Assets/internalAccessories/inputsandoutputs/touchpad2-enabled.png";
import distancesensor from "../../Assets/internalAccessories/inputsandoutputs/distancesensor.png";
import distancesensorEnabled from "../../Assets/internalAccessories/inputsandoutputs/distancesensor-enabled.png";
import gesturesensor from "../../Assets/internalAccessories/inputsandoutputs/gesture.png";
import gesturesensorEnabled from "../../Assets/internalAccessories/inputsandoutputs/gesture-enabled.png";
import lightsensor from "../../Assets/internalAccessories/inputsandoutputs/lightsensor.png";
import lightsensorEnabled from "../../Assets/internalAccessories/inputsandoutputs/lightsensor-enabled.png";
import colorsensor from "../../Assets/internalAccessories/inputsandoutputs/colorsensor.png";
import colorsensorEnabled from "../../Assets/internalAccessories/inputsandoutputs/colorsensor-enabled.png";
import lefteye from "../../Assets/internalAccessories/inputsandoutputs/lefteye.png";
import lefteyeEnabled from "../../Assets/internalAccessories/inputsandoutputs/lefteye-enabled.png";
import righteye from "../../Assets/internalAccessories/inputsandoutputs/righteye.png";
import righteyeEnabled from "../../Assets/internalAccessories/inputsandoutputs/righteye-enabled.png";
import buzzer from "../../Assets/internalAccessories/inputsandoutputs/buzzer.png";
import buzzerEnabled from "../../Assets/internalAccessories/inputsandoutputs/buzzer-enabled.png";
import smileone from "../../Assets/internalAccessories/inputsandoutputs/smile1.png";
import smileoneEnabled from "../../Assets/internalAccessories/inputsandoutputs/smile1-enabled.png";
import smiletwo from "../../Assets/internalAccessories/inputsandoutputs/smile2.png";
import smiletwoEnabled from "../../Assets/internalAccessories/inputsandoutputs/smile2-enabled.png";
import smilethree from "../../Assets/internalAccessories/inputsandoutputs/smile3.png";
import smilethreeEnabled from "../../Assets/internalAccessories/inputsandoutputs/smile3-enabled.png";
import smilefour from "../../Assets/internalAccessories/inputsandoutputs/smile4.png";
import smilefourEnabled from "../../Assets/internalAccessories/inputsandoutputs/smile4-enabled.png";
import { Link, useHistory } from "react-router-dom";
import { useLocalStorage } from "../LocalStorage/LocalStorage";
import renderPrgImage from "../../source/programImg";
var Panel = Panel1("");
const InternalAccessories = (props) => {
  const history = useHistory();
  function findIndex(array, string) {
    var index = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i].indexOf(string) > -1) {
        index.push(i);
      }
    }
    return index;
  }

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
      const filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];
      const portList = await navigator.serial.getPorts({ filters });
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
  useEffect(() => {
    const p_Port = props.webSerial;
    if (p_Port.readable != null) {
      console.log("Comp Did Mount");
      let v = 1;
      sessionStorage.setItem("user", JSON.stringify(v));
    }
  }, []);
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

  const [isDistanceSensors, setDistanceSensors] = useLocalStorage(
    "isDistanceSensors",
    false
  );

  const [isGestureSensor, setGestureSensor] = useLocalStorage(
    "isGestureSensor",
    false
  );

  const [isLightSensor, setLightSensor] = useLocalStorage(
    "isLightSensor",
    false
  );

  const [isColorSensor, setColorSensor] = useLocalStorage(
    "isColorSensor",
    false
  );

  const [isTemperature, setTemperature] = useLocalStorage(
    "isTemperature",
    false
  );

  const [isMic, setMic] = useLocalStorage("isMic", false);
  // input
  const [isTouchZero, setTouchZero] = useLocalStorage("isTouchZero", false);
  const [isTouchOne, setTouchOne] = useLocalStorage("isTouchOne", false);
  const [isTouchTwo, setTouchTwo] = useLocalStorage("isTouchTwo", false);

  // outPut
  const [isTouchZeroOutput, setTouchZeroOutput] = useLocalStorage(
    "isTouchZeroOutput",
    false
  );
  const [isTouchOneOutput, setTouchOneOutput] = useLocalStorage(
    "isTouchOneOutput",
    false
  );
  const [isTouchTwoOutput, setTouchTwoOutput] = useLocalStorage(
    "isTouchTwoOutput",
    false
  );

  const [isEyeLeft, setEyeLeft] = useLocalStorage("isEyeLeft", false);
  const [isEyeRight, setEyeRight] = useLocalStorage("isEyeRight", false);
  const [isbuzzer, setbuzzer] = useLocalStorage("isBuzzer", false);

  const [isSimeleOne, setSimleOne] = useLocalStorage("isSmileOne", false);
  const [isSimeleTwo, setSimleTwo] = useLocalStorage("isSmileTwo", false);
  const [isSimeleThree, setSimleThree] = useLocalStorage("isSmileThree", false);
  const [isSimeleFour, setSimleFour] = useLocalStorage("isSmileFour", false);

  const [erasedProgram, setErasedProgram] = useState(false);

  //gsk 28/2/2022 back button logic
  const [a1, setA1] = useLocalStorage(
    "A1",
    JSON.parse(sessionStorage.getItem("A1"))
  );
  const [a1Checked, setA1Checked] = useLocalStorage(
    "a1-I/O",
    JSON.parse(sessionStorage.getItem("a1-I/O"))
  );
  const [a1Digi, setA1Digi] = useLocalStorage(
    "A1DIGI",
    JSON.parse(sessionStorage.getItem("A1DIGI"))
  );
  const [a2, setA2] = useLocalStorage(
    "A2",
    JSON.parse(sessionStorage.getItem("A2"))
  );
  const [a2Checked, setA2Checked] = useLocalStorage(
    "a2-I/O",
    JSON.parse(sessionStorage.getItem("a2-I/O"))
  );
  const [a2Digi, setA2Digi] = useLocalStorage(
    "A2DIGI",
    JSON.parse(sessionStorage.getItem("A2DIGI"))
  );
  const [b1, setB1] = useLocalStorage(
    "B1",
    JSON.parse(sessionStorage.getItem("B1"))
  );
  const [b1Checked, setB1Checked] = useLocalStorage(
    "b1-I/O",
    JSON.parse(sessionStorage.getItem("b1-I/O"))
  );
  const [b1Digi, setB1Digi] = useLocalStorage(
    "B1DIGI",
    JSON.parse(sessionStorage.getItem("B1DIGI"))
  );
  const [b2, setB2] = useLocalStorage(
    "B2",
    JSON.parse(sessionStorage.getItem("B2"))
  );
  const [b2Checked, setB2Checked] = useLocalStorage(
    "b2-I/O",
    JSON.parse(sessionStorage.getItem("b2-I/O"))
  );
  const [b2Digi, setB2Digi] = useLocalStorage(
    "B2DIGI",
    JSON.parse(sessionStorage.getItem("B2DIGI"))
  );
  const [c1, setC1] = useLocalStorage(
    "C1",
    JSON.parse(sessionStorage.getItem("C1"))
  );
  const [c1Checked, setC1Checked] = useLocalStorage(
    "c1-I/O",
    JSON.parse(sessionStorage.getItem("c1-I/O"))
  );
  const [c1Digi, setC1Digi] = useLocalStorage(
    "C1DIGI",
    JSON.parse(sessionStorage.getItem("C1DIGI"))
  );
  const [c2, setC2] = useLocalStorage(
    "C2",
    JSON.parse(sessionStorage.getItem("C2"))
  );
  const [c2Checked, setC2Checked] = useLocalStorage(
    "c2-I/O",
    JSON.parse(sessionStorage.getItem("c2-I/O"))
  );
  const [c2Digi, setC2Digi] = useLocalStorage(
    "C2DIGI",
    JSON.parse(sessionStorage.getItem("C2DIGI"))
  );
  const [d1, setD1] = useLocalStorage(
    "D1",
    JSON.parse(sessionStorage.getItem("D1"))
  );
  const [d1Checked, setD1Checked] = useLocalStorage(
    "d1-I/O",
    JSON.parse(sessionStorage.getItem("d1-I/O"))
  );
  const [d1Digi, setD1Digi] = useLocalStorage(
    "D1DIGI",
    JSON.parse(sessionStorage.getItem("D1DIGI"))
  );
  const [d2, setD2] = useLocalStorage(
    "D2",
    JSON.parse(sessionStorage.getItem("D2"))
  );
  const [d2Checked, setD2Checked] = useLocalStorage(
    "d2-I/O",
    JSON.parse(sessionStorage.getItem("d2-I/O"))
  );
  const [d2Digi, setD2Digi] = useLocalStorage(
    "D2DIGI",
    JSON.parse(sessionStorage.getItem("D2DIGI"))
  );
  const [e1, setE1] = useLocalStorage(
    "E1",
    JSON.parse(sessionStorage.getItem("E1"))
  );
  const [e1Checked, setE1Checked] = useLocalStorage(
    "e1-I/O",
    JSON.parse(sessionStorage.getItem("e1-I/O"))
  );
  const [e1Digi, setE1Digi] = useLocalStorage(
    "E1DIGI",
    JSON.parse(sessionStorage.getItem("E1DIGI"))
  );
  const [e2, setE2] = useLocalStorage(
    "E2",
    JSON.parse(sessionStorage.getItem("E2"))
  );
  const [e2Checked, setE2Checked] = useLocalStorage(
    "e2-I/O",
    JSON.parse(sessionStorage.getItem("e2-I/O"))
  );
  const [e2Digi, setE2Digi] = useLocalStorage(
    "E2DIGI",
    JSON.parse(sessionStorage.getItem("E2DIGI"))
  );
  const [f1, setF1] = useLocalStorage(
    "F1",
    JSON.parse(sessionStorage.getItem("F1"))
  );
  const [f1Checked, setF1Checked] = useLocalStorage(
    "f1-I/O",
    JSON.parse(sessionStorage.getItem("f1-I/O"))
  );
  const [f1Digi, setF1Digi] = useLocalStorage(
    "F1DIGI",
    JSON.parse(sessionStorage.getItem("F1DIGI"))
  );
  const [f2, setF2] = useLocalStorage(
    "F2",
    JSON.parse(sessionStorage.getItem("F2"))
  );
  const [f2Checked, setF2Checked] = useLocalStorage(
    "f2-I/O",
    JSON.parse(sessionStorage.getItem("f2-I/O"))
  );
  const [f2Digi, setF2Digi] = useLocalStorage(
    "F2DIGI",
    JSON.parse(sessionStorage.getItem("F2DIGI"))
  );
  const [m1, setM1] = useLocalStorage(
    "M1",
    JSON.parse(sessionStorage.getItem("M1"))
  );
  const [m1Checked, setM1Checked] = useLocalStorage(
    "m1-I/O",
    JSON.parse(sessionStorage.getItem("m1-I/O"))
  );
  const [m1Digi, setM1Digi] = useLocalStorage(
    "M1DIGI",
    JSON.parse(sessionStorage.getItem("M1DIGI"))
  );
  const [m2, setM2] = useLocalStorage(
    "M2",
    JSON.parse(sessionStorage.getItem("M2"))
  );
  const [m2Checked, setM2Checked] = useLocalStorage(
    "m2-I/O",
    JSON.parse(sessionStorage.getItem("m2-I/O"))
  );
  const [m2Digi, setM2Digi] = useLocalStorage(
    "M2DIGI",
    JSON.parse(sessionStorage.getItem("M2DIGI"))
  );
  const [m3, setM3] = useLocalStorage(
    "M3",
    JSON.parse(sessionStorage.getItem("M3"))
  );
  const [m3Checked, setM3Checked] = useLocalStorage(
    "m3-I/O",
    JSON.parse(sessionStorage.getItem("m3-I/O"))
  );
  const [m3Digi, setM3Digi] = useLocalStorage(
    "M3DIGI",
    JSON.parse(sessionStorage.getItem("M3DIGI"))
  );
  const [m4, setM4] = useLocalStorage(
    "M4",
    JSON.parse(sessionStorage.getItem("M4"))
  );
  const [m4Checked, setM4Checked] = useLocalStorage(
    "m4-I/O",
    JSON.parse(sessionStorage.getItem("m4-I/O"))
  );
  const [m4Digi, setM4Digi] = useLocalStorage(
    "M4DIGI",
    JSON.parse(sessionStorage.getItem("M4DIGI"))
  );
  function findIndex_new(array, string) {
    var index = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i].indexOf(string) > -1 && array[i].indexOf("countRGB") == -1) {
        index.push(i);
      }
    }
    return index;
  }
  const handleEventsClick = (e) => {
    switch (e.target.alt) {
      case "mic": {
        var x = document.getElementById("snackbar1");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isMic) {
          setMic(false);
        } else {
          setMic(true);
        }
        break;
      }
      case "temperature": {
        var x = document.getElementById("snackbar2");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTemperature) {
          setTemperature(false);
        } else {
          setTemperature(true);
        }
        break;
      }

      case "touch0": {
        if (JSON.parse(sessionStorage.getItem("A1"))) return;
        var x = document.getElementById("snackbar3");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTouchZero) {
          setTouchZero(false);
        } else {
          setTouchZero(true);
          setTouchZeroOutput(false);
        }
        break;
      }

      case "touch1": {
        if (JSON.parse(sessionStorage.getItem("B1"))) return;
        var x = document.getElementById("snackbar4");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTouchOne) {
          setTouchOne(false);
        } else {
          setTouchOne(true);
          setTouchOneOutput(false);
        }
        break;
      }
      case "touch2": {
        if (JSON.parse(sessionStorage.getItem("C1"))) return;
        var x = document.getElementById("snackbar5");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTouchTwo) {
          setTouchTwo(false);
        } else {
          setTouchTwo(true);
          setTouchTwoOutput(false);
        }
        break;
      }

      case "touch0Output": {
        if (JSON.parse(sessionStorage.getItem("A1"))) return;
        var x = document.getElementById("snackbar6");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTouchZeroOutput) {
          setTouchZeroOutput(false);
        } else {
          setTouchZeroOutput(true);
          setTouchZero(false);
        }
        let a = findIndex(Object.keys(sessionStorage), "t0");
        console.log("gsk", a);
        for (let i in a) {
          sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
        }
        break;
      }
      case "touch1Output": {
        if (JSON.parse(sessionStorage.getItem("B1"))) return;
        var x = document.getElementById("snackbar7");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTouchOneOutput) {
          setTouchOneOutput(false);
        } else {
          setTouchOneOutput(true);
          setTouchOne(false);
        }
        let a = findIndex(Object.keys(sessionStorage), "t1");
        console.log("gsk", a);
        for (let i in a) {
          sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
        }
        break;
      }

      case "touch2Output": {
        if (JSON.parse(sessionStorage.getItem("C1"))) return;
        var x = document.getElementById("snackbar8");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isTouchTwoOutput) {
          setTouchTwoOutput(false);
        } else {
          setTouchTwoOutput(true);
          setTouchTwo(false);
        }
        let a = findIndex(Object.keys(sessionStorage), "t2");
        console.log("gsk", a);
        for (let i in a) {
          sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
        }
        break;
      }

      case "leftEye": {
        var x = document.getElementById("snackbar9");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isEyeLeft) {
          setEyeLeft(false);
        } else {
          setEyeLeft(true);
        }
        let a = findIndex(Object.keys(sessionStorage), "le");
        console.log("gsk", a);
        for (let i in a) {
          sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
        }
        break;
      }

      case "rightEye": {
        var x = document.getElementById("snackbar10");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isEyeRight) {
          setEyeRight(false);
        } else {
          setEyeRight(true);
        }
        let a = findIndex(Object.keys(sessionStorage), "re");
        console.log("gsk", a);
        for (let i in a) {
          sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
        }
        break;
      }

      case "buzzer": {
        var x = document.getElementById("snackbar11");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isbuzzer) {
          setbuzzer(false);
        } else {
          setbuzzer(true);
        }
        let a = findIndex(Object.keys(sessionStorage), "buzz");
        console.log("gsk", a);
        for (let i in a) {
          sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
        }
        break;
      }

      case "smile1": {
        if (JSON.parse(sessionStorage.getItem("M1"))) return;
        var x = document.getElementById("snackbar12");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isSimeleOne) {
          setSimleOne(false);
        } else {
          setSimleOne(true);
        }
        let a = findIndex(Object.keys(sessionStorage), "s1");
        console.log("gsk", a);
        for (let i in a) {
          sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
        }
        break;
      }

      case "smile2": {
        if (JSON.parse(sessionStorage.getItem("M2"))) return;

        var x = document.getElementById("snackbar13");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isSimeleTwo) {
          setSimleTwo(false);
        } else {
          setSimleTwo(true);
        }
        let a = findIndex(Object.keys(sessionStorage), "s2");
        console.log("gsk", a);
        for (let i in a) {
          sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
        }
        break;
      }

      case "smile3": {
        if (JSON.parse(sessionStorage.getItem("M3"))) return;

        var x = document.getElementById("snackbar14");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isSimeleThree) {
          setSimleThree(false);
        } else {
          setSimleThree(true);
        }
        let a = findIndex(Object.keys(sessionStorage), "s3");
        console.log("gsk", a);
        for (let i in a) {
          sessionStorage.setItem(Object.keys(sessionStorage)[a[i]], 0);
        }
        break;
      }

      case "smile4": {
        if (JSON.parse(sessionStorage.getItem("s4"))) return;

        var x = document.getElementById("snackbar15");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isSimeleFour) {
          setSimleFour(false);
        } else {
          setSimleFour(true);
        }
      }
    }
  };
  const handleFounInOneSensor = (e) => {
    switch (e.target.alt) {
      case "distancesensors": {
        if (JSON.parse(sessionStorage.getItem("D1"))) return;
        var x = document.getElementById("snackbar16");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isDistanceSensors) {
          setDistanceSensors(false);
        } else {
          setDistanceSensors(true);
          setColorSensor(false);
          setGestureSensor(false);
          setLightSensor(false);
        }

        break;
      }
      case "gesturesensor": {
        if (JSON.parse(sessionStorage.getItem("D1"))) return;
        var x = document.getElementById("snackbar17");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isGestureSensor) {
          setGestureSensor(false);
        } else {
          setDistanceSensors(false);
          setColorSensor(false);
          setGestureSensor(true);
          setLightSensor(false);
        }
        break;
      }
      case "lightsensor": {
        if (JSON.parse(sessionStorage.getItem("D1"))) return;
        var x = document.getElementById("snackbar18");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isLightSensor) {
          setLightSensor(false);
        } else {
          setDistanceSensors(false);
          setColorSensor(false);
          setGestureSensor(false);
          setLightSensor(true);
        }
        break;
      }
      case "colorsensor": {
        if (JSON.parse(sessionStorage.getItem("D1"))) return;
        var x = document.getElementById("snackbar19");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 1000);
        if (isColorSensor) {
          setColorSensor(false);
        } else {
          setDistanceSensors(false);
          setColorSensor(true);
          setGestureSensor(false);
          setLightSensor(false);
        }
        break;
      }
    }
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      height: "23%",
      width: " 25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "5px solid rgb(255,140,25)",
      borderRadius: "20px",
      overflow: "initial",
      // zIndex: 1,
    },
  };
  const backBtnAction = () => {
    setErasedProgram(true);
  };
  const shouldErase = (info) => {
    if (info == "Yes") {
      // localStorage.clear();
      // sessionStorage.clear();

      var arr = Object.keys(sessionStorage);
      for (const i of arr) {
        if (
          i != "connectedDevice" &&
          i != "Hardware" &&
          i != "userData" &&
          i != "concept" &&
          i != "webSerialPortList" &&
          i != "user"
        ) {
          //arr.push(i);
          sessionStorage.removeItem(i);
          // console.log(i, "sess");
        }
      }
      //sessionStorage.setItem("testarr", JSON.stringify(arr));

      // sessionStorage.removeItem("Index");
      // props.indexData.concept.Index = [];
      // props.history.push("/programSelection");
      // setDistanceSensors(false);
      // setGestureSensor(false);
      // setLightSensor(false);
      // setColorSensor(false);
      // setTemperature(false);
      // setMic(false);
      // setTouchZero(false);
      // setTouchOne(false);
      // setTouchTwo(false);
      // setTouchZeroOutput(false);
      // setTouchOneOutput(false);
      // setTouchTwoOutput(false);
      // setEyeLeft(false);
      // setEyeRight(false);
      // setbuzzer(false);
      // setSimleOne(false);
      // setSimleTwo(false);
      // setSimleThree(false);
      // setSimleFour(false);
      // setA1(false);
      // setA1Checked(false);
      // setA1Digi(false);
      // setA2(false);
      // setA2Checked(false);
      // setA2Digi(false);
      // setB1(false);
      // setB1Checked(false);
      // setB1Digi(false);
      // setB2(false);
      // setB2Checked(false);
      // setB2Digi(false);
      // setC1(false);
      // setC1Checked(false);
      // setC1Digi(false);
      // setC2(false);
      // setC2Checked(false);
      // setC2Digi(false);
      // setD1(false);
      // setD1Checked(false);
      // setD1Digi(false);
      // setD2(false);
      // setD2Checked(false);
      // setD2Digi(false);
      // setE1(false);
      // setE1Checked(false);
      // setE1Digi(false);
      // setE2(false);
      // setE2Checked(false);
      // setE2Digi(false);
      // setF1(false);
      // setF1Checked(false);
      // setF1Digi(false);
      // setF2(false);
      // setF2Checked(false);
      // setF2Digi(false);
      // setM1(false);
      // setM1Checked(false);
      // setM1Digi(false);
      // setM2(false);
      // setM2Checked(false);
      // setM2Digi(false);
      // setM3(false);
      // setM3Checked(false);
      // setM3Digi(false);
      // setM4(false);
      // setM4Checked(false);
      // setM4Digi(false);
      // sessionStorage.setItem("flowchart-elements", null);
      // sessionStorage.setItem("flowchart-elements-id", null);
      history.push("/flow");
      // window.location.reload();
    } else {
      setErasedProgram(false);
    }
  };

  var dataErased = (
    <Modal
      isOpen={erasedProgram}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="erasedConceptMsg" style={{ zIndex: "999" }}>
        <p>All Unsaved program will be Erased, Continue ?</p>
        <button
          className="BtnPopup"
          onClick={() => shouldErase("Yes")}
          style={{ position: "relative", top: "-7px" }}
        >
          Yes
        </button>
        <button
          className="BtnPopup"
          onClick={() => shouldErase("No")}
          style={{ position: "relative", top: "-7px", left: "10px" }}
        >
          No
        </button>
      </div>
    </Modal>
  );
  const next = () => {
    history.push("/flow/selectports");
  };

  return (
    <div className="flowchart-InternalAccessoriesScreen_Main">
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
              style={{
                width: "61px",
                height: "61px",
                marginRight: "10px",
                // changes start
                marginTop: "-12px",
                // changes end
              }}
              src={secondaryImg}
            ></img>
            <img
              className="flowchart-iconBtnSize iconBtnSize"
              style={{
                width: "61px",
                height: "61px",
                marginRight: "10px",
                // changes start
                marginTop: "-12px",
                // changes end
              }}
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
      {dataErased}
      <div className="flowchart-Item-1">
        <div className="flowchart-InternalAccessoriesScreen-Item1">
          <div
            className="flowchart-device"
            style={{
              width: "78%",
              height: "70%",
              backgroundImage: `url(${pcImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "76% 96%",
              backgroundPosition: "50% 50%",
              zIndex: "110",
              top: "7%",
              position: "relative",
            }}
          >
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
                <img
                  src={PcinternalBuzzerInActive}
                  className="imgStyleBuzzer"
                />
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
        </div>
        <div className="flowchart-InternalAccessoriesScreen-Item2">
          <div
            className="input"
            style={{
              width: "50%",
              height: "100%",
              position: "relative",
              backgroundImage: `url(${popupcardImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 90%",
            }}
          >
            <p
              className="flowchart-inputText"
              style={{ fontFamily: "Halcyon_SemiBold" }}
            >
              Inputs
            </p>

            <div class="inputContiner">
              <div class="container-row ">
                {isMic ? (
                  <img
                    src={micEnabled}
                    className="imgStyle"
                    alt="mic"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={mic}
                    className="imgStyle"
                    alt="mic"
                    onClick={handleEventsClick}
                  />
                )}{" "}
                {isTemperature ? (
                  <img
                    src={temperatureEnabled}
                    className="imgStyle"
                    alt="temperature"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={temperature}
                    className="imgStyle"
                    alt="temperature"
                    onClick={handleEventsClick}
                  />
                )}{" "}
              </div>
              <div class="container-row">
                {isTouchZero ? (
                  <img
                    src={touchzeroEnabled}
                    className="imgStyle"
                    alt="touch0"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={touchzero}
                    className="imgStyle"
                    alt="touch0"
                    onClick={handleEventsClick}
                  />
                )}
                {isTouchOne ? (
                  <img
                    src={touchoneEnabled}
                    className="imgStyle"
                    alt="touch1"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={touchone}
                    className="imgStyle"
                    alt="touch1"
                    onClick={handleEventsClick}
                  />
                )}

                {isTouchTwo ? (
                  <img
                    src={touchtwoEnabled}
                    className="imgStyle"
                    alt="touch2"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={touchtwo}
                    className="imgStyle"
                    alt="touch2"
                    onClick={handleEventsClick}
                  />
                )}
              </div>
              <div class="container-row">
                {isDistanceSensors ? (
                  <img
                    src={distancesensorEnabled}
                    className="imgStyle"
                    alt="distancesensors"
                    onClick={handleFounInOneSensor}
                  />
                ) : (
                  <img
                    src={distancesensor}
                    className="imgStyle"
                    alt="distancesensors"
                    onClick={handleFounInOneSensor}
                  />
                )}
                {isGestureSensor ? (
                  <img
                    src={gesturesensorEnabled}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="gesturesensor"
                  />
                ) : (
                  <img
                    src={gesturesensor}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="gesturesensor"
                  />
                )}

                {isLightSensor ? (
                  <img
                    src={lightsensorEnabled}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="lightsensor"
                  />
                ) : (
                  <img
                    src={lightsensor}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="lightsensor"
                  />
                )}

                {isColorSensor ? (
                  <img
                    src={colorsensorEnabled}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="colorsensor"
                  />
                ) : (
                  <img
                    src={colorsensor}
                    className="imgStyle"
                    onClick={handleFounInOneSensor}
                    alt="colorsensor"
                  />
                )}
              </div>

              {isMic ? (
                <div id="snackbar1">Microphone Enabled</div>
              ) : (
                <div id="snackbar1">Microphone Disabled</div>
              )}
              {isTemperature ? (
                <div id="snackbar2">Temperature Enabled</div>
              ) : (
                <div id="snackbar2">Temperature Disabled</div>
              )}

              {isTouchZero ? (
                <div id="snackbar3">Touch pad 0 Enabled</div>
              ) : (
                <div id="snackbar3">Touch pad 0 Disabled</div>
              )}
              {isTouchOne ? (
                <div id="snackbar4">Touch pad 1 Enabled</div>
              ) : (
                <div id="snackbar4">Touch pad 1 Disabled</div>
              )}
              {isTouchTwo ? (
                <div id="snackbar5">Touch pad 2 Enabled</div>
              ) : (
                <div id="snackbar5">Touch pad 2 Disabled</div>
              )}

              {isTouchZeroOutput ? (
                <div id="snackbar6">Touch pad 0 Enabled</div>
              ) : (
                <div id="snackbar6">Touch pad 0 Disabled</div>
              )}
              {isTouchOneOutput ? (
                <div id="snackbar7">Touch pad 1 Enabled</div>
              ) : (
                <div id="snackbar7">Touch pad 1 Disabled</div>
              )}
              {isTouchTwoOutput ? (
                <div id="snackbar8">Touch pad 2 Enabled</div>
              ) : (
                <div id="snackbar8">Touch pad 2 Disabled</div>
              )}

              {isEyeLeft ? (
                <div id="snackbar9">Left Eye Enabled</div>
              ) : (
                <div id="snackbar9">Left Eye Disabled</div>
              )}
              {isEyeRight ? (
                <div id="snackbar10">Rigth Eye Enabled</div>
              ) : (
                <div id="snackbar10">Rigth Eye Disabled</div>
              )}
              {isbuzzer ? (
                <div id="snackbar11">Buzzer Enabled</div>
              ) : (
                <div id="snackbar11">Buzzer Disabled</div>
              )}

              {isSimeleOne ? (
                <div id="snackbar12">Smile 1 Enabled</div>
              ) : (
                <div id="snackbar12">Smile 1 Disabled</div>
              )}
              {isSimeleTwo ? (
                <div id="snackbar13">Smile 2 Enabled</div>
              ) : (
                <div id="snackbar13">Smile 2 Disabled</div>
              )}
              {isSimeleThree ? (
                <div id="snackbar14">Smile 3 Enabled</div>
              ) : (
                <div id="snackbar14">Smile 3 Disabled</div>
              )}
              {isSimeleFour ? (
                <div id="snackbar15">Smile 4 Enabled</div>
              ) : (
                <div id="snackbar15">Smile 4 Disabled</div>
              )}
              {isDistanceSensors ? (
                <div id="snackbar16">Distance Sensor Enabled</div>
              ) : (
                <div id="snackbar16">Distance Sensor Disabled</div>
              )}
              {isGestureSensor ? (
                <div id="snackbar17">Gesture Sensor Enabled</div>
              ) : (
                <div id="snackbar17">Gesture Sensor Disabled</div>
              )}
              {isLightSensor ? (
                <div id="snackbar18">Light Sensor Enabled</div>
              ) : (
                <div id="snackbar18">Light Sensor Disabled</div>
              )}
              {isColorSensor ? (
                <div id="snackbar19">Color Sensor Enabled</div>
              ) : (
                <div id="snackbar19">Color Sensor Disabled</div>
              )}
            </div>
          </div>
          <div
            className="output"
            style={{
              width: "50%",
              height: "100%",
              position: "relative",
              backgroundImage: `url(${popupcardImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 90%",
            }}
          >
            <p
              className="flowchart-txtTitle"
              style={{ fontFamily: "Halcyon_SemiBold" }}
            >
              Outputs
            </p>
            <div class="outputContiner">
              <div class="container-row ">
                {isTouchZeroOutput ? (
                  <img
                    src={touchzeroEnabled}
                    className="imgStyle"
                    alt="touch0Output"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={touchzero}
                    className="imgStyle"
                    alt="touch0Output"
                    onClick={handleEventsClick}
                  />
                )}
                {isTouchOneOutput ? (
                  <img
                    src={touchoneEnabled}
                    className="imgStyle"
                    alt="touch1Output"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={touchone}
                    className="imgStyle"
                    alt="touch1Output"
                    onClick={handleEventsClick}
                  />
                )}
                {isTouchTwoOutput ? (
                  <img
                    src={touchtwoEnabled}
                    className="imgStyle"
                    alt="touch2Output"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={touchtwo}
                    className="imgStyle"
                    alt="touch2Output"
                    onClick={handleEventsClick}
                  />
                )}
              </div>
              <div class="container-row">
                {isEyeLeft ? (
                  <img
                    src={lefteyeEnabled}
                    className="imgStyle"
                    alt="leftEye"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={lefteye}
                    className="imgStyle"
                    alt="leftEye"
                    onClick={handleEventsClick}
                  />
                )}
                {isEyeRight ? (
                  <img
                    src={righteyeEnabled}
                    className="imgStyle"
                    alt="rightEye"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={righteye}
                    className="imgStyle"
                    alt="rightEye"
                    onClick={handleEventsClick}
                  />
                )}
                {isbuzzer ? (
                  <img
                    src={buzzerEnabled}
                    className="imgStyle"
                    alt="buzzer"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={buzzer}
                    className="imgStyle"
                    alt="buzzer"
                    onClick={handleEventsClick}
                  />
                )}
              </div>
              <div class="container-row">
                {isSimeleOne ? (
                  <img
                    src={smileoneEnabled}
                    className="imgStyle"
                    alt="smile1"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={smileone}
                    className="imgStyle"
                    alt="smile1"
                    onClick={handleEventsClick}
                  />
                )}

                {isSimeleTwo ? (
                  <img
                    src={smiletwoEnabled}
                    className="imgStyle"
                    alt="smile2"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={smiletwo}
                    className="imgStyle"
                    alt="smile2"
                    onClick={handleEventsClick}
                  />
                )}

                {isSimeleThree ? (
                  <img
                    src={smilethreeEnabled}
                    className="imgStyle"
                    alt="smile3"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={smilethree}
                    className="imgStyle"
                    alt="smile3"
                    onClick={handleEventsClick}
                  />
                )}

                {isSimeleFour ? (
                  <img
                    src={smilefourEnabled}
                    className="imgStyle"
                    alt="smile4"
                    onClick={handleEventsClick}
                  />
                ) : (
                  <img
                    src={smilefour}
                    className="imgStyle"
                    alt="smile4"
                    onClick={handleEventsClick}
                  />
                )}
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
            style={{ fontFamily: "Halcyon_SemiBold", zIndex: "-10" }}
          >
            <p>Select the internal accessories of Play Computer</p>
          </div>

          <img
            className="iconBtnSize imgNextBtn"
            src={renderPrgImage("nextBtn")}
            onClick={next}
          />
        </div>
      </div>
      {/* <Bottom
        to="/flow/selectports"
        prev="/visualProgram"
        description="Tap on the icon to select the in built Play Computer feature"
      /> */}
    </div>
  );
};

// export default InternalAccessories;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalAccessories);
