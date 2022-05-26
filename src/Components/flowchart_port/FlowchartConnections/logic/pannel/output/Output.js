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
let a1 = [],
  a2 = [],
  b1 = [],
  b2 = [],
  c1 = [],
  c2 = [],
  d1 = [],
  d2 = [],
  e1 = [],
  e2 = [],
  f1 = [],
  f2 = [],
  m1 = [],
  m2 = [],
  m3 = [],
  m4 = [],
  t0 = [],
  t1 = [],
  t2 = [],
  le = [],
  leR = [],
  leG = [],
  leB = [],
  re = [],
  reR = [],
  reG = [],
  reB = [],
  buzz = [],
  s1 = [],
  s2 = [],
  s3 = [],
  s4 = [],
  a1Chk = [],
  a2Chk = [],
  b1Chk = [],
  b2Chk = [],
  c1Chk = [],
  c2Chk = [],
  d1Chk = [],
  d2Chk = [],
  e1Chk = [],
  e2Chk = [],
  f1Chk = [],
  f2Chk = [],
  m1Chk = [],
  m2Chk = [],
  m3Chk = [],
  m4Chk = [],
  s1Chk = [],
  s2Chk = [],
  s3Chk = [],
  s4Chk = [],
  t0Chk = [],
  t1Chk = [],
  t2Chk = [],
  buzzChk = [],
  mp3 = [],
  mp3Chk = [],
  oled1 = [],
  oledChk1 = [],
  oled2 = [],
  oledChk2 = [],
  oled3 = [],
  oledChk3 = [],
  rgb1Chk = [],
  rgb2Chk = [],
  rgb3Chk = [],
  rgb4Chk = [],
  rgb5Chk = [],
  rgb6Chk = [],
  rgb7Chk = [],
  rgb8Chk = [],
  rgb9Chk = [],
  rgb10Chk = [],
  countRGB = [],
  valRed1 = [[]],
  valGreen1 = [[]],
  valBlue1 = [],
  valRed2 = [],
  valGreen2 = [],
  valBlue2 = [],
  valRed3 = [],
  valGreen3 = [],
  valBlue3 = [],
  valRed4 = [],
  valGreen4 = [],
  valBlue4 = [],
  valRed5 = [],
  valGreen5 = [],
  valBlue5 = [],
  valRed6 = [],
  valGreen6 = [],
  valBlue6 = [],
  valRed7 = [],
  valGreen7 = [],
  valBlue7 = [],
  valRed8 = [],
  valGreen8 = [],
  valBlue8 = [],
  valRed9 = [],
  valGreen9 = [],
  valBlue9 = [],
  valRed10 = [],
  valGreen10 = [],
  valBlue10 = [];

for (let i = 0; i < 1000; i++) {
  a1[i] = parseInt(sessionStorage.getItem(`a1${i}`)) || 0;
  a2[i] = parseInt(sessionStorage.getItem(`a2${i}`)) || 0;
  b1[i] = parseInt(sessionStorage.getItem(`b1${i}`)) || 0;
  b2[i] = parseInt(sessionStorage.getItem(`b2${i}`)) || 0;
  c1[i] = parseInt(sessionStorage.getItem(`c1${i}`)) || 0;
  c2[i] = parseInt(sessionStorage.getItem(`c2${i}`)) || 0;
  d1[i] = parseInt(sessionStorage.getItem(`d1${i}`)) || 0;
  d2[i] = parseInt(sessionStorage.getItem(`d2${i}`)) || 0;
  t0[i] = parseInt(sessionStorage.getItem(`t0${i}`)) || 0;
  t1[i] = parseInt(sessionStorage.getItem(`t1${i}`)) || 0;
  t2[i] = parseInt(sessionStorage.getItem(`t2${i}`)) || 0;
  e1[i] = parseInt(sessionStorage.getItem(`e1${i}`)) || 0;
  e2[i] = parseInt(sessionStorage.getItem(`e2${i}`)) || 0;
  f1[i] = parseInt(sessionStorage.getItem(`f1${i}`)) || 0;
  f2[i] = parseInt(sessionStorage.getItem(`f2${i}`)) || 0;
  m1[i] = parseInt(sessionStorage.getItem(`m1${i}`)) || 0;
  m2[i] = parseInt(sessionStorage.getItem(`m2${i}`)) || 0;
  m3[i] = parseInt(sessionStorage.getItem(`m3${i}`)) || 0;
  m4[i] = parseInt(sessionStorage.getItem(`m4${i}`)) || 0;
  le[i] = sessionStorage.getItem(`le${i}`) || 0;
  re[i] = sessionStorage.getItem(`re${i}`) || 0;
  buzz[i] = parseInt(sessionStorage.getItem(`buzz${i}`)) || 0;
  s1[i] = parseInt(sessionStorage.getItem(`s1${i}`)) || 0;
  s2[i] = parseInt(sessionStorage.getItem(`s2${i}`)) || 0;
  s3[i] = parseInt(sessionStorage.getItem(`s3${i}`)) || 0;
  s4[i] = parseInt(sessionStorage.getItem(`s4${i}`)) || 0;
  a1Chk[i] = sessionStorage.getItem(`a1Chk${i}`) || 0;
  a2Chk[i] = sessionStorage.getItem(`a2Chk${i}`) || 0;
  b1Chk[i] = sessionStorage.getItem(`b1Chk${i}`) || 0;
  b2Chk[i] = sessionStorage.getItem(`b2Chk${i}`) || 0;
  c1Chk[i] = sessionStorage.getItem(`c1Chk${i}`) || 0;
  c2Chk[i] = sessionStorage.getItem(`c2Chk${i}`) || 0;
  d1Chk[i] = sessionStorage.getItem(`d1Chk${i}`) || 0;
  d2Chk[i] = sessionStorage.getItem(`d2Chk${i}`) || 0;
  e1Chk[i] = sessionStorage.getItem(`e1Chk${i}`) || 0;
  e2Chk[i] = sessionStorage.getItem(`e2Chk${i}`) || 0;
  f1Chk[i] = sessionStorage.getItem(`f1Chk${i}`) || 0;
  f2Chk[i] = sessionStorage.getItem(`f2Chk${i}`) || 0;
  m1Chk[i] = sessionStorage.getItem(`m1Chk${i}`) || 0;
  m2Chk[i] = sessionStorage.getItem(`m2Chk${i}`) || 0;
  m3Chk[i] = sessionStorage.getItem(`m3Chk${i}`) || 0;
  m4Chk[i] = sessionStorage.getItem(`m4Chk${i}`) || 0;
  s1Chk[i] = sessionStorage.getItem(`s1Chk${i}`) || 0;
  s2Chk[i] = sessionStorage.getItem(`s2Chk${i}`) || 0;
  s3Chk[i] = sessionStorage.getItem(`s3Chk${i}`) || 0;
  s4Chk[i] = sessionStorage.getItem(`s4Chk${i}`) || 0;
  t0Chk[i] = sessionStorage.getItem(`t0Chk${i}`) || 0;
  t1Chk[i] = sessionStorage.getItem(`t1Chk${i}`) || 0;
  t2Chk[i] = sessionStorage.getItem(`t2Chk${i}`) || 0;
  leR[i] = parseInt(sessionStorage.getItem(`leR${i}`)) || 0;
  leG[i] = parseInt(sessionStorage.getItem(`leG${i}`)) || 0;
  leB[i] = parseInt(sessionStorage.getItem(`leB${i}`)) || 0;
  reR[i] = parseInt(sessionStorage.getItem(`reR${i}`)) || 0;
  reG[i] = parseInt(sessionStorage.getItem(`reG${i}`)) || 0;
  reB[i] = parseInt(sessionStorage.getItem(`reB${i}`)) || 0;
  buzzChk[i] = sessionStorage.getItem(`buzzChk${i}`) || 0;
  mp3[i] = parseInt(sessionStorage.getItem(`mp3${i}`)) || 0;
  mp3Chk[i] = sessionStorage.getItem(`mp3Chk${i}`) || 0;
  oled1[i] = sessionStorage.getItem(`oled1${i}`) || " ";
  oledChk1[i] = sessionStorage.getItem(`oledChk1${i}`) || false;
  oled2[i] = sessionStorage.getItem(`oled2${i}`) || " ";
  oledChk2[i] = sessionStorage.getItem(`oledChk2${i}`) || false;
  oled3[i] = sessionStorage.getItem(`oled3${i}`) || " ";
  oledChk3[i] = sessionStorage.getItem(`oledChk3${i}`) || false;
  countRGB[i] = parseInt(sessionStorage.getItem(`countRGB${i}`)) || 1;
  rgb1Chk[i] = sessionStorage.getItem(`rgb1Chk${i}`) || false;
  rgb2Chk[i] = sessionStorage.getItem(`rgb2Chk${i}`) || false;
  rgb3Chk[i] = sessionStorage.getItem(`rgb3Chk${i}`) || false;
  rgb4Chk[i] = sessionStorage.getItem(`rgb4Chk${i}`) || false;
  rgb5Chk[i] = sessionStorage.getItem(`rgb5Chk${i}`) || false;
  rgb6Chk[i] = sessionStorage.getItem(`rgb6Chk${i}`) || false;
  rgb7Chk[i] = sessionStorage.getItem(`rgb7Chk${i}`) || false;
  rgb8Chk[i] = sessionStorage.getItem(`rgb8Chk${i}`) || false;
  rgb9Chk[i] = sessionStorage.getItem(`rgb9Chk${i}`) || false;
  rgb10Chk[i] = sessionStorage.getItem(`rgb10Chk${i}`) || false;
  if (JSON.parse(sessionStorage.getItem(`valRGB1${i}`)) !== null) {
    valRed1[i] = JSON.parse(sessionStorage.getItem(`valRGB1${i}`)).r || 0;
    valGreen1[i] = JSON.parse(sessionStorage.getItem(`valRGB1${i}`)).g || 0;
    valBlue1[i] = JSON.parse(sessionStorage.getItem(`valRGB1${i}`)).b || 0;
  } else {
    valRed1[i] = 0;
    valGreen1[i] = 0;
    valBlue1[i] = 0;
  }
  if (JSON.parse(sessionStorage.getItem(`valRGB2${i}`)) !== null) {
    valRed2[i] = JSON.parse(sessionStorage.getItem(`valRGB2${i}`)).r;
    valGreen2[i] = JSON.parse(sessionStorage.getItem(`valRGB2${i}`)).g;
    valBlue2[i] = JSON.parse(sessionStorage.getItem(`valRGB2${i}`)).b;
  } else {
    valRed2[i] = 0;
    valGreen2[i] = 0;
    valBlue2[i] = 0;
  }
  if (JSON.parse(sessionStorage.getItem(`valRGB3${i}`)) !== null) {
    valRed3[i] = JSON.parse(sessionStorage.getItem(`valRGB3${i}`)).r;
    valGreen3[i] = JSON.parse(sessionStorage.getItem(`valRGB3${i}`)).g;
    valBlue3[i] = JSON.parse(sessionStorage.getItem(`valRGB3${i}`)).b;
  } else {
    valRed3[i] = 0;
    valGreen3[i] = 0;
    valBlue3[i] = 0;
  }
  if (JSON.parse(sessionStorage.getItem(`valRGB4${i}`)) !== null) {
    valRed4[i] = JSON.parse(sessionStorage.getItem(`valRGB4${i}`)).r;
    valGreen4[i] = JSON.parse(sessionStorage.getItem(`valRGB4${i}`)).g;
    valBlue4[i] = JSON.parse(sessionStorage.getItem(`valRGB4${i}`)).b;
  } else {
    valRed4[i] = 0;
    valGreen4[i] = 0;
    valBlue4[i] = 0;
  }
  if (JSON.parse(sessionStorage.getItem(`valRGB5${i}`)) !== null) {
    valRed5[i] = JSON.parse(sessionStorage.getItem(`valRGB4${i}`)).r;

    valGreen5[i] = JSON.parse(sessionStorage.getItem(`valRGB5${i}`)).g;
    valBlue5[i] = JSON.parse(sessionStorage.getItem(`valRGB5${i}`)).b;
  } else {
    valRed5[i] = 0;
    valGreen5[i] = 0;
    valBlue5[i] = 0;
  }
  if (JSON.parse(sessionStorage.getItem(`valRGB6${i}`)) !== null) {
    valRed6[i] = JSON.parse(sessionStorage.getItem(`valRGB5${i}`)).r;
    valGreen6[i] = JSON.parse(sessionStorage.getItem(`valRGB6${i}`)).g;
    valBlue6[i] = JSON.parse(sessionStorage.getItem(`valRGB6${i}`)).b;
  } else {
    valRed6[i] = 0;
    valGreen6[i] = 0;
    valBlue6[i] = 0;
  }
  if (JSON.parse(sessionStorage.getItem(`valRGB7${i}`)) !== null) {
    valRed7[i] = JSON.parse(sessionStorage.getItem(`valRGB6${i}`)).r;
    valGreen7[i] = JSON.parse(sessionStorage.getItem(`valRGB7${i}`)).g;
    valBlue7[i] = JSON.parse(sessionStorage.getItem(`valRGB7${i}`)).b;
  } else {
    valRed7[i] = 0;
    valGreen7[i] = 0;
    valBlue7[i] = 0;
  }
  if (JSON.parse(sessionStorage.getItem(`valRGB8${i}`)) !== null) {
    valRed8[i] = JSON.parse(sessionStorage.getItem(`valRGB8${i}`)).r;
    valGreen8[i] = JSON.parse(sessionStorage.getItem(`valRGB8${i}`)).g;
    valBlue8[i] = JSON.parse(sessionStorage.getItem(`valRGB8${i}`)).b;
  } else {
    valRed8[i] = 0;
    valGreen8[i] = 0;
    valBlue8[i] = 0;
  }
  if (JSON.parse(sessionStorage.getItem(`valRGB9${i}`)) !== null) {
    valRed9[i] = JSON.parse(sessionStorage.getItem(`valRGB9${i}`)).r;
    valGreen9[i] = JSON.parse(sessionStorage.getItem(`valRGB9${i}`)).g;
    valBlue9[i] = JSON.parse(sessionStorage.getItem(`valRGB9${i}`)).b;
  } else {
    valRed9[i] = 0;
    valGreen9[i] = 0;
    valBlue9[i] = 0;
  }
  if (JSON.parse(sessionStorage.getItem(`valRGB10${i}`)) !== null) {
    valRed10[i] = JSON.parse(sessionStorage.getItem(`valRGB10${i}`)).r;
    valGreen10[i] = JSON.parse(sessionStorage.getItem(`valRGB10${i}`)).g;
    valBlue10[i] = JSON.parse(sessionStorage.getItem(`valRGB10${i}`)).b;
  } else {
    valRed10[i] = 0;
    valGreen10[i] = 0;
    valBlue10[i] = 0;
  }

  valRed2[i] = 0;
  valGreen2[i] = 0;
  valBlue2[i] = 0;
  valRed3[i] = 0;
  valGreen3[i] = 0;
  valBlue3[i] = 0;
  valRed4[i] = 0;
  valGreen4[i] = 0;
  valBlue4[i] = 0;
  valRed5[i] = 0;
  valGreen5[i] = 0;
  valBlue5[i] = 0;
  valRed6[i] = 0;
  valGreen6[i] = 0;
  valBlue6[i] = 0;
  valRed7[i] = 0;
  valGreen7[i] = 0;
  valBlue7[i] = 0;
  valRed8[i] = 0;
  valGreen8[i] = 0;
  valBlue8[i] = 0;
  valRed9[i] = 0;
  valGreen9[i] = 0;
  valBlue9[i] = 0;
  valRed10[i] = 0;
  valGreen10[i] = 0;
  valBlue10[i] = 0;
}
var ms = 0;
const OutputPanel = (props) => {
  useLayoutEffect(() => {
    return () => {
      a1[props.check] = valA1;
      a2[props.check] = valA2;
      b1[props.check] = valB1;
      b2[props.check] = valB2;
      c1[props.check] = valC1;
      c2[props.check] = valC2;
      d1[props.check] = valD1;
      d2[props.check] = valD2;
      e1[props.check] = valE1;
      e2[props.check] = valE2;
      f1[props.check] = valF1;
      f2[props.check] = valF2;
      m1[props.check] = valM1;
      m2[props.check] = valM2;
      m3[props.check] = valM3;
      m4[props.check] = valM4;
      t0[props.check] = valT0;
      t1[props.check] = valT1;
      t2[props.check] = valT2;
      le[props.check] = valLeye;
      leR[props.check] = valLeyeR;
      leG[props.check] = valLeyeG;
      leB[props.check] = valLeyeB;

      re[props.check] = valReye;
      reR[props.check] = valReyeR;
      reG[props.check] = valReyeG;
      reB[props.check] = valReyeB;

      buzz[props.check] = valBuzz;
      buzzChk[props.check] = buzzCheckbox;

      s1[props.check] = valSm1;
      s2[props.check] = valSm2;
      s3[props.check] = valSm3;
      s4[props.check] = valSm4;
      a1Chk[props.check] = a1Checkbox;
      a2Chk[props.check] = a2Checkbox;
      b1Chk[props.check] = b1Checkbox;
      b2Chk[props.check] = b2Checkbox;
      c1Chk[props.check] = c1Checkbox;
      c2Chk[props.check] = c2Checkbox;
      d1Chk[props.check] = d1Checkbox;
      d2Chk[props.check] = d2Checkbox;
      e1Chk[props.check] = e1Checkbox;
      e2Chk[props.check] = e2Checkbox;
      f1Chk[props.check] = f1Checkbox;
      f2Chk[props.check] = f2Checkbox;
      m1Chk[props.check] = m1Checkbox;
      m2Chk[props.check] = m2Checkbox;
      m3Chk[props.check] = m3Checkbox;
      m4Chk[props.check] = m4Checkbox;
      s1Chk[props.check] = s1Checkbox;
      s2Chk[props.check] = s2Checkbox;
      s3Chk[props.check] = s3Checkbox;
      s4Chk[props.check] = s4Checkbox;
      t0Chk[props.check] = t0Checkbox;
      t1Chk[props.check] = t1Checkbox;
      t2Chk[props.check] = t2Checkbox;

      mp3[props.check] = valMP3;
      mp3Chk[props.check] = mp3Checkbox;
      oled1[props.check] = curValOLED1;
      oled2[props.check] = curValOLED2;
      oled3[props.check] = curValOLED3;
      oledChk1[props.check] = isClickOLED1;
      oledChk2[props.check] = isClickOLED2;
      oledChk3[props.check] = isClickOLED3;
      countRGB[props.check] = countRGBComp;
      rgb1Chk[props.check] = rgb1;
      rgb2Chk[props.check] = rgb2;
      rgb3Chk[props.check] = rgb3;
      rgb4Chk[props.check] = rgb4;
      rgb5Chk[props.check] = rgb5;
      rgb6Chk[props.check] = rgb6;
      rgb7Chk[props.check] = rgb7;
      rgb8Chk[props.check] = rgb8;
      rgb9Chk[props.check] = rgb9;
      rgb10Chk[props.check] = rgb10;
      valRed1[props.check] = valRgb1[0];
      valGreen1[props.check] = valRgb1[1];
      valBlue1[props.check] = valRgb1[2];
      valRed2[props.check] = valRgb2[0];
      valGreen2[props.check] = valRgb2[1];
      valBlue2[props.check] = valRgb2[2];
      valRed3[props.check] = valRgb3[0];
      valGreen3[props.check] = valRgb3[1];
      valBlue3[props.check] = valRgb3[2];
      valRed4[props.check] = valRgb4[0];
      valGreen4[props.check] = valRgb4[1];
      valBlue4[props.check] = valRgb4[2];
      valRed5[props.check] = valRgb5[0];
      valGreen5[props.check] = valRgb5[1];
      valBlue5[props.check] = valRgb5[2];
      valRed6[props.check] = valRgb6[0];
      valGreen6[props.check] = valRgb6[1];
      valBlue6[props.check] = valRgb6[2];
      valRed7[props.check] = valRgb7[0];
      valGreen7[props.check] = valRgb7[1];
      valBlue7[props.check] = valRgb7[2];
      valRed8[props.check] = valRgb8[0];
      valGreen8[props.check] = valRgb8[1];
      valBlue8[props.check] = valRgb8[2];
      valRed9[props.check] = valRgb9[0];
      valGreen9[props.check] = valRgb9[1];
      valBlue9[props.check] = valRgb9[2];
      valRed10[props.check] = valRgb10[0];
      valGreen10[props.check] = valRgb10[1];
      valBlue10[props.check] = valRgb10[2];
      console.log("=====>props=====>======>", a1[props.check]);
    };
  });

  const [valA1, setvalA1] = useState(a1[props.check]);
  const [valA2, setvalA2] = useState(a2[props.check]);
  const [valB1, setvalB1] = useState(b1[props.check]);
  const [valB2, setvalB2] = useState(b2[props.check]);
  const [valC1, setvalC1] = useState(c1[props.check]);
  const [valC2, setvalC2] = useState(c2[props.check]);
  const [valD1, setvalD1] = useState(d1[props.check]);
  const [valD2, setvalD2] = useState(d2[props.check]);
  const [valE1, setvalE1] = useState(e1[props.check]);
  const [valE2, setvalE2] = useState(e2[props.check]);
  const [valF1, setvalF1] = useState(f1[props.check]);
  const [valF2, setvalF2] = useState(f2[props.check]);
  const [valM1, setvalM1] = useState(m1[props.check]);
  const [valM2, setvalM2] = useState(m2[props.check]);
  const [valM3, setvalM3] = useState(m3[props.check]);
  const [valM4, setvalM4] = useState(m4[props.check]);
  const [valT0, setvalT0] = useState(t0[props.check]);
  const [valT1, setvalT1] = useState(t1[props.check]);
  const [valT2, setvalT2] = useState(t2[props.check]);

  const [valMP3, setvalMP3] = useState(mp3[props.check]);

  const [isClickOLED1, setIsClickOLED1] = useState(oledChk1[props.check]);
  const [isClickOLED2, setIsClickOLED2] = useState(oledChk2[props.check]);
  const [isClickOLED3, setIsClickOLED3] = useState(oledChk3[props.check]);
  const [curValOLED1, setCurValOLED1] = useState(oled1[props.check]);
  const [curValOLED2, setCurValOLED2] = useState(oled2[props.check]);
  const [curValOLED3, setCurValOLED3] = useState(oled3[props.check]);

  const [valLeye, setvalLeye] = useState(le[props.check]);
  const [valLeyeR, setvalLeyeR] = useState(leR[props.check]);
  const [valLeyeG, setvalLeyeG] = useState(leG[props.check]);
  const [valLeyeB, setvalLeyeB] = useState(leB[props.check]);

  const [valReye, setvalReye] = useState(re[props.check]);
  const [valReyeR, setvalReyeR] = useState(reR[props.check]);
  const [valReyeG, setvalReyeG] = useState(reG[props.check]);
  const [valReyeB, setvalReyeB] = useState(reB[props.check]);

  const [valBuzz, setvalBuzz] = useState(buzz[props.check]);
  const [buzzCheckbox, setBuzzCheckbox] = useState(buzzChk[props.check]);
  const [valSm1, setvalSm1] = useState(s1[props.check]);
  const [valSm2, setvalSm2] = useState(s2[props.check]);
  const [valSm3, setvalSm3] = useState(s3[props.check]);
  const [valSm4, setvalSm4] = useState(s4[props.check]);
  const [a1Checkbox, setA1Checkbox] = useState(a1Chk[props.check]);
  const [a2Checkbox, setA2Checkbox] = useState(a2Chk[props.check]);
  const [b1Checkbox, setB1Checkbox] = useState(b1Chk[props.check]);
  const [b2Checkbox, setB2Checkbox] = useState(b2Chk[props.check]);
  const [c1Checkbox, setC1Checkbox] = useState(c1Chk[props.check]);
  const [c2Checkbox, setC2Checkbox] = useState(c2Chk[props.check]);
  const [d1Checkbox, setD1Checkbox] = useState(d1Chk[props.check]);
  const [d2Checkbox, setD2Checkbox] = useState(d2Chk[props.check]);
  const [e1Checkbox, setE1Checkbox] = useState(e1Chk[props.check]);
  const [e2Checkbox, setE2Checkbox] = useState(e2Chk[props.check]);
  const [f1Checkbox, setF1Checkbox] = useState(f1Chk[props.check]);
  const [f2Checkbox, setF2Checkbox] = useState(f2Chk[props.check]);
  const [m1Checkbox, setM1Checkbox] = useState(m1Chk[props.check]);
  const [m2Checkbox, setM2Checkbox] = useState(m2Chk[props.check]);
  const [m3Checkbox, setM3Checkbox] = useState(m3Chk[props.check]);
  const [m4Checkbox, setM4Checkbox] = useState(m4Chk[props.check]);
  const [s1Checkbox, setS1Checkbox] = useState(s1Chk[props.check]);
  const [s2Checkbox, setS2Checkbox] = useState(s2Chk[props.check]);
  const [s3Checkbox, setS3Checkbox] = useState(s3Chk[props.check]);
  const [s4Checkbox, setS4Checkbox] = useState(s4Chk[props.check]);
  const [t0Checkbox, setT0Checkbox] = useState(t0Chk[props.check]);
  const [t1Checkbox, setT1Checkbox] = useState(t1Chk[props.check]);
  const [t2Checkbox, setT2Checkbox] = useState(t2Chk[props.check]);

  const [mp3Checkbox, setMP3Checkbox] = useState(mp3Chk[props.check]);
  const [countRGBComp, setCountRGBComp] = useState(countRGB[props.check]);
  const [valRgb1, setValRgb1] = useState([
    valRed1[props.check],
    valGreen1[props.check],
    valBlue1[props.check],
  ]);
  const [valRgb2, setValRgb2] = useState([
    valRed2[props.check],
    valGreen2[props.check],
    valBlue2[props.check],
  ]);
  const [valRgb3, setValRgb3] = useState([
    valRed3[props.check],
    valGreen3[props.check],
    valBlue3[props.check],
  ]);
  const [valRgb4, setValRgb4] = useState([
    valRed4[props.check],
    valGreen4[props.check],
    valBlue4[props.check],
  ]);
  const [valRgb5, setValRgb5] = useState([
    valRed5[props.check],
    valGreen5[props.check],
    valBlue5[props.check],
  ]);
  const [valRgb6, setValRgb6] = useState([
    valRed6[props.check],
    valGreen6[props.check],
    valBlue6[props.check],
  ]);
  const [valRgb7, setValRgb7] = useState([
    valRed7[props.check],
    valGreen7[props.check],
    valBlue7[props.check],
  ]);
  const [valRgb8, setValRgb8] = useState([
    valRed8[props.check],
    valGreen8[props.check],
    valBlue8[props.check],
  ]);
  const [valRgb9, setValRgb9] = useState([
    valRed9[props.check],
    valGreen9[props.check],
    valBlue9[props.check],
  ]);
  const [valRgb10, setValRgb10] = useState([
    valRed10[props.check],
    valGreen10[props.check],
    valBlue10[props.check],
  ]);
  const [rgb1, setRgb1] = useState(rgb1Chk[props.check]);
  const [rgb2, setRgb2] = useState(rgb2Chk[props.check]);
  const [rgb3, setRgb3] = useState(rgb3Chk[props.check]);
  const [rgb4, setRgb4] = useState(rgb4Chk[props.check]);
  const [rgb5, setRgb5] = useState(rgb5Chk[props.check]);
  const [rgb6, setRgb6] = useState(rgb6Chk[props.check]);
  const [rgb7, setRgb7] = useState(rgb7Chk[props.check]);
  const [rgb8, setRgb8] = useState(rgb8Chk[props.check]);
  const [rgb9, setRgb9] = useState(rgb9Chk[props.check]);
  const [rgb10, setRgb10] = useState(rgb10Chk[props.check]);
  // const [a1Checked] = useLocalStorage("a1-I/O");
  // const [a1Digi] = useLocalStorage("A1DIGI");
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

  // const [a1Digi, seta1d] = useState(
  //   JSON.parse(sessionStorage.getItem("A1DIGI"))
  // );
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
    `valRGB1${props.check}`,
    JSON.stringify({
      r: valRgb7[0],
      g: valRgb7[1],
      b: valRgb7[2],
    })
  );
  sessionStorage.setItem(
    `valRGB1${props.check}`,
    JSON.stringify({
      r: valRgb8[0],
      g: valRgb8[1],
      b: valRgb8[2],
    })
  );
  sessionStorage.setItem(
    `valRGB1${props.check}`,
    JSON.stringify({
      r: valRgb9[0],
      g: valRgb9[1],
      b: valRgb9[2],
    })
  );
  sessionStorage.setItem(
    `valRGB1${props.check}`,
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
    if (countRGBComp > 1) setCountRGBComp(countRGBComp - 1);
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
            style={{ position: "relative", height: "300px" }}
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
