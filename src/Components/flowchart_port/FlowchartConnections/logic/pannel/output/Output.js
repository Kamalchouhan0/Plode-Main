import React, { useState, useLayoutEffect, useEffect } from "react";
import Slider from "../helpers/Slider";
import TextRow from "../helpers/TextRow";
import renderImage from "../../../../../../source/importImg";
import { useLocalStorage } from "../../../../../LocalStorage/LocalStorage";
import "./output.css";
var _0to60 = {},
  _0to24 = {},
  _0to1000 = {};
for (let i = 0; i < 24; i++) _0to24[i] = i;
for (let i = 0; i < 60; i++) _0to60[i] = i;
for (let i = 0; i < 1000; i += 50) _0to1000[i] = i;

const OutputPanel = (props) => {
  const [valA1, setvalA1] = useState(
    parseInt(sessionStorage.getItem(`a1${props.check}`)) || 0
  );
  const [valA2, setvalA2] = useState(
    parseInt(sessionStorage.getItem(`a2${props.check}`)) || 0
  );
  const [valB1, setvalB1] = useState(
    parseInt(sessionStorage.getItem(`b1${props.check}`)) || 0
  );
  const [valB2, setvalB2] = useState(
    parseInt(sessionStorage.getItem(`b2${props.check}`)) || 0
  );
  const [valC1, setvalC1] = useState(
    parseInt(sessionStorage.getItem(`c1${props.check}`)) || 0
  );
  const [valC2, setvalC2] = useState(
    parseInt(sessionStorage.getItem(`c2${props.check}`)) || 0
  );
  const [valD1, setvalD1] = useState(
    parseInt(sessionStorage.getItem(`d1${props.check}`)) || 0
  );
  const [valD2, setvalD2] = useState(
    parseInt(sessionStorage.getItem(`d2${props.check}`)) || 0
  );
  const [valE1, setvalE1] = useState(
    parseInt(sessionStorage.getItem(`e1${props.check}`)) || 0
  );
  const [valE2, setvalE2] = useState(
    parseInt(sessionStorage.getItem(`e2${props.check}`)) || 0
  );
  const [valF1, setvalF1] = useState(
    parseInt(sessionStorage.getItem(`f1${props.check}`)) || 0
  );
  const [valF2, setvalF2] = useState(
    parseInt(sessionStorage.getItem(`f2${props.check}`)) || 0
  );
  const [valM1, setvalM1] = useState(
    parseInt(sessionStorage.getItem(`m1${props.check}`)) || 0
  );
  const [valM2, setvalM2] = useState(
    parseInt(sessionStorage.getItem(`m2${props.check}`)) || 0
  );
  const [valM3, setvalM3] = useState(
    parseInt(sessionStorage.getItem(`m3${props.check}`)) || 0
  );
  const [valM4, setvalM4] = useState(
    parseInt(sessionStorage.getItem(`m4${props.check}`)) || 0
  );
  const [valT0, setvalT0] = useState(
    parseInt(sessionStorage.getItem(`t0${props.check}`)) || 0
  );
  const [valT1, setvalT1] = useState(
    parseInt(sessionStorage.getItem(`t1${props.check}`)) || 0
  );
  const [valT2, setvalT2] = useState(
    parseInt(sessionStorage.getItem(`t2${props.check}`)) || 0
  );

  const [isClickOLED1, setIsClickOLED1] = useState(
    Boolean(
      sessionStorage.getItem(`oledChk1${props.check}`) == "1" ||
        sessionStorage.getItem(`oledChk1${props.check}`) == "true"
    ) || false
  );
  const [isClickOLED2, setIsClickOLED2] = useState(
    Boolean(
      sessionStorage.getItem(`oledChk2${props.check}`) == "1" ||
        sessionStorage.getItem(`oledChk2${props.check}`) == "true"
    ) || false
  );
  const [isClickOLED3, setIsClickOLED3] = useState(
    Boolean(
      sessionStorage.getItem(`oledChk3${props.check}`) == "1" ||
        sessionStorage.getItem(`oledChk3${props.check}`) == "true"
    ) || false
  );
  const [curValOLED1, setCurValOLED1] = useState(
    sessionStorage.getItem(`oled1${props.check}`) || ""
  );
  const [curValOLED2, setCurValOLED2] = useState(
    sessionStorage.getItem(`oled2${props.check}`) || ""
  );
  const [curValOLED3, setCurValOLED3] = useState(
    sessionStorage.getItem(`oled3${props.check}`) || ""
  );

  const [valLeye, setvalLeye] = useState(
    Boolean(
      sessionStorage.getItem(`le${props.check}`) == "1" ||
        sessionStorage.getItem(`le${props.check}`) == "true"
    ) || false
  );
  const [valLeyeR, setvalLeyeR] = useState(
    parseInt(sessionStorage.getItem(`leR${props.check}`)) || 0
  );
  const [valLeyeG, setvalLeyeG] = useState(
    parseInt(sessionStorage.getItem(`leG${props.check}`)) || 0
  );
  const [valLeyeB, setvalLeyeB] = useState(
    parseInt(sessionStorage.getItem(`leB${props.check}`)) || 0
  );

  const [valReye, setvalReye] = useState(
    Boolean(
      sessionStorage.getItem(`re${props.check}`) == "1" ||
        sessionStorage.getItem(`re${props.check}`) == "true"
    ) || false
  );
  const [valReyeR, setvalReyeR] = useState(
    parseInt(sessionStorage.getItem(`reR${props.check}`)) || 0
  );
  const [valReyeG, setvalReyeG] = useState(
    parseInt(sessionStorage.getItem(`reG${props.check}`)) || 0
  );
  const [valReyeB, setvalReyeB] = useState(
    parseInt(sessionStorage.getItem(`reB${props.check}`)) || 0
  );

  const [valBuzz, setvalBuzz] = useState(
    parseInt(sessionStorage.getItem(`buzz${props.check}`)) || 0
  );
  const [buzzCheckbox, setBuzzCheckbox] = useState(
    Boolean(
      sessionStorage.getItem(`buzzChk${props.check}`) == "1" ||
        sessionStorage.getItem(`buzzChk${props.check}`) == "true"
    ) || false
  );
  const [valSm1, setvalSm1] = useState(
    parseInt(sessionStorage.getItem(`s1${props.check}`)) || 0
  );
  const [valSm2, setvalSm2] = useState(
    parseInt(sessionStorage.getItem(`s2${props.check}`)) || 0
  );
  const [valSm3, setvalSm3] = useState(
    parseInt(sessionStorage.getItem(`s3${props.check}`)) || 0
  );
  const [valSm4, setvalSm4] = useState(
    parseInt(sessionStorage.getItem(`s4${props.check}`)) || 0
  );
  const [a1Checkbox, setA1Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`a1Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`a1Chk${props.check}`) == "true"
    ) || false
  );
  const [a2Checkbox, setA2Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`a2Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`a3Chk${props.check}`) == "true"
    ) || false
  );
  const [b1Checkbox, setB1Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`b1Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`b1Chk${props.check}`) == "true"
    ) || false
  );
  const [b2Checkbox, setB2Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`b2Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`b2Chk${props.check}`) == "true"
    ) || false
  );
  const [c1Checkbox, setC1Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`c1Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`c1Chk${props.check}`) == "true"
    ) || false
  );
  const [c2Checkbox, setC2Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`c2Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`c2Chk${props.check}`) == "true"
    ) || false
  );
  const [d1Checkbox, setD1Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`d1Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`d1Chk${props.check}`) == "true"
    ) || false
  );
  const [d2Checkbox, setD2Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`d2Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`d2Chk${props.check}`) == "true"
    ) || false
  );
  const [e1Checkbox, setE1Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`e1Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`e1Chk${props.check}`) == "true"
    ) || false
  );
  const [e2Checkbox, setE2Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`e2Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`e2Chk${props.check}`) == "true"
    ) || false
  );
  const [f1Checkbox, setF1Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`f1Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`f1Chk${props.check}`) == "true"
    ) || false
  );
  const [f2Checkbox, setF2Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`f2Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`f2Chk${props.check}`) == "true"
    ) || false
  );
  const [m1Checkbox, setM1Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`m1Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`m1Chk${props.check}`) == "true"
    ) || false
  );
  const [m2Checkbox, setM2Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`m2Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`m2Chk${props.check}`) == "true"
    ) || false
  );
  const [m3Checkbox, setM3Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`m3Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`m3Chk${props.check}`) == "true"
    ) || false
  );
  const [m4Checkbox, setM4Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`m4Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`m4Chk${props.check}`) == "true"
    ) || false
  );
  const [s1Checkbox, setS1Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`s1Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`s1Chk${props.check}`) == "true"
    ) || false
  );
  const [s2Checkbox, setS2Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`s2Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`s2Chk${props.check}`) == "true"
    ) || false
  );
  const [s3Checkbox, setS3Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`s3Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`s3Chk${props.check}`) == "true"
    ) || false
  );
  const [s4Checkbox, setS4Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`s4Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`s4Chk${props.check}`) == "true"
    ) || false
  );
  const [t0Checkbox, setT0Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`t0Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`t0Chk${props.check}`) == "true"
    ) || false
  );
  const [t1Checkbox, setT1Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`t1Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`t1Chk${props.check}`) == "true"
    ) || false
  );
  const [t2Checkbox, setT2Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`t2Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`t2Chk${props.check}`) == "true"
    ) || false
  );
  const [valMP3, setvalMP3] = useState(
    parseInt(sessionStorage.getItem(`mp3${props.check}`)) || 0
  );
  const [mp3Checkbox, setMP3Checkbox] = useState(
    Boolean(
      sessionStorage.getItem(`mp3Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`mp3Chk${props.check}`) == "true"
    ) || false
  );
  const [countRGBComp, setCountRGBComp] = useState(
    parseInt(sessionStorage.getItem(`countRGB${props.check}`)) || 1
  );
  let rgbArray1 = JSON.parse(sessionStorage.getItem(`valRGB1${props.check}`)),
    rgbArray2 = JSON.parse(sessionStorage.getItem(`valRGB2${props.check}`)),
    rgbArray3 = JSON.parse(sessionStorage.getItem(`valRGB3${props.check}`)),
    rgbArray4 = JSON.parse(sessionStorage.getItem(`valRGB4${props.check}`)),
    rgbArray5 = JSON.parse(sessionStorage.getItem(`valRGB5${props.check}`)),
    rgbArray6 = JSON.parse(sessionStorage.getItem(`valRGB6${props.check}`)),
    rgbArray7 = JSON.parse(sessionStorage.getItem(`valRGB7${props.check}`)),
    rgbArray8 = JSON.parse(sessionStorage.getItem(`valRGB8${props.check}`)),
    rgbArray9 = JSON.parse(sessionStorage.getItem(`valRGB9${props.check}`)),
    rgbArray10 = JSON.parse(sessionStorage.getItem(`valRGB10${props.check}`));
  if (rgbArray1 == null) rgbArray1 = { r: 0, g: 0, b: 0 };
  if (rgbArray2 == null) rgbArray2 = { r: 0, g: 0, b: 0 };
  if (rgbArray3 == null) rgbArray3 = { r: 0, g: 0, b: 0 };
  if (rgbArray4 == null) rgbArray4 = { r: 0, g: 0, b: 0 };
  if (rgbArray5 == null) rgbArray5 = { r: 0, g: 0, b: 0 };
  if (rgbArray6 == null) rgbArray6 = { r: 0, g: 0, b: 0 };
  if (rgbArray7 == null) rgbArray7 = { r: 0, g: 0, b: 0 };
  if (rgbArray8 == null) rgbArray8 = { r: 0, g: 0, b: 0 };
  if (rgbArray9 == null) rgbArray9 = { r: 0, g: 0, b: 0 };
  if (rgbArray10 == null) rgbArray10 = { r: 0, g: 0, b: 0 };
  const [valRgb1, setValRgb1] = useState([
    rgbArray1.r || 0,
    rgbArray1.g || 0,
    rgbArray1.b || 0,
  ]);
  const [valRgb2, setValRgb2] = useState([
    rgbArray2.r || 0,
    rgbArray2.g || 0,
    rgbArray2.b || 0,
  ]);
  const [valRgb3, setValRgb3] = useState([
    rgbArray3.r || 0,
    rgbArray3.g || 0,
    rgbArray3.b || 0,
  ]);
  const [valRgb4, setValRgb4] = useState([
    rgbArray4.r || 0,
    rgbArray4.g || 0,
    rgbArray4.b || 0,
  ]);
  const [valRgb5, setValRgb5] = useState([
    rgbArray5.r || 0,
    rgbArray5.g || 0,
    rgbArray5.b || 0,
  ]);
  const [valRgb6, setValRgb6] = useState([
    rgbArray6.r || 0,
    rgbArray6.g || 0,
    rgbArray6.b || 0,
  ]);
  const [valRgb7, setValRgb7] = useState([
    rgbArray7.r || 0,
    rgbArray7.g || 0,
    rgbArray7.b || 0,
  ]);
  const [valRgb8, setValRgb8] = useState([
    rgbArray8.r || 0,
    rgbArray8.g || 0,
    rgbArray8.b || 0,
  ]);
  const [valRgb9, setValRgb9] = useState([
    rgbArray9.r || 0,
    rgbArray9.g || 0,
    rgbArray9.b || 0,
  ]);
  const [valRgb10, setValRgb10] = useState([
    rgbArray10.r || 0,
    rgbArray10.g || 0,
    rgbArray10.b || 0,
  ]);
  const [rgb1, setRgb1] = useState(
    Boolean(
      sessionStorage.getItem(`rgb1Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`rgb1Chk${props.check}`) == "true"
    ) || false
  );
  const [rgb2, setRgb2] = useState(
    Boolean(
      sessionStorage.getItem(`rgb2Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`rgb2Chk${props.check}`) == "true"
    ) || false
  );
  const [rgb3, setRgb3] = useState(
    Boolean(
      sessionStorage.getItem(`rgb3Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`rgb3Chk${props.check}`) == "true"
    ) || false
  );
  const [rgb4, setRgb4] = useState(
    Boolean(
      sessionStorage.getItem(`rgb4Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`rgb4Chk${props.check}`) == "true"
    ) || false
  );
  const [rgb5, setRgb5] = useState(
    Boolean(
      sessionStorage.getItem(`rgb5Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`rgb5Chk${props.check}`) == "true"
    ) || false
  );
  const [rgb6, setRgb6] = useState(
    Boolean(
      sessionStorage.getItem(`rgb6Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`rgb6Chk${props.check}`) == "true"
    ) || false
  );
  const [rgb7, setRgb7] = useState(
    Boolean(
      sessionStorage.getItem(`rgb7Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`rgb7Chk${props.check}`) == "true"
    ) || false
  );
  const [rgb8, setRgb8] = useState(
    Boolean(
      sessionStorage.getItem(`rgb8Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`rgb8Chk${props.check}`) == "true"
    ) || false
  );
  const [rgb9, setRgb9] = useState(
    Boolean(
      sessionStorage.getItem(`rgb9Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`rgb9Chk${props.check}`) == "true"
    ) || false
  );
  const [rgb10, setRgb10] = useState(
    Boolean(
      sessionStorage.getItem(`rgb10Chk${props.check}`) == "1" ||
        sessionStorage.getItem(`rgb10Chk${props.check}`) == "true"
    ) || false
  );

  const a1Checked = JSON.parse(sessionStorage.getItem("a1-I/O"));
  const a1Digi = JSON.parse(sessionStorage.getItem("A1DIGI"));
  const a2Checked = JSON.parse(sessionStorage.getItem("a2-I/O"));
  const a2Digi = JSON.parse(sessionStorage.getItem("A2DIGI"));
  const b1Checked = JSON.parse(sessionStorage.getItem("b1-I/O"));
  const b1Digi = JSON.parse(sessionStorage.getItem("B1DIGI"));
  const b2Checked = JSON.parse(sessionStorage.getItem("b2-I/O"));
  const b2Digi = JSON.parse(sessionStorage.getItem("B2DIGI"));
  const c1Checked = JSON.parse(sessionStorage.getItem("c1-I/O"));
  const c1Digi = JSON.parse(sessionStorage.getItem("C1DIGI"));
  const c2Checked = JSON.parse(sessionStorage.getItem("c2-I/O"));
  const c2Digi = JSON.parse(sessionStorage.getItem("C2DIGI"));
  const d1Checked = JSON.parse(sessionStorage.getItem("D1"));
  const d1Digi = JSON.parse(sessionStorage.getItem("D1DIGI"));
  const d2Checked = JSON.parse(sessionStorage.getItem("D2"));
  const d2Digi = JSON.parse(sessionStorage.getItem("D2DIGI"));
  const e1Checked = JSON.parse(sessionStorage.getItem("e1-I/O"));
  const e1Digi = JSON.parse(sessionStorage.getItem("E1DIGI"));
  const e2Checked = JSON.parse(sessionStorage.getItem("e2-I/O"));
  const e2Digi = JSON.parse(sessionStorage.getItem("E2DIGI"));
  const f1Checked = JSON.parse(sessionStorage.getItem("f1-I/O"));
  const f1Digi = JSON.parse(sessionStorage.getItem("F1DIGI"));
  const f2Checked = JSON.parse(sessionStorage.getItem("f2-I/O"));
  const f2Digi = JSON.parse(sessionStorage.getItem("F2DIGI"));
  const m1Checked = JSON.parse(sessionStorage.getItem("m1-I/O"));
  const m1Digi = JSON.parse(sessionStorage.getItem("M1DIGI"));
  const m2Checked = JSON.parse(sessionStorage.getItem("m2-I/O"));
  const m2Digi = JSON.parse(sessionStorage.getItem("M2DIGI"));
  const m3Checked = JSON.parse(sessionStorage.getItem("m3-I/O"));
  const m3Digi = JSON.parse(sessionStorage.getItem("M3DIGI"));
  const m4Checked = JSON.parse(sessionStorage.getItem("m4-I/O"));
  const m4Digi = JSON.parse(sessionStorage.getItem("M4DIGI"));
  const A1 = JSON.parse(sessionStorage.getItem("A1"));
  const A2 = JSON.parse(sessionStorage.getItem("A2"));
  const B1 = JSON.parse(sessionStorage.getItem("B1"));
  const B2 = JSON.parse(sessionStorage.getItem("B2"));
  const C1 = JSON.parse(sessionStorage.getItem("C1"));
  const C2 = JSON.parse(sessionStorage.getItem("C2"));
  const D1 = JSON.parse(sessionStorage.getItem("D1"));
  const D2 = JSON.parse(sessionStorage.getItem("D2"));
  const E1 = JSON.parse(sessionStorage.getItem("E1"));
  const E2 = JSON.parse(sessionStorage.getItem("E2"));
  const F1 = JSON.parse(sessionStorage.getItem("F1"));
  const F2 = JSON.parse(sessionStorage.getItem("F2"));
  const M1 = JSON.parse(sessionStorage.getItem("M1"));
  const M2 = JSON.parse(sessionStorage.getItem("M2"));
  const M3 = JSON.parse(sessionStorage.getItem("M3"));
  const M4 = JSON.parse(sessionStorage.getItem("M4"));
  const MP3 = JSON.parse(sessionStorage.getItem("BMP3"));
  const OLED = JSON.parse(sessionStorage.getItem("DOLED"));
  const RGB = JSON.parse(sessionStorage.getItem("BRGB"));
  let isTouchZeroOutput = JSON.parse(
    sessionStorage.getItem("isTouchZeroOutput")
  );
  let isTouchOneOutput = JSON.parse(sessionStorage.getItem("isTouchOneOutput"));
  let isTouchTwoOutput = JSON.parse(sessionStorage.getItem("isTouchTwoOutput"));
  let isSmileOne = JSON.parse(sessionStorage.getItem("isSmileOne"));
  let isSmileTwo = JSON.parse(sessionStorage.getItem("isSmileTwo"));
  let isSmileThree = JSON.parse(sessionStorage.getItem("isSmileThree"));
  let isSmileFour = JSON.parse(sessionStorage.getItem("isSmileFour"));
  let isEyeLeft = JSON.parse(sessionStorage.getItem("isEyeLeft"));
  let isEyeRight = JSON.parse(sessionStorage.getItem("isEyeRight"));
  let isBuzzer = JSON.parse(sessionStorage.getItem("isBuzzer"));

  const onChange = (key, value) => {
    if (key === "a1") {
      setvalA1(value);
      return;
    } else if (key === "a2") {
      setvalA2(value);
      return;
    } else if (key === "b1") {
      setvalB1(value);
      return;
    } else if (key === "b2") {
      setvalB2(value);
      return;
    } else if (key === "c1") {
      setvalC1(value);
      return;
    } else if (key === "c2") {
      setvalC2(value);
      return;
    } else if (key === "d1") {
      setvalD1(value);
      return;
    } else if (key === "d2") {
      setvalD2(value);
      return;
    } else if (key === "e1") {
      setvalE1(value);
      return;
    } else if (key === "e2") {
      setvalE2(value);
      return;
    } else if (key === "f1") {
      setvalF1(value);
      return;
    } else if (key === "f2") {
      setvalF2(value);
      return;
    } else if (key === "m1") {
      setvalM1(value);
      return;
    } else if (key === "m2") {
      setvalM2(value);
      return;
    } else if (key === "m3") {
      setvalM3(value);
      return;
    } else if (key === "m4") {
      setvalM4(value);
      return;
    } else if (key === "t0") {
      setvalT0(value);
    } else if (key === "t1") {
      setvalT1(value);
    } else if (key === "t2") {
      setvalT2(value);
    } else if (key === "leye") {
      setvalLeye(!valLeye);
    } else if (key === "leyeR") {
      setvalLeyeR(value);
    } else if (key === "leyeG") {
      setvalLeyeG(value);
    } else if (key === "leyeB") {
      setvalLeyeB(value);
    } else if (key === "reye") {
      setvalReye(!valReye);
    } else if (key === "reyeR") {
      setvalReyeR(value);
    } else if (key === "reyeG") {
      setvalReyeG(value);
    } else if (key === "reyeB") {
      setvalReyeB(value);
    } else if (key === "buzz") {
      setvalBuzz(value);
    } else if (key === "buzzCheckbox") {
      setBuzzCheckbox(!buzzCheckbox);
    } else if (key === "sm1") {
      setvalSm1(value);
    } else if (key === "sm2") {
      setvalSm2(value);
    } else if (key === "sm3") {
      setvalSm3(value);
    } else if (key === "sm4") {
      setvalSm4(value);
    } else if (key === "mp3") {
      setvalMP3(value);
    } else if (key === "a1Checkbox") {
      setA1Checkbox(!a1Checkbox);
    } else if (key === "a2Checkbox") {
      setA2Checkbox(!a2Checkbox);
    } else if (key === "b1Checkbox") {
      setB1Checkbox(!b1Checkbox);
    } else if (key === "b2Checkbox") {
      setB2Checkbox(!b2Checkbox);
    } else if (key === "c1Checkbox") {
      setC1Checkbox(!c1Checkbox);
    } else if (key === "c2Checkbox") {
      setC2Checkbox(!c2Checkbox);
    } else if (key === "d1Checkbox") {
      setD1Checkbox(!d1Checkbox);
    } else if (key === "d2Checkbox") {
      setD2Checkbox(!d2Checkbox);
    } else if (key === "e1Checkbox") {
      setE1Checkbox(!e1Checkbox);
    } else if (key === "e2Checkbox") {
      setE2Checkbox(!e2Checkbox);
    } else if (key === "f1Checkbox") {
      setF1Checkbox(!f1Checkbox);
    } else if (key === "f2Checkbox") {
      setF2Checkbox(!f2Checkbox);
    } else if (key === "m1Checkbox") {
      setM1Checkbox(!m1Checkbox);
    } else if (key === "m2Checkbox") {
      setM2Checkbox(!m2Checkbox);
    } else if (key === "m3Checkbox") {
      setM3Checkbox(!m3Checkbox);
    } else if (key === "m4Checkbox") {
      setM4Checkbox(!m4Checkbox);
    } else if (key === "s1Checkbox") {
      setS1Checkbox(!s1Checkbox);
    } else if (key === "s2Checkbox") {
      setS2Checkbox(!s2Checkbox);
    } else if (key === "s3Checkbox") {
      setS3Checkbox(!s3Checkbox);
    } else if (key === "s4Checkbox") {
      setS4Checkbox(!s4Checkbox);
    } else if (key === "t0Checkbox") {
      setT0Checkbox(!t0Checkbox);
    } else if (key === "t1Checkbox") {
      setT1Checkbox(!t1Checkbox);
    } else if (key === "st2Checkbox") {
      setT2Checkbox(!t2Checkbox);
    } else if (key === "mp3Checkbox") {
      setMP3Checkbox(!mp3Checkbox);
    } else if (key === "RGB1") {
      console.log("gsk ************", key);
      setRgb1(!rgb1);
    } else if (key === "RGB2") {
      console.log("gsk ************", key);
      setRgb2(!rgb2);
    } else if (key === "RGB3") {
      console.log("gsk ************", key);
      setRgb3(!rgb3);
    } else if (key === "RGB4") {
      setRgb4(!rgb4);
    } else if (key === "RGB5") {
      setRgb5(!rgb5);
    } else if (key === "RGB6") {
      setRgb6(!rgb6);
    } else if (key === "RGB7") {
      setRgb7(!rgb7);
    } else if (key === "RGB8") {
      setRgb8(!rgb8);
    } else if (key === "RGB9") {
      setRgb9(!rgb9);
    } else if (key === "RGB10") {
      setRgb10(!rgb10);
    }
  };

  sessionStorage.setItem(`a1${props.check}`, valA1);
  sessionStorage.setItem(`a1Chk${props.check}`, a1Checkbox);
  sessionStorage.setItem(`a2${props.check}`, valA2);
  sessionStorage.setItem(`a2Chk${props.check}`, a2Checkbox);
  sessionStorage.setItem(`b1${props.check}`, valB1);
  sessionStorage.setItem(`b1Chk${props.check}`, b1Checkbox);
  sessionStorage.setItem(`b2${props.check}`, valB2);
  sessionStorage.setItem(`b2Chk${props.check}`, b2Checkbox);
  sessionStorage.setItem(`c1${props.check}`, valC1);
  sessionStorage.setItem(`c1Chk${props.check}`, c1Checkbox);
  sessionStorage.setItem(`c2${props.check}`, valC2);
  sessionStorage.setItem(`c2Chk${props.check}`, c2Checkbox);
  sessionStorage.setItem(`d1${props.check}`, valD1);
  sessionStorage.setItem(`d1Chk${props.check}`, d1Checkbox);
  sessionStorage.setItem(`d2${props.check}`, valD2);
  sessionStorage.setItem(`d2Chk${props.check}`, d2Checkbox);
  sessionStorage.setItem(`e1${props.check}`, valE1);
  sessionStorage.setItem(`e1Chk${props.check}`, e1Checkbox);
  sessionStorage.setItem(`e2${props.check}`, valE2);
  sessionStorage.setItem(`e2Chk${props.check}`, e2Checkbox);
  sessionStorage.setItem(`f1${props.check}`, valF1);
  sessionStorage.setItem(`f1Chk${props.check}`, f1Checkbox);
  sessionStorage.setItem(`f2${props.check}`, valF2);
  sessionStorage.setItem(`f2Chk${props.check}`, f2Checkbox);
  sessionStorage.setItem(`m1${props.check}`, valM1);
  sessionStorage.setItem(`m1Chk${props.check}`, m1Checkbox);
  sessionStorage.setItem(`m2${props.check}`, valM2);
  sessionStorage.setItem(`m2Chk${props.check}`, m2Checkbox);
  sessionStorage.setItem(`m3${props.check}`, valM3);
  sessionStorage.setItem(`m3Chk${props.check}`, m3Checkbox);
  sessionStorage.setItem(`m4${props.check}`, valM4);
  sessionStorage.setItem(`m4Chk${props.check}`, m4Checkbox);

  sessionStorage.setItem(`t0${props.check}`, valT0);
  sessionStorage.setItem(`t1${props.check}`, valT1);
  sessionStorage.setItem(`t2${props.check}`, valT2);
  sessionStorage.setItem(`t0Chk${props.check}`, t0Checkbox);
  sessionStorage.setItem(`t1Chk${props.check}`, t1Checkbox);
  sessionStorage.setItem(`t2Chk${props.check}`, t2Checkbox);

  sessionStorage.setItem(`le${props.check}`, valLeye);
  sessionStorage.setItem(`leR${props.check}`, valLeyeR);
  sessionStorage.setItem(`leG${props.check}`, valLeyeG);
  sessionStorage.setItem(`leB${props.check}`, valLeyeB);
  sessionStorage.setItem(`re${props.check}`, valReye);
  sessionStorage.setItem(`reR${props.check}`, valReyeR);
  sessionStorage.setItem(`reG${props.check}`, valReyeG);
  sessionStorage.setItem(`reB${props.check}`, valReyeB);

  sessionStorage.setItem(`buzz${props.check}`, valBuzz);
  sessionStorage.setItem(`buzzChk${props.check}`, buzzCheckbox);

  sessionStorage.setItem(`s1${props.check}`, valSm1);
  sessionStorage.setItem(`s2${props.check}`, valSm2);
  sessionStorage.setItem(`s3${props.check}`, valSm3);
  sessionStorage.setItem(`s4${props.check}`, valSm4);
  sessionStorage.setItem(`s1Chk${props.check}`, s1Checkbox);
  sessionStorage.setItem(`s2Chk${props.check}`, s2Checkbox);
  sessionStorage.setItem(`s3Chk${props.check}`, s3Checkbox);
  sessionStorage.setItem(`s4Chk${props.check}`, s4Checkbox);

  sessionStorage.setItem(`mp3${props.check}`, valMP3);
  sessionStorage.setItem(`mp3Chk${props.check}`, mp3Checkbox);
  sessionStorage.setItem(`oled1${props.check}`, curValOLED1);
  sessionStorage.setItem(`oledChk1${props.check}`, isClickOLED1);
  sessionStorage.setItem(`oled2${props.check}`, curValOLED2);
  sessionStorage.setItem(`oledChk2${props.check}`, isClickOLED2);
  sessionStorage.setItem(`oled3${props.check}`, curValOLED3);
  sessionStorage.setItem(`oledChk3${props.check}`, isClickOLED3);
  sessionStorage.setItem(`countRGB${props.check}`, countRGBComp);
  sessionStorage.setItem(`rgb1Chk${props.check}`, rgb1);
  sessionStorage.setItem(`rgb2Chk${props.check}`, rgb2);
  sessionStorage.setItem(`rgb3Chk${props.check}`, rgb3);
  sessionStorage.setItem(`rgb4Chk${props.check}`, rgb4);
  sessionStorage.setItem(`rgb5Chk${props.check}`, rgb5);
  sessionStorage.setItem(`rgb6Chk${props.check}`, rgb6);
  sessionStorage.setItem(`rgb7Chk${props.check}`, rgb7);
  sessionStorage.setItem(`rgb8Chk${props.check}`, rgb8);
  sessionStorage.setItem(`rgb8Chk${props.check}`, rgb9);
  sessionStorage.setItem(`rgb10Chk${props.check}`, rgb10);
  sessionStorage.setItem(
    `valRGB1${props.check}`,
    JSON.stringify({
      r: valRgb1[0],
      g: valRgb1[1],
      b: valRgb1[2],
    })
  );
  sessionStorage.setItem(
    `valRGB2${props.check}`,
    JSON.stringify({
      r: valRgb2[0],
      g: valRgb2[1],
      b: valRgb2[2],
    })
  );
  sessionStorage.setItem(
    `valRGB3${props.check}`,
    JSON.stringify({
      r: valRgb3[0],
      g: valRgb3[1],
      b: valRgb3[2],
    })
  );
  sessionStorage.setItem(
    `valRGB4${props.check}`,
    JSON.stringify({
      r: valRgb4[0],
      g: valRgb4[1],
      b: valRgb4[2],
    })
  );
  sessionStorage.setItem(
    `valRGB5${props.check}`,
    JSON.stringify({
      r: valRgb5[0],
      g: valRgb5[1],
      b: valRgb5[2],
    })
  );
  sessionStorage.setItem(
    `valRGB6${props.check}`,
    JSON.stringify({
      r: valRgb6[0],
      g: valRgb6[1],
      b: valRgb6[2],
    })
  );
  sessionStorage.setItem(
    `valRGB7${props.check}`,
    JSON.stringify({
      r: valRgb7[0],
      g: valRgb7[1],
      b: valRgb7[2],
    })
  );
  sessionStorage.setItem(
    `valRGB8${props.check}`,
    JSON.stringify({
      r: valRgb8[0],
      g: valRgb8[1],
      b: valRgb8[2],
    })
  );
  sessionStorage.setItem(
    `valRGB9${props.check}`,
    JSON.stringify({
      r: valRgb9[0],
      g: valRgb9[1],
      b: valRgb9[2],
    })
  );
  sessionStorage.setItem(
    `valRGB10${props.check}`,
    JSON.stringify({
      r: valRgb10[0],
      g: valRgb10[1],
      b: valRgb10[2],
    })
  );
  const onOLED1Handle = () => {
    setIsClickOLED1(!isClickOLED1);
  };

  const onOLED2Handle = () => {
    setIsClickOLED2(!isClickOLED2);
  };
  const onOLED3Handle = () => {
    setIsClickOLED3(!isClickOLED3);
  };
  const onOLED1HandleText = (e) => {
    setCurValOLED1(e.target.value);
  };
  const onOLED2HandleText = (e) => {
    setCurValOLED2(e.target.value);
  };
  const onOLED3HandleText = (e) => {
    setCurValOLED3(e.target.value);
  };
  var styleAdd = {
    backgroundImage: `url(${renderImage("add3x")}`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: 40,
    width: 40,
    position: "relative",
    margin: "auto",
    marginLeft: "60%",
  };
  var styleRemove = {
    backgroundImage: `url(${renderImage("remove3x")}`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: 40,
    width: 40,
    position: "relative",
    margin: "auto",
    marginLeft: "70%",
  };
  const [valRGB, setvalRGB] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const onRGBCompIncrease = () => {
    if (countRGBComp < 10) setCountRGBComp(countRGBComp + 1);
  };
  const onRGBCompDecrease = () => {
    if (countRGBComp > 1) {
      //setRgb2(false);

      let a = `rgb${countRGBComp}Chk${props.check}`;
      console.log("program", a, typeof a);
      eval(`setRgb${countRGBComp}(${false})`);
      eval(`setValRgb${countRGBComp}(${[0, 0, 0]})`);
      //sessionStorage.setItem(a, false);

      //sessionStorage.setItem(`valRGB${2}${props.check}`, null);
      setCountRGBComp(countRGBComp - 1);
    }
  };

  const rgbHandle = (e) => {
    if (e.includes("RGB 1")) setRgb1(!rgb1);
    if (e.includes("RGB 2")) setRgb2(!rgb2);
    if (e.includes("RGB 3")) setRgb3(!rgb3);
    if (e.includes("RGB 4")) setRgb4(!rgb4);
    if (e.includes("RGB 5")) setRgb5(!rgb5);
    if (e.includes("RGB 6")) setRgb6(!rgb6);
    if (e.includes("RGB 7")) setRgb7(!rgb7);
    if (e.includes("RGB 8")) setRgb8(!rgb8);
    if (e.includes("RGB 9")) setRgb9(!rgb9);
    if (e.includes("RGB 10")) setRgb10(!rgb10);
  };
  const rgbHandleValue = (e, value) => {
    try {
      let a = [];
      if (e[0] == "R") {
        a = eval("valRgb" + e[1]);
        a[0] = value;
      }
      if (e[0] == "G") {
        a = eval("valRgb" + e[1]);
        a[1] = value;
      }
      if (e[0] == "B") {
        a = eval("valRgb" + e[1]);
        a[2] = value;
      }
      switch (e[1]) {
        case "1":
          setValRgb1(a);
          break;
        case "2":
          setValRgb2(a);
          break;
        case "3":
          setValRgb3(a);
          break;
        case "4":
          setValRgb4(a);
          break;
        case "5":
          setValRgb5(a);
          break;
        case "6":
          setValRgb6(a);
          break;
        case "7":
          setValRgb7(a);
          break;
        case "8":
          setValRgb8(a);
          break;
        case "9":
          setValRgb9(a);
          break;
        case "10":
          setValRgb10(a);
          break;
      }
    } catch (e) {}

    console.log(
      "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
      valRgb1,
      valRgb2,
      valRgb3
    );
  };
  var totalSliders = [];
  for (var i = 1; i <= countRGBComp; i++) {
    console.log("loopRGB", countRGBComp);

    var slidr = (
      <>
        <div
          className="slider-item1-flowchart"
          style={{ position: "relative" }}
        >
          <div className="portDetails-flowchart">
            <div
              id={i}
              onClick={(e) => rgbHandle(e.target.innerHTML)}
              className={
                "renderClick" +
                (eval("rgb" + i) || false) +
                "  checkBox-conatiner"
              }
            >
              <p
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  whiteSpace: "nowrap",
                }}
              >
                RGB {i}
              </p>
            </div>
          </div>
          {/* <input type ="checkbox" id="re" checked={valReye} onChange={() => onChange("reye")}></input>      
                <span className="hardwareText">Right Eye</span> */}

          <div
            className={
              "portSlider-flowchart" +
              " isActivePortInfo" +
              (eval("rgb" + i) || false)
            }
            style={{
              position: "relative",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{ position: "relative", height: "auto", width: "100%" }}
            >
              <Slider
                value={eval("valRgb" + i + "[0]") || 0}
                min={0}
                max={100}
                renderIn="hardwarePropertyPanel"
                sliderName={`R${i}`}
                onChange={(e, id) => rgbHandleValue(id, e)}
                disabled={!eval("rgb" + i)}
              />
              <p
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "33%",
                  fontSize: "16px",
                }}
              >
                0
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "55%",

                  fontSize: "16px",
                  right: "13%",
                }}
              >
                100
              </p>
            </div>
            <div
              style={{ position: "relative", height: "auto", width: "100%" }}
            >
              <Slider
                id={i}
                value={eval("valRgb" + i + "[1]") || 0}
                min={0}
                max={100}
                renderIn="hardwarePropertyPanel"
                sliderName={`G${i}`}
                onChange={(e, id) => rgbHandleValue(id, e)}
                disabled={!eval("rgb" + i)}
              />
              <p
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "33%",
                  fontSize: "16px",
                }}
              >
                0
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "55%",

                  fontSize: "16px",
                  right: "13%",
                }}
              >
                100
              </p>
            </div>
            <div
              style={{ position: "relative", height: "auto", width: "100%" }}
            >
              <Slider
                value={eval("valRgb" + i + "[2]") || 0}
                min={0}
                max={100}
                renderIn="hardwarePropertyPanel"
                sliderName={`B${i}`}
                onChange={(e, id) => rgbHandleValue(id, e)}
                disabled={!eval("rgb" + i)}
              />
              <p
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "33%",
                  fontSize: "16px",
                }}
              >
                0
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "55%",

                  fontSize: "16px",
                  right: "13%",
                }}
              >
                100
              </p>
            </div>
          </div>
        </div>
        <br></br>
      </>
    );

    totalSliders = [...totalSliders, slidr];
  }

  if (countRGBComp == 10) {
    styleAdd = {
      ...styleAdd,
      backgroundImage: `url(${renderImage("add3xIA")}`,
    };
  }
  if (countRGBComp == 1) {
    styleRemove = {
      ...styleRemove,
      backgroundImage: `url(${renderImage("remove3xIA")}`,
    };
  }

  return (
    <div className="outertabDiv-output">
      <div className="slider-section">
        {a1Checked && A1 ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            {" "}
            {!a1Digi ? (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="A1"
                    onClick={() => onChange("a1Checkbox")}
                    className={
                      "renderClick" +
                      (a1Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      A1 Digital
                    </p>
                    {/*   <input type ="checkbox" id="A1" checked={a1Checkbox} onChange={() => onChange("a1Checkbox")}></input>
                      {console.log("checkbox@@@@@@@@",document.getElementById("A1"))}
                      <span className="hardwareText">A1 Digital</span> */}
                  </div>
                </div>
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (a1Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valA1}
                    min={0}
                    max={1}
                    disabled={!a1Checkbox}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("a1", value)}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    1
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="A1"
                    onClick={() => onChange("a1Checkbox")}
                    className={
                      "renderClick" +
                      (a1Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      A1 Analog
                    </p>
                  </div>
                </div>
                {/*        <input type ="checkbox" id="A1" checked={a1Checkbox} onChange={() => onChange("a1Checkbox")}></input>
                    <span className="hardwareText">A1 Analog</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (a1Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valA1 || 0}
                    min={0}
                    max={100}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("a1", value)}
                    disabled={!a1Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    100
                  </p>
                </div>
              </>
            )}
          </div>
        ) : null}

        {a2Checked && A2 ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            {!a2Digi ? (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="A2"
                    onClick={() => onChange("a2Checkbox")}
                    className={
                      "renderClick" +
                      (a2Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      A2 Digital
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="A2" checked={a2Checkbox} onChange={() => onChange("a2Checkbox")}></input>
                    <span className="hardwareText">A2 Digital</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (a2Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valA2 || 0}
                    min={0}
                    max={1}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("a2", value)}
                    disabled={!a2Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    1
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="A2"
                    onClick={() => onChange("a2Checkbox")}
                    className={
                      "renderClick" +
                      (a2Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      A2 Analog
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="A2" checked={a2Checkbox} onChange={() => onChange("a2Checkbox")}></input>
                    <span className="hardwareText">A2 Analog</span> */}

                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (a2Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valA2 || 0}
                    min={0}
                    max={100}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("a2", value)}
                    disabled={!a2Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    100
                  </p>
                </div>
              </>
            )}
          </div>
        ) : null}

        {c1Checked && C1 ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            {" "}
            {!c1Digi ? (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="C1"
                    onClick={() => onChange("c1Checkbox")}
                    className={
                      "renderClick" +
                      (c1Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      C1 Digital
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="C1" checked={c1Checkbox} onChange={() => onChange("c1Checkbox")}></input>
                    <span className="hardwareText">C1 Digital</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (c1Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valC1 || 0}
                    min={0}
                    max={1}
                    disabled={!c1Checkbox}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("c1", value)}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    1
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="C1"
                    onClick={() => onChange("c1Checkbox")}
                    className={
                      "renderClick" +
                      (c1Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      C1 Analog
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="C1" checked={c1Checkbox} onChange={() => onChange("c1Checkbox")}></input>
                    <span className="hardwareText">C1 Analog</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (c1Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valC1 || 0}
                    min={0}
                    max={100}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("c1", value)}
                    disabled={!c1Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    100
                  </p>
                </div>
              </>
            )}
          </div>
        ) : null}

        {c2Checked && C2 ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            {!c2Digi ? (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="C2"
                    onClick={() => onChange("c2Checkbox")}
                    className={
                      "renderClick" +
                      (c2Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      C2 Digital
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="C2" checked={c2Checkbox} onChange={() => onChange("c2Checkbox")}></input>
                    <span className="hardwareText">C2 Digital</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (c2Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valC2 || 0}
                    min={0}
                    max={1}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("c2", value)}
                    diagonal={!c2Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    1
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="C2"
                    onClick={() => onChange("c2Checkbox")}
                    className={
                      "renderClick" +
                      (c2Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      C2 Analog
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="C2" checked={c2Checkbox} onChange={() => onChange("c2Checkbox")}></input>
                    <span className="hardwareText">C2 Analog</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (c2Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valC2 || 0}
                    min={0}
                    max={100}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("c2", value)}
                    disabled={!c2Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    100
                  </p>
                </div>
              </>
            )}
          </div>
        ) : null}
        {D1 && D2 && OLED ? (
          <>
            <TextRow
              name={"OLED"}
              port={"D"}
              assign={isClickOLED1}
              key={"D"}
              handlecheckbox={onOLED1Handle}
              textValue={curValOLED1}
              //onChange={onChange}
              label={"OLED Line 1"}
              handleTextChange={onOLED1HandleText}
            />
            <TextRow
              name={"OLED"}
              port={"D"}
              assign={isClickOLED2}
              key={"D"}
              handlecheckbox={onOLED2Handle}
              textValue={curValOLED2}
              // onChange={onChange}
              label={"OLED Line 2"}
              handleTextChange={onOLED2HandleText}
            />
            <TextRow
              name={"OLED"}
              port={"D"}
              assign={isClickOLED3}
              key={"D"}
              handlecheckbox={onOLED3Handle}
              textValue={curValOLED3}
              // onChange={onChange}
              label={"OLED Line 3"}
              handleTextChange={onOLED3HandleText}
            />
          </>
        ) : (
          <>
            {" "}
            {d1Checked && D1 ? (
              <div
                className="slider-item1-flowchart"
                style={{ position: "relative" }}
              >
                {!d1Digi ? (
                  <>
                    <div className="portDetails-flowchart">
                      <div
                        id="D1"
                        onClick={() => onChange("d1Checkbox")}
                        className={
                          "renderClick" +
                          (d1Checkbox || false) +
                          "  checkBox-conatiner"
                        }
                      >
                        <p
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          D1 Digital
                        </p>
                      </div>
                    </div>

                    {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Digital</span> */}
                    <div
                      className={
                        "portSlider-flowchart" +
                        " isActivePortInfo" +
                        (d1Checkbox || false)
                      }
                    >
                      <Slider
                        title="Intensity"
                        value={valD1 || 0}
                        min={0}
                        max={1}
                        disabled={!d1Checkbox}
                        renderIn="hardwarePropertyPanel"
                        onChange={(value) => onChange("d1", value)}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",
                          left: "33%",
                          fontSize: "16px",
                        }}
                      >
                        0
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",

                          fontSize: "16px",
                          right: "13%",
                        }}
                      >
                        1
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="portDetails-flowchart">
                      <div
                        id="D1"
                        onClick={() => onChange("d1Checkbox")}
                        className={
                          "renderClick" +
                          (d1Checkbox || false) +
                          "  checkBox-conatiner"
                        }
                      >
                        <p
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          D1 Analog
                        </p>
                      </div>
                    </div>
                    {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Analog</span> */}
                    <div
                      className={
                        "portSlider-flowchart" +
                        " isActivePortInfo" +
                        (d1Checkbox || false)
                      }
                    >
                      <Slider
                        title="Intensity"
                        value={valD1 || 0}
                        min={0}
                        max={100}
                        renderIn="hardwarePropertyPanel"
                        onChange={(value) => onChange("d1", value)}
                        disabled={!d1Checkbox}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",
                          left: "33%",
                          fontSize: "16px",
                        }}
                      >
                        0
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",

                          fontSize: "16px",
                          right: "13%",
                        }}
                      >
                        100
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : null}
            {d2Checked && D2 ? (
              <div
                className="slider-item1-flowchart"
                style={{ position: "relative" }}
              >
                {!d2Digi ? (
                  <>
                    <div className="portDetails-flowchart">
                      <div
                        id="D2"
                        onClick={() => onChange("d2Checkbox")}
                        className={
                          "renderClick" +
                          (d2Checkbox || false) +
                          "  checkBox-conatiner"
                        }
                      >
                        <p
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          D2 Digital
                        </p>
                      </div>
                    </div>

                    {/* <input type ="checkbox" id="D2" checked={d2Checkbox} onChange={() => onChange("d2Checkbox")}></input>
                    <span className="hardwareText">D2 Digital</span> */}
                    <div
                      className={
                        "portSlider-flowchart" +
                        " isActivePortInfo" +
                        (d2Checkbox || false)
                      }
                    >
                      <Slider
                        title="Intensity"
                        value={valD2 || 0}
                        min={0}
                        max={1}
                        renderIn="hardwarePropertyPanel"
                        onChange={(value) => onChange("d2", value)}
                        diagonal={!d2Checkbox}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",
                          left: "33%",
                          fontSize: "16px",
                        }}
                      >
                        0
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",

                          fontSize: "16px",
                          right: "13%",
                        }}
                      >
                        1
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="portDetails-flowchart">
                      <div
                        id="D2"
                        onClick={() => onChange("d2Checkbox")}
                        className={
                          "renderClick" +
                          (d2Checkbox || false) +
                          "  checkBox-conatiner"
                        }
                      >
                        <p
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          D2 Analog
                        </p>
                      </div>
                    </div>
                    {/* <input type ="checkbox" id="D2" checked={d2Checkbox} onChange={() => onChange("d2Checkbox")}></input>
                    <span className="hardwareText">D2 Analog</span> */}
                    <div
                      className={
                        "portSlider-flowchart" +
                        " isActivePortInfo" +
                        (d2Checkbox || false)
                      }
                    >
                      <Slider
                        title="Intensity"
                        value={valD2 || 0}
                        min={0}
                        max={100}
                        renderIn="hardwarePropertyPanel"
                        onChange={(value) => onChange("d2", value)}
                        diagonal={!d2Checkbox}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",
                          left: "33%",
                          fontSize: "16px",
                        }}
                      >
                        0
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",

                          fontSize: "16px",
                          right: "13%",
                        }}
                      >
                        100
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </>
        )}

        {e1Checked && E1 ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            {!e1Digi ? (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="E1"
                    onClick={() => onChange("e1Checkbox")}
                    className={
                      "renderClick" +
                      (e1Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      E1 Digital
                    </p>
                  </div>
                </div>

                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Digital</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (e1Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valE1 || 0}
                    min={0}
                    max={1}
                    disabled={!e1Checkbox}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("e1", value)}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    1
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="E1"
                    onClick={() => onChange("e1Checkbox")}
                    className={
                      "renderClick" +
                      (e1Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      E1 Analog
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Analog</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (e1Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valE1 || 0}
                    min={0}
                    max={100}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("e1", value)}
                    disabled={!e1Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    100
                  </p>
                </div>
              </>
            )}
          </div>
        ) : null}
        {e2Checked && E2 ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            {!e2Digi ? (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="E2"
                    onClick={() => onChange("e2Checkbox")}
                    className={
                      "renderClick" +
                      (e2Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      E2 Digital
                    </p>
                  </div>
                </div>

                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Digital</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (e2Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valE2 || 0}
                    min={0}
                    max={1}
                    disabled={!e2Checkbox}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("e2", value)}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    1
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="E2"
                    onClick={() => onChange("e2Checkbox")}
                    className={
                      "renderClick" +
                      (e2Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      E2 Analog
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Analog</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (e2Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valE2 || 0}
                    min={0}
                    max={100}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("e2", value)}
                    disabled={!e2Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    100
                  </p>
                </div>
              </>
            )}
          </div>
        ) : null}
        {f1Checked && F1 ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            {!f1Digi ? (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="f1"
                    onClick={() => onChange("f1Checkbox")}
                    className={
                      "renderClick" +
                      (f1Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      F1 Digital
                    </p>
                  </div>
                </div>

                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Digital</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (f1Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valF1 || 0}
                    min={0}
                    max={1}
                    disabled={!f1Checkbox}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("f1", value)}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    1
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="F1"
                    onClick={() => onChange("f1Checkbox")}
                    className={
                      "renderClick" +
                      (f1Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      F1 Analog
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Analog</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (f1Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valF1 || 0}
                    min={0}
                    max={100}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("f1", value)}
                    disabled={!f1Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    100
                  </p>
                </div>
              </>
            )}
          </div>
        ) : null}
        {f2Checked && F2 ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            {!f2Digi ? (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="F2"
                    onClick={() => onChange("f2Checkbox")}
                    className={
                      "renderClick" +
                      (f2Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      F2 Digital
                    </p>
                  </div>
                </div>

                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Digital</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (f2Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valF2 || 0}
                    min={0}
                    max={1}
                    disabled={!f2Checkbox}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("f2", value)}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    1
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="F2"
                    onClick={() => onChange("f2Checkbox")}
                    className={
                      "renderClick" +
                      (f2Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      F2 Analog
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Analog</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (f2Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valF2 || 0}
                    min={0}
                    max={100}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("f2", value)}
                    disabled={!f2Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    100
                  </p>
                </div>
              </>
            )}
          </div>
        ) : null}
        {m1Checked && M1 ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            {!m1Digi ? (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="f1"
                    onClick={() => onChange("m1Checkbox")}
                    className={
                      "renderClick" +
                      (m1Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      M1 Digital
                    </p>
                  </div>
                </div>

                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Digital</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (m1Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valM1 || 0}
                    min={0}
                    max={1}
                    disabled={!m1Checkbox}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("m1", value)}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    1
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="m1"
                    onClick={() => onChange("m1Checkbox")}
                    className={
                      "renderClick" +
                      (m1Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      M1 Analog
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Analog</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (m1Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valM1 || 0}
                    min={0}
                    max={100}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("m1", value)}
                    disabled={!m1Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    100
                  </p>
                </div>
              </>
            )}
          </div>
        ) : null}
        {m2Checked && M2 ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            {!m2Digi ? (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="M2"
                    onClick={() => onChange("m2Checkbox")}
                    className={
                      "renderClick" +
                      (m2Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      M2 Digital
                    </p>
                  </div>
                </div>

                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Digital</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (m2Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valM2 || 0}
                    min={0}
                    max={1}
                    disabled={!m2Checkbox}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("m2", value)}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    1
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="M2"
                    onClick={() => onChange("m2Checkbox")}
                    className={
                      "renderClick" +
                      (m2Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      M2 Analog
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Analog</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (m2Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valM2 || 0}
                    min={0}
                    max={100}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("m2", value)}
                    disabled={!m2Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    100
                  </p>
                </div>
              </>
            )}
          </div>
        ) : null}
        {m3Checked && M3 ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            {!m3Digi ? (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="M3"
                    onClick={() => onChange("m3Checkbox")}
                    className={
                      "renderClick" +
                      (m3Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      M3 Digital
                    </p>
                  </div>
                </div>

                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Digital</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (m3Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valM3 || 0}
                    min={0}
                    max={1}
                    disabled={!m3Checkbox}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("m3", value)}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    1
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="M3"
                    onClick={() => onChange("m3Checkbox")}
                    className={
                      "renderClick" +
                      (m3Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      M3 Analog
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Analog</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (m3Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valM3 || 0}
                    min={0}
                    max={100}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("m3", value)}
                    disabled={!m3Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    100
                  </p>
                </div>
              </>
            )}
          </div>
        ) : null}
        {m4Checked && M4 ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            {!m4Digi ? (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="M4"
                    onClick={() => onChange("m4Checkbox")}
                    className={
                      "renderClick" +
                      (m4Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      M4 Digital
                    </p>
                  </div>
                </div>

                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Digital</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (m4Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valM4 || 0}
                    min={0}
                    max={1}
                    disabled={!m4Checkbox}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("m4", value)}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    1
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="portDetails-flowchart">
                  <div
                    id="M4"
                    onClick={() => onChange("m4Checkbox")}
                    className={
                      "renderClick" +
                      (m4Checkbox || false) +
                      "  checkBox-conatiner"
                    }
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      M4 Analog
                    </p>
                  </div>
                </div>
                {/* <input type ="checkbox" id="D1" checked={d1Checkbox} onChange={() => onChange("d1Checkbox")}></input>
                    <span className="hardwareText">D1 Analog</span> */}
                <div
                  className={
                    "portSlider-flowchart" +
                    " isActivePortInfo" +
                    (m4Checkbox || false)
                  }
                >
                  <Slider
                    title="Intensity"
                    value={valM4 || 0}
                    min={0}
                    max={100}
                    renderIn="hardwarePropertyPanel"
                    onChange={(value) => onChange("m4", value)}
                    disabled={!m4Checkbox}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "33%",
                      fontSize: "16px",
                    }}
                  >
                    0
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "55%",

                      fontSize: "16px",
                      right: "13%",
                    }}
                  >
                    100
                  </p>
                </div>
              </>
            )}
          </div>
        ) : null}
        {isTouchZeroOutput ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            <div className="portDetails-flowchart">
              <div
                id="T0"
                onClick={() => onChange("t0Checkbox")}
                className={
                  "renderClick" + (t0Checkbox || false) + "  checkBox-conatiner"
                }
              >
                <p
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  TouchPad Zero
                </p>
              </div>
            </div>

            {/* <input type ="checkbox" id="T0" checked={t0Checkbox} onChange={() => onChange("t0Checkbox")}></input>      
                <span className="hardwareText">TouchPad Zero</span> */}
            <div
              className={
                "portSlider-flowchart" +
                " isActivePortInfo" +
                (t0Checkbox || false)
              }
            >
              <Slider
                title="Intensity"
                value={valT0 || 0}
                min={0}
                max={1}
                renderIn="hardwarePropertyPanel"
                onChange={(value) => onChange("t0", value)}
                disabled={!t0Checkbox}
              />
              <p
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "33%",
                  fontSize: "16px",
                }}
              >
                0
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "55%",

                  fontSize: "16px",
                  right: "13%",
                }}
              >
                1
              </p>
            </div>
          </div>
        ) : null}

        {isTouchOneOutput ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            <div className="portDetails-flowchart">
              <div
                id="T1"
                onClick={() => onChange("t1Checkbox")}
                className={
                  "renderClick" + (t1Checkbox || false) + "  checkBox-conatiner"
                }
              >
                <p
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  TouchPad One
                </p>
              </div>
            </div>
            {/* <input type ="checkbox" id="T1" checked={t1Checkbox} onChange={() => onChange("t1Checkbox")}></input>      
                <span className="hardwareText">TouchPad One</span> */}
            <div
              className={
                "portSlider-flowchart" +
                " isActivePortInfo" +
                (t1Checkbox || false)
              }
            >
              <Slider
                title="Intensity"
                value={valT1 || 0}
                min={0}
                max={1}
                renderIn="hardwarePropertyPanel"
                onChange={(value) => onChange("t1", value)}
                disabled={!t1Checkbox}
              />
              <p
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "33%",
                  fontSize: "16px",
                }}
              >
                0
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "55%",

                  fontSize: "16px",
                  right: "13%",
                }}
              >
                1
              </p>
            </div>
          </div>
        ) : null}

        {isTouchTwoOutput ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            <div className="portDetails-flowchart">
              <div
                id="T2"
                onClick={() => onChange("t2Checkbox")}
                className={
                  "renderClick" + (t2Checkbox || false) + "  checkBox-conatiner"
                }
              >
                <p
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  TouchPad Two
                </p>
              </div>
            </div>

            {/* <input type ="checkbox" id="T2" checked={t2Checkbox} onChange={() => onChange("t2Checkbox")}></input>      
                <span className="hardwareText">TouchPad Two</span> */}
            <div
              className={
                "portSlider-flowchart" +
                " isActivePortInfo" +
                (t2Checkbox || false)
              }
            >
              <Slider
                title="Intensity"
                value={valT2 || 0}
                min={0}
                max={1}
                renderIn="hardwarePropertyPanel"
                onChange={(value) => onChange("t2", value)}
                disabled={!t2Checkbox}
              />
              <p
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "33%",
                  fontSize: "16px",
                }}
              >
                0
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "55%",

                  fontSize: "16px",
                  right: "13%",
                }}
              >
                1
              </p>
            </div>
          </div>
        ) : null}

        {isEyeLeft ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            <div className="portDetails-flowchart">
              <div
                id="le"
                onClick={() => onChange("leye")}
                className={
                  "renderClick" + (valLeye || false) + "  checkBox-conatiner"
                }
              >
                <p
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Left Eye
                </p>
              </div>
            </div>
            {/* <input type ="checkbox" id="le" checked={valLeye} onChange={() => onChange("leye")}></input>      
                <span className="hardwareText">Left Eye</span> */}
            <div
              className={
                "portSlider-flowchart" +
                " isActivePortInfo" +
                (valLeye || false)
              }
              style={{
                position: "relative",
                height: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{ position: "relative", height: "auto", width: "100%" }}
              >
                <Slider
                  title={null}
                  value={valLeyeR || 0}
                  min={0}
                  max={100}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("leyeR", value)}
                  sliderName={"R"}
                  disabled={!valLeye}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  100
                </p>
              </div>
              <div
                style={{ position: "relative", height: "auto", width: "100%" }}
              >
                <Slider
                  title={null}
                  value={valLeyeG || 0}
                  min={0}
                  max={100}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("leyeG", value)}
                  sliderName={"G"}
                  disabled={!valLeye}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  100
                </p>
              </div>
              <div
                style={{ position: "relative", height: "auto", width: "100%" }}
              >
                <Slider
                  title={null}
                  value={valLeyeB || 0}
                  min={0}
                  max={100}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("leyeB", value)}
                  sliderName={"B"}
                  disabled={!valLeye}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  100
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {isEyeRight ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            <div className="portDetails-flowchart">
              <div
                id="re"
                onClick={() => onChange("reye")}
                className={
                  "renderClick" + (valReye || false) + "  checkBox-conatiner"
                }
              >
                <p
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Right Eye
                </p>
              </div>
            </div>
            {/* <input type ="checkbox" id="re" checked={valReye} onChange={() => onChange("reye")}></input>      
                <span className="hardwareText">Right Eye</span> */}

            <div
              className={
                "portSlider-flowchart" +
                " isActivePortInfo" +
                (valReye || false)
              }
              style={{
                position: "relative",
                height: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{ position: "relative", height: "auto", width: "100%" }}
              >
                <Slider
                  value={valReyeR || 0}
                  min={0}
                  max={100}
                  renderIn="hardwarePropertyPanel"
                  sliderName={"R"}
                  onChange={(value) => onChange("reyeR", value)}
                  disabled={!valReye}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  100
                </p>
              </div>
              <div
                style={{ position: "relative", height: "auto", width: "100%" }}
              >
                <Slider
                  value={valReyeG || 0}
                  min={0}
                  max={100}
                  renderIn="hardwarePropertyPanel"
                  sliderName={"G"}
                  onChange={(value) => onChange("reyeG", value)}
                  disabled={!valReye}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  100
                </p>
              </div>
              <div
                style={{ position: "relative", height: "auto", width: "100%" }}
              >
                <Slider
                  value={valReyeB || 0}
                  min={0}
                  max={100}
                  renderIn="hardwarePropertyPanel"
                  sliderName={"B"}
                  onChange={(value) => onChange("reyeB", value)}
                  disabled={!valReye}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  100
                </p>
              </div>
            </div>
          </div>
        ) : null}
        {MP3 && B1 && B2 ? (
          <>
            <div
              className="slider-item1-flowchart"
              style={{ position: "relative" }}
            >
              <div className="portDetails-flowchart">
                <div
                  id="MP3"
                  onClick={() => onChange("mp3Checkbox")}
                  className={
                    "renderClick" +
                    (mp3Checkbox || false) +
                    "  checkBox-conatiner"
                  }
                >
                  <p
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Port B: MP3
                  </p>
                </div>
              </div>
              {/* <input type ="checkbox" id="b1" checked={b1Checkbox} onChange={() => onChange("b1Checkbox")}></input>
                    <span className="hardwareText">B1 Digital</span> */}
              <div
                className={
                  "portSlider-flowchart" +
                  " isActivePortInfo" +
                  (mp3Checkbox || false)
                }
              >
                <Slider
                  title="Intensity"
                  value={valMP3 || 0}
                  min={0}
                  max={255}
                  disabled={!mp3Checkbox}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("mp3", value)}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  255
                </p>
              </div>
            </div>
          </>
        ) : RGB && B1 && B2 ? (
          <>
            {totalSliders}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: " repeat(2, 75px)",
                marginLeft: "50%",
                marginBottom: "5%",
              }}
            >
              <div style={styleAdd} onClick={onRGBCompIncrease}></div>
              <div style={styleRemove} onClick={onRGBCompDecrease}></div>
            </div>
          </>
        ) : (
          <>
            {b1Checked && B1 ? (
              <div
                className="slider-item1-flowchart"
                style={{ position: "relative" }}
              >
                {!b1Digi ? (
                  <>
                    <div className="portDetails-flowchart">
                      <div
                        id="b1"
                        onClick={() => onChange("b1Checkbox")}
                        className={
                          "renderClick" +
                          (b1Checkbox || false) +
                          "  checkBox-conatiner"
                        }
                      >
                        <p
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          B1 Digital
                        </p>
                      </div>
                    </div>
                    {/* <input type ="checkbox" id="b1" checked={b1Checkbox} onChange={() => onChange("b1Checkbox")}></input>
                    <span className="hardwareText">B1 Digital</span> */}
                    <div
                      className={
                        "portSlider-flowchart" +
                        " isActivePortInfo" +
                        (b1Checkbox || false)
                      }
                    >
                      <Slider
                        title="Intensity"
                        value={valB1 || 0}
                        min={0}
                        max={1}
                        disabled={!b1Checkbox}
                        renderIn="hardwarePropertyPanel"
                        onChange={(value) => onChange("b1", value)}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",
                          left: "33%",
                          fontSize: "16px",
                        }}
                      >
                        0
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",

                          fontSize: "16px",
                          right: "13%",
                        }}
                      >
                        1
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="portDetails-flowchart">
                      <div
                        id="b1"
                        onClick={() => onChange("b1Checkbox")}
                        className={
                          "renderClick" +
                          (b1Checkbox || false) +
                          "  checkBox-conatiner"
                        }
                      >
                        <p
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          B1 Analog
                        </p>
                      </div>
                    </div>

                    {/* <input type ="checkbox" id="B1" checked={b1Checkbox} onChange={() => onChange("b1Checkbox")}></input>
                    <span className="hardwareText">B1 Analog</span> */}
                    <div
                      className={
                        "portSlider-flowchart" +
                        " isActivePortInfo" +
                        (b1Checkbox || false)
                      }
                    >
                      <Slider
                        title="Intensity"
                        value={valB1 || 0}
                        min={0}
                        max={100}
                        renderIn="hardwarePropertyPanel"
                        onChange={(value) => onChange("b1", value)}
                        disabled={!b1Checkbox}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",
                          left: "33%",
                          fontSize: "16px",
                        }}
                      >
                        0
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",

                          fontSize: "16px",
                          right: "13%",
                        }}
                      >
                        100
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : null}

            {b2Checked && B2 ? (
              <div
                className="slider-item1-flowchart"
                style={{ position: "relative" }}
              >
                {!b2Digi ? (
                  <>
                    <div className="portDetails-flowchart">
                      <div
                        id="B2"
                        onClick={() => onChange("b2Checkbox")}
                        className={
                          "renderClick" +
                          (b2Checkbox || false) +
                          "  checkBox-conatiner"
                        }
                      >
                        <p
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          B2 Digital
                        </p>
                      </div>
                    </div>
                    {/* <input type ="checkbox" id="B2" checked={b2Checkbox} onChange={() => onChange("b2Checkbox")}></input>
                    <span className="hardwareText">B2 Digital</span> */}
                    <div
                      className={
                        "portSlider-flowchart" +
                        " isActivePortInfo" +
                        (b2Checkbox || false)
                      }
                    >
                      <Slider
                        title="Intensity"
                        value={valB2 || 0}
                        min={0}
                        max={1}
                        renderIn="hardwarePropertyPanel"
                        onChange={(value) => onChange("b2", value)}
                        disabled={!b2Checkbox}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",
                          left: "33%",
                          fontSize: "16px",
                        }}
                      >
                        0
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",

                          fontSize: "16px",
                          right: "13%",
                        }}
                      >
                        1
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="portDetails-flowchart">
                      <div
                        id="B2"
                        onClick={() => onChange("b2Checkbox")}
                        className={
                          "renderClick" +
                          (b2Checkbox || false) +
                          "  checkBox-conatiner"
                        }
                      >
                        <p
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          B2 Analog
                        </p>
                      </div>
                    </div>
                    {/* <input type ="checkbox" id="B2" checked={b2Checkbox} onChange={() => onChange("b2Checkbox")}></input>
                    <span className="hardwareText">B2 Analog</span> */}
                    <div
                      className={
                        "portSlider-flowchart" +
                        " isActivePortInfo" +
                        (b2Checkbox || false)
                      }
                    >
                      <Slider
                        title="Intensity"
                        value={valB2 || 0}
                        min={0}
                        max={100}
                        renderIn="hardwarePropertyPanel"
                        onChange={(value) => onChange("b2", value)}
                        disabled={!b2Checkbox}
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",
                          left: "33%",
                          fontSize: "16px",
                        }}
                      >
                        0
                      </p>
                      <p
                        style={{
                          position: "absolute",
                          top: "55%",

                          fontSize: "16px",
                          right: "13%",
                        }}
                      >
                        100
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </>
        )}
        {isBuzzer ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            <div className="portDetails-flowchart">
              <div
                id="Buzz"
                onClick={() => onChange("buzzCheckbox")}
                className={
                  "renderClick" +
                  (buzzCheckbox || false) +
                  "  checkBox-conatiner"
                }
              >
                <p
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Buzzer
                </p>
              </div>
            </div>
            {/* <input type ="checkbox" id="Buzz" checked={buzzCheckbox} onChange={() => onChange("buzzCheckbox")}></input>
                <span className="hardwareText">Buzzer</span> */}
            <div
              className={
                "portSlider-flowchart" +
                " isActivePortInfo" +
                (buzzCheckbox || false)
              }
            >
              <Slider
                title="Intensity"
                value={valBuzz || 0}
                min={0}
                max={5}
                renderIn="hardwarePropertyPanel"
                onChange={(value) => onChange("buzz", value)}
                disabled={!buzzCheckbox}
              />
              <p
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "33%",
                  fontSize: "16px",
                }}
              >
                0
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "55%",

                  fontSize: "16px",
                  right: "13%",
                }}
              >
                5
              </p>
            </div>
          </div>
        ) : null}

        {isSmileOne ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            <div className="portDetails-flowchart">
              <div
                id="S1"
                onClick={() => onChange("s1Checkbox")}
                className={
                  "renderClick" + (s1Checkbox || false) + "  checkBox-conatiner"
                }
              >
                <p
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Smile LED One
                </p>
              </div>
            </div>
            {/* <input type ="checkbox" id="S1" checked={s1Checkbox} onChange={() => onChange("s1Checkbox")}></input>      
                <span className="hardwareText">Smile LED One</span> */}
            <div
              className={
                "portSlider-flowchart" +
                " isActivePortInfo" +
                (s1Checkbox || false)
              }
            >
              <Slider
                title="Intensity"
                value={valSm1 || 0}
                min={0}
                max={1}
                renderIn="hardwarePropertyPanel"
                onChange={(value) => onChange("sm1", value)}
                disabled={!s1Checkbox}
              />
              <p
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "33%",
                  fontSize: "16px",
                }}
              >
                0
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "55%",

                  fontSize: "16px",
                  right: "13%",
                }}
              >
                1
              </p>
            </div>
          </div>
        ) : null}

        {isSmileTwo ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            <div className="portDetails-flowchart">
              <div
                id="S2"
                onClick={() => onChange("s2Checkbox")}
                className={
                  "renderClick" + (s2Checkbox || false) + "  checkBox-conatiner"
                }
              >
                <p
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Smile LED Two
                </p>
              </div>
            </div>
            {/* <input type ="checkbox" id="S2" checked={s2Checkbox} onChange={() => onChange("s2Checkbox")}></input>      
                <span className="hardwareText">Smile LED Two</span> */}
            <div
              className={
                "portSlider-flowchart" +
                " isActivePortInfo" +
                (s2Checkbox || false)
              }
            >
              <Slider
                title="Intensity"
                value={valSm2 || 0}
                min={0}
                max={1}
                renderIn="hardwarePropertyPanel"
                onChange={(value) => onChange("sm2", value)}
                disabled={!s2Checkbox}
              />
              <p
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "33%",
                  fontSize: "16px",
                }}
              >
                0
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "55%",

                  fontSize: "16px",
                  right: "13%",
                }}
              >
                1
              </p>
            </div>
          </div>
        ) : null}

        {isSmileThree ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            <div className="portDetails-flowchart">
              <div
                id="S3"
                onClick={() => onChange("s3Checkbox")}
                className={
                  "renderClick" + (s3Checkbox || false) + "  checkBox-conatiner"
                }
              >
                <p
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Smile LED Three
                </p>
              </div>
            </div>
            {/* <input type ="checkbox" id="S3" checked={s3Checkbox} onChange={() => onChange("s3Checkbox")}></input>      
                <span className="hardwareText">Smile LED Three</span> */}
            <div
              className={
                "portSlider-flowchart" +
                " isActivePortInfo" +
                (s3Checkbox || false)
              }
            >
              <Slider
                title="Intensity"
                value={valSm3 || 0}
                min={0}
                max={1}
                renderIn="hardwarePropertyPanel"
                onChange={(value) => onChange("sm3", value)}
                disabled={!s3Checkbox}
              />
              <p
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "33%",
                  fontSize: "16px",
                }}
              >
                0
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "55%",

                  fontSize: "16px",
                  right: "13%",
                }}
              >
                1
              </p>
            </div>
          </div>
        ) : null}

        {isSmileFour ? (
          <div
            className="slider-item1-flowchart"
            style={{ position: "relative" }}
          >
            <div className="portDetails-flowchart">
              <div
                id="S4"
                onClick={() => onChange("s4Checkbox")}
                className={
                  "renderClick" + (s4Checkbox || false) + "  checkBox-conatiner"
                }
              >
                <p
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Smile LED Four
                </p>
              </div>
            </div>
            {/* <input type ="checkbox" id="S4" checked={s4Checkbox} onChange={() => onChange("s4Checkbox")}></input>      
                <span className="hardwareText">Smile LED Four</span> */}
            <div
              className={
                "portSlider-flowchart" +
                " isActivePortInfo" +
                (s4Checkbox || false)
              }
            >
              <Slider
                title="Intensity"
                value={valSm4 || 0}
                min={0}
                max={1}
                renderIn="hardwarePropertyPanel"
                onChange={(value) => onChange("sm4", value)}
                disabled={!s4Checkbox}
              />
              <p
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "33%",
                  fontSize: "16px",
                }}
              >
                0
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "55%",

                  fontSize: "16px",
                  right: "13%",
                }}
              >
                1
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OutputPanel;
